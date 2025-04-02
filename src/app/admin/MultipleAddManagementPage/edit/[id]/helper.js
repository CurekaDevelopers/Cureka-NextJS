import * as Yup from "yup";
import store from "../../../../../redux/store";
import { status } from "../../../../../utils/constants/common.constants";

const adminEmail = store.getState().auth.adminEmail;
const fileMaxSize = 5 * 1024 * 1024;

export const validationSchema = Yup.object().shape({
  url: Yup.string().required("Multiple Add URL is required"),
  image: Yup.mixed()
    .required("Image is required")
    .test("fileSize", "File size must be less than 5MB", function (value) {
      if (typeof value === "string") {
        return true;
      }

      return value && value.size <= fileMaxSize;
    }),
});

export const initialValues = {
  url: "",
  image: "",
  updated_by: adminEmail,
  status: status.active,
};
