import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api.utils";
import logo from "../images/logo/logo.svg";

const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const onSub = async (e) => {
    e.preventDefault();
    try {
      const val = await api.post("/register", user);
      console.log(val);
      if (val.status === 201) {
        setMsg(val.data.message);
        setShow(true);
        setTimeout(() => {
          navigate("/admin/login");
        }, 1000);
      } else {
        setShow(false);
      }
      // console.log(val)
    } catch (error) {
      setMsg(error.response.data.error);
      console.log(error.response.data.error, "err");
    }
  };

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
      <div className="container" id="formm">
        <div className="center verticle_center full_height">
          <div className="login_section">
            <div className="logo_login">
              <div className="center">
                <img width="210" src={logo} alt="#" />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-8 col-12">
                <div className="register_form">
                  {msg && show ? (
                    <div className="alert alert-success alert-dismissible mt-4">
                      <button type="button" className="close" data-dismiss="alert">
                        &times;
                      </button>
                      <strong>Success!</strong> {msg}
                    </div>
                  ) : null}
                  {msg && !show ? (
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
                  <form onSubmit={onSub}>
                    <fieldset>
                      <div className="field">
                        <label className="label_field">Email address:</label>
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
                      <div className="field">
                        <label htmlFor="pwd" className="label_field">
                          Password:
                        </label>
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
                      <br />
                      <div className="field margin_btn">
                        <button className="main_bt">Submit</button>
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

export default Register;
