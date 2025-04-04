import * as Yup from "yup";

const fileMaxSize = 5 * 1024 * 1024;
const thumbnailImageResolution = {
  height: 250,
  width: 250,
};

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Article name is required"),
});

export const initialValues = {
  name: "",
};
