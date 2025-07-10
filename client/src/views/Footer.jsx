import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import clock from "../assets/images/clock.png";
import envelope from "../assets/images/envelope.png";
import fb from "../assets/images/fb.svg";
import food from "../assets/images/food.png";
import footerlogo from "../assets/images/footerlogo.svg";
import insta from "../assets/images/instagram.svg";
import linkedin from "../assets/images/linkedin.svg";
import map from "../assets/images/map.png";
import phone from "../assets/images/phone.png";
import pinterest from "../assets/images/pinterest.svg";
import youtube from "../assets/images/youtube.svg";
import { setShowLoginModel } from "../redux/slices/auth.slice";
import { pagePaths } from "../routes/constant";
import api from "../utils/api.utils";
import { apiUrls } from "../utils/constants/api.constants";
import useCustomerLoggedIn from "../utils/hooks/useCustomerLoggedIn";


import Modal from "react-bootstrap/Modal";
import UserLogin from "../../src/views/UserLogin";
import newbhmi from "../assets/images/newbhmi.svg";
import newgpay from "../assets/images/newgpay.svg";
import newmaestro from "../assets/images/newmaestro.svg";
import newmastercard from "../assets/images/newmastercard.svg";
import newpaytm from "../assets/images/newpaytm.svg";
import newphonepe from "../assets/images/newphonepe.svg";
import newrupay from "../assets/images/newrupay.svg";
import newvisa from "../assets/images/newvisa.svg";




export default function Footer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const { nestedCategories } = useSelector((state) => state.customer);
  const { showLoginModel } = useSelector((state) => state.auth);

  const [hoveredCategory, setHoveredCategory] = useState("");

  useEffect(() => {
    setHoveredCategory(nestedCategories[0]);
  }, [nestedCategories]);

  const onChangeHoveredCategory = (category) => () => {
    setHoveredCategory(category);
  };
  const { isLoggedIn } = useCustomerLoggedIn();
  const handleCloseLoginModel = () => dispatch(setShowLoginModel(false));
  const handleShowLoginModel = () => dispatch(setShowLoginModel(true));

  const formik = useFormik({
    initialValues: {
      new_email: '',
    },
    validationSchema: Yup.object({
      new_email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: async (values) => {
      console.log("fdf")
      try {
        setLoading(true);

        const response = await api.post(apiUrls.addsubscription, {
          email: values.new_email,
        });
        if (response.status === 200) {
          //setShowOtpInput(true);
          toast.success(response.data.message);
          setMsg(response.data.message);
          setTimeout(() => {
            navigate('/thankYou');
          }, 1000);

        } else {
          //setShowOtpInput(false);
          toast.success(response.data.message);
          setMsg(response.data.message);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        setMsg(error.message || 'An error occurred');
      }
    },
  });
  return (
    <>
      <footer>
        <section id="footer-section">
          <div className="container-fluid footer">
            <div className="container footer-space">
              <div className="row">
                <div className="col-lg-3 col-md-6">
                  <img
                    className="d-block mb-3"
                    src={footerlogo}
                    width="113px"
                    height="48px"
                    alt="footerlogo"
                  />

                  <div className="support">For Support & Order Inquiries</div>
                  <div className="d-flex">
                    <img className="mr-3 icon-map" src={map} width="10px" height="11px" alt="map" />

                    <p className="address text-left">
                      Wedjat Health Solutions Pvt. Ltd,75/1, Alagar Kovil Main Rd,Surveyor Colony,
                      Madurai, TamilNadu 625007
                    </p>
                  </div>

                  <div className="d-flex">
                    <img
                      className="mr-3 icon-map"
                      src={phone}
                      width="12px"
                      height="12px"
                      alt="phone"
                    />

                    <a className="address" href="tel:+91 9655928004">Call us at: +91 96559 28004</a>
                  </div>

                  <div className="d-flex">
                    <img
                      className="mr-3 icon-map"
                      src={envelope}
                      width="12px"
                      height="12px"
                      alt="envelope"
                    />
                    <a href="mailto:care@cureka.com" className="address">Email: care@cureka.com</a>
                  </div>

                  <div className="d-flex">
                    <img
                      className="mr-3 icon-map"
                      src={clock}
                      width="12px"
                      height="12px"
                      alt="clock"
                    />

                    <p className="address">Mon to Sat - 10:00 AM to 6:00 PM</p>
                  </div>
                </div>

                <div className="col-lg-2 col-md-6">
                  <div className="title">Categories</div>

                  {/* <ul className="category-list">
                    <li className="list-unstyled">
                      <a href="#">Nutrition</a>
                    </li>

                    <li className="list-unstyled">
                      <a href="#">Healthcare Devices</a>
                    </li>

                    <li className="list-unstyled">
                      <a href="#">Herbal & Ayurveda</a>
                    </li>

                    <li className="list-unstyled">
                      <a href="#">Wellness</a>
                    </li>

                    <li className="list-unstyled">
                      <a href="#">Pain Relief</a>
                    </li>

                    <li className="list-unstyled">
                      <a href="#">Hair Care</a>
                    </li>

                    <li className="list-unstyled">
                      <a href="skin">Skin Care</a>
                    </li>
                  </ul> */}
                  {!!nestedCategories?.length &&
                    nestedCategories?.map((item) => {
                      return (
                        <Nav.Item
                          className="list-unstyled"
                          key={item.id}
                          onMouseEnter={onChangeHoveredCategory(item)}
                        >
                          <Link to={`/product-category/${hoveredCategory?.slug}`}>
                            <Nav.Link
                              onClick={() => navigate(`/product-category/${hoveredCategory?.slug}`)}
                              eventKey={item.slug}
                            >
                              {item.name}
                            </Nav.Link>
                          </Link>
                        </Nav.Item>
                      );
                    })}
                </div>

                <div className="col-lg-2 col-md-6">
                  <div className="title">Customer Care</div>

                  <ul className="category-list">
                    {isLoggedIn ? (
                      <li className="list-unstyled">
                        <Link
                          to={!isLoggedIn ? "#" : pagePaths.myAccount}
                        >
                          My Account
                        </Link>
                      </li>
                    ) : (
                      <li className="list-unstyled">
                        <Link
                          onClick={!isLoggedIn ? handleShowLoginModel : null}
                        >My Account</Link>
                      </li>
                    )}

                    <li className="list-unstyled">
                      <Link to={pagePaths.blogs}>Blog</Link>
                    </li>

                    <li className="list-unstyled">
                      {/* <a href="medical-expert">Medical Expert</a> */}
                      <Link to={pagePaths.medicalExpert}>Medical Expert</Link>

                    </li>

                    <li className="list-unstyled">

                      <Link to={pagePaths.faqs}>Faq</Link>
                    </li>

                    <li className="list-unstyled">
                      {/* <a href="aboutus">About Us</a> */}
                      <Link to={pagePaths.aboutUs}>About Us</Link>

                    </li>

                    <li className="list-unstyled">
                      {/* <a href="contactus">Contact</a> */}
                      <Link to={pagePaths.contactUs}>Contact</Link>

                    </li>
                  </ul>
                </div>

                <div className="col-lg-2 col-md-6">
                  <div className="title">Our Policies</div>

                  <ul className="category-list">
                    <li className="list-unstyled">
                      <Link to={pagePaths.termsAndConditions}>Terms and Conditions</Link>
                    </li>
                    <li className="list-unstyled">
                      <Link to={pagePaths.cancellationRefund}>Cancellation & Refund</Link>
                    </li>
                    <li className="list-unstyled">
                      <Link to={pagePaths.disclaimerOfWarranties}>Disclaimer of Warranties</Link>
                    </li>
                    <li className="list-unstyled">
                      <Link to={pagePaths.privacyPolicy}>Privacy Policy</Link>
                    </li>
                    <li className="list-unstyled">
                      <a href="contactus">Help Center</a>
                    </li>
                    <li className="list-unstyled">
                      <a href="contactus">Submit a Dispute</a>
                    </li>
                  </ul>
                </div>

                <div className="col-lg-3 col-md-6 mb-3 mb-lg-0">
                  <div className="signup">
                    <div className="signup-form">
                      <div className="signup-heading">Sign Up for latest Updates & Newsletter</div>

                      <p className="signup-para ">
                        It is a long established fact that a reader will be distracted
                      </p>
                      <form onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                          <input
                            type="email"
                            id="new_email"
                            className="form-control"
                            placeholder="Enter Your Email Id"
                            name="new_email"
                            value={formik.values.new_email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            required
                          />
                          {formik.touched.new_email && formik.errors.new_email ? (
                            <div className="error">{formik.errors.new_email}</div>
                          ) : null}
                        </div>

                        <div className="send">
                          <button type="submit" className="send-btn border-0 p-0">
                            Send
                          </button>
                        </div>
                      </form>


                    </div>
                  </div>
                </div>
              </div>

              <div className="footer-border"></div>

              <div className="d-lg-flex justify-content-between d-flex-column">
                <div className="food-logo">
                  <div className="food">
                    <img src={food} width="320px" height="42px" alt="footer-secondlogo" />
                  </div>
                </div>

                <div className="social">
                  <div className="d-flex">
                    <a className="text-decoration-none" href="https://www.facebook.com/CurekaOfficial" target="_blank">
                      <div className="img-space fb" style={{ backgroundColor: "#004a98" }}>
                        <img src={fb} className="social-icons" width="14px" height="14px" />
                      </div>
                    </a>

                    <a className="text-decoration-none" href="https://www.instagram.com/curekaofficial/" target="_blank">
                      <div className="img-space" style={{ backgroundColor: "#E4405F" }}>
                        <img src={insta} className="social-icons" width="14px" height="14px" />
                      </div>
                    </a>

                    <a className="text-decoration-none" href="https://in.linkedin.com/company/curekahealthcare" target="_blank">
                      <div className="img-space" style={{ backgroundColor: "#0077B5" }}>
                        <img src={linkedin} className="social-icons" width="14px" height="14px" />
                      </div>
                    </a>

                    <a className="text-decoration-none" href="https://www.youtube.com/channel/UCLwAWxRufwp4qZcDRN1aKyg" target="_blank">
                      <div className="img-space" style={{ backgroundColor: "#FF0000" }}>
                        <img src={youtube} className="social-icons" width="14px" height="14px" />
                      </div>
                    </a>

                    <a className="text-decoration-none" href="https://in.pinterest.com/Curekashop/" target="_blank">
                      <div className="img-space" style={{ backgroundColor: "#E60023" }}>
                        <img src={pinterest} className="social-icons" width="14px" height="14px" />
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <div className="footer-border"></div>

              <div className="d-lg-flex justify-content-between d-flex-column">
                <div className="Copyright">
                  <p className="copyright-text p-0">Copyright © 2024 Cureka. All rights reserved.</p>
                </div>

                <div className="d-flex flex-wrap justify-content-around">
                  <div className="payment-logo">
                    <div className="">
                      <img src={newvisa} width="50px" height="24px" alt="visa-logo" />
                    </div>
                  </div>

                  <div className="payment-logo">
                    <div className="">
                      <img src={newmastercard} width="50px" height="24px" alt="master-logo" />
                    </div>
                  </div>

                  <div className="payment-logo">
                    <div className="payment-img">
                      <img src={newmaestro} width="50px" height="24px" alt="maestro-logo" />
                    </div>
                  </div>

                  <div className="payment-logo">
                    <div className="payment-img">
                      <img src={newrupay} width="50px" height="24px" alt="rupay-logo" />
                    </div>
                  </div>

                  <div className="payment-logo">
                    <div className="payment-img">
                      <img src={newbhmi} width="50px" height="24px" alt="bhmi-logo" />
                    </div>
                  </div>

                  <div className="payment-logo">
                    <div className="payment-img">
                      <img src={newpaytm} width="50px" height="24px" alt="paytm-logo" />
                    </div>
                  </div>

                  <div className="payment-logo">
                    <div className="payment-img">
                      <img src={newgpay} width="50px" height="24px" alt="gpay-logo" />
                    </div>
                  </div>

                  <div className="payment-logo">
                    <div className="payment-img">
                      <img src={newphonepe} width="50px" height="24px" alt="phonepe-logo" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </footer>
      <Modal
        show={showLoginModel}
        onHide={handleCloseLoginModel}
        dialogClassName="right_slidemodal-slider"
        id="loginModal"
        backdrop="static" // Prevents closing on backdrop click
        keyboard={false} // Optional: Prevent closing with Esc key
      >
        <div className="blue-wrapper" style={{ padding: 15 }}></div>
        <Modal.Body>
          <UserLogin handleCloseLoginModel={handleCloseLoginModel} />
        </Modal.Body>
        <Modal.Header closeButton></Modal.Header>
      </Modal>
    </>
  );
}
