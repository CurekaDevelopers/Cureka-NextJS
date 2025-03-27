import * as Yup from "yup";
import { status } from "../../../../../utils/constants/common.constants";

const fileMaxSize = 5 * 1024 * 1024;
const thumbnailImageResolution = {
  height: 250,
  width: 250,
};

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Brand Title is required"),
  image: Yup.mixed()
    .required("Image is required")
    .test("fileSize", "File size must be less than 5MB", function (value) {
      if (typeof value === "string") {
        return true;
      }
      return value && value.size <= fileMaxSize;
    }),
  // brand_image: Yup.mixed()
  //   .required("Image is required")
  //   .test("fileSize", "File size must be less than 5MB", function (value) {
  //     if (typeof value === "string") {
  //       return true;
  //     }
  //     return value && value.size <= fileMaxSize;
  //   }),
  // description: Yup.string().required("Description is required"),
  status: Yup.string().required("Status is required"),

  metaTitle: Yup.string().required("Meta Title is required"),
  metaDescription: Yup.string().required("Meta Description is required"),
});

export const initialValues = {
  name: "",
  image: null,
  brand_image: null,
  description: "",
  status: status.active,
  metaTitle: "",
  metaDescription: "",
};
