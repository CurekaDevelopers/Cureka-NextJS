"use client";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useFormik } from "formik";
import _ from "lodash";
import { forwardRef, useEffect, useMemo, useState } from "react";
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

const checkoutStep = {
  cart: "cart",
  delivery: "delivery",
  payment: "payment",
};

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

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate.push(pagePaths.home);
  //   }
  // }, [isLoggedIn, navigate]);

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
        navigate.push("/cart");
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

  const formikShippingAddress = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const response = await addUserAddress(
        values.name,
        values.email,
        values.mobile_number,
        values.address,
        values.pincode,
        values.address_type,
        values.landmark,
        values.city,
        values.state
      );
      console.log("shipping Address Response:", response);
      if (response?.id) {
        setShippingAddressId(response?.id);
        if (!isBillingAndShippingSame) {
          await formikBillingAddress.handleSubmit();
        } else {
          setBillingAddressId(response?.id);
        }
      }
    },
  });

  const formikBillingAddress = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const response = await addUserAddress(
        values.name,
        values.email,
        values.mobile_number,
        values.address,
        values.pincode,
        values.address_type,
        values.landmark,
        values.city,
        values.state
      );
      console.log("Billing Address:", response);
      if (response?.id) {
        setBillingAddressId(response?.id);
      }
    },
  });

  useEffect(() => {
    if (shippingAddressId && billingAddressId) {
      setCurrentCheckoutStep(checkoutStep.payment);
    }
  }, [billingAddressId, shippingAddressId]);

  const isAmountValid = finalAmount >= 599 && finalAmount <= 9999;
  const onSubmitPayment =
    (isCod = false, isWalletOption = false) =>
    async (values) => {
      // eslint-disable-next-line no-console
      // Calculate the payable amount and wallet money used
      let payableAmount = finalAmount;
      let walletMoneyUsed = 0;

      // Apply discount/charge first
      if (selectedPaymentMethod === "makeapayement" && finalAmount > 599) {
        payableAmount = Number(
          Math.round(
            finalAmount -
              subTotalAmount * 0.01 +
              (shippingCharge && shippingCharge.charge)
          )
        ).toFixed(2);
      } else {
        payableAmount = Number(
          Math.round(finalAmount + (shippingCharge && shippingCharge.charge))
        ).toFixed(2);
      }
      let walleAmount =
        walletMoney && walletMoney[0] && walletMoney[0].wallet_balance;

      // Apply wallet deduction
      if (isWalletMoneyChecked) {
        if (walleAmount >= payableAmount) {
          walletMoneyUsed = Math.round(payableAmount).toFixed(2); // Use the entire payable amount from wallet
          payableAmount = 0; // No amount left to pay
        } else {
          walletMoneyUsed = Math.round(walleAmount).toFixed(2); // Use all of the wallet balance
          payableAmount -= Math.round(walleAmount).toFixed(2); // Deduct wallet balance from payable amount
        }
      }
      const data = {
        orderData: {
          shipping_address_id: shippingAddressId,
          billing_address_id: billingAddressId
            ? billingAddressId
            : shippingAddressId,
          subtotal: payableAmount, // The remaining amount after wallet deduction,
          discount: discountInfo?.discount,
          coupon_code: selectedCoupon?.coupon_code,
          gift_wrapping: isGiftWrappingSelected,
          transaction_id: "-",
          is_cod: isCod,
          is_wallet_option: isWalletOption,
          shippingCharge: shippingCharge && shippingCharge.charge,
          walletMoneyUsed: walletMoneyUsed, // Amount used from wallet
        },
        products: cartProducts.map((item) => ({
          product_id: item.product_id,
          quantity: item.qty,
          final_price: item.final_price,
        })),
      };
      console.log(data, "data");
      // return;
      const response = await createOrder(data);
      if (response.order_id) {
        if (isCod || isWalletOption) {
          navigate.push(
            pagePaths.orderPlaced.replace(":orderId", response.order_id),
            { replace: true }
          );
        } else {
          const sessionData = await getPaymentSessionId(response.order_id);
          if (sessionData?.sessionId) {
            const checkoutOptions = {
              paymentSessionId: sessionData?.sessionId,
              returnUrl: urlJoin(
                env.REACT_SERVER_BASE_URL,
                basePath,
                "status",
                "{order_id}"
              ),
              cancelUrl: urlJoin(
                env.REACT_SERVER_BASE_URL,
                basePath,
                "status",
                "{order_id}"
              ),
            };
            // Call the function
            initializeCashfree()
              .then((cashfree) => {
                cashfree.checkout(checkoutOptions).then(function (result) {
                  if (result.error) {
                    alert(result.error.message);
                  }
                  if (result.redirect) {
                  }
                });
              })
              .catch((error) => {
                console.error("Error initializing Cashfree:", error);
              });
          }
        }
      }
    };

  const handlePinCodeBlur = () => {
    getAddressOnPincode(formikShippingAddress.values.pincode).then(
      (response) => {
        if (response) {
          formikShippingAddress.setFieldValue("city", response.districtname);
          formikShippingAddress.setFieldValue("state", response.statename);
          formikBillingAddress.setFieldValue("city", response.districtname);
          formikBillingAddress.setFieldValue("state", response.statename);
        } else {
          formikShippingAddress.setFieldValue("city", "");
          formikShippingAddress.setFieldValue("state", "");
          formikBillingAddress.setFieldValue("city", "");
          formikBillingAddress.setFieldValue("state", "");
        }
      }
    );
  };

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
          content="https://frontend.cureka.com/src/assets/images/logo.svg"
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

        <Tabs
          id="controlled-tab-example"
          activeKey={currentCheckoutStep}
          onSelect={(k) => setCurrentCheckoutStep(k)}
          className="mb-3 carttabs"
        >
          <Tab
            className="tab-pane-cart"
            eventKey={checkoutStep.cart}
            title="Cart"
          >
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
                        cartProducts.map((product) => {
                          return (
                            <CartProduct
                              onQuantityChange={(quantity) =>
                                onQuantityChange(quantity, product.product_id)
                              }
                              onRemoveFromCart={() =>
                                onRemoveFromCart(product?.id)
                              }
                              product={product}
                              key={product.id}
                            />
                          );
                        })}
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
                                              <img
                                                src={product_front_na_image}
                                                className="img-fluid"
                                                width="167px"
                                                height="183px"
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
                                              <img
                                                src={product_front_na_image}
                                                className="img-fluid youmay-img"
                                                width="167px"
                                                height="183px"
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
                    <div className="address-three">
                      <div
                        className="form-group mb-0 align-items-center d-flex"
                        id="gift-wrapper"
                      >
                        <input
                          type="text"
                          className="manuallyEntryCouponCode"
                          onChange={(e) =>
                            setManuallyEnteredCouponCode(e.target.value)
                          }
                          placeholder="Enter Coupon Code"
                        />
                        <div>
                          <a
                            href="javascript:void(0)"
                            onClick={() =>
                              onCouponChange(
                                { coupon_code: manuallyEnteredCouponCode },
                                true
                              )
                            }
                            className="change align-self-center"
                          >
                            Apply Coupon
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="address-three">
                      <Dropdown>
                        <Dropdown.Toggle
                          // eslint-disable-next-line react/display-name
                          as={forwardRef(({ onClick, children }, ref) => (
                            <p
                              onClick={onClick}
                              ref={ref}
                              className="coupon cursor-pointer"
                            >
                              <Image
                                className="img-fluid mr-2"
                                src={coupon}
                                width={20}
                                height={20}
                                alt="coupon"
                              />
                              {children}
                            </p>
                          ))}
                          id="custom-dropdown-button"
                        >
                          <span
                            style={{
                              color:
                                discountInfo && discountInfo.discount > 0
                                  ? "green"
                                  : "unset",
                            }}
                          >
                            {discountInfo && discountInfo.discount > 0
                              ? `Applied Coupon ${selectedCoupon?.coupon_code}`
                              : "Apply Coupon"}
                          </span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {selectedCoupon?.coupon_code && (
                            <Dropdown.Item
                              style={{ color: "#FF3333" }}
                              onClick={() => onCouponChange(null)}
                            >
                              Remove applied coupon
                            </Dropdown.Item>
                          )}
                          {!!coupons?.length &&
                            coupons?.map(({ id, coupon_code, name }) => {
                              return (
                                <Dropdown.Item
                                  onClick={() =>
                                    onCouponChange({ id, coupon_code, name })
                                  }
                                  key={id}
                                >{`${name} (${coupon_code})`}</Dropdown.Item>
                              );
                            })}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>

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

                    <button
                      onClick={
                        !isLoggedIn
                          ? handleShowLoginModel
                          : onCartContinueClicked
                      }
                      className="continue-btn mb-3 w-100"
                    >
                      <span className="text-decoration-none">Continue</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Tab>
          <Tab
            className="tab-pane-cart"
            eventKey={checkoutStep.delivery}
            title="Delivery Address"
            disabled
          >
            <div className="tab-pane" id="delivery">
              <div className="container mt-5" id="shipping-address">
                <div className="row">
                  <div className="col-lg-8">
                    <div className="order-summary">
                      <div>
                        <Form.Group className="mb-2 address_scroll">
                          <p className="summary">Select Address</p>
                          {address.length > 0 &&
                            address.map((address) => (
                              <div key={address.id} className="row">
                                <div className="col-1 align-self-center">
                                  <input
                                    className="summary_radio"
                                    type="radio"
                                    id={address.id}
                                    name="address"
                                    value={address.id}
                                    onChange={handleAddressChange}
                                    checked={selectedAddress == address.id}
                                  />
                                </div>
                                <div className="col-11">
                                  <div className="address-item">
                                    <label
                                      htmlFor={address.id}
                                      className="address-label"
                                    >
                                      <div className="address-column name-mobile d-flex">
                                        <div class="home-tab">
                                          <p class="mb-0">
                                            {address.address_type}
                                          </p>
                                        </div>
                                        <p>
                                          <strong>{address.name}</strong>
                                        </p>
                                        <p>{address.mobile}</p>
                                      </div>
                                      <div className="address-column">
                                        <div className="d-flex summary_email">
                                          <p>{address.email}</p>
                                          <p>{address.address}</p>
                                        </div>

                                        <p>
                                          {address.landmark}
                                          {address.city}, {address.state} -{" "}
                                          {address.pincode}
                                        </p>
                                      </div>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </Form.Group>
                        <div className="d-flex justify-content-center">
                          <button
                            onClick={handleAddAddress}
                            className="text-decoration-none rate-btn btn mb-2"
                          >
                            <MdAdd /> Add Address
                          </button>
                          {!addAddressShow && selectedAddress !== null && (
                            <button
                              onClick={onCartSelectedAddressContinueClicked}
                              className="text-decoration-none rate-btn btn mb-2 ml-2"
                            >
                              <span className="text-decoration-none">
                                Continue Payment
                              </span>
                            </button>
                          )}
                        </div>
                      </div>

                      {addAddressShow && (
                        <div>
                          <h2 className="ship-address">Shipping Address</h2>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label className="firstname" htmlFor="Name">
                                  Name<span className="required-star">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  id="name"
                                  name="name"
                                  value={formikShippingAddress.values.name}
                                  onChange={formikShippingAddress.handleChange}
                                  placeholder="Enter your name"
                                />
                                {formikShippingAddress.errors.name &&
                                  formikShippingAddress.touched.name && (
                                    <span className="error-text">
                                      {formikShippingAddress.errors.name}
                                    </span>
                                  )}
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label className="mobileno" htmlFor="Name">
                                  Mobile Number
                                  <span className="required-star">*</span>
                                </label>

                                <input
                                  className="form-control"
                                  type="number"
                                  id="mobile_number"
                                  name="mobile_number"
                                  value={
                                    formikShippingAddress.values.mobile_number
                                  }
                                  onChange={(event) => {
                                    const inputValue = event.target.value;
                                    const numericValue = inputValue.replace(
                                      /[^0-9]/g,
                                      ""
                                    );
                                    event.target.value = numericValue.slice(
                                      0,
                                      10
                                    );
                                    formikShippingAddress.handleChange(event);
                                  }}
                                  placeholder="Enter your Mobile Number"
                                />
                                {formikShippingAddress.errors.mobile_number &&
                                  formikShippingAddress.touched
                                    .mobile_number && (
                                    <span className="error-text">
                                      {
                                        formikShippingAddress.errors
                                          .mobile_number
                                      }
                                    </span>
                                  )}
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-12">
                              <div className="form-group">
                                <label className="email" htmlFor="email">
                                  Email<span className="required-star">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  id="email"
                                  name="email"
                                  value={formikShippingAddress.values.email}
                                  onChange={formikShippingAddress.handleChange}
                                  placeholder="Enter your mail address"
                                />
                                {formikShippingAddress.errors.email &&
                                  formikShippingAddress.touched.email && (
                                    <span className="error-text">
                                      {formikShippingAddress.errors.email}
                                    </span>
                                  )}
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-12">
                              <div className="form-group">
                                <label className="address" htmlFor="address">
                                  Address
                                  <span className="required-star">*</span>
                                </label>
                                <textarea
                                  className="form-control"
                                  type="text"
                                  id="address"
                                  rows="4"
                                  cols="50"
                                  name="address"
                                  placeholder="Type Your Address"
                                  value={formikShippingAddress.values.address}
                                  onChange={formikShippingAddress.handleChange}
                                ></textarea>
                                {formikShippingAddress.errors.address &&
                                  formikShippingAddress.touched.address && (
                                    <span className="error-text">
                                      {formikShippingAddress.errors.address}
                                    </span>
                                  )}
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label className="landmark" htmlFor="Landmark">
                                  Landmark
                                </label>

                                <input
                                  className="form-control"
                                  type="text"
                                  id="landmark"
                                  name="landmark"
                                  placeholder="Enter Landmark"
                                  value={formikShippingAddress.values.landmark}
                                  onChange={formikShippingAddress.handleChange}
                                />
                                {formikShippingAddress.errors.landmark &&
                                  formikShippingAddress.touched.landmark && (
                                    <span className="error-text">
                                      {formikShippingAddress.errors.landmark}
                                    </span>
                                  )}
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group">
                                <label className="pincode" htmlFor="Pincode">
                                  Pincode
                                </label>
                                <OverlayTrigger
                                  placement="top" // Position of the tooltip
                                  overlay={
                                    <Tooltip id="pincode-tooltip">
                                      "Please enter your 6-digit pincode, and
                                      the city and state will be filled in
                                      automatically."
                                    </Tooltip>
                                  }
                                >
                                  <input
                                    className="form-control"
                                    type="number"
                                    id="pincode"
                                    name="pincode"
                                    placeholder="Enter pincode"
                                    value={formikShippingAddress.values.pincode}
                                    onChange={
                                      formikShippingAddress.handleChange
                                    }
                                    onBlur={handlePinCodeBlur}
                                  />
                                </OverlayTrigger>
                                {formikShippingAddress.errors.pincode &&
                                  formikShippingAddress.touched.pincode && (
                                    <span className="error-text">
                                      {formikShippingAddress.errors.pincode}
                                    </span>
                                  )}
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label className="city" htmlFor="city">
                                  City<span className="required-star">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  id="city"
                                  name="text"
                                  value={formikShippingAddress.values.city}
                                  onChange={formikShippingAddress.handleChange}
                                  placeholder="Enter your City Name"
                                />
                                {formikShippingAddress.errors.city &&
                                  formikShippingAddress.touched.city && (
                                    <span className="error-text">
                                      {formikShippingAddress.errors.city}
                                    </span>
                                  )}
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label className="state" htmlFor="state">
                                  State<span className="required-star">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  id="state"
                                  name="text"
                                  value={formikShippingAddress.values.state}
                                  onChange={formikShippingAddress.handleChange}
                                  placeholder="Enter your State Name"
                                />
                                {formikShippingAddress.errors.state &&
                                  formikShippingAddress.touched.state && (
                                    <span className="error-text">
                                      {formikShippingAddress.errors.state}
                                    </span>
                                  )}
                              </div>
                            </div>
                          </div>

                          <div className="row mb-4">
                            <div className="col-lg-12">
                              <ToggleButtonGroup
                                type="radio"
                                name="address_type"
                                value={
                                  formikShippingAddress.values.address_type
                                }
                                onChange={(value) =>
                                  formikShippingAddress.setFieldValue(
                                    "address_type",
                                    value
                                  )
                                }
                                className="d-flex gap-2"
                              >
                                {["Home", "Office", "Others"].map((item) => {
                                  return (
                                    <CustomToggleButton
                                      key={item}
                                      onClick={() => {
                                        formikShippingAddress.setFieldValue(
                                          "address_type",
                                          item
                                        );
                                      }}
                                      isSelected={
                                        formikShippingAddress.values
                                          .address_type === item
                                      }
                                      value={item}
                                    >
                                      {item}
                                    </CustomToggleButton>
                                  );
                                })}
                              </ToggleButtonGroup>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-12">
                              <div className="form-group d-flex align-items-center">
                                <input
                                  type="checkbox"
                                  name="is-billing-same-as-shipping"
                                  id="is-billing-same-as-shipping"
                                  checked={isBillingAndShippingSame}
                                  onChange={() =>
                                    setIsBillingAndShippingSame((p) => !p)
                                  }
                                />
                                <label
                                  className="billing m-0 ml-2 cursor-pointer"
                                  htmlFor="is-billing-same-as-shipping"
                                >
                                  Billing address same as shipping Address
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {!isBillingAndShippingSame && addAddressShow && (
                        <div className="mt-2">
                          <h2 className="ship-address">Billing Address</h2>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label className="firstname" htmlFor="Name">
                                  Name<span className="required-star">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  id="name"
                                  name="name"
                                  value={formikBillingAddress.values.name}
                                  onChange={formikBillingAddress.handleChange}
                                  placeholder="Enter your name"
                                />
                                {formikBillingAddress.errors.name &&
                                  formikBillingAddress.touched.name && (
                                    <span className="error-text">
                                      {formikBillingAddress.errors.name}
                                    </span>
                                  )}
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label className="mobileno" htmlFor="Name">
                                  Mobile Number
                                  <span className="required-star">*</span>
                                </label>

                                <input
                                  className="form-control"
                                  type="number"
                                  id="mobile_number"
                                  name="mobile_number"
                                  value={
                                    formikBillingAddress.values.mobile_number
                                  }
                                  onChange={(event) => {
                                    const inputValue = event.target.value;
                                    const numericValue = inputValue.replace(
                                      /[^0-9]/g,
                                      ""
                                    );
                                    event.target.value = numericValue.slice(
                                      0,
                                      10
                                    );
                                    formikBillingAddress.handleChange(event);
                                  }}
                                  placeholder="Enter your Mobile Number"
                                />
                                {formikBillingAddress.errors.mobile_number &&
                                  formikBillingAddress.touched
                                    .mobile_number && (
                                    <span className="error-text">
                                      {
                                        formikBillingAddress.errors
                                          .mobile_number
                                      }
                                    </span>
                                  )}
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-12">
                              <div className="form-group">
                                <label className="email" htmlFor="email">
                                  Email<span className="required-star">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  id="email"
                                  name="email"
                                  value={formikBillingAddress.values.email}
                                  onChange={formikBillingAddress.handleChange}
                                  placeholder="Enter your mail address"
                                />
                                {formikBillingAddress.errors.email &&
                                  formikBillingAddress.touched.email && (
                                    <span className="error-text">
                                      {formikBillingAddress.errors.email}
                                    </span>
                                  )}
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-12">
                              <div className="form-group">
                                <label className="address" htmlFor="address">
                                  Address
                                  <span className="required-star">*</span>
                                </label>
                                <textarea
                                  className="form-control"
                                  type="text"
                                  id="address"
                                  rows="4"
                                  cols="50"
                                  name="address"
                                  placeholder="Type Your Address"
                                  value={formikBillingAddress.values.address}
                                  onChange={formikBillingAddress.handleChange}
                                ></textarea>
                                {formikBillingAddress.errors.address &&
                                  formikBillingAddress.touched.address && (
                                    <span className="error-text">
                                      {formikBillingAddress.errors.address}
                                    </span>
                                  )}
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label className="landmark" htmlFor="Landmark">
                                  Landmark
                                </label>

                                <input
                                  className="form-control"
                                  type="text"
                                  id="landmark"
                                  name="landmark"
                                  placeholder="Enter Landmark"
                                  value={formikBillingAddress.values.landmark}
                                  onChange={formikBillingAddress.handleChange}
                                />
                                {formikBillingAddress.errors.landmark &&
                                  formikBillingAddress.touched.landmark && (
                                    <span className="error-text">
                                      {formikBillingAddress.errors.landmark}
                                    </span>
                                  )}
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group">
                                <label className="pincode" htmlFor="Pincode">
                                  Pincode
                                </label>
                                <OverlayTrigger
                                  placement="top" // Position of the tooltip
                                  overlay={
                                    <Tooltip id="pincode-tooltip">
                                      "Please enter your 6-digit pincode, and
                                      the city and state will be filled in
                                      automatically."
                                    </Tooltip>
                                  }
                                >
                                  <input
                                    className="form-control"
                                    type="number"
                                    id="pincode"
                                    name="pincode"
                                    placeholder="Enter pincode"
                                    value={formikBillingAddress.values.pincode}
                                    onChange={formikBillingAddress.handleChange}
                                    onBlur={handlePinCodeBlur}
                                  />
                                </OverlayTrigger>
                                {formikBillingAddress.errors.pincode &&
                                  formikBillingAddress.touched.pincode && (
                                    <span className="error-text">
                                      {formikBillingAddress.errors.pincode}
                                    </span>
                                  )}
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label className="city" htmlFor="city">
                                  City<span className="required-star">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  id="city"
                                  name="text"
                                  value={formikBillingAddress.values.city}
                                  onChange={formikBillingAddress.handleChange}
                                  placeholder="Enter your City Name"
                                />
                                {formikBillingAddress.errors.city &&
                                  formikBillingAddress.touched.city && (
                                    <span className="error-text">
                                      {formikBillingAddress.errors.city}
                                    </span>
                                  )}
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label className="state" htmlFor="state">
                                  State<span className="required-star">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  id="state"
                                  name="text"
                                  value={formikBillingAddress.values.state}
                                  onChange={formikBillingAddress.handleChange}
                                  placeholder="Enter your State Name"
                                />
                                {formikBillingAddress.errors.state &&
                                  formikBillingAddress.touched.state && (
                                    <span className="error-text">
                                      {formikBillingAddress.errors.state}
                                    </span>
                                  )}
                              </div>
                            </div>
                          </div>

                          <div className="row mb-4">
                            <div className="col-lg-12">
                              <ToggleButtonGroup
                                type="radio"
                                name="address_type"
                                value={formikBillingAddress.values.address_type}
                                onChange={(value) =>
                                  formikBillingAddress.setFieldValue(
                                    "address_type",
                                    value
                                  )
                                }
                                className="d-flex gap-2"
                              >
                                {["Home", "Office", "Others"].map((item) => {
                                  return (
                                    <CustomToggleButton
                                      key={item}
                                      onClick={() => {
                                        formikBillingAddress.setFieldValue(
                                          "address_type",
                                          item
                                        );
                                      }}
                                      isSelected={
                                        formikBillingAddress.values
                                          .address_type === item
                                      }
                                      value={item}
                                    >
                                      {item}
                                    </CustomToggleButton>
                                  );
                                })}
                              </ToggleButtonGroup>
                            </div>
                          </div>
                        </div>
                      )}
                      {addAddressShow && (
                        <div className="mt-3 ml-0">
                          <button
                            onClick={() => {
                              formikShippingAddress.handleSubmit();
                              if (!isBillingAndShippingSame) {
                                formikBillingAddress.handleSubmit();
                              }
                            }}
                            className="text-decoration-none rate-btn btn"
                            href="#"
                            disabled={
                              formikBillingAddress.isSubmitting ||
                              formikShippingAddress.isSubmitting
                            }
                          >
                            Save & Delivery
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <OrderSummary
                      subTotalAmount={subTotalAmount}
                      discountInfo={discountInfo}
                      isGiftWrappingSelected={isGiftWrappingSelected}
                      finalAmount={finalAmount}
                    />{" "}
                  </div>
                </div>
              </div>
            </div>
          </Tab>
          <Tab
            className="tab-pane-cart"
            eventKey={checkoutStep.payment}
            title="Payment"
            disabled
          >
            <div className="tab-pane" id="payment">
              <div className="container mt-5" id="shipping-address">
                <div className="row">
                  <div className="col-lg-8">
                    <div className="order-summary">
                      <p className="summary" style={{ marginBottom: "10px" }}>
                        Select Payment Method
                      </p>

                      <div className="row">
                        <div className="d-flex mt-3 gap-4">
                          {/* <button
                            onClick={onSubmitPayment()}
                            className="text-decoration-none rate-btn btn"
                          >
                            Make a Payment
                          </button>
                          <button
                            onClick={onSubmitPayment(true)}
                            // onClick={isAmountValid ? onSubmitPayment(true) : null}
                            className="text-decoration-none rate-btn btn"
                            // disabled={!isAmountValid}
                            // title={!isAmountValid ? tooltipMessage : ''}
                            // data-toggle="tooltip"
                            // title="The Cash On Deleviery must be between Rs 599 to Rs 9999"
                          >
                            Cash on delivery
                          </button> */}
                          <div>
                            <input
                              type="radio"
                              id="paymentMethod1"
                              name="paymentMethod"
                              value="makeapayement"
                              checked={
                                selectedPaymentMethod === "makeapayement"
                              }
                              onChange={() =>
                                handlePaymentSelection("makeapayement")
                              }
                              className="cursor-pointer"
                              disabled={
                                isWalletMoneyChecked &&
                                walletMoney &&
                                walletMoney[0] &&
                                walletMoney[0].wallet_balance > finalAmount
                              }
                            />
                            <label
                              className="subtotal ml-2 "
                              htmlFor="paymentMethod1"
                            >
                              Make a Payment
                            </label>
                          </div>
                          <div>
                            <input
                              type="radio"
                              id="paymentMethod2"
                              name="paymentMethod"
                              value="cashOnDelivery"
                              checked={
                                selectedPaymentMethod === "cashOnDelivery"
                              }
                              onChange={() =>
                                handlePaymentSelection("cashOnDelivery")
                              }
                              className="cursor-pointer"
                              disabled={
                                isWalletMoneyChecked &&
                                walletMoney &&
                                walletMoney[0] &&
                                walletMoney[0].wallet_balance > finalAmount
                              }
                            />
                            <label
                              className="subtotal ml-2"
                              htmlFor="paymentMethod2"
                            >
                              Cash on Delivery
                            </label>
                          </div>
                        </div>
                        <div className="mb-4">
                          {/* Payment Buttons */}
                          {selectedPaymentMethod === "makeapayement" && (
                            <button
                              onClick={onSubmitPayment()}
                              className="text-decoration-none rate-btn btn"
                              disabled={
                                isWalletMoneyChecked &&
                                walletMoney &&
                                walletMoney[0] &&
                                walletMoney[0].wallet_balance > finalAmount
                              }
                            >
                              Make a Payment
                            </button>
                          )}
                          {selectedPaymentMethod === "cashOnDelivery" && (
                            <div
                              data-toggle="tooltip"
                              data-placement="right"
                              title="Cash on delivery must be between Rs 599 to Rs 9999"
                            >
                              <button
                                onClick={onSubmitPayment(true)}
                                className="text-decoration-none rate-btn btn"
                                // disabled={!isAmountValid}
                                disabled={
                                  !isAmountValid ||
                                  (isWalletMoneyChecked &&
                                    walletMoney &&
                                    walletMoney[0] &&
                                    walletMoney[0].wallet_balance > finalAmount)
                                }
                              >
                                Cash on Delivery
                              </button>
                            </div>
                          )}
                        </div>
                        {walletMoney &&
                          walletMoney[0] &&
                          walletMoney[0].wallet_balance > 0 && (
                            <div>
                              <input
                                type="checkbox"
                                id="walletMoneyCheckbox"
                                checked={isWalletMoneyChecked}
                                onChange={handleWalletMoneyToggle}
                                className="billing cursor-pointer"
                              />
                              <label
                                htmlFor="walletMoneyCheckbox"
                                className="subtotal ml-2 "
                                style={{ marginBottom: "0px" }}
                              >
                                Wallet Money -{" "}
                                <span className="total-amount">
                                  ₹
                                  {walletMoney &&
                                    walletMoney[0] &&
                                    walletMoney[0].wallet_balance}
                                </span>
                              </label>
                            </div>
                          )}

                        {walletMoney &&
                          walletMoney[0] &&
                          walletMoney[0].wallet_balance > finalAmount &&
                          isWalletMoneyChecked && (
                            <button
                              onClick={onSubmitPayment(false, true)}
                              className="text-decoration-none rate-btn btn"
                            >
                              Place Order
                            </button>
                          )}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <OrderSummary
                      subTotalAmount={subTotalAmount}
                      discountInfo={discountInfo}
                      isGiftWrappingSelected={isGiftWrappingSelected}
                      finalAmount={finalAmount}
                      selectedPaymentMethod={selectedPaymentMethod}
                      shippingCharge={shippingCharge}
                      walletMoney={
                        walletMoney &&
                        walletMoney[0] &&
                        walletMoney[0].wallet_balance
                      }
                      isWalletMoneyChecked={isWalletMoneyChecked}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>
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
