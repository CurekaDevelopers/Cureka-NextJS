import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  policy_name: Yup.string().required("Title is required"),
  policy_content: Yup.string().required("Content is required"),
});

export const initialValues = {
  policy_name: "",
  policy_content: "",
};
