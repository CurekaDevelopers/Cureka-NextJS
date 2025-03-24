import * as Yup from "yup";
import { status } from "../../../../utils/constants/common.constants";

const fileMaxSize = 5 * 1024 * 1024;

export const validationSchema = Yup.object().shape({
  url: Yup.string().required("Single Add URL is required"),
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
  updated_by: "",
  status: status.active,
};
