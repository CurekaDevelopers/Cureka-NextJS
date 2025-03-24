import * as Yup from "yup";

const fileMaxSize = 5 * 1024 * 1024;

export const validationSchema = Yup.object().shape({
  heading: Yup.string().required("Heading is required"),
  content: Yup.string().required("Content is required"),
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
  heading: "",
  image: "",
  content: "",
};
