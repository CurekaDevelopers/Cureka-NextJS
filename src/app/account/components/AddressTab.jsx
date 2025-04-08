"use client";

import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Modal,
  OverlayTrigger,
  ToggleButtonGroup,
  Tooltip,
} from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import pencil from "../../../public/images/pencil.svg";
import DeleteButton from "../../../components/DeleteButton/index";
import { env } from "../../../config/env.config";
import {
  fetchAddresses,
  getAddressOnPincode,
  updateUserAddress,
} from "../../../redux/action/index";
import { initialValues, validationSchema } from "./helper";
import Image from "next/image";

const CustomToggleButton = ({ value, children, onClick, isSelected }) => (
  <button
    type="button"
    className={`text-decoration-none ${
      isSelected ? "reorder-btn" : "office-btn"
    } mr-0`}
    onClick={() => onClick(value)}
    style={{ margin: 0 }}
  >
    {children}
  </button>
);

const AddressTab = () => {
  const formikRef = useRef();

  const { address } = useSelector((state) => state.customer);
  const dispatch = useDispatch();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addAddressShow, setAddAddressShow] = useState(false);
  const [deleteClose, setDeleteClose] = useState(false);
  const [userAddressData, setUserAddressData] = useState({});
  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchAddresses(accessToken));
  }, [dispatch]);

  const formikShippingAddress = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      const response = await updateUserAddress(
        selectedAddress.id,
        values.name,
        values.email,
        values.mobile,
        values.address,
        values.pincode,
        values.address_type,
        values.landmark,
        values.city,
        values.state
      );
      if (response.status === 200) {
        dispatch(fetchAddresses(accessToken));
        setSelectedAddress(null);
      }
    },
  });

  const formikAddShippingAddress = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const token = accessToken;
        const response = await axios.post(
          `${env.REACT_SERVER_BASE_URL}/addAddress`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status == 201) {
          toast.success(response.data?.message);
          dispatch(fetchAddresses(accessToken));
          setAddAddressShow(false);
        }
      } catch (error) {
        console.error("Error saving address:", error);
        // Handle error (e.g., show an error message)
      }
    },
  });

  const onEditAddressClicked = (address) => {
    setSelectedAddress(address);
  };
  const onDeleteButtonAddressClicked = (address) => {
    setUserAddressData(address);
    setDeleteClose(true);
  };
  const handleDeleteClose = () => {
    setDeleteClose(false);
  };
  const handleSubmitDeleteAddress = async () => {
    const token = accessToken;

    await axios.put(
      `${env.REACT_SERVER_BASE_URL}/deleteAddress/${
        userAddressData && userAddressData.id
      }`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Address deleted successfully");
    setDeleteClose(false);
    window.location.reload();
  };

  useEffect(() => {
    formikRef.current = formikShippingAddress;
  }, [formikShippingAddress]);

  useEffect(() => {
    const formik = formikRef.current || {};
    if (selectedAddress) {
      formik.setValues(selectedAddress);
    }
  }, [selectedAddress]);

  const handleAddresShow = () => {
    setAddAddressShow(true);
  };
  const handleCloseAddresShow = () => {
    setAddAddressShow(false);
  };

  const handlePinCodeBlur = () => {
    getAddressOnPincode(formikAddShippingAddress.values.pincode).then(
      (response) => {
        if (response) {
          formikAddShippingAddress.setFieldValue("city", response.districtname);
          formikAddShippingAddress.setFieldValue("state", response.statename);
        } else {
          formikAddShippingAddress.setFieldValue("city", "");
          formikAddShippingAddress.setFieldValue("state", "");
        }
      }
    );
  };
  const handleEditPinCodeBlur = () => {
    getAddressOnPincode(formikShippingAddress.values.pincode).then(
      (response) => {
        if (response) {
          formikShippingAddress.setFieldValue("city", response.districtname);
          formikShippingAddress.setFieldValue("state", response.statename);
        } else {
          formikShippingAddress.setFieldValue("city", "");
          formikShippingAddress.setFieldValue("state", "");
        }
      }
    );
  };
  return (
    <>
      <Helmet>
        <title>Manage Shipping Addresses - Add, Edit & Save | Cureka</title>
        <meta
          name="description"
          content="Easily add, edit, and manage your shipping addresses in your account at Cureka. Keep your delivery details up to date for a smooth shopping experience."
        />
        <link rel="canonical" href={window.location.href} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cureka" />
        <meta
          property="og:description"
          content="Easily add, edit, and manage your shipping addresses in your account at Cureka. Keep your delivery details up to date for a smooth shopping experience."
        />
        <meta
          property="og:image"
          content="https://frontend.cureka.com/assets/images/logo.svg"
        />
      </Helmet>
      <div
        className="tab-pane fade show active"
        id="address-tab"
        role="tabpanel"
        aria-labelledby="address-vertical-tab"
      >
        <>
          {!addAddressShow && !selectedAddress && (
            <div id="orders-address">
              <h1 className="order-heading">Address</h1>
              <div className="card p-3 rounded-2">
                <div className="row address-two row-gap-4 px-0">
                  <div className="d-flex justify-content-end">
                    <Button
                      type="btn"
                      style={{ width: "120px" }}
                      onClick={handleAddresShow}
                      className="text-decoration-none rate-btn mr-0"
                    >
                      Add Address
                    </Button>
                  </div>
                  {address && address.length > 0 ? (
                    address.map((item) => (
                      <div key={item.id} className="col-lg-6" id="adress-card">
                        <div className="card">
                          <div className="d-flex justify-content-between">
                            <div className="home-tab">
                              <p className="mb-0">{item.address_type}</p>
                            </div>
                            <div className="d-flex">
                              <DeleteButton
                                onClick={() =>
                                  onDeleteButtonAddressClicked(item)
                                }
                              />
                              <div className="pencil mr-1">
                                <div
                                  className="d-flex"
                                  onClick={() => onEditAddressClicked(item)}
                                >
                                  <Image
                                    className="m-2 align-self-center"
                                    src={pencil}
                                    alt="pencil"
                                    width={12}
                                    height={12}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="card-content">
                            <p className="location-one">{item.name}</p>
                            <p className="address-one">
                              {[item.address, item.landmark, item.pincode]
                                .filter(Boolean)
                                .join(", ")}
                            </p>
                            <p className="location-one">Phone number</p>
                            <p className="address-one">{item.mobile}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>
                      <p className="price" style={{ textAlign: "center" }}>
                        "No addresses were found."
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </>

        {selectedAddress && (
          <div id="edit-address">
            <h2
              onClick={() => onEditAddressClicked(null)}
              className="cursor-pointer order-heading heading-add"
            >
              Edit Address
            </h2>

            <div className="row address-two">
              <div className="order-summary">
                <div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="firstname" htmlFor="Name">
                          Name<span className="required-star">*</span>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          id="name"
                          name="name"
                          value={formikShippingAddress.values.name}
                          onChange={formikShippingAddress.handleChange}
                          placeholder="Enter your name"
                        />
                        {formikShippingAddress.errors.name &&
                          formikShippingAddress.touched.name && (
                            <span className="error-text">
                              {formikShippingAddress.errors.name}
                            </span>
                          )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="mobileno" htmlFor="Name">
                          Mobile Number
                          <span className="required-star">*</span>
                        </label>

                        <input
                          className="form-control"
                          type="number"
                          id="mobile"
                          name="mobile"
                          value={formikShippingAddress.values.mobile}
                          onChange={(event) => {
                            const inputValue = event.target.value;
                            const numericValue = inputValue.replace(
                              /[^0-9]/g,
                              ""
                            );
                            event.target.value = numericValue.slice(0, 10);
                            formikShippingAddress.handleChange(event);
                          }}
                          placeholder="Enter your Mobile Number"
                        />
                        {formikShippingAddress.errors.mobile &&
                          formikShippingAddress.touched.mobile && (
                            <span className="error-text">
                              {formikShippingAddress.errors.mobile}
                            </span>
                          )}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="email" htmlFor="email">
                          Email<span className="required-star">*</span>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          id="email"
                          name="email"
                          value={formikShippingAddress.values.email}
                          onChange={formikShippingAddress.handleChange}
                          placeholder="Enter your mail address"
                        />
                        {formikShippingAddress.errors.email &&
                          formikShippingAddress.touched.email && (
                            <span className="error-text">
                              {formikShippingAddress.errors.email}
                            </span>
                          )}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="address" htmlFor="address">
                          Address<span className="required-star">*</span>
                        </label>
                        <textarea
                          className="form-control"
                          type="text"
                          id="address"
                          rows="4"
                          cols="50"
                          name="address"
                          placeholder="Type Your Address"
                          value={formikShippingAddress.values.address}
                          onChange={formikShippingAddress.handleChange}
                        ></textarea>
                        {formikShippingAddress.errors.address &&
                          formikShippingAddress.touched.address && (
                            <span className="error-text">
                              {formikShippingAddress.errors.address}
                            </span>
                          )}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="landmark" htmlFor="Landmark">
                          Landmark
                        </label>

                        <input
                          className="form-control"
                          type="text"
                          id="landmark"
                          name="landmark"
                          placeholder="Enter Landmark"
                          value={formikShippingAddress.values.landmark}
                          onChange={formikShippingAddress.handleChange}
                        />
                        {formikShippingAddress.errors.landmark &&
                          formikShippingAddress.touched.landmark && (
                            <span className="error-text">
                              {formikShippingAddress.errors.landmark}
                            </span>
                          )}
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="pincode" htmlFor="Pincode">
                          Pincode
                        </label>
                        <OverlayTrigger
                          placement="top" // Position of the tooltip
                          overlay={
                            <Tooltip id="pincode-tooltip">
                              "Please enter your 6-digit pincode, and the city
                              and state will be filled in automatically."
                            </Tooltip>
                          }
                        >
                          <input
                            className="form-control"
                            type="number"
                            id="pincode"
                            name="pincode"
                            placeholder="Enter pincode"
                            value={formikShippingAddress.values.pincode}
                            onChange={formikShippingAddress.handleChange}
                            onBlur={handleEditPinCodeBlur}
                          />
                        </OverlayTrigger>
                        {formikShippingAddress.errors.pincode &&
                          formikShippingAddress.touched.pincode && (
                            <span className="error-text">
                              {formikShippingAddress.errors.pincode}
                            </span>
                          )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="city" htmlFor="city">
                          City
                        </label>

                        <input
                          className="form-control"
                          type="text"
                          id="city"
                          name="city"
                          disabled
                          placeholder="Enter city"
                          value={formikShippingAddress.values.city}
                          onChange={formikShippingAddress.handleChange}
                        />
                        {formikShippingAddress.errors.city &&
                          formikShippingAddress.touched.city && (
                            <span className="error-text">
                              {formikShippingAddress.errors.city}
                            </span>
                          )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="state" htmlFor="state">
                          State
                        </label>

                        <input
                          className="form-control"
                          type="text"
                          id="state"
                          name="state"
                          disabled
                          placeholder="Enter state"
                          value={formikShippingAddress.values.state}
                          onChange={formikShippingAddress.handleChange}
                        />
                        {formikShippingAddress.errors.state &&
                          formikShippingAddress.touched.state && (
                            <span className="error-text">
                              {formikShippingAddress.errors.state}
                            </span>
                          )}
                      </div>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-lg-12">
                      <ToggleButtonGroup
                        type="radio"
                        name="address_type"
                        value={formikShippingAddress.values.address_type}
                        onChange={(value) =>
                          formikShippingAddress.setFieldValue(
                            "address_type",
                            value
                          )
                        }
                        className="d-flex gap-2"
                      >
                        {["Home", "Office", "Others"].map((item) => {
                          return (
                            <CustomToggleButton
                              key={item}
                              onClick={() => {
                                formikShippingAddress.setFieldValue(
                                  "address_type",
                                  item
                                );
                              }}
                              isSelected={
                                formikShippingAddress.values.address_type ===
                                item
                              }
                              value={item}
                            >
                              {item}
                            </CustomToggleButton>
                          );
                        })}
                      </ToggleButtonGroup>
                    </div>
                  </div>
                </div>
                <div className="mt-3 ml-0">
                  <button
                    type="button" // Explicitly specify the button type
                    onClick={() => {
                      console.log("Submit button clicked");
                      formikShippingAddress.handleSubmit();
                    }}
                    className="text-decoration-none rate-btn btn"
                    disabled={formikShippingAddress.isSubmitting}
                  >
                    Save & Delivery
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {addAddressShow && (
          <div id="edit-address">
            <h2
              onClick={() => handleCloseAddresShow()}
              className="cursor-pointer order-heading heading-add"
            >
              Add Address
            </h2>

            <div className="row address-two">
              <div className="order-summary">
                <div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="firstname" htmlFor="Name">
                          Name<span className="required-star">*</span>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          id="name"
                          name="name"
                          value={formikAddShippingAddress.values.name}
                          onChange={formikAddShippingAddress.handleChange}
                          placeholder="Enter your name"
                        />
                        {formikAddShippingAddress.errors.name &&
                          formikAddShippingAddress.touched.name && (
                            <span className="error-text">
                              {formikAddShippingAddress.errors.name}
                            </span>
                          )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="mobileno" htmlFor="Name">
                          Mobile Number
                          <span className="required-star">*</span>
                        </label>

                        <input
                          className="form-control"
                          type="number"
                          id="mobile"
                          name="mobile"
                          value={formikAddShippingAddress.values.mobile}
                          onChange={(event) => {
                            const inputValue = event.target.value;
                            const numericValue = inputValue.replace(
                              /[^0-9]/g,
                              ""
                            );
                            event.target.value = numericValue.slice(0, 10);
                            formikAddShippingAddress.handleChange(event);
                          }}
                          placeholder="Enter your Mobile Number"
                        />
                        {formikAddShippingAddress.errors.mobile &&
                          formikAddShippingAddress.touched.mobile && (
                            <span className="error-text">
                              {formikAddShippingAddress.errors.mobile}
                            </span>
                          )}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="email" htmlFor="email">
                          Email<span className="required-star">*</span>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          id="email"
                          name="email"
                          value={formikAddShippingAddress.values.email}
                          onChange={formikAddShippingAddress.handleChange}
                          placeholder="Enter your mail address"
                        />
                        {formikAddShippingAddress.errors.email &&
                          formikAddShippingAddress.touched.email && (
                            <span className="error-text">
                              {formikAddShippingAddress.errors.email}
                            </span>
                          )}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="address" htmlFor="address">
                          Address<span className="required-star">*</span>
                        </label>
                        <textarea
                          className="form-control"
                          type="text"
                          id="address"
                          rows="4"
                          cols="50"
                          name="address"
                          placeholder="Type Your Address"
                          value={formikAddShippingAddress.values.address}
                          onChange={formikAddShippingAddress.handleChange}
                        ></textarea>
                        {formikAddShippingAddress.errors.address &&
                          formikAddShippingAddress.touched.address && (
                            <span className="error-text">
                              {formikAddShippingAddress.errors.address}
                            </span>
                          )}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="landmark" htmlFor="Landmark">
                          Landmark
                        </label>

                        <input
                          className="form-control"
                          type="text"
                          id="landmark"
                          name="landmark"
                          placeholder="Enter Landmark"
                          value={formikAddShippingAddress.values.landmark}
                          onChange={formikAddShippingAddress.handleChange}
                        />
                        {formikAddShippingAddress.errors.landmark &&
                          formikAddShippingAddress.touched.landmark && (
                            <span className="error-text">
                              {formikAddShippingAddress.errors.landmark}
                            </span>
                          )}
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="pincode" htmlFor="Pincode">
                          Pincode
                        </label>
                        <OverlayTrigger
                          placement="top" // Position of the tooltip
                          overlay={
                            <Tooltip id="pincode-tooltip">
                              "Please enter your 6-digit pincode, and the city
                              and state will be filled in automatically."
                            </Tooltip>
                          }
                        >
                          <input
                            className="form-control"
                            type="number"
                            id="pincode"
                            name="pincode"
                            placeholder="Enter pincode"
                            value={formikAddShippingAddress.values.pincode}
                            onChange={formikAddShippingAddress.handleChange}
                            onBlur={handlePinCodeBlur}
                          />
                        </OverlayTrigger>

                        {formikAddShippingAddress.errors.pincode &&
                          formikAddShippingAddress.touched.pincode && (
                            <span className="error-text">
                              {formikAddShippingAddress.errors.pincode}
                            </span>
                          )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="city" htmlFor="city">
                          City
                        </label>

                        <input
                          className="form-control"
                          type="text"
                          id="city"
                          disabled
                          name="city"
                          placeholder="Enter city"
                          value={formikAddShippingAddress.values.city}
                          onChange={formikAddShippingAddress.handleChange}
                        />
                        {formikAddShippingAddress.errors.city &&
                          formikAddShippingAddress.touched.city && (
                            <span className="error-text">
                              {formikAddShippingAddress.errors.city}
                            </span>
                          )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="state" htmlFor="state">
                          State
                        </label>

                        <input
                          className="form-control"
                          type="text"
                          id="state"
                          name="state"
                          disabled
                          placeholder="Enter state"
                          value={formikAddShippingAddress.values.state}
                          onChange={formikAddShippingAddress.handleChange}
                        />
                        {formikAddShippingAddress.errors.state &&
                          formikAddShippingAddress.touched.state && (
                            <span className="error-text">
                              {formikAddShippingAddress.errors.state}
                            </span>
                          )}
                      </div>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-lg-12">
                      <ToggleButtonGroup
                        type="radio"
                        name="address_type"
                        value={formikAddShippingAddress.values.address_type}
                        onChange={(value) =>
                          formikAddShippingAddress.setFieldValue(
                            "address_type",
                            value
                          )
                        }
                        className="d-flex gap-2"
                      >
                        {["Home", "Office", "Others"].map((item) => {
                          return (
                            <CustomToggleButton
                              key={item}
                              onClick={() => {
                                formikAddShippingAddress.setFieldValue(
                                  "address_type",
                                  item
                                );
                              }}
                              isSelected={
                                formikAddShippingAddress.values.address_type ===
                                item
                              }
                              value={item}
                            >
                              {item}
                            </CustomToggleButton>
                          );
                        })}
                      </ToggleButtonGroup>
                    </div>
                  </div>
                </div>
                <div className="mt-3 ml-0">
                  <button
                    onClick={() => {
                      formikAddShippingAddress.handleSubmit();
                    }}
                    className="text-decoration-none rate-btn btn"
                    href="#"
                    disabled={formikAddShippingAddress.isSubmitting}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div style={{ width: "150%" }}>
        <Modal show={deleteClose} onHide={handleDeleteClose}>
          <Modal.Header closeButton className="mx-0"></Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label className="rate-product" htmlFor="title">
                {/* <b>{userAddressData && userAddressData.id} : </b>Are you sure want to delete the <b>{userAddressData && userAddressData.name}</b> address */}
                Are you sure want to delete the
                <b>{userAddressData && userAddressData.name}</b> address
              </label>
            </div>
            <div>
              <button
                onClick={handleSubmitDeleteAddress}
                className="text-decoration-none rate-btn btn submit-btn"
              >
                Delete
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default AddressTab;
