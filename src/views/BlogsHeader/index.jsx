"use client";
import { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import homeSearch from "../../public/images/homesearch.png";
import logo from "../../public/images/logo.svg";
import "../../styles/aboutus.css";
import "../../styles/bootstrap.min.css";
import "../../styles/cart.css";
import "../../styles/common-styles.css";
import "../../styles/contactus.css";
import "../../styles/faq.css";
import "../../styles/font-awesome.css";
import "../../styles/fonts.css";
import "../../styles/footer.css";
import "../../styles/home.css";
import "../../styles/loginmodal.css";
import { setShowLoginModel } from "../../redux/slices/auth.slice";
import { pagePaths } from "../../utils/constants/constant";
import { blogHeaderFixedHeight } from "../../utils/constants/common.constants";
import style from "./style.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { fetchNestedCategories } from "../../redux/action";

export default function BlogsHeader() {
  const dispatch = useDispatch();
  const { nestedCategories } = useSelector((state) => state.customer);
  // const [searchParams, setSearchParams] = useSearchParams();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search_term") || "";
  const navigate = useRouter();
  const [marginTop, setMarginTop] = useState(blogHeaderFixedHeight);

  useEffect(() => {
    dispatch(fetchNestedCategories());
  }, [dispatch]);

  function handleSearch(event) {
    const Searchterms = event.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (searchTerm) {
      params.set("search_term", searchTerm);
    } else {
      params.delete("search_term");
    }
    navigate.replace(`?${params.toString()}`); // Updates the URL without a full page reload
  }

  const onSearchClicked = () => {
    navigate.push(`${pagePaths.blogs}?search_term=${searchTerm}`);
  };

  const [show, setShow] = useState(false);

  const onFormSubmit = (e) => {
    e.preventDefault();
    onSearchClicked();
  };

  const handleAlert = () => {
    setMarginTop(marginTop - 32);
    setShowLoginModel(false);
  };

  const [showCurekaAlert, setShowCurekaAlert] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 150) {
        // Adjust this value as needed
        setShowCurekaAlert(false);
      } else {
        setShowCurekaAlert(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div className="container-fluid header-border header-fixed">
        {showCurekaAlert && (
          <>
            <div className="blue-wrapper" id="cureka-alert">
              <Alert variant="" onClose={handleAlert} dismissible>
                <p className="india-heading mb-0">
                  <strong>Cureka: </strong>
                  <span className="india-color">{"India's"}</span> leading
                  Online Healthcare Platform.
                </p>
              </Alert>
            </div>

            <div className="offers-wrapper" id="offers-alert">
              <Alert variant="" onClose={handleAlert} dismissible>
                <p className="offers-heading mb-0">
                  Limited Period Offer:{" "}
                  <span className="get-offers">
                    Get 10% off + extra 8% off on Nutrition Products &amp; more
                    offers.
                  </span>
                  &nbsp;
                  <a href="/" className="explore">
                    Explore
                  </a>
                </p>
              </Alert>
            </div>
          </>
        )}
        <div className="container px-0" id="header">
          <nav className="navbar navbar-expand-lg navbar-light bg-white pb-3 px-lg-0 justify-content-between align-items-center">
            <div className="mobilelogo">
              {/* <button
                className="navbar-toggler"
                type="button"
                data-target="#mySidenav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
                onClick={() => {}}
              >
                <span className="navbar-toggler-icon"></span>
              </button> */}
              <div className={style.leftItems}>
                <Link className="navbar-brand" href="/">
                  <img
                    className="img-responsive d-block"
                    src={logo}
                    width="112px"
                    height="47px"
                    alt="cureka-logo"
                  />
                </Link>

                <div className="nav-item d-lg-block d-none">
                  <div className="form-group mb-0">
                    <form onSubmit={onFormSubmit} className="d-flex search">
                      <input
                        type="search"
                        value={searchTerm}
                        className="form-control border-0"
                        placeholder="Search Blog"
                        aria-label="search"
                        name="search"
                        onChange={handleSearch}
                        aria-describedby="search"
                      />

                      <img
                        onClick={onSearchClicked}
                        className="img-fluid search-icon"
                        src={homeSearch}
                        width="16px"
                        height="16px"
                        alt="search"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <ul className={style.navbarItems}>
                <div>
                  <a
                    href="/track-order"
                    className="text-decoration-none reorder-btn"
                  >
                    Track Your Order
                  </a>

                  <a
                    href="/"
                    className="text-decoration-none rate-btn"
                    data-toggle="modal"
                    data-target="#rateproductModal"
                  >
                    Shop On Cureka
                  </a>
                </div>
              </ul>
            </div>
          </nav>
        </div>
      </div>
      <div
        className="d-lg-block d-none"
        style={{ marginTop: marginTop + "px" }}
      >
        {null}
      </div>
    </>
  );
}
