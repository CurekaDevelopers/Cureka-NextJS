"use client";

import Rating from "@mui/material/Rating";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import _ from "lodash";
import { useEffect, useMemo, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { env } from "../../../config/env.config";
import {
  addRateAndReview,
  fetchCustomerOrders,
  fetchProductBySlug,
} from "../../../redux/action/index";

const OrdersTab = () => {
  const { userDetails } = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);
  const [showFirstDiv, setShowFirstDiv] = useState(true);
  const [reviewTitleDescription, setReviewTitleDescription] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [product, setProduct] = useState(null);
  const [order, setOrder] = useState(null);
  const [userId, setUserId] = useState(0);
  const [listApproved, setListApproved] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [cancellationReason, setCancellationReason] = useState("");
  const [orderCancelClose, setOrderCancelClose] = useState(false);
  const { accessToken } = useSelector((state) => state.auth);
  const [ratingReview, setRatingReview] = useState("");
  const [searchId, setSearchId] = useState("");
  const [originalListApproved, setOriginalListApproved] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [hasOrders, setHasOrders] = useState(false);

  useEffect(() => {
    fetchCustomerOrders().then((orders) => {
      if (orders?.status === 200) {
        setListApproved(orders?.data);
        setOriginalListApproved(orders?.data);
        setHasOrders(orders?.data.length > 0);
      } else {
        setHasOrders(false);
      }
      setIsLoading(false);
    });
  }, []);

  const userName = useMemo(() => {
    const { first_name, last_name } = userDetails;
    return _.isEmpty(first_name) ? "Anonymous" : `${first_name} ${last_name}`;
  }, [userDetails?.first_name]);

  const handleClose = () => setShow(false);

  const handleShow = (product, userId) => {
    // const formattedData = product.product_name.replace(/\s+/g, '');

    const formattedParameter = product.slug;
    // .replace(/&/g, '') // Remove "&"
    // .replace(/\s+/g, '-') // Replace spaces with hyphens
    // .toLowerCase(); // Convert to lowercase

    fetchProductBySlug(formattedParameter).then((blogRes) => {
      if (blogRes) {
        const { product_reviews } = blogRes;
        if (product_reviews && product_reviews.length > 10) {
          const removedProductReviewCopy = product_reviews.slice(
            10,
            product_reviews.length
          );
          product_reviews.splice(10, product_reviews.length);
          // setRemovedProductReview(removedProductReviewCopy);
        }
        setRatingReview(blogRes);
      }
    });
    setProduct(product);
    setUserId(userId);
    setShow(true);
  };

  const toggleDiv = (product, order) => {
    let prod = null;
    let ord = null;
    if (product && order) {
      prod = product;
      ord = order;
    }
    setProduct(prod);
    setOrder(ord);
    setShowFirstDiv(!showFirstDiv);
  };

  const handleRateAndReview = () => {
    if (!rating) {
      toast.error("Rating is required.");
      return;
    }
    if (!reviewTitleDescription || reviewTitleDescription.trim() === "") {
      toast.error("Title is required.");
      return;
    }
    if (!reviewDescription || reviewDescription.trim() === "") {
      toast.error("Review is Required.");
      return;
    }
    const request = {
      productId: product.product_id,
      userId: userId,
      rating: rating,
      title: reviewTitleDescription,
      comments: reviewDescription,
      created_by: userName,
    };
    addRateAndReview(request).then(() => {
      handleClose();
    });
  };

  //handle invoice order
  // const handleDownloadInvoice = async () => {
  //   try {
  //     const response = await axios.get(`${env.REACT_SERVER_BASE_URL}/api/v1/checkout/getAdminOrderDetails/${order.order_id}`,

  //     );
  //     if (response) {
  //       setOrderData(response && response.data)
  //     }
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }

  //   const doc = new jsPDF("p", "pt");

  //   // Set font styles
  //   doc.setFont("Arial");
  //   doc.setFontSize(12);

  //   // Invoice header
  //   doc.setFillColor(255, 255, 255);
  //   doc.rect(20, 20, 550, 100, "F");
  //   doc.setTextColor(0, 0, 0);
  //   doc.setFontSize(20);
  //   doc.text("Invoice", 290, 70, { align: "center" });

  //   // Company details
  //   doc.setFontSize(12);
  //   doc.text("75/1, Alagar Kovil Main Rd", 50, 120);
  //   doc.text("Surveyor Colony,", 50, 140);
  //   doc.text("Madurai, Tamil Nadu 625007", 50, 160);
  //   doc.text("GST No: 33AABCW6108R1ZY", 50, 180);
  //   doc.text("CIN No: U52310TN2014PTC098403", 50, 200);

  //   // Company logo
  //   const logo = new Image();
  //   logo.src =
  //     "https://www.cureka.com/wp-content/uploads/2020/11/logo-dark-3.png";
  //   doc.addImage(logo, "PNG", 350, 120);
  //   console.log(orderData, 'orderData');
  //   // return

  //   // Invoice details
  //   doc.setTextColor(0, 0, 0);
  //   doc.setFontSize(12);
  //   doc.text("Order No.", 370, 240);
  //   doc.text(`${orderData[0] && orderData[0].order_id}`, 475, 240);
  //   doc.text("Invoice date", 370, 260);
  //   doc.text(`${new Date(orderData[0] && orderData[0].created_at).toLocaleDateString("en-IN", {
  //     day: '2-digit',
  //     month: '2-digit',
  //     year: 'numeric'
  //   }).replace(/\//g, '/')}`, 475, 260);
  //   doc.text("Amount", 370, 280);
  //   doc.text(`${(parseInt(orderData[0] && orderData[0].subtotal) + parseInt(orderData[0] && orderData[0].walletMoneyUsed)).toFixed(2)}`, 475, 280);

  //   // Contact details
  //   doc.setFontSize(12);
  //   doc.text(`${orderData[0] && orderData[0].shipping_address.name}`, 50, 240);
  //   doc.text(`${orderData[0] && orderData[0].shipping_address.mobile},${orderData[0] && orderData[0].shipping_address.email}`, 50, 260);
  //   doc.text(`${orderData[0] && orderData[0].shipping_address.address}`, 50, 280);
  //   doc.text(`${orderData[0] && orderData[0].shipping_address.landmark},${orderData[0] && orderData[0].shipping_address.city},${orderData[0] && orderData[0].shipping_address.state},${orderData[0] && orderData[0].shipping_address.pincode}`, 50, 300);

  //   // // Products table
  //   const tableRows = orderData && orderData.map((item) => [
  //     `${item.product_name}`,
  //     `${item.quantity}`,
  //     `${(item.product_price).toFixed(2)}`,
  //     `${(item.final_price).toFixed(2)}`,
  //     `${(item.quantity * item.final_price).toFixed(2)}`,
  //     `${(item.quantity * item.final_price).toFixed(2)}`
  //   ]);

  //   const tableProps = {
  //     startY: 340,
  //     head: [
  //       [
  //         "Product Name",
  //         "Qty",
  //         "Regular Price",
  //         "Sale Price",
  //         "Line Total",
  //         "Total (Inc.Tax)",
  //       ],
  //     ],
  //     body: tableRows,
  //     theme: "grid",
  //     styles: { fontSize: 10 },
  //     columnStyles: {
  //       0: { cellWidth: "auto" },
  //     },
  //   };

  //   doc.autoTable(tableProps);
  //   let onePerDiscountApplied;
  //   const subtotal = orderData[0] && orderData[0].subtotal ? orderData[0] && orderData[0].subtotal : 0.00;
  //   const discount = orderData[0] && orderData[0].discount !== null ? orderData[0] && orderData[0].discount : 0.00;
  //   const shippingCharge = Number(orderData[0] && orderData[0].shippingCharge).toFixed(2) !== undefined ? Number(orderData[0] && orderData[0].shippingCharge).toFixed(2) : 0.00
  //   const transactionType = orderData[0] && orderData[0].is_cod == 1 ? "COD" : orderData[0] && orderData[0].is_wallet_option == 1 ? "Wallet Transaction" // When wallet option is selected and not COD
  //     : "Online Transaction"; // Fallback, default for non-COD scenarios
  //   let walletMoneyUsed = Number(orderData[0] && orderData[0].walletMoneyUsed).toFixed(2)
  //   let gift_wrapping = orderData[0] && orderData[0].gift_wrapping
  //   // const totalItemSum = orderData && orderData.reduce((acc, product) => acc + parseFloat(product.price), 0);
  //   const totalItemSum = orderData && orderData.reduce((acc, product) => {
  //     // Convert price to a number and calculate the total for this product
  //     const productTotal = product.final_price * product.quantity;
  //     // Add to the accumulator
  //     return acc + productTotal;
  //   }, 0);
  //   if (totalItemSum > 599 && transactionType == "Online Transaction") {
  //     onePerDiscountApplied = totalItemSum * 0.01
  //   }

  //   // return
  //   const total = subtotal - 0;
  //   const totaAmt = Number(total) + Number(shippingCharge)
  //   // Display subtotal, discount, and total
  //   // return
  //   if (transactionType) {
  //     doc.text("Payment Method:", 370, doc.autoTable.previous.finalY + 20);
  //     doc.text(transactionType, 470, doc.autoTable.previous.finalY + 20);
  //   }
  //   doc.text("Item Total:", 370, doc.autoTable.previous.finalY + 40);
  //   doc.text(totalItemSum.toString(), 470, doc.autoTable.previous.finalY + 40);
  //   if (discount > 0) {
  //     doc.text("Discount:", 370, doc.autoTable.previous.finalY + 60);
  //     doc.text(`-${discount}`, 470, doc.autoTable.previous.finalY + 60);
  //   }
  //   else {
  //     doc.text("Discount:", 370, doc.autoTable.previous.finalY + 60);
  //     doc.text("0.00", 470, doc.autoTable.previous.finalY + 60);
  //   }
  //   if (onePerDiscountApplied > 0) {
  //     doc.text("1% Dis bove 599:", 370, doc.autoTable.previous.finalY + 80);
  //     doc.text(`-${onePerDiscountApplied}`.toString(), 470, doc.autoTable.previous.finalY + 80);
  //   }
  //   else {
  //     doc.text("1% Dis bove 599:", 370, doc.autoTable.previous.finalY + 80);
  //     doc.text("0.00".toString(), 470, doc.autoTable.previous.finalY + 80);
  //   }
  //   if (gift_wrapping == true) {
  //     doc.text("Gift Wrapping:", 370, doc.autoTable.previous.finalY + 100);
  //     doc.text("+ 40.00", 470, doc.autoTable.previous.finalY + 100);
  //   }
  //   else {
  //     doc.text("Gift Wrapping:", 370, doc.autoTable.previous.finalY + 100);
  //     doc.text("0.00", 470, doc.autoTable.previous.finalY + 100);
  //   }
  //   doc.text("Shipping Charges:", 370, doc.autoTable.previous.finalY + 120);
  //   doc.text(`+${shippingCharge.toString()}`, 470, doc.autoTable.previous.finalY + 120);

  //   if (walletMoneyUsed > 0) {
  //     doc.text("Wallet Money:", 370, doc.autoTable.previous.finalY + 140);
  //     doc.text(walletMoneyUsed.toString(), 470, doc.autoTable.previous.finalY + 140);
  //   }

  //   doc.text("Amount:", 370, doc.autoTable.previous.finalY + 160);
  //   doc.text(Math.round(subtotal).toFixed(2).toString(), 470, doc.autoTable.previous.finalY + 160);

  //   const roundedTotalAmt = parseFloat(Math.round(totaAmt).toFixed(2)); // Convert to number
  //   const walletMoneyUsedNum = parseFloat(walletMoneyUsed); // Convert to number

  //   // Notes section
  //   doc.setFontSize(12);
  //   const notesStartY = doc.autoTable.previous.finalY + 180;
  //   doc.text("Notes", 50, notesStartY);
  //   const notesText =
  //     "Inclusive of all taxes.\n" +
  //     "This is a computer generated Invoice. No signature is required.";
  //   const notesLines = doc.splitTextToSize(notesText, 500);
  //   doc.setFillColor(238, 246, 255);
  //   doc.rect(50, notesStartY + 10, 500, notesLines.length * 12 + 10, "F");
  //   doc.text(notesLines, 55, notesStartY + 20);

  //   // Footer
  //   const footerY = notesStartY + notesLines.length * 12 + 30;
  //   doc.setTextColor(0, 0, 0);
  //   doc.setLineWidth(0.5);
  //   doc.line(50, footerY, 550, footerY);
  //   doc.setFontSize(12);
  //   doc.text(
  //     "For customer support contact us : :+91 96559 28004",
  //     50,
  //     footerY + 20
  //   );
  //   doc.text("Website: www.cureka.com", 50, footerY + 35);
  //   doc.text("Drop an email to care@cureka.com", 50, footerY + 50);

  //   // Save the PDF
  //   doc.save("invoice.pdf");

  // };

  // Handle invoice order
  const handleDownloadInvoice = async () => {
    try {
      const response = await axios.get(
        `${env.REACT_SERVER_BASE_URL}/api/v1/checkout/getUniInvoice/${order.order_id}`,
        {
          responseType: "blob",
        }
      );

      if (response && response.data) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;

        // Provide a default file name for the download
        link.setAttribute("download", `invoice_${order.order_id}.pdf`);

        document.body.appendChild(link);
        link.click();

        // Clean up after download
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      // Check if the error has a response and check the status code
      if (error.response) {
        if (error.response.status === 500) {
          toast.error(
            "Server error (500): Unable to process your request. Please try again later."
          );
        } else if (error.response.status === 404) {
          toast.error(
            "Invoice not found (404): Please check the order ID and try again."
          );
        } else {
          toast.error("An error occurred: " + error.response.statusText);
        }
      } else {
        // If no response is received (like network errors)
        console.error("Error fetching data:", error);
        alert("Network error or no response from the server.");
      }
    }
  };

  // Function to generate PDF
  const generatePDF = (orderData) => {
    const doc = new jsPDF("p", "pt");

    // Set font styles
    doc.setFont("Arial");
    doc.setFontSize(12);

    // Invoice header
    doc.setFillColor(255, 255, 255);
    doc.rect(20, 20, 550, 100, "F");
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(20);
    doc.text("Invoice", 290, 70, { align: "center" });

    // Company details
    doc.setFontSize(12);
    doc.text("75/1, Alagar Kovil Main Rd", 50, 120);
    doc.text("Surveyor Colony,", 50, 140);
    doc.text("Madurai, Tamil Nadu 625007", 50, 160);
    doc.text("GST No: 33AABCW6108R1ZY", 50, 180);
    doc.text("CIN No: U52310TN2014PTC098403", 50, 200);

    // Company logo
    const logo = new Image();
    logo.src =
      "https://www.cureka.com/wp-content/uploads/2020/11/logo-dark-3.png";
    doc.addImage(logo, "PNG", 350, 120);

    // Invoice details
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text("Order No:", 370, 220);
    doc.text(`${orderData[0].order_id}`, 475, 220);
    doc.text("Invoice Date:", 370, 240);
    doc.text(
      `${new Date(orderData[0].created_at)
        .toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .replace(/\//g, "/")}`,
      475,
      240
    );
    doc.text("Total Amount:", 370, 260);
    // doc.text(`${(parseInt(orderData[0].subtotal) + parseInt(orderData[0].walletMoneyUsed)).toFixed(2)}`, 475, 260);
    doc.text(
      `${(
        (parseInt(orderData[0]?.subtotal, 10) || 0) +
        (parseInt(orderData[0]?.walletMoneyUsed, 10) || 0)
      ).toFixed(2)}`,
      475,
      260
    );
    // Contact details
    doc.setFontSize(12);
    doc.text(`${orderData[0].shipping_address.name}`, 50, 240);
    doc.text(
      `${orderData[0].shipping_address.mobile},${orderData[0].shipping_address.email}`,
      50,
      260
    );
    doc.text(`${orderData[0].shipping_address.address}`, 50, 280);
    doc.text(
      `${orderData[0].shipping_address.landmark},${orderData[0].shipping_address.city},${orderData[0].shipping_address.state},${orderData[0].shipping_address.pincode}`,
      50,
      300
    );

    // Products table
    const tableRows = orderData.map((item) => [
      item.product_name,
      item.quantity,
      item.product_price.toFixed(2),
      item.final_price.toFixed(2),
      (item.quantity * item.final_price).toFixed(2),
      (item.quantity * item.final_price).toFixed(2),
    ]);

    const tableProps = {
      startY: 340,
      head: [
        [
          "Product Name",
          "Qty",
          "Regular Price",
          "Sale Price",
          "Line Total",
          "Total (Inc.Tax)",
        ],
      ],
      body: tableRows,
      theme: "grid",
      styles: { fontSize: 10 },
      columnStyles: {
        0: { cellWidth: "auto" },
      },
    };

    doc.autoTable(tableProps);

    let onePerDiscountApplied;
    const subtotal = orderData[0].subtotal ? orderData[0].subtotal : 0.0;
    const discount =
      orderData[0].discount !== null ? orderData[0].discount : 0.0;
    const shippingCharge =
      Number(orderData[0].shippingCharge).toFixed(2) !== undefined
        ? Number(orderData[0].shippingCharge).toFixed(2)
        : 0.0;
    const transactionType =
      orderData[0].is_cod == 1
        ? "COD"
        : orderData[0].is_wallet_option == 1
        ? "Wallet Transaction"
        : "Online Transaction";
    let walletMoneyUsed = Number(orderData[0].walletMoneyUsed).toFixed(2);
    let gift_wrapping = orderData[0].gift_wrapping;

    const totalItemSum = orderData.reduce(
      (acc, product) => acc + product.final_price * product.quantity,
      0
    );
    if (totalItemSum > 599 && transactionType == "Online Transaction") {
      onePerDiscountApplied = totalItemSum * 0.01;
    }

    const total = subtotal - 0;
    const totalAmt = Number(total) + Number(shippingCharge);

    if (transactionType) {
      doc.text("Payment Method:", 370, doc.autoTable.previous.finalY + 20);
      doc.text(transactionType, 470, doc.autoTable.previous.finalY + 20);
    }
    doc.text("Item Total:", 370, doc.autoTable.previous.finalY + 40);
    doc.text(totalItemSum.toString(), 470, doc.autoTable.previous.finalY + 40);
    if (discount > 0) {
      doc.text("Discount:", 370, doc.autoTable.previous.finalY + 60);
      doc.text(`-${discount}`, 470, doc.autoTable.previous.finalY + 60);
    } else {
      doc.text("Discount:", 370, doc.autoTable.previous.finalY + 60);
      doc.text("0.00", 470, doc.autoTable.previous.finalY + 60);
    }
    if (onePerDiscountApplied > 0) {
      doc.text("1% Dis above 599:", 370, doc.autoTable.previous.finalY + 80);
      doc.text(
        `-${onePerDiscountApplied}`,
        470,
        doc.autoTable.previous.finalY + 80
      );
    } else {
      doc.text("1% Dis above 599:", 370, doc.autoTable.previous.finalY + 80);
      doc.text("0.00", 470, doc.autoTable.previous.finalY + 80);
    }
    if (gift_wrapping == true) {
      doc.text("Gift Wrapping:", 370, doc.autoTable.previous.finalY + 100);
      doc.text("+ 40.00", 470, doc.autoTable.previous.finalY + 100);
    } else {
      doc.text("Gift Wrapping:", 370, doc.autoTable.previous.finalY + 100);
      doc.text("0.00", 470, doc.autoTable.previous.finalY + 100);
    }
    doc.text("Shipping Charges:", 370, doc.autoTable.previous.finalY + 120);
    doc.text(
      `+${shippingCharge.toString()}`,
      470,
      doc.autoTable.previous.finalY + 120
    );

    if (walletMoneyUsed > 0) {
      doc.text("Wallet Money:", 370, doc.autoTable.previous.finalY + 140);
      doc.text(
        walletMoneyUsed.toString(),
        470,
        doc.autoTable.previous.finalY + 140
      );
    }

    doc.text("Amount Paid:", 370, doc.autoTable.previous.finalY + 160);
    doc.text(
      Math.round(subtotal).toFixed(2).toString(),
      470,
      doc.autoTable.previous.finalY + 160
    );

    // Notes section
    doc.setFontSize(12);
    const notesStartY = doc.autoTable.previous.finalY + 180;
    doc.text("Notes", 50, notesStartY);
    const notesText =
      "Inclusive of all taxes.\n" +
      "This is a computer generated Invoice. No signature is required.";
    const notesLines = doc.splitTextToSize(notesText, 500);
    doc.setFillColor(238, 246, 255);
    doc.rect(50, notesStartY + 10, 500, notesLines.length * 12 + 10, "F");
    doc.text(notesLines, 55, notesStartY + 20);

    // Footer
    const footerY = notesStartY + notesLines.length * 12 + 30;
    doc.setTextColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(50, footerY, 550, footerY);
    doc.setFontSize(12);
    // doc.text("For any support, contact us at: info@cureka.com", 300, footerY + 20, { align: "center" });
    doc.text(
      "For customer support contact us @ Toll Free : +91 96559 28004",
      300,
      footerY + 20,
      { align: "center" }
    );
    doc.text("Website: www.cureka.com", 300, footerY + 35, { align: "center" });
    doc.text("Drop an email to info@cureka.com", 300, footerY + 50, {
      align: "center",
    });

    doc.save("invoice.pdf");
  };

  //handle cancel order
  const handleSubmitCancelOrder = async () => {
    if (cancellationReason) {
      const token = accessToken;
      const formData = {
        orderId: order && order.order_id,
        cancellationReason: cancellationReason,
      };
      try {
        const response = await axios.post(
          `${env.REACT_SERVER_BASE_URL}/api/v1/checkout/cancelOrder`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        let data = response;
        if (data) {
          toast.success(data && data.errors && data.errors[0].message);
          setOrderCancelClose(false);
          setCancellationReason("");
          fetchCustomerOrders().then((orders) => {
            if (orders?.status === 200) {
              setListApproved(orders?.data);
            }
          });
          window.location.reload();
        }
      } catch (error) {
        const edata = error.response.data;
        toast.error(edata && edata.error);
      }
    } else {
      toast.error("Please Enter Cancellation Reason");
    }
  };
  const handleCancelOrder = () => {
    setOrderCancelClose(true);
  };
  const handleOrderCancelClose = () => {
    setOrderCancelClose(false);
  };
  // Function to handle search based on user input
  const handleChange = (e) => {
    const input = e.target.value;
    setSearchId(input);
    if (input === "") {
      setListApproved([...originalListApproved]); // Ensure a new array reference
      return;
    }

    const orderId = parseInt(input, 10);
    if (!isNaN(orderId)) {
      // Filter orders based on parsed orderId
      const results = listApproved.filter(
        (order) => order.order_id === orderId
      );
      if (results.length > 0) {
        setListApproved(results);
      } else {
        setListApproved(originalListApproved);
      }
    } else {
      setListApproved(originalListApproved);
    }
  };
  const [trackView, setTrackView] = useState(false);
  const handleTrackingView = () => {
    setTrackView(!trackView);
  };
  const trackerFormatDate = (dateString) => {
    const date = new Date(dateString);

    const options = {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "2-digit",
    };
    const formattedDate =
      date
        .toLocaleDateString("en-US", options)
        .replace(/(\d+)(th|st|nd|rd)/, "$1") + `'`;

    const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
    const formattedTime = date
      .toLocaleTimeString("en-US", timeOptions)
      .replace(":00", "");

    return `${formattedDate} -  ${formattedTime}`;
  };

  function createdOrderDate(dateString) {
    // Create a Date object from the date string
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date format");
    }

    // Define options for formatting
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true, // Use 12-hour format
    };

    // Format the date
    return date.toLocaleString("en-US", options);
  }

  return (
    <>
      <Helmet>
        <title>My Orders - Track, View & Manage Purchases | Cureka</title>
        <meta
          name="description"
          content="Track your orders, view purchase history, and manage returns or exchanges on Cureka. Stay updated on your order status and enjoy a seamless shopping experience with easy order management."
        />
        <link rel="canonical" href={window.location.href} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cureka" />
        <meta
          property="og:description"
          content="Track your orders, view purchase history, and manage returns or exchanges on Cureka. Stay updated on your order status and enjoy a seamless shopping experience with easy order management."
        />
        <meta
          property="og:image"
          content="https://frontend.cureka.com/src/assets/images/logo.svg"
        />
      </Helmet>
      <div
        className="tab-pane fade show active"
        id="orders-tab"
        role="tabpanel"
        aria-labelledby="orders-vertical-tab"
      >
        <div className="row">
          <div>
            {showFirstDiv ? (
              <>
                <h1 className="order-heading">My Orders</h1>
                <input
                  type="text"
                  placeholder="Enter Order ID.."
                  value={searchId}
                  onChange={handleChange}
                  // onChange={(e) => handleChange(e.target.value)}

                  className="mb-3"
                  style={{
                    padding: " 0.375rem 0.75rem",
                    borderRadius: "0.25rem",
                    border: " 1px solid #ced4da",
                  }}
                />
                {/* {listApproved && listApproved.length > 0 ? ( */}
                {isLoading ? (
                  <p style={{ textAlign: "center", fontSize: "18px" }}>
                    Loading orders...
                  </p>
                ) : hasOrders ? (
                  <>
                    {listApproved &&
                      listApproved.length > 0 &&
                      listApproved?.map((order, i) =>
                        order?.products.map((product, j) => (
                          <div className="order-display">
                            <div className="order-card border-bottom-0" key={i}>
                              <div
                                className="d-lg-flex d-flex-column justify-content-between"
                                key={j}
                              >
                                <div className="d-lg-flex d-flex-column">
                                  <div
                                    onClick={(e) => toggleDiv(product, order)}
                                    className="cursorPointer card align-self-center"
                                  >
                                    <img
                                      className="img-fluid mx-auto"
                                      src={
                                        product.product_image_array[0]?.image
                                      } // order1 is default image you can change as per your requirement
                                      width="73px"
                                      height="80px"
                                      alt="order1"
                                    />
                                  </div>
                                  <div className="product-details">
                                    <h2
                                      onClick={(e) => toggleDiv(product, order)}
                                      className="cursorPointer heading"
                                    >
                                      {product.product_name}
                                    </h2>
                                    <p className="price">
                                      ₹ {product.final_price}
                                    </p>
                                  </div>
                                </div>
                                <div id="dot">
                                  <p className="align-center">
                                    Order Id: {order.order_id}
                                  </p>
                                  {/* <p className="way mb-0">{order.order_placed_status === orderPlacedStatus.PLACED ? 'Order on the way' : 'Delivered ON'}</p>
                              <p className="shipped">{order.order_placed_status === orderPlacedStatus.PLACED ? 'Your item has been shipped' : 'Your item has been shipped delivered'}</p> */}
                                  <div className="d-flex justify-content-end">
                                    {/* <Button onClick={toggleDiv} className="text-decoration-none reorder-btn">
                              Re Order
                            </Button> */}
                                    <button
                                      variant="primary"
                                      // className="rate-btn"
                                      className="text-decoration-none rate-btn btn submit-btn"
                                      onClick={(e) =>
                                        handleShow(product, order.user_id)
                                      }
                                    >
                                      Rate Product
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                  </>
                ) : (
                  <>
                    <p className="price" style={{ textAlign: "center" }}>
                      "You don’t have an order. Please try placing a new order."
                    </p>
                  </>
                )}
              </>
            ) : (
              <>
                {order && (
                  <div className="row" id="order-id">
                    <button
                      onClick={toggleDiv}
                      className="order-heading heading-add"
                    >
                      {`Order Id : #${order.order_id}`}
                    </button>
                    <div className="col-lg-12 order-details p-0">
                      {order &&
                        order.products.map((product, k) => (
                          <div key={k}>
                            <div className="order-details-space">
                              <div className="d-lg-flex d-flex-column justify-content-between">
                                <div className="d-lg-flex d-flex-column">
                                  <div className="card align-self-center">
                                    <img
                                      className="img-fluid mx-auto"
                                      src={
                                        product.product_image_array[0]?.image
                                      }
                                      width="73px"
                                      height="80px"
                                      alt="order1"
                                    />
                                  </div>

                                  <div className="product-details">
                                    <h2 className="heading">
                                      {product.product_name}
                                    </h2>

                                    <p className="price">
                                      ₹ {product.final_price}
                                    </p>
                                    {console.log(product, "product")}
                                    <p className="price">
                                      Quantity: {product.quantity}
                                    </p>
                                  </div>
                                </div>
                                {k === 0 && (
                                  <div id="dot">
                                    <div className="d-flex justify-content-start">
                                      <Button
                                        type="btn"
                                        className="text-decoration-none rate-btn mr-0"
                                        onClick={handleDownloadInvoice}
                                      >
                                        Download Invoice
                                      </Button>
                                    </div>
                                    <p
                                      style={{
                                        color: "black",
                                        fontWeight: "600",
                                      }}
                                    >
                                      Order Created:
                                      {createdOrderDate(order.created_at)}
                                    </p>
                                    <p
                                      style={{
                                        marginTop: "5x",
                                        marginBottom: "4px",
                                        color: "black",
                                        fontWeight: "600",
                                      }}
                                    >
                                      Order Status:
                                      {order && order.order_placed_status}
                                    </p>
                                    {order.order_placed_status ==
                                    "Cancelled" ? (
                                      <></>
                                    ) : (
                                      <>
                                        <div className="d-flex justify-content-start">
                                          <Button
                                            type="btn"
                                            className="text-decoration-none rate-btn mt-1"
                                            onClick={(e) => handleCancelOrder()}
                                          >
                                            Cancel Order
                                          </Button>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                            {k === 0 && order?.trackInfo?.scans?.length > 0 && (
                              <div className="ml-4 mb-3 mt-3">
                                <a
                                  type="btn"
                                  className="text-decoration-none mt-1"
                                  style={{
                                    color: "#e75204",
                                    cursor: "pointer",
                                  }}
                                  onClick={handleTrackingView}
                                >
                                  View Tracking
                                </a>
                              </div>
                            )}

                            {k === 0 && (
                              <div className="mb-4">
                                {order?.trackInfo?.scans?.map(
                                  (item, index) =>
                                    trackView && (
                                      <div
                                        className="d-flex"
                                        key={index}
                                        id="tracking"
                                      >
                                        <div className="px-5 d-flex-column">
                                          {/* <div className="filled-circle"></div> */}
                                          <div id="trackingbar">
                                            <div className="progress-bar tracking-line"></div>
                                          </div>
                                        </div>

                                        <div>
                                          <p className="order-confirm">
                                            {item["sr-status-label"]}
                                          </p>
                                          <p className="confirm-date">
                                            {trackerFormatDate(item.date)}
                                          </p>
                                        </div>
                                      </div>
                                    )
                                )}
                              </div>
                            )}

                            {/* <div className="px-5 d-flex-column progressbar-space">
                        <div className="filled-circle"></div>

                        <div className="align-self-center">
                          <div className="progress-bar bg-success" style={{ width: "5px", height: "100px", marginLeft: "3px" }}></div>
                        </div>

                        <div className="filled-circle"></div>

                        <div className="progress align-self-center w-25">
                          <div className="progress-bar bg-success" style={{ width: "100%" }}></div>
                        </div>

                        <div className="filled-circle"></div>

                        <div className="progress align-self-center w-25">
                          <div className="progress-bar bg-dark" style={{ width: "50%" }}></div>
                        </div>

                        <div className="filled-circle bg-dark"></div>
                      </div> */}

                            {/* <div className="row mx-4">
                        <div className="col">
                          <p className="order-confirm">Order Confirmed</p>

                          <p className="confirm-date">Sat, 26 Aug</p>
                        </div>

                        <div className="col">
                          <p className="order-confirm">Shipped</p>

                          <p className="confirm-date">Sun, 27 Aug </p>
                        </div>

                        <div className="col">
                          <p className="order-confirm">Out for Delivery</p>

                          <p className="confirm-date">Mon, 28 Aug </p>
                        </div>

                        <div className="col">
                          <p className="order-confirm">Delivered</p>

                          <p className="confirm-date">Mon, 28 Aug</p>
                        </div>
                      </div> */}

                            {/* <div className="bottom-border bar-space"></div>

                      <p className="delivery-item">Your item out for delivery</p> */}
                            {k === 0 && order?.trackInfo?.scans?.length > 0 && (
                              <div className="bottom-border"></div>
                            )}
                            <div className="row">
                              <div className="col-lg-4">
                                <div className="delivery-address">
                                  <h2 className="heading mt-3">
                                    Delivery Address
                                  </h2>

                                  <p className="location-one">
                                    {order &&
                                      order.shipping_address &&
                                      order.shipping_address.name}
                                  </p>
                                  <p className="location-one">
                                    {order &&
                                      order.shipping_address &&
                                      order.shipping_address.email}
                                  </p>
                                  <p className="address-one">
                                    {/* Wedjat Health Solutions Private Limited, 75/1, Alagar Kovil Main Rd, Surveyor
                          Colony, Madurai, Tamil Nadu 625007 */}
                                    {order &&
                                      order.shipping_address &&
                                      order.shipping_address.address_type}
                                    {order &&
                                      order.shipping_address &&
                                      order.shipping_address.address}
                                    {order &&
                                      order.shipping_address &&
                                      order.shipping_address.landmark}
                                    {order &&
                                      order.shipping_address &&
                                      order.shipping_address.shipping_city}
                                    {order &&
                                      order.shipping_address &&
                                      order.shipping_address.shipping_state}
                                    {order &&
                                      order.shipping_address &&
                                      order.shipping_address.pincode}
                                  </p>

                                  <p className="location-one">Phone number</p>

                                  <p className="address-one">
                                    {order &&
                                      order.shipping_address &&
                                      order.shipping_address.mobile}
                                  </p>
                                </div>
                              </div>
                              <div className="col-lg-4"></div>
                              <div className="col-lg-4">
                                {k === 0 && (
                                  <div className="mt-3">
                                    <p className="price">
                                      Payment Menthod:
                                      {order && order.is_cod == 1
                                        ? "COD"
                                        : order && order.is_wallet_option == 1
                                        ? "Wallet Transaction" // When wallet option is selected and not COD
                                        : "Online Transaction"}
                                    </p>

                                    {order && order.products.length > 0 && (
                                      <p className="price">
                                        Items Total:
                                        <span style={{ marginLeft: "55px" }}>
                                          {order &&
                                            order.products.reduce(
                                              (acc, product) =>
                                                acc +
                                                product.final_price *
                                                  product.quantity,
                                              0
                                            )}
                                        </span>
                                      </p>
                                    )}
                                    {order && order.discount > 0 && (
                                      <p className="price">
                                        Discount:
                                        <span style={{ marginLeft: "66px" }}>
                                          ₹ {order.discount}
                                        </span>
                                      </p>
                                    )}
                                    {/* {console.log(order && order.products.reduce(
                              (acc, product) => acc + (product.final_price * product.quantity),
                              0
                            ) > 599 )} */}
                                    {order &&
                                      order.products.reduce(
                                        (acc, product) =>
                                          acc +
                                          product.final_price *
                                            product.quantity,
                                        0
                                      ) > 599 &&
                                      order.is_cod != true &&
                                      order.is_wallet_option != true && (
                                        <p className="price">
                                          1% Dis on above 599:
                                          <span>
                                            ₹
                                            {order &&
                                              order.products.reduce(
                                                (acc, product) =>
                                                  acc +
                                                  product.final_price *
                                                    product.quantity,
                                                0
                                              ) * 0.01}
                                          </span>
                                        </p>
                                      )}
                                    {order && order.shippingCharge > 0 && (
                                      <p className="price">
                                        Shipping Charges:
                                        <span className="ml-1">
                                          ₹ {order.shippingCharge}
                                        </span>
                                      </p>
                                    )}
                                    {order && order.gift_wrapping == true && (
                                      <p className="price">
                                        Gift Wrapping:
                                        <span style={{ marginLeft: "32px" }}>
                                          ₹ 40
                                        </span>
                                      </p>
                                    )}
                                    {order && order.walletMoneyUsed > 0 && (
                                      <p className="price">
                                        Wallet Money:
                                        <span style={{ marginLeft: "32px" }}>
                                          ₹ {order.walletMoneyUsed}
                                        </span>
                                      </p>
                                    )}

                                    <p className="price">
                                      Total Amount:
                                      <span style={{ marginLeft: "32px" }}>
                                        ₹ {order.subtotal}
                                      </span>
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="delivery-border"></div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <Modal show={show} onHide={handleClose} id="rateproductModal">
          <Modal.Header closeButton className="mx-0"></Modal.Header>
          <div className="modal-dialog">
            <div className="modal-content border-0">
              <div className="modal-body d-flex-column justify-content-center">
                <h1 className="modal-title">Rating & Review</h1>

                <div className="d-lg-flex d-flex-column card-border">
                  <div className="card align-self-center">
                    <img
                      className="img-fluid mx-auto"
                      src={product && product.product_image_array[0]?.image}
                      width="73px"
                      height="80px"
                      alt="product"
                    />
                  </div>

                  <div className="product-details">
                    <h2 className="heading">
                      {product && product.product_name}
                    </h2>

                    <div className="d-flex flex-wrap">
                      {/* <p className="yellow-productstar">★ ★ ★ ★ ★</p>

                    <p className="productrate align-self-center">4.8</p> */}
                      <Rating
                        name="simple-controlled"
                        readOnly
                        value={ratingReview?.ratingCount?.average}
                      />
                      <p className="productrate align-self-center">
                        {ratingReview?.ratingCount?.average}
                      </p>

                      <p className="reviewrate align-self-center">
                        {ratingReview?.ratingCount?.totalReviews} Ratings &amp;
                        {ratingReview?.ratingCount?.totalReviews} Reviews
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="rate-product">Rate this product</p>
                  <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={(event, newValue) => {
                      setRating(newValue);
                    }}
                  />
                </div>

                <div className="review-products">
                  <div className="form-group">
                    <label className="rate-product" htmlFor="review">
                      Review this product
                    </label>

                    <textarea
                      className="form-control"
                      style={{ height: 99 }}
                      type="text"
                      id="review"
                      name="review"
                      cols="10"
                      rows="10"
                      placeholder="Description"
                      value={reviewDescription}
                      onChange={(e) => setReviewDescription(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label className="rate-product" htmlFor="title">
                      Title
                    </label>

                    <input
                      className="form-control"
                      type="text"
                      id="title"
                      name="title"
                      placeholder="Description"
                      value={reviewTitleDescription}
                      onChange={(e) =>
                        setReviewTitleDescription(e.target.value)
                      }
                    />
                  </div>

                  <div className="submit-btn">
                    <Button
                      onClick={handleRateAndReview}
                      className="text-decoration-none rate-btn"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>

        <Modal
          show={orderCancelClose}
          onHide={handleOrderCancelClose}
          id="rateproductModal"
        >
          <Modal.Header closeButton className="mx-0"></Modal.Header>
          <div className="modal-dialog">
            <div className="modal-content border-0">
              <div className="modal-body d-flex-column justify-content-center">
                <h1 className="modal-title">Cancel Order</h1>
                <div className="review-products">
                  <div className="form-group" style={{ width: "400px" }}>
                    <label className="rate-product" htmlFor="title">
                      Cancellation Reason
                    </label>

                    <textarea
                      className="form-control"
                      type="text"
                      id="cancellationReason"
                      name="cancellationReason"
                      placeholder="Enter Cancellation Reason"
                      rows={3}
                      cols={3}
                      value={cancellationReason}
                      onChange={(e) => setCancellationReason(e.target.value)}
                      required
                    />
                  </div>
                  <div className="submit-btn">
                    <Button
                      onClick={handleSubmitCancelOrder}
                      className="text-decoration-none rate-btn"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default OrdersTab;
