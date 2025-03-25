import * as Yup from "yup";
import { status } from "../../../../utils/constants/common.constants";

export const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  roles: Yup.array().of(Yup.string().required()).min(1),
});

export const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  roles: [],
  created_by: "",
  status: status.active,
};
