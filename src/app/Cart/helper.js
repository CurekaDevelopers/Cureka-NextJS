import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  mobile_number: Yup.string()
    .matches(/^[0-9]{10}$/, "Invalid mobile number. Must be 10 digits")
    .required("Mobile number is required"),
  address: Yup.string().required("Address is required").min(10, "Address must be at least 20 characters"),
  landmark: Yup.string().required("Landmark is required"),
  pincode: Yup.string()
    .matches(/^[1-9][0-9]{5}$/, "Invalid PIN code")
    .required("Pincode is required"),
  address_type: Yup.string().required("Address type is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
});

export const initialValues = {
  name: "",
  email: "",
  mobile_number: "",
  address: "",
  pincode: "",
  address_type: "Home",
  landmark: "",
  city: "",
  state: ""
};

export const paymentFormValidationSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .matches(/^\d{16}$/, "Invalid card number. Must be 16 digits")
    .required("Card number is required"),
  nameOnCard: Yup.string().required("Name on card is required"),
  expiryDate: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/[0-9]{2}$/, "Invalid expiry date. Use MM/YY format")
    .test("is-future", "Expiry date must be in the future", (value) => {
      if (!value) {
        return true;
      }
      const [month, year] = value.split("/");
      const expirationDate = new Date(`20${year}`, month - 1);
      return expirationDate > new Date();
    })
    .required("Expiry date is required"),
  cvv: Yup.string()
    .matches(/^\d{3,4}$/, "Invalid CVV. Must be 3 or 4 digits")
    .required("CVV is required"),
});

export const paymentFormInitialValues = {
  cardNumber: "",
  nameOnCard: "",
  expiryDate: "",
  cvv: "",
};
