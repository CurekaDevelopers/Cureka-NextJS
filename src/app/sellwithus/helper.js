import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    Name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    mobile_number: Yup.string()
        .matches(/^[0-9]{10}$/, "Invalid mobile number. Must be 10 digits")
        .required("Mobile number is required"),
    address: Yup.string().required("Address is required"),
    catalog: Yup.string().required("Catlog link is required"),
    brands: Yup.string().required("brand name is required"),


    landmark: Yup.string().required("Landmark is required"),
    pincode: Yup.string()
        .matches(/^[1-9][0-9]{5}$/, "Invalid PIN code")
        .required("Pincode is required"),
});

export const initialValues = {
    Name: "",
    email: "",
    mobile_number: "",
    address: "",
    pincode: "",
    address_type: "Home",
    landmark: "",
};
