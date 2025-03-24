"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import Link from "next/link";
import ScrollToTop from "../../views/ScrollToTop";
import housechimney from "../../public/images/house-chimney.png";
import { env } from "../../config/env.config";
import "../../styles/faq.css";
import Footer from "../../views/Footer";
import Header from "../../views/Header/index";

export default function TrackOrder() {
  const [orderData, setOrderData] = useState({});
  const [orderNumber, setOrderNumber] = useState("");
  const [loading, setLoading] = useState(true);

  console.log(orderNumber, "orderNumber");

  const handleOrderNumberChange = async (event) => {
    setOrderNumber(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    // let orderNumber = 'FR0412'
    // setOrderData(null);
    try {
      const response = await axios.get(
        `${env.REACT_SERVER_BASE_URL}/api/v1/checkout/getUnicommerseOrderInfo/${orderNumber}`
      );
      setOrderData(response && response.data && response.data.saleOrderDTO);
      console.log(response, "response");
      if (
        response &&
        response.data &&
        response &&
        response.data.successful == true
      )
        toast.success("Order details fetched successfully");
    } catch (error) {
      const data = error.response.data;
      toast.error(data && data.error);
    }
    setLoading(false);
  };
  console.log(orderData, "orderData");
  // Create a map of itemName to its count
  const itemNameCountMap =
    orderData &&
    orderData.saleOrderItems &&
    orderData.saleOrderItems.reduce((acc, item) => {
      acc[item.itemName] = (acc[item.itemName] || 0) + 1;
      return acc;
    }, {});

  const [isVisible, setIsVisible] = useState(false);

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
  return (
    <>
      <Helmet>
        <title>
          Track your order | Buy Healthcare Products Online - Cureka
        </title>
        <meta
          name="description"
          content="Cureka is one of the leading online healthcare store dealing with the best in class home health careproducts."
        />
        <link rel="canonical" href={window.location.href} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cureka" />
        <meta
          property="og:description"
          content="Cureka is one of the leading online healthcare store dealing with the best in class home health careproducts."
        />
        <meta
          property="og:image"
          content="https://frontend.cureka.com/src/assets/images/logo.svg"
        />
      </Helmet>
      <h1 style={{ display: "none" }}>Track Your Order</h1>
      <Header />
      <div className="container-fluid px-0">
        <div className="container mt-5">
          <div className="d-flex home-back-section">
            <Link href="/">
              <img
                className="img-fluid d-flex align-self-center"
                src={housechimney}
                width="16px"
                height="16px"
                alt="home-icon"
              />
            </Link>
            <p className="section mb-0 ml-3">
              / &nbsp;&nbsp;&nbsp;Track Your Order
            </p>
          </div>
        </div>
        <div className="bottom-border"></div>
        <div className="container card mt-5">
          <h1 className="privacy-heading mb-4">Track Your Order</h1>
          <div className="row">
            <div className="col-lg-4"></div>
            <div className="col-lg-4">
              <Form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <Form.Group>
                    <Form.Label>
                      Enter Order ID <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="state"
                      value={orderNumber}
                      onChange={handleOrderNumberChange}
                      required
                    />
                  </Form.Group>
                </div>

                <div>
                  <Button
                    type="submit"
                    style={{ backgroundColor: "#004a98" }}
                    className="mb-3"
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            </div>
            <div className="col-lg-4"></div>
            <div className="col-lg-1"></div>
            <div className="col-lg-10">
              <div>
                {orderData &&
                  orderData.saleOrderItems &&
                  orderData.saleOrderItems.length > 0 && (
                    <Form.Label style={{ fontWeight: 700 }} className="mb-5">
                      Order Status: {orderData && orderData.status}
                    </Form.Label>
                  )}

                {orderData &&
                  orderData.saleOrderItems &&
                  orderData.saleOrderItems.length > 0 && (
                    <>
                      <Form.Group>
                        <Form.Label style={{ fontWeight: 700 }}>
                          Product Details
                        </Form.Label>
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th style={{ backgroundColor: "#004a98" }}>ID</th>
                              <th style={{ backgroundColor: "#004a98" }}>
                                Product Name
                              </th>
                              <th style={{ backgroundColor: "#004a98" }}>
                                Quantity
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {orderData &&
                              orderData.saleOrderItems &&
                              orderData.saleOrderItems.map((productName) => (
                                <tr key={productName.id}>
                                  <td>{productName.id}</td>
                                  <td>{productName.itemName}</td>
                                  <td>1</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </Form.Group>
                    </>
                  )}
              </div>
            </div>
            <div className="col-lg-1"></div>
          </div>
        </div>
      </div>
      <Footer />
      <div className="">
        <ScrollToTop isVisible={isVisible} />
      </div>
    </>
  );
}
