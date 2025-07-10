import * as Yup from "yup";



export const validationSchema = Yup.object().shape({
  // list: Yup.string().required("List is required"),
});

export const initialValues = {
  list: "",
};
