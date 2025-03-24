import Form from "react-bootstrap/Form";
import housechimney from "../public/images/house-chimney.png";
import orders from "../public/images/order1.png";
import Footer from "./Footer";
import Header from "./Header";
import Link from "next/link";

export default function Rateproduct() {
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
            <p className="section mb-0 ml-2">/ Rateproduct</p>
          </div>
        </div>

        <div className="bottom-border"></div>

        {/* <div className="container">

          <div className="row">
              <div className="col-lg-8">

                <div className="address-two">

                  <h1 className="doctors-heading">Rate Product</h1>

                  <div className="row border-bottom">

                    <div className="col-lg-12">
                    <h2 className="blog-heading mb-0">Overall rating</h2>
                      <div className="form-group">
                     
                        <div className="rate">
                          <input type="radio" id="star5" name="rate" value="5" />
                          <label for="star5" title="text">5 stars</label>
                          <input type="radio" id="star4" name="rate" value="4" />
                          <label for="star4" title="text">4 stars</label>
                          <input type="radio" id="star3" name="rate" value="3" />
                          <label for="star3" title="text">3 stars</label>
                          <input type="radio" id="star2" name="rate" value="2" />
                          <label for="star2" title="text">2 stars</label>
                          <input type="radio" id="star1" name="rate" value="1" />
                          <label for="star1" title="text">1 star</label>
                        </div>

                      </div>

                    </div>

                  </div>

                  <div className="row border-bottom">

                    <div className="col-lg-12">

                      <div className="form-group">

                        <h2 className="blog-heading">Add a headline</h2>

                        <input className="form-control" type="text" id="haedline" name="headline" placeholder="What's most important to know?" />

                      </div>

                    </div>

                  </div>

                  <div className="row">

                    <div className="col-lg-12">

                      <div className="form-group">

                        <h2 className="blog-heading">Write your review</h2>

                        <textarea style={{ height: "unset" }} className="form-control" type="text" id="address" rows="8" cols="1" name="address" placeholder="what did you like or dislike? what did you use this product for?"></textarea>

                      </div>

                    </div>

                  </div>

                  <div className="row">

                    <div className="col-lg-12 mt-3">

                      <a className="text-decoartion-none rate-btn" href="#">Submit</a>

                    </div>

                  </div>

                </div>

              </div>
          </div>
        </div> */}
        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-lg-6" id="rateproductModal">
              <div className="d-flex-column justify-content-center">
                <h1 className="new-arrivals text-center">Rating & Review</h1>

                <div className="d-lg-flex d-flex-column">
                  <div className="card align-self-center">
                    <img
                      className="img-fluid mx-auto"
                      src={orders}
                      width={73}
                      height={80}
                      alt="order1"
                    />
                  </div>

                  <div className="product-details align-self-center">
                    <h2 className="product-heading">
                      Enfamil A+ Follow Up Formula Stage 2 (6-12 Months), 400g
                    </h2>
                  </div>
                </div>

                <div>
                  <h2 className="blog-heading mt-5 mb-0">Rate this product</h2>

                  <div className="rate">
                    <input type="radio" id="star5" name="rate" value="5" />

                    <label for="star5" title="text">
                      5 stars
                    </label>

                    <input type="radio" id="star4" name="rate" value="4" />

                    <label for="star4" title="text">
                      4 stars
                    </label>

                    <input type="radio" id="star3" name="rate" value="3" />

                    <label for="star3" title="text">
                      3 stars
                    </label>

                    <input type="radio" id="star2" name="rate" value="2" />

                    <label for="star2" title="text">
                      2 stars
                    </label>

                    <input type="radio" id="star1" name="rate" value="1" />

                    <label for="star1" title="text">
                      1 star
                    </label>
                  </div>
                </div>

                <div className="review-products">
                  <div className="form-group">
                    <label className="blog-heading" for="title">
                      Title
                    </label>

                    <input
                      className="form-control"
                      type="text"
                      id="title"
                      name="title"
                      placeholder="What's most important to know?"
                    />
                  </div>

                  <div className="form-group">
                    <label className="blog-heading" for="review">
                      Review this product
                    </label>

                    <textarea
                      className="form-control"
                      style={{ height: "99px" }}
                      type="text"
                      id="review"
                      name="review"
                      rows="8"
                      col="3"
                      placeholder="What did you like or dislike?"
                    ></textarea>
                  </div>

                  <div className="submit-btn pt-3">
                    <a href="#" className="text-decoration-done rate-btn">
                      Submit
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
