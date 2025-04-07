"use client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Link from "next/link";
import error from "../../public/images/error.png";
import houseChimney from "../../public/images/house-chimney.png";
import success from "../../public/images/success.png";
import "../../styles/cart.css";
import { getOrder } from "../../redux/action";
import { pagePaths } from "../../utils/constants/constant";
import { orderPlacedStatus } from "../../utils/constants/common.constants";
import Footer from "../../views/Footer";
import Header from "../../views/Header/index";

export default function OrderPlaced() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (orderId) {
      getOrder(orderId).then((res) => {
        setOrder(res);
      });
    }
  }, [orderId]);

  return (
    <>
      <Header showCategoryNavbar={false} />
      <div className="container-fluid px-0">
        <div className="container">
          <div className="d-flex home-back-section">
            <img
              className="img-fluid d-flex align-self-center"
              src={houseChimney}
              width="16px"
              height="16px"
              alt="home-icon"
            />

            <p className="section mb-0 ml-3">/ &nbsp;&nbsp;&nbsp;Cart</p>
          </div>
        </div>

        <div className="bottom-border"></div>

        <div className="container">
          <div className="success-space">
            {order && (
              <img
                className="img-fluid d-block mx-auto"
                src={
                  order?.order_placed_status === orderPlacedStatus.PLACED
                    ? success
                    : error
                }
                width="181px"
                height="164px"
                alt="success"
              />
            )}
          </div>

          <div className="success">
            <h2 className="your-order">
              {order
                ? order?.order_placed_status === orderPlacedStatus.PLACED
                  ? "Your Order Placed"
                  : "Failed to placed your order"
                : "Loading..."}
            </h2>
            <p className="your-order-para">
              Thank you for shopping with us! Your Order has been successfully
              placed, and we are excited to help you on your journey to better
              health and wellness
            </p>

            <Link
              href={pagePaths.myOrders}
              className="text-decoration-none track-btn"
            >
              Track Order
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
