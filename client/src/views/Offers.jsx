import _ from "lodash";
import { useEffect, useState } from "react";
import "react-caroussel/dist/index.css";
import { Helmet } from 'react-helmet-async';
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import housechimney from "../assets/images/house-chimney.png";
import "../css/offers.css";
import { fetchCoupons, fetchMultipleAdds } from "../redux/action";
import { pagePaths } from "../routes/constant";

import noimage from "../assets/images/noimageavailable.png";
import ScrollToTop from './ScrollToTop';




import Footer from "./Footer";
import Header from "./Header";
const loadMoreLimit = 10;

export default function Offers() {
  const dispatch = useDispatch();
  const { coupons } = useSelector((state) => state.admin);
  const [localStateCoupons, setLocalStateCoupons] = useState([]);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const { multipleAdds, curatedAdds: { CURATED, YOURSELF } } = useSelector((state) => state.admin);
  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    dispatch(fetchCoupons());
    dispatch(fetchMultipleAdds("isActive"));
  }, [dispatch]);

  useEffect(() => {
    if (!_.isEmpty(coupons)) {
      const first = coupons.slice(0, loadMoreLimit);
      setLocalStateCoupons(first);
      setShowLoadMore(coupons.length > loadMoreLimit);
    }
  }, [coupons]);

  const loadMoreReviews = () => {
    setLocalStateCoupons(coupons);
    setShowLoadMore(false);
  };

  const copyToClipboard = (couponCode) => {
    navigator.clipboard.writeText(couponCode);
    toast.success("Coupon code copied successfully");
  };
  const handleScroll = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <>
      <Helmet>
        <title>Offers - Cureka - Online Health Care Products Shop</title>
        <meta name="description" content="Offers - Cureka is one of the leading online healthcare store dealing with the best in class home health careproducts" />
        <link rel="canonical" href={window.location.href} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cureka" />
        <meta property="og:description" content="Offers - Cureka is one of the leading online healthcare store dealing with the best in class home health careproducts" />
        <meta property="og:image" content="https://frontend.cureka.com/src/assets/images/logo.svg" />


      </Helmet>
      {/* <h1 style={{ display: 'none' }}>Cureka Offers & Coupon Codes</h1> */}
      <div>
        <Header />

        <div className="container-fluid px-0">
          <div className="container">
            <div className="d-flex home-back-section">
              <Link to={pagePaths.home}>
                <img
                  className="img-fluid d-flex align-self-center"
                  src={housechimney}
                  width="16px"
                  height="16px"
                  alt="home-icon"
                />
              </Link>

              <p className="section mb-0 ml-3">/ &nbsp;&nbsp;&nbsp;Offers</p>
            </div>
          </div>

          <div className="bottom-border"></div>

          <div className="container">
            <h1 className="privacy-heading mb-2">Cureka Offers & Coupon Codes</h1>

            <div className="offers m-0" id="offerspage">
              <div className="row home-section">
                <div className="col-lg-12">
                  <div id="home-carousel">
                    {multipleAdds.length > 0 && <Carousel
                      showArrows={true}
                      showStatus={false}
                      showThumbs={false}
                      autoPlay={true}
                      infiniteLoop={true}
                    >
                      {multipleAdds.map((MultipleAdd, i) =>
                        <div key={i}>
                          <a className="text-decoration-none" href={MultipleAdd.url}>
                            <img
                              className="img-fluid mx-auto d-block" style={{ width: "100%" }}
                              itemID={MultipleAdd.id}
                              src={MultipleAdd.image}
                              width="880px"
                              height="284px"
                              alt="homebanner"
                            />
                          </a>
                          {/* <p className="legend">Legend 1</p> */}
                        </div>
                      )}
                    </Carousel>}
                  </div>
                </div>

              </div>

              <h2 className="all-offers mt-3">All Offers</h2>

              <div className="row">
                {localStateCoupons.map((coupon, i) =>
                  <div className="col-lg-4 mb-4" key={i}>
                    <div className="card-image">
                      <div className="d-flex">
                        <div className="discount-img">
                          <img
                            className="img-fluid dis-img"
                            src={coupon.image ? coupon.image : noimage}
                            width="97px"
                            height="97px"
                            alt="offercardone"
                          />
                        </div>

                        <div className="discount-text d-flex align-self-center">
                          <p className="discount-paraone">{coupon.description}</p>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between">
                        <div className="bottom-code">
                          <p className="code">
                            Code:<span className="codewell">{coupon.coupon_code}</span>
                          </p>
                        </div>

                        <div className="top-code">
                          <p className="copycode" onClick={() => copyToClipboard(coupon.coupon_code)}>Copy Code</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="load">
                {showLoadMore && <a className="text-decoration-none readmore" onClick={loadMoreReviews}>Load more</a>}
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <div className="">
          <ScrollToTop isVisible={isVisible} />
        </div>
      </div >
    </>
  );
}