"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import Card from "../../../../components/Card";
import AdminBreadcrumbs from "../../../../components/admin/AdminBreadcrumbs";
import { pagePaths } from "../utils/constants/constant";
import styles from "./styles.module.scss";
// import { fetchProductsOptions } from "../../../redux/action";
// import { MultiSelect } from "react-multi-select-component";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "jspdf-autotable";
import { Button, Modal } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import toast from "react-hot-toast";
import { env } from "../../../../config/env.config";
import { useRouter } from "next/navigation";
import { useParams } from "react-router-dom";

const EditAdminOrderPage = () => {
  const { id } = useParams();
  const { isLoggedIn, adminEmail } = useSelector((state) => state.auth);
  const [editData, setEditData] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [period, setPeriod] = useState("AM");
  const [billingModalPopupShow, setBillingModalPopupShow] = useState(false);
  const [shippingModalPopupShow, setShippingModalPopupShow] = useState(false);
  const [saddress, setSaddress] = useState("");
  const [slandmark, setSlandmark] = useState("");
  const [spincode, setSpincode] = useState("");
  const [scity, setScity] = useState("");
  const [sstate, setSstate] = useState("");
  const [AddressType, setAddressType] = useState();
  const [smobile, setSMobile] = useState("");
  const [semail, setSEmail] = useState("");

  const [baddress, setBaddress] = useState("");
  const [blandmark, setBlandmark] = useState("");
  const [bpincode, setBpincode] = useState("");
  const [bcity, setBcity] = useState("");
  const [bstate, setBstate] = useState("");
  const [bAddressType, setBAddressType] = useState();
  const [bmobile, setBMobile] = useState("");
  const [status, setStatus] = useState("PLACED");
  const [bemail, setBEmail] = useState("");

  const [bAddressId, setBAddressId] = useState(null);
  const [sAddressId, setSAddressId] = useState(null);
  const [orderData, setOrderData] = useState({});
  const [showTrackInfo, setShowTrackInfo] = useState(false);
  const [trackInfoData, setTrackInfoData] = useState([]);
  const navigate = useRouter();

  const [loading, setLoading] = useState(true);
  const fetchEditData = async () => {
    // setLoading(true);
    try {
      const response = await axios.get(
        `${env.REACT_SERVER_BASE_URL}/api/v1/checkout/getAdminOrderDetails/${id}`
      );
      const result = response.data;
      setOrderData(response && response.data);
      setEditData(result);
      console.log(result && result[0] && result[0].status, "sd");
      setTrackInfoData(result && result[0] && result[0].trackInfo);
      //set billing address
      setStatus(result && result[0] && result[0].status);
      setBaddress(
        result &&
          result[0] &&
          result[0].billing_address &&
          result[0].billing_address.address
      );
      setBlandmark(
        result &&
          result[0] &&
          result[0].billing_address &&
          result[0].billing_address.landmark
      );
      setBpincode(
        result &&
          result[0] &&
          result[0].billing_address &&
          result[0].billing_address.pincode
      );
      setBcity(
        result &&
          result[0] &&
          result[0].billing_address &&
          result[0].billing_address.city
      );
      setBstate(
        result &&
          result[0] &&
          result[0].billing_address &&
          result[0].billing_address.state
      );
      setBAddressType(
        result &&
          result[0] &&
          result[0].billing_address &&
          result[0].billing_address.address_type
      );
      setBMobile(
        result &&
          result[0] &&
          result[0].billing_address &&
          result[0].billing_address.mobile
      );
      setBEmail(
        result &&
          result[0] &&
          result[0].billing_address &&
          result[0].billing_address.email
      );
      setBAddressId(result && result[0] && result[0].billing_address_id);

      //set shipping address
      setSaddress(
        result &&
          result[0] &&
          result[0].shipping_address &&
          result[0].shipping_address.address
      );
      setSlandmark(
        result &&
          result[0] &&
          result[0].shipping_address &&
          result[0].shipping_address.landmark
      );
      setSpincode(
        result &&
          result[0] &&
          result[0].shipping_address &&
          result[0].shipping_address.pincode
      );
      setScity(
        result &&
          result[0] &&
          result[0].shipping_address &&
          result[0].shipping_address.city
      );
      setSstate(
        result &&
          result[0] &&
          result[0].shipping_address &&
          result[0].shipping_address.state
      );
      setAddressType(
        result &&
          result[0] &&
          result[0].shipping_address &&
          result[0].shipping_address.address_type
      );
      setSMobile(
        result &&
          result[0] &&
          result[0].shipping_address &&
          result[0].shipping_address.mobile
      );
      setSEmail(
        result &&
          result[0] &&
          result[0].shipping_address &&
          result[0].shipping_address.email
      );
      setSAddressId(result && result[0] && result[0].shipping_address_id);

      const dateTimeString = result && result[0] && result[0].created_at;
      const dateObj = new Date(dateTimeString);
      const dateString = dateObj.toISOString().split("T")[0];
      let hours = dateObj.getHours();
      let minutes = dateObj.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      const timeString = `${hours}:${minutes}`;
      setDate(dateString);
      setTime(`${timeString} ${ampm}`);

      setPeriod(ampm);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    // setLoading(false);
  };
  useEffect(() => {
    fetchEditData();
  }, []);
  //billing address and popup show
  const handleBillingAddress = () => {
    setBillingModalPopupShow(true);
  };
  const handleClosePopup = () => {
    setBillingModalPopupShow(false);
  };

  const handleBAddressType = (event) => {
    setBAddressType(event.target.value);
  };
  const handleBaddress = (event) => {
    setBaddress(event.target.value);
  };
  const handleBlandmark = (event) => {
    setBlandmark(event.target.value);
  };
  const handleBpincode = (event) => {
    setBpincode(event.target.value);
  };
  const handleBcity = (event) => {
    setBcity(event.target.value);
  };
  const handleBstate = (event) => {
    setBstate(event.target.value);
  };
  const handleBmobile = (event) => {
    setBMobile(event.target.value);
  };
  const handleBEmail = (event) => {
    setBEmail(event.target.value);
  };
  //shipping addresss popup show
  const handleShippingAddress = () => {
    setShippingModalPopupShow(true);
  };
  const handleCloseShippingPopup = () => {
    setShippingModalPopupShow(false);
  };
  const handleAddressType = (event) => {
    setAddressType(event.target.value);
  };
  const handleSaddress = (event) => {
    setSaddress(event.target.value);
  };
  const handleSlandmark = (event) => {
    setSlandmark(event.target.value);
  };
  const handleSpincode = (event) => {
    setSpincode(event.target.value);
  };
  const handleScity = (event) => {
    setScity(event.target.value);
  };
  const handleSstate = (event) => {
    setSstate(event.target.value);
  };
  const handleSmobile = (event) => {
    setSMobile(event.target.value);
  };
  const handleSEmail = (event) => {
    setSEmail(event.target.value);
  };
  const handleStatus = (event) => {
    setStatus(event.target.value);
  };
  const handleBillingAddressSubmit = async (event) => {
    event.preventDefault();
    let formData = {};
    formData = {
      order_placed_status: status,
      user_id:
        editData &&
        editData[0] &&
        editData[0].billing_address &&
        editData[0].billing_address.user_id,
      billing_address: {
        // id: bAddressId,
        user_id:
          editData &&
          editData[0] &&
          editData[0].billing_address &&
          editData[0].billing_address.user_id,
        name:
          editData &&
          editData[0] &&
          editData[0].billing_address &&
          editData[0].billing_address.name,
        email: bemail,
        mobile: bmobile,
        address: baddress,
        landmark: blandmark,
        pincode: bpincode,
        other_title: null,
        city: bcity,
        state: bstate,
        address_type: bAddressType,
      },
      shipping_address: {
        id: sAddressId,
        user_id:
          editData &&
          editData[0] &&
          editData[0].shipping_address &&
          editData[0].shipping_address.user_id,
        name:
          editData &&
          editData[0] &&
          editData[0].shipping_address &&
          editData[0].shipping_address.name,
        email: semail,
        mobile: smobile,
        address: saddress,
        landmark: slandmark,
        pincode: spincode,
        other_title: null,
        city: scity,
        state: sstate,
        address_type: AddressType,
      },
    };
    console.log(formData, "formData");
    // return;
    try {
      const response = await axios.put(
        `${env.REACT_SERVER_BASE_URL}/api/v1/checkout/updateAdminOrderDetails/${id}`,
        formData
      );
      let data = response.data;
      if (data) {
        setBillingModalPopupShow(false);
        toast.success("Billing Address Updated Successfully");
        fetchEditData();
        // navigate.push(pagePaths.adminOrders);
      }
      navigate.push(pagePaths.adminEditOrder);
    } catch (error) {
      const edata = error.response.data;
      toast.error(edata && edata.error);
    }
  };
  const handleShippingAddressSubmit = async (event) => {
    event.preventDefault();
    let formData = {};
    formData = {
      order_placed_status: status,
      user_id:
        editData &&
        editData[0] &&
        editData[0].shipping_address &&
        editData[0].shipping_address.user_id,
      billing_address: {
        id: bAddressId,
        user_id:
          editData &&
          editData[0] &&
          editData[0].billing_address &&
          editData[0].billing_address.user_id,
        name:
          editData &&
          editData[0] &&
          editData[0].billing_address &&
          editData[0].billing_address.name,
        email: bemail,
        mobile: bmobile,
        address: baddress,
        landmark: blandmark,
        pincode: bpincode,
        other_title: null,
        city: bcity,
        state: bstate,
        address_type: bAddressType,
      },
      shipping_address: {
        // id: sAddressId,
        user_id:
          editData &&
          editData[0] &&
          editData[0].shipping_address &&
          editData[0].shipping_address.user_id,
        name:
          editData &&
          editData[0] &&
          editData[0].shipping_address &&
          editData[0].shipping_address.name,
        email: semail,
        mobile: smobile,
        address: saddress,
        landmark: slandmark,
        pincode: spincode,
        other_title: null,
        city: scity,
        state: sstate,
        address_type: AddressType,
      },
    };

    console.log(formData, "formData");
    // return;
    try {
      const response = await axios.put(
        `${env.REACT_SERVER_BASE_URL}/api/v1/checkout/updateAdminOrderDetails/${id}`,
        formData
      );
      let data = response.data;
      if (data) {
        setShippingModalPopupShow(false);
        toast.success("Shipping Address Updated Successfully");
        fetchEditData();
        // navigate.push(pagePaths.adminOrders);
      }
      navigate.push(pagePaths.adminEditOrder);
    } catch (error) {
      const edata = error.response.data;
      toast.error(edata && edata.error);
    }
  };
  // const total = editData&&editData.reduce((acc, current) => acc + current.amount, 0);
  const total = editData.reduce(
    (acc, current) => ({
      totalAmount: acc.totalAmount + current.final_price * current.quantity,
      totalQuantity: acc.totalQuantity + current.quantity,
    }),
    { totalAmount: 0, totalQuantity: 0 }
  );
  // const handleInvoiceDownload = () => {

  //     const doc = new jsPDF("p", "pt");

  //     // Set font styles
  //     doc.setFont("Arial");
  //     doc.setFontSize(12);

  //     // Invoice header
  //     doc.setFillColor(255, 255, 255);
  //     doc.rect(20, 20, 550, 100, "F");
  //     doc.setTextColor(0, 0, 0);
  //     doc.setFontSize(20);
  //     doc.text("Invoice", 290, 70, { align: "center" });

  //     // Company details
  //     doc.setFontSize(12);
  //     doc.text("75/1, Alagar Kovil Main Rd", 50, 120);
  //     doc.text("Surveyor Colony,", 50, 140);
  //     doc.text("Madurai, Tamil Nadu 625007", 50, 160);
  //     doc.text("GST No: 33AABCW6108R1ZY", 50, 180);
  //     doc.text("CIN No: U52310TN2014PTC098403", 50, 200);

  //     // Company logo
  //     const logo = new Image();
  //     logo.src =
  //         "https://www.cureka.com/wp-content/uploads/2020/11/logo-dark-3.png";
  //     doc.addImage(logo, "PNG", 350, 120);

  //     // Invoice details
  //     doc.setTextColor(0, 0, 0);
  //     doc.setFontSize(12);
  //     doc.text("Order No:", 370, 220);
  //     doc.text(`${orderData[0] && orderData[0].order_id}`, 475, 220);
  //     doc.text("Invoice Date:", 370, 240);
  //     doc.text(`${new Date(orderData[0] && orderData[0].created_at).toLocaleDateString("en-IN", {
  //         day: '2-digit',
  //         month: '2-digit',
  //         year: 'numeric'
  //     }).replace(/\//g, '/')}`, 475, 240);
  //     doc.text("Total Amount", 370, 260);
  //     // doc.text(`${orderData[0] && orderData[0].subtotal}`, 475, 280);
  //     // doc.text(`${(parseInt(orderData[0] && orderData[0].subtotal) + parseInt(orderData[0] && orderData[0].walletMoneyUsed)).toFixed(2)}`, 475, 280);
  //     doc.text(
  //         `${(
  //             (parseInt(orderData[0]?.subtotal, 10) || 0) +
  //             (parseInt(orderData[0]?.walletMoneyUsed, 10) || 0)
  //         ).toFixed(2)}`,
  //         475,
  //         260
  //     );

  //     // Contact details
  //     doc.setFontSize(12);
  //     doc.text(`${orderData[0] && orderData[0].shipping_address.name}`, 50, 240);
  //     doc.text(`${orderData[0] && orderData[0].shipping_address.mobile},${orderData[0] && orderData[0].shipping_address.email}`, 50, 260);
  //     doc.text(`${orderData[0] && orderData[0].shipping_address.address}`, 50, 280);
  //     doc.text(`${orderData[0] && orderData[0].shipping_address.landmark},${orderData[0] && orderData[0].shipping_address.city},${orderData[0] && orderData[0].shipping_address.state},${orderData[0] && orderData[0].shipping_address.pincode}`, 50, 300);

  //     // // Products table
  //     const tableRows = orderData.map((item) => [
  //         `${item.product_name}`,
  //         `${item.quantity}`,
  //         `${(item.product_price).toFixed(2)}`,
  //         `${(item.final_price).toFixed(2)}`,
  //         `${(item.quantity * item.final_price).toFixed(2)}`,
  //         `${(item.quantity * item.final_price).toFixed(2)}`
  //     ]);

  //     const tableProps = {
  //         startY: 340,
  //         head: [
  //             [
  //                 "Product Name",
  //                 "Qty",
  //                 "Regular Price",
  //                 "Sale Price",
  //                 "Line Total",
  //                 "Total (Inc.Tax)",
  //             ],
  //         ],
  //         body: tableRows,
  //         theme: "grid",
  //         styles: { fontSize: 10 },
  //         columnStyles: {
  //             0: { cellWidth: "auto" },
  //         },
  //     };

  //     doc.autoTable(tableProps);

  //     let onePerDiscountApplied;

  //     // // Calculate subtotal, discount, and total (dummy values for illustration)
  //     const subtotal = orderData[0] && orderData[0].subtotal ? orderData[0] && orderData[0].subtotal : 0.00;
  //     const discount = orderData[0] && orderData[0].discount !== null ? orderData[0] && orderData[0].discount : 0.00;
  //     const shippingCharge = Number(orderData[0] && orderData[0].shippingCharge).toFixed(2) !== undefined ? Number(orderData[0] && orderData[0].shippingCharge).toFixed(2) : 0.00
  //     const transactionType = orderData[0] && orderData[0].is_cod == 1 ? "COD" : orderData[0] && orderData[0].is_wallet_option == 1 ? "Wallet Transaction" // When wallet option is selected and not COD
  //         : "Online Transaction"; // Fallback, default for non-COD scenarios
  //     let walletMoneyUsed = Number(orderData[0] && orderData[0].walletMoneyUsed).toFixed(2)
  //     let gift_wrapping = orderData[0] && orderData[0].gift_wrapping
  //     const totalItemSum = orderData && orderData.reduce((acc, product) => {
  //         // Convert price to a number and calculate the total for this product
  //         const productTotal = product.final_price * product.quantity;
  //         // Add to the accumulator
  //         return acc + productTotal;
  //     }, 0);
  //     if (totalItemSum > 599 && transactionType == "Online Transaction") {
  //         onePerDiscountApplied = totalItemSum * 0.01
  //     }
  //     // return
  //     const total = subtotal - 0;
  //     const totaAmt = Number(total) + Number(shippingCharge)
  //     // Display subtotal, discount, and total
  //     // return
  //     if (transactionType) {
  //         doc.text("Payment Method:", 370, doc.autoTable.previous.finalY + 20);
  //         doc.text(transactionType, 470, doc.autoTable.previous.finalY + 20);
  //     }
  //     doc.text("Item Total:", 370, doc.autoTable.previous.finalY + 40);
  //     doc.text(totalItemSum.toString(), 470, doc.autoTable.previous.finalY + 40);
  //     if (discount > 0) {
  //         doc.text("Discount:", 370, doc.autoTable.previous.finalY + 60);
  //         doc.text(`-${discount}`, 470, doc.autoTable.previous.finalY + 60);
  //     }
  //     else {
  //         doc.text("Discount:", 370, doc.autoTable.previous.finalY + 60);
  //         doc.text("0.00", 470, doc.autoTable.previous.finalY + 60);
  //     }
  //     if (onePerDiscountApplied > 0) {
  //         doc.text("1% Dis bove 599:", 370, doc.autoTable.previous.finalY + 80);
  //         doc.text(`-${onePerDiscountApplied}`.toString(), 470, doc.autoTable.previous.finalY + 80);
  //     }
  //     else {
  //         doc.text("1% Dis bove 599:", 370, doc.autoTable.previous.finalY + 80);
  //         doc.text("0.00".toString(), 470, doc.autoTable.previous.finalY + 80);
  //     }
  //     if (gift_wrapping == true) {
  //         doc.text("Gift Wrapping:", 370, doc.autoTable.previous.finalY + 100);
  //         doc.text("+ 40.00", 470, doc.autoTable.previous.finalY + 100);
  //     }
  //     else {
  //         doc.text("Gift Wrapping:", 370, doc.autoTable.previous.finalY + 100);
  //         doc.text("0.00", 470, doc.autoTable.previous.finalY + 100);
  //     }
  //     doc.text("Shipping Charges:", 370, doc.autoTable.previous.finalY + 120);
  //     doc.text(`+${shippingCharge.toString()}`, 470, doc.autoTable.previous.finalY + 120);

  //     if (walletMoneyUsed > 0) {
  //         doc.text("Wallet Money:", 370, doc.autoTable.previous.finalY + 140);
  //         doc.text(walletMoneyUsed.toString(), 470, doc.autoTable.previous.finalY + 140);
  //     }

  //     doc.text("Amount Paid:", 370, doc.autoTable.previous.finalY + 160);
  //     doc.text(Math.round(subtotal).toFixed(2).toString(), 470, doc.autoTable.previous.finalY + 160);

  //     // Notes section
  //     doc.setFontSize(12);
  //     const notesStartY = doc.autoTable.previous.finalY + 180;
  //     doc.text("Notes", 50, notesStartY);
  //     const notesText =
  //         "Inclusive of all taxes.\n" +
  //         "This is a computer generated Invoice. No signature is required.";
  //     const notesLines = doc.splitTextToSize(notesText, 500);
  //     doc.setFillColor(238, 246, 255);
  //     doc.rect(50, notesStartY + 10, 500, notesLines.length * 12 + 10, "F");
  //     doc.text(notesLines, 55, notesStartY + 20);

  //     // Footer
  //     const footerY = notesStartY + notesLines.length * 12 + 30;
  //     doc.setTextColor(0, 0, 0);
  //     doc.setLineWidth(0.5);
  //     doc.line(50, footerY, 550, footerY);
  //     doc.setFontSize(12);
  //     doc.text(
  //         "For customer support contact us @ Toll Free : +91 96559 28004",
  //         300,
  //         footerY + 20, { align: "center" }
  //     );
  //     doc.text("Website: www.cureka.com", 300, footerY + 35, { align: "center" });
  //     doc.text("Drop an email to info@cureka.com", 300, footerY + 50, { align: "center" });

  //     // Save the PDF
  //     doc.save("invoice.pdf");

  // }

  const handleInvoiceDownload = async () => {
    try {
      const response = await axios.get(
        `${env.REACT_SERVER_BASE_URL}/api/v1/checkout/getUniInvoice/${id}`,
        {
          responseType: "blob",
        }
      );

      if (response && response.data) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;

        // Provide a default file name for the download
        link.setAttribute("download", `invoice_${id}.pdf`);

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

  const handleOrderStatusSubmit = async () => {
    let formData = {};
    formData = {
      status: status,
    };
    try {
      const response = await axios.put(
        `${env.REACT_SERVER_BASE_URL}/api/v1/checkout/updateStatus/${id}`,
        formData
      );
      if (response && response.data) {
        toast.success("Order Status Updated Successfully");
        navigate.push(pagePaths.adminOrders);
      }
    } catch (error) {
      const edata = error && error.response && error.response.data;
      toast.error(edata && edata.error);
    }
  };
  const handleTrackInfo = () => {
    setShowTrackInfo(true);
  };
  const handleCloseTrackInfo = () => {
    setShowTrackInfo(false);
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
  return (
    <div className={styles.container}>
      <AdminBreadcrumbs
        items={[
          {
            path: pagePaths.adminOrders,
            label: "Orders Management",
          },
          {
            path: pagePaths.adminEditOrder,
            label: "Edit Order",
          },
        ]}
      />
      <div>
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <p className={styles.title}>Edit Order</p>
          </div>
          <div className="row">
            <Card className={`col-lg-8 ${styles.card}`}>
              <div className="row">
                <h4>
                  Order {editData && editData[0] && editData[0].order_id}
                  details
                </h4>
                <p>
                  Payment via
                  {editData && editData[0] && editData[0].is_cod == 1
                    ? "Cash on Delivery"
                    : editData[0] && editData[0].is_wallet_option == 1
                    ? "Wallet Transaction"
                    : "Online Transaction"}
                </p>
              </div>
              <div className="row">
                <div className="col-4 mt-3">
                  <h6>General</h6>
                  <label className="mt-2" htmlFor="date">
                    Date created:
                  </label>
                  <div className="form-group">
                    <input
                      className="form-control"
                      id="date"
                      type="date"
                      min="06-06-2024"
                      max="06-06-2090"
                      value={date}
                      disabled
                    />
                    <input
                      className="form-control mt-3"
                      value={time}
                      disabled
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="status">Status:</label>
                    <br />
                    <select value={status} onChange={handleStatus}>
                      <option value="Processing">Processing</option>
                      <option value="Pending Payment">Pending Payment</option>
                      <option value="On Hold">On Hold</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Partially Shipped">
                        Partially Shipped
                      </option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="PLACED">PLACED</option>
                    </select>
                  </div>
                  <div>
                    <Button
                      className={styles.invoicebtn}
                      onClick={handleOrderStatusSubmit}
                    >
                      Update Order Status
                    </Button>
                  </div>
                </div>
                <div className="col-4 mt-3">
                  <h6 className="">
                    Billing
                    <button
                      className="btn-sm float-right"
                      onClick={handleBillingAddress}
                    >
                      <FontAwesomeIcon icon={faPencil} />
                    </button>
                  </h6>

                  <p className="mt-2">
                    {editData &&
                      editData[0] &&
                      editData[0].billing_address &&
                      editData[0].billing_address.name}
                  </p>
                  <p>
                    {editData &&
                      editData[0] &&
                      editData[0].billing_address &&
                      editData[0].billing_address.address_type}
                    :
                    {editData &&
                      editData[0] &&
                      editData[0].billing_address &&
                      editData[0].billing_address.address}
                  </p>
                  <p>
                    {editData &&
                      editData[0] &&
                      editData[0].billing_address &&
                      editData[0].billing_address.landmark}
                  </p>
                  <p>
                    {editData &&
                      editData[0] &&
                      editData[0].billing_address &&
                      editData[0].billing_address.city}
                    {editData &&
                      editData[0] &&
                      editData[0].billing_address &&
                      editData[0].billing_address.pincode}
                  </p>
                  <p>
                    {editData &&
                      editData[0] &&
                      editData[0].billing_address &&
                      editData[0].billing_address.state}
                  </p>
                  <p className="mt-3">Email address:</p>
                  <a href="#">
                    <u>
                      {editData &&
                        editData[0] &&
                        editData[0].billing_address &&
                        editData[0].billing_address.email}
                    </u>
                  </a>
                  <p className="mt-3">Phone:</p>
                  <a href="#">
                    <u>
                      {editData &&
                        editData[0] &&
                        editData[0].billing_address &&
                        editData[0].billing_address.mobile}
                    </u>
                  </a>
                </div>
                <div className="col-4 mt-3">
                  <h6 className="">
                    Shipping
                    <button
                      className="btn-sm float-right"
                      onClick={handleShippingAddress}
                    >
                      <FontAwesomeIcon icon={faPencil} />
                    </button>
                  </h6>
                  <p className="mt-2">
                    {editData &&
                      editData[0] &&
                      editData[0].shipping_address &&
                      editData[0].shipping_address.name}
                  </p>
                  <p>
                    {editData &&
                      editData[0] &&
                      editData[0].shipping_address &&
                      editData[0].shipping_address.address_type}
                    :
                    {editData &&
                      editData[0] &&
                      editData[0].shipping_address &&
                      editData[0].shipping_address.address}
                  </p>
                  <p>
                    {editData &&
                      editData[0] &&
                      editData[0].shipping_address &&
                      editData[0].shipping_address.landmark}
                  </p>
                  <p>
                    {editData &&
                      editData[0] &&
                      editData[0].shipping_address &&
                      editData[0].shipping_address.city}
                    {editData &&
                      editData[0] &&
                      editData[0].shipping_address &&
                      editData[0].shipping_address.pincode}
                  </p>
                  <p>
                    {editData &&
                      editData[0] &&
                      editData[0].shipping_address &&
                      editData[0].shipping_address.state}
                  </p>
                  <p className="mt-3">Email address:</p>
                  <a href="#">
                    <u>
                      {editData &&
                        editData[0] &&
                        editData[0].shipping_address &&
                        editData[0].shipping_address.email}
                    </u>
                  </a>
                  <p className="mt-3">Phone:</p>
                  <a href="#">
                    <u>
                      {editData &&
                        editData[0] &&
                        editData[0].shipping_address &&
                        editData[0].shipping_address.mobile}
                    </u>
                  </a>
                </div>
              </div>
            </Card>
            {/* <div className="col-lg-1 px-0"></div> */}
            <Card className="col-lg-4">
              <Accordion defaultActiveKey="0" className="p-0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Shipment Tracking</Accordion.Header>
                  <Accordion.Body className="text-center">
                    <Button
                      className={styles.trackingbtn}
                      onClick={handleTrackInfo}
                    >
                      Get Tracking Info
                    </Button>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <Accordion defaultActiveKey="0" className="p-0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Invoice Details</Accordion.Header>
                  <Accordion.Body>
                    <div className="d-flex justify-content-around">
                      {/* <Button className={styles.invoicebtn}>Invoice Status</Button> */}
                      <Button
                        className={styles.invoicebtn}
                        onClick={handleInvoiceDownload}
                      >
                        Invoice Download
                      </Button>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Card>
          </div>
          <div className="row" style={{ marginTop: "10px" }}>
            <Card className={`col-lg-12 ${styles.card}`}>
              {editData && editData.length > 0 && (
                <Card className={styles.card}>
                  <Form.Group>
                    <Form.Label>Product Details</Form.Label>
                    <table className="table table-striped mt-3">
                      <thead>
                        <tr>
                          <th style={{ backgroundColor: "#004a98" }}>
                            Order ID
                          </th>
                          <th style={{ backgroundColor: "#004a98" }}>Image</th>
                          <th style={{ backgroundColor: "#004a98" }}>
                            Product Name
                          </th>
                          <th style={{ backgroundColor: "#004a98" }}>Price</th>
                          <th style={{ backgroundColor: "#004a98" }}>
                            Quantity
                          </th>
                          <th style={{ backgroundColor: "#004a98" }}>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {editData &&
                          editData.map((productName) => (
                            <tr key={productName.product_id}>
                              <td>{productName.product_id}</td>
                              <td>{productName.product_name}</td>
                              <td>{productName.product_price}</td>
                              <td>{productName.quantity}</td>
                              <td> ₹ {Number(productName.product_price) * Number(productName.quantity)}</td>
                            </tr>
                          ))} */}
                        {editData &&
                          editData.map((item) => {
                            const imgeInfo = item && item.product_image_array;
                            return (
                              <tr key={item.product_id}>
                                <td>{item.product_id}</td>
                                <td>
                                  {imgeInfo &&
                                    imgeInfo.map((url, index) => (
                                      <img
                                        key={index}
                                        src={url.image}
                                        alt={item.name}
                                        width="50"
                                        height="50"
                                        style={{ margin: "0 5px" }}
                                      />
                                    ))}
                                </td>
                                <td>{item.product_name}</td>
                                <td>{item && item.final_price}</td>
                                <td>{item.quantity}</td>
                                <td>
                                  ₹
                                  {Number(item && item.final_price) *
                                    Number(item.quantity)}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label style={{ color: "#ff9800", marginright: "20" }}>
                      Item Subtotal:
                    </Form.Label>
                    ₹ {Number(total && total.totalAmount).toFixed(2)}
                  </Form.Group>
                  {editData && editData[0] && editData[0].discount && (
                    <Form.Group>
                      <Form.Label
                        style={{ color: "#ff9800", marginright: "20" }}
                      >
                        Coupon Discount:
                        {editData && editData[0] && editData[0].coupon_code}
                      </Form.Label>
                      -₹
                      {Number(
                        editData && editData[0] && editData[0].discount
                      ).toFixed(2)}
                    </Form.Group>
                  )}
                  {total &&
                    total.totalAmount > 599 &&
                    editData &&
                    editData[0] &&
                    editData[0].is_cod != true && (
                      <Form.Group>
                        <Form.Label
                          style={{ color: "#ff9800", marginright: "20" }}
                        >
                          1% Discount on above 599:
                        </Form.Label>
                        -₹
                        {Number(total && total.totalAmount * 0.01).toFixed(2)}
                      </Form.Group>
                    )}
                  {editData &&
                    editData[0] &&
                    editData[0].gift_wrapping == true && (
                      <Form.Group>
                        <Form.Label
                          style={{ color: "#ff9800", marginright: "20" }}
                        >
                          Gift Wrapping:
                        </Form.Label>
                        ₹ {Number(40).toFixed(2)}
                      </Form.Group>
                    )}
                  {editData && editData[0] && editData[0].shippingCharge && (
                    <Form.Group>
                      <Form.Label
                        style={{ color: "#ff9800", marginright: "20" }}
                      >
                        Shipping Charge:
                      </Form.Label>
                      ₹
                      {Number(
                        editData && editData[0] && editData[0].shippingCharge
                      ).toFixed(2)}
                    </Form.Group>
                  )}
                  {editData &&
                    editData[0] &&
                    editData[0].walletMoneyUsed > 0 && (
                      <Form.Group>
                        <Form.Label
                          style={{ color: "#ff9800", marginright: "20" }}
                        >
                          Wallet Money Used:
                        </Form.Label>
                        ₹
                        {Number(
                          editData && editData[0] && editData[0].walletMoneyUsed
                        ).toFixed(2)}
                      </Form.Group>
                    )}
                  <Form.Group>
                    <Form.Label style={{ color: "#ff9800", marginright: "20" }}>
                      Amount Paid:
                    </Form.Label>
                    ₹
                    {Number(
                      editData && editData[0] && editData[0].subtotal
                    ).toFixed(2)}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label style={{ color: "#ff9800", marginright: "20" }}>
                      Total Amount:
                    </Form.Label>
                    ₹
                    {(
                      Number((editData && editData[0]?.subtotal) || 0) +
                      Number((editData && editData[0]?.walletMoneyUsed) || 0)
                    ).toFixed(2)}
                  </Form.Group>
                </Card>
              )}
            </Card>
          </div>
          {/* Billing popup */}
          <Modal
            id=""
            show={billingModalPopupShow}
            onHide={handleClosePopup}
            size="lg"
          >
            <Modal.Header closeButton></Modal.Header>
            <Form
              onSubmit={handleBillingAddressSubmit}
              className={styles.formItems}
            >
              <div style={{ textAlign: "", padding: "10px" }}>
                <Form.Group>
                  <Form.Label>Billing Address</Form.Label>
                  <Form.Group></Form.Group>

                  <Form.Label>
                    Address <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={baddress}
                    onChange={handleBaddress}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Email <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="bemail"
                    value={bemail}
                    onChange={handleBEmail}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Landmark <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="landmark"
                    value={blandmark}
                    onChange={handleBlandmark}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Pincode <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="pincode"
                    value={bpincode}
                    onChange={handleBpincode}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Mobile Number <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="bmobile"
                    value={bmobile}
                    onChange={handleBmobile}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    City <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={bcity}
                    onChange={handleBcity}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    State <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    value={bstate}
                    onChange={handleBstate}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Address Type<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    name="addtype"
                    onChange={handleBAddressType}
                    value={bAddressType}
                  >
                    <option value="selectValue">Select Address Type</option>
                    <option value="Home">Home</option>
                    <option value="Office">Office</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div
                style={{
                  width: "100px",
                  textAlign: "center",
                  marginBottom: "20px",
                }}
              >
                <Button type="submit">Submit</Button>
              </div>
            </Form>
          </Modal>
          {/* shippinh popup */}
          <Modal
            id=""
            show={shippingModalPopupShow}
            onHide={handleCloseShippingPopup}
            size="lg"
          >
            <Modal.Header closeButton></Modal.Header>
            <Form
              onSubmit={handleShippingAddressSubmit}
              className={styles.formItems}
            >
              <div style={{ textAlign: "", padding: "10px" }}>
                <Form.Group>
                  <Form.Label>Shipping Address</Form.Label>
                  <Form.Group></Form.Group>

                  <Form.Label>
                    Address <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={saddress}
                    onChange={handleSaddress}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Email <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="semail"
                    value={semail}
                    onChange={handleSEmail}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Landmark <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="landmark"
                    value={slandmark}
                    onChange={handleSlandmark}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Pincode <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="pincode"
                    value={spincode}
                    onChange={handleSpincode}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Mobile Number <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="mobile"
                    value={smobile}
                    onChange={handleSmobile}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    City <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={scity}
                    onChange={handleScity}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    State <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    value={sstate}
                    onChange={handleSstate}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Address Type<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    name="addtype"
                    onChange={handleAddressType}
                    value={AddressType}
                  >
                    <option value="selectValue">Select Address Type</option>
                    <option value="Home">Home</option>
                    <option value="Office">Office</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div
                style={{
                  width: "100px",
                  textAlign: "center",
                  marginBottom: "20px",
                }}
              >
                <Button type="submit">Submit</Button>
              </div>
            </Form>
          </Modal>

          {/* Track Info Modal */}
          <Modal
            id="tag-people"
            size="md"
            // style={{ marginTop: '50px' }}
            show={showTrackInfo}
            onHide={handleCloseTrackInfo}
          >
            <Modal.Header>
              <Modal.Title>Tracking Information</Modal.Title>
              <button
                type="button"
                onClick={handleCloseTrackInfo}
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                ×
              </button>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-4">
                {trackInfoData?.scans?.length > 0 ? (
                  trackInfoData.scans.map((item, index) => (
                    <div className="d-flex" key={index} id="tracking">
                      <div className={`px-5 d-flex-column`}>
                        <div className={styles.trackingBar} id="trackingBar">
                          <div
                            className="progress-bar"
                            style={{
                              width: "2px",
                              height: "50px",
                              margin: "auto",
                              borderRadius: "10px",
                              backgroundColor: "#000",
                            }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <p className={styles.orderConfirm}>
                          {item["sr-status-label"]}
                        </p>
                        <p className={styles.confirmDate}>
                          {trackerFormatDate(item.date)}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <h6>No Data Found</h6>
                )}
              </div>
            </Modal.Body>
          </Modal>
        </Card>
      </div>
    </div>
  );
};

export default EditAdminOrderPage;
