"use client";
import { useEffect, useState } from "react";
import "react-caroussel/dist/index.css";
import { Helmet } from "react-helmet-async";
import badge from "../../public/images/badge.png";
import housechimney from "../../public/images/house-chimney.png";
import secure from "../../public/images/secure.png";
import wallet from "../../public/images/wallet.png";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Link from "next/link";
import "../../styles/home.css";
import "../../styles/medicalexpert.css";
import { pagePaths } from "../../utils/constants/constant";

import Footer from "../../views/Footer";
import Header from "../../views/Header";

import ScrollToTop from "../../views/ScrollToTop";

import { useSelector } from "react-redux";
import { fetchHomePage } from "../../redux/action";
import { dispatch } from "../../redux/store";
import Image from "next/image";
export default function MedicalExpert() {
  const { healthPage } = useSelector((state) => state.admin);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchHomePage());
  }, []);
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
        <title>Medical Expert - Cureka</title>
        <meta
          name="description"
          content="MEDICAL EXPERT - Cureka - Online Health Care Products Shop"
        />
        <link rel="canonical" href={window.location.href} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cureka" />
        <meta
          property="og:description"
          content="MEDICAL EXPERT - Cureka - Online Health Care Products Shop"
        />
        <meta
          property="og:image"
          content="https://frontend.cureka.com/assets/images/logo.svg"
        />
      </Helmet>
      <h1 style={{ display: "none" }}>Medical Expert</h1>
      <Header />

      <div className="container">
        <div className="d-flex home-back-section">
          <Link href={pagePaths.home}>
            <Image
              className="img-fluid d-flex align-self-center"
              src={housechimney}
              width={16}
              height={16}
              alt="home-icon"
            />
          </Link>

          <p className="section mb-0 ml-3">
            / &nbsp;&nbsp;&nbsp;Medical Expert
          </p>
        </div>
      </div>
      <div className="bottom-border"></div>
      <div className="container">
        <div className="row mt-5">
          <div className="col-lg-12">
            <h2 className="whoarewe-heading text-center">Meet the Founders</h2>
          </div>
        </div>
        <div className="row mt-5" style={{ marginBottom: "30px" }}>
          <div className="col-lg-6">
            <div className="text-left pb-4">
              <h3>Dr Sathish Devadoss,</h3>
              <p>
                <i>M.BB.S., M.S., Ortho, M.Ch., Orth(UK),FASIF(Aust).,</i>
              </p>
              <h6>Joint Managing Director | Wedjat Health Solutions</h6>
            </div>
            <div className="row">
              <div>
                <p>
                  Dr Sathish Devadoss is primarily an Orthopedic Surgeon who
                  completed his under graduation and masters in India and later
                  underwent special training in Orthopedic Surgery in Germany,
                  United Kingdom, France and Australia. He came back to India in
                  2002 and started his practice in{" "}
                  <a
                    href="https://www.nhp.gov.in/hospital/madurai-institute-of-orthopaedics-and-traumatology-madurai-tamil_nadu"
                    className="products-para-color"
                    target="_blank"
                  >
                    Institute of Orthopedics in Madurai
                  </a>{" "}
                  and later as a Consultant at{" "}
                  <a
                    href="https://www.apollohospitals.com/locations/india/madurai"
                    className="products-para-color"
                    target="_blank"
                  >
                    Apollo Hospital
                  </a>
                  , Madurai. Currently he is the Medical Director of{" "}
                  <a
                    href="https://www.devadosshospitals.com/"
                    className="products-para-color"
                    target="_blank"
                  >
                    Devadoss Multispecialty Hospitals
                  </a>{" "}
                  located in Madurai.
                </p>
              </div>

              <div className="col-lg-12 mt-3">
                <p className="mb-4">
                  He specializes in Joint replacement surgery, Arthroscopy,
                  Fracture surgery, Microscopic spine surgery, Computerized
                  Orthopedic Surgery, Limb reconstructive surgery, Pediatric
                  Orthopedic surgery to name a few.
                </p>
                <p className="mb-4">
                  He has presented scientific papers in many national and
                  International conferences and in scientific journals. He
                  regularly teaches orthopedics to post-graduates in orthopedics
                  in the hospital which is a recognized post-graduate institute
                  for DNB(Ortho) New Delhi.
                </p>
                <p className="mb-4">
                  In 2007, along with his father Prof .A .Devadoss and wife Dr
                  Hema Sathish, he started the{" "}
                  <a
                    href="https://www.devadosshospitals.com/"
                    className="products-para-color"
                    target="_blank"
                  >
                    Devadoss Hospitals Pvt Ltd
                  </a>
                  , a 120 bed private multispecialty hospital at Madurai. The
                  hospital has 22 full time consultants and over 75 visiting
                  consultants and more than 250 employees work there. The
                  hospital is a fully equipped modern Multi-specialty medical
                  Centre with 4 modern operation theaters, 18 Intensive care
                  beds, 6 Neonatal intensive care beds, 4 slice CT scan,
                  Cathlab, 4 dialysis machines, Automatic Laboratory, Digital
                  X-Rays ,Labor theatres with consultants in all specialties.
                </p>
                <p className="mb-4">
                  A philanthropist by nature he has conducted many free medical
                  camps and performed more the 200 free surgeries for children
                  with deformities. He is the Managing trustee of
                  Annamalai-Padmavathy trust started in his grandparents name
                  which helps many poor patients and also runs a Nursing
                  college.
                </p>
                <p className="mb-4">
                  The Tamilnadu{" "}
                  <a
                    href="https://www.tnmgrmu.ac.in/"
                    className="products-para-color"
                    target="_blank"
                  >
                    Dr MGR Medical University
                  </a>{" "}
                  recognizing his activities and service to society awarded the
                  "Best Doctor Award" to him in 2012.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <img
              className="img-fluid mx-auto d-block doctors-images "
              src="https://www.cureka.com/wp-content/uploads/2019/12/dr-sathish-devadoss.png"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="text-left pb-4">
              <h3>Dr Hema Sathish Devadoss</h3>
              <p>
                <i>M.BB.S., D.D.,(UK)</i>
              </p>
              <h6>Managing Director | Wedjat Health Solutions</h6>
            </div>
            <p className="mb-3">
              Dr Hema Sathish is a talented multi faceted Dermatologist based
              out of Madurai ,Tamil Nadu, India. She completed her under
              graduation from Annamalai University and completed her Diploma
              from University of Wales in Cardiff in United Kingdom. After
              training in various forms of Cosmetic Dermatology in UK and other
              parts of the world she came back to India and started Sanche
              Cosmetic centre, the first of its clinic in Southern Tamilnadu.
              She started laser therapy for many skin treatments and was the
              first to introduce Botox and other Skin rejuvenating therapies in
              Tamilnadu as early as 2002.
            </p>
            <p className="mb-3">
              Dr Hema Sathish has interest in many activities including social
              service and in other management organisations. She was the
              chairperson of{" "}
              <a
                href="https://www.youngindians.net/"
                className="products-para-color"
                target="_blank"
              >
                Young Indians
              </a>{" "}
              which was an organisation of young people started by{" "}
              <a
                href="https://www.cii.in/"
                className="products-para-color"
                target="_blank"
              >
                Confederation of Indian Industry
              </a>{" "}
              she was also the past chairperson of Ladies circle India number 8
              where a lot of social services activities are done.
            </p>
            <p>
              Her entrepreneurial spirit has made her start three companies
              Devdoss hospitals Pvt. Ltd., Sanska Agro & Infrastructure Pvt.
              Ltd. and{" "}
              <a
                href="https://www.cureka.com/"
                className="products-para-color"
                target="_blank"
              >
                Wedjat Healthcare Services Pvt.
              </a>{" "}
              Ltd. she is the Managing Director of all the three companies and
              she runs all three of them Aplomb making them very successful
              companies. She has been winning many awards for her leadership
              qualities and women empowerment.
            </p>
          </div>
          <div className="col-lg-6">
            <img
              className="img-fluid mx-auto d-block doctors-images"
              src="https://www.cureka.com/wp-content/uploads/2019/12/JE8A9575-683x1024.jpg"
            />
          </div>
        </div>
        <div class="row">
          <div className="text-center mt-5">
            <h4>EXPERIENCES</h4>
          </div>
          <div>
            <ol>
              <li className="experience-styles">
                Clinical training at University of Wales college of Medicine
                Hospital, with Prof. Marks and Prof. Finlay who are world
                authorities in Skin diseases.
              </li>
              <li className="experience-styles">
                Clinical training at{" "}
                <a
                  href="https://www.cellite.co.uk/"
                  className="products-para-color"
                  target="_blank"
                >
                  Cellite Clinic, Cardiff
                </a>{" "}
                with Dr. Harryona Judoi hoajo.
              </li>
              <li className="experience-styles">
                Dermatologic Laser surgery Training with Dr.Shoan Lanigan,{" "}
                <a
                  href="http://www.myhospitalmap.org.uk/Bridgend/PrincessofWalesHospital.aspx"
                  className="products-para-color"
                  target="_blank"
                >
                  Princess of Wales Hospital, Bridgend, UK.
                </a>
              </li>
              <li className="experience-styles">
                Advanced laser training at Laser clinic 2000 in London with
                Dr.Naqvi.
              </li>
              <li className="experience-styles">
                Clinical training in Botox therapy, liposuction and fat transfer
                technique under Dr.Jeyaprakash, Harley Street, London 2003.
              </li>
              <li className="experience-styles">
                Training in Melanocyte transplant technique for Vitiligo from
                Dr.Mullekar, Mumbai.
              </li>
            </ol>
          </div>
          <div className="text-center mt-5">
            <h4>MEMBERSHIP</h4>
          </div>
          <div>
            <ul>
              <li className="experience-styles">
                Active Member: IACD :{" "}
                <a
                  href="https://iacdworld.org/"
                  className="products-para-color"
                  target="_blank"
                >
                  International Academy of Cosmetic Dermatologists
                </a>
              </li>
              <li className="experience-styles">
                Life Member: CSI : Cosmetology Society of India
              </li>
              <li className="experience-styles">
                Life Member: IADVL:{" "}
                <a
                  href="https://iadvl.org/"
                  className="products-para-color"
                  target="_blank"
                >
                  Indian Association of Dermatologists, Venerologists and
                  Leprologists
                </a>
              </li>
              <li className="experience-styles">
                Member of Association of Cutaneous Surgeons of India.
              </li>
              <li className="experience-styles">
                The International Society of Cosmetic Laser Surgeons Inc.
              </li>
              <li className="experience-styles">
                Training in Melanocyte transplant technique for Vitiligo from
                Dr.Mullekar, Mumbai.
              </li>
            </ul>
          </div>
        </div>
        <div className="brands">
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

              <div className="col-lg-4 mt-3 mt-lg-0">
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
