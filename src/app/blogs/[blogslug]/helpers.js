import * as Yup from "yup";

const fileMaxSize = 5 * 1024 * 1024;
const thumbnailImageResolution = {
    height: 250,
    width: 250,
};

const urlSlugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const skuCodeRegex = /^[A-Z0-9]+$/;

export const validationSchema = Yup.object().shape({
    user_name: Yup.string().required("Name is required"),
    comment: Yup.string().required("Comment is required"),
    user_email: Yup.string().email("Invalid email address").required("Email is required"),

});

export const initialValues = {
    user_name: "",
    comment: "",
    user_email: "",
};
