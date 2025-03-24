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
  console.log(coupons, "coupons");
  return (
    <>
      <Helmet>
        <title>My Coupons - View, Apply & Manage Discounts | Cureka</title>
        <meta
          name="description"
          content="Access and manage your coupons on Cureka. View available discounts, track expiration dates, and apply coupon codes at checkout for savings on your next purchase."
        />
        <link rel="canonical" href={window.location.href} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cureka" />
        <meta
          property="og:description"
          content="Access and manage your coupons on Cureka. View available discounts, track expiration dates, and apply coupon codes at checkout for savings on your next purchase"
        />
        <meta
          property="og:image"
          content="https://frontend.cureka.com/src/assets/images/logo.svg"
        />
      </Helmet>
      <div
        className="tab-pane fade show active"
        id="coupons-tab"
        role="tabpanel"
        aria-labelledby="coupons-vertical-tab"
      >
        <h1 className="order-heading">My Coupons</h1>

        <div className="row address-three">
          <h2 className="order-heading">Available Coupons</h2>
          {coupons && coupons.length > 0 && (
            <>
              {coupons &&
                coupons.map((item) => (
                  <div key={item.id}>
                    <div className="col-lg-12 d-lg-flex d-flex-column justify-content-between p-0">
                      <p className="avail-coupons">{item.name}</p>

                      <p className="valid-date">
                        Valid till
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

                    <div className="col-lg-12 d-flex justify-content-between p-0 border-bottom">
                      <p className="avail-subcoupons">
                        Flat ₹ {item.offer_amount} Off
                      </p>

                      <a href="/terms-and-conditions" className="view-tc">
                        View T&C
                      </a>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MyCouponsTab;
