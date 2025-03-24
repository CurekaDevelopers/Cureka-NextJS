"use client";
import { faGem, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Rating from "@mui/material/Rating";
import _ from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "react-caroussel/dist/index.css";
import { Helmet } from "react-helmet-async";
import ReactImageMagnify from "react-image-magnify";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useParams } from "react-router-dom";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PopupModal from "../../../views/Header/HomePopup";
import cash from "../../../public/images/cash.svg";
import curated from "../../../public/images/curated.svg";
import eye from "../../../public/images/eye.webp";
import houseChimney from "../../../public/images/house-chimney.png";
import map from "../../../public/images/map.svg";
import noproduct from "../../../public/images/noimageavailable.png";
import copydata from "../../../public/images/productCopy.svg";
import mail from "../../../public/images/productEmail.svg";
import facebook from "../../../public/images/productfacebook.svg";
import linkedin from "../../../public/images/productlinkedin.svg";
import share from "../../../public/images/productshare.svg";
import Return from "../../../public/images/return.svg";
import twitter from "../../../public/images/twitter.svg";
import whatsapp from "../../../public/images/whatsapp.svg";
import LikeIcon from "../../../public/svg-components/LikeIcon";
import CarouselSlider from "../../../components/CarouselSlider";
import "../../../styles/product_details.css";
import {
  addProductToCart,
  addProductToWishlist,
  deleteProductFromWishlist,
  fetchProductBySlug,
  getpossibleDeliveryData,
} from "../../../redux/action";
import { pagePaths } from "../../../utils/constants/constant";
import api from "../../../utils/api.utils";
import { addDays, zipCodePattern } from "../../../utils/common.utils";
import { apiUrls, httpCode } from "../../../utils/constants/api.constants";
import { generateUrl } from "../../../utils/constants/common.constants";
import Footer from "../../../views/Footer";
import ProductdetailHeader from "../../../views/ProductDetailHeader";
import { userRouter } from "next/navigation";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import toast from "react-hot-toast";
import ScrollToTop from "../../../views/ScrollToTop";
// import hmac from "hmac"
// import CryptoJS from "crypto-js";
import Image from "next/image";

export default function Productdetails() {
  const [newArrivals, setNewArrivals] = useState([]);
  const pathname = usePathname();
  const params = pathname.split("/").filter(Boolean);
  const productSlug = params[params.length - 1];
  console.log("productSlug", productSlug);

  const navigate = useRouter();
  // const productSlug = params?.productSlug; // ✅ Safely access slug
  // if (!productSlug) return <div>Loading...</div>;
  const { wishlistProducts, cartProducts } = useSelector(
    (state) => state.customer
  );
  const [key, setKey] = useState("details");
  const [product, setProduct] = useState();
  const [selectedImage, setSelectedImage] = useState("");
  const [possibleDeliveryData, setPossibleDeliveryData] = useState("");
  const [pinCode, setPinCode] = useState("");
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [removedProductReview, setRemovedProductReview] = useState([]);
  const [modalProductPopupShow, setmodalProductPopupShow] = useState(false);
  const [openShippingCharges, setIsOpenShippingCharges] = useState(false);
  const openShippingChargesModal = () =>
    setIsOpenShippingCharges(!openShippingCharges);
  const closeShippingChargesModal = () => setIsOpenShippingCharges(false);
  const [isVisible, setIsVisible] = useState(false);
  const [shiprocketToken, setShiprocketToken] = useState("");

  const fullUrl = window.location.href; // Get the full URL of the current page
  // console.log('Current URL:', fullUrl);

  const productUrl = fullUrl;
  const productName = "Product Details";

  const shareViaWhatsApp = () => {
    const message = `${productUrl}`;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://api.whatsapp.com/send?text=${encodedMessage}`;
    window.open(url, "_blank");
  };

  const shareContent = () => {
    const message = `${productUrl}`;
    if (navigator.share) {
      navigator
        .share({
          title: productName,
          text: message,
          url: productUrl,
        })
        .then(() => {
          console.log("Share successful");
        })
        .catch((error) => {
          console.error("Share failed:", error);
          shareViaWhatsApp(); // Fallback
        });
    } else {
      console.log("Web Share API not supported");
      shareViaWhatsApp(); // Fallback
    }
  };

  const shareViaEmail = () => {
    const url = `mailto:?subject=Check out this product&body=${encodeURIComponent(
      `${productUrl}`
    )}`;
    window.open(url, "_blank");
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(productUrl)
      .then(() => {
        // alert("Product URL copied to clipboard!");
        toast.success("Product URL copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  const shareViaFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      productUrl
    )}`;
    window.open(url, "_blank");
  };

  const shareViaLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      productUrl
    )}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const shareViaTwitter = () => {
    const text = `${productUrl}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  useEffect(() => {
    fetchProductBySlug(productSlug).then((blogRes) => {
      if (blogRes) {
        const { product_reviews } = blogRes;
        if (product_reviews && product_reviews.length > 10) {
          const removedProductReviewCopy = product_reviews.slice(
            10,
            product_reviews.length
          );
          product_reviews.splice(10, product_reviews.length);
          setRemovedProductReview(removedProductReviewCopy);
        }
        setProduct(blogRes);
      }
    });
  }, [productSlug]);

  const isProductPresentInWishlist = (product) =>
    !!wishlistProducts?.find?.((item) => item.product_id === product.id);

  const isProductPresentInCart = (product) =>
    !!cartProducts?.find?.((item) => item.product_id === product.id);

  const addItemToCart = (e, product, quantity = 1) => {
    e.preventDefault();
    if (product.id) {
      //if (isProductPresentInCart(product)) {
      //navigate.push("/cart");
      //} else {
      addProductToCart(product.id, quantity);
      //}
    }
  };
  const { accessToken } = useSelector((state) => state.auth);
  const [activeKey, setActiveKey] = useState(null);

  // Toggle the active key for each accordion item
  const handleToggle = (key) => {
    setActiveKey(activeKey === key ? null : key);
  };

  const [timestamp, setTimestamp] = useState("");

  // Function to get the current timestamp in ISO format with 'Z' suffix
  const getCurrentTimestamp = () => {
    const now = new Date();
    return now.toISOString(); // Returns the ISO string with 'Z' suffix for UTC
  };

  // Use useEffect to update the timestamp when the component mounts
  useEffect(() => {
    const currentTimestamp = getCurrentTimestamp();
    setTimestamp(currentTimestamp);
  }, []); // Empty dependency array ensures this runs once when component mounts

  const calculate_hmac_sha256_as_base64 = (key, content) => {
    // const hmac_bytes = hmac.new(key.encode(), content.encode(), hashlib.sha256).digest();
    // const calculated_hmac_str = base64.b64encode(hmac_bytes).decode()
    // const hmac = CryptoJS.HmacSHA256(content, key).toString(CryptoJS.enc.Hex);
    // console.log(hmac, 'hmac')
    // const calculated_hmac_base64 = hmac.toString(CryptoJS.enc.Base64);
    // Generate the HMAC using CryptoJS
    // const hmac = CryptoJS.HmacSHA256(content, key);
    // console.log(hmac, "hmac");
    // // Convert the HMAC to base64 format
    // const calculated_hmac_base64 = CryptoJS.enc.Base64.stringify(hmac);
    // console.log(calculated_hmac_base64, "calculated_hmac_base64");
    // return calculated_hmac_base64;
  };

  const addBuynow = async (event, product, quantity = 1) => {
    const variant_id = product.product_id.toString();
    const data = {
      cart_data: {
        items: [
          {
            variant_id: variant_id,
            quantity: quantity,
          },
        ],
      },
      redirect_url: "http://frontend.cureka.com/faster-order",
      timestamp: timestamp,
    };

    const key = "AVaEd0C6xJsgW5PYdL5WPkbSh8GHHE9b";
    const payload = JSON.stringify(data);
    // const hmac = CryptoJS.HmacSHA256(payload, key).toString(
    //   CryptoJS.enc.Base64
    // );
    // console.log(payload, 'payload')
    try {
      const response = await axios.post(
        "https://checkout-api.shiprocket.com/api/v1/access-token/checkout",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "1OXaKLiBm7r3OVKI",
            "X-Api-HMAC-SHA256": hmac,
          },
        }
      );
      console.log(response.data.result.token, "response");
      // shiprocketToken = response.data.result.token
      const token = response.data.result.token;
      setShiprocketToken(token);
      if (window.HeadlessCheckout) {
        // Assuming addToCart accepts product data and token
        window.HeadlessCheckout.addToCart(event, token);
      } else {
        console.error("HeadlessCheckout is not available.");
      }
    } catch (error) {
      console.error("shiprocket error:", error);
      // toast.error('Something went to wrong');
    }
  };

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

  const allProductImages = _.get(product, "images", []);
  // to show the images on product details api
  useEffect(() => {
    if (allProductImages.length > 0) {
      setSelectedImage(allProductImages[0]);
    } else {
      setSelectedImage(noproduct);
    }
  }, [allProductImages]);

  useEffect(() => {
    if (product?.category_id) {
      const query = {};
      query.pageSize = 8;
      query.page = 1;
      query.sortBy = "created_at";
      query.category_id = product?.category_id;
      api.get(apiUrls.relatedProducts, { params: query }).then((res) => {
        if (res.status === httpCode.SUCCESS) {
          setNewArrivals(res.data?.products || []);
        }
      });
    }
  }, [product?.category_id]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  /*const allProductImages = [
    product?.back_image,
    product?.side_image,
    product?.detail_angle,
    product?.look_shot_image,
    product?.additional_image_1,
    product?.additional_image_2,
  ];*/
  const [quantity, setQuantity] = useState(1);
  const [inputValue, setInputValue] = useState("1");

  const handleQuantityChange = (e) => {
    const enteredValue = e.target.value;
    setInputValue(enteredValue); // Update the input value state

    const parsedValue = parseInt(enteredValue); // Parse the entered value
    const minQuantity =
      product.min_order_quantity > 0 ? product.min_order_quantity : 1;
    // const maxQuantity = (product.max_order_quantity > 0) ? product.max_order_quantity : 20; // Example maximum value
    const maxQuantity = 20;
    if (
      !isNaN(parsedValue) &&
      parsedValue >= minQuantity &&
      parsedValue <= maxQuantity
    ) {
      // If entered value is a valid number within the allowed range
      setQuantity(parsedValue);
    }
  };
  const increaseQuantity = () => {
    if (quantity < 20) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleBlur = () => {
    // Reset to valid quantity if the input value is invalid on blur
    setInputValue(quantity.toString());
  };
  const handlePinCode = () => {
    // Validation: Check if pincode is empty or invalid
    if (!pinCode || !/^\d{6}$/.test(pinCode)) {
      toast.error(
        "Please enter a valid 6-digit pincode containing only numbers."
      );
      return;
    }
    const zipCodes =
      product.packer_name_and_address_with_pincode.match(zipCodePattern);
    const request = {
      pickup_postcode: zipCodes[0],
      delivery_postcode: pinCode,
      weight: product.weight_kg,
      cod: 1, // TODO
    };
    getpossibleDeliveryData(request).then((rep) => {
      if (rep) {
        const obj = {
          date: addDays(rep.estimated_delivery_days),
          shipping: "Shippping Charges",
        };
        setPossibleDeliveryData(obj);
      }
    });
  };

  const slidesToShow = useMemo(() => {
    return allProductImages?.length > 3 ? 3 : allProductImages?.length;
  }, [allProductImages?.length]);

  const loadMoreReviews = () => {
    const productCopy = _.cloneDeep(product);
    const addRemovedItems = [
      ...productCopy.product_reviews,
      ...removedProductReview,
    ];
    productCopy.product_reviews = addRemovedItems;
    setProduct(productCopy);
    setRemovedProductReview([]);
  };
  const closeCartegoryPopupModal = () => {
    setmodalProductPopupShow(false);
  };
  const videoRef = useRef(null);

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

  // Function to load external scripts dynamically
  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    // Load external CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      // "https://customcheckoutfastrr.netlify.app/assets/styles/shopify.css?v=123";
      "https://checkout-ui.shiprocket.com/assets/styles/shopify.css";
    document.head.appendChild(link);

    // Load external JavaScript
    loadScript(
      // "https://customcheckoutfastrr.netlify.app/assets/js/channels/shopify.js"
      "https://checkout-ui.shiprocket.com/assets/js/channels/shopify.js"
    )
      .then(() => {
        // Script loaded successfully, set up event listeners
        const button = document.getElementById("buyNow");
        if (button) {
          button.addEventListener("click", handleButtonClick);
        }
      })
      .catch((error) => console.error(error));

    // Clean up on component unmount
    return () => {
      const button = document.getElementById("buyNow");
      if (button) {
        button.removeEventListener("click", handleButtonClick);
      }
    };
  }, []);

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product?.vendor_article_name,
    image: product?.images,
    description: product?.meta_description,
    sku: product?.sku_code,
    mpn: product?.vendor_sku_code,
    brand: {
      "@type": "Brand",
      name: product?.brand_name,
    },
    offers: {
      "@type": "Offer",
      url: window.location.href,
      priceCurrency: "INR",
      price: product?.final_price,
      itemCondition: "https://schema.org/NewCondition",
      availability:
        product?.stock_status == "In stock"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Cureka",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product?.ratingCount.average,
      reviewCount: product?.ratingCount.totalReviews,
    },
    review: product?.product_reviews?.map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.created_by,
      },
      datePublished: review.created_at,
      description: review.title,
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
      },
    })),
  };

  // State to track when to scroll to the Review section
  const [scrollToReview, setScrollToReview] = useState(false);

  // Function to handle opening and scrolling to the "Review" tab
  const handleOpenReviewTab = () => {
    setKey("reviews"); // Set active tab to "Review"
    setScrollToReview(true); // Set flag to scroll after tab is switched
  };

  // Effect to handle smooth scroll after the tab is switched to "Review"
  useEffect(() => {
    if (scrollToReview && key == "reviews") {
      const reviewTabElement = document.getElementById("reviews");
      if (reviewTabElement) {
        reviewTabElement.scrollIntoView({ behavior: "smooth" });
      }
      setScrollToReview(false); // Reset the flag after scrolling
    }
  }, [scrollToReview, key]); // Dependency on scrollToReview and key to trigger the scroll
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const stripHtmlTags = (html) => {
    if (typeof html !== "string") return ""; // Ensure html is a string

    // Check if the string contains HTML tags
    const hasHtmlTags = /<\/?[^>]+(>|$)/.test(html);

    // If there are no HTML tags, return the original string
    return hasHtmlTags ? html.replace(/<\/?[^>]+(>|$)/g, "") : html;
  };
  return (
    <>
      <Helmet>
        <title>
          {product?.meta_title == "null"
            ? product?.vendor_article_name
            : product?.meta_title}
        </title>
        <meta
          name="title"
          content={
            product?.meta_title == "null"
              ? product?.vendor_article_name
              : product?.meta_title
          }
        />
        <meta name="description" content={product?.meta_description} />
        <link rel="canonical" href={window.location.href} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cureka" />
        <meta property="og:description" content={product?.meta_description} />
        <meta
          property="og:image"
          content="https://frontend.cureka.com/src/assets/images/logo.svg"
        />
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
      </Helmet>
      <ProductdetailHeader />
      {product && (
        <div className="container-fluid px-0 navbar-margin">
          <div className="container">
            <div className="d-flex home-back-section">
              <a href={pagePaths.home}>
                <Image
                  className="img-fluid d-block"
                  src={houseChimney}
                  width={16}
                  height={16}
                  alt="home-icon"
                />
              </a>

              <p className="section mb-0 ml-2">
                {/* / Shop / {product.category_slug} / {product.vendor_article_name} */}
                <Link
                  className="section"
                  href={`/product-category/${product?.category_slug}`}
                  target="_blank"
                >
                  {`/ Shop / ${capitalizeFirstLetter(product.category_name)}`}
                </Link>
                {product.sub_category_slug &&
                  product.sub_category_slug != "null" && (
                    <Link
                      href={`/product-category/${capitalizeFirstLetter(
                        product?.category_slug
                      )} /${capitalizeFirstLetter(product?.sub_category_slug)}`}
                      className="section"
                      target="_blank"
                    >
                      {` / ${capitalizeFirstLetter(
                        product.sub_category_name
                      )} `}
                    </Link>
                  )}
                {product.sub_sub_category_slug &&
                  product.sub_sub_category_slug != "null" && (
                    <a
                      href={`/product-category/${capitalizeFirstLetter(
                        product?.category_slug
                      )}/${capitalizeFirstLetter(
                        product?.sub_category_slug
                      )}/${capitalizeFirstLetter(
                        product?.sub_sub_category_slug
                      )}`}
                      className="section"
                      target="_blank"
                    >
                      {` / ${capitalizeFirstLetter(
                        product.sub_sub_category_name
                      )}`}
                    </a>
                  )}

                <Link href={generateUrl(product)} className="section">
                  {`/ ${capitalizeFirstLetter(product.vendor_article_name)}`}
                </Link>
              </p>
            </div>
          </div>

          <div className="bottom-border"></div>

          <div className="container">
            <div
              className="row d-flex-column d-lg-flex position-relative"
              style={{ overflow: "visible" }}
            >
              <div
                className="col-lg-4 mt-3 position-sticky"
                style={{ top: "300px", zIndex: "1" }}
              >
                <div className="product-img">
                  <ReactImageMagnify
                    style={{ position: "absolute", zIndex: 9999 }}
                    {...{
                      smallImage: {
                        alt: "Wristwatch by Ted Baker London",
                        isFluidWidth: true,
                        src: selectedImage,
                      },
                      largeImage: {
                        src: selectedImage,
                        width: 1100,
                        height: 1800,
                      },
                      cursorOffsetX: 10,
                    }}
                  />
                </div>

                <div className="" id="product-details">
                  {slidesToShow < 3 ? (
                    <>
                      {allProductImages.map((src) => {
                        if (!src) {
                          return null;
                        }
                        return (
                          <div
                            key={src}
                            className="item cursor-pointer"
                            onClick={() => setSelectedImage(src)}
                          >
                            <img
                              src={src}
                              width="100px"
                              height="101px"
                              className="img-fluid"
                              alt="product_detail_2"
                            />
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <CarouselSlider
                      settings={{
                        dots: false,
                        slidesToShow: slidesToShow,
                        slidesToScroll: 1,
                        beforeChange: (currentSlide, nextSlide) => {
                          console.log(
                            "Slide changed to",
                            currentSlide,
                            nextSlide,
                            allProductImages
                          );
                          setSelectedImage(allProductImages[nextSlide]);
                        },
                      }}
                    >
                      {allProductImages.map((src) => {
                        if (!src) {
                          return null;
                        }
                        return (
                          <div
                            key={src}
                            className="item cursor-pointer"
                            onClick={() => setSelectedImage(src)}
                          >
                            <img
                              src={src}
                              width="100px"
                              height="101px"
                              className="img-fluid"
                              alt="product_detail_2"
                            />
                          </div>
                        );
                      })}
                    </CarouselSlider>
                  )}
                </div>
              </div>
              <div
                className="col-lg-8 row position-sticky"
                style={{ top: "370px" }}
              >
                <h1 className="product-heading p-0 mt-5">
                  {product.vendor_article_name}
                </h1>

                <div
                  className="col-lg-6 pl-lg-0 mt-5 position-sticky"
                  style={{ top: "370px" }}
                >
                  <h2 className="highlights">Highlights</h2>
                  <div
                    className="dynamic-content"
                    dangerouslySetInnerHTML={{
                      __html: product.product_highlights,
                    }}
                  ></div>
                  <div className="col-lg-6 pl-lg-0 mt-5 position-sticky">
                    {product.expert_advice !== "null" &&
                      product.expert_advice !== "undefined" && (
                        <div>
                          <h2 className="highlights">Expert Advice</h2>
                          <div
                            className="dynamic-content"
                            style={{ width: "200%" }}
                            dangerouslySetInnerHTML={{
                              __html: product.expert_advice,
                            }}
                          ></div>
                        </div>
                      )}
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="d-flex justify-content-end">
                    <div>
                      {/* <img
                      src={share}
                      width="10px"
                      height="10px"
                      className="d-block mx-auto eye"
                      alt="share"
                      style={{cursor:"pointer"}}
                    /> */}
                      <Dropdown>
                        <Dropdown.Toggle
                          as="span"
                          variant="link"
                          style={{ textAlign: "center" }}
                          className="watch productcustom-dropdown-toggle"
                        >
                          <Image
                            src={share}
                            width={10}
                            height={10}
                            alt="share"
                            style={{ cursor: "pointer", marginLeft: "4px" }}
                          />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item onClick={shareViaEmail}>
                            <Image
                              className="img-fluid mr-2"
                              src={mail}
                              width="20px"
                              height="20px"
                              alt="sad"
                            />{" "}
                            Mail
                          </Dropdown.Item>
                          <Dropdown.Item onClick={shareContent}>
                            <Image
                              className="img-fluid mr-2"
                              src={whatsapp}
                              width="20px"
                              height="20px"
                              alt="sad"
                            />{" "}
                            What's App
                          </Dropdown.Item>
                          <Dropdown.Item onClick={shareViaFacebook}>
                            <Image
                              className="img-fluid mr-2"
                              src={facebook}
                              width="20px"
                              height="20px"
                              alt="sad"
                            />{" "}
                            Facebook
                          </Dropdown.Item>
                          <Dropdown.Item onClick={shareViaTwitter}>
                            <Image
                              className="img-fluid mr-2"
                              src={twitter}
                              width="20px"
                              height="20px"
                              alt="sad"
                            />{" "}
                            Twitter
                          </Dropdown.Item>
                          <Dropdown.Item onClick={shareViaLinkedIn}>
                            <Image
                              className="img-fluid mr-2"
                              src={linkedin}
                              width="20px"
                              height="20px"
                              alt="sad"
                            />{" "}
                            LinkedIn
                          </Dropdown.Item>
                          <Dropdown.Item onClick={copyToClipboard}>
                            <Image
                              className="img-fluid mr-2"
                              src={copydata}
                              width="20px"
                              height="20px"
                              alt="sad"
                            />{" "}
                            Copy URL
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
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

                  <div className="product-info">
                    <p className="product-categorytwo">
                      <a
                        className="section"
                        href={`/product-category/${product?.category_slug}`}
                        target="_blank"
                      >
                        {product.category_name}
                      </a>
                    </p>

                    <p className="product-categorytwo">
                      By:
                      <span className="product-company">
                        <a
                          className="section"
                          style={{ color: "#e75204" }}
                          href={`/product-brands/${product?.brand_name}`}
                          target="_blank"
                        >
                          {product.brand_name}
                        </a>
                      </span>
                    </p>

                    <div className="d-flex">
                      {/* <p className="yellow-productstar">★ ★ ★ ★ ★</p> */}
                      <Rating
                        name="simple-controlled"
                        readOnly
                        value={product?.ratingCount?.average}
                      />

                      <p className="productrate align-self-center">
                        {product?.ratingCount?.average}
                      </p>
                      {product?.ratingCount?.totalReviews == 0 &&
                      product?.ratingCount?.totalReviews == 0 ? (
                        <>
                          <p className="reviewrate align-self-center">
                            Be A First Reviewer
                          </p>
                        </>
                      ) : (
                        <>
                          <p
                            className="reviewrate align-self-center"
                            style={{ cursor: "pointer" }}
                            onClick={handleOpenReviewTab}
                          >
                            {product?.ratingCount?.totalReviews} Ratings &{" "}
                            {product?.ratingCount?.totalReviews} Reviews
                          </p>
                        </>
                      )}
                    </div>
                    {product.mrp == product.final_price ? (
                      <>
                        <p className="product-categorytwo">
                          MRP:{" "}
                          <span
                            className="strike"
                            style={{ textDecoration: "none" }}
                          >
                            ₹ {Number(product.mrp).toFixed(2)}
                          </span>
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="product-categorytwo">
                          MRP:{" "}
                          <span className="strike">
                            ₹ {Number(product.mrp).toFixed(2)}
                          </span>
                        </p>
                      </>
                    )}

                    <div className="d-flex">
                      <p className="price">
                        Price:
                        <span className="price-money">
                          ₹ {Number(product.final_price).toFixed(2)}
                        </span>
                      </p>

                      <div
                        className={
                          product.discount_percent > 0 ||
                          product.discount_amount !== 0
                            ? "price-radius"
                            : ""
                        }
                      >
                        {product.discount_percent > 0 ? (
                          <p className="price-off mb-0">
                            -{Number(product.discount_percent)} %{" "}
                          </p>
                        ) : (
                          product.discount_amount !== 0 && (
                            <p className="price-off mb-0">
                              {Number(product.discount_amount)} ₹
                            </p>
                          )
                        )}
                      </div>

                      <p className="saved align-self-center">
                        You Saved ₹{" "}
                        {Number(product.mrp - product.final_price).toFixed(2)}
                      </p>
                    </div>

                    <p className="all-taxes">Inclusive of all taxes</p>

                    <ul className="list-stock">
                      <li
                        className="stock"
                        style={{
                          color:
                            product.show_stock == 1 &&
                            product &&
                            product.stock_status == "Out Stock"
                              ? "red"
                              : "green",
                        }}
                      >
                        {/* {product?.show_stock == 1 && product?.stock_status == "Out Stock"
                       ? 'Out Of Stock' : 'In Stock'} */}
                        {product?.show_stock == 1
                          ? product?.stock_status == "Out Stock"
                            ? "Out Of Stock"
                            : "In Stock"
                          : ""}
                      </li>
                    </ul>
                    {product.size_chart !== "null" &&
                      product.size_chart !== "undefined" && (
                        <>
                          <>
                            <Button className="stock" onClick={handleShow}>
                              Size Chart
                            </Button>
                          </>
                          <Modal
                            show={show}
                            onHide={handleClose}
                            backdrop="static"
                            keyboard={false}
                          >
                            <Modal.Header closeButton></Modal.Header>
                            <Modal.Body>
                              <img
                                className="img-fluid"
                                src={product.size_chart}
                                style={{ width: "500px", height: "500px" }}
                              />
                            </Modal.Body>
                          </Modal>
                        </>
                      )}

                    <div className="d-flex">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                        }}
                      >
                        {product?.product_type === "variant" && (
                          <div
                            className="moneycard active"
                            style={{
                              marginRight: "10px",
                              marginBottom: "10px",
                            }}
                          >
                            <a>{product.brand_size}</a>
                          </div>
                        )}
                        {product.variants?.length > 0 &&
                          product.variants.map((style, index) => (
                            <div
                              key={index}
                              className="moneycard noactive"
                              style={{ marginRight: "10px" }}
                            >
                              <Link
                                href={generateUrl(style)} // Adjust the URL generation function as needed
                                className="wallet-money-link" // Add class name for styling if needed
                                target="_blank" // Open link in new tab
                                rel="noopener noreferrer" // Recommended for security reasons
                              >
                                {style.brand_size}
                              </Link>
                            </div>
                          ))}
                      </div>
                    </div>
                    {product.bundles?.length > 0 && <p>Bundle Offers</p>}
                    <div className="d-flex">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                        }}
                      >
                        {product.bundles?.length > 0 &&
                          product.bundles.map((style, index) => (
                            <div
                              key={index}
                              className="moneycard noactive"
                              style={{ marginRight: "10px" }}
                            >
                              <Link
                                href={generateUrl(style)} // Adjust the URL generation function as needed
                                className="wallet-money-link" // Add class name for styling if needed
                                target="_blank" // Open link in new tab
                                rel="noopener noreferrer" // Recommended for security reasons
                              >
                                {style.brand_size}
                              </Link>
                            </div>
                          ))}
                      </div>
                    </div>
                    {product && product.stock_status == "Out Stock" ? (
                      <></>
                    ) : (
                      <div className="mt-2 ">
                        {/* <!--Sort by Accordion start--> */}
                        <div id="sort">
                          {/* <button
                          type="button"
                          data-toggle="collapse"
                          data-target="#sort-section"
                          aria-expanded="true"
                          aria-controls="sort-section"
                          className="btn"
                        >
                          Quantity : 01
                        </button>
                        <FontAwesomeIcon
                          icon={faAngleDown}
                          size="lg"
                          style={{ color: "#1b1c1d" }}
                        /> */}
                          {/* <Form.Group className="mt-3 mb-3" controlId="">
                          <Form.Label className="price">Quantity:</Form.Label>
                          <Form.Control
                            className="sort-by"
                            type="text"
                            placeholder="1"
                            value={inputValue}
                            onChange={handleQuantityChange}
                            onBlur={handleBlur}
                          />
                        </Form.Group> */}
                          {/* <div className="quantity-picker"> */}
                          <div>
                            <Form.Label className="price">Quantity:</Form.Label>
                          </div>{" "}
                          <button
                            className="quantity-button"
                            onClick={decreaseQuantity}
                            disabled={quantity <= 1}
                          >
                            -
                          </button>
                          <span className="quantity-display">{quantity}</span>
                          <button
                            className="quantity-button"
                            onClick={increaseQuantity}
                            disabled={quantity >= 20}
                          >
                            +
                          </button>
                          {/* </div> */}
                        </div>
                        {product?.show_stock == 1 &&
                          product?.back_order_quantity < 10 && (
                            <p class="all-taxes">
                              Only {product.back_order_quantity} Available
                            </p>
                          )}
                        <div
                          id="sort-section"
                          aria-labelledby="sort"
                          data-parent="#accordion"
                          className="collapse show"
                        >
                          <ul className="list-unstyled">
                            <li>
                              <a href="#"></a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}

                    <div className="d-flex">
                      {product && product.stock_status == "Out Stock" ? (
                        <>
                          <button
                            onClick={(e) => addItemToCart(e, product, quantity)}
                            className="text-decoration-none align-self-center d-flex readmore buy-btn mx-0"
                            href="cart"
                            disabled
                            style={{ opacity: "0.6" }}
                          >
                            <FontAwesomeIcon
                              className="mr-2"
                              icon={faShoppingCart}
                              size="lg"
                            />
                            {isProductPresentInCart(product)
                              ? "Add to Cart"
                              : "Add to Cart"}
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={(e) => addItemToCart(e, product, quantity)}
                            className="text-decoration-none align-self-center d-flex cart buy-btn mx-0"
                            href="cart"
                          >
                            {/* <FontAwesomeIcon className="mr-2" icon={faShoppingCart} size="lg" />
                              {isProductPresentInCart(product) ? "Checkout" : "Add to Cart"} */}
                            <FontAwesomeIcon
                              className="mr-2"
                              icon={faShoppingCart}
                              size="lg"
                            />
                            Add to Cart
                          </button>
                        </>
                      )}

                      {product && product.stock_status == "Out Stock" ? (
                        <>
                          <button
                            onClick={(e) => addBuynow(e, product, quantity)}
                            className="text-decoration-none readmore buy-btn"
                            href="cart"
                            disabled
                            style={{ opacity: "0.6" }}
                          >
                            <FontAwesomeIcon
                              className="mr-2"
                              icon={faGem}
                              size="lg"
                              style={{ color: "#ffffff" }}
                            />
                            Buy Now
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={(e) => addBuynow(e, product, quantity)}
                            className="text-decoration-none readmore cart buy-btn"
                            href="cart"
                            style={{ height: "48px" }}
                          >
                            <FontAwesomeIcon
                              className="mr-2"
                              icon={faGem}
                              size="lg"
                              style={{ color: "#ffffff" }}
                            />
                            Buy Now
                            <span style={{ fontSize: "8px" }}>
                              Power By Shiprocket
                            </span>
                          </button>
                        </>
                      )}
                    </div>

                    <div className="d-lg-flex d-flex-column justify-content-between">
                      <p className="delivery">Delivery</p>

                      <div className="delivers">
                        <div className="address-three">
                          <div className="d-flex justify-content-between">
                            <p className="deliveraddress mb-0">
                              <Image
                                className="img-fluid mr-2"
                                src={map}
                                width={18}
                                height={20}
                                alt="map"
                              />
                              <input
                                type="text"
                                onChange={(e) => setPinCode(e.target.value)}
                                placeholder="Enter Pin code"
                              />
                            </p>
                            <a
                              href="javascript:void(0)"
                              onClick={handlePinCode}
                              className="change align-self-center"
                            >
                              Check
                            </a>
                          </div>
                        </div>

                        <p className="free-ship">
                          {possibleDeliveryData &&
                            `Delivery by ${possibleDeliveryData.date}`}{" "}
                          <span className="right-border"></span>
                          <span
                            className="freeship"
                            onClick={openShippingChargesModal}
                            style={{ cursor: "pointer" }}
                          >
                            {possibleDeliveryData &&
                              possibleDeliveryData.shipping}
                          </span>
                        </p>
                        {openShippingCharges && possibleDeliveryData && (
                          <div
                            className="modal-overlay mb-3"
                            onClick={closeShippingChargesModal}
                          >
                            <div
                              className="modal-content"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <p
                                className="highlights mb-2 mt-3"
                                style={{ textAlign: "center" }}
                              >
                                Shipping Charges
                              </p>
                              <ul>
                                <li>₹1 - ₹199: ₹75</li>
                                <li>₹200 - ₹399: ₹55</li>
                                <li>₹400 - ₹599: ₹45</li>
                                <li>₹600 - ₹899: ₹25</li>
                                <li>Free Shipping for Order above ₹900</li>
                              </ul>

                              <div style={{ textAlign: "center" }}>
                                <Button
                                  style={{
                                    color: "#fff",
                                    marginTop: "-10px",
                                    cursor: "pointer",
                                    backgroundColor: "#e75204",
                                    maxWidth: "100px",
                                    margin: "15px",
                                  }}
                                  onClick={closeShippingChargesModal}
                                >
                                  Close
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="return-card">
                      <div className="d-flex justify-content-around">
                        <div>
                          <div className="circle">
                            <Image
                              className="img-fluid"
                              src={curated}
                              width={20}
                              height={20}
                              alt="curated"
                            />
                          </div>

                          <p className="policy">Curated by Doctors</p>
                        </div>

                        <div>
                          <div className="circle">
                            <Image
                              className="img-fluid"
                              src={Return}
                              width={20}
                              height={20}
                              alt="return"
                            />
                          </div>

                          <p className="policy">Friendly Return Policy</p>
                        </div>

                        <div>
                          <div className="circle">
                            <Image
                              className="img-fluid"
                              src={cash}
                              width={20}
                              height={20}
                              alt="cash"
                            />
                          </div>

                          <p className="policy">Cash on Delivery</p>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex mt-4">
                      <div className="">
                        <p className="payment-option">Payment Options</p>
                      </div>

                      <div className="">
                        <ul className="list-styled">
                          <li>COD available from ₹599 till ₹9999</li>

                          <li>Free Shipping on All Orders above ₹900</li>
                        </ul>
                      </div>
                    </div>

                    {/* <div className="d-flex justify-content-between mt-4">
                    <div>
                      <p className="payment-option">Offers</p>
                    </div>

                    <div className="pro-offers">
                      <div className="d-flex mb-2">
                        <img
                          src={success_percentage}
                          className="img-fluid"
                          width="20px"
                          height="20px"
                          alt="success-image"
                        />

                        <p className="flat-off">Flat 50% off on First 2 Orders</p>

                        <a href="/terms-and-conditions" target="_blank" className="terms align-self-center">
                          T&C
                        </a>
                      </div>

                      <div className="d-flex mb-2">
                        <img
                          src={success_percentage}
                          className="img-fluid"
                          width="20px"
                          height="20px"
                          alt="success-image"
                        />

                        <p className="flat-off">Extra ₹70 Off</p>

                        <a href="/terms-and-conditions"
                          target="_blank" className="terms align-self-center">
                          T&C
                        </a>
                      </div>

                      <div className="d-flex mb-2">
                        <img
                          src={success_percentage}
                          className="img-fluid"
                          width="20px"
                          height="20px"
                          alt="success-image"
                        />

                        <p className="flat-off">Extra 5% Off Up to ₹100</p>

                        <a href="/terms-and-conditions"
                          target="_blank" className="terms align-self-center">
                          T&C
                        </a>
                      </div>

                      <div className="d-flex mb-2">
                        <img
                          src={success_percentage}
                          className="img-fluid"
                          width="20px"
                          height="20px"
                          alt="success-image"
                        />

                        <p className="flat-off">Extra ₹20 Off - No Return</p>

                        <a href="/terms-and-conditions"
                          target="_blank" className="terms align-self-center">
                          T&C
                        </a>
                      </div>

                      <p className="more-offers">View 3 more Offers</p>
                    </div>
                  </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="bottom-border"></div>

              <div className="row mt-4 mx-lg-0">
                <div
                  className="tab-content col-lg-12 px-lg-0 mb-4"
                  id="productpagetabs"
                >
                  <Tabs
                    id="controlled-tab-productpagetabs"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3 nav-tabs"
                  >
                    <Tab eventKey="details" title={<h3>Details</h3>}>
                      <div className="tab-pane mt-0" id="details">
                        <h4 className="details-heading">Description</h4>

                        {product.description !== "null" && (
                          <div
                            className="dynamic-content"
                            dangerouslySetInnerHTML={{
                              __html: product.description,
                            }}
                          ></div>
                        )}
                        <h4 className="details-heading">Ingredients</h4>

                        {product.key_ingredients !== "null" && (
                          <div className="dynamic-content">
                            <p className="details-subheading">
                              Key Ingredients:
                            </p>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: product.key_ingredients,
                              }}
                            ></div>
                            <br />
                          </div>
                        )}

                        {product.other_ingredients !== "null" && (
                          <div className="dynamic-content">
                            <p className="details-subheading">
                              Other Ingredients:
                            </p>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: product.other_ingredients,
                              }}
                            ></div>
                            <br />
                          </div>
                        )}

                        <h4 className="details-heading">Other Information</h4>

                        {product.directions_of_use !== "null" && (
                          <div className="dynamic-content">
                            <h5 className="details-subheading">
                              Directions for use
                            </h5>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: product.directions_of_use,
                              }}
                            ></div>
                            <br />
                          </div>
                        )}

                        {product.feeding_table !== "<p>NA</p>" &&
                          product.feeding_table !== "<p>na</p>" &&
                          product.feeding_table !== "NA" &&
                          product.feeding_table !== "na" && (
                            <div className="dynamic-content">
                              <h5 className="details-subheading">
                                Feeding Table
                              </h5>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: product.feeding_table,
                                }}
                              ></div>
                              <br />
                            </div>
                          )}

                        {product.safety_information !== "null" && (
                          <div className="dynamic-content">
                            <h5 className="details-subheading">
                              Safety Information
                            </h5>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: product.safety_information,
                              }}
                            ></div>
                            <br />
                          </div>
                        )}

                        {product.product_benefits !== "<p>NA</p>" &&
                          product.product_benefits !== "<p>na</p>" &&
                          product.product_benefits !== "NA" &&
                          product.product_benefits !== "na" && (
                            <div className="dynamic-content">
                              <h4 className="details-subheading">
                                Product Benefits
                              </h4>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: product.product_benefits,
                                }}
                              ></div>
                              <br />
                            </div>
                          )}

                        {typeof product.special_features !== "string" && (
                          <div className="dynamic-content">
                            <h4 className="details-subheading">
                              Special Features
                            </h4>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: product.special_features,
                              }}
                            ></div>
                            <br />
                          </div>
                        )}

                        <div
                          className="tab-content resp-tab-content"
                          id="tab-additional_information"
                          aria-labelledby="tab_item-1"
                        >
                          <h4 className="details-heading mt-3 mb-3">
                            Additional Information
                          </h4>

                          <table className="woocommerce-product-attributes shop_attributes table table-striped">
                            <tbody>
                              <tr className="woocommerce-product-attributes-item woocommerce-product-attributes-item--weight">
                                <th className="details-subheading woocommerce-product-attributes-item__label">
                                  Weight
                                </th>
                                <td className="woocommerce-product-attributes-item__value">
                                  {product.weight_kg} kg
                                </td>
                              </tr>
                              <tr className="woocommerce-product-attributes-item woocommerce-product-attributes-item--dimensions">
                                <th className="details-subheading woocommerce-product-attributes-item__label">
                                  Dimensions
                                </th>
                                <td className="woocommerce-product-attributes-item__value">
                                  {product.dimensions_cm} cm
                                </td>
                              </tr>
                              <tr className="woocommerce-product-attributes-item woocommerce-product-attributes-item--weight">
                                <th className="details-subheading woocommerce-product-attributes-item__label">
                                  Manufacturer Details
                                </th>
                                <td className="woocommerce-product-attributes-item__value">
                                  {
                                    product.manufacturer_name_and_address_with_pincode
                                  }
                                </td>
                              </tr>
                              <tr className="woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_pa_packer-details">
                                <th className="details-subheading woocommerce-product-attributes-item__label">
                                  Packer Details
                                </th>
                                <td className="woocommerce-product-attributes-item__value">
                                  {product.packer_name_and_address_with_pincode}
                                </td>
                              </tr>
                              {typeof product.importer_name_and_address_with_pincode !==
                                "string" && (
                                <tr className="woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_pa_packer-details">
                                  <th className="details-subheading woocommerce-product-attributes-item__label">
                                    Importer Details
                                  </th>
                                  <td className="woocommerce-product-attributes-item__value">
                                    {
                                      product.importer_name_and_address_with_pincode
                                    }
                                  </td>
                                </tr>
                              )}

                              <tr className="woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_pa_components">
                                <th className="details-subheading woocommerce-product-attributes-item__label">
                                  Components
                                </th>
                                <td className="woocommerce-product-attributes-item__value">
                                  {product.components}
                                </td>
                              </tr>
                              <tr className="woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_pa_country-of-origin">
                                <th className="details-subheading woocommerce-product-attributes-item__label">
                                  Country of Origin
                                </th>
                                <td className="woocommerce-product-attributes-item__value">
                                  {product.country_of_origin}
                                </td>
                              </tr>
                              <tr className="woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_pa_expires-on-or-after">
                                <th className="details-subheading woocommerce-product-attributes-item__label">
                                  Expires on or After
                                </th>
                                <td className="woocommerce-product-attributes-item__value">
                                  {(() => {
                                    const futureDate = new Date();
                                    futureDate.setDate(
                                      futureDate.getDate() +
                                        product.expires_in_days
                                    );
                                    return futureDate.toDateString();
                                  })()}
                                </td>
                              </tr>
                              <tr className="woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_pa_sku">
                                <th className="details-subheading woocommerce-product-attributes-item__label">
                                  SKU
                                </th>
                                <td className="woocommerce-product-attributes-item__value">
                                  {product.sku_code}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        {product.product_video &&
                          product.product_video !== "null" && (
                            <div>
                              <video ref={videoRef} width="600" controls>
                                <source
                                  src={product.product_video}
                                  type="video/mp4"
                                />
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          )}
                      </div>
                    </Tab>
                    <Tab eventKey="faq" title={<h3>FAQ'S</h3>}>
                      <div className="row">
                        <div className="col-lg-12">
                          <Accordion activeKey={activeKey}>
                            {product?.faqs.map((faq) => (
                              <Accordion.Item
                                eventKey={faq.id.toString()}
                                key={faq.id}
                              >
                                {/* Custom clickable header with an arrow icon */}
                                <div
                                  className="custom-accordion-header details-subheading"
                                  onClick={() =>
                                    handleToggle(faq.id.toString())
                                  }
                                >
                                  <h4>{faq.faq}</h4>
                                  {/* Arrow icon that rotates based on the activeKey */}
                                  <span
                                    className={`arrow-icon ${
                                      activeKey === faq.id.toString()
                                        ? "open"
                                        : ""
                                    }`}
                                  >
                                    ▼
                                  </span>
                                </div>

                                <Accordion.Body>
                                  <p className="details-para">{faq.faq_a}</p>
                                </Accordion.Body>
                              </Accordion.Item>
                            ))}
                          </Accordion>
                        </div>
                      </div>
                    </Tab>

                    <Tab eventKey="reviews" title={<h3>Reviews</h3>}>
                      <div className="tab-pane" id="reviews">
                        <div>
                          <div className="row">
                            <div className="col-lg-6">
                              {/* <h2 className="details-heading">Reviews</h2> */}

                              <div className="d-flex">
                                <Rating
                                  name="simple-controlled"
                                  readOnly
                                  value={product?.ratingCount?.average}
                                />
                                <p className="reviewrating align-self-center">
                                  {product?.ratingCount?.average}
                                </p>
                              </div>

                              <p className="details-subheading">{`Based on ${product?.ratingCount?.totalReviews} Ratings`}</p>

                              <p className="details-para">
                                Weighted average based on user credibility on
                                Cureka
                              </p>
                            </div>

                            <div className="col-lg-6">
                              <h4 className="details-heading">
                                What Customers say
                              </h4>
                              {product?.ratingCount?.totalCustomerRating.map(
                                (rating, i) => (
                                  <div
                                    className={`row ${
                                      key === 0 && "mt-5"
                                    } mb-4`}
                                    key={i}
                                  >
                                    <div className="col-lg-2 align-self-center">
                                      <p className="mb-0 stars">
                                        {rating.name}
                                      </p>
                                    </div>

                                    <div
                                      className="col-lg-8 align-self-center"
                                      id="progressreviews"
                                    >
                                      <div className="progress">
                                        <div
                                          className={`progress-bar ${
                                            i === 4 ? "bg-danger" : "bg-success"
                                          } } `}
                                          role="progressbar"
                                          aria-valuenow="70"
                                          aria-valuemin="0"
                                          aria-valuemax="100"
                                          style={{
                                            width: `${rating.average}%`,
                                          }}
                                        />
                                      </div>
                                    </div>

                                    <div className="col-lg-2 align-self-center">
                                      <p className="mb-0 stars">
                                        {rating.count}
                                      </p>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                          {product.product_reviews &&
                            product.product_reviews.map((review, h) => (
                              <div className="address-two" key={h}>
                                <div className="d-flex">
                                  <Rating
                                    readOnly
                                    name="simple-controlled"
                                    value={review.rating}
                                  />
                                  <p className="productrate align-self-center">
                                    {review.rating}
                                  </p>
                                </div>

                                <p className="genuine">{review.title}</p>

                                <p className="details-para genuine-para">
                                  {review.comments}
                                </p>

                                <p className="genuine-name">
                                  {review.created_by},
                                  <span className="genuine-location">
                                    {review.time}
                                  </span>
                                </p>
                              </div>
                            ))}
                          <div className="load-link">
                            {removedProductReview.length > 0 && (
                              <a className="loadmore" onClick={loadMoreReviews}>
                                Load more
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </Tab>
                  </Tabs>
                  <div className="row">
                    <div className="col-lg-12">
                      <h2 className="details-heading mt-3 mb-3">
                        Suggested Products
                      </h2>
                      <div className="container-fluid p-0" id="new-arrivals">
                        <CarouselSlider
                          settings={{ slidesToShow: isMobile ? 2 : 4 }}
                        >
                          {!!newArrivals?.length &&
                            newArrivals?.map((product) => {
                              let product_front_tp_image;
                              if (product?.product_images) {
                                product_front_tp_image =
                                  product?.product_images[0].image;
                              } else {
                                product_front_tp_image = noproduct;
                              }
                              console.log(product.product_id);
                              return (
                                <div
                                  key={product.product_id}
                                  className="item mr-3"
                                >
                                  <div className="arrivals card">
                                    <div className="d-flex flex-nowrap justify-content-between">
                                      <div className="sale d-lg-block d-none">
                                        {product.discount_percent > 0 ? (
                                          <p className="sale-heading">
                                            -{Number(product.discount_percent)}{" "}
                                            %{" "}
                                          </p>
                                        ) : (
                                          product.discount_amount !== 0 && (
                                            <p className="sale-heading">
                                              {" "}
                                              {product.discount_amount} ₹{" "}
                                            </p>
                                          )
                                        )}
                                      </div>
                                      <a
                                        href={generateUrl(product)}
                                        key={product.product_id}
                                        target="_blank"
                                        className=""
                                      >
                                        <div className="product">
                                          <Image
                                            src={product_front_tp_image}
                                            width={218}
                                            height={172}
                                            className="img-fluid"
                                            alt="product11"
                                          />
                                        </div>
                                      </a>

                                      <div className="cart-icons align-self-start">
                                        <div className="watch position-relative">
                                          <a
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
                                          </a>
                                        </div>

                                        <button
                                          onClick={(e) =>
                                            addItemToWishlist(e, product)
                                          }
                                          className="watch"
                                        >
                                          <LikeIcon
                                            stroke={
                                              isProductPresentInWishlist(
                                                product
                                              )
                                                ? "red"
                                                : "#627284"
                                            }
                                            fill={
                                              isProductPresentInWishlist(
                                                product
                                              )
                                                ? "red"
                                                : "#627284"
                                            }
                                            className="d-block mx-auto eye"
                                          />
                                        </button>

                                        {/* <div className="watch d-lg-block d-none">
                                          <img
                                            src={share}
                                            width="10px"
                                            height="10px"
                                            className="d-block mx-auto eye"
                                            alt="share"
                                          />
                                        </div> */}
                                      </div>
                                    </div>

                                    <div className="product-text">
                                      <p className="product-category">
                                        <a
                                          className="section"
                                          href={`/product-category/${product?.category_slug}`}
                                          target="_blank"
                                        >{`${product.category_name}`}</a>
                                      </p>
                                      <a
                                        className="text-decoration-none"
                                        href={generateUrl(product)}
                                        data-toggle="tooltip"
                                        data-placement="right"
                                        target="_blank"
                                        title={product.vendor_article_name}
                                      >
                                        <h3 className="product-name text-truncate">
                                          {product.vendor_article_name}
                                        </h3>
                                      </a>
                                      <div className="rating  d-lg-flex d-none">
                                        <p className="rating-number">
                                          {product &&
                                          product.product_reviews.length > 0
                                            ? product &&
                                              product.product_reviews.length > 0
                                              ? product.product_reviews.reduce(
                                                  (acc, review) =>
                                                    acc + (review.rating || 0),
                                                  0
                                                ) /
                                                product.product_reviews.length
                                              : "0"
                                            : "0"}
                                        </p>
                                      </div>

                                      <p className="product-author d-lg-block d-none">
                                        By:{" "}
                                        <a
                                          className="product-author-className"
                                          href={`/product-brands/${product.brand_name}`}
                                          target="_blank"
                                          rel="noreferrer"
                                        >
                                          {product.brand_name}
                                        </a>
                                      </p>
                                    </div>

                                    <div className="d-lg-flex d-flex-column justify-content-between align-items-center">
                                      <div className="price d-flex d-lg-block">
                                        {product.mrp == product.final_price ? (
                                          <>
                                            <p
                                              style={{ textDecoration: "none" }}
                                              className="discount"
                                            >
                                              &#8377; {product.mrp}
                                            </p>
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
                                      {/* 
                                    <button
                                      onClick={(e) => addItemToCart(e, product)}
                                      className="text-decoration-none align-items-center justify-content-center jus w-100 d-flex cart"
                                      href="#"
                                    >
                                      <FontAwesomeIcon
                                        className="mr-2"
                                        icon={faShoppingCart}
                                        size="lg"
                                      />{" "}
                                      {isProductPresentInCart(product)
                                        ? "Checkout"
                                        : "Add to Cart"}
                                    </button> */}
                                      {product &&
                                      product.stock_status == "Out Stock" ? (
                                        <>
                                          <div className="d-flex-column pb-0 pb-lg-5">
                                            <p
                                              className="text-center"
                                              style={{
                                                color:
                                                  product.show_stock == 1 &&
                                                  product &&
                                                  product.stock_status ==
                                                    "Out Stock"
                                                    ? "red"
                                                    : "",
                                                fontSize: "10px",
                                              }}
                                            >
                                              {product.show_stock == 1 &&
                                              product &&
                                              product.stock_status ==
                                                "Out Stock" ? (
                                                "Out Of Stock"
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </p>
                                            <button
                                              className="text-decoration-none align-items-center justify-content-center jus w-100 d-flex cart"
                                              disabled
                                              style={{ opacity: "0.6" }}
                                            >
                                              <FontAwesomeIcon
                                                className="mr-2"
                                                icon={faShoppingCart}
                                                size="lg"
                                              />{" "}
                                              {isProductPresentInCart(product)
                                                ? "Add to Cart"
                                                : "Add to Cart"}
                                            </button>
                                          </div>
                                        </>
                                      ) : (
                                        <>
                                          <div className="d-flex-column pb-0 pb-lg-5">
                                            <p
                                              className="text-center"
                                              style={{
                                                color:
                                                  product &&
                                                  product.stock_status ==
                                                    "Out Stock"
                                                    ? "red"
                                                    : "",
                                                fontSize: "10px",
                                              }}
                                            >
                                              {product &&
                                              product.stock_status ==
                                                "Out Stock" ? (
                                                <>&nbsp;</>
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </p>
                                            <button
                                              onClick={(e) =>
                                                addItemToCart(e, product)
                                              }
                                              className="text-decoration-none align-items-center justify-content-center jus w-100 d-flex cart"
                                              href="#"
                                            >
                                              <FontAwesomeIcon
                                                className="mr-2"
                                                icon={faShoppingCart}
                                                size="lg"
                                              />{" "}
                                              {isProductPresentInCart(product)
                                                ? "Checkout"
                                                : "Add to Cart"}
                                            </button>
                                          </div>
                                        </>
                                      )}
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
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
      <div className="">
        <ScrollToTop isVisible={isVisible} />
      </div>
      {product && product.popups && (
        <PopupModal
          show={modalProductPopupShow}
          onHide={closeCartegoryPopupModal}
          popupData={product.popups}
        />
      )}
    </>
  );
}
