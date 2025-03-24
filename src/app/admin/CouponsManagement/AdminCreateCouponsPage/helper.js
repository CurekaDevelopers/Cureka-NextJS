import * as Yup from "yup";
import {
  couponRole,
  couponType,
  status,
} from "../../../../utils/constants/common.constants";

const fileMaxSize = 5 * 1024 * 1024;

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Coupon name is required"),
  coupon_code: Yup.string().required("Coupon code is required"),
  start_date: Yup.string().required("Coupon start date is required"),
  end_date: Yup.string().required("Coupon end date is required"),
  type: Yup.string().required("Coupon type is required"),
  offer_amount: Yup.string().required("Coupon offer amount is required"),
  max_user_limit: Yup.string().required("Coupon max user limit is required"),
  max_order_limit: Yup.string().required("Coupon max order limit is required"),
  min_order_value: Yup.string().required("Coupon min order value is required"),
  // image: Yup.mixed()
  //   .required("Image is required")
  //   .test("fileSize", "File size must be less than 5MB", function (value) {
  //     if (typeof value === "string") {
  //       return true;
  //     }
  //     return value && value.size <= fileMaxSize;
  //   }),
});

export const initialValues = {
  name: "",
  coupon_code: "",
  start_date: "",
  end_date: "",
  type: couponType.percentage,
  offer_amount: "",
  max_user_limit: "",
  max_order_limit: "",
  min_order_value: "",
  order_qty: 0,
  free_qty: 0,
  access_role: couponRole.all_users,
  product_id: "",
  brand: "",
  category: "",
  image: null,
  status: status.active,
};
