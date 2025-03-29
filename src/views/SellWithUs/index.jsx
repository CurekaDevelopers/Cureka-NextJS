"use client";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
import Link from "next/link";
import * as Yup from "yup";
import badge from "../../public/images/badge.png";
import housechimney from "../../public/images/house-chimney.png";
import secure from "../../public/images/secure.png";
import wallet from "../../public/images/wallet.png";
import "../../styles/footer.css";
import api from "../../utils/api.utils";
import { apiUrls } from "../../utils/constants/api.constants";
import Footer from "../Footer";
import Header from "../Header";
import { useSelector } from "react-redux";
import { fetchHomePage } from "../../redux/action";

import { dispatch } from "../../redux/store";
import ScrollToTop from "../../../src/views/ScrollToTop";

export default function SellWithUsForm() {
  useEffect(() => {
    dispatch(fetchHomePage());
  }, []);
  const { healthPage } = useSelector((state) => state.admin);
  const [isVisible, setIsVisible] = useState(false);

  const formik = useFormik({
    initialValues: {
      Name: "",
      mobile_number: "",
      email: "",
      products: "",
      business_volume: "",
      catalog: "",
      brands: "",
      categories: "",
      address: "",
    },
    validationSchema: Yup.object({
      Name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be 50 characters or less")
        .required("Full Name is required"),
      mobile_number: Yup.string()
        .matches(/^\d{10}$/, "Mobile number must be 10 digits")
        .required("Mobile Number is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      products: Yup.number().required("Number of Products is required"),

      business_volume: Yup.string().required(
        "Annual Business Volume is required"
      ),
      categories: Yup.array().of(
        Yup.string().required("Annual Business Volume is required")
      ),

      catalog: Yup.string()
        .url("Invalid URL")
        .optional("Current Catalog Link is required"),
      brands: Yup.string().required("Brand Name is required"),

      address: Yup.string().max(500, "Message must be 500 characters or less"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await api.post(apiUrls.addsellwithus, {
          full_name: values.Name,
          mobile: values.mobile_number,
          email: values.email,
          annual_business_volume: values.business_volume,
          no_of_products: values.products,
          current_catalog_link: values.catalog,
          brand_name: values.brands,
          categories: values.categories,
          message: values.address,
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
      <Header />
      <div className="container-fluid px-0">
        <div className="container">
          <div className="d-flex home-back-section">
            <Link href="/">
              <img
                className="img-fluid d-flex align-self-center"
                src={housechimney}
                width="16px"
                height="16px"
                alt="home-icon"
              />
            </Link>
            <p className="section mb-0 ml-2">/ Sell With Us</p>
          </div>
        </div>

        <div className="bottom-border"></div>

        <div className="container mt-5" id="sellwithus">
          <div className="row">
            <div className="order-summary">
              <div className="col-lg-8">
                <form onSubmit={formik.handleSubmit}>
                  <div className="address-two">
                    <h1 className="doctors-heading">Sell With US</h1>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="firstname" htmlFor="Name">
                            Full Name<span className="required-star">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="Name"
                            name="Name"
                            placeholder="Enter your name"
                            value={formik.values.Name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.Name && formik.errors.Name ? (
                            <small className="text-danger">
                              {formik.errors.Name}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="mobileno" htmlFor="mobile_number">
                            Mobile Number
                            <span className="required-star">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="mobile_number"
                            name="mobile_number"
                            placeholder="Enter your Mobile Number"
                            value={formik.values.mobile_number}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.mobile_number &&
                          formik.errors.mobile_number ? (
                            <small className="text-danger">
                              {formik.errors.mobile_number}
                            </small>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="email" htmlFor="email">
                            Email<span className="required-star">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Enter your mail address"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.email && formik.errors.email ? (
                            <small className="text-danger">
                              {formik.errors.email}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="email" htmlFor="products">
                            Number of Products
                            <span className="required-star">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            id="products"
                            name="products"
                            placeholder="Number of Products"
                            value={formik.values.products}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.products && formik.errors.products ? (
                            <small className="text-danger">
                              {formik.errors.products}
                            </small>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label className="email" htmlFor="volume">
                            Annual Business Volume
                            <span className="required-star">*</span>
                          </label>
                          <div className="d-flex mt-2 mb-3">
                            <Form.Check
                              type="radio"
                              inline
                              className="address cursor-pointer"
                              label="Below 10 Lac"
                              name="business_volume"
                              id="Below10"
                              value="Below 10 Lac"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            <Form.Check
                              type="radio"
                              inline
                              className="address cursor-pointer"
                              label="Between 10-50 Lac"
                              name="business_volume"
                              id="Below50"
                              value="Between 10-50 Lac"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            <Form.Check
                              type="radio"
                              inline
                              className="address cursor-pointer"
                              label="Above 50 Lac"
                              name="business_volume"
                              id="above50"
                              value="Above 50 Lac"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                          </div>
                          {formik.touched.business_volume &&
                          formik.errors.business_volume ? (
                            <small className="text-danger">
                              {formik.errors.business_volume}
                            </small>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="email" htmlFor="catalog">
                            Current Catalog Link
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="catalog"
                            name="catalog"
                            placeholder="Current Catalog Link"
                            value={formik.values.catalog}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.catalog && formik.errors.catalog ? (
                            <small className="text-danger">
                              {formik.errors.catalog}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="email" htmlFor="brands">
                            Brand Name<span className="required-star">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="brands"
                            name="brands"
                            placeholder="Brand Name"
                            value={formik.values.brands}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.brands && formik.errors.brands ? (
                            <small className="text-danger">
                              {formik.errors.brands}
                            </small>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label className="email" htmlFor="categories">
                            Categories<span className="required-star">*</span>
                          </label>
                          <div className="d-flex mt-2 mb-3">
                            <Form.Check
                              inline
                              className="address cursor-pointer"
                              label="OTC"
                              name="categories"
                              id="otc"
                              value="OTC"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            <Form.Check
                              inline
                              className="address cursor-pointer"
                              label="NON OTC"
                              name="categories"
                              id="nonotc"
                              value="NON OTC"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                          </div>
                          {formik.touched.categories &&
                          formik.errors.categories ? (
                            <small className="text-danger">
                              {formik.errors.categories}
                            </small>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label className="address" htmlFor="address">
                            Your message
                          </label>
                          <textarea
                            style={{ height: "unset" }}
                            className="form-control"
                            type="text"
                            id="address"
                            rows="8"
                            cols="1"
                            name="address"
                            placeholder="Type Your Message"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          ></textarea>
                          {formik.touched.address && formik.errors.address ? (
                            <small className="text-danger">
                              {formik.errors.address}
                            </small>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12 mt-3">
                        <button
                          type="submit"
                          className="text-decoartion-none rate-btn"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* <!-- Who are we section Start --> */}

          <div className="mt-5 whoarewe">
            <h2 className="whoarewe-heading mb-3">Who Are We?</h2>

            <p className="whoarewe-para">
              Cureka is your boutique healthcare products & services platform
              started by a team of expert surgeons, well known in the field of
              Cosmetic Dermatology and Orthopedic Surgeries. All products on
              Cureka are curated by doctors and recommended for leading a
              healthy lifestyle.
            </p>

            <div className="row whoare-badge">
              <div className="col-lg-4">
                <div className="card">
                  <div className="card-space">
                    <img
                      className="img-fluid mx-auto d-block"
                      src={badge}
                      alt="badge"
                    />

                    <h2 className="badge-heading">Curated by Doctors</h2>

                    <p className="badge-para">
                      All products displayed on Cureka are procured from
                      verified and licensed manufacturers and FMCGs.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 top-space">
                <div className="card">
                  <div className="card-space">
                    <img
                      className="img-fluid mx-auto d-block"
                      src={secure}
                      alt="badge"
                    />

                    <h2 className="badge-heading">Secure</h2>

                    <p className="badge-para">
                      Cureka uses Secure Sockets Layer (SSL) 128-bit encryption
                      and is Payment Card Industry Data Security Standard (PCI
                      DSS) compliant
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 top-space">
                <div className="card">
                  <div className="card-space">
                    <img
                      className="img-fluid mx-auto d-block"
                      src={wallet}
                      alt="badge"
                    />

                    <h2 className="badge-heading">Affordable</h2>

                    <p className="badge-para">
                      Find affordable Healthcare & Wellness Products and their
                      substitutes. Save up to 50% on health products.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Who are we section End --> */}

          <div className="health-care">
            <div className="row">
              <div className="col-lg-6 align-self-center">
                <h2 className="healthcare-heading">
                  {/* Good Health Care 
                      
                      <br/>
                      is a Right: */}
                  {healthPage && healthPage[0] && healthPage[0].heading}:
                </h2>
                <p className="healthcare-para">
                  {healthPage &&
                    healthPage[0] &&
                    healthPage[0].content.replace(/<\/?p>/g, "")}
                </p>
              </div>
              <div className="col-lg-6">
                <img
                  className="img-fluid mx-auto d-block"
                  src={healthPage && healthPage[0] && healthPage[0].image}
                  alt="healthcarebg"
                />
              </div>
            </div>

            <div className="row mt-5">
              <div className="col-lg-6">
                <img
                  className="img-fluid mx-auto d-block"
                  src={healthPage && healthPage[1] && healthPage[1].image}
                  alt="motivebg"
                />
              </div>
              <div className="col-lg-6 align-self-center">
                <h2 className="motive-heading">
                  {healthPage && healthPage[1] && healthPage[1].heading}:
                </h2>
                {healthPage &&
                  healthPage[1] &&
                  healthPage[1].content.replace(/<\/?p>/g, "")}
                <p className="motive-para"></p>
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
