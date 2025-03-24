"use client";

import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import trash from "../../../public/images/trash.svg";
import { generateUrl } from "../../../utils/constants/common.constants";

import {
  addProductToCart,
  deleteProductFromWishlist,
  fetchWishlistProducts,
} from "../../../redux/action/index";
import useCustomerLoggedIn from "../../../utils/hooks/useCustomerLoggedIn";

const MyWishlistTab = () => {
  const { isLoggedIn } = useCustomerLoggedIn();
  const dispatch = useDispatch();
  const { wishlistProducts } = useSelector((state) => state.customer);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchWishlistProducts(1));
    }
  }, [dispatch, isLoggedIn]);

  const deleteWishList = (product) => {
    deleteProductFromWishlist(product.product_id);
  };

  const addItemToCart = (product) => {
    addProductToCart(product.product_id, 1);
    deleteProductFromWishlist(product.product_id);
  };

  return (
    <>
      <Helmet>
        <title>
          Manage Wishlist - Save Favorite Products & Shop Later | Cureka
        </title>
        <meta
          name="description"
          content="Organize and manage your wishlist on [Your Store Name]. Save your favorite products, track availability, and shop later with ease. Create a personalized shopping experience today."
        />
        <link rel="canonical" href={window.location.href} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cureka" />
        <meta
          property="og:description"
          content="Organize and manage your wishlist on [Your Store Name]. Save your favorite products, track availability, and shop later with ease. Create a personalized shopping experience today"
        />
        <meta
          property="og:image"
          content="https://frontend.cureka.com/src/assets/images/logo.svg"
        />
      </Helmet>
      <div
        className="tab-pane fade show active"
        id="wishlist-tab"
        role="tabpanel"
        aria-labelledby="wishlist-vertical-tab"
      >
        <h1 className="order-heading">My Wishlist</h1>

        <div className="row">
          <div className="col-lg-12 px-0">
            {wishlistProducts?.length ? (
              <div className="order-display rounded-3">
                {wishlistProducts.map((item, index) => {
                  let product_front_image;
                  if (item?.product_images) {
                    product_front_image = item?.product_images[0].image;
                  } else {
                    product_front_image = item?.front_image;
                  }
                  return (
                    <div
                      key={item.id}
                      className={`order-card rounded-0 ${
                        index === wishlistProducts?.length - 1
                          ? "border-bottom-0"
                          : ""
                      }`}
                    >
                      <div className="d-lg-flex d-flex-column justify-content-between">
                        <a href={generateUrl(item)} target="_blank">
                          <div className="d-lg-flex d-flex-column">
                            <div className="card align-self-center">
                              <img
                                className="img-fluid mx-auto"
                                src={product_front_image}
                                width="73px"
                                height="80px"
                                alt={item.product_name}
                              />
                            </div>

                            <div className="product-details">
                              <h2 className="heading">
                                {item.vendor_article_name}
                              </h2>

                              <p className="discount">
                                ₹ {Number(item.mrp).toFixed(1)}
                              </p>

                              <p className="price">
                                ₹ {Number(item.final_price).toFixed(1)}
                              </p>
                            </div>
                          </div>
                        </a>

                        <div id="dot">
                          <div className="trash d-flex justify-content-end">
                            <img
                              onClick={() => {
                                deleteWishList(item);
                              }}
                              className="img-fluid"
                              src={trash}
                              width="20px"
                              height="20px"
                              alt="trash"
                            />
                          </div>

                          <div className="d-flex justify-content-between">
                            <button
                              onClick={() => addItemToCart(item)}
                              className="text-decoration-none reorder-btn mr-0"
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="price" style={{ textAlign: "center" }}>
                "You don’t have an wishlist."
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyWishlistTab;
