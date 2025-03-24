"use client";
import _ from "lodash";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import api from "../utils/api.utils";
import { apiUrls } from "../utils/constants/api.constants";
import Footer from "./Footer";
import Header from "./Header";
import ScrollToTop from "./ScrollToTop";
import client2 from "../public/images/client2.png";
import success from "../public/images/success.png";

export default function ThankYou() {
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
  useEffect(() => {
    api
      .get(apiUrls.getAllFaqs)
      .then((response) => {
        const results = _.get(response, "data.results");
        if (results) {
          setFaqs(results);
        }
      })
      .catch((error) => {
        console.error("Error fetching Faq:", error);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>THANKYOU | Buy Healthcare Products Online - Cureka</title>
        <meta
          name="description"
          content="Learn more about our company and team."
        />
      </Helmet>
      <Header />
      <div className="container-fluid px-0">
        <div className="bottom-border"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="pt-4 px-4">
                <div className="thankyou-bg justify-content-center">
                  <div className="text-center">
                    <img
                      src={success}
                      width="181px"
                      height="163px"
                      alt="success"
                    />
                  </div>
                  <h2 className="thankheading text-center mb-2">
                    Thank You For Subscribing!
                  </h2>
                  <p className="thank-msg text-center px-3 px-lg-0">
                    Everything we promised you will be sent to your inbox
                    shortly. While you wait for it arrive, continue the momentum
                    and have a look at an exclusive breakfast for business
                    owners just like you. Dr Hema Sathish Devadoss CEO Business
                    Success Systems
                  </p>
                </div>
                <div className="bussinessowner">
                  <h2 className="thankheading text-white text-center mt-0 mb-2">
                    FEAST FOR BUSINESS OWNERS!
                  </h2>
                  <p className="text-white text-center">
                    At the MCG, Melbourne
                  </p>
                  <div className="row pt-4 justify-content-center">
                    <div className="col-lg-4">
                      <div className="client">
                        <img
                          className="img-fluid mx-auto d-block client-img"
                          src={client2}
                          width="150px"
                          height="150px"
                          alt="clientone"
                        />
                        <h2 className="client-name text-white">Pedro Pascal</h2>
                        <p className="client-desig text-white">
                          CEO &amp; Co Founder
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-6 align-self-center">
                      <p className="thank-msg text-left text-white px-3 px-lg-0">
                        To help you on your new path to success I would like to
                        invite you to an exclusive Feast with business owners{" "}
                        <b>just like you!</b> As a new part of my community use
                        the <b>codeword: Cureka</b> to get a discount.
                      </p>
                      <div className="text-left px-3 px-lg-0">
                        <button
                          type="submit"
                          className="find-btn text-uppercase "
                        >
                          Find out more
                        </button>
                      </div>
                    </div>
                  </div>
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
