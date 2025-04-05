"use client";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useFormik } from "formik";
import _ from "lodash";
import { forwardRef, useEffect, useMemo, useState } from "react";
import { faGem } from "@fortawesome/free-solid-svg-icons";

import {
  Form,
  OverlayTrigger,
  ToggleButtonGroup,
  Tooltip,
} from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Link from "next/link";
import Swal from "sweetalert2";
import urlJoin from "url-join";
import coupon from "../../public/images/coupon.svg";
import deliverMap from "../../public/images/delivermap.png";
import houseChimney from "../../public/images/house-chimney.png";
import CarouselSlider from "../../components/CarouselSlider";
import { env } from "../../config/env.config";
import "../../styles/cart.css";
import Image from "next/image";

import {
  addProductToCart,
  addUserAddress,
  applyCoupon,
  createOrder,
  deleteProductFromCart,
  fetchAddresses,
  fetchCartProducts,
  fetchCoupons,
  getAddressOnPincode,
  getPaymentSessionId,
} from "../../redux/action";
import { setShowLoginModel } from "../../redux/slices/auth.slice";
import { pagePaths } from "../../utils/constants/constant";
import { initializeCashfree } from "../../utils/cashfree.utils";
import { basePath } from "../../utils/constants/api.constants";
import { generateUrl } from "../../utils/constants/common.constants";
import useCustomerLoggedIn from "../../utils/hooks/useCustomerLoggedIn";
import Footer from "../../views/Footer";
import Header from "../../views/Header";
import PopupModal from "../../views/Header/HomePopup";
import { useRouter } from "next/navigation";
import CartProduct from "./CartProduct";
import OrderSummary from "./OrderSummary";
import { initialValues, validationSchema } from "./helper";
import CryptoJS from "crypto-js"; // Import CryptoJS
const checkoutStep = {
  cart: "cart",
  delivery: "delivery",
  payment: "payment",
};

// Helper to wait for checkout script

const CustomToggleButton = ({ value, children, onClick, isSelected }) => (
  <button
    type="button"
    className={`text-decoration-none ${
      isSelected ? "reorder-btn" : "office-btn"
    } mr-0`}
    onClick={() => onClick(value)}
    style={{ margin: 0 }}
  >
    {children}
  </button>
);

export default function Cart() {
  const { isLoggedIn } = useCustomerLoggedIn();
  const navigate = useRouter();
  const [isGiftWrappingSelected, setIsGiftWrappingSelected] = useState(false);
  const [isBillingAndShippingSame, setIsBillingAndShippingSame] =
    useState(true);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [product, setProduct] = useState();

  const dispatch = useDispatch();
  const { cartProducts, LastProducts, LikeProducts, cartPopup } = useSelector(
    (state) => state.customer
  );
  const { coupons } = useSelector((state) => state.admin);
  const [discountInfo, setDiscountInfo] = useState(null);
  const [currentCheckoutStep, setCurrentCheckoutStep] = useState(
    checkoutStep.cart
  );
  const [manuallyEnteredCouponCode, setManuallyEnteredCouponCode] =
    useState("");
  const [shippingAddressId, setShippingAddressId] = useState(null);
  const [billingAddressId, setBillingAddressId] = useState(null);
  const [modalCartPopupShow, setmodalCartPopupShow] = useState(false);
  const { address } = useSelector((state) => state.customer);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addAddressShow, setAddAddressShow] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [isWalletMoneyChecked, setIsWalletMoneyChecked] = useState(false);
  const [walletMoney, setWalletMoney] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [shippingChargesData, setShippingChargesData] = useState([]);
  const { accessToken } = useSelector((state) => state.auth);
  const [remainingWalletMoney, setRemainingWalletMoney] = useState(walletMoney); // Remaining wallet money

  const isProductPresentInCart = (product) =>
    !!cartProducts?.find?.((item) => item.product_id === product.id);
  const handleShowLoginModel = () => dispatch(setShowLoginModel(true));
  const onRemoveFromCart = (e) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove from cart!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteProductFromCart(e);
        dispatch(fetchCartProducts());
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const addBuynow = async (event, cartProducts) => {
    event.preventDefault();

    if (!cartProducts || cartProducts.length === 0) {
      toast.error("Your cart is empty. Please add products to buy now.");
      return;
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const redirectUrl = window.location.origin + "/faster-order";

    const data = {
      cartData: {
        products: cartProducts.map((item) => ({
          product_id: item.product_id,
          quantity: item.qty,
          final_price: item.final_price,
        })),
      },
      redirect_url: redirectUrl,
      timestamp: timestamp,
    };

    const apiKey = "1OXaKLiBm7r3OVKI"; // Replace with real key
    const secretKey = "AVaEd0C6xJsgW5PYdL5WPkbSh8GHHE9b"; // Replace with real key

    try {
      const stringifiedPayload = JSON.stringify(data);
      const hmac = CryptoJS.HmacSHA256(stringifiedPayload, secretKey).toString(
        CryptoJS.enc.Base64
      );

      console.log("📦 Sending payload to Shiprocket:", data);

      const response = await axios.post(
        "https://checkout-api.shiprocket.com/api/v1/access-token/checkout",
        stringifiedPayload,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": apiKey,
            "X-Api-HMAC-SHA256": hmac,
          },
        }
      );

      const token = response?.data?.result?.token;
      console.log("✅ Received token:", token);

      if (!token) {
        toast.error("Unable to retrieve checkout token. Please try again.");
        return;
      }

      await waitForCheckout();

      window.HeadlessCheckout.addToCart(event, token);
    } catch (error) {
      console.error("🚨 Error during Shiprocket Checkout:", error);

      if (error.response) {
        // Backend responded with error status
        console.error("❌ Server response error:", error.response.data);
        toast.error(
          `Checkout failed: ${error.response.data?.message || "Server error"}`
        );
      } else if (error.request) {
        // No response received
        console.error("❌ No response received:", error.request);
        toast.error("No response from Shiprocket. Please try again.");
      } else {
        // Any other error
        console.error("❌ Unexpected error:", error.message);
        toast.error("Something went wrong. Please try again.");
      }
    }
  };
  const waitForCheckout = () =>
    new Promise((resolve, reject) => {
      const maxRetries = 10;
      let attempts = 0;

      const check = () => {
        if (
          window.HeadlessCheckout &&
          typeof window.HeadlessCheckout.addToCart === "function"
        ) {
          resolve();
        } else if (attempts < maxRetries) {
          attempts++;
          setTimeout(check, 300);
        } else {
          reject("❌ HeadlessCheckout not available.");
          toast.error("Shiprocket Checkout script not loaded. Try again.");
        }
      };

      check();
    });

  const handleBillingChange = () => {
    setIsGiftWrappingSelected(!isGiftWrappingSelected);
  };

  useEffect(() => {
    dispatch(fetchCartProducts());
    dispatch(fetchAddresses(accessToken));
    handleFetchWalletAmount();

    // Define an asynchronous function inside useEffect
    const fetchShippingCharges = async () => {
      try {
        // Await the result of the axios call
        const shippingChargesReponse = await axios.get(
          `${env.REACT_SERVER_BASE_URL}/api/v1/checkout/shippingCharges`
        );
        if (shippingChargesReponse) {
          setShippingChargesData(
            shippingChargesReponse &&
              shippingChargesReponse.data &&
              shippingChargesReponse.data.data
          );
        }
      } catch (error) {
        // Set the error to state for display or logging
        console.error("Error fetching data:", error);
      }
    };

    // Call the async function
    fetchShippingCharges();
  }, [dispatch, isLoggedIn]);

  const addItemToCart = (e, product) => {
    e.preventDefault();
    if (product.id) {
      if (isProductPresentInCart(product)) {
        navigate.push("/Cart");
      } else {
        addProductToCart(product.id, 1);
        if (isLoggedIn) dispatch(fetchCartProducts());
      }
    }
  };

  useEffect(() => {
    if (isLoggedIn) dispatch(fetchCoupons());
  }, [dispatch, isLoggedIn]);

  const subTotalAmount = useMemo(() => {
    if (cartProducts?.length) {
      return cartProducts.reduce((acc, item) => {
        return acc + item.final_price * (item.qty || 0);
      }, 0);
    }
    return 0;
  }, [cartProducts]);

  const onCouponChange = (coupon, isManual) => {
    if (isManual && _.isEmpty(manuallyEnteredCouponCode)) {
      return;
    }
    setSelectedCoupon(coupon);
  };

  useEffect(() => {
    if (selectedCoupon) {
      applyCoupon(selectedCoupon?.coupon_code, subTotalAmount).then((data) => {
        setDiscountInfo(data);
      });
    } else {
      setDiscountInfo(null);
    }
  }, [selectedCoupon, subTotalAmount]);

  const onQuantityChange = (quantity, productId) => {
    addProductToCart(productId, quantity).then(() => {
      if (isLoggedIn) dispatch(fetchCartProducts());
      //window.location.reload();
    });
  };

  let finalAmount = subTotalAmount;

  if (discountInfo?.final_amount) {
    let roundedAmount = Math.round(discountInfo?.final_amount); // This would round 1350.75 to 1351
    finalAmount = parseInt(roundedAmount);
  }
  if (isGiftWrappingSelected) {
    finalAmount += 40;
  }

  const onCartContinueClicked = () => {
    if (!cartProducts || cartProducts.length <= 0) {
      toast.error("Your cart is empty. Please add products to continue.");
    } else {
      setCurrentCheckoutStep(checkoutStep.delivery);
    }
  };

  // const addBuynow = async (event, cartProducts) => {
  //   event.preventDefault();

  //   if (!cartProducts || cartProducts.length === 0) {
  //     toast.error("Your cart is empty. Please add products to buy now.");
  //     return;
  //   }

  //   const timestamp = Math.floor(Date.now() / 1000);
  //   const redirectUrl = window.location.origin + "/faster-order"; // Use dynamic origin

  //   const data = {
  //     products: cartProducts.map((item) => ({
  //       product_id: item.product_id,
  //       quantity: item.qty,
  //       final_price: item.final_price,
  //     })),
  //     redirect_url: redirectUrl,
  //     timestamp: timestamp,
  //   };
  //   console.log("datas");

  //   const apiKey = "1OXaKLiBm7r3OVKI"; // Your Shiprocket public key
  //   const secretKey = "AVaEd0C6xJsgW5PYdL5WPkbSh8GHHE9b"; // Your Shiprocket secret key

  //   const stringifiedPayload = JSON.stringify(data);
  //   const hmac = CryptoJS.HmacSHA256(stringifiedPayload, secretKey).toString(
  //     CryptoJS.enc.Base64
  //   );

  //   try {
  //     const response = await axios.post(
  //       "https://checkout-api.shiprocket.com/api/v1/access-token/checkout",
  //       stringifiedPayload,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "X-Api-Key": apiKey,
  //           "X-Api-HMAC-SHA256": hmac,
  //         },
  //       }
  //     );

  //     const token = response.data?.result?.token;

  //     if (token) {
  //       if (
  //         window.HeadlessCheckout &&
  //         typeof window.HeadlessCheckout.addToCart === "function"
  //       ) {
  //         window.HeadlessCheckout.addToCart(event, token);
  //       } else {
  //         console.error(
  //           "🚫 HeadlessCheckout is not available. Script may not be loaded."
  //         );
  //         alert("Checkout is not ready. Please wait a moment and try again.");
  //       }
  //     } else {
  //       console.error("❌ Shiprocket did not return a token.");
  //     }
  //   } catch (error) {
  //     console.error("❌ Error during Shiprocket Buy Now:", error);
  //     toast.error("Failed to initiate faster checkout. Please try again.");
  //   }
  // };
  const handleBackClick = () => {
    window.history.back();
  };
  const closeCartPopupModal = () => {
    setmodalCartPopupShow(false);
  };
  const onCartSelectedAddressContinueClicked = () => {
    setCurrentCheckoutStep(checkoutStep.payment);
  };
  const handleAddressChange = (event) => {
    const selectedId = event.target.value;
    setSelectedAddress(selectedId);
    setShippingAddressId(selectedId);
    setAddAddressShow(false);
  };
  const handleAddAddress = () => {
    setAddAddressShow(!addAddressShow);
    setSelectedAddress(null);
  };
  const handlePaymentSelection = (paymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
    const range = shippingChargesData.find(
      (r) => subTotalAmount >= r.min && subTotalAmount <= (r.max ?? Infinity)
    );
    setShippingCharge(range);
  };
  const handleFetchWalletAmount = async () => {
    const token = accessToken;
    if (token) {
      const response = await axios.get(
        `${env.REACT_SERVER_BASE_URL}/user/account/fetchwalletamount`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWalletMoney(response && response.data && response.data.txns);
    }
  };
  const handleWalletMoneyToggle = () => {
    setIsWalletMoneyChecked(!isWalletMoneyChecked);
    if (!isWalletMoneyChecked) {
      // Checkbox is checked, subtract item price from wallet money
      setRemainingWalletMoney(walletMoney - finalAmount);
    } else {
      // Checkbox is unchecked, restore wallet money
      setRemainingWalletMoney(walletMoney);
    }
  };

  return (
    <>
      <Helmet>
        <title>Cart | Buy Healthcare Products Online - Cureka</title>
        <meta
          name="description"
          content="Cureka is one of the leading online healthcare store dealing with the best in class home health careproducts."
        />
        <link rel="canonical" href={window.location.href} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cureka" />
        <meta
          property="og:description"
          content="Cureka is one of the leading online healthcare store dealing with the best in class home health careproducts."
        />
        <meta
          property="og:image"
          content="https://frontend.cureka.com/assets/images/logo.svg"
        />
      </Helmet>
      <h1 style={{ display: "none" }}>Cureka Cart</h1>
      <Header showCategoryNavbar={false} />
      <div className="container-fluid px-0">
        <div className="container">
          <div className="d-flex home-back-section pt-1">
            <Link href={pagePaths.home}>
              <Image
                className="img-fluid d-flex align-self-center"
                src={houseChimney}
                width={16}
                height={16}
                alt="home-icon"
              />
            </Link>

            <p className="section mb-0 ml-3">/ &nbsp;&nbsp;&nbsp;Cart</p>
          </div>
        </div>
        <div className="bottom-border"></div>

        <div className="tab-pane-cart">
          <div className="tab-pane" id="cart">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <div className="order-summary p-0">
                    <h2 className="itemsincart">
                      {cartProducts?.length || 0} Items in your cart
                    </h2>

                    <div className="bottom-border"></div>

                    {!!cartProducts?.length &&
                      cartProducts.map((product) => (
                        <CartProduct
                          onQuantityChange={(quantity) =>
                            onQuantityChange(quantity, product.product_id)
                          }
                          onRemoveFromCart={() => onRemoveFromCart(product?.id)}
                          product={product}
                          key={product.id}
                        />
                      ))}
                  </div>

                  <a
                    href={pagePaths.home}
                    className="continue-shopping"
                    target="_blank"
                  >
                    Continue Shopping
                  </a>
                  {/* <a href="#" className="continue-shopping" onClick={handleBackClick}>
                      Continue Shopping
                    </a> */}

                  {LastProducts && LastProducts.length > 0 && (
                    <div className="lastminute">
                      <h2 className="last-buys">Last minute buys</h2>

                      <div className="row">
                        <div className="col-lg-12">
                          <div id="lastminutebuys">
                            <CarouselSlider
                              settings={{ slidesToShow: isMobile ? 2 : 4 }}
                            >
                              {!!LastProducts?.length &&
                                LastProducts?.map((product) => {
                                  let product_front_na_image;
                                  if (product?.product_images) {
                                    product_front_na_image =
                                      product?.product_images[0].image;
                                  } else {
                                    product_front_na_image =
                                      product?.front_image;
                                  }
                                  return (
                                    <div className="item item_buys px-1">
                                      <div className="last-minute card">
                                        <div className="top-picks-space">
                                          <a
                                            href={generateUrl(product)}
                                            key={product.id}
                                            target="_blank"
                                            className=""
                                          >
                                            <Image
                                              src={product_front_na_image}
                                              className="img-fluid"
                                              width={167}
                                              height={183}
                                              alt="toppicks1"
                                            />
                                          </a>
                                        </div>
                                      </div>

                                      <div className="description">
                                        <div className="d-flex justify-content-center justify-content-lg-start">
                                          <p className="toppicks-star">★</p>

                                          <p className="rate">4.6</p>

                                          <div className="topicks-border"></div>

                                          <a
                                            href={generateUrl(product)}
                                            key={product.id}
                                            target="_blank"
                                            className=""
                                          >
                                            <p className="category">
                                              {product.name}
                                            </p>
                                          </a>
                                        </div>

                                        <h2 className="toppicks-heading">
                                          {product.product_name}
                                        </h2>

                                        <p className="toppicks-discount">
                                          &#8377; {product.mrp}
                                        </p>

                                        <p className="toppicks-price">
                                          &#8377; {product.final_price}
                                        </p>

                                        {/* <a className="text-decoration-none align-self-center d-flex cart" href="#">
                                          <FontAwesomeIcon className="mr-2" icon={faShoppingCart} size="lg" />
                                          Add to Cart
                                        </a> */}

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
                                    </div>
                                  );
                                })}
                            </CarouselSlider>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {LikeProducts && LikeProducts.length > 0 && (
                    <div className="lastminute">
                      <h2 className="you-may">You May like this</h2>

                      <div className="row">
                        <div className="col-lg-12">
                          <div id="lastminutebuys">
                            <CarouselSlider
                              settings={{ slidesToShow: isMobile ? 2 : 4 }}
                            >
                              {!!LikeProducts?.length &&
                                LikeProducts?.map((product) => {
                                  let product_front_na_image;
                                  if (product?.product_images) {
                                    product_front_na_image =
                                      product?.product_images[0].image;
                                  } else {
                                    product_front_na_image =
                                      product?.front_image;
                                  }
                                  return (
                                    <div className="item item_buys px-1">
                                      <div className="last-minute card">
                                        <div className="top-picks-space">
                                          <a
                                            href={generateUrl(product)}
                                            key={product.id}
                                            target="_blank"
                                            className=""
                                          >
                                            <Image
                                              src={product_front_na_image}
                                              className="img-fluid youmay-img"
                                              width={167}
                                              height={183}
                                              alt="toppicks1"
                                            />
                                          </a>
                                        </div>
                                      </div>

                                      <div className="description">
                                        <div className="d-flex justify-content-center justify-content-lg-start">
                                          <p className="toppicks-star">★</p>

                                          <p className="rate">4.6</p>

                                          <div className="topicks-border"></div>

                                          <a
                                            href={generateUrl(product)}
                                            key={product.id}
                                            target="_blank"
                                            className=""
                                          >
                                            <p className="category">
                                              {product.name}
                                            </p>
                                          </a>
                                        </div>

                                        <h2 className="toppicks-heading">
                                          {product.product_name}
                                        </h2>

                                        <p className="toppicks-discount">
                                          &#8377; {product.mrp}
                                        </p>

                                        <p className="toppicks-price">
                                          &#8377; {product.final_price}
                                        </p>

                                        {/* <a className="text-decoration-none align-self-center d-flex cart" href="#">
                                          <FontAwesomeIcon className="mr-2" icon={faShoppingCart} size="lg" />
                                          Add to Cart
                                        </a> */}

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
                                    </div>
                                  );
                                })}
                            </CarouselSlider>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="col-lg-4">
                  {false && (
                    <div className="address-three">
                      <div className="d-flex Address justify-content-start">
                        <Image
                          className="img-fluid"
                          src={deliverMap}
                          width={18}
                          height={20}
                          alt="map"
                        />

                        <p className="deliveraddress mb-0">
                          Delivery to{" "}
                          <span style={{ color: "#231F20" }}>
                            500085, Hyderabad
                          </span>
                        </p>

                        <a href="#" className="change">
                          Change
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="address-three">
                    <div
                      className="form-group mb-0 align-items-center d-flex"
                      id="gift-wrapper"
                    >
                      <input
                        className="billing cursor-pointer"
                        type="checkbox"
                        name="billing"
                        id="billing"
                        checked={isGiftWrappingSelected}
                        onChange={handleBillingChange}
                      />
                      <label
                        className="gift-wrap cursor-pointer"
                        htmlFor="billing"
                      >
                        Add Gift-Wrapping
                      </label>
                    </div>
                  </div>

                  <OrderSummary
                    subTotalAmount={subTotalAmount}
                    discountInfo={discountInfo}
                    isGiftWrappingSelected={isGiftWrappingSelected}
                    finalAmount={finalAmount}
                  />
                  <div className="d-flex align-items-center justify-content-start">
                    {product?.stock_status === "Out Stock" ? (
                      <button
                        onClick={(e) => addBuynow(e, cartProducts)}
                        className="text-decoration-none readmore buy-btn"
                        style={{ height: "48px", opacity: 0.6 }}
                        disabled
                      >
                        <FontAwesomeIcon
                          className="me-2"
                          icon={faGem}
                          size="lg"
                          style={{ color: "#ffffff" }}
                        />
                        Buy Now
                      </button>
                    ) : (
                      <button
                        onClick={(e) => addBuynow(e, cartProducts)}
                        className="text-decoration-none readmore cart buy-btn"
                        style={{ height: "48px" }}
                      >
                        <FontAwesomeIcon
                          className="me-2"
                          icon={faGem}
                          size="lg"
                          style={{ color: "#ffffff" }}
                        />
                        Buy Now
                        <span
                          style={{
                            fontSize: "8px",
                            position: "absolute",
                            bottom: "-12px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            whiteSpace: "nowrap",
                            color: "#555",
                          }}
                        >
                          Powered by Shiprocket
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {cartPopup && cartPopup.length > 0 && (
        <PopupModal
          show={modalCartPopupShow}
          onHide={closeCartPopupModal}
          popupData={cartPopup}
        />
      )}
    </>
  );
}
