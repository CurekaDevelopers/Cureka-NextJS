"use client";
import {
  faCalendar,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Rating from "@mui/material/Rating";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import "react-caroussel/dist/index.css";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useRouter } from "next/navigation";
import age1 from "../public/images/age1.png";
import age2 from "../public/images/age2.png";
import age3 from "../public/images/age3.png";
import age4 from "../public/images/age4.png";
import badge from "../public/images/badge.png";
import discount1 from "../public/images/discount1.png";
import eye from "../public/images/eye.webp";
import noproduct from "../public/images/noimageavailable.png";
import quote from "../public/images/quote.png";
import secure from "../public/images/secure.png";
import sellwithus_mobile from "../public/images/sellwithus-mobile.png";
import sellwithus from "../public/images/sellwithus.png";
import wallet from "../public/images/wallet.png";
import LikeIcon from "../public/svg-components/LikeIcon";
import CarouselSlider from "../components/CarouselSlider";
import "../styles/home.css";

import {
  addProductToCart,
  addProductToWishlist,
  deleteProductFromWishlist,
  fetchBlogsList,
  fetchBrands,
  fetchCuratedAdds,
  fetchHomePage,
  fetchMultipleAdds,
  fetchSingleAdds,
} from "../redux/action";
import { dispatch } from "../redux/store";
import { pagePaths } from "../utils/constants/constant";
import api from "../utils/api.utils";
import { apiUrls, httpCode } from "../utils/constants/api.constants";
import { generateUrl } from "../utils/constants/common.constants";
import Footer from "../views/Footer";
import Header from "../views/Header/index";
import PopupModal from "../views/Header/HomePopup";
import ScrollToTop from "../views/ScrollToTop";
import Link from "next/link";

export default function Home() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isPhone = useMediaQuery({ maxWidth: 991 });
  const { wishlistProducts, cartProducts } = useSelector(
    (state) => state.customer
  );
  const {
    brands,
    singleAdds,
    multipleAdds,
    curatedAdds: { CURATED, YOURSELF },
    healthPage,
  } = useSelector((state) => state.admin);
  // console.log("pagePaths:", pagePaths);
  // console.log("pagePaths.shopByAge:", pagePaths?.shopByAge);
  const [newArrivals, setNewArrivals] = useState([]);
  const [topArrivals, setTopArrivals] = useState([]);
  const [commonHome, setCommonHome] = useState([]);
  const [blogHome, setblogHome] = useState([]);
  const [couponHome, setCouponHome] = useState([]);
  const [popupHomeData, setPopupHomeData] = useState([]);
  const { coupons } = useSelector((state) => state.admin);
  const [blogs, setBlogs] = useState([]);
  const [latestBlog, setLatestBlog] = useState([]);
  const [modalHomePopupShow, setModalHomePopupShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useRouter();
  function brandArrayHandle(originalArray) {
    const childArrays = [];
    for (let i = 0; i < originalArray.length; i += 8) {
      childArrays.push(originalArray.slice(i, i + 8));
    }
    return childArrays;
  }
  const brandFormate = brandArrayHandle(brands);

  function decodeHtmlEntities(text) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  }

  function stripHtmlTags(text) {
    return text.replace(/<\/?[^>]+>/gi, ""); // Remove HTML tags
  }

  function replaceNbspWithSpace(text) {
    return text.replace(/&nbsp;/g, " "); // Replace non-breaking spaces with regular spaces
  }

  const decodedData = decodeHtmlEntities(
    healthPage && healthPage[1] && healthPage[1].content
  ); // Decode HTML entities
  const strippedData = stripHtmlTags(decodedData); // Remove HTML tags
  const finalText = replaceNbspWithSpace(strippedData); // Replace non-breaking spaces

  useEffect(() => {
    const query = {};
    query.pageSize = 8;
    query.page = 1;
    query.sortBy = "ranking";
    api.get(apiUrls.newtoppicks, { params: query }).then((res) => {
      if (res.status === httpCode.SUCCESS) {
        setNewArrivals(res.data?.newArrivals || []);
        setTopArrivals(res.data?.topPics || []);
      }
    }, []);
    //fetch home data
    api.get(apiUrls.gethomedata).then((res) => {
      if (res.status === httpCode.SUCCESS) {
        setCommonHome(res.data?.results.reviews || []);
        setblogHome(res.data?.results.blogs || []);
        setPopupHomeData(res.data?.results.popups || []);
      }
    });
    //fetch coupons
    api.get(apiUrls.coupons).then((res) => {
      if (res.status === httpCode.SUCCESS) {
        setCouponHome(res.data?.data || []);
      }
    });
    dispatch(fetchSingleAdds("isActive"));
    dispatch(fetchMultipleAdds("isActive"));
    dispatch(fetchCuratedAdds("isActive"));
    dispatch(fetchBrands());
    dispatch(fetchHomePage());
  }, []);
  const closeHomePopupModal = () => {
    setModalHomePopupShow(false);
  };
  useEffect(() => {
    const query = {};
    query.pageSize = 4;
    query.page = 1;

    fetchBlogsList(query).then((res) => {
      if (res?.blogs) setLatestBlog(res?.blogs);
    });
  }, []);

  const isProductPresentInWishlist = (product) =>
    !!wishlistProducts?.find?.((item) => item.product_id === product.id);

  const isProductPresentInCart = (product) =>
    !!cartProducts?.find?.((item) => item.product_id === product.id);

  const addItemToWishlist = (e, product) => {
    e.preventDefault();
    if (product.id) {
      if (!isProductPresentInWishlist(product)) {
        addProductToWishlist(product.id);
      } else {
        deleteProductFromWishlist(product.id);
      }
    }
  };

  const addItemToCart = (e, product) => {
    e.preventDefault();
    if (product.id) {
      if (isProductPresentInCart(product)) {
        navigate.push("/cart");
      } else {
        addProductToCart(product.id, 1);
      }
    }
  };

  const handleConcernsProducts = (item) => {
    //dispatch(fetchConcernsProductsForBrand({ item })); // this is function copy from concerns
    //navigate.push("/product-brands/" + item)
    // dispatch(fetchConcerns());
    window.open(`/product-brands/${item}`, "_blank");
  };

  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const chunkArrayC = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  //for coupons
  const MyCoupons = ({ citems }) => {
    // Chunk the coupons into arrays of three
    const couponChunks = chunkArrayC(citems, 3);

    return (
      <Carousel
        showArrows={false}
        showStatus={false}
        autoPlay={true}
        showThumbs={false}
      >
        {couponChunks.map((chunk, index) => (
          <div
            key={index}
            className="d-flex justify-content-between"
            id="coupons"
          >
            {chunk.map((coupon) => (
              <div key={coupon.id} className="item mr-3">
                <a className="text-decoration-none coupon-img">
                  <Image
                    src={coupon.image !== "" ? coupon.image : discount1}
                    width={480}
                    height={186}
                    className="img-fluid mx-auto d-block"
                    alt={coupon.name}
                  />
                </a>
              </div>
            ))}
          </div>
        ))}
      </Carousel>
    );
  };

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

  useEffect(() => {
    // Initialize Meta Pixel
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      // s.parentNode.insertBefore(t, s);
    })(
      window,
      document,
      "script",
      "https://connect.facebook.net/en_US/fbevents.js"
    );

    fbq("init", "2943302855966060"); // Insert Meta Pixel ID here
    fbq("track", "PageView"); // Track page views
  }, []);

  const hschema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Cureka",
    url: "https://www.frontend.cureka.com",
    mainEntity: {
      "@type": "WebPage",
      "@id": "https://www.frontend.cureka.com",
      name: "Home",
      description:
        "Cureka is one of India's leading online stores for hair, skin, nutrition products, and healthcare devices. We have a wide range of products.",
      image: {
        "@type": "ImageObject",
        url: "https://frontend.cureka.com/assets/images/logo.svg",
        width: 1200,
        height: 630,
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@id": "https://frontend.cureka.com",
              name: "Home",
            },
          },
        ],
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>Online Store for Skin, Hair & Nutrition Products - Cureka</title>

        {/* Favicon */}
        <link
          rel="icon"
          href="https://www.cureka.com/wp-content/uploads/2020/11/fav.png"
        />

        {/* Meta Tags */}
        <meta
          name="description"
          content="Cureka is one of India's leading online stores for hair, skin, nutrition products, and healthcare devices. We have a wide range of products."
        />
        <meta property="og:url" content="https://frontend.cureka.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cureka" />
        <meta
          property="og:description"
          content="Cureka is one of India's leading online stores for hair, skin, nutrition products, and healthcare devices. We have a wide range of products."
        />
        <meta
          property="og:image"
          content="https://www.cureka.com/wp-content/uploads/2020/11/fav.png"
        />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="frontend.cureka.com" />
        <meta name="twitter:title" content="Cureka" />
        <meta
          name="twitter:description"
          content="Cureka is one of India's leading online stores for hair, skin, nutrition products, and healthcare devices. We have a wide range of products."
        />
        <meta
          name="twitter:image"
          content="https://www.cureka.com/wp-content/uploads/2020/11/fav.png"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://frontend.cureka.com/" />

        {/* Google Site Verification */}
        <meta
          name="google-site-verification"
          content="djHgsaJq6QVFahLziLd9Od49uk9jIOIYezy82TdXa7E"
        />
        <meta
          name="google-site-verification"
          content="459NGAuu2htZPpDYUTS1stIyl5ZDhg8TgfZ1zz3z5Pw"
        />

        {/* Google Analytics Script */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-TG8R4ZPTTZ"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-TG8R4ZPTTZ', { 'send_page_view': false });
      `,
          }}
        />

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(hschema),
          }}
        />
      </Helmet>

      <Header />
      <div className="container">
        <div className="row home-section">
          <div className="col-lg-9 px-lg-0">
            <div id="home-carousel">
              {multipleAdds.length > 0 && (
                <Carousel
                  // showArrows={true}
                  showStatus={false}
                  showThumbs={false}
                  autoPlay={true}
                  infiniteLoop={true}
                >
                  {multipleAdds.map((MultipleAdd, i) => (
                    <div key={i}>
                      <a
                        className="text-decoration-none"
                        href={MultipleAdd.url}
                      >
                        <img
                          className="img-fluid mx-auto d-block"
                          itemID={MultipleAdd.id}
                          src={MultipleAdd.image}
                          width="880px"
                          height="284px"
                          alt="homebanner"
                        />
                        <button className="shopnow-btn">Shop now</button>
                      </a>
                      {/* <p className="legend">Legend 1</p> */}
                    </div>
                  ))}
                </Carousel>
              )}
            </div>
          </div>

          <div className="col-lg-3 d-lg-block d-none">
            {singleAdds.map((singleAdds, i) => (
              <div key={i}>
                <a className="text-decoration-none" href={singleAdds.url}>
                  <img
                    src={singleAdds.image}
                    width="320px"
                    height="284px"
                    className="img-fluid woman women-height mx-auto"
                    alt={singleAdds.url}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
        <h1 className="doctors-heading mt-2 font-weight-bold text-center">
          Cureka: India’s leading Online Healthcare Platform
        </h1>
        <div className="product-carousel">
          <div className="d-flex justify-content-between">
            <h2 className="doctors-heading mt-0">New Arrivals</h2>
            <Link
              className="text-decoration-none align-self-center"
              href={pagePaths.newArrivals}
              target="_blank"
            >
              <p className="all-deals">All Deals</p>
            </Link>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="container-fluid p-0" id="new-arrivals">
                <CarouselSlider
                  settings={{ slidesToShow: isPhone ? 2 : isMobile ? 3 : 4 }}
                >
                  {!!newArrivals?.length &&
                    newArrivals?.map((product) => {
                      let product_front_na_image =
                        product?.product_images?.length > 0
                          ? product?.product_images[0].image
                          : noproduct;

                      return (
                        <div key={product.id} className="item">
                          <div className="arrivals card mr-3">
                            <div className="d-flex flex-nowrap justify-content-between">
                              <div className="sale d-lg-block d-none">
                                {product.discount_percent > 0 ? (
                                  <p className="sale-heading">
                                    -{Number(product.discount_percent)} %
                                  </p>
                                ) : product.discount_amount !== 0 ? (
                                  <p className="sale-heading">
                                    {product.discount_amount} ₹
                                  </p>
                                ) : null}
                              </div>

                              <Link href={generateUrl(product)} target="_blank">
                                <div className="product">
                                  <img
                                    src={product_front_na_image}
                                    width="218px"
                                    height="172px"
                                    className="img-fluid"
                                    alt="Product"
                                  />
                                </div>
                              </Link>

                              <div className="cart-icons align-self-start">
                                <div className="watch position-relative">
                                  <Link
                                    href={generateUrl(product)}
                                    target="_blank"
                                  >
                                    <Image
                                      src={eye}
                                      width={10}
                                      height={10}
                                      className="d-block mx-auto eye"
                                      alt="eye"
                                    />
                                  </Link>
                                </div>

                                <button
                                  onClick={(e) => addItemToWishlist(e, product)}
                                  className="watch"
                                >
                                  <LikeIcon
                                    stroke={
                                      isProductPresentInWishlist(product)
                                        ? "red"
                                        : "#627284"
                                    }
                                    fill={
                                      isProductPresentInWishlist(product)
                                        ? "red"
                                        : "#627284"
                                    }
                                    className="d-block mx-auto eye"
                                  />
                                </button>
                              </div>
                            </div>

                            <div className="product-text">
                              <p className="product-category">
                                <Link
                                  href={`/product-category/${product?.category_slug}`}
                                  target="_blank"
                                >
                                  {product.category_name}
                                </Link>
                              </p>
                              <Link
                                href={generateUrl(product)}
                                target="_blank"
                                title={product.vendor_article_name}
                              >
                                <h3 className="product-name">
                                  {product.vendor_article_name}
                                </h3>
                              </Link>

                              <div className="rating d-lg-flex d-none">
                                <p className="rating-number">
                                  {Array.isArray(product?.product_reviews) &&
                                  product.product_reviews.length > 0
                                    ? (
                                        product.product_reviews.reduce(
                                          (acc, review) =>
                                            acc + (review.rating || 0),
                                          0
                                        ) / product.product_reviews.length
                                      ).toFixed(1)
                                    : "0"}
                                </p>
                              </div>

                              <div className="d-flex">
                                <p className="product-author d-lg-block d-none">
                                  By:
                                  <Link
                                    href={`/product-brands/${product.brand_name}`}
                                    target="_blank"
                                  >
                                    {product.brand_name}
                                  </Link>
                                </p>
                              </div>
                            </div>

                            <div className="d-lg-flex d-flex-column justify-content-between align-items-center">
                              <div className="price d-flex d-lg-block">
                                {product.mrp === product.final_price ? (
                                  <>
                                    <p className="product-price">
                                      &#8377; {product.final_price}
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <p className="discount">
                                      &#8377; {product.mrp}
                                    </p>
                                    <p className="product-price">
                                      &#8377; {product.final_price}
                                    </p>
                                  </>
                                )}
                              </div>

                              <div className="d-flex-column pb-0 pb-lg-5">
                                {product?.show_stock === 1 &&
                                product?.stock_status === "Out Stock" ? (
                                  <>
                                    <p
                                      className="text-center"
                                      style={{ color: "red" }}
                                    >
                                      Out Of Stock
                                    </p>
                                    <button
                                      className="cart"
                                      disabled
                                      style={{ opacity: 0.6 }}
                                    >
                                      <FontAwesomeIcon
                                        icon={faShoppingCart}
                                        size="lg"
                                      />
                                      Add to Cart
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    onClick={(e) => addItemToCart(e, product)}
                                    className="cart"
                                  >
                                    <FontAwesomeIcon
                                      icon={faShoppingCart}
                                      size="lg"
                                    />
                                    {isProductPresentInCart(product)
                                      ? "Checkout"
                                      : "Add to Cart"}
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </CarouselSlider>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <h2 className="doctors-heading">Curated By Our Doctors</h2>
        </div>

        {CURATED && (
          <div className="row">
            {CURATED.map((curatedAdd, i) => (
              <div className="col-lg-3 col-6 mb-3 mb-lg-0" key={i}>
                <a
                  className="text-decoration-none"
                  onClick={() => navigate.push(`/${curatedAdd?.url}`)}
                >
                  <Image
                    src={curatedAdd.image}
                    width={320}
                    height={280}
                    className="img-fluid mx-auto d-block"
                    alt="monsoon"
                  />
                </a>
              </div>
            ))}
          </div>
        )}

        <div className="row">
          <h2 className="doctors-heading">Curated by Age</h2>
        </div>

        <div className="row">
          <div className="col-lg-3 col-6">
            <Link
              className="text-decoration-none"
              href={`${pagePaths.shopByAge}?min=0&max=5`}
              target="_blank"
            >
              <Image
                src={age1}
                width={320}
                height={280}
                className="img-fluid mx-auto d-block"
                alt="monsoon"
              />
            </Link>
          </div>

          <div className="col-lg-3 col-6">
            <Link
              className="text-decoration-none"
              href={`${pagePaths.shopByAge}?min=5&max=18`}
              target="_blank"
            >
              <Image
                src={age2}
                width={320}
                height={159}
                className="img-fluid mx-auto d-block mb-3"
                alt="monsoontwo"
              />
            </Link>
          </div>

          <div className="col-lg-3 col-6">
            <Link
              className="text-decoration-none"
              href={`${pagePaths.shopByAge}?min=50&max=100`}
              target="_blank"
            >
              <Image
                src={age3}
                width={320}
                height={159}
                className="img-fluid mx-auto d-block"
                alt="monsoon"
              />
            </Link>
          </div>

          <div className="col-lg-3 col-6">
            <Link
              className="text-decoration-none"
              href={`${pagePaths.shopByAge}?min=50&max=100`}
              target="_blank"
            >
              <Image
                src={age4}
                width={320}
                height={159}
                className="img-fluid mx-auto d-block mb-3"
                alt="monsoontwo"
              />
            </Link>
          </div>
        </div>

        <div className="discounts">
          <div className="row">
            <div className="col-lg-12">
              <div id="discounts-carousel">
                <MyCoupons citems={couponHome} />
              </div>
            </div>
          </div>
        </div>

        <div className="product-carousel">
          <div className="d-flex justify-content-between">
            <h2 className="doctors-heading mt-0">Top Picks</h2>
            <Link
              className="text-decoration-none align-self-center"
              href="/top-picks"
              target="_blank"
            >
              <p className="all-deals">All Deals</p>
            </Link>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="container-fluid p-0" id="new-arrivals">
                <CarouselSlider
                  settings={{ slidesToShow: isPhone ? 2 : isMobile ? 3 : 4 }}
                >
                  {!!topArrivals?.length &&
                    topArrivals?.map((product) => {
                      let product_front_na_image =
                        product?.product_images?.length > 0
                          ? product?.product_images[0].image
                          : noproduct;

                      return (
                        <div key={product.id} className="item">
                          <div className="arrivals card mr-3">
                            <div className="d-flex flex-nowrap justify-content-between">
                              <div className="sale d-lg-block d-none">
                                {product.discount_percent > 0 ? (
                                  <p className="sale-heading">
                                    -{Number(product.discount_percent)} %
                                  </p>
                                ) : product.discount_amount !== 0 ? (
                                  <p className="sale-heading">
                                    {product.discount_amount} ₹
                                  </p>
                                ) : null}
                              </div>

                              <Link
                                href={generateUrl(product)}
                                key={product.id}
                                target="_blank"
                              >
                                <div className="product">
                                  <img
                                    src={product_front_na_image}
                                    width="218px"
                                    height="172px"
                                    className="img-fluid"
                                    alt="Product"
                                  />
                                </div>
                              </Link>

                              <div className="cart-icons align-self-start">
                                <div className="watch position-relative">
                                  <Link
                                    href={generateUrl(product)}
                                    target="_blank"
                                  >
                                    <Image
                                      src={eye}
                                      width={10}
                                      height={10}
                                      className="d-block mx-auto eye"
                                      alt="eye"
                                    />
                                  </Link>
                                </div>

                                <button
                                  onClick={(e) => addItemToWishlist(e, product)}
                                  className="watch"
                                >
                                  <LikeIcon
                                    stroke={
                                      isProductPresentInWishlist(product)
                                        ? "red"
                                        : "#627284"
                                    }
                                    fill={
                                      isProductPresentInWishlist(product)
                                        ? "red"
                                        : "#627284"
                                    }
                                    className="d-block mx-auto eye"
                                  />
                                </button>
                              </div>
                            </div>

                            <div className="product-text">
                              <p className="product-category">
                                <Link
                                  href={`/product-category/${product?.category_slug}`}
                                  target="_blank"
                                >
                                  {product.category_name}
                                </Link>
                              </p>
                              <Link
                                href={generateUrl(product)}
                                target="_blank"
                                title={product.vendor_article_name}
                              >
                                <h3 className="product-name">
                                  {product.vendor_article_name}
                                </h3>
                              </Link>

                              <div className="rating d-lg-flex d-none">
                                <p className="rating-number">
                                  {Array.isArray(product?.product_reviews) &&
                                  product.product_reviews.length > 0
                                    ? (
                                        product.product_reviews.reduce(
                                          (acc, review) =>
                                            acc + (review.rating || 0),
                                          0
                                        ) / product.product_reviews.length
                                      ).toFixed(1)
                                    : "0"}
                                </p>
                              </div>

                              <div className="d-flex">
                                <p className="product-author d-lg-block d-none">
                                  By:
                                  <Link
                                    href={`/product-brands/${product.brand_name}`}
                                    target="_blank"
                                  >
                                    {product.brand_name}
                                  </Link>
                                </p>
                              </div>
                            </div>

                            <div className="d-lg-flex d-flex-column justify-content-between align-items-center">
                              <div className="price d-flex d-lg-block">
                                {product.mrp === product.final_price ? (
                                  <>
                                    <p className="product-price">
                                      &#8377; {product.final_price}
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <p className="discount">
                                      &#8377; {product.mrp}
                                    </p>
                                    <p className="product-price">
                                      &#8377; {product.final_price}
                                    </p>
                                  </>
                                )}
                              </div>

                              <div className="d-flex-column pb-0 pb-lg-5">
                                {product?.show_stock === 1 &&
                                product?.stock_status === "Out Stock" ? (
                                  <>
                                    <p
                                      className="text-center"
                                      style={{ color: "red" }}
                                    >
                                      Out Of Stock
                                    </p>
                                    <button
                                      className="cart"
                                      disabled
                                      style={{ opacity: 0.6 }}
                                    >
                                      <FontAwesomeIcon
                                        icon={faShoppingCart}
                                        size="lg"
                                      />
                                      Add to Cart
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    onClick={(e) => addItemToCart(e, product)}
                                    className="cart"
                                  >
                                    <FontAwesomeIcon
                                      icon={faShoppingCart}
                                      size="lg"
                                    />
                                    {isProductPresentInCart(product)
                                      ? "Checkout"
                                      : "Add to Cart"}
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </CarouselSlider>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <h2 className="doctors-heading">Tell Us About Your Selves</h2>

          {YOURSELF && (
            <div className="row">
              {YOURSELF.map((yourself, i) => (
                <div
                  className={i > 3 ? "col-lg-4 col-6" : "col-lg-4 col-6"}
                  key={i}
                >
                  <Link className="text-decoration-none" href={yourself.url}>
                    <img
                      src={yourself.image}
                      width="480px"
                      height="260px"
                      className="img-fluid mx-auto d-block mb-3"
                      alt={yourself.url}
                    />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="brands mt-0">
          <div className="row">
            <h2 className="doctors-heading mt-4">
              Shop All {brands ? brands.length : 0} Brands
            </h2>
          </div>

          <div className="row" id="topbrands">
            <div className="col-lg-12">
              <CarouselSlider
                settings={{ slidesToShow: isMobile ? 2 : isPhone ? 3 : 6 }}
              >
                {!!brands?.length &&
                  brands?.map((brandformat, index) => (
                    <div key={brandformat.id}>
                      <div className="item mr-3" key={index}>
                        <p
                          style={{
                            width: "180px",
                            height: "180px",
                            cursor: "pointer",
                          }}
                          className="text-decoration-none"
                          href="/"
                          onClick={() =>
                            handleConcernsProducts(brandformat.name)
                          }
                        >
                          <img
                            src={brandformat.image}
                            width="180px"
                            height="180px"
                            className="img-fluid brand_img"
                            alt="brand2"
                          />
                        </p>
                      </div>
                    </div>
                  ))}
              </CarouselSlider>
            </div>
          </div>
        </div>

        <div className="sellwithus">
          <a className="text-decoration-none" href="/sellwithus">
            <picture>
              <source media="(max-width: 767px)" srcSet={sellwithus_mobile} />
              <Image
                src={sellwithus}
                width={1280}
                height={228}
                className="img-fluid d-block mx-auto desktop-image"
                alt="sellwithus"
              />
            </picture>
          </a>
        </div>

        <div className="d-flex justify-content-between">
          <h3 className="doctors-heading">Our Recent Blog</h3>
          <a
            className="text-decoration-none align-self-center"
            href="blogs"
            target="_blank"
          >
            <p className="view-all">View All</p>
          </a>
        </div>

        <div id="blog-card">
          <CarouselSlider
            settings={{ slidesToShow: isMobile ? 1 : isPhone ? 2 : 3 }}
          >
            {blogHome?.length &&
              blogHome?.map((blog, blogIndex) => (
                <div
                  key={blogIndex}
                  className="d-lg-flex justify-content-between"
                >
                  <div key={blogIndex} className="item mr-3">
                    <Link
                      href={`/blogs/${blog.url}`}
                      key={blog.id}
                      className="text-decoration-none banner-container"
                    >
                      <div className="blog-img">
                        <img
                          src={blog.thumbnail_image}
                          width="480px"
                          height="226px"
                          className="img-fluid"
                          alt="blog1"
                        />
                        <div>
                          <div className="blog-card pb-0">
                            <div className="d-flex">
                              <FontAwesomeIcon
                                style={{
                                  color: "gray",
                                  width: "14px",
                                  height: "14px",
                                }}
                                icon={faUser}
                                className="mr-2"
                                size="lg"
                              />
                              <p className="user mb-0">Admin</p>
                              <div className="left-border"></div>
                              <FontAwesomeIcon
                                style={{
                                  color: "gray",
                                  width: "14px",
                                  height: "14px",
                                }}
                                icon={faCalendar}
                                className="mr-2"
                                size="lg"
                              />
                              <p className="user mb-0">
                                {dayjs(blog.blog_date).format("DD MMMM, YYYY")}
                              </p>
                            </div>
                            <h4 className="blog-heading text-left">
                              {blog.title}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
          </CarouselSlider>
        </div>

        {/* <MyBlogCarousel bitems={blogHome} /> */}

        <div className="row">
          <h3 className="doctors-heading">Customer Reviews</h3>
        </div>

        <div className="customers">
          {/* <MyCarousel items={commonHome} /> */}
          <div id="customers-carousel">
            <CarouselSlider
              settings={{ slidesToShow: isMobile ? 1 : isPhone ? 2 : 4 }}
            >
              {commonHome?.length &&
                commonHome?.map((homedata, itemIndex) => (
                  <div
                    key={homedata.productid}
                    className="d-lg-flex justify-content-between"
                  >
                    <div key={itemIndex} className="item mr-3">
                      <div className="card">
                        <div className="customer-card">
                          <Image
                            src={quote}
                            width={19}
                            height={17}
                            className="img-fluid w-auto"
                            alt="quote1"
                          />
                          <div className="d-flex">
                            <Rating
                              readOnly
                              name="simple-controlled"
                              value={homedata.rating}
                            />
                            <p className="reviewrating align-self-center">
                              {homedata.rating}
                            </p>
                          </div>
                          <p className="review-heading">{homedata.title}</p>
                          <p className="review-para">{homedata.comments}</p>
                          <div className="d-flex">
                            <div className="top-border align-self-end"></div>
                            {homedata.created_by
                              ? homedata.created_by.replace(" null", "")
                              : ""}
                          </div>
                          {/* {console.log(homedata,'homedata')} */}
                          {/* <p className="location">Mumbai</p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </CarouselSlider>
          </div>
        </div>

        <div className="whoarewe">
          <h3 className="doctors-heading mt-0">Who Are We?</h3>

          <p className="whoarewe-para">
            Cureka is your boutique healthcare products & services platform
            started by a team of expert surgeons, well known in the field of
            Cosmetic Dermatology and Orthopedic Surgeries. All products on
            Cureka are curated by doctors and recommended for leading a healthy
            lifestyle.
          </p>

          <div className="row whoare-badge">
            <div className="col-lg-4">
              <div className="card">
                <div className="card-space">
                  <Image
                    className="img-fluid mx-auto d-block"
                    width={50}
                    height={50}
                    src={badge}
                    alt="badge"
                  />

                  <p className="badge-heading">Curated by Doctors</p>

                  <p className="badge-para">
                    All products displayed on Cureka are procured from verified
                    and licensed manufacturers and FMCGs.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 top-space">
              <div className="card">
                <div className="card-space">
                  <Image
                    className="img-fluid mx-auto d-block"
                    width={50}
                    height={50}
                    src={secure}
                    alt="badge"
                  />

                  <p className="badge-heading">Secure</p>

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
                    width={50}
                    height={50}
                    src={wallet}
                    alt="badge"
                  />

                  <p className="badge-heading">Affordable</p>

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
            <div className="col-lg-6 align-self-center mb-3 mb-lg-0">
              <h3 className="healthcare-heading">
                {/* Good Health Care 
                      
                      <br/>
                      is a Right: */}
                {healthPage && healthPage[0] && healthPage[0].heading}:
              </h3>
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
                alt="healthcarebg"
              />
            </div>
          </div>

          <div className="row mt-lg-5 mt-3">
            <div className="col-lg-6">
              <img
                className="img-fluid mx-auto d-block"
                src={healthPage && healthPage[1] && healthPage[1].image}
                alt="motivebg"
              />
            </div>
            <div className="col-lg-6 mt-lg-0 mt-3 align-self-center">
              <h3 className="motive-heading">
                {healthPage && healthPage[1] && healthPage[1].heading}:
              </h3>
              {/* {healthPage && healthPage[1] && healthPage[1].content.
              // replace(/<\/?p>/g, '')
              
              replace(/<\/?[^>]+>/gi, '')
              

              } */}
              {finalText}
              <p className="motive-para"></p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <div className="">
        <ScrollToTop isVisible={isVisible} />
      </div>
      {popupHomeData && popupHomeData.length > 0 && (
        <PopupModal
          show={modalHomePopupShow}
          onHide={closeHomePopupModal}
          popupData={popupHomeData}
        />
      )}
    </>
  );
}
