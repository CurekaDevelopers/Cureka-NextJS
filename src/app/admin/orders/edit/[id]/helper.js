import * as Yup from "yup";
import { status } from "../../../../utils/constants/common.constants";

const fileMaxSize = 5 * 1024 * 1024;
const thumbnailImageResolution = {
  height: 250,
  width: 250,
};

const urlSlugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const skuCodeRegex = /^[A-Z0-9/]+$/;

export const validationSchema = Yup.object().shape({
  vendor_article_name: Yup.string().required("Vendor article name is required"),
  category_name: Yup.string().required("Category is required"),
  sku_code: Yup.string()
    .matches(skuCodeRegex, "Allow only Upper-case Alphabet, / and numbers only")
    .optional("Cureka SKU is required"),
  brand: Yup.string().required("Brand is required"),
  manufacturer_name_and_address_with_pincode: Yup.string().required(
    "Manufacturer name and address is required"
  ),

  url: Yup.string()
    .matches(
      urlSlugRegex,
      "Invalid URL slug format. Please use only lowercase letters, numbers, and hyphens."
    )
    .required("Blog URL slug is required"),

  packer_name_and_address_with_pincode: Yup.string().required(
    "Packer name and address is required"
  ),
  country_of_origin: Yup.string().required("Country of origin is required"),
  weight_kg: Yup.string().required("Weight is required"),
  dimensions_cm: Yup.string().required("Dimensions is required"),
  components: Yup.string().required("Components is required"),
  expires_in_days: Yup.number().required("Expires in days is required"),

  article_type: Yup.string().required("Article type is required"),
  standard_size: Yup.string().required("Standard size is required"),
  brand_size: Yup.string().required("Brand size is required"),
  hsn: Yup.string().required("HSN size is required"),

  vendor_sku_code: Yup.string().required("Vendor SKU Code is required"),
  age_group: Yup.string().required("Age Group is required"),

  min_age_years: Yup.string().required("Minimum age is required"),
  max_age_years: Yup.string().required("Maximum age"),
  directions_of_use: Yup.string().required("Direction  of use is required"),
  description: Yup.string().required("Description is required"),

  product_highlights: Yup.string().required("Product highlights is required"),
  safety_information: Yup.string().required("Safety information is required"),
  // tags: Yup.array().required("Tags are required"),
  mrp: Yup.string().required("MRP is required"),
  status: Yup.string().required("Status is required"),
  expert_advice: Yup.string().required("Expert advice is required"),

  product_image: Yup.array().required("Product images is required"),
  //   .test("fileSize", "File size must be less than 5MB", function (value) {
  //     if (typeof value === "string") {
  //       return true;
  //     }

  //     return value && value.size <= fileMaxSize;
  //   })
  //   .test(
  //     "resolution",
  //     `Image resolution must be ${thumbnailImageResolution.width} x ${thumbnailImageResolution.height} px.`,
  //     async function (value) {
  //       if (typeof value === "string") {
  //         return true;
  //       }

  //       if (!value) return false;
  //       const file = value;
  //       return new Promise((resolve) => {
  //         const reader = new FileReader();
  //         reader.onload = (e) => {
  //           const img = new Image();
  //           img.onload = () => {
  //             resolve(
  //               img.width < thumbnailImageResolution.width &&
  //                 img.height < thumbnailImageResolution.height,
  //             );
  //           };
  //           img.src = e.target.result;
  //         };
  //         if (isBlob(file)) reader.readAsDataURL(file);
  //       });
  //     },
  //   ),
  // brandimage: Yup.mixed()
  //   .required("Image is required")
  //   .test("fileSize", "File size must be less than 5MB", function (value) {
  //     if (typeof value === "string") {
  //       return true;
  //     }

  //     return value && value.size <= fileMaxSize;
  //   })
  //   .test(
  //     "resolution",
  //     `Image resolution must be ${thumbnailImageResolution.width} x ${thumbnailImageResolution.height} px.`,
  //     async function (value) {
  //       if (typeof value === "string") {
  //         return true;
  //       }

  //       if (!value) return false;
  //       const file = value;
  //       return new Promise((resolve) => {
  //         const reader = new FileReader();
  //         reader.onload = (e) => {
  //           const img = new Image();
  //           img.onload = () => {
  //             resolve(
  //               img.width < thumbnailImageResolution.width &&
  //                 img.height < thumbnailImageResolution.height,
  //             );
  //           };
  //           img.src = e.target.result;
  //         };
  //         if (isBlob(file)) reader.readAsDataURL(file);
  //       });
  //     },
  //   ),
  // product_benefits: Yup.string().optional("Product benefits is required"),

  // checkout: Yup.string().optional("Select Checkout"),
  // product_image: Yup.string().required("Product image is required"),
});

export const initialValues = {
  name: "",
  product_image: null,
  description: "",
  category_name: "",
  sub_category: "",
  brand_size: "",
  hsn: "",
  sub_sub_category: "",
  standard_size: "",
  sub_sub_sub_category: "",
  status: status.active,
  vendor_sku_code: "",
  url: "",
  article_type: "",
  brand: "",
  dimensions_cm: "",
  components: "",
  manufacturer_name_and_address_with_pincode: "",
  packer_name_and_address_with_pincode: "",
  importer_name_and_address_with_pincode: "",
  country_of_origin: "",
  weight_kg: "",
  expires_in_days: "",
  sku_code: "",
  min_age_years: "",
  max_age_years: "",
  product_highlights: "",
  product_benefits: "",
  directions_of_use: "",
  safety_information: "",
  mrp: "",
  status: "",
  vendor_article_name: "",
  skin_type: "",
  hair_type: "",
  spf_type: "",
  size_chart_type: "",
  color: "",
  flavour: "",
  protein_type: "",
  diaper_style: "",
  formulation_type: "",
  checkout: "",
  staging: "",
  expert_advice: "",
  // tags: []
  age_group: "",
};
