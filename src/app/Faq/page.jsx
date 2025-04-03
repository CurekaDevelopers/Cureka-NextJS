"use client";
import _ from "lodash";
import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { Helmet } from "react-helmet-async";
import Link from "next/link";
import housechimney from "../../public/images/house-chimney.png";
import "../../styles/Faq.css";
import api from "../../utils/api.utils";
import { apiUrls } from "../../utils/constants/api.constants";
import Footer from "../../views/Footer";
import Header from "../../views/Header/index";
import ScrollToTop from "../../views/ScrollToTop";
import Image from "next/image";

export default function FaqsPage() {
  const [faqs, setFaqs] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [activeKeys, setActiveKeys] = useState([]); // Use an array to store active keys

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    api
      .get(apiUrls.getAllFaqs)
      .then((response) => {
        const results = _.get(response, "data.results", []);
        if (results) {
          setFaqs(results);
        }
      })
      .catch((error) => {
        console.error("Error fetching Faq:", error);
      });
  }, []);

  const handleToggle = (key) => {
    setActiveKeys(
      (prevKeys) =>
        prevKeys.includes(key)
          ? prevKeys.filter((item) => item !== key) // Close if already open
          : [...prevKeys, key] // Otherwise, open it
    );
  };

  const faqSchema =
    faqs && Object.keys(faqs).length > 0
      ? {
          "@context": "https://schema.org/",
          "@type": "FAQPage",
          mainEntity: Object.keys(faqs).flatMap((category) =>
            faqs[category].map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            }))
          ),
        }
      : "";

  return (
    <>
      <Helmet>
        <title>FAQ | Buy Healthcare Products Online - Cureka</title>
        <meta
          name="description"
          content="Shop the best of health care products under one roof. Choose from a wide range of products. Best Prices. Great Discounts."
        />
        <link
          rel="canonical"
          href={typeof window !== "undefined" ? window.location.href : ""}
        />
        <meta
          property="og:url"
          content={typeof window !== "undefined" ? window.location.href : ""}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cureka" />
        <meta
          property="og:description"
          content="Shop the best of health care products under one roof. Choose from a wide range of products. Best Prices. Great Discounts."
        />
        <meta
          property="og:image"
          content="https://frontend.cureka.com/assets/images/logo.svg"
        />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <h1 style={{ display: "none" }}>FAQ</h1>
      <Header />
      <div className="container-fluid px-0">
        <div className="container">
          <div className="d-flex home-back-section">
            <Link href="/">
              <Image
                className="img-fluid d-flex align-self-center"
                src={housechimney}
                width={16}
                height={16}
                alt="home-icon"
              />
            </Link>
            <p className="section mb-0 ml-3">/ &nbsp;&nbsp;&nbsp;FAQ’s</p>
          </div>
        </div>

        <div className="bottom-border"></div>

        <div className="container">
          <h1 className="privacy-heading mb-4">FAQ’s</h1>
          <div className="row">
            <div className="col-lg-12">
              <Accordion activeKey={activeKeys} alwaysOpen>
                {faqs &&
                  Object.keys(faqs).map((faqCategory, i) => (
                    <div key={i}>
                      <h2 className="faq-heading">{faqCategory}</h2>
                      {faqs[faqCategory].map((item) => (
                        <Accordion.Item
                          eventKey={item.id.toString()}
                          key={item.id}
                        >
                          <Accordion.Header
                            onClick={() => handleToggle(item.id.toString())}
                          >
                            {item.question}
                          </Accordion.Header>
                          <Accordion.Body>
                            <p className="details-para">{item.answer}</p>
                          </Accordion.Body>
                        </Accordion.Item>
                      ))}
                    </div>
                  ))}
              </Accordion>
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
