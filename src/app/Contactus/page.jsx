"use client";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import Link from "next/link";
import * as Yup from "yup";
import contact_map from "../../public/images/contact_map.png";
import contactus_banner from "../../public/images/contactus_banner.png";
import housechimney from "../../public/images/house-chimney.png";
import message from "../../public/images/message.png";
import phone_call from "../../public/images/phone_call.png";
import "../../styles/contactus.css";
import api from "../../utils/api.utils";
import { apiUrls } from "../../utils/constants/api.constants";
import Footer from "./../../views/Footer";
import Header from "./../../views/Header/index";
import ScrollToTop from "../../views/ScrollToTop";
import Image from "next/image";
export default function Contactus() {
  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phoneno: Yup.string()
      .matches(/^[0-9]+$/, "Phone number is not valid")
      .required("Phone number is required"),
    subject: Yup.string().required("Subject is required"),
    message: Yup.string().required("Message is required"),
  });

  // Initialize Formik with initial values and validation schema
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneno: "",
      subject: "",
      message: "",
    },
    validationSchema: validationSchema,

    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await api.post(apiUrls.addconnectwithus, {
          name: values.name,
          email: values.email,
          mobile: values.phoneno,
          subject: values.subject,
          message: values.message,
        });
        if (response.status === 201) {
          toast.success("Form submitted successfully");
          resetForm();
        } else {
          toast.error("Failed to submit the form");
        }
      } catch (error) {
        toast.error(error.message || "An error occurred");
      }
    },
  });
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <Helmet>
        <title>Contact | Online Health Care Products Shop - Cureka</title>
        <meta
          name="description"
          content="Contact us to know more about our health care products, your order details and more. Also contact us through our WhatsApp chatfeature."
        />
        <link rel="canonical" href={window.location.href} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cureka" />
        <meta
          property="og:description"
          content="Contact us to know more about our health care products, your order details and more. Also contact us through our WhatsApp chatfeature."
        />
        <meta
          property="og:image"
          content="https://frontend.cureka.com/assets/images/logo.svg"
        />
      </Helmet>

      <Header />
      <div className="container-fluid px-0">
        <div className="banner">
          <Image
            className="img-fluid d-block mx-auto"
            src={contactus_banner}
            width="100%"
            height="380px"
            alt="contactus-banner"
          />

          <div className="container">
            <h1 className="banner-heading">Contact Us</h1>
          </div>
        </div>

        <div className="container">
          <div className="d-flex home-back-section">
            <Link href="/">
              <Image
                className="img-fluid d-flex align-self-center"
                src={housechimney}
                width="16px"
                height="16px"
                alt="home-icon"
              />
            </Link>
            <p className="section mb-0 ml-3">/ &nbsp;&nbsp;Contact Us</p>
          </div>
        </div>

        <div className="bottom-border"></div>

        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h2 className="contact">Connect With Us</h2>

              <p className="contact-para">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is.
              </p>

              <form onSubmit={formik.handleSubmit}>
                <div id="contact-form">
                  <div className="form-group">
                    <label className="firstname" htmlFor="name">
                      Name<span className="required-star">*</span>
                    </label>
                    <input
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <div className="text-danger">{formik.errors.name}</div>
                    ) : null}
                  </div>

                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="email" htmlFor="email">
                          Email<span className="required-star">*</span>
                        </label>
                        <input
                          className="form-control"
                          id="email"
                          name="email"
                          placeholder="Enter your email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email ? (
                          <div className="text-danger">
                            {formik.errors.email}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="phoneno" htmlFor="phoneno">
                          Phone Number<span className="required-star">*</span>
                        </label>
                        <input
                          className="form-control"
                          id="phoneno"
                          name="phoneno"
                          placeholder="Enter your phone number"
                          value={formik.values.phoneno}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.phoneno && formik.errors.phoneno ? (
                          <div className="text-danger">
                            {formik.errors.phoneno}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="subject" htmlFor="subject">
                          Subject<span className="required-star">*</span>
                        </label>
                        <input
                          className="form-control"
                          id="subject"
                          name="subject"
                          placeholder="Select subject"
                          value={formik.values.subject}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        ></input>
                        {formik.touched.subject && formik.errors.subject ? (
                          <div className="text-danger">
                            {formik.errors.subject}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="message" htmlFor="message">
                          Message<span className="required-star">*</span>
                        </label>
                        <textarea
                          className="form-control box-height"
                          style={{ height: "130px" }}
                          name="message"
                          id="message"
                          placeholder="Message here..."
                          value={formik.values.message}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          cols="10"
                          rows="6"
                        />
                        {formik.touched.message && formik.errors.message ? (
                          <div className="text-danger">
                            {formik.errors.message}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="btn sent-btn">
                    Send
                  </button>
                </div>
              </form>
            </div>

            <div className="col-lg-6">
              <div className="map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31437.712457405465!2d78.13366153033797!3d9.957731690145547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c790b1a4d855%3A0x18ff047ae22f738b!2sCureka!5e0!3m2!1sen!2sin!4v1695200474252!5m2!1sen!2sin"
                  width="100%"
                  height="560px"
                  allowfullscreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="row above-space" id="contact-foot">
            <div className="col-lg-4">
              <div className="card">
                <div className="contact-circle">
                  <Image
                    className="img-fluid mx-auto"
                    width="22px"
                    height="24px"
                    src={contact_map}
                    alt="contact_map"
                  />
                </div>

                <p className="contact-address">
                  Wedjat Health Solutions Private Limited,
                  <span className="contact-subaddress">
                    {" "}
                    75/1, Alagar Kovil Main Rd, Surveyor Colony, Madurai, Tamil
                    Nadu 625007
                  </span>
                </p>
              </div>
            </div>

            <div className="col-lg-4 mt-3 mt-lg-0">
              <div className="card">
                <div className="d-flex-column my-auto">
                  <div className="contact-circle">
                    <Image
                      className="img-fluid mx-auto"
                      width="24px"
                      height="24px"
                      src={message}
                      alt="message"
                    />
                  </div>

                  <a
                    href="mailto:info@cureka.com"
                    className="contact-address d-block mx-auto text-decoration-none"
                  >
                    info@cureka.com
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-4 mt-3 mt-lg-0">
              <div className="card">
                <div className="d-flex-column my-auto">
                  <div className="contact-circle">
                    <Image
                      className="img-fluid mx-auto"
                      width="24px"
                      height="24px"
                      src={phone_call}
                      alt="phone_call"
                    />
                  </div>

                  <a
                    href="tel:+91 9655928004"
                    className="contact-address d-block mx-auto text-decoration-none"
                  >
                    +91 96559 28004
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <div className="">
        <ScrollToTop isVisible={isVisible} />
      </div>
    </>
  );
}
