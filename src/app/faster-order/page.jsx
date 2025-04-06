"use client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePathname } from "next/navigation";
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
import { env } from "../../config/env.config";
import axios from "axios";

export default function FasterOrder() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Define order status constants
  const orderPlacedStatus = {
    PLACED: "PLACED",
    FAILED: "FAILED",
  };

  const useQuery = () => {
    return new URLSearchParams(usePathname().search);
  };
  const query = useQuery();
  const oid = query.get("oid");
  const ost = query.get("ost");

  // Function to handle the POST request
  const handlePostRequest = async () => {
    try {
      const response = await axios.post(
        `${env.REACT_SERVER_BASE_URL}/faster/fasterCheckout`,
        {
          order_id: oid,
        }
      );
      // Assuming the response has a property 'success' that indicates the status

      if (response?.data?.sucess == true) {
        setOrder({ order_placed_status: orderPlacedStatus.PLACED });
      } else {
        setOrder({ order_placed_status: orderPlacedStatus.FAILED });
      }
    } catch (error) {
      console.error("Error making POST request:", error);
      setOrder({ order_placed_status: orderPlacedStatus.FAILED });
    } finally {
      setLoading(false); // Stop loading after the request completes
    }
  };

  // useEffect to trigger the POST request when ost is SUCCESS
  useEffect(() => {
    if (ost == "SUCCESS") {
      handlePostRequest();
    } else {
      setLoading(false); // Stop loading if ost is not SUCCESS
    }
  }, [ost]);
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

            <p className="section mb-0 ml-3">
              / &nbsp;&nbsp;&nbsp;Faster Checkout
            </p>
          </div>
        </div>

        <div className="bottom-border"></div>

        <div className="container">
          <div className="success-space">
            {order && (
              <img
                className="img-fluid d-block mx-auto"
                src={
                  order.order_placed_status == orderPlacedStatus.PLACED
                    ? success
                    : error
                }
                width="181px"
                height="164px"
                alt={
                  order.order_placed_status == orderPlacedStatus.PLACED
                    ? "Success"
                    : "Error"
                }
              />
            )}
          </div>

          <div className="success">
            <h2 className="your-order">
              {order
                ? order?.order_placed_status === orderPlacedStatus.PLACED
                  ? "Your Order Placed"
                  : "Duplicate order found"
                : "Something went to wrong please train again letter..."}
            </h2>
            {order?.order_placed_status == "Your Order Placed" && (
              <Link
                href={pagePaths.trackOrder}
                className="text-decoration-none track-btn align-center"
              >
                Track Order
              </Link>
            )}
            {order?.order_placed_status == undefined && (
              <a
                href="http://frontend.cureka.com/"
                className="text-decoration-none track-btn align-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                Continue shopping
              </a>
            )}
            {order?.order_placed_status == "FAILED" && (
              <a
                href="http://frontend.cureka.com/"
                className="text-decoration-none track-btn align-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                Continue shopping
              </a>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
