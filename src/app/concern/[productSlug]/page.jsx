"use client";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import omit from "lodash/omit";
import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Modal from "react-bootstrap/Modal";
import Nav from "react-bootstrap/Nav";
import Spinner from "react-bootstrap/Spinner";
import Tab from "react-bootstrap/Tab";
import "react-caroussel/dist/index.css";
import ReactPaginate from "react-paginate";
import { Range } from "react-range";
import { useDispatch, useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { usePathname } from "next/navigation";
import Link from "next/link";
import bars_filter from "../../../public/images/bars_filter.svg";
import eye from "../../../public/images/eye.webp";
import filterImage from "../../../public/images/filter.svg";
import houseChimney from "../../../public/images/house-chimney.png";
import skinbanner from "../../../public/images/skinbanner.png";
import LikeIcon from "../../../public/svg-components/LikeIcon";

import { Helmet } from "react-helmet-async";
import noproduct from "../../../public/images/noimageavailable.png";
import "../../../styles/skin.css";
import {
  addProductToCart,
  addProductToWishlist,
  deleteProductFromWishlist,
  fetchProducts,
  fetchProductsForBrand,
} from "../../../redux/action";
import { pagePaths } from "../../../utils/constants/constant";
import {
  snakeCaseToTitleCase,
  sortFilterData,
} from "../../../utils/common.utils";
import { generateUrl } from "../../../utils/constants/common.constants";
import Footer from "../../../views/Footer";
import Header from "../../../views/Header/index";
import CategoryPopup from "../../../views/Header/HomePopup";
import ScrollToTop from "../../../components/ScrollToTop/ScrollToTop";
import { useRouter } from "next/navigation";
import ShopHeader from "@/views/Header/ShopHeader";
export default function ProductList() {
  const {
    categorySlug,
    subCategorySlug,
    subSubCategorySlug,
    brandSlug,
    productSlug,
  } = useParams();
  const { nestedCategories, wishlistProducts, cartProducts } = useSelector(
    (state) => state.customer
  );
  const pathname = usePathname(); // Get the current path
  const navigate = useRouter();
  const searchParamsFilter = new URLSearchParams(location.search);
  const sortByValue = searchParamsFilter?.get("sortBy");

  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const {
    products,
    filter,
    loading,
    catadata,
    categoryPopup,
    productPaginationData: { totalItems, totalPages } = {},
  } = useSelector((state) => state.customer);

  const [categoryData, setCategoryData] = useState({
    category: null,
    subCategory: null,
    subSubCategory: null,
  });
  const [filterData, setFilterData] = useState();
  const [paginate, setPaginate] = useState(1);
  const [searchBrand, setSearchBrand] = useState("");
  const [modalCategoryPopupShow, setmodalCategoryPopupShow] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [values, setValues] = useState([0, 10000]);
  const [priceRange, setPriceRange] = useState([0, 10000]);

  const [isFixed, setIsFixed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [pageNumber, setpageNumber] = useState();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      if (scrollTop > 300) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handlePriceRangeChange = (newValues) => {
    setPriceRange(newValues);
  };

  // Update searchParams and call the API when the user releases the slider thumb
  const handlePriceRangeFinalChange = (newValues) => {
    const [minPrice, maxPrice] = newValues;
    const params = new URLSearchParams(searchParams.toString());
    // Update searchParams for price range
    if (minPrice !== 0) {
      params.set("minPrice", minPrice);
    } else {
      params.delete("minPrice");
    }

    if (maxPrice !== 10000) {
      params.set("maxPrice", maxPrice);
    } else {
      params.delete("maxPrice");
    }

    // setSearchParams(params);
    navigate.push(`?${params.toString()}`);
  };

  //  Combine filtering and sorting in useEffect
  useEffect(() => {
    // Step 1: Filter products by price range
    // console.log(priceRange.length,'priceRange',priceRange)
    const filteredProducts =
      priceRange.length > 0
        ? products.filter(
            (product) =>
              product.final_price >= priceRange[0] &&
              product.final_price <= priceRange[1]
          )
        : products;

    // Step 2: Sort filtered products based on the selected sort option
    // console.log(sortByValue, 'sortByValue')
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      const priceA = parseFloat(a.final_price);
      const priceB = parseFloat(b.final_price);
      if (sortByValue == "price-high-to-low") {
        // console.log('high-to-low')
        return priceB - priceA;
      }
      if (sortByValue == "price-low-to-high") {
        // console.log('low-to-high')
        return priceA - priceB;
      }
      return 0; // Default sorting (e.g., no sorting)
    });
    setFilterProducts(sortedProducts);

    // }
    // Update state with sorted and filtered products
  }, [products, sortByValue, priceRange]);

  // console.log(products, 'products')
  // console.log(filterProducts, 'filterProducts')

  useEffect(() => {
    if (nestedCategories.length) {
      const category = nestedCategories.find(
        (item) => item?.slug === categorySlug
      );
      let subCategory = null;
      let subSubCategory = null;
      if (category?.sub_categories?.length) {
        subCategory = category?.sub_categories.find(
          (item) => item.slug === subCategorySlug
        );
        if (subCategory?.sub_sub_categories?.length) {
          subSubCategory = subCategory?.sub_sub_categories.find(
            (item) => item.slug === subSubCategorySlug
          );
        }
      }
      setCategoryData({ category, subCategory, subSubCategory });
    }
  }, [
    categorySlug,
    nestedCategories,
    nestedCategories.length,
    subCategorySlug,
    subSubCategorySlug,
  ]);

  useEffect(() => {
    let slugParams = {
      categorySlug,
      subCategorySlug,
      subSubCategorySlug,
      productSlug,
    };
    let queryParamsObject = Object.fromEntries(searchParams);
    queryParamsObject = omit(queryParamsObject, [
      "category_name",
      "sub_category_name",
      "sub_sub_category_name",
      "sub_sub_sub_category_name",
    ]);
    if (pathname?.includes("product-brands")) {
      dispatch(fetchProductsForBrand({ brandSlug }));

      return;
    }
    if (pathname?.includes("top-picks")) {
      dispatch(
        fetchProducts({ ...queryParamsObject, slugParams, url: "top-picks" })
      );
      return;
    }
    if (pathname?.includes("new-arrivals")) {
      dispatch(
        fetchProducts({ ...queryParamsObject, slugParams, url: "new-arrivals" })
      );
      return;
    }
    if (pathname?.includes("shop-by-age")) {
      let minAge, maxAge;

      dispatch(
        fetchProducts({ ...queryParamsObject, slugParams, url: "shop-by-age" })
      );
      return;
    }
    dispatch(fetchProducts({ ...queryParamsObject, slugParams }));
  }, [
    dispatch,
    searchParams,
    categorySlug,
    subCategorySlug,
    subSubCategorySlug,
    brandSlug,
    productSlug,
  ]);

  const handleCategorySelect = (categoryName, value) => () => {
    const params = new URLSearchParams(searchParams.toString());
    console.log(params, "params");

    const values = params.get(categoryName);
    const valuesArray = values?.split(",");
    if (valuesArray?.length && valuesArray.includes(value)) {
      const newValue = valuesArray.filter((v) => v !== value).join(",");
      if (newValue) {
        params.set(categoryName, newValue);
      } else {
        params.delete(categoryName);
      }
    } else {
      params.set(categoryName, [...(valuesArray || []), value].join(","));
    }
    console.log(params);
    console.log("ddd");
    // setSearchParams(params);
    // 🧼 Reset page on any filter
    setpageNumber(1);
    params.delete("page");
    // setSearchParams(searchParams);
    navigate.push(`?${params.toString()}`);
  };

  const isFilterSet = (categoryName, value) => {
    const values = searchParams.get(categoryName) || "";
    return values.includes(value);
  };
  const handlePageClick = (event) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", event.selected + 1);
    const page = event.selected + 1;
    setpageNumber(page);
    console.log("Pagination", event.selected);

    // setSearchParams(searchParams);
    navigate.push(`?${params.toString()}`);
  };

  const isProductPresentInWishlist = (product) =>
    !!wishlistProducts?.find?.((item) => item.product_id === product.id);

  const isProductPresentInCart = (product) =>
    !!cartProducts?.find?.((item) => item.product_id === product.id);

  const addItemToCart = (e, product) => {
    e.preventDefault();

    const productId = product?.id || product?.product_id;
    const quantity = 1;

    if (productId) {
      if (isProductPresentInCart(product)) {
        navigate.push("/Cart");
      } else {
        // Add product with quantity
        const cartItem = {
          ...product,
          product_id: productId,
          quantity: quantity,
        };
        addProductToCart(cartItem, dispatch);
        toast.info("🛒 Adding product to cart...");
      }
    } else {
      console.error("❌ Product ID not found");
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

  const handlePaginationFilter = (type, filterKey) => {
    let searchData;
    if (searchBrand) {
      searchData = filter[filterKey]?.filter((val) =>
        val.value.toLowerCase().includes(searchBrand.toLowerCase())
      );
    } else {
      searchData = filter[filterKey];
    }
    if (type === "next") {
      const modifyData = searchData.slice(paginate * 10, paginate * 10 + 10);
      setFilterData((pre) => ({ ...pre, [filterKey]: modifyData }));
      setPaginate(paginate + 1);
    }
    if (type === "prev") {
      const modifyData = searchData.slice(paginate - 1, paginate * 10);
      setFilterData((pre) => ({ ...pre, [filterKey]: modifyData }));
      setPaginate(paginate - 1);
    }
    // 🧼 Reset page on any filter
    setpageNumber(0);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    navigate.push(`?${params.toString()}`);
  };

  const [showFilter, setShowFilter] = useState(false);
  const [showSortBy, setShowSortBy] = useState(false);
  // const [filterSortBy, setFilterSortBy] = useSearchParams({});
  const handleCloseFilter = () => setShowFilter(false);
  const handleShowFilter = () => setShowFilter(true);
  const handleCloseSortBy = () => setShowSortBy(false);
  const handleShowSortBy = () => setShowSortBy(true);
  const firstFilterKey = Object.keys(filter)[0];

  const handleSelectFilter = (filter) => {
    setFilterSortBy(filter);
    handleCloseSortBy();
  };

  const setFilterSortBy = (filter) => {
    // Get current query parameters
    const currentParams = new URLSearchParams(location.search);

    // Set the new sortBy value
    currentParams.set("sortBy", filter.sortBy);

    // Update the search parameters in the URL
    navigate.push(`${location.pathname}?${currentParams.toString()}`);
  };

  const handleFiltersSearch = (word, type) => {
    const searchData = filter[type]?.filter((val) =>
      val.value.toLowerCase().includes(word.toLowerCase())
    );
    setSearchBrand(word);
    if (searchData?.length > 0) {
      setFilterData((pre) => ({ ...pre, [type]: searchData }));
      setPaginate(1);
    } else {
      setFilterData((pre) => ({ ...pre, [type]: [] }));
      setPaginate(1);
    }
  };

  useEffect(() => {
    setFilterData(filter);
  }, [filter]);

  const closeCategoryPopupModal = () => {
    setmodalCategoryPopupShow(false);
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

  // Build the dynamic title based on the available slugs
  let pageTitle = ""; // Fallback title
  let aschema = ""; // Fallback title
  const stripHtmlTags = (html) => {
    if (typeof html !== "string") return ""; // Ensure html is a string

    // Check if the string contains HTML tags
    const hasHtmlTags = /<\/?[^>]+(>|$)/.test(html);

    // If there are no HTML tags, return the original string
    return hasHtmlTags ? html.replace(/<\/?[^>]+(>|$)/g, "") : html;
  };
  if (productSlug) {
    pageTitle = `Product: ${productSlug}`;
  } else if (brandSlug) {
    pageTitle = `Brand: ${brandSlug}`;
  } else if (subSubCategorySlug) {
    pageTitle = `Sub-sub Category: ${subSubCategorySlug}`;
  } else if (subCategorySlug) {
    pageTitle = `Sub Category: ${subCategorySlug}`;
  } else if (categorySlug) {
    pageTitle = `Category: ${categorySlug}`;
  }
  const cschema = {
    "@context": "https://schema.org/",
    "@type": "CollectionPage",
    name: catadata?.name,
    description: stripHtmlTags(catadata?.description),
    url: window.location.href,
    mainEntity: products.map((product) => ({
      "@type": "Product",
      name: product?.vendor_article_name,
      url: generateUrl(product),
      image: product?.images,
      price: product?.final_price > 0 ? product?.final_price : product?.mrp,
      priceCurrency: "INR",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.7",
        reviewCount: "5",
      },
      offers: {
        "@type": "Offer",
        price: product?.final_price > 0 ? product?.final_price : product?.mrp,
        priceCurrency: "INR",
        availability: product?.stock_status,
      },
    })),
  };

  const capitalizeFirstLetter = (str) => {
    if (!str || str.length === 0) {
      return ""; // Return an empty string if str is empty or undefined
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <>
      <Helmet>
        <title>{catadata?.name}</title>
        <meta
          name="description"
          content={stripHtmlTags(catadata?.description)}
        ></meta>
        <link rel="canonical" href={window.location.href} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cureka" />
        <meta
          property="og:description"
          content={stripHtmlTags(catadata?.description)}
        />
        <meta
          property="og:image"
          content="https://frontend.cureka.com/assets/images/logo.svg"
        />
        <script type="application/ld+json">{JSON.stringify(cschema)}</script>
      </Helmet>
      <div className="container-fluid px-0">
        <div className="bottom-border"></div>

        <ShopHeader />
        <div className="container">
          <div className="d-flex home-back-section">
            <Link href={pagePaths.home}>
              <Image
                className="img-fluid d-block"
                src={houseChimney}
                width={16}
                height={16}
                alt="home-icon"
              />
            </Link>
            <Link
              href={`/product-category/${categoryData?.category?.slug}`}
              className="section mb-0 ml-2"
            >
              /{" "}
              <span className="ml-2">
                {capitalizeFirstLetter(categoryData?.category?.name) ||
                  "Search result"}
              </span>
            </Link>
            {categoryData.subCategory?.slug && (
              <Link
                href={`/product-category/${categoryData?.category?.slug}/${categoryData?.subCategory?.slug}`}
                className="section mb-0 ml-2"
              >
                /
                <span className="ml-2">
                  {capitalizeFirstLetter(categoryData?.subCategory?.name) ||
                    "Search result"}
                </span>
              </Link>
            )}
            {categoryData.subSubCategory?.slug && (
              <Link
                href={`/product-category/${categoryData?.category?.slug}/${categoryData?.subCategory?.slug}/${categoryData?.subSubCategory?.slug}`}
                className="section mb-0 ml-2"
              >
                /
                <span className="ml-2">
                  {capitalizeFirstLetter(categoryData?.subSubCategory?.name) ||
                    "Search result"}
                </span>
              </Link>
            )}
          </div>
        </div>

        <div className="bottom-border"></div>

        <div className="container">
          {/* <!-- Skincare section starts --> */}
          {!loading ? (
            <div className="skin-care">
              <div className="d-lg-flex">
                <div
                  className={`col-lg-2 px-lg-0 order-2 order-lg-1 d-lg-block d-none ${
                    isFixed ? "category-section fixed" : "category-section"
                  }`}
                  id="category-section"
                >
                  <div className="price-range-slider px-3 mb-4">
                    <p className="product-price mb-3">Price Range</p>
                    <Range
                      values={priceRange}
                      step={1}
                      min={0}
                      max={10000}
                      onChange={handlePriceRangeChange}
                      onFinalChange={handlePriceRangeFinalChange}
                      renderTrack={({ props, children }) => (
                        <div
                          onMouseDown={props.onMouseDown}
                          onTouchStart={props.onTouchStart}
                          ref={props.ref}
                          style={{
                            ...props.style,
                            height: "6px",
                            width: "100%",
                            borderRadius: "3px",
                            backgroundColor: "#d7d7d7",
                            alignSelf: "center",
                          }}
                        >
                          {children}
                        </div>
                      )}
                      renderThumb={({ props, isDragged }) => (
                        <div
                          {...props}
                          style={{
                            ...props.style,
                            height: "24px",
                            width: "24px",
                            borderRadius: "50%",
                            backgroundColor: "#004a98",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                          }}
                        >
                          <div
                            style={{
                              height: "10px",
                              width: "10px",
                              borderRadius: "50%",
                              backgroundColor: "#FFF",
                            }}
                          />
                        </div>
                      )}
                    />
                    <div className="range-labels d-flex justify-content-between mt-3">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>
                  {!!Object.keys(filter || {})?.length &&
                    Object.keys(filter)
                      .filter((item) => filter[item]?.length)
                      .map((filterKey) => {
                        return (
                          <div key={filterKey}>
                            <Accordion
                              defaultActiveKey="{null}"
                              className="p-0"
                            >
                              <Accordion.Item eventKey="0">
                                <Accordion.Header
                                  as="div"
                                  className="collapsible-link heading-button"
                                >
                                  {snakeCaseToTitleCase(filterKey)}
                                </Accordion.Header>
                                <Accordion.Body className="p-0">
                                  <ul className="accor-space list-unstyled mt-3">
                                    {filterData &&
                                    filterData[filterKey]?.length > 0 ? (
                                      filterData[filterKey]
                                        .slice(0, 10)
                                        ?.map(({ value, count }) => {
                                          return (
                                            <li key={value}>
                                              <a
                                                className="text-decoration-none"
                                                href="#"
                                                data-toggle="tooltip"
                                                data-placement="right"
                                                title={value}
                                              >
                                                <label className="selectall">
                                                  <input
                                                    type="checkbox"
                                                    checked={isFilterSet(
                                                      filterKey,
                                                      value
                                                    )}
                                                    onClick={handleCategorySelect(
                                                      filterKey,
                                                      value
                                                    )}
                                                    className="select-input"
                                                  />
                                                  <span className="category-input">
                                                    {value}
                                                  </span>
                                                  <div className="selectall-num">
                                                    {count}
                                                  </div>
                                                </label>
                                              </a>
                                            </li>
                                          );
                                        })
                                    ) : (
                                      // Render something if filterData[filterKey] has a length of 0
                                      <p>No data available</p>
                                    )}
                                  </ul>

                                  {filterKey === "brand" && (
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        padding: 10,
                                      }}
                                    >
                                      {filter[filterKey]?.length > 10 &&
                                        paginate > 1 && (
                                          <p
                                            onClick={() =>
                                              handlePaginationFilter(
                                                "prev",
                                                filterKey
                                              )
                                            }
                                          >
                                            Prev
                                          </p>
                                        )}

                                      {filter[filterKey]?.length > 10 &&
                                        Math.ceil(
                                          filter[filterKey].length / 10
                                        ) > paginate && (
                                          <p
                                            onClick={() =>
                                              handlePaginationFilter(
                                                "next",
                                                filterKey
                                              )
                                            }
                                          >
                                            Next
                                          </p>
                                        )}
                                    </div>
                                  )}
                                </Accordion.Body>
                              </Accordion.Item>
                            </Accordion>
                          </div>
                        );
                      })}
                </div>

                <div
                  className="col-lg-12 order-2 d-lg-none d-block"
                  id="category-filter"
                >
                  {!!Object.keys(filter || {})?.length &&
                    Object.keys(filter)
                      .filter((item) => filter[item]?.length)
                      .map((filterKey) => {
                        return (
                          <div key={filterKey}>
                            <div className="filter-wrapper">
                              <div className="filter" id="filters">
                                <Button
                                  variant="primary"
                                  onClick={handleShowFilter}
                                >
                                  <Image
                                    className="img-fluid mr-2"
                                    src={filterImage}
                                    width={20}
                                    height={20}
                                    alt="filter-icon"
                                  />
                                  Filters
                                </Button>
                              </div>

                              <div className="filter" id="sortbrands">
                                <Button
                                  variant="primary"
                                  onClick={handleShowSortBy}
                                >
                                  <Image
                                    className="img-fluid mr-2"
                                    src={bars_filter}
                                    width={20}
                                    height={20}
                                    alt="filter-icon"
                                  />
                                  Sort by
                                </Button>
                              </div>
                            </div>

                            <div className="modal" id="filtermodal">
                              <div className="modal-dialog">
                                <div className="modal-content">
                                  <Modal
                                    show={showFilter}
                                    onHide={handleCloseFilter}
                                    id="filtermodal"
                                  >
                                    <Modal.Header className="filter-text">
                                      Filters
                                      {/* <Button className="close">Reset</Button> */}
                                    </Modal.Header>
                                    <Tab.Container
                                      id="filtermodal"
                                      defaultActiveKey={firstFilterKey}
                                    >
                                      <div className="tab-vertical p-2">
                                        <Col sm={2} className="pr-0">
                                          <Nav
                                            variant="pills"
                                            className="flex-column"
                                          >
                                            {!!Object.keys(filter || {})
                                              ?.length &&
                                              Object.keys(filter)
                                                .filter(
                                                  (item) => filter[item]?.length
                                                )
                                                .map((filterKey) => {
                                                  return (
                                                    <Nav.Item key={filterKey}>
                                                      <Nav.Link
                                                        eventKey={filterKey}
                                                      >
                                                        {snakeCaseToTitleCase(
                                                          filterKey
                                                        )}
                                                      </Nav.Link>
                                                    </Nav.Item>
                                                  );
                                                })}
                                          </Nav>
                                        </Col>
                                        <Col sm={10} className="px-0">
                                          <Tab.Content className="mb-4">
                                            {filterData &&
                                              typeof filterData === "object" &&
                                              Object.keys(filterData).map(
                                                (filterKey) =>
                                                  filterData[filterKey]
                                                    ?.length > 0 ? (
                                                    <Tab.Pane
                                                      eventKey={filterKey}
                                                      key={filterKey}
                                                      className="mt-0"
                                                    >
                                                      <ul className="list-unstyled">
                                                        {filterData[filterKey]
                                                          .slice(0, 10)
                                                          .map(
                                                            ({
                                                              value,
                                                              count,
                                                            }) => (
                                                              <li key={value}>
                                                                <a
                                                                  className="row text-decoration-none"
                                                                  href="#"
                                                                  data-toggle="tooltip"
                                                                  data-placement="right"
                                                                  title={value}
                                                                >
                                                                  <label className="col px-0 selectall">
                                                                    <input
                                                                      type="checkbox"
                                                                      checked={isFilterSet(
                                                                        filterKey,
                                                                        value
                                                                      )}
                                                                      onClick={handleCategorySelect(
                                                                        filterKey,
                                                                        value
                                                                      )}
                                                                      className="select-input"
                                                                    />
                                                                    <span className="category-input">
                                                                      {value}
                                                                    </span>
                                                                  </label>
                                                                  <div className="col px-0 selectall-num">
                                                                    {count}
                                                                  </div>
                                                                </a>
                                                              </li>
                                                            )
                                                          )}
                                                      </ul>

                                                      {filterKey === "brand" &&
                                                        filter[filterKey]
                                                          ?.length > 10 && (
                                                          <div
                                                            style={{
                                                              display: "flex",
                                                              justifyContent:
                                                                "space-between",
                                                              padding: 10,
                                                            }}
                                                          >
                                                            {paginate > 1 && (
                                                              <p
                                                                onClick={() =>
                                                                  handlePaginationFilter(
                                                                    "prev",
                                                                    filterKey
                                                                  )
                                                                }
                                                              >
                                                                Prev
                                                              </p>
                                                            )}
                                                            {Math.ceil(
                                                              filter[filterKey]
                                                                .length / 10
                                                            ) > paginate && (
                                                              <p
                                                                onClick={() =>
                                                                  handlePaginationFilter(
                                                                    "next",
                                                                    filterKey
                                                                  )
                                                                }
                                                              >
                                                                Next
                                                              </p>
                                                            )}
                                                          </div>
                                                        )}
                                                    </Tab.Pane>
                                                  ) : (
                                                    <Tab.Pane
                                                      eventKey={filterKey}
                                                      key={filterKey}
                                                      className="mt-0"
                                                    >
                                                      <p>No data available</p>
                                                    </Tab.Pane>
                                                  )
                                              )}
                                          </Tab.Content>
                                        </Col>
                                      </div>
                                    </Tab.Container>
                                    <div className="filter-wrappers-buttons cancel-wrapper d-flex justify-content-end">
                                      <Button
                                        className="cancel-btn mr-3"
                                        onClick={handleCloseFilter}
                                      >
                                        Cancel
                                      </Button>
                                      <Button
                                        className="apply-btn"
                                        onClick={handleCloseFilter}
                                      >
                                        Apply
                                      </Button>
                                    </div>
                                  </Modal>
                                </div>
                              </div>
                            </div>

                            <div className="modal" id="sortmodal">
                              <div className="modal-dialog">
                                <div className="modal-content">
                                  <Modal
                                    show={showSortBy}
                                    onHide={handleCloseSortBy}
                                    id="filtermodal"
                                  >
                                    <Modal.Header
                                      closeButton
                                      className="filter-text"
                                    >
                                      Sort by
                                    </Modal.Header>
                                    <Modal.Body>
                                      <div className="modal-body">
                                        <ul className="list-unstyled">
                                          <li>
                                            {sortFilterData?.map((filter) => {
                                              return (
                                                <Dropdown.Item
                                                  onClick={() =>
                                                    handleSelectFilter(filter)
                                                  }
                                                >
                                                  {filter.sortBy}
                                                </Dropdown.Item>
                                              );
                                            })}
                                          </li>
                                        </ul>
                                      </div>
                                    </Modal.Body>
                                  </Modal>
                                </div>

                                {/* <!-- Modal body --> */}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                </div>

                <div
                  className={`col-lg-10 skin-banners order-1 order-lg-2 ${
                    isFixed ? "skin-banners with-margin" : "skin-banners"
                  }`}
                  id="skin-banners"
                >
                  <div className="d-flex justify-content-between">
                    <div className="skin">
                      <h1 className="skin-heading">
                        {capitalizeFirstLetter(catadata?.name) ||
                          "Search result"}
                      </h1>
                      {/* <p className="skin-para">({products?.length} Products)</p> */}
                      <p className="mb-2 skin-para">
                        {filterProducts && filterProducts.length > 0
                          ? `(Showing ${filterProducts.length} Products of ${totalItems})`
                          : products && products.length > 0
                          ? `(Showing ${products.length} Products of ${totalItems})`
                          : ""}
                      </p>
                    </div>
                    <div className="d-lg-block d-none">
                      {/* <!--Sort by Accordion start--> */}
                      <DropdownButton
                        id="dropdown-toggle"
                        title={`Sort by : ${sortByValue || ""}`}
                      >
                        {sortFilterData?.map((filter) => {
                          return (
                            <Dropdown.Item
                              onClick={() => setFilterSortBy(filter)}
                            >
                              {filter.sortBy}
                            </Dropdown.Item>
                          );
                        })}
                      </DropdownButton>
                    </div>

                    {/* <!--Sort by Accordion End--> */}
                  </div>

                  <div className="product-carousel">
                    <div className="product-carousel">
                      <div className="row text-right">
                        <a
                          className="text-decoration-none"
                          href="#"
                          target="_blank"
                        >
                          {/* <p className="show-items">Showing 30 of 1200</p> */}
                        </a>
                      </div>

                      <div className="row">
                        {filterProducts && filterProducts.length > 0 ? (
                          filterProducts.map((product, index) => {
                            // let product_front_image;
                            // if (product?.product_images) {
                            //   product_front_image =
                            //     product?.product_images[0].image;
                            // } else {
                            //   product_front_image = noproduct;
                            // }
                            // Clean and prepare image URL
                            let rawImage = product?.product_images?.[0]?.image;
                            let product_front_image =
                              typeof rawImage === "string"
                                ? rawImage.trim()
                                : "";

                            // fallback if no valid image
                            const finalImageSrc =
                              product_front_image || noproduct;
                            return (
                              <>
                                <div className="col-lg-4  col-md-4 col-6 mb-3">
                                  <div className="arrivals card">
                                    <div className="d-flex flex-nowrap justify-content-between">
                                      <div className="sale d-lg-block d-none">
                                        {product.discount_percent > 0 ? (
                                          <p className="sale-heading">
                                            -{Number(product.discount_percent)}{" "}
                                            %{" "}
                                          </p>
                                        ) : (
                                          <div
                                            style={{
                                              backgroundColor:
                                                product.discount_amount !== 0
                                                  ? "sale-heading"
                                                  : "white",
                                            }}
                                          >
                                            {product.discount_amount !== 0 ? (
                                              <p className="sale-heading">
                                                {product.discount_amount} ₹
                                              </p>
                                            ) : (
                                              <p className="sale-heading">
                                                {product.discount_amount}
                                              </p>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                      <a
                                        href={generateUrl(product)}
                                        key={product.id}
                                        target="_blank"
                                        className=""
                                      >
                                        <div className="product">
                                          <Image
                                            src={finalImageSrc}
                                            width={218}
                                            height={172}
                                            className="img-fluid"
                                            alt="product-image"
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
                                        target="_blank"
                                        data-toggle="tooltip"
                                        data-placement="right"
                                        title={product.vendor_article_name}
                                      >
                                        <h2 className="product-name text-truncate">
                                          {product.vendor_article_name}
                                        </h2>
                                      </a>

                                      <div className="rating  d-lg-flex d-none">
                                        <p className="rating-number">4.7</p>
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

                                    {/* <div className="d-lg-flex d-flex-column justify-content-between align-items-center">
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
                                          : "Add to Cart1"}
                                      </button>
                                    </div> */}
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
                                        product?.stock_status ===
                                          "Out Stock" ? (
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
                                            onClick={(e) =>
                                              addItemToCart(e, product)
                                            }
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

                                {filterProducts?.length > 5 && index === 5 && (
                                  <div className="mb-3">
                                    <Image
                                      className="w-100 d-block img-fluid mx-auto"
                                      itemID={2}
                                      src={skinbanner}
                                      width={880}
                                      height={284}
                                      alt="homebanner"
                                    />
                                  </div>
                                )}
                              </>
                            );
                          })
                        ) : products && products.length > 0 ? (
                          products.map((product, index) => {
                            // let product_front_image;
                            // if (product?.product_images) {
                            //   product_front_image =
                            //     product?.product_images[0].image;
                            // } else {
                            //   product_front_image = noproduct;
                            // }
                            let rawImage = product?.product_images?.[0]?.image;
                            let product_front_image =
                              typeof rawImage === "string"
                                ? rawImage.trim()
                                : "";

                            // fallback if no valid image
                            const finalImageSrc =
                              product_front_image || noproduct;
                            return (
                              <>
                                <div className="col-lg-4  col-md-4 col-6 mb-3">
                                  <div className="arrivals card">
                                    <div className="d-flex flex-nowrap justify-content-between">
                                      <div className="sale d-lg-block d-none">
                                        {product.discount_percent > 0 ? (
                                          <h2 className="sale-heading">
                                            -{Number(product.discount_percent)}{" "}
                                            %{" "}
                                          </h2>
                                        ) : (
                                          <div
                                            style={{
                                              backgroundColor:
                                                product.discount_amount !== 0
                                                  ? "sale-heading"
                                                  : "white",
                                            }}
                                          >
                                            {product.discount_amount !== 0 ? (
                                              <h2 className="sale-heading">
                                                {product.discount_amount} ₹
                                              </h2>
                                            ) : (
                                              <h2 className="sale-heading">
                                                {product.discount_amount}
                                              </h2>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                      <a
                                        href={generateUrl(product)}
                                        key={product.id}
                                        target="_blank"
                                        className=""
                                      >
                                        <div className="product">
                                          <Image
                                            src={finalImageSrc}
                                            width={218}
                                            height={172}
                                            className="img-fluid"
                                            alt="Product"
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
                                        target="_blank"
                                        data-toggle="tooltip"
                                        data-placement="right"
                                        title={product.vendor_article_name}
                                      >
                                        <p className="product-name text-truncate">
                                          {product.vendor_article_name}
                                        </p>
                                      </a>
                                      <div className="rating  d-lg-flex d-none">
                                        <p className="rating-number">
                                          {product &&
                                          product.product_reviews &&
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

                                      {product?.back_order_quantity == 0 ||
                                      (product &&
                                        product.stock_status == "Out Stock") ? (
                                        <>
                                          <div className="d-flex-column pb-0 pb-lg-5">
                                            <p
                                              className="text-center"
                                              style={{
                                                color:
                                                  product?.back_order_quantity ==
                                                    0 ||
                                                  (product &&
                                                    product.stock_status ==
                                                      "Out Stock")
                                                    ? "red"
                                                    : "",
                                                fontSize: "10px",
                                              }}
                                            >
                                              {product?.back_order_quantity ==
                                                0 ||
                                              (product &&
                                                product.stock_status ==
                                                  "Out Stock") ? (
                                                "Out Of Stock"
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </p>
                                            <button
                                              className="text-decoration-none align-items-center justify-content-center jus w-100 d-flex cart"
                                              disabled
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
                                                  product?.back_order_quantity ==
                                                    0 ||
                                                  (product &&
                                                    product.stock_status ==
                                                      "Out Stock")
                                                    ? "red"
                                                    : "",
                                                fontSize: "10px",
                                              }}
                                            >
                                              {product?.back_order_quantity ==
                                                0 ||
                                              (product &&
                                                product.stock_status ==
                                                  "Out Stock") ? (
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

                                {products?.length > 5 && index === 5 && (
                                  <div className="mb-3">
                                    <Image
                                      className="w-100 d-block img-fluid mx-auto"
                                      itemID={2}
                                      src={skinbanner}
                                      width={880}
                                      height={284}
                                      alt="homebanner"
                                    />
                                  </div>
                                )}
                              </>
                            );
                          })
                        ) : (
                          <div>No products found.</div>
                        )}
                      </div>
                    </div>
                    <div
                      className="products-pagination"
                      id="products-pagination"
                    >
                      <ReactPaginate
                        className="pagination justify-content-center"
                        pageClassName="page-item page-link"
                        nextClassName="page-item page-link"
                        breakClassName="page-item page-link"
                        previousClassName="page-item page-link"
                        activeClassName="active"
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        // pageRangeDisplayed={5}
                        pageRangeDisplayed={2}
                        marginPagesDisplayed={1}
                        // pageRangeDisplayed={0} // Set to 0 to not show any pages other than the current one
                        // marginPagesDisplayed={0} // No additional margin pages
                        pageCount={totalPages}
                        forcePage={parseInt(searchParams.get("page") || 1) - 1}
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                      />
                    </div>
                  </div>
                  <div className="foot-section order-3">
                    <div className="bottom-border"></div>

                    <div
                      className="dynamic-content"
                      dangerouslySetInnerHTML={{
                        __html: catadata?.description,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                position: "absolute",
                left: "50%",
                transform: "translate(-50%, -50%)",
                top: "50%",
              }}
            >
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
        </div>
        <Footer />
        <div className="">
          <ScrollToTop isVisible={isVisible} />
        </div>
        {categoryPopup && categoryPopup.length > 0 && (
          <CategoryPopup
            show={modalCategoryPopupShow}
            onHide={closeCategoryPopupModal}
            popupData={categoryPopup}
          />
        )}
      </div>
    </>
  );
}
