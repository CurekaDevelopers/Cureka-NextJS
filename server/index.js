const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
const { upload } = require("./multer");
const saltRounds = 10;

const PORT = process.env.PORT || 8000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cookieParser());

app.use(
  session({
    key: "userId",
    secret: "atanu",
    resave: false,
    saveUninitialized: false,
    // cookie:{
    //     expires:60*60*60*24,
    // }
  })
);

const db = mysql.createConnection({
  port: parseInt(process.env.SQL_DB_PORT || "3306"),
  host: process.env.SQL_DB_HOST || "localhost",
  user: process.env.SQL_DB_USER || "root",
  password: process.env.SQL_DB_PASSWORD || "",
  database: process.env.SQL_DB_DATABASE_NAME || "coderszine_demo",
});

app.get("/", (req, res) => {
  res.send("hi");
});

app.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  bcrypt.hash(password, saltRounds, (errr, hash) => {
    const data = {
      email: req.body.email,
      password: hash,
    };
    if (errr) {
      console.log(err);
    } else {
      let sqll = `select * from users where email='${email}'`;
      db.query(sqll, (er, ress) => {
        if (ress.length > 0) {
          res.send({ msg: "User Email Already Present" });
        } else {
          let sql = "INSERT INTO `users` SET ?";
          db.query(sql, data, (err, result) => {
            if (err) {
              console.log(err);
            } else {
              //  console.log(result);
              res.send(result);
              // res.send()
            }
          });
        }
      });
    }
  });
});
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // console.log(email);

  let sql = `select * from users where email='${email}'`;
  // console.log(sql);
  db.query(sql, (err, result) => {
    if (err) {
      // res.send({err:err})
      console.log(err);
    } else {
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (errr, response) => {
          if (response) {
            req.session.user = result;
            // console.log(req.session.user);

            res.send({ login: true, useremail: email });
          } else {
            res.send({ login: false, msg: "Wrong Password" });
          }
        });
      } else {
        res.send({ login: false, msg: "User Email Not Exits" });
        // console.log("noo email ")
      }
    }
  });
});
app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ login: true, user: req.session.user });
  } else {
    res.send({ login: false });
  }
});

app.post("/forgot-password", (req, res) => {
  const email = req.body.email;
  console.log("emial------", email);
  // Check if the email exists in the database
  let sql = `SELECT * FROM users WHERE email='${email}'`;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (result.length > 0) {
      // Generate a unique token (replace this with your token generation logic)
      const token = Math.random().toString(36).substr(2, 10);

      // Save the token in the database (replace this with your database update logic)
      console.log(`Token ${token} saved for email ${email}`);

      // Send a reset password email
      sendResetPasswordEmail(email, token);

      res
        .status(200)
        .json({ message: "Reset password link sent to your email address." });
    } else {
      res.status(404).json({ message: "Email not found in the database." });
    }
  });
});

function sendResetPasswordEmail(email, token) {
  // Configure nodemailer with your email service provider
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "example@exapmle.con", // replace with your email
      pass: "password", // replace with your password
    },
  });

  // Compose the email
  const mailOptions = {
    from: "example@wxample.com",
    to: email,
    subject: "Password Reset Link",
    text: `Click on the following link to reset your password: http://yourapp.com/reset-password?token=${token}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
}

app.post("/change-password", (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  // Check if the user exists
  let sql = `SELECT * FROM users WHERE email='${email}'`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error checking user:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    // Update the password
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      const updateSql = `UPDATE users SET password='${hash}' WHERE email='${email}'`;
      db.query(updateSql, (err, result) => {
        if (err) {
          console.error("Error updating password:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        res.status(200).json({ message: "Password updated successfully." });
      });
    });
  });
});

function sendResetPasswordEmail(email, token) {
  // Implement the logic to send an email with the reset password link
  // You can use a library like nodemailer for sending emails
}

db.query(
  `
CREATE TABLE IF NOT EXISTS concerns (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(50) NOT NULL)
`,
  (err) => {
    if (err) {
      console.error("Error creating table:", err);
    } else {
      console.log("Table created or already exists");
    }
  }
);

// Middleware to parse JSON in the request body
app.use(bodyParser.json());
// Endpoint to create a new brand

app.post("/concerns", (req, res) => {
  const { name, image, description, status } = req.body;

  // Basic validation
  if (!name || !image || !description || !status) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Insert the new concern into the database
  const insertQuery = `INSERT INTO concerns (name, image, description, status) VALUES (?, ?, ?, ?)`;
  db.query(insertQuery, [name, image, description, status], (err, result) => {
    if (err) {
      console.error("Error inserting concern:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      // Return the created concern
      res.status(201).json({
        id: result.insertId,
        name,
        image,
        description,
        status,
      });
    }
  });
});

// Endpoint to get a list of all concerns
app.get("/concerns", (req, res) => {
  // Retrieve all concerns from the database
  const selectAllQuery = "SELECT * FROM concerns";

  db.query(selectAllQuery, (err, results) => {
    if (err) {
      console.error("Error retrieving concerns:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      // Return the list of concerns
      res.status(200).json(results);
    }
  });
});

// Function to generate a unique 4-character code
const generateUniqueCode = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

// Create the "categories" table if it doesn't exist
// Create the "categories" table if it doesn't exist
db.query(
  `
  CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(50) NOT NULL,
    code VARCHAR(4) UNIQUE NOT NULL
  )
`,
  (err) => {
    if (err) {
      console.error("Error creating table:", err);
    } else {
      console.log("Table created or already exists");
    }
  }
);
// Middleware to parse JSON in the request body
app.use(bodyParser.json());
// Endpoint to create a new brand
app.post("/categories", (req, res) => {
  const { name, image, description, status } = req.body;
  // Basic validation
  if (!name || !image || !description || !status) {
    return res.status(400).json({ error: "All fields are required." });
  }
  // Generate a unique code for the brand
  const code = generateUniqueCode();
  // Insert the new brand into the database
  const insertQuery = `
    INSERT INTO categories (name, image, description, status, code) VALUES (?, ?, ?, ?, ?)
  `;
  db.query(
    insertQuery,
    [name, image, description, status, code],
    (err, result) => {
      if (err) {
        console.error("Error inserting categories:", err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        // Return the created brand
        res.status(201).json({
          id: result.insertId,
          name,
          image,
          description,
          status,
          code,
        });
      }
    }
  );
});

// Endpoint to get a list of all categories
app.get("/categories", (req, res) => {
  // Retrieve all categories from the database
  const selectAllQuery = "SELECT * FROM categories";

  db.query(selectAllQuery, (err, results) => {
    if (err) {
      console.error("Error retrieving categories:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      // Return the list of categories
      res.status(200).json(results);
    }
  });
});

db.query(
  `
  CREATE TABLE IF NOT EXISTS brands (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(50) NOT NULL,
    code VARCHAR(4) UNIQUE NOT NULL
  )
`,
  (err) => {
    if (err) {
      console.error("Error creating table:", err);
    } else {
      console.log("Table created or already exists");
    }
  }
);
// Middleware to parse JSON in the request body
app.use(bodyParser.json());
// Endpoint to create a new brand
app.post("/brands", (req, res) => {
  const { name, image, description, status } = req.body;
  // Basic validation
  if (!name || !image || !description || !status) {
    return res.status(400).json({ error: "All fields are required." });
  }
  // Generate a unique code for the brand
  const code = generateUniqueCode();
  // Insert the new brand into the database
  const insertQuery = `
    INSERT INTO brands (name, image, description, status, code) VALUES (?, ?, ?, ?, ?)
  `;
  db.query(
    insertQuery,
    [name, image, description, status, code],
    (err, result) => {
      if (err) {
        console.error("Error inserting brand:", err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        // Return the created brand
        res.status(201).json({
          id: result.insertId,
          name,
          image,
          description,
          status,
          code,
        });
      }
    }
  );
});
// Endpoint to get a list of all brands
app.get("/brands", (req, res) => {
  // Retrieve all brands from the database
  const selectAllQuery = "SELECT * FROM brands";
  db.query(selectAllQuery, (err, results) => {
    if (err) {
      console.error("Error retrieving brands:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      // Return the list of brands
      res.status(200).json(results);
    }
  });
});

// Create "blogs" table if not exists
db.query(
  `
  CREATE TABLE IF NOT EXISTS blogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    concern_id INT,
    title VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    canonical_url VARCHAR(255) NOT NULL,
    og_tag VARCHAR(255) NOT NULL,
    keywords VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    content1 TEXT NOT NULL,
    blog_date DATE NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (concern_id) REFERENCES concerns(id)
  )
`,
  (err) => {
    if (err) {
      console.error("Error creating table:", err);
    } else {
      console.log("Table created or already exists");
    }
  }
);

// Endpoint to create a new blog
app.post("/create-blog", (req, res) => {
  const {
    category_id,
    concern_id,
    title,
    image,
    url,
    description,
    canonical_url,
    og_tag,
    keywords,
    content,
    content1,
    blog_date,
  } = req.body;

  const insertQuery = `INSERT INTO blogs (category_id, concern_id, title, image, url, description, canonical_url, og_tag, keywords, content, content1, blog_date)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    insertQuery,
    [
      category_id,
      concern_id,
      title,
      image,
      url,
      description,
      canonical_url,
      og_tag,
      keywords,
      content,
      content1,
      blog_date,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting blog:", err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(201).json({
          id: result.insertId,
          category_id,
          concern_id,
          title,
          image,
          url,
          description,
          canonical_url,
          og_tag,
          keywords,
          content,
          content1,
          blog_date,
        });
      }
    }
  );
});

// Endpoint to list all blogs
app.get("/list-blogs", (req, res) => {
  const selectAllQuery = "SELECT * FROM blogs";
  db.query(selectAllQuery, (err, results) => {
    if (err) {
      console.error("Error retrieving blogs:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json(results);
    }
  });
});

// Serve files statically from the public folder
app.use("/files", express.static(path.join(__dirname, "public")));

/* 
  curl--location 'http://localhost:8000/upload?category=concerns' \
  --form 'file=@"/concern1.png"'
*/
// Handle file upload
app.post("/upload", upload.single("file"), (req, res) => {
  console.log("Request Body:", req.body);
  const category = req.query.category || "uncategorized";
  const filename = req.file.filename;
  const fileUrl = `${req.protocol}://${req.get(
    "host"
  )}/files/${category}/${filename}`;

  res.json({ message: "File uploaded successfully!", fileUrl });
});

app.listen(PORT, () => {
  console.log(`app running in ${PORT}`);
});
