import axios from "axios";
import { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { env } from "../../src/config/env.config";
import { pagePaths } from "../../src/routes/constant";
import AdminFooter from "../components/admin/AdminFooter";
import Header from "./Header";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${env.REACT_SERVER_BASE_URL}/forgot-password`,
        { email }
      );
      console.log(response, "response");
      toast.success(response.data.message);
      navigate("/backend/Login");
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <Header />
      <Container className="my-5 mh-100 d-flex justify-content-center align-items-center">
        <Card style={{ width: "400px" }}>
          <Card.Body>
            <h2 className="text-center mb-4">Forgot Password</h2>
            <Form onSubmit={handleFormSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              {message && <div className="text-danger mb-3">{message}</div>}
              <Button variant="primary" type="submit" className="w-100 mb-3">
                Submit
              </Button>
              <Link
                href={"/backend/Login"}
                variant="link"
                className="w-100 text-center mb-3"
                // onClick={handleForgotPassword}
              >
                Back to Login
              </Link>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      <AdminFooter />
    </>
  );
};

export default ForgotPassword;
