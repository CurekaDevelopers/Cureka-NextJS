"use client";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useEffect, useState } from "react";
import Autocomplete from "react-autocomplete";
import SearchAutocomplete from "../../components/SearchAutocomplete";
import { DropdownItem } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Modal from "react-bootstrap/Modal";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "../../components/navbar/Navbar";
import badgePercent from "../../public/images/badgepercent.svg";
import home from "../../public/images/home.svg";
import homeSearch from "../../public/images/homesearch.png";
import logo from "../../public/images/logo.svg";
import phone from "../../public/images/phone-call.svg";
import shoppingCart from "../../public/images/shoppingcarth.svg";
import user from "../../public/images/user.svg";
import chat from "../../public/svg-components/chat.svg";
import email from "../../public/svg-components/email.svg";
import experts from "../../public/svg-components/experts.svg";
import "../../styles/aboutus.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/cart.css";
import "../../styles/common-styles.css";
import "../../styles/contactus.css";
import "../../styles/faq.css";
import "../../styles/font-awesome.min.css";
import "../../styles/fonts.css";
import "../../styles/footer.css";
import "../../styles/header.css";
import "../../styles/home.css";

import "../../styles/loginmodal.css";
import {
  fetchCartProducts,
  fetchConcernsProductsForBrand,
  fetchNestedCategories,
  fetchWishlistProducts,
} from "../../redux/action";
import { logoutCustomer } from "../../redux/action/auth.action";
import { setShowLoginModel } from "../../redux/slices/auth.slice";
import { pagePaths } from "../../utils/constants/constant";
import api from "../../utils/api.utils";
import { apiUrls } from "../../utils/constants/api.constants";
import {
  commonHeaderFixedHeight,
  generateUrl,
} from "../../utils/constants/common.constants";
import useCustomerLoggedIn from "../../utils/hooks/useCustomerLoggedIn";
import UserLogin from "../UserLogin";
import style from "./style.module.scss";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Header({ showCategoryNavbar = true }) {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState(null);
 const [searchTerm, setSearchTerm] = useState(searchParams.get("search_term") || "");
  const [items, setItems] = useState([]);
  const { isLoggedIn, name } = useCustomerLoggedIn();
  const navigate = useRouter();
  const dispatch = useDispatch();
  const { nestedCategories, cartProducts } = useSelector(
    (state) => state.customer
  );

  const { showLoginModel } = useSelector((state) => state.auth);

  const [openMenus, setOpenMenus] = useState([]);
  const [openSubMenus, setOpenSubMenus] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const handleToggle = (index) => {
    setOpenMenus((prevOpenMenus) => {
      setIsExpanded(!isExpanded);
      const newOpenMenus = [...prevOpenMenus];
      newOpenMenus[index] = !newOpenMenus[index];
      return newOpenMenus;
    });
  };
  const handleToggleSubcat = (subcategoryIndex) => {
    setOpenSubMenus((prevOpenSubMenus) => {
      setIsExpanded(!isExpanded);
      const newOpenSubMenus = [...prevOpenSubMenus];
      newOpenSubMenus[subcategoryIndex] = !newOpenSubMenus[subcategoryIndex];
      return newOpenSubMenus;
    });
  };
  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (autocompleteRef.current) {
      // If you want to trigger scrollIntoView or focus on the autocomplete
      autocompleteRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [items]);

  useEffect(() => {
    const categoryId = searchParams.get("category_id") || "";
    if (nestedCategories?.length && categoryId) {
      const category = nestedCategories.find(
        (item) => item.id === Number(categoryId)
      );
      setCategory(category || null);
    }
  }, [nestedCategories, searchParams]);

  useEffect(() => {
    dispatch(fetchNestedCategories());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCartProducts(1));
      dispatch(fetchWishlistProducts(1));
    }
  }, [dispatch, isLoggedIn]);

  const onCategoryChange = (category) => () => {
    setCategory(category);
  };

  function handleSearch(event) {
    setSearchTerm(event.target.value);
  }
  useEffect(() => {
      if (searchTerm.length >= 3) {
        fetchItems(searchTerm);
      } else {
        setItems([]);
      }
    }, [searchTerm]);

  // const fetchItems = async (searchTerm) => {
  //   // Simulate async data fetching, replace with your actual API call
  //   const response = await api.get(
  //     apiUrls.productsSuggestions + "?search_term=" + searchTerm
  //   );
  //   return [
  //     response.data.brands,
  //     response.data.categories,
  //     response.data.products,
  //     response.data.concerns,
  //   ];
  // };
  
  // const handleInputChange = async (event) => {
  //   const newValue = event.target.value;
  //   setSearchTerm(newValue);

  //   if (newValue.length < 3) {
  //     setItems([]);
  //     return;
  //   }

  //   const fetchedItems = await fetchItems(newValue);
  //   setItems([fetchedItems]);
  // };
  // const handleSelect = (value) => {
  //   setSearchTerm(value);
  //   // Optionally, do something with the selected value
  // };
  const fetchItems = async (term) => {
    try {
      console.log("Fetching suggestions for:", term);
      const response = await api.get(`${apiUrls.productsSuggestions}?search_term=${term}`);
      console.log("API Response:", response.data);
  
      const { brands, categories, products, concerns } = response.data;
  
      setItems([
        { type: "Brands", data: brands },
        { type: "Concerns", data: concerns },
        { type: "Categories", data: categories },
        { type: "Products", data: products },
      ]);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setItems([]);
    }
  };
  

  const handleInputChange = (value) => {
    setSearchTerm(value); // Fix: Accepts the string directly instead of event
  };
  const handleSelect = (item,type) => {
      console.log(item);
      
      switch (type) {
          case "Categories":
            router.push(`/product-category/${item.slug}`);
            break;
          case "Concerns":
            router.push(`/concern/${preprocessConcernName(item.name)}`);
            break;
          case "Products":
            router.push(`${generateUrl(item)}`);
            break;
          case "Brands":
            router.push(`/product-brands/${item.name}`);
            break;
          default:
            console.warn("Unknown item type:", type);
        }
  };

  const onSearchClicked = () => {
    let searchPageUrl = `${pagePaths.products}?search_term=${searchTerm}`;
    if (category?.name) {
      // searchPageUrl += `&category_name=${category?.name}`;
      searchPageUrl += `&category_id=${category?.id}`;
    }
    //navigate(searchPageUrl);
    navigate(encodeURI(searchPageUrl));
  };

  const onSearchFormSubmit = (e) => {
    e.preventDefault();
    onSearchClicked();
  };

  const handleCloseLoginModel = () => dispatch(setShowLoginModel(false));
  const handleShowLoginModel = () => dispatch(setShowLoginModel(true));

  // const [showRightSliderModal, setShowRightSliderModal] = useState(false);

  // const handleShowRightSliderModal = () => setShowRightSliderModal(true);
  // const handleCloseRightSliderModal = () => setShowRightSliderModal(false);

  const navigateTo = (path) => () => {
    navigate.push(path);
  };
  const [open, setOpen] = useState(false);
  const [nutrition, setNutrition] = useState(false);
  const [protein, setProtein] = useState(false);
  const [gainers, setGainers] = useState(false);
  const [foods, setFoods] = useState(false);
  const [acids, setAcids] = useState(false);
  const [vitamins, setVitamins] = useState(false);
  const [minerals, setMinerals] = useState(false);
  const [health, setHealth] = useState(false);
  const [supplements, setSupplements] = useState(false);
  const [weight, setWeight] = useState(false);
  const [workout, setWorkout] = useState(false);
  const [devices, setDevices] = useState(false);
  const [herbal, setHerbal] = useState(false);
  const [wellness, setWellness] = useState(false);
  const [relief, setRelief] = useState(false);
  const [hair, setHair] = useState(false);
  const [skin, setSkin] = useState(false);
  const [elderly, setEldery] = useState(false);
  const [sexual, setSexual] = useState(false);
  const [protein1, setProtein1] = useState(false);
  const [protein2, setProtein2] = useState(false);
  const [protein3, setProtein3] = useState(false);
  const [protein4, setProtein4] = useState(false);
  const [protein5, setProtein5] = useState(false);
  const [protein6, setProtein6] = useState(false);
  const [protein7, setProtein7] = useState(false);
  const [protein8, setProtein8] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [marginTop, setMarginTop] = useState(commonHeaderFixedHeight);

  const handleConcernsProducts = (item) => {
    dispatch(fetchConcernsProductsForBrand({ item })); // this is function copy from concerns
    navigate.push("/product-brands/" + item);
    // dispatch(fetchConcerns());
  };

  const handleAlert = () => {
    setMarginTop(marginTop - 39);
    setShowLoginModel(false);
  };

  // Function to preprocess and encode concern names
  const preprocessConcernName = (name) => {
    // Replace spaces and slashes with hyphens
    let formattedName = name.replace(/\s+/g, "-").replace(/\//g, "-");
    // Collapse multiple hyphens into one
    formattedName = formattedName.replace(/-+/g, "-");

    return encodeURIComponent(formattedName);
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

  const handleLogout = () => {
    // Call your logout action
    dispatch(logoutCustomer(navigate));
    // Close the login modal
    setShowLoginModel(false);
    // Navigate to the home page
    navigate.push(pagePaths.home);
  };

  return (
    <>
      <div className="container-fluid header-border header-fixed px-0">
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

        <div className="container" id="header">
          <nav className="navbar navbar-expand-lg navbar-light bg-white justify-content-between align-items-center px-0">
            <div className="mobilelogo">
              <Button
                className="navbar-toggler"
                data-target="#mySidenav"
                onClick={handleShow}
              >
                <FontAwesomeIcon
                  icon={faBars}
                  size="lg"
                  style={{ color: "#696f72" }}
                />
              </Button>
              <Link className="navbar-brand" href="/">
                <Image
                  className="img-responsive d-block"
                  src={logo}
                  width={142}
                  height={47}
                  alt="cureka-logo"
                />
              </Link>
            </div>

            <div className="cart-icon">
              <ul className="navbar-nav align-items-center">
                <li className="nav-item d-lg-none d-block">
                  {!isLoggedIn ? (
                    <ul>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="modal"
                          // href="#loginModal"
                          // data-target="#loginModal"
                          onClick={!isLoggedIn ? handleShowLoginModel : null}
                        >
                          <Image
                            className="img-fluid mr-2"
                            src={user}
                            width={20}
                            height={20}
                            alt="badge"
                          />
                          Hello, Login
                        </a>
                      </li>
                    </ul>
                  ) : (
                    <div className={style.userDropdown}>
                      <Image
                        className="img-fluid mr-2"
                        src={user}
                        width={20}
                        height={20}
                        alt="badge"
                      />
                      <DropdownButton
                        menuVariant="dark"
                        title={name}
                        className={style.userDropdownBtn}
                        style={{ zIndex: "100000" }}
                      >
                        <Dropdown.Item
                          onClick={navigateTo(pagePaths.myAccount)}
                        >
                          My Account
                        </Dropdown.Item>
                        <Dropdown.Item onClick={navigateTo(pagePaths.myOrders)}>
                          My Orders
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={navigateTo(pagePaths.myWishlist)}
                        >
                          My Wishlist
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout}>
                          Log Out
                        </Dropdown.Item>
                      </DropdownButton>
                    </div>
                  )}
                </li>

                <li className="nav-item d-lg-none d-block">
                  <a className="nav-link" href="cart">
                    <Image
                      className="img-fluid"
                      src={shoppingCart}
                      width={20}
                      height={20}
                      alt="shopping-cart"
                    />
                  </a>
                </li>
              </ul>
            </div>
            <div className="d-none d-lg-block">
              <ul className="navbar-nav align-items-center">
                <li>
                  <DropdownButton
                    id="dropdown-toggle"
                    title={category?.name || "All"}
                  >
                    <Dropdown.Item onClick={onCategoryChange(null)}>
                      All
                    </Dropdown.Item>

                    {!!nestedCategories?.length &&
                      nestedCategories?.map((item) => {
                        if (item.nav_link?.trim().toLowerCase() !== "active")
                          return null;
                        return (
                          <Dropdown.Item
                            key={item.id}
                            onClick={onCategoryChange(item)}
                          >
                            {item.name}
                          </Dropdown.Item>
                        );
                      })}
                  </DropdownButton>
                </li>
                <ul>
                  <li className="nav-item">
                    <div className="form-group mb-0">
                      <form
                        onSubmit={onSearchFormSubmit}
                        className="d-flex search"
                        style={{ position: "relative", zIndex: "9999" }}
                      >
                        <div ref={autocompleteRef}>
                          {/* <Autocomplete
                            inputProps={{
                              placeholder: "Search For “Skin Care”",
                              className: "form-control border-0",
                            }}
                            getItemValue={(item) => ""}
                            items={items}
                            renderItem={(item, isHighlighted) => {
                              const [brands, categories, products, concerns] =
                                item;

                              const highlightSearchString = (text) => {
                                const searchedString = searchTerm;
                                const regex = new RegExp(
                                  `(${searchedString})`,
                                  "gi"
                                );
                                const parts = text.split(regex);
                                return parts.map((part, index) =>
                                  regex.test(part) ? (
                                    <strong key={index}>{part}</strong>
                                  ) : (
                                    part
                                  )
                                );
                              };

                              const renderBrands = () => (
                                <>
                                  {!!brands?.length && (
                                    <>
                                      <div className={style.searchLabels}>
                                        BRANDS
                                      </div>
                                      {brands.map((brand, index) => (
                                        <div
                                          className={style.brandDetails}
                                          key={`brand-${brand.name}-${index}`}
                                        >
                                          <a
                                            className={style.brandName}
                                            href={`/product-brands/${brand.name}`}
                                          >
                                            {highlightSearchString(brand.name)}
                                          </a>
                                        </div>
                                      ))}
                                    </>
                                  )}
                                </>
                              );

                              const renderConcerns = () => (
                                <>
                                  {!!concerns?.length && (
                                    <>
                                      <div className={style.searchLabels}>
                                        CONCERNS
                                      </div>
                                      {concerns.map((concern, index) => (
                                        <div
                                          className={style.brandDetails}
                                          key={`concern-${concern.name}-${index}`}
                                        >
                                          <a
                                            className={style.brandName}
                                            href={`/concern/${preprocessConcernName(
                                              concern.name
                                            )}`}
                                          >
                                            {highlightSearchString(
                                              concern.name
                                            )}
                                          </a>
                                        </div>
                                      ))}
                                    </>
                                  )}
                                </>
                              );

                              const renderCategories = () => (
                                <>
                                  {!!categories?.length && (
                                    <>
                                      <div className={style.searchLabels}>
                                        CATEGORIES
                                      </div>
                                      {categories.map((category, index) => (
                                        <div
                                          className={style.categoryDetails}
                                          key={`category-${category.slug}-${index}`}
                                        >
                                          <a
                                            className={style.categoryName}
                                            href={`/product-category/${category.slug}`}
                                          >
                                            {highlightSearchString(
                                              category.name
                                            )}
                                          </a>
                                        </div>
                                      ))}
                                    </>
                                  )}
                                </>
                              );

                              const renderProducts = () => (
                                <>
                                  {!!products?.length && (
                                    <>
                                      <div className={style.searchLabels}>
                                        PRODUCTS
                                      </div>
                                      <div className={style.productList}>
                                        {products.map((product, index) => (
                                          <a
                                            className={style.productDetails}
                                            href={generateUrl(product)}
                                            key={`product-${product.id}-${index}`}
                                          >
                                            <div className={style.productImg}>
                                              {product.product_images?.length >
                                              0 ? (
                                                <Image
                                                  src={
                                                    product.product_images[0]
                                                      ?.image
                                                  }
                                                />
                                              ) : (
                                                <div>No Image Available</div>
                                              )}
                                            </div>
                                            <div className={style.productInfo}>
                                              <div
                                                className={style.productName}
                                              >
                                                {highlightSearchString(
                                                  product.vendor_article_name
                                                )}
                                              </div>
                                              <div
                                                className={
                                                  style.productPriceSection
                                                }
                                              >
                                                {product.mrp ===
                                                product.final_price ? (
                                                  <p className="product-categorytwo">
                                                    ₹{product.mrp}
                                                  </p>
                                                ) : (
                                                  <>
                                                    {!!product.mrp && (
                                                      <div
                                                        className={
                                                          style.productMrp
                                                        }
                                                      >
                                                        ₹{product.mrp}
                                                      </div>
                                                    )}
                                                    <div>
                                                      ₹{product.final_price}
                                                    </div>
                                                    <div>
                                                      Inclusive of all taxes
                                                    </div>
                                                  </>
                                                )}
                                              </div>
                                            </div>
                                          </a>
                                        ))}
                                      </div>
                                    </>
                                  )}
                                </>
                              );

                              return (
                                <div className={style.searchResults}>
                                  {renderBrands()}
                                  {renderConcerns()}
                                  {renderCategories()}
                                  {renderProducts()}
                                </div>
                              );
                            }}
                            value={searchTerm}
                            onChange={handleInputChange}
                            onSelect={handleSelect}
                          /> */}
                          <SearchAutocomplete items={items} onSelect={handleSelect} onChange={handleInputChange} />
                        </div>
                        <Image
                          onClick={onSearchClicked}
                          className="img-fluid search-icon"
                          src={homeSearch}
                          width={16}
                          alt="search"
                        />
                      </form>
                    </div>
                  </li>
                </ul>
                <ul>
                  <li>
                    <div className="cart-icon iconspace">
                      <div className="text-links d-lg-flex d-flex-column align-items-center">
                        <li className="nav-item gap-2">
                          <a className="nav-link" href={pagePaths.offers}>
                            <Image
                              className="img-fluid mr-4  d-lg-block d-none"
                              src={badgePercent}
                              width={20}
                              height={20}
                              alt="badge"
                            />
                            Offers
                          </a>
                        </li>
                        {!isLoggedIn ? (
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="modal"
                              // href="#loginModal"
                              // data-target="#loginModal"
                              style={{ cursor: "pointer" }}
                              onClick={
                                !isLoggedIn ? handleShowLoginModel : null
                              }
                            >
                              <Image
                                className="img-fluid mr-2"
                                src={user}
                                width={20}
                                height={20}
                                alt="badge"
                              />
                              Hello, Login
                            </a>
                          </li>
                        ) : (
                          <div className={style.userDropdown}>
                            <Image
                              className="img-fluid mr-2"
                              src={user}
                              width={20}
                              height={20}
                              alt="badge"
                            />
                            <DropdownButton
                              menuVariant="dark"
                              title={name}
                              className={style.userDropdownBtn}
                            >
                              <Dropdown.Item
                                onClick={navigateTo(pagePaths.myAccount)}
                              >
                                My Account
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={navigateTo(pagePaths.myOrders)}
                              >
                                My Orders
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={navigateTo(pagePaths.myWishlist)}
                              >
                                My Wishlist
                              </Dropdown.Item>
                              <Dropdown.Item onClick={handleLogout}>
                                Log Out
                              </Dropdown.Item>
                            </DropdownButton>
                          </div>
                        )}

                        <li className="nav-item">
                          <Link className="nav-link" href={pagePaths.cart}>
                            <div className={style.cartItemBadge}>
                              <Image
                                className="img-fluid mr-2"
                                src={shoppingCart}
                                width={20}
                                height={20}
                                alt="user"
                              />
                              <div className={style.cartItemBadgeCount}>
                                {cartProducts?.length}
                              </div>
                            </div>
                            Cart
                          </Link>
                        </li>

                        <li className="nav-item mb-3">
                          <div id="helpdesk">
                            <DropdownButton title="Help Desk">
                              <div className="d-flex">
                                <div className="col-6">
                                  <h2 className="section">Contact Us</h2>
                                  <Dropdown.Item
                                    href="https://api.whatsapp.com/send?phone=917200150536"
                                    className="d-flex"
                                  >
                                    <Image
                                      className="img-fluid mr-2 d-lg-block d-none"
                                      src={chat}
                                      width={20}
                                      height={20}
                                      alt="chat"
                                    />
                                    Chat with US
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    href="mailto:care@cureka.com"
                                    className="d-flex"
                                  >
                                    <Image
                                      className="img-fluid mr-2 d-lg-block d-none"
                                      src={email}
                                      width={20}
                                      height={20}
                                      alt="email"
                                    />
                                    Email
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    href="https://api.whatsapp.com/send?phone=917200150536"
                                    className="d-flex"
                                  >
                                    <Image
                                      className="img-fluid mr-2 d-lg-block d-none"
                                      src={experts}
                                      width={20}
                                      height={20}
                                      alt="experts"
                                    />
                                    Ask our Experts
                                  </Dropdown.Item>
                                </div>
                                <div className="col-6 border-left ml-2">
                                  <h2 className="section">Helpful Links</h2>
                                  <Dropdown.Item
                                    href="/TrackOrder"
                                    className="d-flex"
                                  >
                                    Track your order
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    href="/Privacypolicy"
                                    className="d-flex"
                                  >
                                    Privacy Policy
                                  </Dropdown.Item>
                                  <Dropdown.Item href="/faq" className="d-flex">
                                    FAQ's
                                  </Dropdown.Item>
                                </div>
                              </div>
                              <div className="contactus p-3 mx-2 mt-3">
                                <p className="section mb-2">
                                  For Support & Order Enquiries
                                </p>
                                <a
                                  className="review-heading"
                                  href="tel:+91 9655928004"
                                >
                                  Call Us at: +91 9655928004
                                </a>
                                <p className="review-heading">
                                  Mon to Sat - 10:00 AM to 06:00 PM
                                </p>
                              </div>
                            </DropdownButton>
                          </div>
                        </li>
                      </div>
                    </div>
                  </li>
                </ul>
              </ul>
            </div>
          </nav>
          <div className="container px-0 d-block d-lg-none">
            <ul className="list-unstyled mobile-dropdown border-0 d-flex-column">
              {/* side scroll bar with dropdown */}

              <div
                className="text-links d-lg-flex d-flex-column sidenav"
                id="mySidenav"
                style={{}}
              >
                {/* <a href="javascript:void(0)" className="closebtn" onClick={handleCloseSidenav}>
                  &times;
                </a> */}
                <Offcanvas
                  show={show}
                  onHide={handleClose}
                  className="sidenav-body"
                >
                  <div
                    className="blue-wrapper"
                    style={{ padding: "10px" }}
                  ></div>
                  <Offcanvas.Body>
                    {" "}
                    <li className="nav-item">
                      <div
                        className="panel-group border-bottom"
                        id="accordion"
                        role="tablist"
                        aria-multiselectable="true"
                      >
                        <Button
                          title={category?.name || "All"}
                          className="category-btn accord"
                          onClick={() => setOpen(!open)}
                          aria-controls="collapse-allcategory"
                          aria-expanded={open}
                        >
                          All Categories
                          <i
                            className={open ? "fas fa-minus" : "fas fa-plus"}
                          ></i>
                        </Button>
                        <Collapse in={open}>
                          <div
                            id="collapse-allcategory"
                            className="panel-collapse collapse in"
                            role="tabpanel"
                            aria-labelledby="heading-category"
                          >
                            <div
                              className="panel-group"
                              id="accordion"
                              role="tablist"
                              aria-multiselectable="true"
                            >
                              {!!nestedCategories.length &&
                                nestedCategories?.map((cat, index) => {
                                  const isMenuOpen = openMenus[index];
                                  return (
                                    <div key={cat.id}>
                                      <div className="panel panel-default">
                                        <div className="d-flex justify-content-between">
                                          <DropdownItem
                                            className="category-btns"
                                            key={cat.id}
                                            onClick={() => handleToggle(index)}
                                          >
                                            <Link
                                              href={`/product-category/${cat.slug}`}
                                            >
                                              <h2 className="items-title">
                                                {cat.name}
                                              </h2>
                                            </Link>
                                            {cat.sub_categories.length > 0 && (
                                              <i
                                                className={
                                                  isMenuOpen
                                                    ? "fas fa-minus"
                                                    : "fas fa-plus"
                                                }
                                              ></i>
                                            )}
                                          </DropdownItem>
                                        </div>

                                        {cat.sub_categories.length > 0 &&
                                          cat.sub_categories?.map(
                                            (subcat, subcategoryIndex) => {
                                              const isSubMenuOpen =
                                                openSubMenus[subcategoryIndex];
                                              return (
                                                <div key={subcat.id}>
                                                  <Collapse
                                                    style={{
                                                      display: isMenuOpen
                                                        ? "block"
                                                        : "none",
                                                    }}
                                                  >
                                                    <div
                                                      id="collapse-subcategory"
                                                      className="panel-collapse collapse in"
                                                      role="tabpanel"
                                                      aria-labelledby="heading-category"
                                                    >
                                                      <div
                                                        className="panel-group"
                                                        id="accordion"
                                                        role="tablist"
                                                        aria-multiselectable="true"
                                                      >
                                                        <div className="panel panel-default panel-title">
                                                          <div className="d-flex justify-content-between">
                                                            <DropdownItem
                                                              className="category-btns"
                                                              key={subcat.id}
                                                              aria-controls="collapse-subcategory"
                                                              onClick={() =>
                                                                handleToggleSubcat(
                                                                  subcategoryIndex
                                                                )
                                                              }
                                                            >
                                                              <Link
                                                                href={`/product-category/${cat.slug}/${subcat.slug}`}
                                                              >
                                                                <h2 className="items-title">
                                                                  {subcat.name}
                                                                </h2>
                                                              </Link>
                                                              {subcat
                                                                .sub_sub_categories
                                                                .length > 0 && (
                                                                <i
                                                                  className={
                                                                    isSubMenuOpen
                                                                      ? "fas fa-minus"
                                                                      : "fas fa-plus"
                                                                  }
                                                                ></i>
                                                              )}
                                                            </DropdownItem>
                                                          </div>

                                                          {subcat
                                                            .sub_sub_categories
                                                            .length > 0 &&
                                                            subcat.sub_sub_categories?.map(
                                                              (subsubcat) => {
                                                                return (
                                                                  <Collapse
                                                                    style={{
                                                                      display:
                                                                        openSubMenus[
                                                                          subcategoryIndex
                                                                        ]
                                                                          ? "block"
                                                                          : "none",
                                                                    }}
                                                                  >
                                                                    <div
                                                                      id="collapse-subsubcategory"
                                                                      className="panel-collapse collapse in"
                                                                      role="tabpanel"
                                                                      aria-labelledby="heading-category"
                                                                    >
                                                                      <div
                                                                        className="panel-group"
                                                                        id="accordion"
                                                                        role="tablist"
                                                                        aria-multiselectable="true"
                                                                      >
                                                                        <div className="panel panel-default panel-title">
                                                                          <DropdownItem
                                                                            className="category-btns"
                                                                            key={
                                                                              subsubcat.name
                                                                            }
                                                                            onClick={() =>
                                                                              setShow(
                                                                                !show
                                                                              )
                                                                            }
                                                                            aria-controls="collapse-subsubcategory"
                                                                          >
                                                                            <Link
                                                                              className="mobile-items"
                                                                              href={`/product-category/${cat.slug}/${subcat.slug}/${subsubcat.slug}`}
                                                                            >
                                                                              {
                                                                                subsubcat.name
                                                                              }
                                                                            </Link>
                                                                          </DropdownItem>
                                                                        </div>
                                                                      </div>
                                                                    </div>
                                                                  </Collapse>
                                                                );
                                                              }
                                                            )}
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </Collapse>
                                                </div>
                                              );
                                            }
                                          )}
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        </Collapse>
                      </div>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link-item border-bottom" href="offers">
                        Offers
                      </a>
                    </li>
                    <li className="nav-item">
                      <div id="helpdesk">
                        <div className="col-12">
                          <div className="row">
                            <a
                              href="https://api.whatsapp.com/send?phone=917200150536"
                              className="nav-link-item border-bottom"
                            >
                              <Image
                                className="img-fluid mr-2 d-lg-block d-none"
                                src={chat}
                                width={20}
                                height={20}
                                alt="chat"
                              />
                              Chat with Us
                            </a>

                            <a
                              href="https://api.whatsapp.com/send?phone=917200150536"
                              className="nav-link-item border-bottom"
                            >
                              <Image
                                className="img-fluid mr-2 d-lg-block d-none"
                                src={experts}
                                width={20}
                                height={20}
                                alt="experts"
                              />
                              Ask our Experts
                            </a>
                            <a
                              href="/TrackOrder"
                              className="nav-link-item border-bottom"
                            >
                              Track your order
                            </a>
                            <a
                              href="/Privacypolicy"
                              className="nav-link-item border-bottom"
                            >
                              Privacy Policy
                            </a>
                            <a
                              href="/faq"
                              className="nav-link-item border-bottom"
                            >
                              FAQ's
                            </a>
                          </div>
                          <div class="row">
                            <h2 className="nav-link-item border-bottom">
                              Contact Us
                            </h2>
                            <div className="row justify-content-center align=items-center px-0 border-bottom">
                              <div className="col py-3 px-2 border-right">
                                <Image
                                  className="img-fluid mx-auto d-block"
                                  src={phone}
                                  width="17px"
                                  height="17px"
                                  alt="phone"
                                />
                                <a
                                  className="sidenavicons"
                                  href="tel:+91 9655928004"
                                >
                                  Call/Text
                                </a>
                              </div>
                              <div className="py-3 px-2 col border-right">
                                <Image
                                  className="img-fluid mx-auto d-block"
                                  src={email}
                                  width="17px"
                                  height="17px"
                                  alt="email"
                                />
                                <a
                                  href="mailto:care@cureka.com"
                                  className="sidenavicons"
                                >
                                  Email Us
                                </a>
                              </div>
                              <div className="py-3 px-2 col">
                                <Image
                                  className="img-fluid mx-auto d-block"
                                  src={home}
                                  width="17px"
                                  height="17px"
                                  alt="home"
                                />
                                <a className="sidenavicons" href="/">
                                  Home
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </Offcanvas.Body>
                  <Offcanvas.Header closeButton>
                    <span>CLOSE</span>
                  </Offcanvas.Header>
                </Offcanvas>
              </div>
              <li className="nav-item">
                <div className="form-group mb-0">
                  <form
                    onSubmit={onSearchFormSubmit}
                    className="d-flex search"
                    style={{ position: "relative", zIndex: "9999" }}
                  >
                    <div ref={autocompleteRef}>
                      <Autocomplete
                        inputProps={{
                          placeholder: "Search For “Skin Care”",
                          className: "form-control border-0",
                        }}
                        getItemValue={(item) => ""}
                        items={items}
                        renderItem={(item, isHighlighted) => {
                          const [brands, categories, products, concerns] = item;

                          const highlightSearchString = (text) => {
                            const searchedString = searchTerm;
                            const regex = new RegExp(
                              `(${searchedString})`,
                              "gi"
                            );
                            const parts = text.split(regex);
                            return parts.map((part, index) =>
                              regex.test(part) ? (
                                <strong key={index}>{part}</strong>
                              ) : (
                                part
                              )
                            );
                          };

                          const renderBrands = () => (
                            <>
                              {!!brands?.length && (
                                <>
                                  <div className={style.searchLabels}>
                                    BRANDS
                                  </div>
                                  {brands.map((brand, index) => (
                                    <div
                                      className={style.brandDetails}
                                      key={`brand-${brand.name}-${index}`}
                                    >
                                      <a
                                        className={style.brandName}
                                        href={`/product-brands/${brand.name}`}
                                      >
                                        {highlightSearchString(brand.name)}
                                      </a>
                                    </div>
                                  ))}
                                </>
                              )}
                            </>
                          );

                          const renderConcerns = () => (
                            <>
                              {!!concerns?.length && (
                                <>
                                  <div className={style.searchLabels}>
                                    CONCERNS
                                  </div>
                                  {concerns.map((concern, index) => (
                                    <div
                                      className={style.brandDetails}
                                      key={`concern-${concern.name}-${index}`}
                                    >
                                      <a
                                        className={style.brandName}
                                        href={`/concern/${preprocessConcernName(
                                          concern.name
                                        )}`}
                                      >
                                        {highlightSearchString(concern.name)}
                                      </a>
                                    </div>
                                  ))}
                                </>
                              )}
                            </>
                          );

                          const renderCategories = () => (
                            <>
                              {!!categories?.length && (
                                <>
                                  <div className={style.searchLabels}>
                                    CATEGORIES
                                  </div>
                                  {categories.map((category, index) => (
                                    <div
                                      className={style.categoryDetails}
                                      key={`category-${category.slug}-${index}`}
                                    >
                                      <a
                                        className={style.categoryName}
                                        href={`/product-category/${category.slug}`}
                                      >
                                        {highlightSearchString(category.name)}
                                      </a>
                                    </div>
                                  ))}
                                </>
                              )}
                            </>
                          );

                          const renderProducts = () => (
                            <>
                              {!!products?.length && (
                                <>
                                  <div className={style.searchLabels}>
                                    PRODUCTS
                                  </div>
                                  <div className={style.productList}>
                                    {products.map((product, index) => (
                                      <a
                                        className={style.productDetails}
                                        href={generateUrl(product)}
                                        key={`product-${product.id}-${index}`}
                                      >
                                        <div className={style.productImg}>
                                          {product.product_images?.length >
                                          0 ? (
                                            <Image
                                              src={
                                                product.product_images[0]?.image
                                              }
                                            />
                                          ) : (
                                            <div>No Image Available</div>
                                          )}
                                        </div>
                                        <div className={style.productInfo}>
                                          <div className={style.productName}>
                                            {highlightSearchString(
                                              product.vendor_article_name
                                            )}
                                          </div>
                                          <div
                                            className={
                                              style.productPriceSection
                                            }
                                          >
                                            {product.mrp ===
                                            product.final_price ? (
                                              <p className="product-categorytwo">
                                                ₹{product.mrp}
                                              </p>
                                            ) : (
                                              <>
                                                {!!product.mrp && (
                                                  <div
                                                    className={style.productMrp}
                                                  >
                                                    ₹{product.mrp}
                                                  </div>
                                                )}
                                                <div>
                                                  ₹{product.final_price}
                                                </div>
                                                <div>
                                                  Inclusive of all taxes
                                                </div>
                                              </>
                                            )}
                                          </div>
                                        </div>
                                      </a>
                                    ))}
                                  </div>
                                </>
                              )}
                            </>
                          );

                          return (
                            <div className={style.searchResults}>
                              {renderBrands()}
                              {renderConcerns()}
                              {renderCategories()}
                              {renderProducts()}
                            </div>
                          );
                        }}
                        value={searchTerm}
                        onChange={handleInputChange}
                        onSelect={handleSelect}
                      />
                    </div>

                    <Image
                      onClick={onSearchClicked}
                      className="img-fluid search-icon"
                      src={homeSearch}
                      width={16}
                      height={16}
                      alt="search"
                    />
                  </form>
                </div>
              </li>

              <li className="nav-item">
                <DropdownButton
                  id="dropdown-toggles"
                  title={category?.name || "All"}
                  style={{ border: "1px solid #004a98" }}
                >
                  <Dropdown.Item onClick={onCategoryChange(null)}>
                    All
                  </Dropdown.Item>

                  {!!nestedCategories?.length &&
                    nestedCategories?.map((cat) => {
                      return (
                        <Dropdown.Item
                          key={cat.id}
                          onClick={onCategoryChange(cat)}
                        >
                          {cat.name}
                        </Dropdown.Item>
                      );
                    })}
                </DropdownButton>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        className="d-lg-block d-none"
        style={{ marginTop: marginTop + "px" }}
      >
        {null}
      </div>

      {showCategoryNavbar && <Navbar />}
      <Modal
        show={showLoginModel}
        onHide={handleCloseLoginModel}
        dialogClassName="right_slidemodal-slider"
        id="loginModal"
        backdrop="static" // Prevents closing on backdrop click
        keyboard={false} // Optional: Prevent closing with Esc key
      >
        <div className="blue-wrapper" style={{ padding: 15 }}></div>
        <Modal.Body>
          <UserLogin handleCloseLoginModel={handleCloseLoginModel} />
        </Modal.Body>
        <Modal.Header closeButton></Modal.Header>
      </Modal>
    </>
  );
}
