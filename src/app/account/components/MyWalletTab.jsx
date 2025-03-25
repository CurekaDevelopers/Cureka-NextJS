"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap"; // Import Bootstrap components
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import urlJoin from "url-join";
import { env } from "../../../config/env.config";
import { pagePaths } from "../../../utils/constants/constant";
import { initializeCashfree } from "../../../utils/cashfree.utils";
import useCustomerLoggedIn from "../../../utils/hooks/useCustomerLoggedIn";

const MyWalletTab = () => {
  const [show, setShow] = useState(false);
  const [userAmount, setUserAmount] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { userDetails } = useSelector((state) => state.auth);
  const [data, setData] = useState(null);
  const [getTransactionData, setGetTransactionData] = useState([]);
  const [getWalletAmount, setGetWalletAmount] = useState([]);

  const { accessToken } = useSelector((state) => state.auth);
  const { isLoggedIn } = useCustomerLoggedIn();

  useEffect(() => {
    handleFetchTransactions();
    handleFetchWalletAmount();
  }, []);
  const handleFetchTransactions = async () => {
    const token = accessToken;
    const response = await axios.get(
      `${env.REACT_SERVER_BASE_URL}/user/account/fetchtxns`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setGetTransactionData(response && response.data && response.data.txns);
  };
  const handleFetchWalletAmount = async () => {
    const token = accessToken;
    const response = await axios.get(
      `${env.REACT_SERVER_BASE_URL}/user/account/fetchwalletamount`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setGetWalletAmount(response && response.data && response.data.txns);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const order_id = Date.now();
    const formData = {
      amount: userAmount,
      order_id: order_id,
      phone: userDetails && userDetails.mobile_number,
    };
    try {
      const response = await axios.post(
        `${env.REACT_SERVER_BASE_URL}/api/v1/walletpayment`,
        formData
      );
      const sessionData = response.data;
      console.log(sessionData && sessionData.sessionId);
      if (sessionData && sessionData.sessionId) {
        const checkoutOptions = {
          paymentSessionId: sessionData && sessionData.sessionId,
          // returnUrl: urlJoin(env.REACT_FRONTEND_BASE_URL, pagePaths.myWallet),
          returnUrl: urlJoin("http://frontend.cureka.com", pagePaths.myWallet),
          // returnUrl: urlJoin("http://localhost:3000", pagePaths.myWallet),
        };
        // Call cash free the function
        initializeCashfree()
          .then((cashfree) => {
            cashfree.checkout(checkoutOptions).then(function (result) {
              if (result.error) {
                alert(result.error.message);
              }
              if (result.redirect) {
                console.log("Redirection");
              }
            });
          })
          .catch((error) => {
            console.error("Error initializing Cashfree:", error);
          });
      }
    } catch (error) {
      console.error("Response data:", error);
    }
    handleClose(); // Close the modal after submission
  };
  return (
    <>
      <Helmet>
        <title>
          Manage Wallet Amount - Secure Wallet & Saved Cards | Cureka
        </title>
        <meta
          name="description"
          content="Safely manage your saved cards and payment methods in your Wallet at Cureka. Add, edit, or remove payment options for quick and secure checkout every time. Update your wallet now!."
        />
        <link rel="canonical" href={window.location.href} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cureka" />
        <meta
          property="og:description"
          content="Safely manage your saved cards and payment methods in your Wallet at Cureka. Add, edit, or remove payment options for quick and secure checkout every time. Update your wallet now!."
        />
        <meta
          property="og:image"
          content="https://frontend.cureka.com/assets/images/logo.svg"
        />
      </Helmet>
      <div
        className="tab-pane fade show active"
        id="wallet-tab"
        role="tabpanel"
        aria-labelledby="wallet-vertical-tab"
      >
        <h1 className="order-heading">My Wallet</h1>
        {isLoggedIn && (
          <div className="row address-two">
            <div className="col-lg-12">
              <div className="d-flex justify-content-between wallet-border">
                <div>
                  <p className="balance">Balance</p>
                  <p className="rupees">
                    ₹
                    {getWalletAmount &&
                      getWalletAmount[0] &&
                      getWalletAmount[0].wallet_balance}
                  </p>
                </div>

                <div>
                  <Button
                    variant="primary"
                    onClick={handleShow}
                    style={{ backgroundColor: "#004a98" }}
                  >
                    Add Money to Wallet
                  </Button>

                  <div style={{ width: "150%" }}>
                    <Modal
                      show={show}
                      onHide={handleClose}
                      id="rateproductModal"
                    >
                      <Modal.Header closeButton className="mx-0"></Modal.Header>
                      <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                          <div
                            className="form-group"
                            style={{ width: "400px" }}
                          >
                            <label className="rate-product" htmlFor="title">
                              Wallet Money
                            </label>

                            <input
                              type="number"
                              className="form-control"
                              name="amount"
                              id="amount"
                              placeholder="Enter Wallet Amount"
                              onChange={(e) => setUserAmount(e.target.value)}
                              required
                              min="1"
                            />
                          </div>
                          <div>
                            <Button
                              variant="primary"
                              type="submit"
                              style={{ backgroundColor: "#004a98" }}
                            >
                              Submit
                            </Button>
                          </div>
                        </Form>
                      </Modal.Body>
                    </Modal>
                  </div>
                </div>
              </div>

              <div className="row">
                {getTransactionData && getTransactionData.length > 0 && (
                  <p className="transaction">Transactions</p>
                )}
              </div>

              {getTransactionData && getTransactionData.length > 0 && (
                <>
                  {getTransactionData &&
                    getTransactionData.map((item) => (
                      <div key={item.id}>
                        <div className="d-flex justify-content-between">
                          <h2 className="money">
                            {item.transaction_type == "CREDIT"
                              ? "Amount Credit"
                              : "Amount Debit"}
                          </h2>
                          <p
                            className="credit-price"
                            style={{
                              color:
                                item.transaction_type !== "CREDIT"
                                  ? "red"
                                  : "green",
                            }}
                          >
                            {item.transaction_type === "CREDIT" ? "+" : "-"} ₹
                            {item.amount}
                          </p>
                        </div>
                        <div className="row border-bottom">
                          <p className="debit-date">
                            {new Date(item.txn_date).toLocaleString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyWalletTab;
