import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Invalid mobile number. Must be 10 digits")
    .required("Mobile number is required"),
  address: Yup.string().required("Address is required"),
  landmark: Yup.string().required("Landmark is required"),
  pincode: Yup.string()
    .matches(/^[1-9][0-9]{5}$/, "Invalid PIN code")
    .required("Pincode is required"),
  address_type: Yup.string().required("Address type is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),

});

export const initialValues = {
  name: "",
  email: "",
  mobile: "",
  address: "",
  pincode: "",
  address_type: "Home",
  landmark: "",
  city: "",
  state: "",
};
