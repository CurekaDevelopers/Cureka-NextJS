"use client";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
import { MultiSelect } from "react-multi-select-component";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Card from "../../../../components/Card";
import AdminBreadcrumbs from "../../../../components/admin/AdminBreadcrumbs";
import {
  fetchProductsOptions,
  getAddressOnPincode,
} from "../../../../redux/action";
import { pagePaths } from "../../../../utils/constants/constant";
import styles from "./styles.module.scss";
import { env } from "../../../../config/env.config";
import { FixedSizeList as List } from "react-window";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const AdminCreateOrderPage = () => {
  const navigate = useRouter();
  const [isBillingAndShippingSame, setIsBillingAndShippingSame] =
    useState(true);
  const [isGiftWrapping, setIsGiftWrapping] = useState(false);
  const [productsList, setProductsList] = useState([]);
  const numberOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [priceData, setPriceData] = useState([]);
  const [payMethod, setPayMethod] = useState();
  const [AddressType, setAddressType] = useState();
  const [billingAddressType, setBillingAddressType] = useState();
  const [totalAmt, setTotalAmt] = useState(0);
  const { productOptions } = useSelector((state) => state.admin);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [coupon, setCoupon] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [selectedOption, setSelectedOption] = useState("");
  const dispatch = useDispatch();
  const [saddress, setSaddress] = useState("");
  const [slandmark, setSlandmark] = useState("");
  const [spincode, setSpincode] = useState("");
  const [scity, setScity] = useState("");
  const [sstate, setSstate] = useState("");
  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
  });
  const [billingAddress, setBillingAddress] = useState({
    address: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
  });

  const [shippingCharge, setShippingCharge] = useState(0);
  const [shippingChargesData, setShippingChargesData] = useState([]);
  //product list
  useEffect(() => {
    dispatch(fetchProductsOptions());
    // Define an asynchronous function inside useEffect
    const fetchShippingCharges = async () => {
      try {
        // Await the result of the axios call
        const shippingChargesReponse = await axios.get(
          `${env.REACT_SERVER_BASE_URL}/api/v1/checkout/shippingCharges`
        );
        if (shippingChargesReponse) {
          setShippingChargesData(
            shippingChargesReponse &&
              shippingChargesReponse.data &&
              shippingChargesReponse.data.data
          );
        }
      } catch (error) {
        // Set the error to state for display or logging
        console.error("Error fetching data:", error);
        setError("Error fetching shipping charges.");
      }
    };

    // Call the async function
    fetchShippingCharges();
  }, [dispatch]);

  //product list
  const maskProductOptions = (opt) => {
    return opt.map((dataObject) => ({
      value: dataObject.id,
      label: dataObject.vendor_article_name,
    }));
  };
  const calculateSubtotal = (price, quantity) => price * quantity;

  //product list
  const options = useMemo(() => {
    return maskProductOptions(productOptions);
  }, [productOptions]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState(new Set());
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    setFilteredOptions(
      options.filter((option) =>
        option.label.toLowerCase().includes(lowerCaseSearchTerm)
      )
    );
  }, [searchTerm, options]);

  const toggleOption = (newSelected) => {
    console.log(newSelected, "toggleOption");

    // Create a list of selected products with quantity set to 1
    const selectedProductList = newSelected.map((item) => ({
      ...item,
      quantity: item.quantity || 1, // Default to 1 if not specified
    }));

    // Filtering product data based on selected values
    const pData = productOptions.filter((item1) =>
      newSelected.some((item2) => item1.id === item2.value)
    );
    console.log(pData, "pData");
    const selectedpriceData = pData.map((item) => ({
      ...item,
      quantity: 1, // Set default quantity to 1
    }));

    // Calculate total amount
    let totalAmount = selectedpriceData.reduce((total, product) => {
      return total + calculateSubtotal(product.final_price, product.quantity);
    }, 0);

    setTotalAmt(totalAmount);
    setPriceData(selectedpriceData);
    // setProductsList(selectedProductList);

    // Update the selected options in Set format
    const updatedSelectedOptions = new Set(
      newSelected.map((item) => item.value)
    );
    setSelectedProducts(updatedSelectedOptions);
  };

  const handleProductChange = (option) => {
    const newSelected = Array.from(selectedProducts).map((value) =>
      options.find((opt) => opt.value === value)
    );

    if (selectedProducts.has(option.value)) {
      // Remove the option if already selected
      newSelected.splice(
        newSelected.findIndex((item) => item.value === option.value),
        1
      );
    } else {
      // Add the new option
      newSelected.push({ ...option, quantity: 1 });
    }

    toggleOption(newSelected);
  };
  const handleProductQuantity = (id, newQuantity) => {
    const updatedProducts = priceData.map((product) =>
      product.id === id ? { ...product, quantity: newQuantity } : product
    );
    let totalAmount = updatedProducts.reduce((total, product) => {
      return total + calculateSubtotal(product.final_price, product.quantity);
    }, 0);
    setTotalAmt(totalAmount);

    setPriceData(updatedProducts);
    const shippingAmtCharge =
      shippingChargesData &&
      shippingChargesData.find(
        (r) => totalAmount >= r.min && totalAmount <= (r.max ?? Infinity)
      );
    setShippingCharge(shippingAmtCharge);
  };
  // on change products
  const onChangeProducts = (newSelected) => {
    const selectedProductList = newSelected.map((item) => ({
      ...item,
      quantity: 1,
    }));
    const pData = productOptions.filter((item1) =>
      newSelected.some((item2) => item1.id === item2.value)
    );
    const selectedpriceData = pData.map((item) => ({
      ...item,
      quantity: 1,
    }));
    let totalAmount = selectedpriceData.reduce((total, product) => {
      return total + calculateSubtotal(product.final_price, product.quantity);
    }, 0);
    setTotalAmt(totalAmount);
    setPriceData(selectedpriceData);
    setProductsList(selectedProductList);
  };

  //remove product
  const removeProductItem = (id) => {
    const updatedItems =
      priceData && priceData.filter((item) => item.id !== id);

    let res = updatedItems.reduce((total, product) => {
      return total + calculateSubtotal(product.final_price, product.quantity);
    }, 0);
    setTotalAmt(res);
    setPriceData(updatedItems);
    setCouponDiscount("");
  };
  //change payment method
  const handlePaymentMethod = (event) => {
    setPayMethod(event.target.value);
    const shippingAmtCharge =
      shippingChargesData &&
      shippingChargesData.find(
        (r) => totalAmt >= r.min && totalAmt <= (r.max ?? Infinity)
      );
    setShippingCharge(shippingAmtCharge);
  };
  const handleAddressType = (event) => {
    setAddressType(event.target.value);
  };
  const handleBillingAddressType = (event) => {
    setBillingAddressType(event.target.value);
  };
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleCouponChange = (event) => {
    setCoupon(event.target.value);
  };
  const handleApplyCoupon = async () => {
    if (selectedProducts.size > 0) {
      if (coupon) {
        const postData = {
          coupon_code: coupon,
          subtotal: Number(totalAmt),
          products: priceData,
        };
        try {
          const response = await axios.post(
            `${env.REACT_SERVER_BASE_URL}/admin_apply_coupon`,
            postData
          );
          const res = response.data;
          setTotalAmt(res && res.subtotal);
          setCouponDiscount(res);
          toast.success("Coupon applied Successfully");
        } catch (error) {
          const edata = error.response.data;
          toast.error(edata && edata.error);
        }
      } else {
        toast.error("Please Enter Coupon");
      }
    } else {
      toast.error("Please Select Atleast One Product");
    }
  };
  const handleTransactionIdChange = (event) => {
    setTransactionId(event.target.value);
  };
  //fetching user details based on number
  const handleMobileNumberChange = async (event) => {
    const value = event.target.value;
    // Validate mobile number to be exactly 10 digits
    if (/^\d{0,10}$/.test(value)) {
      // Regex to match exactly 10 digits
      setMobileNumber(value);
      if (value.length === 10) {
        try {
          const trimmedNumberInput = value.trim(); // Trim whitespace
          const response = await axios.get(
            `${env.REACT_SERVER_BASE_URL}/user/account/userDetailsAddress/${trimmedNumberInput}`
          );
          setUserDetails(response && response.data && response.data.result[0]);
          toast.success("User details fetched successfully");
        } catch (error) {
          console.error("Response data:", error);
          if (error.response.data) {
            toast.error("User details not found");
          }
        }
      }
    } else {
      toast.error("Mobile number must be exactly 10 digits.");
    }
  };
  const onChangeUserDetails = (event) => {
    const data =
      userDetails &&
      userDetails.address &&
      userDetails.address.length > 0 &&
      userDetails.address.find((item) => item.id == event.target.value);
    setFirstName(data.name);
    setEmail(data.email);
    setSaddress(data.address);
    setSlandmark(data.landmark);
    setSpincode(data.pincode);
    setScity(data.city);
    setSstate(data.state);
    setAddressType(data.address_type);
    setSelectedOption(event.target.value);
  };
  const handleBillingAddressChange = async (event) => {
    const { name, value } = event.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });

    // Call the API only when the pincode changes
    if (name === "pincode") {
      // Assuming pincode should be 6 digits
      try {
        const response = await getAddressOnPincode(value);
        if (response) {
          setBillingAddress((prevState) => ({
            ...prevState,
            city: response.districtname,
            state: response.statename,
          }));
        } else {
          setBillingAddress((prevState) => ({
            ...prevState,
            city: "",
            state: "",
          }));
        }
      } catch (error) {
        console.error("Error fetching address:", error);
        // Optionally handle errors here (e.g., set city and state to empty)
        setBillingAddress((prevState) => ({
          ...prevState,
          city: "",
          state: "",
        }));
      }
    }
  };

  const handleShippingAddressChange = (event) => {
    const { name, value } = event.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const toggleBillingAndShippingSame = () => {
    setIsBillingAndShippingSame(!isBillingAndShippingSame);
    // Clear shipping address when toggling to same billing and shipping
    if (isBillingAndShippingSame) {
      setBillingAddress({
        address: "",
        landmark: "",
        pincode: "",
        city: "",
        state: "",
      });
    }
  };
  const handleGiftWrapping = () => {
    setIsGiftWrapping(!isGiftWrapping);
  };
  const handleSaddress = (event) => {
    setSaddress(event.target.value);
  };
  const handleSlandmark = (event) => {
    setSlandmark(event.target.value);
  };
  const handleSpincode = (event) => {
    getAddressOnPincode(event.target.value).then((response) => {
      if (response) {
        setScity(response.districtname);
        setSstate(response.statename);
      } else {
        setScity("");
        setSstate("");
      }
    });
    setSpincode(event.target.value);
  };
  const handleScity = (event) => {
    setScity(event.target.value);
  };
  const handleSstate = (event) => {
    setSstate(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedProducts.size > 0 && AddressType && payMethod) {
      let formData = {};
      let orderData = {};
      // return
      if (couponDiscount) {
        if (isBillingAndShippingSame) {
          formData = {
            isAddressSame: isBillingAndShippingSame,
            mobile_number: mobileNumber,
            shippingAddress: {
              name: firstName,
              email: email,
              mobile: mobileNumber,
              address: saddress,
              landmark: slandmark,
              pincode: spincode,
              other_title: null,
              city: scity,
              state: sstate,
              address_type: AddressType,
            },
            orderData: {
              subtotal: isGiftWrapping
                ? Math.round(
                    Number(couponDiscount && couponDiscount.final_amount)
                  ) +
                  (shippingCharge && shippingCharge.charge) +
                  Number(40)
                : Math.round(
                    Number(couponDiscount && couponDiscount.final_amount)
                  ) + (shippingCharge && shippingCharge.charge),
              discount: Number(couponDiscount && couponDiscount.discount)
                ? Number(couponDiscount && couponDiscount.discount)
                : 0.0,
              coupon_code: coupon,
              gift_wrapping: isGiftWrapping,
              transaction_id: transactionId ? transactionId : null,
              is_cod: payMethod == "COD" ? true : false,
              shippingCharge: shippingCharge && shippingCharge.charge,
            },
            products: priceData,
          };
        } else {
          formData = {
            isAddressSame: isBillingAndShippingSame,
            mobile_number: mobileNumber,
            shippingAddress: {
              name: firstName,
              email: email,
              mobile: mobileNumber,
              address: saddress,
              landmark: slandmark,
              pincode: spincode,
              other_title: null,
              city: scity,
              state: sstate,
              address_type: AddressType,
            },
            billingAddress: {
              name: firstName,
              email: email,
              mobile: mobileNumber,
              address: billingAddress.address,
              landmark: billingAddress.landmark,
              pincode: billingAddress.pincode,
              other_title: null,
              city: billingAddress.city,
              state: billingAddress.state,
              address_type: billingAddressType,
            },

            orderData: {
              subtotal: isGiftWrapping
                ? Math.round(
                    Number(couponDiscount && couponDiscount.final_amount)
                  ) +
                  (shippingCharge && shippingCharge.charge) +
                  Number(40)
                : Math.round(
                    Number(couponDiscount && couponDiscount.final_amount)
                  ) + (shippingCharge && shippingCharge.charge),
              discount: Number(couponDiscount && couponDiscount.discount)
                ? Number(couponDiscount && couponDiscount.discount)
                : 0.0,
              coupon_code: coupon,
              gift_wrapping: isGiftWrapping,
              transaction_id: transactionId ? transactionId : null,
              is_cod: payMethod == "COD" ? true : false,
              shippingCharge: shippingCharge && shippingCharge.charge,
            },
            products: priceData,
          };
        }
      } else {
        if (isBillingAndShippingSame) {
          formData = {
            isAddressSame: isBillingAndShippingSame,
            mobile_number: mobileNumber,
            shippingAddress: {
              name: firstName,
              email: email,
              mobile: mobileNumber,
              address: saddress,
              landmark: slandmark,
              pincode: spincode,
              other_title: null,
              city: scity,
              state: sstate,
              address_type: AddressType,
            },
            orderData: {
              subtotal: isGiftWrapping
                ? Math.round(Number(totalAmt)) +
                  (shippingCharge && shippingCharge.charge) +
                  Number(40)
                : Math.round(Number(totalAmt)) +
                  (shippingCharge && shippingCharge.charge),
              discount: Number(couponDiscount && couponDiscount.discount)
                ? Number(couponDiscount && couponDiscount.discount)
                : 0.0,
              coupon_code: coupon,
              gift_wrapping: isGiftWrapping,
              transaction_id: transactionId ? transactionId : null,
              is_cod: payMethod == "COD" ? true : false,
              shippingCharge: shippingCharge && shippingCharge.charge,
            },
            products: priceData,
          };
        } else {
          formData = {
            isAddressSame: isBillingAndShippingSame,
            mobile_number: mobileNumber,
            shippingAddress: {
              name: firstName,
              email: email,
              mobile: mobileNumber,
              address: saddress,
              landmark: slandmark,
              pincode: spincode,
              other_title: null,
              city: scity,
              state: sstate,
              address_type: AddressType,
            },
            billingAddress: {
              name: firstName,
              email: email,
              mobile: mobileNumber,
              address: billingAddress.address,
              landmark: billingAddress.landmark,
              pincode: billingAddress.pincode,
              other_title: null,
              city: billingAddress.city,
              state: billingAddress.state,
              address_type: billingAddressType,
            },

            orderData: {
              subtotal: isGiftWrapping
                ? Math.round(Number(totalAmt)) +
                  (shippingCharge && shippingCharge.charge) +
                  Number(40)
                : Math.round(Number(totalAmt)) +
                  (shippingCharge && shippingCharge.charge),
              discount: Number(couponDiscount && couponDiscount.discount)
                ? Number(couponDiscount && couponDiscount.discount)
                : 0.0,
              coupon_code: coupon,
              gift_wrapping: isGiftWrapping,
              transaction_id: transactionId ? transactionId : null,
              is_cod: payMethod == "COD" ? true : false,
              shippingCharge: shippingCharge && shippingCharge.charge,
            },
            products: priceData,
          };
        }
      }
      console.log(formData, "formData");
      // return
      try {
        const response = await axios.post(
          `${env.REACT_SERVER_BASE_URL}/api/v1/checkout/admin-place-order`,
          formData
        );
        let data = response.data;
        if (data) {
          toast.success("Order Created Successfully");
          setFirstName("");
          setEmail("");
          setMobileNumber("");
          setUserDetails({});
          setPriceData([]);
          setCoupon("");
          setSaddress("");
          setSlandmark("");
          setSpincode("");
          setScity("");
          setSstate("");
          setBillingAddress({
            address: "",
            landmark: "",
            pincode: "",
            city: "",
            state: "",
          });
          setAddressType("");
          setPayMethod("");
          setIsGiftWrapping(false);
          setTotalAmt(0);
          setSelectedOption();
          setProductsList([]);
          navigate.push(pagePaths.adminOrders);
        }
      } catch (error) {
        console.error("Order error:", error);
        toast.error("Something went to wrong");
      }
    } else {
      toast.error("Please Select Required Fields");
    }
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
            path: pagePaths.adminOrderDetail,
            label: "Admin Order",
          },
        ]}
      />
      <div>
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <p className={styles.title}>Add Order</p>
          </div>
          <Form onSubmit={handleSubmit} className={styles.formItems}>
            <Form.Group>
              <Form.Label>
                User Full Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={firstName}
                onChange={handleFirstNameChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Email address <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Mobile Number <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                value={mobileNumber}
                onChange={handleMobileNumberChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                User Address<span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                name="addtype"
                onChange={onChangeUserDetails}
                value={selectedOption}
              >
                <option value="selectValue">Select </option>

                {userDetails &&
                  userDetails.address &&
                  userDetails.address.length > 0 &&
                  userDetails.address.map((option) => (
                    <option key={option.value} value={option.id}>
                      {option.name} - {option.address_type}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
            {/* <Form.Group>
                            <Form.Label htmlFor="concerns">Products<span className="text-danger">*</span></Form.Label>
                            {options?.length > 0 && <MultiSelect
                                value={productsList}
                                options={options}
                                onChange={onChangeProducts}
                                required
                            />}
                        </Form.Group> */}
            <Form.Group>
              <Form.Label htmlFor="concerns">
                Products<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Products..."
                style={{ marginBottom: "20px" }}
              />

              <List
                height={100}
                itemCount={filteredOptions.length}
                itemSize={35}
              >
                {({ index, style }) => {
                  const option = filteredOptions[index];
                  const isSelected = selectedProducts.has(option.value);
                  return (
                    <div
                      style={{
                        ...style,
                        backgroundColor: isSelected ? "#bde4ff" : "white",
                        cursor: "pointer",
                        padding: "5px",
                      }}
                      key={option.value}
                      onClick={() => handleProductChange(option)}
                    >
                      {option.label}
                    </div>
                  );
                }}
              </List>
            </Form.Group>

            <Form.Group>
              <Form.Label>Add Coupon</Form.Label>
              <Form.Control
                type="text"
                value={coupon}
                onChange={handleCouponChange}
              />
            </Form.Group>
            <Form.Group>
              <Button
                className={styles.submitButton}
                variant="primary"
                onClick={handleApplyCoupon}
              >
                Apply Coupon
              </Button>
            </Form.Group>
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
              <OverlayTrigger
                placement="top" // Position of the tooltip
                overlay={
                  <Tooltip id="pincode-tooltip">
                    "Please enter your 6-digit pincode, and the city and state
                    will be filled in automatically."
                  </Tooltip>
                }
              >
                <Form.Control
                  type="number"
                  name="pincode"
                  value={spincode}
                  onChange={handleSpincode}
                  required
                />
              </OverlayTrigger>
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
                disabled
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
                disabled
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
            <Form.Group>
              <Form.Label>Shipping address same as Billing Address</Form.Label>
              <input
                type="checkbox"
                checked={isBillingAndShippingSame}
                onChange={toggleBillingAndShippingSame}
              />
            </Form.Group>

            {!isBillingAndShippingSame && (
              <>
                <Form.Group>
                  <Form.Label>Billing Address</Form.Label>
                  <Form.Group></Form.Group>
                  <Form.Label>
                    Address <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={billingAddress.address}
                    onChange={handleBillingAddressChange}
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
                    value={billingAddress.landmark}
                    onChange={handleBillingAddressChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Pincode <span className="text-danger">*</span>
                  </Form.Label>
                  <OverlayTrigger
                    placement="top" // Position of the tooltip
                    overlay={
                      <Tooltip id="pincode-tooltip">
                        "Please enter your 6-digit pincode, and the city and
                        state will be filled in automatically."
                      </Tooltip>
                    }
                  >
                    <Form.Control
                      type="number"
                      name="pincode"
                      value={billingAddress.pincode}
                      onChange={handleBillingAddressChange}
                      required
                    />
                  </OverlayTrigger>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    City <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={billingAddress.city}
                    onChange={handleBillingAddressChange}
                    required
                    disabled
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    State <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    value={billingAddress.state}
                    onChange={handleBillingAddressChange}
                    required
                    disabled
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Address Type<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    name="addtype"
                    onChange={handleBillingAddressType}
                  >
                    <option value="selectValue">Select Address Type</option>
                    <option value="Home">Home</option>
                    <option value="Office">Office</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>
              </>
            )}
            <Form.Group>
              <Form.Label>
                Payment Method<span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                id="category_id"
                name="category_id"
                value={payMethod}
                onChange={handlePaymentMethod}
              >
                <option value="selectValue">Select Payment Method</option>
                <option value="onlineTransaction">Online Transation</option>
                <option value="COD">Cash On Delievery</option>
              </Form.Select>
            </Form.Group>
            {payMethod == "onlineTransaction" && (
              <Form.Group>
                <Form.Label>
                  Enter Transaction ID <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={transactionId}
                  onChange={handleTransactionIdChange}
                />
              </Form.Group>
            )}

            {priceData.length > 0 && (
              <>
                <Form.Group>
                  <Form.Label>Product Details</Form.Label>
                  <table className="table table-striped mt-3">
                    <thead>
                      <tr>
                        <th style={{ backgroundColor: "#004a98" }}>ID</th>
                        <th style={{ backgroundColor: "#004a98" }}>
                          Product Name
                        </th>
                        <th style={{ backgroundColor: "#004a98" }}>Quantity</th>
                        <th style={{ backgroundColor: "#004a98" }}>Price</th>
                        <th style={{ backgroundColor: "#004a98" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {priceData &&
                        priceData.map((productName) => (
                          <tr key={productName.id}>
                            <td>{productName.id}</td>
                            <td>{productName.vendor_article_name}</td>
                            <td>
                              <select
                                value={productName.quantity}
                                onChange={(e) =>
                                  handleProductQuantity(
                                    productName.id,
                                    parseInt(e.target.value)
                                  )
                                }
                              >
                                {numberOptions.map((number) => (
                                  <option key={number} value={number}>
                                    {number}
                                  </option>
                                ))}
                              </select>
                            </td>
                            {/* <td>
                              {productName.quantity?productName.quantity*productName.final_price:productName.final_price}
                            </td> */}
                            <td>
                              {calculateSubtotal(
                                productName.final_price,
                                productName.quantity
                              )}
                            </td>

                            <td>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                  removeProductItem(productName.id)
                                }
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </Form.Group>
              </>
            )}

            <Form.Group>
              <Form.Label>Add Gift-Wrapping</Form.Label>
              <input
                type="checkbox"
                checked={isGiftWrapping}
                onChange={handleGiftWrapping}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{ color: "#ff9800", marginright: "20" }}>
                Shipping charges:
              </Form.Label>
              ₹ {shippingCharge && shippingCharge.charge}
            </Form.Group>
            <Form.Group>
              <Form.Label style={{ color: "#ff9800", marginright: "20" }}>
                Sub Total:
              </Form.Label>
              ₹{Number(totalAmt)}
            </Form.Group>
            {!isGiftWrapping && !couponDiscount && (
              <Form.Group>
                <Form.Label style={{ color: "#ff9800", marginright: "20" }}>
                  Amount to be paid:
                </Form.Label>
                ₹{Number(totalAmt) + (shippingCharge && shippingCharge.charge)}
              </Form.Group>
            )}

            {isGiftWrapping && !couponDiscount && (
              <>
                <Form.Group>
                  <Form.Label style={{ color: "#ff9800", marginright: "20" }}>
                    Gift wrapping charges:
                  </Form.Label>
                  ₹ 40
                </Form.Group>
                <Form.Group>
                  <Form.Label style={{ color: "#ff9800", marginright: "20" }}>
                    Amount to be paid:
                  </Form.Label>
                  ₹
                  {Math.round(
                    Number(totalAmt) + (shippingCharge && shippingCharge.charge)
                  ) + Number(40)}
                </Form.Group>
              </>
            )}
            {!coupon == " " && couponDiscount && (
              <>
                {isGiftWrapping && (
                  <Form.Group>
                    <Form.Label style={{ color: "#ff9800", marginright: "20" }}>
                      Gift wrapping charges:
                    </Form.Label>
                    ₹ 40
                  </Form.Group>
                )}
                <Form.Group>
                  <Form.Label style={{ color: "#ff9800", marginright: "20" }}>
                    
                    Discount (
                    {couponDiscount && couponDiscount.discount_percentage}% Off)
                  </Form.Label>
                  -₹{couponDiscount && couponDiscount.discount}
                </Form.Group>
                <Form.Group>
                  <Form.Label style={{ color: "#ff9800", marginright: "20" }}>
                    Amount to be paid:
                  </Form.Label>
                  ₹{/* {couponDiscount.discount_percentage == 0 ?} */}
                  {/* {couponDiscount && couponDiscount.final_amount} */}
                  {isGiftWrapping
                    ? Math.round(
                        Number(couponDiscount && couponDiscount.final_amount)
                      ) +
                      (shippingCharge && shippingCharge.charge) +
                      Number(40)
                    : Math.round(
                        Number(couponDiscount && couponDiscount.final_amount)
                      ) + (shippingCharge && shippingCharge.charge)}
                </Form.Group>
              </>
            )}
            <Form.Label>
              
              Fields marked with <span className="text-danger">*</span> are
              mandatory
            </Form.Label>
            <Button
              type="submit"
              className={styles.submitButton}
              variant="primary"
            >
              Submit
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default AdminCreateOrderPage;
