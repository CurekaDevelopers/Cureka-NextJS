"use client";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as Yup from "yup";
import clock from "../public/images/clock.png";
import envelope from "../public/images/envelope.png";
import fb from "../public/images/fb.svg";
import food from "../public/images/food.png";
import footerlogo from "../public/images/footerlogo.svg";
import insta from "../public/images/instagram.svg";
import linkedin from "../public/images/linkedin.svg";
import map from "../public/images/map.png";
import phone from "../public/images/phone.png";
import pinterest from "../public/images/pinterest.svg";
import youtube from "../public/images/youtube.svg";
import { setShowLoginModel } from "../redux/slices/auth.slice";
import { pagePaths } from "../utils/constants/constant";
import api from "../utils/api.utils";
import { apiUrls } from "../utils/constants/api.constants";
import useCustomerLoggedIn from "../utils/hooks/useCustomerLoggedIn";
import Modal from "react-bootstrap/Modal";
import UserLogin from "./UserLogin";
import newbhmi from "../public/images/newbhmi.svg";
import newgpay from "../public/images/newgpay.svg";
import newmaestro from "../public/images/newmaestro.svg";
import newmastercard from "../public/images/newmastercard.svg";
import newpaytm from "../public/images/newpaytm.svg";
import newphonepe from "../public/images/newphonepe.svg";
import newrupay from "../public/images/rupay.png";
import newvisa from "../public/images/newvisa.svg";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  const navigate = useRouter();
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
      new_email: "",
    },
    validationSchema: Yup.object({
      new_email: Yup.string()
        .email("Invalid email address")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      console.log("fdf");
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
            navigate.push("/thankYou");
          }, 1000);
        } else {
          //setShowOtpInput(false);
          toast.success(response.data.message);
          setMsg(response.data.message);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        setMsg(error.message || "An error occurred");
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
                  <Image
                    className="d-block mb-3"
                    src={footerlogo}
                    width={130}
                    height={48}
                    alt="footerlogo"
                  />

                  <div className="support">For Support & Order Inquiries</div>
                  <div className="d-flex">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="bg-orange-200 p-2 rounded-full text-xl mb-4 mr-2"
                      style={{ color: "#ff6347" }} // For tomato red color
                    />

                    <p className="address text-left">
                      Wedjat Health Solutions Pvt. Ltd,75/1, Alagar Kovil Main
                      Rd,Surveyor Colony, Madurai, TamilNadu 625007
                    </p>
                  </div>

                  <div className="d-flex">
                    <FontAwesomeIcon
                      icon={faPhone}
                      className="bg-orange-200  rounded-full text-xl mb-4 mr-3"
                      style={{ color: "#ff6347" }}
                    />

                    <a className="address mr-3" href="tel:+91 9655928004">
                      Call us at: +91 96559 28004
                    </a>
                  </div>

                  <div className="d-flex">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="bg-orange-200  rounded-full text-xl mb-4 mr-3"
                      style={{ color: "#ff6347" }}
                    />
                    <a href="mailto:care@cureka.com" className="address">
                      Email: care@cureka.com
                    </a>
                  </div>

                  <div className="d-flex">
                    <FontAwesomeIcon
                      icon={faClock}
                      className="bg-orange-200  rounded-full text-xl mb-4 mr-3"
                      style={{ color: "#ff6347" }}
                    />

                    <p className="address">Mon to Sat - 10:00 AM to 6:00 PM</p>
                  </div>
                </div>

                <div className="col-lg-2 col-md-6">
                  <div className="title">Categories</div>

                  {!!nestedCategories?.length &&
                    nestedCategories?.map((item) => {
                      if (item.nav_link?.trim().toLowerCase() !== "active")
                        return null;
                      return (
                        <Nav.Item
                          className="list-unstyled"
                          key={item.id}
                          onMouseEnter={onChangeHoveredCategory(item)}
                        >
                          <Nav.Link
                            onClick={() =>
                              navigate.push(
                                `/product-category/${hoveredCategory?.slug}`
                              )
                            }
                            eventKey={item.slug}
                          >
                            {item.name}
                          </Nav.Link>
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
                          href={!isLoggedIn ? "#" : "/account?tab=my-account"}
                        >
                          My Account
                        </Link>
                      </li>
                    ) : (
                      <li className="list-unstyled">
                        {/* <Link
                          onClick={!isLoggedIn ? handleShowLoginModel : null}
                        >
                          My Account
                        </Link> */}
                      </li>
                    )}

                    <li className="list-unstyled">
                      <Link href={"/blogs"}>Blog</Link>
                    </li>

                    <li className="list-unstyled">
                      {/* <a href="medical-expert">Medical Expert</a> */}
                      <Link href={"/medical-expert"}>Medical Expert</Link>
                    </li>

                    <li className="list-unstyled">
                      <Link href={"/faq"}>Faq</Link>
                    </li>

                    <li className="list-unstyled">
                      {/* <a href="aboutus">About Us</a> */}
                      <Link href={"/Aboutus"}>About Us</Link>
                    </li>

                    <li className="list-unstyled">
                      {/* <a href="contactus">Contact</a> */}
                      <Link href={"/Contactus"}>Contact</Link>
                    </li>
                  </ul>
                </div>

                <div className="col-lg-2 col-md-6">
                  <div className="title">Our Policies</div>

                  <ul className="category-list">
                    <li className="list-unstyled">
                      <Link href={"/terms-and-conditions"}>
                        Terms and Conditions
                      </Link>
                    </li>
                    <li className="list-unstyled">
                      <Link href={"/cancellation-refund"}>
                        Cancellation & Refund
                      </Link>
                    </li>
                    <li className="list-unstyled">
                      <Link href={"/disclaimer-of-warranties"}>
                        Disclaimer of Warranties
                      </Link>
                    </li>
                    <li className="list-unstyled">
                      <Link href={"/Privacypolicy"}>Privacy Policy</Link>
                    </li>
                    <li className="list-unstyled">
                      <a href="contactus">Help Center</a>
                    </li>
                    <li className="list-unstyled">
                      <a href="Contactus">Submit a Dispute</a>
                    </li>
                  </ul>
                </div>

                <div className="col-lg-3 col-md-6 mb-3 mb-lg-0">
                  <div className="signup">
                    <div className="signup-form">
                      <div className="signup-heading">
                        Sign Up for latest Updates & Newsletter
                      </div>

                      <p className="signup-para ">
                        It is a long established fact that a reader will be
                        distracted
                      </p>
                      <form onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                          <input
                            type="email"
                            id="new_email"
                            className="form-control p-2 "
                            placeholder="Enter Your Email Id"
                            name="new_email"
                            value={formik.values.new_email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            required
                          />
                          {formik.touched.new_email &&
                          formik.errors.new_email ? (
                            <div className="error">
                              {formik.errors.new_email}
                            </div>
                          ) : null}
                        </div>

                        <div className="send mt-3">
                          <button
                            type="submit"
                            className="send-btn border-0 p-0"
                          >
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
                    <Image
                      src={food}
                      width={320}
                      height={42}
                      alt="footer-secondlogo"
                    />
                  </div>
                </div>

                <div className="social">
                  <div className="d-flex">
                    <a
                      className="text-decoration-none"
                      href="https://www.facebook.com/CurekaOfficial"
                      target="_blank"
                    >
                      <div
                        className="img-space fb"
                        style={{ backgroundColor: "#004a98" }}
                      >
                        <Image
                          src={fb}
                          className="social-icons"
                          width={14}
                          height={14}
                          alt="fb"
                        />
                      </div>
                    </a>

                    <a
                      className="text-decoration-none"
                      href="https://www.instagram.com/curekaofficial/"
                      target="_blank"
                    >
                      <div
                        className="img-space"
                        style={{ backgroundColor: "#E4405F" }}
                      >
                        <Image
                          src={insta}
                          className="social-icons"
                          width={14}
                          height={14}
                          alt="insta"
                        />
                      </div>
                    </a>

                    <a
                      className="text-decoration-none"
                      href="https://in.linkedin.com/company/curekahealthcare"
                      target="_blank"
                    >
                      <div
                        className="img-space"
                        style={{ backgroundColor: "#0077B5" }}
                      >
                        <Image
                          src={linkedin}
                          className="social-icons"
                          width={14}
                          height={14}
                          alt="linkedin"
                        />
                      </div>
                    </a>

                    <a
                      className="text-decoration-none"
                      href="https://www.youtube.com/channel/UCLwAWxRufwp4qZcDRN1aKyg"
                      target="_blank"
                    >
                      <div
                        className="img-space"
                        style={{ backgroundColor: "#FF0000" }}
                      >
                        <Image
                          src={youtube}
                          className="social-icons"
                          width={14}
                          alt="youtube"
                        />
                      </div>
                    </a>

                    <a
                      className="text-decoration-none"
                      href="https://in.pinterest.com/Curekashop/"
                      target="_blank"
                    >
                      <div
                        className="img-space"
                        style={{ backgroundColor: "#E60023" }}
                      >
                        <Image
                          src={pinterest}
                          className="social-icons"
                          width={14}
                          height={14}
                          alt="pinterest"
                        />
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <div className="footer-border"></div>

              <div className="d-lg-flex justify-content-between d-flex-column">
                <div className="Copyright">
                  <p className="copyright-text p-0">
                    Copyright © 2024 Cureka. All rights reserved.
                  </p>
                </div>

                <div className="d-flex flex-wrap justify-content-around">
                  <div className="payment-logo">
                    <div className="">
                      <Image
                        src={newvisa}
                        width={50}
                        height={24}
                        alt="visa-logo"
                      />
                    </div>
                  </div>

                  <div className="payment-logo">
                    <div className="">
                      <Image
                        src={newmastercard}
                        width={50}
                        height={24}
                        alt="master-logo"
                      />
                    </div>
                  </div>

                  <div className="payment-logo">
                    <div className="payment-img">
                      <Image
                        src={newmaestro}
                        width={50}
                        height={24}
                        alt="maestro-logo"
                      />
                    </div>
                  </div>

                  <div className="payment-logo">
                    <div className="payment-img">
                      <Image
                        src={newrupay}
                        width={60}
                        height={35}
                        alt="rupay-logo"
                      />
                    </div>
                  </div>

                  <div className="payment-logo">
                    <div className="payment-img">
                      <Image
                        src={newbhmi}
                        width={50}
                        height={24}
                        alt="bhmi-logo"
                      />
                    </div>
                  </div>

                  <div className="payment-logo">
                    <div className="payment-img">
                      <Image
                        src={newpaytm}
                        width={50}
                        height={24}
                        alt="paytm-logo"
                      />
                    </div>
                  </div>

                  <div className="payment-logo">
                    <div className="payment-img">
                      <Image
                        src={newgpay}
                        width={50}
                        height={24}
                        alt="gpay-logo"
                      />
                    </div>
                  </div>

                  <div className="payment-logo">
                    <div className="payment-img">
                      <Image
                        src={newphonepe}
                        width={50}
                        height={24}
                        alt="phonepe-logo"
                      />
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
