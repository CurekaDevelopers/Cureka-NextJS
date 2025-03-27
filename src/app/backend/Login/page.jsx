"use client";

import { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation"; // ✅ Ensure correct import
import AdminFooter from "../../../components/admin/AdminFooter/index";
import {
  setAdminEmail,
  setIsLoggedIn,
  setUserRoles,
  setIsAdminStatus,
  setAdminAccessToken,
} from "../../../redux/slices/auth.slice";
import api from "../../../utils/api.utils";
import { apiUrls, httpCode } from "../../../utils/constants/api.constants";
import Header from "../../../views/Header/index"; // ✅ Ensure Header is imported correctly
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn || false);

  // ✅ Ensure router exists before using it
  useEffect(() => {
    if (isLoggedIn && router) {
      router.push("/admin/DashboardPage");
    }
  }, [isLoggedIn, router]);

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(apiUrls.adminLogin, formData);

      if (response?.status === httpCode.SUCCESS) {
        const { token, is_admin, roles } = response.data;

        dispatch(setIsLoggedIn(true));
        dispatch(setAdminEmail(formData.email));
        dispatch(setIsAdminStatus(is_admin));
        dispatch(setAdminAccessToken(token));
        dispatch(setUserRoles(roles));

        toast.success("Login Successful");
        router.push("/admin/DashboardPage");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "Login failed. Try again.");
    }
  };

  return (
    <>
      <Container className="my-5 d-flex justify-content-center align-items-center">
        <Card style={{ width: "450px" }}>
          <Card.Body>
            <h2 className="text-center mb-4">Login</h2>
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  value={formData.email}
                  type="email"
                  onChange={handleChange}
                  name="email"
                  placeholder="Enter email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={formData.password}
                  type="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
              </Form.Group>

              <Button
                disabled={!formData.email || !formData.password}
                variant="primary"
                type="submit"
                className="w-100 mb-3"
              >
                Login
              </Button>

              <div className="text-center">
                <Link href="/admin/forgot-password">Forgot Password?</Link>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      <AdminFooter />
    </>
  );
};

export default Login;

//old code

// import { useEffect, useState } from "react";
// import { Button, Card, Container, Form } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import AdminFooter from "../components/admin/AdminFooter";
// import { setAdminEmail, setIsLoggedIn, setUserRoles,setIsAdminStatus,setAdminAccessToken } from "../redux/slices/auth.slice";
// import { pagePaths } from "../routes/constant";
// import api from "../utils/api.utils";
// import { apiUrls, httpCode } from "../utils/constants/api.constants";
// import Header from "./Header";
// import toast from "react-hot-toast";

// const Login = () => {
//   const { isLoggedIn } = useSelector((state) => state.auth);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (isLoggedIn) {
//       navigate(pagePaths.adminDashboard, { replace: true });
//     }
//   }, [isLoggedIn, navigate]);

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.post(apiUrls.adminLogin, formData);
//       if (response.status === httpCode.SUCCESS) {
//         dispatch(setIsLoggedIn(true));
//         dispatch(setAdminEmail(formData.email));
//         dispatch(setIsAdminStatus(response&&response.data.is_admin));
//         dispatch(setAdminAccessToken(response&&response.data.token));
//         dispatch(setUserRoles(response.data.roles));
//         navigate(pagePaths.adminProfile);
//         toast.success("Login Successfully")
//       } else {
//         dispatch(setIsLoggedIn(false));
//       }
//     } catch (error) {
//       const edata = error.response.data
//       toast.error(edata && edata.msg);
//       dispatch(setIsLoggedIn(false));
//     }
//   };

//   return (
//     <>
//       <Header />
//       <Container className="my-5 d-flex justify-content-center align-items-center">
//         <Card style={{ width: "450px", marginRight: "30px" }}>
//           <Card.Body>
//             <h2 className="text-center mb-4">Login</h2>
//             <Form onSubmit={handleLogin}>
//               <Form.Group className="mb-3" controlId="formBasicEmail">
//                 <Form.Label>Email address</Form.Label>
//                 <Form.Control
//                   value={formData.email}
//                   type="email"
//                   onChange={handleChange}
//                   name="email"
//                   placeholder="Enter email"
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3" controlId="formBasicPassword">
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control
//                   value={formData.password}
//                   type="password"
//                   name="password"
//                   onChange={handleChange}
//                   placeholder="Password"
//                 />
//               </Form.Group>

//               <Button
//                 disabled={!formData.email || !formData.password}
//                 variant="primary"
//                 type="submit"
//                 className="w-100 mb-3"
//               >
//                 Login
//               </Button>

//               <Link
//                 to={pagePaths.adminForgotPassword}
//                 variant="link"
//                 className="w-100 text-center mb-3"
//               // onClick={handleForgotPassword}
//               >
//                 Forgot Password?
//               </Link>
//             </Form>
//           </Card.Body>
//         </Card>
//       </Container>
//       <AdminFooter />
//     </>
//   );
// };

// export default Login;
