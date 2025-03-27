import * as Yup from "yup";
import { status } from "../../../../../../utils/constants/common.constants";

const fileMaxSize = 5 * 1024 * 1024;
const thumbnailImageResolution = {
  height: 250,
  width: 250,
};

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Sub Category Title is required")
    .notOneOf([""], "Please select a valid sub category"),
  category_id: Yup.number().required("Category is required"),
  sub_category_id: Yup.number().required("Sub Category is required"),
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
});

export const initialValues = {
  category_id: undefined,
  sub_category_id: undefined,
  name: "",
  slug: "",
  image: null,
  description: "",
  status: status.active,
  metaTitle: "",
  metaDescription: "",
};
