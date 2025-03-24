import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Accordion from "react-bootstrap/Accordion";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "react-caroussel/dist/index.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bars_filter from "../public/images/bars_filter.svg";
import creams_banner from "../public/images/creams_banner.png";
import eye from "../public/images/eye.svg";
import filter from "../public/images/filter.svg";
import housechimney from "../public/images/house-chimney.png";
import like from "../public/images/like.svg";
import product10 from "../public/images/product10.png";
import product11 from "../public/images/product11.png";
import product12 from "../public/images/product12.png";
import product13 from "../public/images/product13.png";
import product14 from "../public/images/product14.png";
import product15 from "../public/images/product15.png";
import product16 from "../public/images/product16.png";
import product17 from "../public/images/product17.png";
import product18 from "../public/images/product18.png";
import product19 from "../public/images/product19.png";
import product5 from "../public/images/product5.png";
import product6 from "../public/images/product6.png";
import product7 from "../public/images/product7.png";
import product8 from "../public/images/product8.png";
import product9 from "../public/images/product9.png";
import productfour from "../public/images/productfour.png";
import share from "../public/images/share.svg";
import "../styles/skin.css";
import Footer from "./Footer";
import Header from "./Header";
export default function Creams() {
  return (
    <>
      <Header />
      <div className="container">
        <div className="d-flex home-back-section">
          <img
            className="img-fluid d-block"
            src={housechimney}
            width="16px"
            height="16px"
            alt="home-icon"
          />

          <p className="section mb-0 ml-3">
            / &nbsp;&nbsp;Skin Care / &nbsp;&nbsp;Creams
          </p>
        </div>

        <div className="bottom-border"></div>
      </div>

      <div className="container">
        {/* <!-- Skincare section starts --> */}

        <div className="skin-care">
          <div className="row">
            <div
              className="col-lg-2 px-lg-0 d-lg-block d-none order-lg-1"
              id="category-section"
            >
              <div>
                <Accordion defaultActiveKey="0" className="p-0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header className="collapsible-link heading-button">
                      Category
                    </Accordion.Header>
                    <Accordion.Body className="p-0">
                      <ul className="accor-space list-unstyled mt-3">
                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="checkbox" className="select-input" />
                              Creams
                              <div className="selectall-num">150</div>
                            </label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="checkbox" className="select-input" />
                              Skin Serum
                              <div className="selectall-num">50</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="checkbox" className="select-input" />
                              Cleansers
                              <div className="selectall-num">120</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="checkbox" className="select-input" />
                              Sun Screen
                              <div className="selectall-num">180</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="checkbox" className="select-input" />
                              Anti Aging
                              <div className="selectall-num">160</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="checkbox" className="select-input" />
                              Bathing Bars
                              <div className="selectall-num">5</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="checkbox" className="select-input" />
                              Facial Mask
                              <div className="selectall-num">20</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="checkbox" className="select-input" />
                              Lip Balm
                              <div className="selectall-num">140</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="checkbox" className="select-input" />
                              Moisturizer
                              <div className="selectall-num">130</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="checkbox" className="select-input" />
                              Under Eye Care
                              <div className="selectall-num">01</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="checkbox" className="select-input" />
                              Skin Therapy
                              <div className="selectall-num">01</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="checkbox" className="select-input" />
                              Other products
                              <div className="selectall-num">01</div>
                            </label>
                          </a>
                        </li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>

              <div>
                <Accordion defaultActiveKey="0" className="p-0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header className="collapsible-link heading-button">
                      Sub-Category
                    </Accordion.Header>
                    <Accordion.Body className="p-0">
                      <ul className="accor-space list-unstyled mt-3">
                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="checkbox" className="select-input" />
                              Melasma Creams
                              <div className="selectall-num">150</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="checkbox" className="select-input" />
                              BB Creams
                              <div className="selectall-num">50</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="checkbox" className="select-input" />
                              Pimple Creams
                              <div className="selectall-num">180</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="checkbox" className="select-input" />
                              Bust Creams
                              <div className="selectall-num">160</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="checkbox" className="select-input" />
                              Night Creams
                              <div className="selectall-num">5</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="checkbox" className="select-input" />
                              Post Procedure
                              <div className="selectall-num">20</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="checkbox" className="select-input" />
                              Skin Lightening
                              <div className="selectall-num">140</div>
                            </label>
                          </a>
                        </li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>

              <div>
                <Accordion defaultActiveKey="0" className="p-0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header className="collapsible-link heading-button">
                      By Band
                    </Accordion.Header>
                    <Accordion.Body className="p-0">
                      <ul className="accor-space list-unstyled mt-3">
                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="checkbox" className="select-input" />
                              Mesoestetic
                              <div className="selectall-num">150</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="checkbox" className="select-input" />
                              Olesoft
                              <div className="selectall-num">50</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="checkbox" className="select-input" />
                              LINUX
                              <div className="selectall-num">120</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="checkbox" className="select-input" />
                              Sun Pharma
                              <div className="selectall-num">180</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="checkbox" className="select-input" />
                              Palsons
                              <div className="selectall-num">160</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="checkbox" className="select-input" />
                              Coola
                              <div className="selectall-num">5</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="checkbox" className="select-input" />
                              Orgello Herbal
                              <div className="selectall-num">20</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="checkbox" className="select-input" />
                              Fix Derma
                              <div className="selectall-num">140</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="checkbox" className="select-input" />
                              Olnature’s
                              <div className="selectall-num">130</div>
                            </label>
                          </a>
                        </li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>

              <div>
                <Accordion defaultActiveKey="0" className="p-0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header className="collapsible-link heading-button">
                      Price
                    </Accordion.Header>
                    <Accordion.Body className="p-0">
                      <ul className="accor-space list-unstyled mt-3">
                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="radio" className="select-input" />₹ 0
                              - ₹ 499
                              <div className="selectall-num">150</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="radio" className="select-input" />₹
                              500 - ₹ 999
                              <div className="selectall-num">50</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="radio" className="select-input" />₹
                              1000 - ₹ 1999
                              <div className="selectall-num">120</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="radio" className="select-input" />₹
                              2000 - ₹ 3999
                              <div className="selectall-num">180</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="radio" className="select-input" />₹
                              4000 & Above
                              <div className="selectall-num">160</div>
                            </label>
                          </a>
                        </li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>

              <div>
                <Accordion defaultActiveKey="0" className="p-0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header className="collapsible-link heading-button">
                      Discount
                    </Accordion.Header>
                    <Accordion.Body className="p-0">
                      <ul className="accor-space list-unstyled mt-3">
                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="radio" className="select-input" />
                              70% And Above
                              <div className="selectall-num">150</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="radio" className="select-input" />
                              60% And Above
                              <div className="selectall-num">50</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="radio" className="select-input" />
                              50% And Above
                              <div className="selectall-num">120</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="radio" className="select-input" />
                              40% And Above
                              <div className="selectall-num">180</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="radio" className="select-input" />
                              30% And Above
                              <div className="selectall-num">160</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="radio" className="select-input" />
                              20% And Above
                              <div className="selectall-num">5</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="radio" className="select-input" />
                              10% And Above
                              <div className="selectall-num">20</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="radio" className="select-input" />
                              All Discounted
                              <div className="selectall-num">1520</div>
                            </label>
                          </a>
                        </li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>

              <div>
                <Accordion defaultActiveKey="0" className="p-0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header className="collapsible-link heading-button">
                      Customer Rating
                    </Accordion.Header>
                    <Accordion.Body className="p-0">
                      <ul className="accor-space list-unstyled mt-3">
                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="radio" className="select-input" />4
                              Stars & Above
                              <div className="selectall-num">150</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="radio" className="select-input" />3
                              Stars & Above
                              <div className="selectall-num">50</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="radio" className="select-input" />2
                              Stars & Above
                              <div className="selectall-num">120</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="radio" className="select-input" />1
                              Star & Above
                              <div className="selectall-num">180</div>
                            </label>
                          </a>
                        </li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>

              <div>
                <Accordion defaultActiveKey="0" className="p-0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header className="collapsible-link heading-button">
                      Preference
                    </Accordion.Header>
                    <Accordion.Body className="p-0">
                      <ul className="accor-space list-unstyled mt-3">
                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="checkbox" className="select-input" />
                              Cruelty-Free
                              <div className="selectall-num">150</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="checkbox" className="select-input" />
                              Natural
                              <div className="selectall-num">50</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="checkbox" className="select-input" />
                              Paraben Free
                              <div className="selectall-num">120</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="checkbox" className="select-input" />
                              Vegan
                              <div className="selectall-num">180</div>
                            </label>
                          </a>
                        </li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>

              <div>
                <Accordion defaultActiveKey="0" className="p-0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header className="collapsible-link heading-button">
                      Skin Type
                    </Accordion.Header>
                    <Accordion.Body className="p-0">
                      <ul className="accor-space list-unstyled mt-3">
                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="checkbox" className="select-input" />
                              Normal
                              <div className="selectall-num">150</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="checkbox" className="select-input" />
                              Dry
                              <div className="selectall-num">50</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="checkbox" className="select-input" />
                              Oily
                              <div className="selectall-num">120</div>
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="checkbox" className="select-input" />
                              Sensitive
                              <div className="selectall-num">180</div>
                            </label>
                          </a>
                        </li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>

            <div
              className="col-lg-12 order-2 d-lg-none d-block"
              id="category-filter"
            >
              <div className="filter-wrapper">
                <div className="filter" id="filters">
                  <img
                    className="img-fluid"
                    src={filter}
                    width="20px"
                    height="20px"
                    alt="filter-icon"
                  />

                  <span>
                    <a
                      className="text-decoration-none filter-text"
                      data-toggle="modal"
                      data-target="#filtermodal"
                    >
                      Filters
                    </a>
                  </span>
                </div>

                <div className="filter" id="sortbrands">
                  <img
                    className="img-fluid"
                    src={bars_filter}
                    width="20px"
                    height="20px"
                    alt="sort-icon"
                  />

                  <span>
                    <a
                      className="text-decoration-none filter-text"
                      data-toggle="modal"
                      data-target="#sortmodal"
                    >
                      Sort by
                    </a>
                  </span>
                </div>
              </div>

              <div className="modal" id="filtermodal">
                <div className="modal-dialog">
                  <div className="modal-content">
                    {/* <!-- Modal Header --> */}
                    <div className="modal-header">
                      <h1 className="filter-text">Filters</h1>

                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                      >
                        Reset
                      </button>
                    </div>

                    {/* <!-- Modal body --> */}
                    <div className="modal-body">
                      <div className="tab-vertical">
                        <ul
                          className="nav nav-tabs mb-0"
                          id="product-tab"
                          role="tablist"
                        >
                          <li className="nav-item">
                            <a
                              className="nav-link active"
                              id="Category-tab"
                              data-toggle="tab"
                              href="#Category"
                              role="tab"
                              aria-controls="Category"
                              aria-selected="false"
                            >
                              Category
                            </a>
                          </li>

                          <li className="nav-item">
                            <a
                              className="nav-link"
                              id="subCategory-tab"
                              data-toggle="tab"
                              href="#sub-Category"
                              role="tab"
                              aria-controls="subCategory"
                              aria-selected="false"
                            >
                              Sub-Category
                            </a>
                          </li>

                          <li className="nav-item">
                            <a
                              className="nav-link"
                              id="brand-tab"
                              data-toggle="tab"
                              href="#brand"
                              role="tab"
                              aria-controls="brand"
                              aria-selected="true"
                            >
                              By Brand
                            </a>
                          </li>

                          <li className="nav-item">
                            <a
                              className="nav-link"
                              id="price-tab"
                              data-toggle="tab"
                              href="#price"
                              role="tab"
                              aria-controls="Price"
                              aria-selected="false"
                            >
                              Price
                            </a>
                          </li>

                          <li className="nav-item">
                            <a
                              className="nav-link"
                              id="discount-tab"
                              data-toggle="tab"
                              href="#discount"
                              role="tab"
                              aria-controls="discount"
                              aria-selected="false"
                            >
                              Discount
                            </a>
                          </li>

                          <li className="nav-item">
                            <a
                              className="nav-link"
                              id="rating-tab"
                              data-toggle="tab"
                              href="#rating"
                              role="tab"
                              aria-controls="rating"
                              aria-selected="false"
                            >
                              Customer Rating
                            </a>
                          </li>

                          <li className="nav-item">
                            <a
                              className="nav-link"
                              id="Preference-tab"
                              data-toggle="tab"
                              href="#Preference"
                              role="tab"
                              aria-controls="Preference"
                              aria-selected="false"
                            >
                              Preference
                            </a>
                          </li>

                          <li className="nav-item">
                            <a
                              className="nav-link"
                              id="skin-tab"
                              data-toggle="tab"
                              href="#skin"
                              role="tab"
                              aria-controls="skin"
                              aria-selected="false"
                            >
                              Skin Type
                            </a>
                          </li>
                        </ul>

                        <div className="tab-content mb-4">
                          {/* <!-- category tab start --> */}

                          <div
                            className="tab-pane fade active show"
                            id="Category"
                            role="tabpanel"
                            aria-labelledby="Category-tab"
                          >
                            <ul className="list-unstyled">
                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="checkbox"
                                      className="select-input"
                                    />
                                    Creams
                                    <div className="selectall-num">150</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="checkbox"
                                      className="select-input"
                                    />
                                    Skin Serum
                                    <div className="selectall-num">50</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="checkbox"
                                      className="select-input"
                                    />
                                    Cleansers
                                    <div className="selectall-num">120</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="checkbox"
                                      className="select-input"
                                    />
                                    Sun Screen
                                    <div className="selectall-num">180</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="checkbox"
                                      className="select-input"
                                    />
                                    Anti Aging
                                    <div className="selectall-num">160</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="checkbox"
                                      className="select-input"
                                    />
                                    Bathing Bars
                                    <div className="selectall-num">5</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="checkbox"
                                      className="select-input"
                                    />
                                    Facial Mask
                                    <div className="selectall-num">20</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="checkbox"
                                      className="select-input"
                                    />
                                    Lip Balm
                                    <div className="selectall-num">140</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="checkbox"
                                      className="select-input"
                                    />
                                    Moisturizer
                                    <div className="selectall-num">130</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="checkbox"
                                      className="select-input"
                                    />
                                    Under Eye Care
                                    <div className="selectall-num">01</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="checkbox"
                                      className="select-input"
                                    />
                                    Skin Therapy
                                    <div className="selectall-num">01</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="checkbox"
                                      className="select-input"
                                    />
                                    Other products
                                    <div className="selectall-num">01</div>
                                  </label>
                                </a>
                              </li>
                            </ul>
                          </div>
                          {/* <!-- category tab end --> */}

                          <div
                            className="tab-pane fade"
                            id="sub-Category"
                            role="tabpanel"
                            aria-labelledby="sub-Category-tab"
                          >
                            <ul className="list-unstyled">
                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="checkbox"
                                      className="select-input"
                                    />
                                    Melasma Creams
                                    <div className="selectall-num">150</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="checkbox"
                                      className="select-input"
                                    />
                                    BB Creams
                                    <div className="selectall-num">50</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="checkbox"
                                      className="select-input"
                                    />
                                    Pimple Creams
                                    <div className="selectall-num">180</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="checkbox"
                                      className="select-input"
                                    />
                                    Bust Creams
                                    <div className="selectall-num">160</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="checkbox"
                                      className="select-input"
                                    />
                                    Night Creams
                                    <div className="selectall-num">5</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="checkbox"
                                      className="select-input"
                                    />
                                    Post Procedure
                                    <div className="selectall-num">20</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="checkbox"
                                      className="select-input"
                                    />
                                    Skin Lightening
                                    <div className="selectall-num">140</div>
                                  </label>
                                </a>
                              </li>
                            </ul>
                          </div>

                          {/* <!-- Brand tab start --> */}

                          <div
                            className="tab-pane fade"
                            id="brand"
                            role="tabpanel"
                            aria-labelledby="brand-tab"
                          >
                            <ul className="list-unstyled">
                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="checkbox"
                                      className="select-input"
                                    />
                                    Mesoestetic
                                    <div className="selectall-num">150</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="checkbox"
                                      className="select-input"
                                    />
                                    Olesoft
                                    <div className="selectall-num">50</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="checkbox"
                                      className="select-input"
                                    />
                                    LINUX
                                    <div className="selectall-num">120</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="checkbox"
                                      className="select-input"
                                    />
                                    Sun Pharma
                                    <div className="selectall-num">180</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="checkbox"
                                      className="select-input"
                                    />
                                    Palsons
                                    <div className="selectall-num">160</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="checkbox"
                                      className="select-input"
                                    />
                                    Coola
                                    <div className="selectall-num">5</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="checkbox"
                                      className="select-input"
                                    />
                                    Orgello Herbal
                                    <div className="selectall-num">20</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="checkbox"
                                      className="select-input"
                                    />
                                    Fix Derma
                                    <div className="selectall-num">140</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="checkbox"
                                      className="select-input"
                                    />
                                    Olnature’s
                                    <div className="selectall-num">130</div>
                                  </label>
                                </a>
                              </li>
                            </ul>
                          </div>
                          {/* <!-- Brand tab end --> */}

                          {/* <!-- price tab start --> */}
                          <div
                            className="tab-pane fade"
                            id="price"
                            role="tabpanel"
                            aria-labelledby="price-tab"
                          >
                            <ul className="list-unstyled">
                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="radio"
                                      className="select-input"
                                    />
                                    ₹ 0 - ₹ 499
                                    <div className="selectall-num">150</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="radio"
                                      className="select-input"
                                    />
                                    ₹ 500 - ₹ 999
                                    <div className="selectall-num">50</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="radio"
                                      className="select-input"
                                    />
                                    ₹ 1000 - ₹ 1999
                                    <div className="selectall-num">120</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="radio"
                                      className="select-input"
                                    />
                                    ₹ 2000 - ₹ 3999
                                    <div className="selectall-num">180</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="radio"
                                      className="select-input"
                                    />
                                    ₹ 4000 &amp; Above
                                    <div className="selectall-num">160</div>
                                  </label>
                                </a>
                              </li>
                            </ul>
                          </div>
                          {/* <!-- price tab end --> */}

                          <div
                            className="tab-pane fade"
                            id="discount"
                            role="tabpanel"
                            aria-labelledby="discount-tab"
                          >
                            <ul className="list-unstyled">
                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="radio"
                                      className="select-input"
                                    />
                                    70% And Above
                                    <div className="selectall-num">150</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="radio"
                                      className="select-input"
                                    />
                                    60% And Above
                                    <div className="selectall-num">50</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="radio"
                                      className="select-input"
                                    />
                                    50% And Above
                                    <div className="selectall-num">120</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="radio"
                                      className="select-input"
                                    />
                                    40% And Above
                                    <div className="selectall-num">180</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="radio"
                                      className="select-input"
                                    />
                                    30% And Above
                                    <div className="selectall-num">160</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="radio"
                                      className="select-input"
                                    />
                                    20% And Above
                                    <div className="selectall-num">5</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="radio"
                                      className="select-input"
                                    />
                                    10% And Above
                                    <div className="selectall-num">20</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="radio"
                                      className="select-input"
                                    />
                                    All Discounted
                                    <div className="selectall-num">1520</div>
                                  </label>
                                </a>
                              </li>
                            </ul>
                          </div>

                          <div
                            className="tab-pane fade"
                            id="rating"
                            role="tabpanel"
                            aria-labelledby="rating-tab"
                          >
                            <ul className="list-unstyled">
                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="radio"
                                      className="select-input"
                                    />
                                    4 Stars &amp; Above
                                    <div className="selectall-num">150</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="radio"
                                      className="select-input"
                                    />
                                    3 Stars &amp; Above
                                    <div className="selectall-num">50</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="radio"
                                      className="select-input"
                                    />
                                    2 Stars &amp; Above
                                    <div className="selectall-num">120</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="radio"
                                      className="select-input"
                                    />
                                    1 Star &amp; Above
                                    <div className="selectall-num">180</div>
                                  </label>
                                </a>
                              </li>
                            </ul>
                          </div>

                          <div
                            className="tab-pane fade"
                            id="Preference"
                            role="tabpanel"
                            aria-labelledby="Preference-tab"
                          >
                            <ul className="list-unstyled">
                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="checkbox"
                                      className="select-input"
                                    />
                                    Cruelty-Free
                                    <div className="selectall-num">150</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="checkbox"
                                      className="select-input"
                                    />
                                    Natural
                                    <div className="selectall-num">50</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="checkbox"
                                      className="select-input"
                                    />
                                    Paraben Free
                                    <div className="selectall-num">120</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="checkbox"
                                      className="select-input"
                                    />
                                    Vegan
                                    <div className="selectall-num">180</div>
                                  </label>
                                </a>
                              </li>
                            </ul>
                          </div>

                          <div
                            className="tab-pane fade"
                            id="skin"
                            role="tabpanel"
                            aria-labelledby="skin-tab"
                          >
                            <ul className="list-unstyled">
                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="checkbox"
                                      className="select-input"
                                    />
                                    Normal
                                    <div className="selectall-num">150</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="checkbox"
                                      className="select-input"
                                    />
                                    Dry
                                    <div className="selectall-num">50</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="checkbox"
                                      className="select-input"
                                    />
                                    Oily
                                    <div className="selectall-num">120</div>
                                  </label>
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <label className="selectall">
                                    <input
                                      type="checkbox"
                                      className="select-input"
                                    />
                                    Sensitive
                                    <div className="selectall-num">180</div>
                                  </label>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="filter-wrapper cancel-wrapper d-flex justify-content-end">
                      <div>
                        <a className="text-decoration-done cancel-btn mr-3">
                          Cancel
                        </a>
                      </div>

                      <div>
                        <a className="text-decoration-done apply-btn">Apply</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal" id="sortmodal">
                <div className="modal-dialog">
                  <div className="modal-content">
                    {/* <!-- Modal Header --> */}
                    <div className="modal-header">
                      <h1 className="filter-text">Sort by</h1>

                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                      >
                        ×
                      </button>
                    </div>

                    {/* <!-- Modal body --> */}
                    <div className="modal-body">
                      <ul className="list-unstyled">
                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="checkbox" className="select-input" />
                              Popularity
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="checkbox" className="select-input" />
                              New Arrivals
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="checkbox" className="select-input" />
                              Price Hight To Low
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="checkbox" className="select-input" />
                              Price Low To High
                            </label>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <label className="selectall">
                              <input type="checkbox" className="select-input" />
                              Discount
                            </label>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="col-lg-10 skin-banners order-1 order-lg-2"
              id="skin-banners"
            >
              <div className="d-flex justify-content-between">
                <div className="skin">
                  <h2 className="skin-heading">Creams</h2>

                  <p className="skin-para">(650 Products)</p>
                </div>

                <div className="dropdown d-lg-block d-none">
                  <DropdownButton
                    title="Sort by : Popularity"
                    id="popularity-sort"
                  >
                    <Dropdown.Item href="#/action-1">
                      <label className="selectall">
                        <input type="checkbox" className="select-input" />
                        Popularity
                      </label>
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      <label className="selectall">
                        <input type="checkbox" className="select-input" />
                        New Arrivals
                      </label>
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                      <label className="selectall">
                        <input type="checkbox" className="select-input" />
                        Price Hight To Low
                      </label>
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-4">
                      <label className="selectall">
                        <input type="checkbox" className="select-input" />
                        Price Low To High
                      </label>
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-5">
                      <label className="selectall">
                        <input type="checkbox" className="select-input" />
                        Discount
                      </label>
                    </Dropdown.Item>
                  </DropdownButton>
                </div>

                {/* <!--Sort by Accordion End--> */}
              </div>

              <div className="row home-section">
                <div className="col-lg-12 px-lg-0">
                  <div id="skin-carousel">
                    <Carousel
                      showArrows={true}
                      showStatus={false}
                      showThumbs={false}
                      autoPlay={true}
                      infiniteLoop={true}
                    >
                      <div>
                        <img
                          className="w-100 d-block img-fluid mx-auto"
                          itemID={2}
                          src={creams_banner}
                          width="880px"
                          height="284px"
                          alt="creams_banner"
                        />
                      </div>
                      <div>
                        <img
                          className="w-100 d-block img-fluid mx-auto"
                          itemID={2}
                          src={creams_banner}
                          width="880px"
                          height="284px"
                          alt="creams_banner"
                        />
                      </div>
                      <div>
                        <img
                          className="w-100 d-block img-fluid mx-auto"
                          itemID={2}
                          src={creams_banner}
                          width="880px"
                          height="284px"
                          alt="creams_banner"
                        />
                      </div>
                      <div>
                        <img
                          className="w-100 d-block img-fluid mx-auto"
                          itemID={2}
                          src={creams_banner}
                          width="880px"
                          height="284px"
                          alt="creams_banner"
                        />
                      </div>
                      <div>
                        <img
                          className="w-100 d-block img-fluid mx-auto"
                          itemID={2}
                          src={creams_banner}
                          width="880px"
                          height="284px"
                          alt="creams_banner"
                        />
                      </div>
                    </Carousel>
                  </div>
                </div>
              </div>

              <div className="product-carousel">
                <div className="row m-0">
                  <h2 className="products-heading top-space">
                    Featured Products
                  </h2>
                </div>

                <div className="row justify-content-end m-0">
                  <a className="text-decoration-none" href="#" target="_blank">
                    <p className="all-deals">All Deals</p>
                  </a>
                </div>

                <div className="row p-0">
                  <div className="col-lg-12">
                    <div className="container-fluid p-0" id="product-carousal">
                      <Carousel
                        showArrows={true}
                        showStatus={false}
                        showIndicators={false}
                      >
                        <div className="d-flex justify-content-between">
                          <a
                            href="/Productdetails"
                            className="text-decoration-none"
                          >
                            <div className="item mr-3">
                              <div className="arrivals card">
                                <div className="d-flex flex-nowrap">
                                  <div className="sale d-lg-block d-none">
                                    <h2 className="sale-heading">23%</h2>
                                  </div>

                                  <div className="product">
                                    <img
                                      src={product5}
                                      width="218px"
                                      height="172px"
                                      className="img-fluid d-block"
                                      alt="product5"
                                    />
                                  </div>

                                  <div className="cart-icons align-self-end align-self-lg-start">
                                    <div className="watch d-lg-block d-none">
                                      <img
                                        src={eye}
                                        width="10px"
                                        height="10px"
                                        className="d-block mx-auto eye"
                                        alt="eye"
                                      />
                                    </div>

                                    <div className="watch">
                                      <img
                                        src={like}
                                        width="10px"
                                        height="10px"
                                        className="d-block mx-auto eye"
                                        alt="like"
                                      />
                                    </div>

                                    <div className="watch d-lg-block d-none">
                                      <img
                                        src={share}
                                        width="10px"
                                        height="10px"
                                        className="d-block mx-auto eye"
                                        alt="share"
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="product-text ">
                                  <p className="product-category">Skin Care</p>

                                  <a
                                    className="text-decoration-none d-block d-lg-none"
                                    href="#"
                                    data-toggle="tooltip"
                                    data-placement="right"
                                    title="Olesoft Moisturising Soap with pH 5.5 – 75gm"
                                  >
                                    <p className="product-classNameName text-truncate ">
                                      Olesoft Moisturising Soap with pH 5.5 –
                                      75gm
                                    </p>
                                  </a>

                                  <p className="product-classNameName d-lg-block d-none product-left">
                                    Olesoft Moisturising Soap with pH 5.5 – 75gm
                                  </p>

                                  <div className="rating d-lg-flex d-none">
                                    <p className="rating-number">4.7</p>
                                  </div>

                                  <p className="product-author d-lg-block d-none">
                                    By:{" "}
                                    <span className="product-author-classNameName">
                                      Olesoft Store
                                    </span>
                                  </p>
                                </div>

                                <div className="d-lg-flex d-flex-column justify-content-between">
                                  <div className="price d-flex d-lg-block">
                                    <p className="discount">&#8377; 190.00</p>

                                    <p className="product-price">
                                      &#8377; 173.00
                                    </p>
                                  </div>

                                  <a
                                    className="text-decoration-none cart align-self-center d-flex"
                                    href="#"
                                  >
                                    <FontAwesomeIcon
                                      className="mr-2"
                                      icon={faShoppingCart}
                                      size="lg"
                                    />{" "}
                                    Add to Cart
                                  </a>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div className="item mr-3">
                            <div className="arrivals card">
                              <div className="d-flex flex-nowrap">
                                <div className="sale d-lg-block d-none">
                                  <h2 className="sale-heading">21%</h2>
                                </div>

                                <div className="product">
                                  <img
                                    src={product6}
                                    width="218px"
                                    height="172px"
                                    className="img-fluid d-block"
                                    alt="product6"
                                  />
                                </div>

                                <div className="cart-icons align-self-end align-self-lg-start">
                                  <div className="watch d-lg-block d-none">
                                    <img
                                      src={eye}
                                      width="10px"
                                      height="10px"
                                      className="d-block mx-auto eye"
                                      alt="eye"
                                    />
                                  </div>

                                  <div className="watch">
                                    <img
                                      src={like}
                                      width="10px"
                                      height="10px"
                                      className="d-block mx-auto eye"
                                      alt="like"
                                    />
                                  </div>

                                  <div className="watch d-lg-block d-none">
                                    <img
                                      src={share}
                                      width="10px"
                                      height="10px"
                                      className="d-block mx-auto eye"
                                      alt="share"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="product-text">
                                <p className="product-category">Skin Care</p>

                                <a
                                  className="text-decoration-none d-block d-lg-none"
                                  href="#"
                                  data-toggle="tooltip"
                                  data-placement="right"
                                  title="Mesoestetic Melan Recovery – Cosmeceutical Solution 50 ml "
                                >
                                  <p className="product-classNameName text-truncate">
                                    Mesoestetic Melan Recovery – Cosmeceutical
                                    Solution 50 ml{" "}
                                  </p>
                                </a>

                                <p className="product-classNameName d-lg-block d-none product-left">
                                  Mesoestetic Melan Recovery – Cosmeceutical
                                  Solution 50 ml{" "}
                                </p>

                                <div className="rating d-lg-flex d-none">
                                  <p className="rating-number">4.5</p>
                                </div>

                                <p className="product-author d-lg-block d-none">
                                  By:{" "}
                                  <span className="product-author-classNameName">
                                    Mesoestetic Store
                                  </span>
                                </p>
                              </div>

                              <div className="d-lg-flex d-flex-column justify-content-between mb-3">
                                <div className="price d-flex d-lg-block">
                                  <p className="discount">&#8377; 6900.00</p>

                                  <p className="product-price">
                                    &#8377; 5900.00
                                  </p>
                                </div>

                                <a
                                  className="text-decoration-none align-self-center d-flex cart"
                                  href="#"
                                >
                                  <FontAwesomeIcon
                                    className="mr-2"
                                    icon={faShoppingCart}
                                    size="lg"
                                  />
                                  Add to Cart
                                </a>
                              </div>
                            </div>
                          </div>

                          <div className="item mr-3">
                            <div className="arrivals card">
                              <div className="d-flex flex-nowrap">
                                <div className="sale d-lg-block d-none">
                                  <h2 className="sale-heading">Sale</h2>
                                </div>

                                <div className="product">
                                  <img
                                    src={product7}
                                    width="218px"
                                    height="172px"
                                    className="img-fluid d-block"
                                    alt="product7"
                                  />
                                </div>

                                <div className="cart-icons align-self-end align-self-lg-start">
                                  <div className="watch d-lg-block d-none">
                                    <img
                                      src={eye}
                                      width="10px"
                                      height="10px"
                                      className="d-block mx-auto eye"
                                      alt="eye"
                                    />
                                  </div>

                                  <div className="watch">
                                    <img
                                      src={like}
                                      width="10px"
                                      height="10px"
                                      className="d-block mx-auto eye"
                                      alt="like"
                                    />
                                  </div>

                                  <div className="watch d-lg-block d-none">
                                    <img
                                      src={share}
                                      width="10px"
                                      height="10px"
                                      className="d-block mx-auto eye"
                                      alt="share"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="product-text">
                                <p className="product-category">Skincare</p>

                                <a
                                  className="text-decoration-none d-block d-lg-none"
                                  href="#"
                                  data-toggle="tooltip"
                                  data-placement="right"
                                  title="Acnestal 5.5 PH Balanced Syndet Bar – 75g"
                                >
                                  <p className="product-classNameName text-truncate">
                                    Acnestal 5.5 PH Balanced Syndet Bar – 75g
                                  </p>
                                </a>

                                <p className="product-classNameName d-lg-block d-none product-left">
                                  Acnestal 5.5 PH Balanced Syndet Bar – 75g
                                </p>

                                <div className="rating d-lg-flex d-none">
                                  <p className="rating-number">4.8</p>
                                </div>

                                <p className="product-author d-lg-block d-none">
                                  By:{" "}
                                  <span className="product-author-classNameName">
                                    LINUX
                                  </span>
                                </p>
                              </div>

                              <div className="d-lg-flex d-flex-column justify-content-between mb-3">
                                <div className="price d-flex d-lg-block">
                                  <p className="discount">&#8377; 250.00</p>

                                  <p className="product-price">
                                    &#8377; 163.00
                                  </p>
                                </div>

                                <a
                                  className="text-decoration-none align-self-center d-flex cart"
                                  href="#"
                                >
                                  <FontAwesomeIcon
                                    className="mr-2"
                                    icon={faShoppingCart}
                                    size="lg"
                                  />
                                  Add to Cart
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Carousel>
                    </div>
                  </div>
                </div>

                <div className="product-carousel">
                  <div className="row m-0">
                    <h2 className="products-heading">Best Sellers</h2>
                  </div>

                  <div className="row justify-content-end m-0">
                    <a
                      className="text-decoration-none"
                      href="#"
                      target="_blank"
                    >
                      <p className="all-deals">All Deals</p>
                    </a>
                  </div>

                  <div className="row p-0">
                    <div className="col-lg-12">
                      <div
                        className="container-fluid p-0"
                        id="product-carousal"
                      >
                        <Carousel
                          showArrows={true}
                          showStatus={false}
                          showIndicators={false}
                        >
                          <div className="d-flex justify-content-between">
                            <div className="item mr-3">
                              <div className="arrivals card">
                                <div className="d-flex flex-nowrap">
                                  <div className="sale d-lg-block d-none">
                                    <h2 className="sale-heading">23%</h2>
                                  </div>

                                  <div className="product">
                                    <img
                                      src={product8}
                                      width="218px"
                                      height="172px"
                                      className="img-fluid d-block"
                                      alt="product8"
                                    />
                                  </div>

                                  <div className="cart-icons align-self-end align-self-lg-start">
                                    <div className="watch d-lg-block d-none">
                                      <img
                                        src={eye}
                                        width="10px"
                                        height="10px"
                                        className="d-block mx-auto eye"
                                        alt="eye"
                                      />
                                    </div>

                                    <div className="watch">
                                      <img
                                        src={like}
                                        width="10px"
                                        height="10px"
                                        className="d-block mx-auto eye"
                                        alt="like"
                                      />
                                    </div>

                                    <div className="watch d-lg-block d-none">
                                      <img
                                        src={share}
                                        width="10px"
                                        height="10px"
                                        className="d-block mx-auto eye"
                                        alt="share"
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="product-text ">
                                  <p className="product-category">Skincare</p>

                                  <a
                                    className="text-decoration-none d-block d-lg-none"
                                    href="#"
                                    data-toggle="tooltip"
                                    data-placement="right"
                                    title="Orgello Neem with Turmeric Face Wash 60ml – (Pack of 2)"
                                  >
                                    <p className="product-classNameName text-truncate ">
                                      Orgello Neem with Turmeric Face Wash 60ml
                                      – (Pack of 2)
                                    </p>
                                  </a>

                                  <p className="product-classNameName d-lg-block d-none product-left">
                                    Orgello Neem with Turmeric Face Wash 60ml –
                                    (Pack of 2)
                                  </p>

                                  <div className="rating d-lg-flex d-none">
                                    <p className="rating-number">4.7</p>
                                  </div>

                                  <p className="product-author d-lg-block d-none">
                                    By:{" "}
                                    <span className="product-author-classNameName">
                                      Orgello Herbal
                                    </span>
                                  </p>
                                </div>

                                <div className="d-lg-flex d-flex-column justify-content-between">
                                  <div className="price d-flex d-lg-block">
                                    <p className="discount">&#8377; 160.00</p>

                                    <p className="product-price">
                                      &#8377; 130.00
                                    </p>
                                  </div>

                                  <a
                                    className="text-decoration-none cart align-self-center d-flex"
                                    href="#"
                                  >
                                    <FontAwesomeIcon
                                      className="mr-2"
                                      icon={faShoppingCart}
                                      size="lg"
                                    />{" "}
                                    Add to Cart
                                  </a>
                                </div>
                              </div>
                            </div>

                            <div className="item mr-3">
                              <div className="arrivals card">
                                <div className="d-flex flex-nowrap">
                                  <div className="sale d-lg-block d-none">
                                    <h2 className="sale-heading">21%</h2>
                                  </div>

                                  <div className="product">
                                    <img
                                      src={product9}
                                      width="218px"
                                      height="172px"
                                      className="img-fluid d-block"
                                      alt="product9"
                                    />
                                  </div>

                                  <div className="cart-icons align-self-end align-self-lg-start">
                                    <div className="watch d-lg-block d-none">
                                      <img
                                        src={eye}
                                        width="10px"
                                        height="10px"
                                        className="d-block mx-auto eye"
                                        alt="eye"
                                      />
                                    </div>

                                    <div className="watch">
                                      <img
                                        src={like}
                                        width="10px"
                                        height="10px"
                                        className="d-block mx-auto eye"
                                        alt="like"
                                      />
                                    </div>

                                    <div className="watch d-lg-block d-none">
                                      <img
                                        src={share}
                                        width="10px"
                                        height="10px"
                                        className="d-block mx-auto eye"
                                        alt="share"
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="product-text">
                                  <p className="product-category">Skin Care</p>

                                  <a
                                    className="text-decoration-none d-block d-lg-none"
                                    href="#"
                                    data-toggle="tooltip"
                                    data-placement="right"
                                    title="Olnature’s Daily Nourishing Body Lotion 200ml "
                                  >
                                    <p className="product-classNameName text-truncate">
                                      Olnature’s Daily Nourishing Body Lotion
                                      200ml{" "}
                                    </p>
                                  </a>

                                  <p className="product-classNameName d-lg-block d-none product-left">
                                    Olnature’s Daily Nourishing Body Lotion
                                    200ml{" "}
                                  </p>

                                  <div className="rating d-lg-flex d-none">
                                    <p className="rating-number">4.5</p>
                                  </div>

                                  <p className="product-author d-lg-block d-none">
                                    By:{" "}
                                    <span className="product-author-classNameName">
                                      Olnature’s
                                    </span>
                                  </p>
                                </div>

                                <div className="d-lg-flex d-flex-column justify-content-between mb-3">
                                  <div className="price d-flex d-lg-block">
                                    <p className="discount">&#8377; 235.00</p>

                                    <p className="product-price">
                                      &#8377; 197.00
                                    </p>
                                  </div>

                                  <a
                                    className="text-decoration-none align-self-center d-flex cart"
                                    href="#"
                                  >
                                    <FontAwesomeIcon
                                      className="mr-2"
                                      icon={faShoppingCart}
                                      size="lg"
                                    />
                                    Add to Cart
                                  </a>
                                </div>
                              </div>
                            </div>

                            <div className="item mr-3">
                              <div className="arrivals card">
                                <div className="d-flex flex-nowrap">
                                  <div className="sale d-lg-block d-none">
                                    <h2 className="sale-heading">Sale</h2>
                                  </div>

                                  <div className="product">
                                    <img
                                      src={product10}
                                      width="218px"
                                      height="172px"
                                      className="img-fluid d-block"
                                      alt="product10"
                                    />
                                  </div>

                                  <div className="cart-icons align-self-end align-self-lg-start">
                                    <div className="watch d-lg-block d-none">
                                      <img
                                        src={eye}
                                        width="10px"
                                        height="10px"
                                        className="d-block mx-auto eye"
                                        alt="eye"
                                      />
                                    </div>

                                    <div className="watch">
                                      <img
                                        src={like}
                                        width="10px"
                                        height="10px"
                                        className="d-block mx-auto eye"
                                        alt="like"
                                      />
                                    </div>

                                    <div className="watch d-lg-block d-none">
                                      <img
                                        src={share}
                                        width="10px"
                                        height="10px"
                                        className="d-block mx-auto eye"
                                        alt="share"
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="product-text">
                                  <p className="product-category">Skincare</p>

                                  <a
                                    className="text-decoration-none d-block d-lg-none"
                                    href="#"
                                    data-toggle="tooltip"
                                    data-placement="right"
                                    title="Two and A Bud Natural Activated Charcoal Powder 100gm"
                                  >
                                    <p className="product-classNameName text-truncate">
                                      Two and A Bud Natural Activated Charcoal
                                      Powder 100gm
                                    </p>
                                  </a>

                                  <p className="product-classNameName d-lg-block d-none product-left">
                                    Two and A Bud Natural Activated Charcoal
                                    Powder 100gm
                                  </p>

                                  <div className="rating d-lg-flex d-none">
                                    <p className="rating-number">4.8</p>
                                  </div>

                                  <p className="product-author d-lg-block d-none">
                                    By:{" "}
                                    <span className="product-author-classNameName">
                                      Two and a bud
                                    </span>
                                  </p>
                                </div>

                                <div className="d-lg-flex d-flex-column justify-content-between mb-3">
                                  <div className="price d-flex d-lg-block">
                                    <p className="discount">&#8377; 299.00</p>

                                    <p className="product-price">
                                      &#8377; 212.00
                                    </p>
                                  </div>

                                  <a
                                    className="text-decoration-none align-self-center d-flex cart"
                                    href="#"
                                  >
                                    <FontAwesomeIcon
                                      className="mr-2"
                                      icon={faShoppingCart}
                                      size="lg"
                                    />
                                    Add to Cart
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between">
                            <div className="item  mr-3">
                              <div className="arrivals card">
                                <div className="d-flex flex-nowrap">
                                  <div className="sale d-lg-block d-none">
                                    <h2 className="sale-heading">Sale</h2>
                                  </div>

                                  <div className="product">
                                    <img
                                      src={productfour}
                                      width="218px"
                                      height="172px"
                                      className="img-fluid d-block"
                                      alt="productfour"
                                    />
                                  </div>

                                  <div className="cart-icons align-self-end align-self-lg-start">
                                    <div className="watch d-lg-block d-none">
                                      <img
                                        src={eye}
                                        width="10px"
                                        height="10px"
                                        className="d-block mx-auto eye"
                                        alt="eye"
                                      />
                                    </div>

                                    <div className="watch">
                                      <img
                                        src={like}
                                        width="10px"
                                        height="10px"
                                        className="d-block mx-auto eye"
                                        alt="like"
                                      />
                                    </div>

                                    <div className="watch d-lg-block d-none">
                                      <img
                                        src={share}
                                        width="10px"
                                        height="10px"
                                        className="d-block mx-auto eye"
                                        alt="share"
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="product-text">
                                  <p className="product-category">Skin Care</p>

                                  <a
                                    className="text-decoration-none d-block d-lg-none"
                                    href="#"
                                    data-toggle="tooltip"
                                    data-placement="right"
                                    title="Olnature’s Exfoliating Papaya Face Wash -100ml (Pack of 2)"
                                  >
                                    <p className="product-classNameName text-truncate">
                                      Olnature’s Exfoliating Papaya Face Wash
                                      -100ml (Pack of 2)
                                    </p>
                                  </a>

                                  <p className="product-classNameName d-lg-block d-none toppicksheading">
                                    Olnature’s Exfoliating Papaya Face Wash
                                    -100ml (Pack of 2)
                                  </p>

                                  <div className="rating d-lg-flex d-none">
                                    <p className="rating-number">4.8</p>
                                  </div>

                                  <p className="product-author d-lg-block d-none">
                                    By:{" "}
                                    <span className="product-author-classNameName">
                                      Olnature’s
                                    </span>
                                  </p>
                                </div>

                                <div className="d-lg-flex d-flex-column justify-content-between mb-3">
                                  <div className="price d-flex d-lg-block">
                                    <p className="discount">&#8377; 250.00</p>

                                    <p className="product-price">
                                      &#8377; 198.00
                                    </p>
                                  </div>

                                  <a
                                    className="text-decoration-none align-self-center d-flex cart"
                                    href="#"
                                  >
                                    <FontAwesomeIcon
                                      className="mr-2"
                                      icon={faShoppingCart}
                                      size="lg"
                                    />
                                    Add to Cart
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Carousel>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="product-carousel">
                  <div className="row m-0">
                    <h2 className="products-heading">All Products</h2>
                  </div>

                  <div className="row text-right">
                    <a
                      className="text-decoration-none"
                      href="#"
                      target="_blank"
                    >
                      <p className="show-items">Showing 30 of 1200</p>
                    </a>
                  </div>

                  <div className="row">
                    <div className="col-lg-4  col-md-4 col-6 mb-3">
                      <div className="arrivals card">
                        <div className="d-flex flex-nowrap">
                          <div className="sale d-lg-block d-none">
                            <h2 className="sale-heading">23%</h2>
                          </div>

                          <div className="product">
                            <img
                              src={product11}
                              width="218px"
                              height="172px"
                              className="img-fluid"
                              alt="product11"
                            />
                          </div>

                          <div className="cart-icons align-self-end align-self-lg-start">
                            <div className="watch d-lg-block d-none">
                              <img
                                src={eye}
                                width="10px"
                                height="10px"
                                className="d-block mx-auto eye"
                                alt="eye"
                              />
                            </div>

                            <div className="watch">
                              <img
                                src={like}
                                width="10px"
                                height="10px"
                                className="d-block mx-auto eye"
                                alt="like"
                              />
                            </div>

                            <div className="watch d-lg-block d-none">
                              <img
                                src={share}
                                width="10px"
                                height="10px"
                                className="d-block mx-auto eye"
                                alt="share"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="product-text">
                          <p className="product-category">Skin Care</p>

                          <a
                            className="text-decoration-none d-block d-lg-none"
                            href="#"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="Swosh Aloevera And Neem Foaming Facewash (100ml)"
                          >
                            <p className="product-name text-truncate">
                              Swosh Aloevera And Neem Foaming Facewash (100ml)
                            </p>
                          </a>

                          <p className="product-name d-lg-block d-none">
                            Swosh Aloevera And Neem Foaming Facewash (100ml){" "}
                          </p>

                          <div className="rating  d-lg-flex d-none">
                            <p className="rating-number">4.7</p>
                          </div>

                          <p className="product-author d-lg-block d-none">
                            By:{" "}
                            <span className="product-author-classNameName">
                              SWOSH
                            </span>
                          </p>
                        </div>

                        <div className="d-lg-flex d-flex-column justify-content-between">
                          <div className="price d-flex d-lg-block">
                            <p className="discount">&#8377; 390.00</p>

                            <p className="product-price">&#8377; 336.00</p>
                          </div>

                          <a
                            className="text-decoration-none align-self-center d-flex cart"
                            href="#"
                          >
                            <FontAwesomeIcon
                              className="mr-2"
                              icon={faShoppingCart}
                              size="lg"
                            />{" "}
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4  col-md-4 col-6 mb-3">
                      <div className="arrivals card">
                        <div className="d-flex flex-nowrap">
                          <div className="sale d-lg-block d-none">
                            <h2 className="sale-heading">21%</h2>
                          </div>

                          <div className="product">
                            <img
                              src={product12}
                              width="218px"
                              height="172px"
                              className="img-fluid"
                              alt="product12"
                            />
                          </div>

                          <div className="cart-icons align-self-end align-self-lg-start">
                            <div className="watch d-lg-block d-none">
                              <img
                                src={eye}
                                width="10px"
                                height="10px"
                                className="d-block mx-auto eye"
                                alt="eye"
                              />
                            </div>

                            <div className="watch">
                              <img
                                src={like}
                                width="10px"
                                height="10px"
                                className="d-block mx-auto eye"
                                alt="like"
                              />
                            </div>

                            <div className="watch d-lg-block d-none">
                              <img
                                src={share}
                                width="10px"
                                height="10px"
                                className="d-block mx-auto eye"
                                alt="share"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="product-text">
                          <p className="product-category">Skin Care</p>

                          <a
                            className="text-decoration-none d-block d-lg-none"
                            href="#"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="The Mom’s Co Natural Age Control Night Cream 50gm"
                          >
                            <p className="product-name text-truncate">
                              The Mom’s Co Natural Age Control Night Cream 50gm
                            </p>
                          </a>

                          <p className="product-name d-lg-block d-none">
                            The Mom’s Co Natural Age Control Night Cream 50gm
                          </p>

                          <div className="rating d-lg-flex d-none">
                            <p className="rating-number">4.5</p>
                          </div>

                          <p className="product-author d-lg-block d-none">
                            By:{" "}
                            <span className="product-author-classNameName">
                              The moms co
                            </span>
                          </p>
                        </div>

                        <div className="d-lg-flex d-flex-column justify-content-between mb-3">
                          <div className="price d-flex d-lg-block">
                            <p className="discount">&#8377; 798.00</p>

                            <p className="product-price">&#8377; 694.00</p>
                          </div>

                          <a
                            className="text-decoration-none align-self-center d-flex cart"
                            href="#"
                          >
                            <FontAwesomeIcon
                              className="mr-2"
                              icon={faShoppingCart}
                              size="lg"
                            />{" "}
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4  col-md-4 col-6 mb-3">
                      <div className="arrivals card">
                        <div className="d-flex flex-nowrap">
                          <div className="sale d-lg-block d-none">
                            <h2 className="sale-heading">Sale</h2>
                          </div>

                          <div className="product">
                            <img
                              src={product13}
                              width="218px"
                              height="172px"
                              className="img-fluid"
                              alt="product13"
                            />
                          </div>

                          <div className="cart-icons align-self-end align-self-lg-start">
                            <div className="watch d-lg-block d-none">
                              <img
                                src={eye}
                                width="10px"
                                height="10px"
                                className="d-block mx-auto eye"
                                alt="eye"
                              />
                            </div>

                            <div className="watch">
                              <img
                                src={like}
                                width="10px"
                                height="10px"
                                className="d-block mx-auto eye"
                                alt="like"
                              />
                            </div>

                            <div className="watch d-lg-block d-none">
                              <img
                                src={share}
                                width="10px"
                                height="10px"
                                className="d-block mx-auto eye"
                                alt="share"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="product-text">
                          <p className="product-category">Skin Care</p>

                          <a
                            className="text-decoration-none d-block d-lg-none"
                            href="#"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="Mamaearth Bye-Bye Wrinkles Face Cream 30ml"
                          >
                            <p className="product-name text-truncate">
                              Mamaearth Bye-Bye Wrinkles Face Cream 30ml
                            </p>
                          </a>

                          <p className="product-name d-lg-block d-none">
                            Mamaearth Bye-Bye Wrinkles Face Cream 30ml
                          </p>

                          <div className="rating  d-lg-flex d-none">
                            <p className="rating-number">4.8</p>
                          </div>

                          <p className="product-author d-lg-block d-none">
                            By:{" "}
                            <span className="product-author-classNameName">
                              Mama earth
                            </span>
                          </p>
                        </div>

                        <div className="d-lg-flex d-flex-column justify-content-between mb-3">
                          <div className="price d-flex d-lg-block">
                            <p className="discount">&#8377; 399.00</p>

                            <p className="product-price">&#8377; 335.00</p>
                          </div>

                          <a
                            className="text-decoration-none align-self-center d-flex cart"
                            href="#"
                          >
                            <FontAwesomeIcon
                              className="mr-2"
                              icon={faShoppingCart}
                              size="lg"
                            />{" "}
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4 c col-md-4 col-6 mb-3">
                      <div className="arrivals card">
                        <div className="d-flex flex-nowrap">
                          <div className="sale d-lg-block d-none">
                            <h2 className="sale-heading">23%</h2>
                          </div>

                          <div className="product">
                            <img
                              src={product14}
                              width="218px"
                              height="172px"
                              className="img-fluid"
                              alt="product14"
                            />
                          </div>

                          <div className="cart-icons align-self-end align-self-lg-start">
                            <div className="watch d-lg-block d-none">
                              <img
                                src={eye}
                                width="10px"
                                height="10px"
                                className="d-block mx-auto eye"
                                alt="eye"
                              />
                            </div>

                            <div className="watch">
                              <img
                                src={like}
                                width="10px"
                                height="10px"
                                className="d-block mx-auto eye"
                                alt="like"
                              />
                            </div>

                            <div className="watch d-lg-block d-none">
                              <img
                                src={share}
                                width="10px"
                                height="10px"
                                className="d-block mx-auto eye"
                                alt="share"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="product-text">
                          <p className="product-category">Skin Care</p>

                          <a
                            className="text-decoration-none d-block d-lg-none"
                            href="#"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="UV-Vis Block Nano Gel Sunscreen (SPF50++) 50g"
                          >
                            <p className="product-name text-truncate">
                              UV-Vis Block Nano Gel Sunscreen (SPF50++) 50g
                            </p>
                          </a>

                          <p className="product-name d-lg-block d-none">
                            UV-Vis Block Nano Gel Sunscreen (SPF50++) 50g
                          </p>

                          <div className="rating d-lg-flex d-none">
                            <p className="rating-number">4.7</p>
                          </div>

                          <p className="product-author d-lg-block d-none">
                            By:{" "}
                            <span className="product-author-classNameName">
                              Cosmotrend
                            </span>
                          </p>
                        </div>

                        <div className="d-lg-flex d-flex-column justify-content-between mb-3">
                          <div className="price d-flex d-lg-block">
                            <p className="discount">&#8377; 699.00</p>

                            <p className="product-price">&#8377; 654.00</p>
                          </div>

                          <a
                            className="text-decoration-none align-self-center d-flex cart"
                            href="#"
                          >
                            <FontAwesomeIcon
                              className="mr-2"
                              icon={faShoppingCart}
                              size="lg"
                            />
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4  col-md-4 col-6 mb-3">
                      <div className="arrivals card">
                        <div className="d-flex flex-nowrap">
                          <div className="sale d-lg-block d-none">
                            <h2 className="sale-heading">21%</h2>
                          </div>

                          <div className="product">
                            <img
                              src={product15}
                              width="218px"
                              height="172px"
                              className="img-fluid"
                              alt="product15"
                            />
                          </div>

                          <div className="cart-icons align-self-end align-self-lg-start">
                            <div className="watch d-lg-block d-none">
                              <img
                                src={eye}
                                width="10px"
                                height="10px"
                                className="d-block mx-auto eye"
                                alt="eye"
                              />
                            </div>

                            <div className="watch">
                              <img
                                src={like}
                                width="10px"
                                height="10px"
                                className="d-block mx-auto eye"
                                alt="like"
                              />
                            </div>

                            <div className="watch d-lg-block d-none">
                              <img
                                src={share}
                                width="10px"
                                height="10px"
                                className="d-block mx-auto eye"
                                alt="share"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="product-text">
                          <p className="product-category">Skin Care</p>

                          <a
                            className="text-decoration-none d-block d-lg-none"
                            href="#"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="KLM Ekran Soft Silicone Sunscreen Gel SPF 50+ P+++ (50gm)"
                          >
                            <p className="product-name text-truncate">
                              KLM Ekran Soft Silicone Sunscreen Gel SPF 50+ P+++
                              (50gm)
                            </p>
                          </a>

                          <p className="product-name d-lg-block d-none">
                            KLM Ekran Soft Silicone Sunscreen Gel SPF 50+ P+++
                            (50gm){" "}
                          </p>

                          <div className="rating d-lg-flex d-none">
                            <p className="rating-number">4.5</p>
                          </div>

                          <p className="product-author d-lg-block d-none">
                            By:{" "}
                            <span className="product-author-classNameName">
                              KLM
                            </span>
                          </p>
                        </div>

                        <div className="d-lg-flex d-flex-column justify-content-between mb-3">
                          <div className="price d-flex d-lg-block">
                            <p className="discount">&#8377; 700.00</p>

                            <p className="product-price">&#8377; 561.00</p>
                          </div>

                          <a
                            className="text-decoration-none align-self-center d-flex cart"
                            href="#"
                          >
                            <FontAwesomeIcon
                              className="mr-2"
                              icon={faShoppingCart}
                              size="lg"
                            />
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4  col-md-4 col-6 mb-3">
                      <div className="arrivals card">
                        <div className="d-flex flex-nowrap">
                          <div className="sale d-lg-block d-none">
                            <h2 className="sale-heading">Sale</h2>
                          </div>

                          <div className="product">
                            <img
                              src={product16}
                              width="218px"
                              height="172px"
                              className="img-fluid"
                              alt="product16"
                            />
                          </div>

                          <div className="cart-icons align-self-end align-self-lg-start">
                            <div className="watch d-lg-block d-none">
                              <img
                                src={eye}
                                width="10px"
                                height="10px"
                                className="d-block mx-auto eye"
                                alt="eye"
                              />
                            </div>

                            <div className="watch">
                              <img
                                src={like}
                                width="10px"
                                height="10px"
                                className="d-block mx-auto eye"
                                alt="like"
                              />
                            </div>

                            <div className="watch d-lg-block d-none">
                              <img
                                src={share}
                                width="10px"
                                height="10px"
                                className="d-block mx-auto eye"
                                alt="share"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="product-text">
                          <p className="product-category">Skin Care</p>

                          <a
                            className="text-decoration-none d-block d-lg-none"
                            href="#"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="Nova White Power White Expert Face Wash 60ml"
                          >
                            <p className="product-name text-truncate">
                              Nova White Power White Expert Face Wash 60ml
                            </p>
                          </a>

                          <p className="product-name d-lg-block d-none">
                            Nova White Power White Expert Face Wash 60ml
                          </p>

                          <div className="rating d-lg-flex d-none">
                            <p className="rating-number">4.8</p>
                          </div>

                          <p className="product-author d-lg-block d-none">
                            By:{" "}
                            <span className="product-author-classNameName">
                              Maxnova HEALTHCARE
                            </span>
                          </p>
                        </div>

                        <div className="d-lg-flex d-flex-column justify-content-between mb-3">
                          <div className="price d-flex d-lg-block">
                            <p className="discount">&#8377; 195.00</p>

                            <p className="product-price">&#8377; 166.00</p>
                          </div>

                          <a
                            className="text-decoration-none align-self-center d-flex cart"
                            href="#"
                          >
                            <FontAwesomeIcon
                              className="mr-2"
                              icon={faShoppingCart}
                              size="lg"
                            />
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4  col-md-4 col-6 mb-3">
                      <div className="arrivals card">
                        <div className="d-flex flex-nowrap">
                          <div className="sale d-lg-block d-none">
                            <h2 className="sale-heading">23%</h2>
                          </div>

                          <div className="product">
                            <img
                              src={product17}
                              width="218px"
                              height="172px"
                              className="img-fluid"
                              alt="product17"
                            />
                          </div>

                          <div className="cart-icons align-self-end align-self-lg-start">
                            <div className="watch d-lg-block d-none">
                              <img
                                src={eye}
                                width="10px"
                                height="10px"
                                className="d-block mx-auto eye"
                                alt="eye"
                              />
                            </div>

                            <div className="watch">
                              <img
                                src={like}
                                width="10px"
                                height="10px"
                                className="d-block mx-auto eye"
                                alt="like"
                              />
                            </div>

                            <div className="watch d-lg-block d-none">
                              <img
                                src={share}
                                width="10px"
                                height="10px"
                                className="d-block mx-auto eye"
                                alt="share"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="product-text">
                          <p className="product-category">Skin Care</p>

                          <a
                            className="text-decoration-none d-block d-lg-none"
                            href="#"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="Enn Tangy – Anti Pigmentation and Collagen Boosting Face Gel"
                          >
                            <p className="product-name text-truncate">
                              Enn Tangy – Anti Pigmentation and Collagen
                              Boosting Face Gel
                            </p>
                          </a>

                          <p className="product-name d-lg-block d-none">
                            Enn Tangy – Anti Pigmentation and Collagen Boosting
                            Face Gel{" "}
                          </p>

                          <div className="rating d-lg-flex d-none">
                            <p className="rating-number">4.7</p>
                          </div>

                          <p className="product-author d-lg-block d-none">
                            By:{" "}
                            <span className="product-author-classNameName">
                              Enn BEAUTY
                            </span>
                          </p>
                        </div>

                        <div className="d-lg-flex d-flex-column justify-content-between mb-3">
                          <div className="price d-flex d-lg-block">
                            <p className="discount">&#8377; 950.00</p>

                            <p className="product-price">&#8377; 850.00</p>
                          </div>

                          <a
                            className="text-decoration-none align-self-center d-flex cart"
                            href="#"
                          >
                            <FontAwesomeIcon
                              className="mr-2"
                              icon={faShoppingCart}
                              size="lg"
                            />{" "}
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-6 mb-3">
                      <div className="arrivals card">
                        <div className="d-flex flex-nowrap">
                          <div className="sale d-lg-block d-none">
                            <h2 className="sale-heading">21%</h2>
                          </div>

                          <div className="product">
                            <img
                              src={product18}
                              width="218px"
                              height="172px"
                              className="img-fluid"
                              alt="product18"
                            />
                          </div>

                          <div className="cart-icons align-self-end align-self-lg-start">
                            <div className="watch d-lg-block d-none">
                              <img
                                src={eye}
                                width="10px"
                                height="10px"
                                className="d-block mx-auto eye"
                                alt="eye"
                              />
                            </div>

                            <div className="watch">
                              <img
                                src={like}
                                width="10px"
                                height="10px"
                                className="d-block mx-auto eye"
                                alt="like"
                              />
                            </div>

                            <div className="watch d-lg-block d-none">
                              <img
                                src={share}
                                width="10px"
                                height="10px"
                                className="d-block mx-auto eye"
                                alt="share"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="product-text">
                          <p className="product-category">Skin Care</p>

                          <a
                            className="text-decoration-none d-block d-lg-none"
                            href="#"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="UV Doux Sunscreen Lotion SPF 30 – 50ml"
                          >
                            <p className="product-name text-truncate">
                              UV Doux Sunscreen Lotion SPF 30 – 50ml
                            </p>
                          </a>

                          <p className="product-name d-lg-block d-none">
                            UV Doux Sunscreen Lotion SPF 30 – 50ml
                          </p>

                          <div className="rating d-lg-flex d-none">
                            <p className="rating-number">4.5</p>
                          </div>

                          <p className="product-author d-lg-block d-none">
                            By:{" "}
                            <span className="product-author-classNameName">
                              UV Doux
                            </span>
                          </p>
                        </div>

                        <div className="d-lg-flex d-flex-column justify-content-between mb-3">
                          <div className="price d-flex d-lg-block">
                            <p className="discount">&#8377; 533.00</p>

                            <p className="product-price">&#8377; 453.00</p>
                          </div>

                          <a
                            className="text-decoration-none align-self-center d-flex cart"
                            href="#"
                          >
                            <FontAwesomeIcon
                              className="mr-2"
                              icon={faShoppingCart}
                              size="lg"
                            />{" "}
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4  col-md-4 col-6 mb-3">
                      <div className="arrivals card">
                        <div className="d-flex flex-nowrap">
                          <div className="sale d-lg-block d-none">
                            <h2 className="sale-heading">Sale</h2>
                          </div>

                          <div className="product">
                            <img
                              src={product19}
                              width="218px"
                              height="172px"
                              className="img-fluid"
                              alt="product19"
                            />
                          </div>

                          <div className="cart-icons align-self-end align-self-lg-start">
                            <div className="watch d-lg-block d-none">
                              <img
                                src={eye}
                                width="10px"
                                height="10px"
                                className="d-block mx-auto eye"
                                alt="eye"
                              />
                            </div>

                            <div className="watch">
                              <img
                                src={like}
                                width="10px"
                                height="10px"
                                className="d-block mx-auto eye"
                                alt="like"
                              />
                            </div>

                            <div className="watch d-lg-block d-none">
                              <img
                                src={share}
                                width="10px"
                                height="10px"
                                className="d-block mx-auto eye"
                                alt="share"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="product-text">
                          <p className="product-category">Skin Care</p>

                          <a
                            className="text-decoration-none d-block d-lg-none"
                            href="#"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="Chicco Baby Moment Mild Body Wash No Tears Refresh – 200ml"
                          >
                            <p className="product-name text-truncate">
                              Chicco Baby Moment Mild Body Wash No Tears Refresh
                              – 200ml
                            </p>
                          </a>

                          <p className="product-name d-lg-block d-none">
                            Chicco Baby Moment Mild Body Wash No Tears Refresh –
                            200ml
                          </p>

                          <div className="rating d-lg-flex d-none">
                            <p className="rating-number">4.8</p>
                          </div>

                          <p className="product-author d-lg-block d-none">
                            By:{" "}
                            <span className="product-author-classNameName">
                              Chicco
                            </span>
                          </p>
                        </div>

                        <div className="d-lg-flex d-flex-column justify-content-between mb-3">
                          <div className="price  d-flex d-lg-block">
                            <p className="discount">&#8377; 229.00</p>

                            <p className="product-price">&#8377; 221.00</p>
                          </div>

                          <a
                            className="text-decoration-none align-self-center d-flex cart"
                            href="#"
                          >
                            <FontAwesomeIcon
                              className="mr-2"
                              icon={faShoppingCart}
                              size="lg"
                            />{" "}
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="products-pagination" id="products-pagination">
                  <ul className="pagination justify-content-center">
                    <li className="page-item">
                      <a className="page-link" href="#">
                        &#60;
                      </a>
                    </li>

                    <li className="page-item">
                      <a className="page-link active" href="#">
                        1
                      </a>
                    </li>

                    <li className="page-item">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>

                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>

                    <li className="page-item">
                      <a className="page-link" href="#">
                        .....
                      </a>
                    </li>

                    <li className="page-item">
                      <a className="page-link" href="#">
                        20
                      </a>
                    </li>

                    <li className="page-item">
                      <a className="page-link" href="#">
                        {">"}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="foot-section order-3">
              <div className="bottom-border"></div>

              <h2 className="foot-text text-align-left">Creams</h2>

              <p className="foot-para text-align-left">
                Skin care is something each and every person in the world admire
                and love to do as it supports skin integrity , enhances its
                appearance and also relieve skin conditions. Skin does not only
                need external applications but also internal care and nutrition.
                Both are interrelated and if the skin damage has happened
                externally it affects the internal layers too. So skin care will
                be complete with both external and internal care. Dermatologist
                keeping this in mind provide care with cosmetics, injections,
                exfoliations, peeling, laser therapy, fillers, laser
                resurfacing, chemical peels and ultrasonic skin therapies.
                Proper skin care begins with washing the face twice a day.
                Choose a cleanser that suits your skin type. Never use harsh
                scrubs for facewashing everyday as it may damage your skin.
                Sunprotection is one of the major support that you could give
                your skin to maintain its health. Sundamage may lead not only to
                pigmentation but also premature aging, wrinkles, freckles, and
                in some cases skin cancers too. Using a proper sunscreen with
                SPF cares for the skin by providing broadspectrum protection
                from harmful ultraviolet lights. In modern times there are
                sunscreens available in cosmetic markets with blue light filters
                that prevents skin from damages caused by light transmitted from
                laptop and mobile phones.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
