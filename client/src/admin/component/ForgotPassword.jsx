import { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import api from "../../utils/api.utils";
import logo from "../images/logo/logo.svg";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [resetStatus, setResetStatus] = useState(null);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/forgot-password", {
        headers: {
          key: "Content-Type",
          value: "application/json",
          type: "default",
        },
        email,
      });

      if (response.status === 200) {
        console.log(response, "forgot");
        setResetStatus("Email sent successfully. Please check your inbox.");
      } else {
        console.error("Login failed");
        setResetStatus("Error: Unable to send password reset email.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      setResetStatus("Error: " + error.message);
    }
  };

  return (
    <div className="inner_page profile_page">
      <div className="full_container">
        <div className="container">
          <div className="midde_cont">
            <div className="container-fluid">
              <div className="center verticle_center full_height">
                <div className="login_section">
                  <div className="logo_login">
                    <div className="center">
                      <img width="210" src={logo} alt="#" />
                    </div>
                  </div>
                  <div className="row column1">
                    <div className="col-md-12">
                      <div className="full margin_bottom_30">
                        <div className="full mt-5 text-center">
                          <div className="heading1 pb-0 margin_0">
                            <h2>Forgot Password</h2>
                          </div>
                        </div>
                        <div className="full price_table">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="full dis_flex center_text">
                                <div className="profile_contant">
                                  {resetStatus && (
                                    <div className="alert alert-success alert-dismissible mt-4">
                                      <button type="button" className="close" data-dismiss="alert">
                                        &times;
                                      </button>
                                      {resetStatus}
                                    </div>
                                  )}
                                  <Container className="mh-100 d-flex justify-content-center align-items-center">
                                    <div>
                                      <Card.Body className="login_form">
                                        <Form onSubmit={handleFormSubmit}>
                                          <fieldset>
                                            <Form.Group
                                              className="mb-3 field d-flex"
                                              controlId="formBasicEmail"
                                            >
                                              <Form.Label className="label_field">
                                                Email address
                                              </Form.Label>
                                              <Form.Control
                                                type="email"
                                                placeholder="Enter email"
                                                value={email}
                                                onChange={handleInputChange}
                                                required
                                              />
                                            </Form.Group>
                                            <div className="field margin_btn">
                                              <Button variant="" type="submit" className="main_bt">
                                                Submit
                                              </Button>
                                            </div>
                                          </fieldset>
                                        </Form>
                                      </Card.Body>
                                    </div>
                                  </Container>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
