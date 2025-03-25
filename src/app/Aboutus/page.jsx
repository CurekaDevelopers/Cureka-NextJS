"use client";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import Link from "next/link";
import aboutus_banner_mobile from "../../public/images/aboutus-mobile.png";
import aboutus_banner from "../../public/images/aboutus_banner.png";
import badge from "../../public/images/badge.png";
import client1 from "../../public/images/client1.png";
import client2 from "../../public/images/client2.png";
import client3 from "../../public/images/client3.png";
import client4 from "../../public/images/client4.png";
import doctors from "../../public/images/doctors.png";
import housechimney from "../../public/images/house-chimney.png";
import milestones from "../../public/images/milestones.png";
import secure from "../../public/images/secure.png";
import video_banner from "../../public/images/video_banner.png";
import wallet from "../../public/images/wallet.png";
import "../../styles/aboutus.css";
import { fetchHomePage } from "../../redux/action";
import { dispatch } from "../../redux/store";
import Footer from "../../views/Footer";
import Header from "../../views/Header";
import ScrollToTop from "../../views/ScrollToTop";
import Image from "next/image";
export default function Aboutus() {
  const { healthPage } = useSelector((state) => state.admin);
  useEffect(() => {
    dispatch(fetchHomePage());
  }, []);

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

  const aschema = {
    "@context": "https://schema.org/",
    "@type": "WebPage",
    name: "About Us",
    description: "Learn more about our company and our mission.",
    url: "https://frontend.cureka.com/aboutus",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@id": "https://example.com/",
            name: "Home",
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@id": "https://frontend.cureka.com/aboutus",
            name: "About Us",
          },
        },
      ],
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://frontend.cureka.com/aboutus",
    },
  };
  return (
    <>
      <Helmet>
        <title>About Us - Cureka</title>
        <meta
          name="description"
          content="Buy health care products online in India at low prices from us. We offer you the best products online at the best price. Check outnow."
        />
        <meta name="keywords" content="about us, company, team, information" />
        <link rel="canonical" href={window.location.href} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cureka" />
        <meta
          property="og:description"
          content="Buy health care products online in India at low prices from us. We offer you the best products online at the best price. Check outnow."
        />
        <meta
          property="og:image"
          content="https://frontend.cureka.com/assets/images/logo.svg"
        />
        <script type="application/ld+json"></script>
        <script type="application/ld+json">{JSON.stringify(aschema)}</script>
      </Helmet>
      <h1 style={{ display: "none" }}>Aboutus</h1>
      <Header />
      <div className="container-fluid px-0">
        <div className="banner">
          <picture>
            <source media="(max-width: 767px)" srcSet={aboutus_banner_mobile} />
            <Image
              className="img-fluid d-block mx-auto banner-image"
              src={aboutus_banner}
              width="100%"
              height="380px"
              alt="aboutus_banner"
            />
          </picture>

          <div className="container abouus-heading">
            <h2 className="ban-heading">About Us</h2>

            <p className="aboutus-para">
              Good healthcare is a right. No matter where you live, you should
              have access to good healthcare. Following this philosophy, Wedjat
              Healthcare Private Limited was founded in August 2014 to deliver
              necessary healthcare items and durable at your doorstep.
            </p>
          </div>
        </div>

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
            <p className="section mb-0 ml-3">/ &nbsp;&nbsp;About Us</p>
          </div>
        </div>

        <div className="bottom-border"></div>

        {/* <!-- About cureka section start --> */}

        <div className="container">
          <div className="aboutus">
            <div className="row">
              <div className="col-lg-6 left-space">
                <Image
                  className="img-fluid d-block"
                  src={doctors}
                  width={580}
                  height={348}
                  alt="doctors-image"
                />
              </div>

              <div className="col-lg-6 left-space">
                <h2 className="cureka-about mt-4">About Cureka</h2>

                <p className="cureka-para">
                  Cureka is an online healthcare store that boasts of an
                  assortment of healthcare products that have been meticulously
                  tested and selected as the best in the market. Cureka does not
                  promote healthcare products from any random FMCG company.
                  Cureka offers health and wellness products only from the
                  leading brands of the world. Our policy is to bring to you
                  only those products that are effective and is value for money.
                </p>

                <div className="d-lg-flex d-flex-column">
                  <div className="client right-border pl-lg-0">
                    <p className="product-num">5K</p>

                    <p className="product-details">Products</p>
                  </div>

                  <div className="client right-border">
                    <p className="product-num register-color">30K</p>

                    <p className="product-details">Registered Users</p>
                  </div>

                  <div className="client">
                    <p className="product-num deliver-color">52K</p>

                    <p className="product-details">Orders Delivered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- About cureka section End --> */}

        {/* <!-- Ourvalues section Start --> */}

        <div className="ourvalues">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 align-self-center">
                <h2 className="values-heading">Our Values</h2>
              </div>

              <div className="col-lg-6">
                <p className="values-para">
                  {
                    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Ourvalues section End --> */}

        {/* <!-- OutTeam section Start --> */}

        <div className="ourteam">
          <h2 className="cureka-about text-center mb-5">Our Team</h2>

          <div className="d-lg-flex justify-content-lg-center d-flex-column">
            <div className="client">
              <Image
                className="img-fluid mx-auto d-block"
                src={client1}
                width={180}
                height={180}
                alt="clientone"
              />

              <h2 className="client-name">Emilia Clarke</h2>

              <p className="client-desig">Founder</p>
            </div>

            <div className="client">
              <Image
                className="img-fluid mx-auto d-block"
                src={client2}
                width={180}
                height={180}
                alt="clientone"
              />

              <h2 className="client-name">Pedro Pascal</h2>

              <p className="client-desig">CEO & Co Founder</p>
            </div>

            <div className="client">
              <Image
                className="img-fluid mx-auto d-block"
                src={client3}
                width={180}
                height={180}
                alt="clientone"
              />

              <h2 className="client-name">Sophie Turner</h2>

              <p className="client-desig">Director</p>
            </div>

            <div className="client">
              <Image
                className="img-fluid mx-auto d-block"
                src={client4}
                width={180}
                height={180}
                alt="clientone"
              />

              <h2 className="client-name">Kit Harington</h2>

              <p className="client-desig">Manager</p>
            </div>
          </div>
        </div>

        {/* <!-- OutTeam section End --> */}

        {/*<!-- Milestones section Start --> */}

        <div className="ourteam">
          <div className="container">
            <h2 className="cureka-about celebrate">
              Celebrating Our Milestones
            </h2>

            <div className="row">
              <div className="col-lg-6">
                <div className="d-flex mt-lg-5">
                  <div className="col-lg-2">
                    <p className="milestone-year active">2018</p>
                  </div>

                  <div className="col-lg-2">
                    <p className="milestone-year">2019</p>
                  </div>

                  <div className="col-lg-2">
                    <p className="milestone-year">2020</p>
                  </div>

                  <div className="col-lg-2">
                    <p className="milestone-year">2022</p>
                  </div>

                  <div className="col-lg-2">
                    <p className="milestone-year">2023</p>
                  </div>

                  <div className="col-lg-2">
                    <p className="milestone-year">2024</p>
                  </div>
                </div>

                <div className="progress">
                  <div className="horizontal-border progress-bar"></div>
                </div>

                <h2 className="milestone-heading">
                  It is a long established fact that a reader
                </h2>

                <p className="milestone-para">
                  {
                    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
                  }
                </p>
              </div>

              <div className="col-lg-6">
                <Image
                  className="img-fluid d-block"
                  src={milestones}
                  width="100%"
                  height="348px"
                  alt="doctors-image"
                />
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Milestones section end --> */}

        {/* <!-- video section Start --> */}

        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="video-wrapper">
                <a className="video" target="_blank" href="#">
                  <Image
                    className="img-fluid"
                    src={video_banner}
                    width="100%"
                    height="432px"
                    alt="video-banner"
                  />

                  <div className="video-circle">
                    <div className="video-play"></div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- video section End --> */}

        <div className="container">
          <h2 className="range">Our Range of Products</h2>

          <div className="products-summary">
            <p className="products-para">
              <i>
                Cureka specializes in a huge range of healthcare essentials.
                They are as follows:
              </i>
            </p>

            <p className="products-para">
              <span className="products-para-color">Health Equipment:</span>{" "}
              Accessories like
              <span className="products-para-color">
                activity trackers, fracture care equipments, wheelchairs
              </span>
              etc.
            </p>

            <p className="products-para">
              Wearable activity trackers (WAT) are electronic monitoring devices
              that enable users to track and monitor their health-related
              physical fitness metrics including steps taken, level of activity,
              walking distance, heart rate, and sleep patterns. Cureka has
              curated multiple number of such wearable trackers with different
              functions , applications and to match every pocket too!!
            </p>

            <p className="products-para">
              <span className="products-para-color">
                Patient & Elderly Care:
              </span>{" "}
              Machines like{" "}
              <span className="products-para-color">glucometer,</span> pulse
              oximeter, thermometer,{" "}
              <span className="products-para-color">
                weighing scales, walking aids, hearing aids
              </span>{" "}
              etc.
            </p>

            <p className="products-para">
              <span className="products-para-color">Health Supplements:</span>{" "}
              From food supplements to{" "}
              <span className="products-para-color">protein bars</span> to
              calcium supplements
            </p>

            <p className="products-para">
              <span className="products-para-color">Vitamin supplements</span>{" "}
              for regular consumption
            </p>

            <p className="products-para">
              <span className="products-para-color">Protein powders</span>
            </p>

            <p className="products-para">
              <span className="products-para-color">Weight gain</span> and{" "}
              <span className="products-para-color">weight loss </span>
            </p>

            <p className="products-para">
              <span className="products-para-color">
                Pain management equipment and products
              </span>
            </p>

            <p className="products-para">
              <span className="products-para-color">Skincare products</span>{" "}
              ranging from sunscreen lotions to{" "}
              <span className="products-para-color">anti-aging products</span>
            </p>

            <p className="products-para">
              <span className="products-para-color">Haircare products</span>
            </p>

            <p className="products-para">
              Dermatologists are the experts in handling hair related problems.
              Choosing the right{" "}
              <span className="products-para-color">hair care product</span> for
              yourself is quite a challenge! Understanding what the problem is
              and then making a wise choice on what to choose is what Cureka
              intends hand hold you through. Products related to hair cleansers,
              dandruff problems, premature graying, frizzy hair, dull hair,
              damaged hair, hair loss make and female pattern, the list goes on.
              Pharmaceutical products like multivitamins,{" "}
              <span className="products-para-color">protein powders,</span>{" "}
              medicated shampoos, hair growth lotions, biomimetics, etc. are all
              chosen by expert doctors. Ayurvedic and herbal products to boost
              hair growth also find equal place at Cureka !
            </p>

            <p className="products-para">
              <span className="products-para-color">Lip care product</span> and
              nail care products
            </p>

            <p className="products-para">
              Products for <span className="products-para-color">mother</span>{" "}
              and <span className="products-para-color">baby</span>
            </p>

            <p className="products-para">
              <span className="products-para-color">Ayurvedic products</span>{" "}
              categorized from the point of view of concerns: From anti-stress
              products to products aimed at curbing respiratory illnesses.
            </p>
          </div>

          {/* <!-- Who are we section Start --> */}

          <div className="whoarewe">
            <h2 className="whoarewe-heading">Who Are We?</h2>

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
                    <Image
                      className="img-fluid mx-auto d-block"
                      src={badge}
                      width=""
                      height=""
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
                    <Image
                      className="img-fluid mx-auto d-block"
                      src={secure}
                      width=""
                      height=""
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
                    <Image
                      className="img-fluid mx-auto d-block"
                      src={wallet}
                      width=""
                      height=""
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
                  width=""
                  height=""
                  alt="healthcarebg"
                />
              </div>
            </div>

            <div className="row mt-5">
              <div className="col-lg-6">
                <img
                  className="img-fluid mx-auto d-block"
                  src={healthPage && healthPage[1] && healthPage[1].image}
                  width=""
                  height=""
                  alt="motivebg"
                />
              </div>
              <div className="col-lg-6 align-self-center">
                <h2 className="motive-heading">
                  {healthPage && healthPage[1] && healthPage[1].heading}:
                </h2>
                <p className="motive-para">
                  {healthPage &&
                    healthPage[1] &&
                    healthPage[1].content.replace(/<\/?p>/g, "")}
                </p>
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
