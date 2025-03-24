"use client";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import "react-caroussel/dist/index.css";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useParams } from "react-router-dom";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";

import eye from "../public/images/eye.svg";
import houseChimney from "../public/images/house-chimney.png";
import skinbanner from "../public/images/skinbanner.png";
import LikeIcon from "../public/svg-components/LikeIcon";
import "../styles/skin.css";
import {
  addProductToCart,
  addProductToWishlist,
  deleteProductFromWishlist,
  fetchCuratedProducts,
} from "../redux/action";
import { pagePaths } from "../utils/constants/constant";
import { generateUrl } from "../utils/constants/common.constants";
import Footer from "./Footer";
import Header from "./Header";

export default function CuratedProducts() {
  const { curatedSlug } = useParams();
  const navigate = useRouter();

  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const {
    curatedProducts,
    wishlistProducts,
    cartProducts,
    // filter,
    loading,
    catadata,
    productPaginationData: { totalPages } = {},
  } = useSelector((state) => state.customer);

  // const [filterData, setFilterData] = useState()
  // const [paginate, setPaginate] = useState(1)
  // const [searchBrand, setSearchBrand] = useState('')

  useEffect(() => {
    dispatch(fetchCuratedProducts(curatedSlug));
  }, [dispatch, fetchCuratedProducts, curatedSlug]);

  const handlePageClick = (event) => {
    searchParams.set("page", event.selected + 1);
    setSearchParams(searchParams);
  };

  const isProductPresentInWishlist = (product) =>
    !!wishlistProducts?.find?.((item) => item.product_id === product.id);

  const isProductPresentInCart = (product) =>
    !!cartProducts?.find?.((item) => item.product_id === product.id);

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

  useEffect(() => {
    // Check if the URL contains 'session_'
    if (window.location.href.includes("session_")) {
      // Redirect to another page, e.g., "/cancelled" page
      navigate.push(pagePaths.cart);
    }
  }, [navigate]);
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

  return (
    <div className="container-fluid px-lg-0">
      <div className="bottom-border"></div>
      <Header />
      <div className="container">
        <div className="d-flex home-back-section">
          <Link href={pagePaths.home}>
            <img
              className="img-fluid d-block"
              src={houseChimney}
              width="16px"
              height="16px"
              alt="home-icon"
            />
          </Link>
          <Link
            href={`/curated-products/${curatedSlug}`}
            className="section mb-0 ml-3"
          >
            / <span className="ml-3">{curatedSlug || "Search result"}</span>
          </Link>
        </div>
      </div>

      <div className="bottom-border"></div>

      <div className="container">
        {/* <!-- Skincare section starts --> */}
        {!loading ? (
          <div className="skin-care">
            <div className="row">
              <div className="col-lg-12 order-1 order-lg-2" id="skin-banners">
                {/* <div className="d-flex justify-content-between">
                  <div className="skin">
                    <h2 className="skin-heading">Search result</h2>
                    <p className="skin-para">({curatedProducts?.length} Products)</p>
                  </div>
                  <div className="d-lg-block d-none">
                    <DropdownButton id="dropdown-toggle" title="Sort by">
                      {sortFilterData?.map((filter) => {
                        return (
                          <Dropdown.Item onClick={() => setFilterSortBy(filter)}>
                            {filter.sortBy}
                          </Dropdown.Item>
                        );
                      })}
                    </DropdownButton>
                  </div>
                </div> */}

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
                      {!!curatedProducts?.length &&
                        curatedProducts?.map((product, index) => {
                          // get the product image if array show 0th element else showing product front images
                          let product_front_image;
                          if (product?.product_images) {
                            product_front_image =
                              product?.product_images[0].image;
                          } else {
                            product_front_image = product?.front_image;
                          }

                          return (
                            <>
                              <div className="col-lg-3  col-md-3 col-6 mb-3">
                                <div className="arrivals card">
                                  <div className="d-flex flex-nowrap justify-content-between">
                                    <div className="sale d-lg-block d-none">
                                      {product.discount_percent > 0 ? (
                                        <h2 className="sale-heading">
                                          -{Number(product.discount_percent)} %{" "}
                                        </h2>
                                      ) : (
                                        <h2 className="sale-heading">
                                          {" "}
                                          -{product.discount_amount} ₹{" "}
                                        </h2>
                                      )}
                                    </div>
                                    <a
                                      href={generateUrl(product)}
                                      key={product.id}
                                      target="_blank"
                                      className=""
                                    >
                                      <div className="product">
                                        <img
                                          src={product_front_image}
                                          width="218px"
                                          height="172px"
                                          className="img-fluid"
                                          alt="product11"
                                        />
                                      </div>
                                    </a>
                                    <div className="cart-icons align-self-end align-self-lg-start">
                                      <div className="watch d-lg-block d-none">
                                        <a
                                          href={generateUrl(product)}
                                          target="_blank"
                                        >
                                          <img
                                            src={eye}
                                            width="10px"
                                            height="10px"
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

                                  <div className="d-lg-flex d-flex-column justify-content-between align-items-center">
                                    <div className="price d-flex d-lg-block">
                                      <p className="discount">
                                        &#8377; {product.mrp}
                                      </p>

                                      <p className="product-price">
                                        &#8377; {product.final_price}
                                      </p>
                                    </div>

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
                                    </button>
                                  </div>
                                </div>
                              </div>

                              {curatedProducts?.length > 5 && index === 5 && (
                                <div className="mb-3">
                                  <img
                                    className="w-100 d-block img-fluid mx-auto"
                                    itemID={2}
                                    src={skinbanner}
                                    width="880px"
                                    height="284px"
                                    alt="homebanner"
                                  />
                                </div>
                              )}

                              {/* src={(catadata?.image != "" ? catadata.image : skinbanner)}
                              {curatedProducts?.length < 5 && <div className="mb-3">
                                <img
                                  className="w-100 d-block img-fluid mx-auto"
                                  itemID={2}
                                  src={skinbanner}
                                  width="880px"
                                  height="284px"
                                  alt="homebanner"
                                />
                              </div>} */}
                            </>
                          );
                        })}
                    </div>
                  </div>
                  <div
                    className="curatedProducts-pagination"
                    id="curatedProducts-pagination"
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
                      pageRangeDisplayed={5}
                      pageCount={totalPages}
                      forcePage={parseInt(searchParams.get("page") || 1) - 1}
                      previousLabel="<"
                      renderOnZeroPageCount={null}
                    />
                  </div>
                </div>
              </div>

              <div className="foot-section order-3">
                <div className="bottom-border"></div>

                <h2 className="foot-text">{catadata?.name}</h2>

                <div
                  className="dynamic-content"
                  dangerouslySetInnerHTML={{ __html: catadata?.description }}
                ></div>
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
    </div>
  );
}
