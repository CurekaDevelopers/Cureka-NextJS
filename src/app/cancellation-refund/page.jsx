"use client";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "../../components/Breadcrumbs";
import { fetchPolicy } from "../../redux/action";
import Footer from "../../views/Footer";
import Header from "../../views/Header";
import ScrollToTop from "../../views/ScrollToTop";
import Image from "next/image";
export default function PrivacyPolicy({
  policyName = "Cancellation & Refund",
  policySlug = "Cancellation & Refund",
}) {
  const { policy } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 150) {
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
    if (policySlug) {
      dispatch(fetchPolicy(policySlug));
    }
  }, [dispatch, policySlug]);

  return (
    <>
      <Helmet>
        <title>
          {policyName || "Cureka"} - Cureka - Online Health Care Products Shop
        </title>

        <meta
          name="description"
          content={`${policyName} - Cureka is one of the leading online healthcare store dealing with the best in class home health careproducts`}
        />
        <meta name="keywords" content="about us, company, team, information" />
        <link rel="canonical" href={window.location.href} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cureka" />
        <meta
          property="og:description"
          content={`${policyName} -  Cureka is one of the leading online healthcare store dealing with the best in class home health careproducts`}
        />
        <meta
          property="og:image"
          content="https://frontend.cureka.com/assets/images/logo.svg"
        />
      </Helmet>
      <h1 style={{ display: "none" }}>{policyName}</h1>
      <Header />
      <div className="container-fluid px-0">
        <Breadcrumbs title={policyName} />
        <div className="bottom-border"></div>
        <div className="container">
          <h2 className="privacy-heading mb-4">{policyName}</h2>

          <div className="row">
            <div
              dangerouslySetInnerHTML={{ __html: policy.policy_content }}
              className="col-lg-12"
            ></div>
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
