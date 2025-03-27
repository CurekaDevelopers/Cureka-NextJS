import * as Yup from "yup";
import {
  FAQStatus,
  FAQType,
} from "../../../../../utils/constants/common.constants";

export const validationSchema = Yup.object().shape({
  question: Yup.string().required("Question is required"),
  answer: Yup.string().required("Answer is required"),
});

export const initialValues = {
  type: FAQType.accountRelated,
  question: "",
  answer: "",
  status: FAQStatus.active,
};
