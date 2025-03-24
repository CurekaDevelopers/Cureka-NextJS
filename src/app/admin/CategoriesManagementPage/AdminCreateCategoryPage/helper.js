import * as Yup from "yup";
import {
  statusm,
  nav_link,
} from "../../../../utils/constants/common.constants";

const fileMaxSize = 5 * 1024 * 1024;
const thumbnailImageResolution = {
  height: 250,
  width: 250,
};

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Category Title is required"),
  image: Yup.mixed()
    .required("Image is required")
    .test("fileSize", "File size must be less than 5MB", function (value) {
      if (typeof value === "string") {
        return true;
      }
      return value && value.size <= fileMaxSize;
    }),

  description: Yup.string().required("Description is required"),
  status: Yup.string().required("Status is required"),
  metaTitle: Yup.string().required("Meta Title is required"),
  metaDescription: Yup.string().required("Meta Description is required"),
  nav_link: Yup.string().required("Nav Link is required"),
});

export const initialValues = {
  name: "",
  slug: "",
  image: null,
  description: "",
  status: status.active,
  metaTitle: "",
  metaDescription: "",
  nav_link: nav_link.active,
};
