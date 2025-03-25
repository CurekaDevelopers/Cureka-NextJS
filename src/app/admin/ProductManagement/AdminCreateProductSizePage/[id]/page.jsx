"use client";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useRouter } from "next/navigation";
import Card from "../../../../../components/Card";
import AdminBreadcrumbs from "../../../../../components/admin/AdminBreadcrumbs";
import {
  createProductSize,
  fetchBrands,
  fetchConcerns,
  fetchNestedCategories,
  updateProduct,
} from "../../../../../redux/action";
import { pagePaths } from "../../../../../utils/constants/constant";
import lazyLoadable from "../../../../../utils/lazyLoadable";
import { uploadImage } from "../../../../../lib/services/file-upload";
import { convertToUrlSlug } from "../../../../../utils/common.utils";
import { ptype, status } from "../../../../../utils/constants/common.constants";
import { initialValues, validationSchema } from "./helper";
import styles from "./styles.module.scss";

const RichtextEditor = lazyLoadable(() =>
  import("../../../../../components/RichtextEditor")
);

const AdminCreateProductSizePage = ({ isEditPage = false }) => {
  const formikRef = useRef();
  const navigate = useRouter();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { productsList, brands, concerns } = useSelector(
    (state) => state.admin
  );
  const { nestedCategories } = useSelector((state) => state.customer);
  const [tags, setTags] = useState([]);

  const [categoryItem, setCategoryItem] = useState({
    category: {},
    subCategory: {},
    subSubCategory: {},
    subSubSubCategory: {},
  });
  const [loading, setLoading] = useState(false);
  const [concernsList, setConcernsList] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [uploadedImage, setUploadedImage] = useState([]);

  const options = concerns.map((dataObject) => ({
    value: dataObject.id,
    label: dataObject.name,
  }));

  const onChangeConcerns = (newSelected) => {
    if (newSelected.length <= 3) {
      setConcernsList(newSelected);
    } else {
      toast.error("Maximum 3 selections allowed!");
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      // setLoading(true);
      let fileUrl = [];

      if (
        values?.product_image &&
        typeof values?.product_image[0] === "string"
      ) {
        fileUrl = values?.product_image;
      } else {
        let imageUrls = [];
        const uploadPromises = values.product_image?.map(async (val) => {
          const uploadData = await uploadImage(
            val,
            "product",
            (uploadProgress) => {
              console.log({ uploadProgress });
            }
          );
          return uploadData.fileUrl;
          // imageUrls.push(uploadData.fileUrl)
        });
        imageUrls = await Promise.all(uploadPromises);
        fileUrl.push(imageUrls);
      }

      if (isEditPage) {
        dispatch(
          updateProduct(
            id,
            {
              ...values,
              tags: tags,
              category_id: categoryItem?.category?.id,
              category_name: categoryItem?.category?.name,
              sub_category: categoryItem?.subCategory?.name,
              sub_sub_category: categoryItem?.subSubCategory?.name,
              sub_sub_sub_category: categoryItem?.subSubSubCategory?.name,
              brand_image: JSON.stringify(fileUrl),
              product_image: JSON.stringify(fileUrl[0]),
              // image: fileUrl,
              // brand_image: brandImageFileUrl,
            },
            () => {
              setLoading(false);
              navigate.push(pagePaths.adminProductManagement);
            }
          )
        );
      } else {
        dispatch(
          createProductSize(
            {
              id: id,
              ...values,
              category_id: categoryItem?.category?.id,
              category_name: categoryItem?.category?.name,
              sub_category: categoryItem?.subCategory?.name,
              sub_sub_category: categoryItem?.subSubCategory?.name,
              sub_sub_sub_category: categoryItem?.subSubSubCategory?.name,
              product_image: JSON.stringify(fileUrl[0]),
              // image: fileUrl,
              // brand_image: brandImageFileUrl,
            },
            () => {
              setLoading(false);
              navigate.push(pagePaths.adminProductManagement);
            }
          )
        );
      }
    },
  });

  formik.handleChangeCategory = (event) => {
    const eventData = JSON.parse(event.target.value);
    const myData = {
      id: eventData?.id,
      code: eventData?.code,
      name: eventData?.name,
      sub_categories: eventData?.sub_categories,
    };
    setCategoryItem((pre) => ({ ...pre, category: myData }));
    formik.setFieldValue(event.target.name, event.target.value);
  };

  formik.handleChangeSubCategory = (event) => {
    const eventData = JSON.parse(event.target.value);
    const myData = {
      id: eventData?.id,
      code: eventData?.code,
      name: eventData?.name,
      sub_sub_categories: eventData?.sub_sub_categories,
    };
    setCategoryItem((pre) => ({ ...pre, subCategory: myData }));

    formik.setFieldValue(event.target.name, event.target.value);
  };
  formik.handleChangeSubSubCategory = (event) => {
    eventData = JSON.parse(event.target.value);
    const myData = {
      id: eventData?.id,
      code: eventData?.code,
      name: eventData?.name,
      sub_sub_sub_categories: eventData?.sub_sub_categories,
    };
    setCategoryItem((pre) => ({ ...pre, subSubCategory: myData }));
    formik.setFieldValue(event.target.name, event.target.value);
  };
  formik.handleChangeSubSubSubCategory = (event) => {
    eventData = JSON.parse(event.target.value);
    const myData = {
      id: eventData?.id,
      code: eventData?.code,
      name: eventData?.name,
    };
    setCategoryItem((pre) => ({ ...pre, subSubSubCategory: myData }));
    formik.setFieldValue(event.target.name, event.target.value);
  };

  const handleRemoveImage = (ind) => {
    const myArray = [...previewImages];
    myArray.splice(ind, 1);
    setPreviewImages(myArray);
  };
  const removeTags = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };
  const addTags = (event) => {
    if (event.target.value !== "") {
      setTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };

  useEffect(() => {
    formikRef.current = formik;
  }, [formik]);

  const handleImageChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setUploadedImage((prevSelectedFiles) => [
      ...prevSelectedFiles,
      ...selectedFiles,
    ]);
    if (selectedFiles.length > 0) {
      const imageArray = selectedFiles.map((file) => URL.createObjectURL(file));
      setPreviewImages((prevImages) => [...prevImages, ...imageArray]);
    }
  };

  useEffect(() => {
    const formik = formikRef.current || {};
    if (isEditPage && productsList?.length && id && formik?.setValues) {
      const product = productsList?.find(
        (item) => parseInt(item.id) === parseInt(id)
      );
      if (!product) {
        navigate.push(pagePaths?.adminProductManagement);
      }
      formik.setValues(product || {});
      // formik.setFieldValue('category', product?.category);
      // setPreviewImages(product?.image);
      // setPreviewBrandImage(brand?.brand_image);
    }
  }, [isEditPage, productsList, id, navigate]);

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchNestedCategories());
    dispatch(fetchConcerns());
  }, []);
  useEffect(() => {
    if (uploadedImage?.length) {
      formik.setFieldValue("product_image", uploadedImage);
    } else {
      formik.setFieldValue("product_image", null);
    }
  }, [uploadedImage]);
  return (
    <div className={styles.container}>
      <AdminBreadcrumbs
        items={[
          {
            path: pagePaths.adminProductManagement,
            label: "Products Size Management",
          },
          {
            path: pagePaths.adminCreateBrand,
            label: "Create Products",
          },
        ]}
      />
      <div>
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <p className={styles.title}>Admin Products Sizes Management</p>
          </div>
          <Form onSubmit={formik.handleSubmit} className={styles.formItems}>
            <Form.Group>
              <Form.Label htmlFor="vendor_article_name">
                Vendor article name<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="vendor_article_name"
                name="vendor_article_name"
                onChange={(e) => {
                  const urlSlug = convertToUrlSlug(e?.target?.value || "");
                  formik.setFieldValue("url", urlSlug);
                  formik.handleChange(e);
                }}
                onBlur={formik.handleBlur}
                value={formik.values?.vendor_article_name}
              />
              {formik.errors.vendor_article_name &&
                formik.touched.vendor_article_name && (
                  <Form.Text className={styles.errorText} muted>
                    {formik.errors.vendor_article_name}
                  </Form.Text>
                )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="url">
                Url<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="url"
                name="url"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.url}
              />
              {formik.errors.url && formik.touched.url && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.url}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="image">
                Product images<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="file"
                id="product_image"
                name="product_image"
                multiple
                accept="image/*"
                // onChange={(event) => {
                //   const selectedFile = Array.from(event.currentTarget.files);
                //   if (selectedFile?.length > 0) {
                //     let imageArray = []
                //     selectedFile?.map((val, ind) => {
                //       const imageUrl = URL.createObjectURL(val);
                //       imageArray.push(imageUrl)
                //     })
                //     setPreviewImages([...imageArray]);
                //     formik.setFieldValue("product_image", selectedFile);
                //   } else {
                //     formik.setFieldValue("product_image", null);
                //     setPreviewImages(null);
                //   }
                // }}

                onChange={handleImageChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.product_image && formik.touched.product_image && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.product_image}
                </Form.Text>
              )}
            </Form.Group>

            <div className="d-flex justify-content-start">
              {previewImages?.map((val, ind) => (
                <div
                  className="mr-2"
                  style={{
                    position: "relative",
                    border: "1px solid #000",
                    borderRadius: "7px",
                  }}
                >
                  <img
                    src={val}
                    style={{
                      maxWidth: "200px",
                      maxHeight: "100%",
                      borderRadius: "7px",
                      overflow: "hidden",
                    }}
                  />
                  <span
                    onClick={() => handleRemoveImage(ind)}
                    style={{ position: "absolute", right: 10, top: 10 }}
                  >
                    <RxCross2
                      style={{
                        fontSize: "30px",
                        background: "#757575",
                        borderRadius: "50%",
                        color: "#fff",
                        padding: 5,
                        cursor: "pointer",
                      }}
                    />
                  </span>
                </div>
              ))}
            </div>

            <Form.Group>
              <Form.Label htmlFor="vendor_sku_code">
                Vendor SKU<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="vendor_sku_code"
                name="vendor_sku_code"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.vendor_sku_code}
              />
              {formik.errors.vendor_sku_code &&
                formik.touched.vendor_sku_code && (
                  <Form.Text className={styles.errorText} muted>
                    {formik.errors.vendor_sku_code}
                  </Form.Text>
                )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="sku_code">SKU Code</Form.Label>
              <Form.Control
                type="text"
                id="sku_code"
                name="sku_code"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.sku_code}
              />
              {formik.errors.sku_code && formik.touched.sku_code && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.sku_code}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="mrp">
                MRP<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                id="mrp"
                name="mrp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.mrp}
              />
              {formik.errors.mrp && formik.touched.mrp && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.mrp}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="discount_in_percent">
                Discount in percent<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                id="discount_in_percent"
                name="discount_in_percent"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.discount_in_percent}
              />
              {formik.errors.discount_in_percent &&
                formik.touched.discount_in_percent && (
                  <Form.Text className={styles.errorText} muted>
                    {formik.errors.discount_in_percent}
                  </Form.Text>
                )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="discount_in_amount">
                Discount in amount<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                id="discount_in_amount"
                name="discount_in_amount"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.discount_in_amount}
              />
              {formik.errors.discount_in_amount &&
                formik.touched.discount_in_amount && (
                  <Form.Text className={styles.errorText} muted>
                    {formik.errors.discount_in_amount}
                  </Form.Text>
                )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="min_order_quantity">
                Min order Quantity<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                id="min_order_quantity"
                name="min_order_quantity"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.min_order_quantity}
              />
              {formik.errors.min_order_quantity &&
                formik.touched.min_order_quantity && (
                  <Form.Text className={styles.errorText} muted>
                    {formik.errors.min_order_quantity}
                  </Form.Text>
                )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="max_order_quantity">
                Max order Quantity<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                id="max_order_quantity"
                name="max_order_quantity"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.max_order_quantity}
              />
              {formik.errors.max_order_quantity &&
                formik.touched.max_order_quantity && (
                  <Form.Text className={styles.errorText} muted>
                    {formik.errors.max_order_quantity}
                  </Form.Text>
                )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="back_order_quantity">
                Back order quantity<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                id="back_order_quantity"
                name="back_order_quantity"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.back_order_quantity}
              />
              {formik.errors.back_order_quantity &&
                formik.touched.back_order_quantity && (
                  <Form.Text className={styles.errorText} muted>
                    {formik.errors.back_order_quantity}
                  </Form.Text>
                )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="meta_title">
                Meta title<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="meta_title"
                name="meta_title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.meta_title}
              />
              {formik.errors.meta_title && formik.touched.meta_title && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.meta_title}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="meta_description">
                Meta description<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="meta_description"
                name="meta_description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.meta_description}
              />
              {formik.errors.meta_description &&
                formik.touched.meta_description && (
                  <Form.Text className={styles.errorText} muted>
                    {formik.errors.meta_description}
                  </Form.Text>
                )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="weight_kg">
                Weight (kg)<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                id="weight_kg"
                name="weight_kg"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.weight_kg}
              />
              {formik.errors.weight_kg && formik.touched.weight_kg && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.weight_kg}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="dimensions_cm">
                Dimensions (cm)<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="dimensions_cm"
                name="dimensions_cm"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.dimensions_cm}
              />
              {formik.errors.dimensions_cm && formik.touched.dimensions_cm && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.dimensions_cm}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="brand_size">
                Brand size/Bundle Name<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="brand_size"
                name="brand_size"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.brand_size}
              />
              {formik.errors.brand_size && formik.touched.brand_size && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.brand_size}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="status">
                Type <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                aria-label="Select Type"
                id="ptype"
                name="ptype"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.ptype}
              >
                <option disabled>Select Type</option>
                {Object.entries(ptype).map(([key, value]) => {
                  return (
                    <option key={key} value={value}>
                      {value}
                    </option>
                  );
                })}
              </Form.Select>
              {formik.errors.ptype && formik.touched.ptype && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.ptype}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="status">
                Status<span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                aria-label="Select Category"
                id="status"
                name="status"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.status}
              >
                <option disabled>Select Status</option>
                {Object.entries(status).map(([key, value]) => {
                  return (
                    <option key={key} value={value}>
                      {value}
                    </option>
                  );
                })}
              </Form.Select>
              {formik.errors.status && formik.touched.status && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.status}
                </Form.Text>
              )}
            </Form.Group>

            <Button
              disabled={loading}
              type="submit"
              className={styles.submitButton}
              variant="primary"
            >
              {loading ? "Loading..." : "Submit"}
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default AdminCreateProductSizePage;
