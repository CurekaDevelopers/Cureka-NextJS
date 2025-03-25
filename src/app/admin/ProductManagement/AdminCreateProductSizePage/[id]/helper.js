import * as Yup from "yup";

const fileMaxSize = 5 * 1024 * 1024;
const thumbnailImageResolution = {
  height: 250,
  width: 250,
};

const urlSlugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const skuCodeRegex = /^[A-Z0-9/]+$/;
export const validationSchema = Yup.object().shape({
  vendor_article_name: Yup.string().required("Vendor article name is required"),
  url: Yup.string()
    .matches(
      urlSlugRegex,
      "Invalid URL slug format. Please use only lowercase letters, numbers, and hyphens."
    )
    .required("URL slug is required"),
  vendor_sku_code: Yup.string().required("Vendor sku code is required"),
  sku_code: Yup.string()
    .matches(skuCodeRegex, "Allow only Upper-case Alphabet, / and numbers only")
    .optional(),

  mrp: Yup.string().required("MRP"),
  discount_in_percent: Yup.string().required("Discount is required"),
  discount_in_amount: Yup.string().required("Discount is required in amount"),
  min_order_quantity: Yup.string().required("Min Order Quantity is required"),
  max_order_quantity: Yup.string().required("Max Order Quantity is required"),
  back_order_quantity: Yup.string().required("Back Order Quantity is required"),
  meta_title: Yup.string().required("Title is required"),
  meta_description: Yup.string().required("Description is required"),
  weight_kg: Yup.string().required("Weight"),
  dimensions_cm: Yup.string().required("Dimensions is required"),
  brand_size: Yup.string().required("Brand size is required"),

  status: Yup.string().required("Status is required"),
  ptype: Yup.string().required("Product Type is required"),
});

export const initialValues = {
  vendor_article_name: "",
  url: "",
  sku_code: "",
  vendor_sku_code: "",
  mrp: "",
  discount_in_percent: "",
  discount_in_amount: "",
  min_order_quantity: "",
  max_order_quantity: "",
  back_order_quantity: "",
  meta_title: "",
  meta_description: "",
  weight_kg: "",
  dimensions_cm: "",
  brand_size: "",
  status: "Active",
  ptype: "variant",
};
