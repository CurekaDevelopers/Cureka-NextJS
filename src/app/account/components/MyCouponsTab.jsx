"use client";

import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoupons } from "../../../redux/action";

const MyCouponsTab = () => {
  const dispatch = useDispatch();
  const { coupons } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchCoupons());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>My Coupons - View, Apply & Manage Discounts | Cureka</title>
        <meta
          name="description"
          content="Access and manage your coupons on Cureka. View available discounts, track expiration dates, and apply coupon codes at checkout for savings on your next purchase."
        />
        <link
          rel="canonical"
          href={typeof window !== "undefined" ? window.location.href : ""}
        />
        <meta
          property="og:url"
          content={typeof window !== "undefined" ? window.location.href : ""}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cureka" />
        <meta
          property="og:description"
          content="Access and manage your coupons on Cureka. View available discounts, track expiration dates, and apply coupon codes at checkout for savings on your next purchase"
        />
        <meta
          property="og:image"
          content="https://frontend.cureka.com/assets/images/logo.svg"
        />
      </Helmet>

      <div
        className="tab-pane fade show active"
        id="coupons-tab"
        role="tabpanel"
        aria-labelledby="coupons-vertical-tab"
      >
        <h1 className="order-heading mb-4">My Coupons</h1>

        <div className="row">
          <div className="col-12">
            <h2 className="order-heading mb-3">Available Coupons</h2>
          </div>

          {coupons && coupons.length > 0 ? (
            coupons.map((item) => (
              <div key={item.id} className="col-12 mb-4">
                <div className="p-3 border rounded bg-light">
                  <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <p className="avail-coupons mb-2 mb-lg-0">{item.name}</p>
                    <p className="valid-date mb-0 text-muted">
                      Valid till:{" "}
                      {new Date(item.end_date).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </p>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <p className="avail-subcoupons mb-0">
                      Flat ₹ {item.offer_amount} Off
                    </p>
                    <a
                      href="/terms-and-conditions"
                      className="view-tc text-decoration-underline"
                    >
                      View T&C
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <p>No coupons available.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyCouponsTab;
