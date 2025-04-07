"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import errorImg from "../../public/images/error.png";
import houseChimney from "../../public/images/house-chimney.png";
import successImg from "../../public/images/success.png";

import "../../styles/cart.css";
import Footer from "../../views/Footer";
import Header from "../../views/Header/index";

import { pagePaths } from "../../utils/constants/constant";
import { env } from "../../config/env.config";
import axios from "axios";

export default function FasterOrder() {
  const searchParams = useSearchParams();
  const oid = searchParams.get("oid");
  const ost = searchParams.get("ost");

  const [orderStatus, setOrderStatus] = useState(null); // 'PLACED', 'FAILED', or null
  const [loading, setLoading] = useState(true);

  // Call backend only if ost = SUCCESS
  useEffect(() => {
    const fetchOrderStatus = async () => {
      if (ost !== "SUCCESS") {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          `${env.REACT_SERVER_BASE_URL}/faster/fasterCheckout`,
          { order_id: oid }
        );

        if (response?.data?.sucess === true) {
          setOrderStatus("PLACED");
        } else {
          setOrderStatus("FAILED");
        }
      } catch (error) {
        console.error("Order request error:", error);
        setOrderStatus("FAILED");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderStatus();
  }, [oid, ost]);

  return (
    <>
      <Header showCategoryNavbar={false} />

      <div className="container-fluid px-0">
        <div className="container">
          <div className="d-flex home-back-section">
            <Image
              className="img-fluid d-flex align-self-center"
              src={houseChimney}
              width={16}
              height={16}
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
            {!loading && orderStatus && (
              <Image
                className="img-fluid d-block mx-auto"
                src={orderStatus === "PLACED" ? successImg : errorImg}
                width={181}
                height={164}
                alt={orderStatus === "PLACED" ? "Success" : "Error"}
              />
            )}
          </div>

          <div className="success">
            <h2 className="your-order">
              {loading
                ? "Processing your order..."
                : orderStatus === "PLACED"
                ? "Your Order Placed"
                : orderStatus === "FAILED"
                ? "Duplicate order found or something went wrong"
                : "Something went wrong, please try again later..."}
            </h2>

            {!loading && orderStatus === "PLACED" && (
              <Link
                href={pagePaths.trackOrder}
                className="text-decoration-none track-btn align-center"
              >
                Track Order
              </Link>
            )}

            {!loading && (orderStatus === "FAILED" || !orderStatus) && (
              <a
                href="http://frontend.cureka.com/"
                className="text-decoration-none track-btn align-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                Continue Shopping
              </a>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
