import "draft-js/dist/Draft.css";
import { useState } from "react";
import api from "../../utils/api.utils";
import DraftEditor from "../common/DraftEditor";

const BlogPostForm = ({ sendDataToParent }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("This is the main content of the blog.");
  // const [category_id, setCategory_id] = useState(0);
  // const [concern_id, setConcern_id] = useState(0);
  // const [url, setUrl] = useState("");
  // const [description, setDescription] = useState("");
  // const [canonical_url, setCanonical_url] = useState("");
  // const [og_tag, setOg_tag] = useState("");
  // const [keywords, setKeywords] = useState("");
  // const [content1, setContent1] = useState("This is the main content of the blog.");
  // const [blog_date, setBlog_date] = useState("");
  // const [image, setImage] = useState("sample-image.jpg");
  // const unique_id = uuid();
  const [postStatus, setPostStatus] = useState(null);
  const [dataToSend, setDataToSend] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value, "change");
    // setBlog_date(
    //   new Date()
    //     .toLocaleString("en-US", {
    //       year: "numeric",
    //       month: "2-digit",
    //       day: "2-digit",
    //     })
    //     .replace(/\//g, "-"),
    // );
    // setCategory_id(Math.round(Math.random() * 1000));
    // setConcern_id(unique_id.slice(0, 8));
    // setUrl("sample_blog_url");
    // setDescription("sample descriptioon");
    // setCanonical_url("http://canonical-url.com");
    // setOg_tag("sample_og_tag");
    // setKeywords("sample_keyword1, sample_keyword2");
    // setContent1("Additional content");
    if (name === "title") setTitle(value);
    else if (name === "content") setContent(value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target, "form");
    const data = {
      category_id: 1,
      concern_id: 2,
      title: "Sample Blog",
      image: "sample-image.jpg",
      url: "http://sample-blog-url.com",
      description: "This is a sample blog description.",
      canonical_url: "http://canonical-url.com",
      og_tag: "sample-og-tag",
      keywords: "sample, keywords, blog",
      content: "This is the main content of the blog.",
      content1: "This is additional content.",
      blog_date: "2023-11-13",
    };

    try {
      const response = await api.post("/create-blog", data);
      console.log(response, "res");
      if (response.status === 201) {
        // Blog post created successfully
        setPostStatus("Blog post created successfully.");
        setTimeout(() => {
          setDataToSend(false);
          sendDataToParent(dataToSend);
        }, 1000);
      } else {
        // Handle error response
        setPostStatus("Error: Unable to create blog post.");
      }
    } catch (error) {
      // Handle network error or other errors
      setPostStatus("Error: " + error.message);
    }
  };
  const handleImageChange = () => {
    // const file = e.target.files[0];
    // setImage("file");
  };

  return (
    <div>
      <div className="change_form container mt-0">
        {/* <h3>Create Blog</h3> */}
        {postStatus && (
          <div className="alert alert-success alert-dismissible mt-4 w-50">
            <button type="button" className="close" data-dismiss="alert">
              &times;
            </button>
            {postStatus}
          </div>
        )}
        <br />
        <form onSubmit={handleFormSubmit}>
          <fieldset>
            <div className="fields">
              <label className="label_fields">Title: </label>
              <input
                placeholder="Enter the title"
                type="text"
                name="title"
                value={title}
                onChange={handleInputChange}
                required
              />
            </div>
            <br />
            <div className="fields">
              <label className="label_fields">Content: </label>
              {/* <textarea
                      name="content"
                      value={content}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: "400px",
                        height: "100px",
                        border: "none",
                      }}
                    /> */}
              <DraftEditor name="content" value={content} onChange={handleInputChange} />
            </div>
            <br />
            <div className="fields">
              <label className="label_fields">Image: </label>
              <input
                className="image_border"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <br />
            <div className="field margin_btn">
              <button className="main_bt">Create Post</button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default BlogPostForm;
