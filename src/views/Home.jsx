import React, { useState } from "react";
import homebanner from "../assets/images/homebanner1.png";
import productone from "../assets/images/productone.png";
import producttwo from "../assets/images/producttwo.png";
import productfour from "../assets/images/productfour.png";
import productthree from "../assets/images/productthree.png";
import monsoon from "../assets/images/monsoon.png";
import monsoontwo from "../assets/images/monsoontwo.png";
import monsoonthree from "../assets/images/monsoonthree.png";
import monsoon4 from "../assets/images/monsoon4.png";
import monsoon5 from "../assets/images/monsoon5.png";
import monsoon6 from "../assets/images/monsoon6.png";
import discount1 from "../assets/images/discount1.png";
import discount2 from "../assets/images/discount2.png";
import discount3 from "../assets/images/discount3.png";
import offers1 from "../assets/images/offers1.png";
import brand1 from "../assets/images/brand1.png";
import brand2 from "../assets/images/brand2.png";
import brand3 from "../assets/images/brand3.png";
import brand4 from "../assets/images/brand4.png";
import brand5 from "../assets/images/brand5.png";
import brand6 from "../assets/images/brand6.png";
import tellus1 from "../assets/images/tellus1.png";
import tellus2 from "../assets/images/tellus2.png";
import tellus3 from "../assets/images/tellus3.png";
import tellus4 from "../assets/images/tellus4.png";
import tellus5 from "../assets/images/tellus5.png";
import tellus6 from "../assets/images/tellus6.png";
import blog1 from "../assets/images/blog1.png";
import blog2 from "../assets/images/blog2.png";
import blog3 from "../assets/images/blog3.png";
import sellwithus from "../assets/images/sellwithus.png";
import age1 from "../assets/images/age1.png";
import age2 from "../assets/images/age2.png";
import age3 from "../assets/images/age3.png";
import age4 from "../assets/images/age3.png";
import eye from "../assets/images/eye.svg";
import woman from "../assets/images/woman.png";
import user from "../assets/images/user.svg";
import calendar from "../assets/images/calendar.svg";
import share from "../assets/images/share.svg";
import like from "../assets/images/like.svg";
import quote from "../assets/images/quote.png";
import wallet from "../assets/images/wallet.png";
import secure from "../assets/images/secure.png";
import badge from "../assets/images/badge.png";
import "react-caroussel/dist/index.css";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export default function Home() {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const Card = ({ index }) => (
    <div className="card" style={{ width: "100%" }}>
      <h1>Card {index}</h1>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>
      <button>Read more</button>
    </div>
  );
  const Slide = ({ index }) => (
    <div className="card" style={{ width: "100%" }}>
      <img
        className="w-100 d-block"
        itemId={2}
        src={homebanner}
        width="880px"
        height="284px"
        class="img-fluid mx-auto d-block"
        alt="homebanner"
      />
    </div>
  );

  return (
    <>
      <div className="container">
        <div className="row home-section">
          <div className="col-lg-9 px-lg-0">
            <div>
              <Carousel showArrows={true} showStatus={false} showThumbs={false}>
                <div>
                  <img
                    className="w-100 d-block"
                    itemId={2}
                    src={homebanner}
                    width="880px"
                    height="284px"
                    class="img-fluid mx-auto d-block"
                    alt="homebanner"
                  />
                  {/* <p className="legend">Legend 1</p> */}
                </div>
                <div>
                  <img
                    className="w-100 d-block"
                    itemId={2}
                    src={homebanner}
                    width="880px"
                    height="284px"
                    class="img-fluid mx-auto d-block"
                    alt="homebanner"
                  />
                </div>
                <div>
                  <img
                    className="w-100 d-block"
                    itemId={2}
                    src={homebanner}
                    width="880px"
                    height="284px"
                    class="img-fluid mx-auto d-block"
                    alt="homebanner"
                  />
                </div>
              </Carousel>
            </div>
          </div>

          <div className="col-lg-3 d-lg-block d-none top-space">
            <a className="text-decoration-none" href="#">
              <img
                src={woman}
                width="320px"
                height="284px"
                className="img-fluid woman"
                alt="woman"
              />
            </a>
          </div>
        </div>

        <div className="product-carousel">
          <div className="row left-space m-0">
            <h2 className="new-arrivals">New Arrivals</h2>
          </div>

          <div className="row justify-content-end m-0 left-space">
            <a className="text-decoration-none" href="#" target="_blank">
              <p className="all-deals">All Deals</p>
            </a>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="container">
                <Carousel showArrows={true} showStatus={false}>
                  <div class="d-flex justify-content-between">
                    <div class="item mr-3">
                      <div class="arrivals card">
                        <div class="d-flex flex-nowrap">
                          <div class="sale d-lg-block d-none">
                            <h2 class="sale-heading">Sale</h2>
                          </div>

                          <div class="product">
                            <img
                              src={productone}
                              width="218px"
                              height="172px"
                              class="img-fluid d-block"
                            />
                          </div>

                          <div class="cart-icons align-self-end align-self-lg-start">
                            <div class="watch d-lg-block d-none">
                              <img
                                src={eye}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>

                            <div class="watch">
                              <img
                                src={like}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>

                            <div class="watch d-lg-block d-none">
                              <img
                                src={share}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="product-text">
                          <p class="product-category">Skin Care</p>

                          <a
                            class="text-decoration-none d-block d-lg-none"
                            href="#"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="Olnature&#39;s Nourishing Baby Oil 200 ml"
                          >
                            <p class="product-name text-truncate">
                              Olnature&#39;s Nourishing Baby Oil 200 ml
                            </p>
                          </a>

                          <p class="product-name d-lg-block d-none">
                            Olnature&#39;s Nourishing Baby Oil 200 ml
                          </p>

                          <div class="rating d-lg-flex d-none">
                            <p class="rating-number">4.7</p>
                          </div>

                          <p class="product-author d-lg-block d-none">
                            By:{" "}
                            <span class="product-author-name">
                              Olnature&#39;s
                            </span>
                          </p>
                        </div>

                        <div class="d-lg-flex d-flex-column justify-content-between">
                          <div class="price d-flex d-lg-block">
                            <p class="discount">&#8377; 260.00</p>

                            <p class="product-price">&#8377; 204.00</p>
                          </div>

                          <a
                            class="text-decoration-none cart align-self-center d-flex"
                            href="#"
                          >
                            <i class="fa-solid fa-cart-shopping cart-icon"></i>{" "}
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>

                    <div class="item mr-3">
                      <div class="arrivals card">
                        <div class="d-flex flex-nowrap">
                          <div class="sale d-lg-block d-none">
                            <h2 class="sale-heading">23%</h2>
                          </div>

                          <div class="product">
                            <img
                              src={producttwo}
                              width="218px"
                              height="172px"
                              class="img-fluid d-block"
                            />
                          </div>

                          <div class="cart-icons align-self-end align-self-lg-start">
                            <div class="watch d-lg-block d-none">
                              <img
                                src={eye}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>

                            <div class="watch">
                              <img
                                src={like}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>

                            <div class="watch d-lg-block d-none">
                              <img
                                src={share}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="product-text">
                          <p class="product-category">Nutrition</p>

                          <a
                            class="text-decoration-none d-block d-lg-none"
                            href="#"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="Health etc Hair Health Gummy (30 Gummies)"
                          >
                            <p class="product-name text-truncate">
                              Health etc Hair Health Gummy (30 Gummies){" "}
                            </p>
                          </a>

                          <p class="product-name d-lg-block d-none">
                            Health etc Hair Health Gummy (30 Gummies){" "}
                          </p>

                          <div class="rating d-lg-flex d-none">
                            <p class="rating-number">4.7</p>
                          </div>

                          <p class="product-author d-lg-block d-none">
                            By:{" "}
                            <span class="product-author-name">Health etc.</span>
                          </p>
                        </div>

                        <div class="d-lg-flex d-flex-column justify-content-between mb-3">
                          <div class="price d-flex d-lg-block">
                            <p class="discount">&#8377; 999.00</p>

                            <p class="product-price">&#8377; 769.00</p>
                          </div>

                          <a
                            class="text-decoration-none align-self-center d-flex cart"
                            href="#"
                          >
                            <i class="fa-solid fa-cart-shopping cart-icon"></i>
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>

                    <div class="item mr-3">
                      <div class="arrivals card">
                        <div class="d-flex flex-nowrap">
                          <div class="sale d-lg-block d-none">
                            <h2 class="sale-heading">21%</h2>
                          </div>

                          <div class="product">
                            <img
                              src={productthree}
                              width="218px"
                              height="172px"
                              class="img-fluid d-block"
                            />
                          </div>

                          <div class="cart-icons align-self-end align-self-lg-start">
                            <div class="watch d-lg-block d-none">
                              <img
                                src={eye}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>

                            <div class="watch">
                              <img
                                src={like}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>

                            <div class="watch d-lg-block d-none">
                              <img
                                src={share}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="product-text">
                          <p class="product-category">Skin Care</p>

                          <a
                            class="text-decoration-none d-block d-lg-none"
                            href="#"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="Olnature’s Advanced Anti – Blemish Cream 25g"
                          >
                            <p class="product-name text-truncate">
                              Olnature’s Advanced Anti – Blemish Cream 25g
                            </p>
                          </a>

                          <p class="product-name d-lg-block d-none">
                            Olnature’s Advanced Anti – Blemish Cream 25g
                          </p>

                          <div class="rating d-lg-flex d-none">
                            <p class="rating-number">4.5</p>
                          </div>

                          <p class="product-author d-lg-block d-none">
                            By:{" "}
                            <span class="product-author-name">Olnature’s</span>
                          </p>
                        </div>

                        <div class="d-lg-flex d-flex-column justify-content-between mb-3">
                          <div class="price d-flex d-lg-block">
                            <p class="discount">&#8377; 290.00</p>

                            <p class="product-price">&#8377; 228.00</p>
                          </div>

                          <a
                            class="text-decoration-none align-self-center d-flex cart"
                            href="#"
                          >
                            <i class="fa-solid fa-cart-shopping cart-icon"></i>
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>

                    <div class="item  mr-3">
                      <div class="arrivals card">
                        <div class="d-flex flex-nowrap">
                          <div class="sale d-lg-block d-none">
                            <h2 class="sale-heading">Sale</h2>
                          </div>

                          <div class="product">
                            <img
                              src={productfour}
                              width="218px"
                              height="172px"
                              class="img-fluid d-block"
                            />
                          </div>

                          <div class="cart-icons align-self-end align-self-lg-start">
                            <div class="watch d-lg-block d-none">
                              <img
                                src={eye}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>

                            <div class="watch">
                              <img
                                src={like}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>

                            <div class="watch d-lg-block d-none">
                              <img
                                src={share}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="product-text">
                          <p class="product-category">Skin Care</p>

                          <a
                            class="text-decoration-none d-block d-lg-none"
                            href="#"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="Olnature’s Exfoliating Papaya Face Wash -100ml (Pack of 2)"
                          >
                            <p class="product-name text-truncate">
                              Olnature’s Exfoliating Papaya Face Wash -100ml
                              (Pack of 2)
                            </p>
                          </a>

                          <p class="product-name d-lg-block d-none">
                            Olnature’s Exfoliating Papaya Face Wash -100ml (Pack
                            of 2)
                          </p>

                          <div class="rating d-lg-flex d-none">
                            <p class="rating-number">4.8</p>
                          </div>

                          <p class="product-author d-lg-block d-none">
                            By:{" "}
                            <span class="product-author-name">Olnature’s</span>
                          </p>
                        </div>

                        <div class="d-lg-flex d-flex-column justify-content-between mb-3">
                          <div class="price d-flex d-lg-block">
                            <p class="discount">&#8377; 250.00</p>

                            <p class="product-price">&#8377; 198.00</p>
                          </div>

                          <a
                            class="text-decoration-none align-self-center d-flex cart"
                            href="#"
                          >
                            <i class="fa-solid fa-cart-shopping cart-icon"></i>
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between">
                    <div class="item  mr-3">
                      <div class="arrivals card">
                        <div class="d-flex flex-nowrap">
                          <div class="sale d-lg-block d-none">
                            <h2 class="sale-heading">Sale</h2>
                          </div>

                          <div class="product">
                            <img
                              src={productone}
                              width="218px"
                              height="172px"
                              class="img-fluid d-block"
                            />
                          </div>

                          <div class="cart-icons align-self-end align-self-lg-start">
                            <div class="watch d-lg-block d-none">
                              <img
                                src={eye}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>

                            <div class="watch">
                              <img
                                src={like}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>

                            <div class="watch d-lg-block d-none">
                              <img
                                src={share}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="product-text">
                          <p class="product-category">Skin Care</p>

                          <a
                            class="text-decoration-none d-block d-lg-none"
                            href="#"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="Olnature&#39;s Nourishing Baby Oil 200 ml"
                          >
                            <p class="product-name text-truncate">
                              Olnature&#39;s Nourishing Baby Oil 200 ml
                            </p>
                          </a>

                          <p class="product-name d-lg-block d-none">
                            Olnature&#39;s Nourishing Baby Oil 200 ml
                          </p>

                          <div class="rating d-lg-flex d-none">
                            <p class="rating-number">4.7</p>
                          </div>

                          <p class="product-author d-lg-block d-none">
                            By:{" "}
                            <span class="product-author-name">
                              Olnature&#39;s
                            </span>
                          </p>
                        </div>

                        <div class="d-lg-flex d-flex-column justify-content-between">
                          <div class="price d-flex d-lg-block">
                            <p class="discount">&#8377; 260.00</p>

                            <p class="product-price">&#8377; 204.00</p>
                          </div>

                          <a
                            class="text-decoration-none cart align-self-center d-flex"
                            href="#"
                          >
                            <i class="fa-solid fa-cart-shopping cart-icon"></i>{" "}
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>

                    <div class="item mr-3">
                      <div class="arrivals card">
                        <div class="d-flex flex-nowrap">
                          <div class="sale d-lg-block d-none">
                            <h2 class="sale-heading">23%</h2>
                          </div>

                          <div class="product">
                            <img
                              src={producttwo}
                              width="218px"
                              height="172px"
                              class="img-fluid d-block"
                            />
                          </div>

                          <div class="cart-icons align-self-end align-self-lg-start">
                            <div class="watch d-lg-block d-none">
                              <img
                                src={eye}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>

                            <div class="watch">
                              <img
                                src={like}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>

                            <div class="watch d-lg-block d-none">
                              <img
                                src={share}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="product-text">
                          <p class="product-category">Nutrition</p>

                          <a
                            class="text-decoration-none d-block d-lg-none"
                            href="#"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="Health etc Hair Health Gummy (30 Gummies)"
                          >
                            <p class="product-name text-truncate">
                              Health etc Hair Health Gummy (30 Gummies){" "}
                            </p>
                          </a>

                          <p class="product-name d-lg-block d-none">
                            Health etc Hair Health Gummy (30 Gummies){" "}
                          </p>

                          <div class="rating d-lg-flex d-none">
                            <p class="rating-number">4.7</p>
                          </div>

                          <p class="product-author d-lg-block d-none">
                            By:{" "}
                            <span class="product-author-name">Health etc.</span>
                          </p>
                        </div>

                        <div class="d-lg-flex d-flex-column justify-content-between mb-3">
                          <div class="price d-flex d-lg-block">
                            <p class="discount">&#8377; 999.00</p>

                            <p class="product-price">&#8377; 769.00</p>
                          </div>

                          <a
                            class="text-decoration-none align-self-center d-flex cart"
                            href="#"
                          >
                            <i class="fa-solid fa-cart-shopping cart-icon"></i>
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>

                    <div class="item mr-3">
                      <div class="arrivals card">
                        <div class="d-flex flex-nowrap">
                          <div class="sale d-lg-block d-none">
                            <h2 class="sale-heading">21%</h2>
                          </div>

                          <div class="product">
                            <img
                              src={productthree}
                              width="218px"
                              height="172px"
                              class="img-fluid d-block"
                            />
                          </div>

                          <div class="cart-icons align-self-end align-self-lg-start">
                            <div class="watch d-lg-block d-none">
                              <img
                                src={eye}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>

                            <div class="watch">
                              <img
                                src={like}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>

                            <div class="watch d-lg-block d-none">
                              <img
                                src={share}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="product-text">
                          <p class="product-category">Skin Care</p>

                          <a
                            class="text-decoration-none d-block d-lg-none"
                            href="#"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="Olnature’s Advanced Anti – Blemish Cream 25g"
                          >
                            <p class="product-name text-truncate">
                              Olnature’s Advanced Anti – Blemish Cream 25g
                            </p>
                          </a>

                          <p class="product-name d-lg-block d-none">
                            Olnature’s Advanced Anti – Blemish Cream 25g
                          </p>

                          <div class="rating d-lg-flex d-none">
                            <p class="rating-number">4.5</p>
                          </div>

                          <p class="product-author d-lg-block d-none">
                            By:{" "}
                            <span class="product-author-name">Olnature’s</span>
                          </p>
                        </div>

                        <div class="d-lg-flex d-flex-column justify-content-between mb-3">
                          <div class="price d-flex d-lg-block">
                            <p class="discount">&#8377; 290.00</p>

                            <p class="product-price">&#8377; 228.00</p>
                          </div>

                          <a
                            class="text-decoration-none align-self-center d-flex cart"
                            href="#"
                          >
                            <i class="fa-solid fa-cart-shopping cart-icon"></i>
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>

                    <div class="item">
                      <div class="arrivals card">
                        <div class="d-flex flex-nowrap">
                          <div class="sale d-lg-block d-none">
                            <h2 class="sale-heading">Sale</h2>
                          </div>

                          <div class="product">
                            <img
                              src={productfour}
                              width="218px"
                              height="172px"
                              class="img-fluid d-block"
                            />
                          </div>

                          <div class="cart-icons align-self-end align-self-lg-start">
                            <div class="watch d-lg-block d-none">
                              <img
                                src={eye}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>

                            <div class="watch">
                              <img
                                src={like}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>

                            <div class="watch d-lg-block d-none">
                              <img
                                src={share}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="product-text">
                          <p class="product-category">Skin Care</p>

                          <a
                            class="text-decoration-none d-block d-lg-none"
                            href="#"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="Olnature’s Exfoliating Papaya Face Wash -100ml (Pack of 2)"
                          >
                            <p class="product-name text-truncate">
                              Olnature’s Exfoliating Papaya Face Wash -100ml
                              (Pack of 2)
                            </p>
                          </a>

                          <p class="product-name d-lg-block d-none">
                            Olnature’s Exfoliating Papaya Face Wash -100ml (Pack
                            of 2)
                          </p>

                          <div class="rating d-lg-flex d-none">
                            <p class="rating-number">4.8</p>
                          </div>

                          <p class="product-author d-lg-block d-none">
                            By:{" "}
                            <span class="product-author-name">Olnature’s</span>
                          </p>
                        </div>

                        <div class="d-lg-flex d-flex-column justify-content-between mb-3">
                          <div class="price d-flex d-lg-block">
                            <p class="discount">&#8377; 250.00</p>

                            <p class="product-price">&#8377; 198.00</p>
                          </div>

                          <a
                            class="text-decoration-none align-self-center d-flex cart"
                            href="#"
                          >
                            <i class="fa-solid fa-cart-shopping cart-icon"></i>
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
        <div className="row m-0">
          <h2 className="doctors-heading">Curated By Our Doctors</h2>
        </div>

        <div className="row">
          <div className="col-lg-3 col-6">
            <a className="text-decoration-none" href="#">
              <img
                src={monsoon}
                width="320px"
                height="280px"
                className="img-fluid mx-auto d-block"
                alt="monsoon"
              />
            </a>
          </div>

          <div className="col-lg-3 col-6">
            <a className="text-decoration-none" href="#">
              <img
                src={monsoontwo}
                width="320px"
                height="159px"
                className="img-fluid mx-auto d-block mb-3"
                alt="monsoontwo"
              />
            </a>

            <a className="text-decoration-none" href="#">
              <img
                src={monsoonthree}
                width="320px"
                height="159px"
                className="img-fluid mx-auto d-block"
                alt="monsoonthree"
              />
            </a>
          </div>

          <div className="col-lg-3 col-6 top-space">
            <a className="text-decoration-none" href="#">
              <img
                src={monsoon4}
                width="320px"
                height="280px"
                className="img-fluid mx-auto d-block"
                alt="monsoon"
              />
            </a>
          </div>

          <div className="col-lg-3 col-6 top-space">
            <a className="text-decoration-none" href="#">
              <img
                src={monsoon5}
                width="320px"
                height="159px"
                className="img-fluid mx-auto d-block mb-3"
                alt="monsoontwo"
              />
            </a>

            <a className="text-decoration-none" href="#">
              <img
                src={monsoon6}
                width="320px"
                height="159px"
                className="img-fluid mx-auto d-block"
                alt="monsoonthree"
              />
            </a>
          </div>
        </div>

        <div className="row m-0">
          <h2 className="doctors-heading">Curated by Age</h2>
        </div>

        <div className="row">
          <div className="col-lg-3 col-6">
            <a className="text-decoration-none" href="#">
              <img
                src={age1}
                width="320px"
                height="280px"
                className="img-fluid mx-auto d-block"
                alt="monsoon"
              />
            </a>
          </div>

          <div className="col-lg-3 col-6">
            <a className="text-decoration-none" href="#">
              <img
                src={age2}
                width="320px"
                height="159px"
                className="img-fluid mx-auto d-block mb-3"
                alt="monsoontwo"
              />
            </a>
          </div>

          <div className="col-lg-3 col-6">
            <a className="text-decoration-none" href="#">
              <img
                src={age3}
                width="320px"
                height="280px"
                className="img-fluid mx-auto d-block"
                alt="monsoon"
              />
            </a>
          </div>

          <div className="col-lg-3 col-6">
            <a className="text-decoration-none" href="#">
              <img
                src={age4}
                width="320px"
                height="159px"
                className="img-fluid mx-auto d-block mb-3"
                alt="monsoontwo"
              />
            </a>
          </div>
        </div>

        <div className="discounts">
          <div className="row">
            <div className="col-lg-12">
              <Carousel showArrows={false} showStatus={false}>
                <div class="d-flex justify-content-between">
                  <div className="item  mr-3">
                    <a className="text-decoration-none" href="#">
                      <img
                        src={discount1}
                        width="480px"
                        height="186px"
                        className="img-fluid mx-auto d-block"
                        alt="discount1"
                      />
                    </a>
                  </div>

                  <div class="item mr-3">
                    <div className="item">
                      <a className="text-decoration-none" href="#">
                        <img
                          src={discount2}
                          width="480px"
                          height="186px"
                          className="img-fluid mx-auto d-block"
                          alt="discount1"
                        />
                      </a>
                    </div>
                  </div>

                  <div class="item mr-3">
                    <div className="item">
                      <a className="text-decoration-none" href="#">
                        <img
                          src={discount3}
                          width="480px"
                          height="186px"
                          className="img-fluid mx-auto d-block"
                          alt="discount1"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-between">
                  <div class="item  mr-3">
                    <div className="item">
                      <a className="text-decoration-none" href="#">
                        <img
                          src={discount1}
                          width="480px"
                          height="186px"
                          className="img-fluid mx-auto d-block"
                          alt="discount1"
                        />
                      </a>
                    </div>
                  </div>

                  <div class="item mr-3">
                    <div className="item">
                      <a className="text-decoration-none" href="#">
                        <img
                          src={discount2}
                          width="480px"
                          height="186px"
                          className="img-fluid mx-auto d-block"
                          alt="discount1"
                        />
                      </a>
                    </div>
                  </div>

                  <div class="item mr-3">
                    <div className="item">
                      <a className="text-decoration-none" href="#">
                        <img
                          src={discount3}
                          width="480px"
                          height="186px"
                          className="img-fluid mx-auto d-block"
                          alt="discount1"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-between">
                  <div class="item  mr-3">
                    <div className="item">
                      <a className="text-decoration-none" href="#">
                        <img
                          src={discount1}
                          width="480px"
                          height="186px"
                          className="img-fluid mx-auto d-block"
                          alt="discount1"
                        />
                      </a>
                    </div>
                  </div>

                  <div class="item mr-3">
                    <div className="item">
                      <a className="text-decoration-none" href="#">
                        <img
                          src={discount2}
                          width="480px"
                          height="186px"
                          className="img-fluid mx-auto d-block"
                          alt="discount1"
                        />
                      </a>
                    </div>
                  </div>

                  <div class="item mr-3">
                    <div className="item">
                      <a className="text-decoration-none" href="#">
                        <img
                          src={discount3}
                          width="480px"
                          height="186px"
                          className="img-fluid mx-auto d-block"
                          alt="discount1"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-between">
                  <div class="item  mr-3">
                    <div className="item">
                      <a className="text-decoration-none" href="#">
                        <img
                          src={discount1}
                          width="480px"
                          height="186px"
                          className="img-fluid mx-auto d-block"
                          alt="discount1"
                        />
                      </a>
                    </div>
                  </div>

                  <div class="item mr-3">
                    <div className="item">
                      <a className="text-decoration-none" href="#">
                        <img
                          src={discount2}
                          width="480px"
                          height="186px"
                          className="img-fluid mx-auto d-block"
                          alt="discount1"
                        />
                      </a>
                    </div>
                  </div>

                  <div class="item mr-3">
                    <div className="item">
                      <a className="text-decoration-none" href="#">
                        <img
                          src={discount3}
                          width="480px"
                          height="186px"
                          className="img-fluid mx-auto d-block"
                          alt="discount1"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-between">
                  <div class="item  mr-3">
                    <div className="item">
                      <a className="text-decoration-none" href="#">
                        <img
                          src={discount1}
                          width="480px"
                          height="186px"
                          className="img-fluid mx-auto d-block"
                          alt="discount1"
                        />
                      </a>
                    </div>
                  </div>

                  <div class="item mr-3">
                    <div className="item">
                      <a className="text-decoration-none" href="#">
                        <img
                          src={discount2}
                          width="480px"
                          height="186px"
                          className="img-fluid mx-auto d-block"
                          alt="discount1"
                        />
                      </a>
                    </div>
                  </div>

                  <div class="item mr-3">
                    <div className="item">
                      <a className="text-decoration-none" href="#">
                        <img
                          src={discount3}
                          width="480px"
                          height="186px"
                          className="img-fluid mx-auto d-block"
                          alt="discount1"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </Carousel>
            </div>
          </div>
        </div>

        <div className=" product-carousel">
          <div className="row left-space m-0">
            <h2 className="new-arrivals">Top Picks</h2>
          </div>

          <div className="row justify-content-end m-0 left-space">
            <a className="text-decoration-none" href="#" target="_blank">
              <p className="all-deals">All Deals</p>
            </a>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="container">
                <Carousel
                  showArrows={true}
                  showStatus={false}
                  showIndicators={false}
                >
                  <div class="d-flex justify-content-between">
                    <div class="item mr-3">
                      <div class="arrivals card">
                        <div class="d-flex flex-nowrap">
                          <div class="sale d-lg-block d-none">
                            <h2 class="sale-heading">Sale</h2>
                          </div>

                          <div class="product">
                            <img
                              src={productone}
                              width="218px"
                              height="172px"
                              class="img-fluid d-block"
                            />
                          </div>

                          <div class="cart-icons align-self-end align-self-lg-start">
                            <div class="watch d-lg-block d-none">
                              <img
                                src={eye}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>

                            <div class="watch">
                              <img
                                src={like}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>

                            <div class="watch d-lg-block d-none">
                              <img
                                src={share}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="product-text">
                          <p class="product-category">Skin Care</p>

                          <a
                            class="text-decoration-none d-block d-lg-none"
                            href="#"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="Olnature&#39;s Nourishing Baby Oil 200 ml"
                          >
                            <p class="product-name text-truncate">
                              Olnature&#39;s Nourishing Baby Oil 200 ml
                            </p>
                          </a>

                          <p class="product-name d-lg-block d-none">
                            Olnature&#39;s Nourishing Baby Oil 200 ml
                          </p>

                          <div class="rating d-lg-flex d-none">
                            <p class="rating-number">4.7</p>
                          </div>

                          <p class="product-author d-lg-block d-none">
                            By:{" "}
                            <span class="product-author-name">
                              Olnature&#39;s
                            </span>
                          </p>
                        </div>

                        <div class="d-lg-flex d-flex-column justify-content-between">
                          <div class="price d-flex d-lg-block">
                            <p class="discount">&#8377; 260.00</p>

                            <p class="product-price">&#8377; 204.00</p>
                          </div>

                          <a
                            class="text-decoration-none cart align-self-center d-flex"
                            href="#"
                          >
                            <i class="fa-solid fa-cart-shopping cart-icon"></i>{" "}
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>

                    <div class="item mr-3">
                      <div class="arrivals card">
                        <div class="d-flex flex-nowrap">
                          <div class="sale d-lg-block d-none">
                            <h2 class="sale-heading">23%</h2>
                          </div>

                          <div class="product">
                            <img
                              src={producttwo}
                              width="218px"
                              height="172px"
                              class="img-fluid d-block"
                            />
                          </div>

                          <div class="cart-icons align-self-end align-self-lg-start">
                            <div class="watch d-lg-block d-none">
                              <img
                                src={eye}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>

                            <div class="watch">
                              <img
                                src={like}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>

                            <div class="watch d-lg-block d-none">
                              <img
                                src={share}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="product-text">
                          <p class="product-category">Nutrition</p>

                          <a
                            class="text-decoration-none d-block d-lg-none"
                            href="#"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="Health etc Hair Health Gummy (30 Gummies)"
                          >
                            <p class="product-name text-truncate">
                              Health etc Hair Health Gummy (30 Gummies){" "}
                            </p>
                          </a>

                          <p class="product-name d-lg-block d-none">
                            Health etc Hair Health Gummy (30 Gummies){" "}
                          </p>

                          <div class="rating d-lg-flex d-none">
                            <p class="rating-number">4.7</p>
                          </div>

                          <p class="product-author d-lg-block d-none">
                            By:{" "}
                            <span class="product-author-name">Health etc.</span>
                          </p>
                        </div>

                        <div class="d-lg-flex d-flex-column justify-content-between mb-3">
                          <div class="price d-flex d-lg-block">
                            <p class="discount">&#8377; 999.00</p>

                            <p class="product-price">&#8377; 769.00</p>
                          </div>

                          <a
                            class="text-decoration-none align-self-center d-flex cart"
                            href="#"
                          >
                            <i class="fa-solid fa-cart-shopping cart-icon"></i>
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>

                    <div class="item mr-3">
                      <div class="arrivals card">
                        <div class="d-flex flex-nowrap">
                          <div class="sale d-lg-block d-none">
                            <h2 class="sale-heading">21%</h2>
                          </div>

                          <div class="product">
                            <img
                              src={productthree}
                              width="218px"
                              height="172px"
                              class="img-fluid d-block"
                            />
                          </div>

                          <div class="cart-icons align-self-end align-self-lg-start">
                            <div class="watch d-lg-block d-none">
                              <img
                                src={eye}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>

                            <div class="watch">
                              <img
                                src={like}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>

                            <div class="watch d-lg-block d-none">
                              <img
                                src={share}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="product-text">
                          <p class="product-category">Skin Care</p>

                          <a
                            class="text-decoration-none d-block d-lg-none"
                            href="#"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="Olnature’s Advanced Anti – Blemish Cream 25g"
                          >
                            <p class="product-name text-truncate">
                              Olnature’s Advanced Anti – Blemish Cream 25g
                            </p>
                          </a>

                          <p class="product-name d-lg-block d-none">
                            Olnature’s Advanced Anti – Blemish Cream 25g
                          </p>

                          <div class="rating d-lg-flex d-none">
                            <p class="rating-number">4.5</p>
                          </div>

                          <p class="product-author d-lg-block d-none">
                            By:{" "}
                            <span class="product-author-name">Olnature’s</span>
                          </p>
                        </div>

                        <div class="d-lg-flex d-flex-column justify-content-between mb-3">
                          <div class="price d-flex d-lg-block">
                            <p class="discount">&#8377; 290.00</p>

                            <p class="product-price">&#8377; 228.00</p>
                          </div>

                          <a
                            class="text-decoration-none align-self-center d-flex cart"
                            href="#"
                          >
                            <i class="fa-solid fa-cart-shopping cart-icon"></i>
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>

                    <div class="item  mr-3">
                      <div class="arrivals card">
                        <div class="d-flex flex-nowrap">
                          <div class="sale d-lg-block d-none">
                            <h2 class="sale-heading">Sale</h2>
                          </div>

                          <div class="product">
                            <img
                              src={productfour}
                              width="218px"
                              height="172px"
                              class="img-fluid d-block"
                            />
                          </div>

                          <div class="cart-icons align-self-end align-self-lg-start">
                            <div class="watch d-lg-block d-none">
                              <img
                                src={eye}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>

                            <div class="watch">
                              <img
                                src={like}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>

                            <div class="watch d-lg-block d-none">
                              <img
                                src={share}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="product-text">
                          <p class="product-category">Skin Care</p>

                          <a
                            class="text-decoration-none d-block d-lg-none"
                            href="#"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="Olnature’s Exfoliating Papaya Face Wash -100ml (Pack of 2)"
                          >
                            <p class="product-name text-truncate">
                              Olnature’s Exfoliating Papaya Face Wash -100ml
                              (Pack of 2)
                            </p>
                          </a>

                          <p class="product-name d-lg-block d-none">
                            Olnature’s Exfoliating Papaya Face Wash -100ml (Pack
                            of 2)
                          </p>

                          <div class="rating d-lg-flex d-none">
                            <p class="rating-number">4.8</p>
                          </div>

                          <p class="product-author d-lg-block d-none">
                            By:{" "}
                            <span class="product-author-name">Olnature’s</span>
                          </p>
                        </div>

                        <div class="d-lg-flex d-flex-column justify-content-between mb-3">
                          <div class="price d-flex d-lg-block">
                            <p class="discount">&#8377; 250.00</p>

                            <p class="product-price">&#8377; 198.00</p>
                          </div>

                          <a
                            class="text-decoration-none align-self-center d-flex cart"
                            href="#"
                          >
                            <i class="fa-solid fa-cart-shopping cart-icon"></i>
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between">
                    <div class="item  mr-3">
                      <div class="arrivals card">
                        <div class="d-flex flex-nowrap">
                          <div class="sale d-lg-block d-none">
                            <h2 class="sale-heading">Sale</h2>
                          </div>

                          <div class="product">
                            <img
                              src={productone}
                              width="218px"
                              height="172px"
                              class="img-fluid d-block"
                            />
                          </div>

                          <div class="cart-icons align-self-end align-self-lg-start">
                            <div class="watch d-lg-block d-none">
                              <img
                                src={eye}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>

                            <div class="watch">
                              <img
                                src={like}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>

                            <div class="watch d-lg-block d-none">
                              <img
                                src={share}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="product-text">
                          <p class="product-category">Skin Care</p>

                          <a
                            class="text-decoration-none d-block d-lg-none"
                            href="#"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="Olnature&#39;s Nourishing Baby Oil 200 ml"
                          >
                            <p class="product-name text-truncate">
                              Olnature&#39;s Nourishing Baby Oil 200 ml
                            </p>
                          </a>

                          <p class="product-name d-lg-block d-none">
                            Olnature&#39;s Nourishing Baby Oil 200 ml
                          </p>

                          <div class="rating d-lg-flex d-none">
                            <p class="rating-number">4.7</p>
                          </div>

                          <p class="product-author d-lg-block d-none">
                            By:{" "}
                            <span class="product-author-name">
                              Olnature&#39;s
                            </span>
                          </p>
                        </div>

                        <div class="d-lg-flex d-flex-column justify-content-between">
                          <div class="price d-flex d-lg-block">
                            <p class="discount">&#8377; 260.00</p>

                            <p class="product-price">&#8377; 204.00</p>
                          </div>

                          <a
                            class="text-decoration-none cart align-self-center d-flex"
                            href="#"
                          >
                            <i class="fa-solid fa-cart-shopping cart-icon"></i>{" "}
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>

                    <div class="item mr-3">
                      <div class="arrivals card">
                        <div class="d-flex flex-nowrap">
                          <div class="sale d-lg-block d-none">
                            <h2 class="sale-heading">23%</h2>
                          </div>

                          <div class="product">
                            <img
                              src={producttwo}
                              width="218px"
                              height="172px"
                              class="img-fluid d-block"
                            />
                          </div>

                          <div class="cart-icons align-self-end align-self-lg-start">
                            <div class="watch d-lg-block d-none">
                              <img
                                src={eye}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>

                            <div class="watch">
                              <img
                                src={like}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>

                            <div class="watch d-lg-block d-none">
                              <img
                                src={share}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="product-text">
                          <p class="product-category">Nutrition</p>

                          <a
                            class="text-decoration-none d-block d-lg-none"
                            href="#"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="Health etc Hair Health Gummy (30 Gummies)"
                          >
                            <p class="product-name text-truncate">
                              Health etc Hair Health Gummy (30 Gummies){" "}
                            </p>
                          </a>

                          <p class="product-name d-lg-block d-none">
                            Health etc Hair Health Gummy (30 Gummies){" "}
                          </p>

                          <div class="rating d-lg-flex d-none">
                            <p class="rating-number">4.7</p>
                          </div>

                          <p class="product-author d-lg-block d-none">
                            By:{" "}
                            <span class="product-author-name">Health etc.</span>
                          </p>
                        </div>

                        <div class="d-lg-flex d-flex-column justify-content-between mb-3">
                          <div class="price d-flex d-lg-block">
                            <p class="discount">&#8377; 999.00</p>

                            <p class="product-price">&#8377; 769.00</p>
                          </div>

                          <a
                            class="text-decoration-none align-self-center d-flex cart"
                            href="#"
                          >
                            <i class="fa-solid fa-cart-shopping cart-icon"></i>
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>

                    <div class="item mr-3">
                      <div class="arrivals card">
                        <div class="d-flex flex-nowrap">
                          <div class="sale d-lg-block d-none">
                            <h2 class="sale-heading">21%</h2>
                          </div>

                          <div class="product">
                            <img
                              src={productthree}
                              width="218px"
                              height="172px"
                              class="img-fluid d-block"
                            />
                          </div>

                          <div class="cart-icons align-self-end align-self-lg-start">
                            <div class="watch d-lg-block d-none">
                              <img
                                src={eye}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>

                            <div class="watch">
                              <img
                                src={like}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>

                            <div class="watch d-lg-block d-none">
                              <img
                                src={share}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="product-text">
                          <p class="product-category">Skin Care</p>

                          <a
                            class="text-decoration-none d-block d-lg-none"
                            href="#"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="Olnature’s Advanced Anti – Blemish Cream 25g"
                          >
                            <p class="product-name text-truncate">
                              Olnature’s Advanced Anti – Blemish Cream 25g
                            </p>
                          </a>

                          <p class="product-name d-lg-block d-none">
                            Olnature’s Advanced Anti – Blemish Cream 25g
                          </p>

                          <div class="rating d-lg-flex d-none">
                            <p class="rating-number">4.5</p>
                          </div>

                          <p class="product-author d-lg-block d-none">
                            By:{" "}
                            <span class="product-author-name">Olnature’s</span>
                          </p>
                        </div>

                        <div class="d-lg-flex d-flex-column justify-content-between mb-3">
                          <div class="price d-flex d-lg-block">
                            <p class="discount">&#8377; 290.00</p>

                            <p class="product-price">&#8377; 228.00</p>
                          </div>

                          <a
                            class="text-decoration-none align-self-center d-flex cart"
                            href="#"
                          >
                            <i class="fa-solid fa-cart-shopping cart-icon"></i>
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>

                    <div class="item">
                      <div class="arrivals card">
                        <div class="d-flex flex-nowrap">
                          <div class="sale d-lg-block d-none">
                            <h2 class="sale-heading">Sale</h2>
                          </div>

                          <div class="product">
                            <img
                              src={productfour}
                              width="218px"
                              height="172px"
                              class="img-fluid d-block"
                            />
                          </div>

                          <div class="cart-icons align-self-end align-self-lg-start">
                            <div class="watch d-lg-block d-none">
                              <img
                                src={eye}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>

                            <div class="watch">
                              <img
                                src={like}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>

                            <div class="watch d-lg-block d-none">
                              <img
                                src={share}
                                width="10px"
                                height="10px"
                                class="d-block mx-auto eye"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="product-text">
                          <p class="product-category">Skin Care</p>

                          <a
                            class="text-decoration-none d-block d-lg-none"
                            href="#"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="Olnature’s Exfoliating Papaya Face Wash -100ml (Pack of 2)"
                          >
                            <p class="product-name text-truncate">
                              Olnature’s Exfoliating Papaya Face Wash -100ml
                              (Pack of 2)
                            </p>
                          </a>

                          <p class="product-name d-lg-block d-none">
                            Olnature’s Exfoliating Papaya Face Wash -100ml (Pack
                            of 2)
                          </p>

                          <div class="rating d-lg-flex d-none">
                            <p class="rating-number">4.8</p>
                          </div>

                          <p class="product-author d-lg-block d-none">
                            By:{" "}
                            <span class="product-author-name">Olnature’s</span>
                          </p>
                        </div>

                        <div class="d-lg-flex d-flex-column justify-content-between mb-3">
                          <div class="price d-flex d-lg-block">
                            <p class="discount">&#8377; 250.00</p>

                            <p class="product-price">&#8377; 198.00</p>
                          </div>

                          <a
                            class="text-decoration-none align-self-center d-flex cart"
                            href="#"
                          >
                            <i class="fa-solid fa-cart-shopping cart-icon"></i>
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

        <div className="row m-0">
          <h2 className="doctors-heading">Tell Us About Your Selves</h2>
        </div>

        <div className="row">
          <div className="col-lg-4 col-6">
            <a className="text-decoration-none" href="#">
              <img
                src={tellus1}
                width="480px"
                height="260px"
                className="img-fluid mx-auto d-block"
                alt="monsoon"
              />
            </a>
          </div>

          <div className="col-lg-4 col-6">
            <a className="text-decoration-none" href="#">
              <img
                src={tellus2}
                width="480px"
                height="260px"
                className="img-fluid mx-auto d-block"
                alt="monsoon"
              />
            </a>
          </div>

          <div className="col-lg-4 col-6 top-space">
            <a className="text-decoration-none" href="#">
              <img
                src={tellus3}
                width="480px"
                height="260px"
                className="img-fluid mx-auto d-block"
                alt="monsoon"
              />
            </a>
          </div>

          <div className="col-lg-4 col-6 top-space mt-lg-3">
            <a className="text-decoration-none" href="#">
              <img
                src={tellus4}
                width="480px"
                height="260px"
                className="img-fluid mx-auto d-block"
                alt="monsoon"
              />
            </a>
          </div>

          <div className="col-lg-4 col-6 top-space mt-lg-3">
            <a className="text-decoration-none" href="#">
              <img
                src={tellus5}
                width="480px"
                height="260px"
                className="img-fluid mx-auto d-block"
                alt="monsoon"
              />
            </a>
          </div>

          <div className="col-lg-4 col-6 top-space mt-lg-3">
            <a className="text-decoration-none" href="#">
              <img
                src={tellus6}
                width="480px"
                height="260px"
                className="img-fluid mx-auto d-block"
                alt="monsoon"
              />
            </a>
          </div>
        </div>

        <div className="offers">
          <Carousel showArrows={true} showStatus={false} showThumbs={false}>
            <div>
              <img
                className="w-100 d-block img-fluid mx-auto d-block"
                itemId={2}
                src={offers1}
                width="1260px"
                height="280px"
                alt="monsoon"
              />
              {/* <p className="legend">Legend 1</p> */}
            </div>
            <div>
              <img
                className="w-100 d-block img-fluid mx-auto d-block"
                itemId={2}
                src={offers1}
                width="1260px"
                height="280px"
                alt="monsoon"
              />
            </div>
            <div>
              <img
                className="w-100 d-block img-fluid mx-auto d-block"
                itemId={2}
                src={offers1}
                width="1260px"
                height="280px"
                alt="monsoon"
              />
            </div>
          </Carousel>
        </div>

        <div className="brands">
          <div className="row m-0">
            <h2 className="doctors-heading">Shop All 500 Brands</h2>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <Carousel showStatus={false}>
                <div class="d-flex justify-content-between">
                  <div className="item">
                    <a className="text-decoration-none" href="#">
                      <img
                        src={brand1}
                        width="180px"
                        height="180px"
                        className="img-fluid mx-auto d-block"
                        alt="brand2"
                      />
                    </a>
                  </div>

                  <div className="item">
                    <a className="text-decoration-none" href="#">
                      <img
                        src={brand2}
                        width="180px"
                        height="180px"
                        className="img-fluid mx-auto d-block"
                        alt="brand2"
                      />
                    </a>
                  </div>

                  <div className="item">
                    <a className="text-decoration-none" href="#">
                      <img
                        src={brand3}
                        width="180px"
                        height="180px"
                        className="img-fluid mx-auto d-block"
                        alt="brand2"
                      />
                    </a>
                  </div>

                  <div className="item">
                    <a className="text-decoration-none" href="#">
                      <img
                        src={brand4}
                        width="180px"
                        height="180px"
                        className="img-fluid mx-auto d-block"
                        alt="brand2"
                      />
                    </a>
                  </div>

                  <div className="item">
                    <a className="text-decoration-none" href="#">
                      <img
                        src={brand5}
                        width="180px"
                        height="180px"
                        className="img-fluid mx-auto d-block"
                        alt="brand2"
                      />
                    </a>
                  </div>

                  <div className="item">
                    <a className="text-decoration-none" href="#">
                      <img
                        src={brand6}
                        width="180px"
                        height="180px"
                        className="img-fluid mx-auto d-block"
                        alt="brand2"
                      />
                    </a>
                  </div>
                </div>
                <div class="d-flex justify-content-between">
                  <div className="item">
                    <a className="text-decoration-none" href="#">
                      <img
                        src={brand1}
                        width="180px"
                        height="180px"
                        className="img-fluid mx-auto d-block"
                        alt="brand2"
                      />
                    </a>
                  </div>

                  <div className="item">
                    <a className="text-decoration-none" href="#">
                      <img
                        src={brand2}
                        width="180px"
                        height="180px"
                        className="img-fluid mx-auto d-block"
                        alt="brand2"
                      />
                    </a>
                  </div>

                  <div className="item">
                    <a className="text-decoration-none" href="#">
                      <img
                        src={brand3}
                        width="180px"
                        height="180px"
                        className="img-fluid mx-auto d-block"
                        alt="brand2"
                      />
                    </a>
                  </div>

                  <div className="item">
                    <a className="text-decoration-none" href="#">
                      <img
                        src={brand4}
                        width="180px"
                        height="180px"
                        className="img-fluid mx-auto d-block"
                        alt="brand2"
                      />
                    </a>
                  </div>

                  <div className="item">
                    <a className="text-decoration-none" href="#">
                      <img
                        src={brand5}
                        width="180px"
                        height="180px"
                        className="img-fluid mx-auto d-block"
                        alt="brand2"
                      />
                    </a>
                  </div>

                  <div className="item">
                    <a className="text-decoration-none" href="#">
                      <img
                        src={brand6}
                        width="180px"
                        height="180px"
                        className="img-fluid mx-auto d-block"
                        alt="brand2"
                      />
                    </a>
                  </div>
                </div>
                <div class="d-flex justify-content-between">
                  <div className="item">
                    <a className="text-decoration-none" href="#">
                      <img
                        src={brand1}
                        width="180px"
                        height="180px"
                        className="img-fluid mx-auto d-block"
                        alt="brand2"
                      />
                    </a>
                  </div>

                  <div className="item">
                    <a className="text-decoration-none" href="#">
                      <img
                        src={brand2}
                        width="180px"
                        height="180px"
                        className="img-fluid mx-auto d-block"
                        alt="brand2"
                      />
                    </a>
                  </div>

                  <div className="item">
                    <a className="text-decoration-none" href="#">
                      <img
                        src={brand3}
                        width="180px"
                        height="180px"
                        className="img-fluid mx-auto d-block"
                        alt="brand2"
                      />
                    </a>
                  </div>

                  <div className="item">
                    <a className="text-decoration-none" href="#">
                      <img
                        src={brand4}
                        width="180px"
                        height="180px"
                        className="img-fluid mx-auto d-block"
                        alt="brand2"
                      />
                    </a>
                  </div>

                  <div className="item">
                    <a className="text-decoration-none" href="#">
                      <img
                        src={brand5}
                        width="180px"
                        height="180px"
                        className="img-fluid mx-auto d-block"
                        alt="brand2"
                      />
                    </a>
                  </div>

                  <div className="item">
                    <a className="text-decoration-none" href="#">
                      <img
                        src={brand6}
                        width="180px"
                        height="180px"
                        className="img-fluid mx-auto d-block"
                        alt="brand2"
                      />
                    </a>
                  </div>
                </div>
              </Carousel>
            </div>
          </div>

          <div className="sellwithus">
            <a className="text-decoration-none" href="#">
              <img
                src={sellwithus}
                width="1280px"
                height="228px"
                className="img-fluid d-block mx-auto"
                alt="sellwithus"
              />
            </a>
          </div>

          <div className="row m-0">
            <h2 className="new-arrivals">Our Recent Blog</h2>
          </div>

          <div className="row justify-content-end">
            <a className="text-decoration-none" href="#" target="_blank">
              <p className="view-all">View All</p>
            </a>
          </div>

          <div className="row recent-blog" id="blog-card">
            <div className="col-lg-4">
              <div className="blog-img">
                <img
                  src={blog1}
                  width="480px"
                  height="226px"
                  className="img-fluid mx-auto d-block"
                  alt="blog1"
                />
              </div>

              <div className="card">
                <div className="blog-card">
                  <div className="d-flex">
                    <img
                      src={user}
                      width="14px"
                      height="14px"
                      className="img-fluid"
                      alt="user"
                    />

                    <p className="user mb-0">Admin</p>

                    <div className="left-border"></div>

                    <img
                      src={calendar}
                      width="14px"
                      height="14px"
                      className="img-fluid"
                      alt="user"
                    />

                    <p className="user mb-0">08/11/2023</p>
                  </div>

                  <h2 className="blog-heading">
                    The Impact of Glucometers on Diabetes Self-Management
                  </h2>

                  <a className="text-decoration-none readmore" href="#">
                    Read More
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-4 blog-space">
              <div className="blog-img">
                <img
                  src={blog2}
                  width="480px"
                  height="226px"
                  className="img-fluid mx-auto d-block"
                  alt="blog1"
                />
              </div>

              <div className="card">
                <div className="blog-card">
                  <div className="d-flex">
                    <img
                      src={user}
                      width="14px"
                      height="14px"
                      className="img-fluid"
                      alt="user"
                    />

                    <p className="user mb-0">Admin</p>

                    <div className="left-border"></div>

                    <img
                      src={calendar}
                      width="14px"
                      height="14px"
                      className="img-fluid"
                      alt="user"
                    />

                    <p className="user mb-0">08/11/2023</p>
                  </div>

                  <h2 className="blog-heading">
                    Osteoarthritis and Knee Pain: What You Need To Know
                  </h2>

                  <a className="text-decoration-none readmore" href="#">
                    Read More
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-4 blog-space">
              <div className="blog-img">
                <img
                  src={blog3}
                  width="480px"
                  height="226px"
                  className="img-fluid mx-auto d-block"
                  alt="blog1"
                />
              </div>

              <div className="card">
                <div className="blog-card">
                  <div className="d-flex">
                    <img
                      src={user}
                      width="14px"
                      height="14px"
                      className="img-fluid"
                      alt="user"
                    />

                    <p className="user mb-0">Admin</p>

                    <div className="left-border"></div>

                    <img
                      src={calendar}
                      width="14px"
                      height="14px"
                      className="img-fluid"
                      alt="user"
                    />

                    <p className="user mb-0">08/11/2023</p>
                  </div>

                  <h2 className="blog-heading">
                    Best cleanser for oily and acne prone skin
                  </h2>

                  <a className="text-decoration-none readmore" href="#">
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="row m-0">
            <h2 className="customer-review">Customer Reviews</h2>
          </div>

          <div className="customers">
            <div className="row m-0">
              <Carousel
                showArrows={true}
                showStatus={false}
                showIndicators={false}
              >
                <div class="d-flex justify-content-between">
                  <div className="item mr-3">
                    <div className="card">
                      <div className="customer-card">
                        <img
                          src={quote}
                          width="19px"
                          height="17px"
                          className="img-fluid w-auto"
                          alt="quote1"
                        />

                        <p className="yellow-star">★ ★ ★ ★ ★1</p>

                        <h2 className="review-heading">Genuine Products</h2>

                        <p className="review-para">
                          My personal experience with CUREKA is amazing. It is
                          one of the most convenient way to get healthcare
                          products and their contact support helps to order
                          without any problem. Save money on good quality
                          products.
                        </p>

                        <div className="d-flex">
                          <div className="top-border align-self-center"></div>

                          <p className="name">Rahul</p>
                        </div>

                        <p className="location">Mumbai</p>
                      </div>
                    </div>
                  </div>

                  <div className="item mr-3">
                    <div className="card">
                      <div className="customer-card">
                        <img
                          src={quote}
                          width="19px"
                          height="17px"
                          className="img-fluid w-auto"
                          alt="quote1"
                        />

                        <p className="yellow-star">★ ★ ★ ★ ★</p>

                        <h2 className="review-heading">
                          Got products replaced easily
                        </h2>

                        <p className="review-para">
                          By mistake I ordered wrong size varicose vein
                          stockings. CUREKA customer service guided me in
                          returning the product and I got the correct size back.
                          Thank you CUREKA for the service and price.
                        </p>

                        <div className="d-flex">
                          <div className="top-border align-self-center"></div>

                          <p className="name">Rajasekar</p>
                        </div>

                        <p className="location">Coimbatore</p>
                      </div>
                    </div>
                  </div>

                  <div className="item mr-3">
                    <div className="card">
                      <div className="customer-card">
                        <img
                          src={quote}
                          width="19px"
                          height="17px"
                          className="img-fluid  w-auto"
                          alt="quote1"
                        />

                        <p className="yellow-star">★ ★ ★ ★ ★</p>

                        <h2 className="review-heading">
                          Good customer support
                        </h2>

                        <p className="review-para">
                          Cureka is the only online platform I have seen selling
                          baby powder products with great offers and limited
                          time free delivery.
                        </p>

                        <div className="d-flex">
                          <div className="top-border align-self-center"></div>

                          <p className="name">Sandeep Venmany</p>
                        </div>

                        <p className="location">Bangalore - Karnataka</p>
                      </div>
                    </div>
                  </div>

                  <div className="item mr-3">
                    <div className="card">
                      <div className="customer-card">
                        <img
                          src={quote}
                          width="19px"
                          height="17px"
                          className="img-fluid  w-auto"
                          alt="quote1"
                        />

                        <p className="yellow-star">★ ★ ★ ★ ★</p>

                        <h2 className="review-heading">
                          Good genuine products
                        </h2>

                        <p className="review-para">
                          Recently placed nan excella pro. Products are genuine
                          and received the product but a day delay. Apart from I
                          will try again. One thing I would like to mention here
                          the packing is really good. Good one. Thank you!.
                        </p>

                        <div className="d-flex">
                          <div className="top-border align-self-center"></div>

                          <p className="name">Mohammed Ajaas</p>
                        </div>

                        <p className="location">Tamil Nadu - Thiruvithancode</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-between">
                  <div className="item mr-3">
                    <div className="card">
                      <div className="customer-card">
                        <img
                          src={quote}
                          width="19px"
                          height="17px"
                          className="img-fluid w-auto"
                          alt="quote1"
                        />

                        <p className="yellow-star">★ ★ ★ ★ ★1</p>

                        <h2 className="review-heading">Genuine Products</h2>

                        <p className="review-para">
                          My personal experience with CUREKA is amazing. It is
                          one of the most convenient way to get healthcare
                          products and their contact support helps to order
                          without any problem. Save money on good quality
                          products.
                        </p>

                        <div className="d-flex">
                          <div className="top-border align-self-center"></div>

                          <p className="name">Rahul</p>
                        </div>

                        <p className="location">Mumbai</p>
                      </div>
                    </div>
                  </div>

                  <div className="item mr-3">
                    <div className="card">
                      <div className="customer-card">
                        <img
                          src={quote}
                          width="19px"
                          height="17px"
                          className="img-fluid w-auto"
                          alt="quote1"
                        />

                        <p className="yellow-star">★ ★ ★ ★ ★</p>

                        <h2 className="review-heading">
                          Got products replaced easily
                        </h2>

                        <p className="review-para">
                          By mistake I ordered wrong size varicose vein
                          stockings. CUREKA customer service guided me in
                          returning the product and I got the correct size back.
                          Thank you CUREKA for the service and price.
                        </p>

                        <div className="d-flex">
                          <div className="top-border align-self-center"></div>

                          <p className="name">Rajasekar</p>
                        </div>

                        <p className="location">Coimbatore</p>
                      </div>
                    </div>
                  </div>

                  <div className="item mr-3">
                    <div className="card">
                      <div className="customer-card">
                        <img
                          src={quote}
                          width="19px"
                          height="17px"
                          className="img-fluid  w-auto"
                          alt="quote1"
                        />

                        <p className="yellow-star">★ ★ ★ ★ ★</p>

                        <h2 className="review-heading">
                          Good customer support
                        </h2>

                        <p className="review-para">
                          Cureka is the only online platform I have seen selling
                          baby powder products with great offers and limited
                          time free delivery.
                        </p>

                        <div className="d-flex">
                          <div className="top-border align-self-center"></div>

                          <p className="name">Sandeep Venmany</p>
                        </div>

                        <p className="location">Bangalore - Karnataka</p>
                      </div>
                    </div>
                  </div>

                  <div className="item mr-3">
                    <div className="card">
                      <div className="customer-card">
                        <img
                          src={quote}
                          width="19px"
                          height="17px"
                          className="img-fluid  w-auto"
                          alt="quote1"
                        />

                        <p className="yellow-star">★ ★ ★ ★ ★</p>

                        <h2 className="review-heading">
                          Good genuine products
                        </h2>

                        <p className="review-para">
                          Recently placed nan excella pro. Products are genuine
                          and received the product but a day delay. Apart from I
                          will try again. One thing I would like to mention here
                          the packing is really good. Good one. Thank you!.
                        </p>

                        <div className="d-flex">
                          <div className="top-border align-self-center"></div>

                          <p className="name">Mohammed Ajaas</p>
                        </div>

                        <p className="location">Tamil Nadu - Thiruvithancode</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Carousel>
            </div>
          </div>

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
                    <img
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
                    <img
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
                    <img
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
              <div className="col-lg-6">
                <div className="healthcare-bg">
                  <h2 className="healthcare-heading">
                    Good Health Care is a Right:
                  </h2>

                  <p className="healthcare-para">
                    It doesn't matter where you live, you should have access to
                    quality healthcare. Based on this philosophy, Cureka was
                    founded in August 2014 to deliver healthcare products and
                    services at your doorstep.
                  </p>
                </div>
              </div>

              <div className="col-lg-6 top-space">
                <div className="motive-bg">
                  <h2 className="motive-heading">Our Motive:</h2>

                  <p className="motive-para">
                    Cureka is an online store that provides healthcare &
                    wellness products and services curated by doctors. These
                    products have been rigorously tested and selected as one of
                    the best in the market. Cureka does not promote products
                    from just any random manufacturer or FMCG company. Our
                    policy is to bring to you only the best products which are
                    highest value for your money and serve you well.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
