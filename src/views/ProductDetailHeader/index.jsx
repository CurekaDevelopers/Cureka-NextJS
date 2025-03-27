"use client";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Autocomplete from "react-autocomplete";
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
import Image from "next/image";

import { useSearchParams } from "next/navigation";

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
import "../../styles/bootstrap.min.css";
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
  fetchNestedCategories,
  fetchWishlistProducts,
} from "../../redux/action";
import { logoutCustomer } from "../../redux/action/auth.action";
import { setShowLoginModel } from "../../redux/slices/auth.slice";
import { pagePaths } from "../../utils/constants/constant";
import api from "../../utils/api.utils";
import { apiUrls } from "../../utils/constants/api.constants";
import {
  generateUrl,
  productHeaderFixedHeight,
} from "../../utils/constants/common.constants";
import useCustomerLoggedIn from "../../utils/hooks/useCustomerLoggedIn";
import UserLogin from "../UserLogin";
import style from "./style.module.scss";
import { useRouter } from "next/navigation";

export default function ProductdetailHeader() {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search_term") || ""
  );
  const { isLoggedIn, name } = useCustomerLoggedIn();
  const navigate = useRouter();
  const dispatch = useDispatch();
  const { nestedCategories, cartProducts } = useSelector(
    (state) => state.customer
  );
  const [items, setItems] = useState([]);
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

  useEffect(() => {
    if (nestedCategories?.length) {
      const categoryId = searchParams.get("category_id") || "";
      if (categoryId) {
        const category = nestedCategories.find(
          (item) => item.id === Number(categoryId)
        );
        setCategory(category || null);
      }
    }
  }, [nestedCategories, searchParams]);

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

  const fetchItems = async (searchTerm) => {
    // Simulate async data fetching, replace with your actual API call
    const response = await api.get(
      apiUrls.productsList + "?search_term=" + searchTerm
    );
    return [
      response.data.brands,
      response.data.categories,
      response.data.products,
    ];
  };
  const handleInputChange = async (event) => {
    const newValue = event.target.value;
    setSearchTerm(newValue);
    if (newValue.length < 3) {
      return;
    }
    const fetchedItems = await fetchItems(newValue);
    setItems([fetchedItems]);
  };
  const handleSelect = (value) => {
    setSearchTerm(value);
    // Optionally, do something with the selected value
  };

  const onSearchClicked = () => {
    let searchPageUrl = `${pagePaths.products}?search_term=${searchTerm}`;
    if (category?.name) {
      searchPageUrl += `&category_id=${category?.id}`;
    }
    router.push(searchPageUrl); // Use router.push instead of navigate.push
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
  const [marginTop, setMarginTop] = useState(productHeaderFixedHeight);

  const handleAlert = () => {
    setMarginTop(marginTop - 39);
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
  // Function to preprocess and encode concern names
  const preprocessConcernName = (name) => {
    // Replace spaces and slashes with hyphens
    let formattedName = name.replace(/\s+/g, "-").replace(/\//g, "-");
    // Collapse multiple hyphens into one
    formattedName = formattedName.replace(/-+/g, "-");

    return encodeURIComponent(formattedName);
  };
  const handleLogout = () => {
    // Call your logout action
    dispatch(logoutCustomer(navigate));
    // Close the login modal
    setShowLoginModel(false);
    // navigate to the home page
    navigate.push(pagePaths.home);
  };
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
                  <Link href="/" className="explore">
                    Explore
                  </Link>
                </p>
              </Alert>
            </div>
          </>
        )}
        <div className="container" id="header">
          <nav className="navbar navbar-expand-lg navbar-light bg-white justify-content-between align-items-center">
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
              <Link href="/" className="navbar-brand">
                <Image
                  className="img-responsive d-block"
                  src={logo}
                  width="112px"
                  height="47px"
                  alt="cureka-logo"
                />
              </Link>
            </div>

            <div className="cart-icon">
              <ul className="d-lg-none d-block">
                {!isLoggedIn ? (
                  <li className="nav-item">
                    <button
                      className="nav-link bg-transparent border-0 p-0"
                      onClick={handleShowLoginModel}
                    >
                      <Image
                        className="img-fluid mr-2"
                        src={user}
                        width="20px"
                        height="20px"
                        alt="badge"
                      />
                      Hello, Login
                    </button>
                  </li>
                ) : (
                  <li className={style.userDropdown}>
                    <Image
                      className="img-fluid mr-2"
                      src={user}
                      width="20px"
                      height="20px"
                      alt="badge"
                    />
                    <DropdownButton
                      menuVariant="dark"
                      title={name}
                      className={style.userDropdownBtn}
                    >
                      <Dropdown.Item
                        onClick={() => navigateTo(pagePaths.myAccount)}
                      >
                        My Account
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => navigateTo(pagePaths.myOrders)}
                      >
                        My Orders
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => navigateTo(pagePaths.myWishlist)}
                      >
                        My Wishlist
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout}>
                        Log Out
                      </Dropdown.Item>
                    </DropdownButton>
                  </li>
                )}
                <li className="nav-item d-lg-none d-block">
                  <Link href="/cart" className="nav-link">
                    <Image
                      className="img-fluid"
                      src={shoppingCart}
                      width="20px"
                      height="20px"
                      alt="shopping-cart"
                    />
                  </Link>
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
                <li className="nav-item">
                  <div className="form-group mb-0">
                    <form
                      onSubmit={onSearchFormSubmit}
                      className="d-flex search"
                      style={{ position: "relative", zIndex: "5" }}
                    >
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

                          const renderBrands = () => {
                            return (
                              <>
                                {!!brands?.length && (
                                  <>
                                    <div className={style.searchLabels}>
                                      BRANDS
                                    </div>
                                    <div className={style.brandList}>
                                      {brands.map((brand) => (
                                        <>
                                          <div className={style.brandDetails}>
                                            <Link
                                              className={style.brandName}
                                              href={`/product-brands/${brand.name}`}
                                            >
                                              {highlightSearchString(
                                                brand.name
                                              )}
                                            </Link>
                                          </div>
                                        </>
                                      ))}
                                    </div>
                                  </>
                                )}
                              </>
                            );
                          };

                          const renderCategories = () => {
                            return (
                              <>
                                {!!categories?.length && (
                                  <>
                                    <div className={style.searchLabels}>
                                      CATEGORIES
                                    </div>
                                    <div className={style.categoryList}>
                                      {categories.map((category) => (
                                        <>
                                          <div
                                            className={style.categoryDetails}
                                          >
                                            <Link
                                              className={style.categoryName}
                                              href={`/product-category/${category.slug}`}
                                            >
                                              {highlightSearchString(
                                                category.name
                                              )}
                                            </Link>
                                          </div>
                                        </>
                                      ))}
                                    </div>
                                  </>
                                )}
                              </>
                            );
                          };

                          const renderProducts = () => {
                            return (
                              <>
                                {!!products?.length && (
                                  <>
                                    <div className={style.searchLabels}>
                                      PRODUCTS
                                    </div>
                                    <div className={style.productList}>
                                      {products.map((product) => (
                                        <>
                                          <Link
                                            className={style.productDetails}
                                            href={generateUrl(product)}
                                          >
                                            <div className={style.productImg}>
                                              {product.product_images &&
                                              product.product_images.length >
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
                                                <div>Inclusive of all</div>
                                                <div>taxes</div>
                                              </div>
                                            </div>
                                          </Link>
                                        </>
                                      ))}
                                    </div>
                                  </>
                                )}
                              </>
                            );
                          };
                          const renderConcerns = () => {
                            return (
                              <>
                                {!!concerns?.length && (
                                  <>
                                    <div className={style.searchLabels}>
                                      Concerns
                                    </div>
                                    <div className={style.brandList}>
                                      {concerns.map((concern) => (
                                        <div
                                          key={concern.name}
                                          className={style.brandDetails}
                                        >
                                          <Link
                                            href={`/concern/${preprocessConcernName(
                                              concern.name
                                            )}`}
                                            className={style.brandName}
                                          >
                                            {highlightSearchString(
                                              concern.name
                                            )}
                                          </Link>
                                        </div>
                                      ))}
                                    </div>
                                  </>
                                )}
                              </>
                            );
                          };
                          return (
                            <div className={style.searchResults}>
                              {renderBrands()}
                              {renderCategories()}
                              {renderProducts()}
                              {renderConcerns()}
                            </div>
                          );
                        }}
                        value={searchTerm}
                        onChange={handleInputChange}
                        onSelect={handleSelect}
                      />

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

                <li>
                  <div className="cart-icon">
                    <ul className="d-lg-none d-block">
                      {!isLoggedIn ? (
                        <li className="nav-item">
                          <button
                            className="nav-link bg-transparent border-0 p-0 d-flex align-items-center"
                            onClick={handleShowLoginModel}
                            style={{ cursor: "pointer" }}
                          >
                            <Image
                              className="img-fluid mr-2"
                              src={user}
                              width="20"
                              height="20"
                              alt="User Icon"
                            />
                            Hello, Login
                          </button>
                        </li>
                      ) : (
                        <li className="nav-item">
                          <div className={style.userDropdown}>
                            <Image
                              className="img-fluid mr-2"
                              src={user}
                              width="20px"
                              height="20px"
                              alt="badge"
                            />
                            <DropdownButton
                              menuVariant="dark"
                              title={name}
                              className={style.userDropdownBtn}
                            >
                              <Dropdown.Item
                                onClick={() => navigateTo(pagePaths.myAccount)}
                              >
                                My Account
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => navigateTo(pagePaths.myOrders)}
                              >
                                My Orders
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => navigateTo(pagePaths.myWishlist)}
                              >
                                My Wishlist
                              </Dropdown.Item>
                              <Dropdown.Item onClick={handleLogout}>
                                Log Out
                              </Dropdown.Item>
                            </DropdownButton>
                          </div>
                        </li>
                      )}
                      <li className="nav-item d-lg-none d-block">
                        <Link href="/cart" className="nav-link">
                          <Image
                            className="img-fluid"
                            src={shoppingCart}
                            width={20}
                            height={20}
                            alt="Shopping Cart Icon"
                          />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
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
                {/* <Link href="javascript:void(0)" className="closebtn" onClick={handleCloseSidenav}>
                  &times;
                </Link> */}
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
                      <Link
                        className="nav-link-item border-bottom"
                        href="offers"
                      >
                        Offers
                      </Link>
                    </li>
                    <li className="nav-item">
                      <div id="helpdesk">
                        <div className="col-12">
                          <div className="row">
                            <Link
                              href="https://api.whatsapp.com/send?phone=917200150536"
                              className="nav-link-item border-bottom d-flex align-items-center"
                            >
                              <Image
                                className="img-fluid mr-2 d-lg-block d-none"
                                src={chat}
                                width="20px"
                                height="20px"
                                alt="chat"
                              />
                              <span>Chat with Us</span>
                            </Link>

                            <Link
                              href="https://api.whatsapp.com/send?phone=917200150536"
                              className="nav-link-item border-bottom d-flex align-items-center"
                            >
                              <Image
                                className="img-fluid mr-2 d-lg-block d-none"
                                src={experts}
                                width="20px"
                                height="20px"
                                alt="experts"
                              />
                              <span>Ask our Experts</span>
                            </Link>

                            <Link
                              href="TrackOrder"
                              className="nav-link-item border-bottom"
                            >
                              Track your order
                            </Link>
                            <Link
                              href="/privacy-policy-2"
                              className="nav-link-item border-bottom"
                            >
                              Privacy Policy
                            </Link>
                            <Link
                              href="/faq"
                              className="nav-link-item border-bottom"
                            >
                              FAQ's
                            </Link>
                          </div>

                          <div className="row">
                            <h2 className="nav-link-item border-bottom">
                              Contact Us
                            </h2>
                            <div className="row justify-content-center align-items-center px-0 border-bottom">
                              <div className="col py-3 px-2 border-right">
                                <Image
                                  className="img-fluid mx-auto d-block"
                                  src={phone}
                                  width="17px"
                                  height="17px"
                                  alt="phone"
                                />
                                <Link
                                  className="sidenavicons"
                                  href="tel:+919655928004"
                                >
                                  Call/Text
                                </Link>
                              </div>
                              <div className="col py-3 px-2 border-right">
                                <Image
                                  className="img-fluid mx-auto d-block"
                                  src={email}
                                  width="17px"
                                  height="17px"
                                  alt="email"
                                />
                                <Link
                                  className="sidenavicons"
                                  href="mailto:care@cureka.com"
                                >
                                  Email Us
                                </Link>
                              </div>
                              <div className="col py-3 px-2">
                                <Image
                                  className="img-fluid mx-auto d-block"
                                  src={home}
                                  width="17px"
                                  height="17px"
                                  alt="home"
                                />
                                <Link href="/" className="sidenavicons">
                                  Home
                                </Link>
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

              {/* <li className="nav-item">
                <div className="form-group mb-0">
                  <form onSubmit={onSearchFormSubmit} className="d-flex search">
                    <input
                      className="form-control border-0"
                      type="search"
                      value={searchTerm}
                      placeholder="Search For “Skin Care”"
                      aria-label="search"
                      name="search"
                      onChange={handleSearch}
                      aria-describedby="search"
                    />

                    <Image
                      onClick={onSearchClicked}
                      className="img-fluid search-icon"
                      src={homeSearch}
                      width="16px"
                      height="16px"
                      alt="search"
                    />
                  </form>
                </div>
              </li> */}
              <li className="nav-item">
                <div className="form-group mb-0">
                  <form
                    onSubmit={onSearchFormSubmit}
                    className="d-flex search"
                    style={{ position: "relative", zIndex: "5" }}
                  >
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
                          const regex = new RegExp(`(${searchedString})`, "gi");
                          const parts = text.split(regex);
                          return parts.map((part, index) =>
                            regex.test(part) ? (
                              <strong key={index}>{part}</strong>
                            ) : (
                              part
                            )
                          );
                        };

                        const renderBrands = () => {
                          return (
                            <>
                              {!!brands?.length && (
                                <>
                                  <div className={style.searchLabels}>
                                    BRANDS
                                  </div>
                                  <div className={style.brandList}>
                                    {brands.map((brand) => (
                                      <>
                                        <div className={style.brandDetails}>
                                          <a
                                            className={style.brandName}
                                            href={`/product-brands/${brand.name}`}
                                          >
                                            {highlightSearchString(brand.name)}
                                          </a>
                                        </div>
                                      </>
                                    ))}
                                  </div>
                                </>
                              )}
                            </>
                          );
                        };

                        const renderCategories = () => {
                          return (
                            <>
                              {!!categories?.length && (
                                <>
                                  <div className={style.searchLabels}>
                                    CATEGORIES
                                  </div>
                                  <div className={style.categoryList}>
                                    {categories.map((category) => (
                                      <>
                                        <div className={style.categoryDetails}>
                                          <Link
                                            className={style.categoryName}
                                            href={`/product-category/${category.slug}`}
                                          >
                                            {highlightSearchString(
                                              category.name
                                            )}
                                          </Link>
                                        </div>
                                      </>
                                    ))}
                                  </div>
                                </>
                              )}
                            </>
                          );
                        };

                        const renderProducts = () => {
                          return (
                            <>
                              {!!products?.length && (
                                <>
                                  <div className={style.searchLabels}>
                                    PRODUCTS
                                  </div>
                                  <div className={style.productList}>
                                    {products.map((product) => (
                                      <>
                                        <Link
                                          className={style.productDetails}
                                          href={generateUrl(product)}
                                        >
                                          <div className={style.productImg}>
                                            {product.product_images &&
                                            product.product_images.length >
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
                                              {!!product.mrp && (
                                                <div
                                                  className={style.productMrp}
                                                >
                                                  ₹{product.mrp}
                                                </div>
                                              )}
                                              <div>₹{product.final_price}</div>
                                              <div>Inclusive of all</div>
                                              <div>taxes</div>
                                            </div>
                                          </div>
                                        </Link>
                                      </>
                                    ))}
                                  </div>
                                </>
                              )}
                            </>
                          );
                        };
                        const renderConcerns = () => {
                          return (
                            <>
                              {!!concerns?.length && (
                                <>
                                  <div className={style.searchLabels}>
                                    Concerns
                                  </div>
                                  <div className={style.brandList}>
                                    {concerns.map((concern) => (
                                      <div className={style.brandDetails}>
                                        <Link
                                          className={style.brandName}
                                          // href={`/concern/${concern.name}`}
                                          href={`/concern/${preprocessConcernName(
                                            concern.name
                                          )}`}
                                          // href={`/concern/${encodeURIComponent(concern.name.replace(/\s+/g, '-'))}`}
                                        >
                                          {highlightSearchString(concern.name)}
                                        </Link>
                                      </div>
                                    ))}
                                  </div>
                                </>
                              )}
                            </>
                          );
                        };
                        return (
                          <div className={style.searchResults}>
                            {renderBrands()}
                            {renderCategories()}
                            {renderProducts()}
                            {renderConcerns()}
                          </div>
                        );
                      }}
                      value={searchTerm}
                      onChange={handleInputChange}
                      onSelect={handleSelect}
                    />

                    <Image
                      onClick={onSearchClicked}
                      className="img-fluid search-icon"
                      src={homeSearch}
                      width="16px"
                      height="16px"
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
      <Modal
        show={showLoginModel}
        onHide={handleCloseLoginModel}
        dialogClassName="right_slidemodal-slider"
        id="loginModal"
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
