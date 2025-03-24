export const commonHeaderFixedHeight = 155;
export const productHeaderFixedHeight = 165;
export const blogHeaderFixedHeight = 144;

export const urlRegex =
  /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

export const genericErrorMsg = {
  create: "Something went wrong while create!",
  delete: "Something went wrong while deleting!",
  update: "Something went wrong while updating!!",
  fetch: "Something went wrong while fetching!",
};

export const status = {
  active: "Active",
  inActive: "In-Active",
};
export const nav_link = {
  active: "Active",
  inActive: "In-Active",
};

export const ptype = {
  variant: "variant",
  bundle: "bundle",
};

export const FAQStatus = {
  active: "Active",
  inActive: "In-Active",
};

export const couponRole = {
  all_users: "All Users",
  new_users: "New Users",
  employees: "Internal Team",
};

export const couponType = {
  fixed_amount: "Fixed Amount",
  percentage: "Percentage",
  buy_one_get_one: "BUY ONE GET ONE",
  // cashback: "Cashback",
};

export const FAQType = {
  accountRelated: "Account Related",
  cancellationsModifications: "Cancellations & Modifications",
  deliveryRelated: "Delivery Related",
};

export const age_group_admin = {
  adult_men: "Adult Men",
  adult_women: "Adult Women",
  adult_unisex: "Adult Unisex",
  kids_unisex: "Kids Unisex",
  kids_boys: "Kids Boys",
  kids_girls: "Kids Girls",
};
export const stock_status = {
  in_stock: "In stock",
  out_stock: "Out Stock",
  back_order: "Back order",
};

export const orderPlacedStatus = {
  PLACED: "PLACED",
  PENDING: "PENDING",
  FAILED: "FAILED",
};

export const exportExcel = [
  {
    value: "product_id",
    label: "Product Id",
  },
  {
    value: "vendor_sku_code",
    label: "Vender SKU code",
  },
  {
    value: "sku_code",
    label: "SKU code",
  },
  {
    value: "vendor_article_name",
    label: "Vendor article name",
  },
  {
    value: "mrp",
    label: "MRP",
  },
  {
    value: "discount_percent",
    label: "Discount price",
  },
  {
    value: "discount_amount",
    label: "Discount amount",
  },
  {
    value: "final_price",
    label: "Final price",
  },
  {
    value: "url",
    label: "Url",
  },
  {
    value: "slug",
    label: "Slug",
  },
  {
    value: "category_id",
    label: "Category Id",
  },
  {
    value: "sub_category_id",
    label: "Sub category id",
  },
  {
    label: "Sub sub category id",
    value: "sub_sub_category_id",
  },
  {
    value: "country_of_origin",
    label: "Country of origin",
  },
  {
    value: "importer_name_and_address_with_pincode",
    label: "Importer name and address with pincode",
  },
  {
    value: "packer_name_and_address_with_pincode",
    label: "Packer name and address with pincode",
  },
  {
    value: "manufacturer_name_and_address_with_pincode",
    label: "Manufacturer name and address with pincode",
  },
  {
    value: "expires_in_days",
    label: "Expires in days",
  },
  {
    value: "meta_title",
    label: "Meta title",
  },
  {
    value: "meta_description",
    label: "Meta description",
  },
  {
    value: "stock_status",
    label: "Stock status",
  },
  {
    value: "dimensions_cm",
    label: "Dimensions in cm",
  },
  {
    value: "weight_kg",
    label: "Weight in kg",
  },
  {
    value: "concern_1",
    label: "Concern 1",
  },
  {
    value: "concern_2",
    label: "Concern 2",
  },
  {
    value: "concern_3",
    label: "Concern 3",
  },
  {
    value: "brand",
    label: "Brand",
  },
  {
    value: "components",
    label: "Components",
  },
  {
    value: "article_type",
    label: "Article Type",
  },
  {
    value: "brand_size",
    label: "Brand Size",
  },
  {
    value: "hsn",
    label: "HSN",
  },
  {
    value: "age_group",
    label: "Age Group",
  },
  {
    value: "min_age_years",
    label: "Min Age",
  },
  {
    value: "max_age_years",
    label: "Max Age",
  },
  {
    value: "directions_of_use",
    label: "Directions of Use",
  },
  {
    value: "description",
    label: "Description",
  },
  {
    value: "product_benefits",
    label: "Product Benefits",
  },
  {
    value: "product_highlights",
    label: "Product Highlights",
  },
  {
    value: "safety_information",
    label: "Safety Information",
  },
  {
    value: "special_features",
    label: "Special Features",
  },
  {
    value: "tags",
    label: "Tags",
  },
  {
    value: "key_ingredients",
    label: "Key Ingredients",
  },
  {
    value: "other_ingredients",
    label: "Other Ingredients",
  },
  {
    value: "min_order_quantity",
    label: "Min Order Quantity",
  },
  {
    value: "max_order_quantity",
    label: "Max Order Quantity",
  },
  {
    value: "back_order_quantity",
    label: "Back Order Quantity",
  },
  {
    value: "checkout",
    label: "Checkout",
  },
  {
    value: "status",
    label: "Status",
  },
  {
    value: "top_picks",
    label: "Top Picks",
  },
  {
    value: "new_arrival",
    label: "New Arrival",
  },
  {
    value: "ranking",
    label: "Ranking",
  },
  {
    value: "expert_advice",
    label: "Expert Advice",
  },
  {
    value: "accessories_specification",
    label: "Accessories Specification",
  },
  {
    value: "feeding_table",
    label: "Feeding Table",
  },
  {
    value: "size_chart",
    label: "Size Chart",
  },
];

export const generateUrl = (product) => {
  if (!product) return ""; // Handle null or undefined product

  if (product.url && product.url.includes("shop")) {
    return `/${product.url}`; // Return the URL directly if it includes "shop"
  }

  let url = "/shop";

  if (product.category_slug) {
    url += `/${product.category_slug}`;
  }
  if (product.sub_category_slug) {
    url += `/${product.sub_category_slug}`;
  }
  if (product.sub_sub_category_slug) {
    url += `/${product.sub_sub_category_slug}`;
  }
  if (product.slug) {
    url += `/${product.slug}`;
  } else {
    console.warn("Product slug is missing.");
  }

  return url;
};
