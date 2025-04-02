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
  const [faqs, setFaqs] = useState();
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const [activeKey, setActiveKey] = useState(null);

  // Toggle the active key for each accordion item
  const handleToggle = (key) => {
    setActiveKey(activeKey === key ? null : key);
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

  const faqSchema =
    faqs && typeof faqs === "object" && Object.keys(faqs).length > 0
      ? {
          "@context": "https://schema.org/",
          "@type": "FAQPage",
          mainEntity: Object.keys(faqs).flatMap((category) =>
            faqs[category].map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                namea: item.answer,
              },
            }))
          ),
        }
      : ""; // If faqs is not available, don't generate the schema

  return (
    <>
      <Helmet>
        <title>FAQ | Buy Healthcare Products Online - Cureka</title>
        <meta
          name="description"
          content="Shop the best of health care products under one roof. Choose from a wide range of products. Best Prices. GreatDiscounts."
        />
        <link rel="canonical" href={window.location.href} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cureka" />
        <meta
          property="og:description"
          content="Shop the best of health care products under one roof. Choose from a wide range of products. Best Prices. GreatDiscounts."
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
              <Accordion activeKey={activeKey} id="faqaccord">
                {faqs &&
                  Object.keys(faqs).map((faqCategory, i) => (
                    <div key={i}>
                      <h2 className="faq-heading">{faqCategory}</h2>
                      {faqs[faqCategory].map((item) => (
                        <Accordion.Item
                          eventKey={item.id.toString()}
                          key={item.id}
                        >
                          {/* Custom clickable header with an arrow icon */}
                          <div
                            className="custom-accordion-header details-subheading"
                            onClick={() => handleToggle(item.id.toString())}
                          >
                            <h4>{item.question}</h4>
                            {/* Arrow icon that rotates based on the activeKey */}
                            <span
                              className={`arrow-icon ${
                                activeKey === item.id.toString() ? "open" : ""
                              }`}
                            >
                              ▼
                            </span>
                          </div>

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
