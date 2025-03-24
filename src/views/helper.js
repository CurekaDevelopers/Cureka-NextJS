import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  mobile_number: Yup.string(),
  otp: Yup.string().matches(
    /^\d{6}$/,
    "Invalid OTP. It must be a 6-digit number."
  ),
});

export const initialValues = {
  email: "",
  password: "",
  mobile_number: undefined,
  otp: "",
};
