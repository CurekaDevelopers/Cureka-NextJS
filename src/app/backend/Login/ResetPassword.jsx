import { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import AdminFooter from "../components/admin/AdminFooter";
import Header from "./Header";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { env } from "../../src/config/env.config";
import { pagePaths } from "../../src/routes/constant";
import SHA256 from "crypto-js/sha256"; // Importing SHA256 from crypto-js

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token"); // This will retrieve the token
  const navigate = useNavigate();

  const validatePassword = (password) => {
    // Example validation: at least 8 characters, at least one number and one special character
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };
  const hashPassword = (password) => {
    return SHA256(password).toString(); // Hashing the password
  };
  const confirmHashPassword = (confirmPassword) => {
    return SHA256(confirmPassword).toString(); // Hashing the password
  };

  console.log(token, "user token"); // Should log "emg3khowwr"
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!validatePassword(password)) {
      toast.error(
        "Password must be at least 8 characters long and include at least one number and one special character."
      );
      return;
    }

    try {
      const hashedPassword = hashPassword(password);
      const confirmHashedPassword = confirmHashPassword(confirmPassword);

      const response = await axios.put(
        `${env.REACT_SERVER_BASE_URL}/reset-password?token=${token}`,
        { password, confirmPassword }
      );
      if (response.status == 200) {
        toast.success(response.data.message);
        navigate("/backend/Login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <>
      <Header />
      <Container className="my-5 mh-100 d-flex justify-content-center align-items-center">
        <Card style={{ width: "400px" }}>
          <Card.Body>
            <h2 className="text-center mb-4">Reset Password</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              {message && <div className="text-danger mb-3">{message}</div>}
              <Button variant="primary" type="submit" className="w-100 mb-3">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      <AdminFooter />
    </>
  );
};

export default ResetPassword;
