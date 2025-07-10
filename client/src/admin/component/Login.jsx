import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api.utils";
import logo from "../images/logo/logo.svg";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [show, setShow] = useState(false);
  const [msg] = useState("");

  const navigate = useNavigate();

  const onSub = async (e) => {
    e.preventDefault();
    try {
      const val = await api.post("/login", user);
      if (val.data.login) {
        console.log(val, "login page");
        setShow(true);
        const token = val.data.login;
        localStorage.setItem("token", token);
        // setMsg(val.data.login);
        navigate("/admin/dashboard");
      }
      console.log(show, "show");
    } catch (error) {
      console.error("Login failed", error);
      // Handle login failure (show an error message, etc.)
    }
  };

  useEffect(() => {
    if (show) {
      navigate("/admin/dashboard");
    }
  }, [navigate, show]);

  const userInput = (event) => {
    const { name, value } = event.target;
    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
    <>
      <div className="inner_page login">
        <div className="full_container">
          <div className="container" id="formm">
            <div className="center verticle_center full_height">
              <div className="login_section">
                <div className="logo_login">
                  <div className="center">
                    <img width="210" src={logo} alt="#" />
                  </div>
                </div>
                {msg ? (
                  <>
                    <div className="alert alert-danger alert-dismissible">
                      <button type="button" className="close" data-dismiss="alert">
                        &times;
                      </button>
                      <strong>ERROR!</strong> {msg}
                    </div>
                  </>
                ) : null}
                <br />
                <div className="login_form d-flex flex-column">
                  <form onSubmit={onSub}>
                    <fieldset>
                      <div className="field">
                        <label className="label_field">Email Address</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter email"
                          name="email"
                          value={user.email}
                          onChange={userInput}
                          required
                        />
                      </div>
                      <div className="field mb-0">
                        <label className="label_field">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Enter password"
                          name="password"
                          value={user.password}
                          onChange={userInput}
                          required
                        />
                      </div>
                      <div className="float-right mb-4">
                        <a href="/admin/register" style={{ color: "#007bff !important" }}>
                          Create an account
                        </a>
                        &nbsp; &nbsp;
                        <a href="/admin/forgot-password" style={{ color: "#007bff !important" }}>
                          Forgot password
                        </a>
                      </div>
                      <div className="field margin_btn">
                        {/* <label class="label_field hidden">hidden label</label> */}
                        <button className="main_bt">Sign In</button>
                      </div>
                    </fieldset>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
