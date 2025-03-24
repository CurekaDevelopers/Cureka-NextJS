"use client";

import { useFormik } from "formik";
import _ from "lodash";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useRouter } from "next/navigation";
import Select from "react-select";
import Card from "../../../../components/Card";
import AdminBreadcrumbs from "../../../../components/admin/AdminBreadcrumbs";
import {
  createCoupon,
  fetchBrands,
  fetchCoupons,
  fetchNestedCategories,
  fetchProductsOptions,
  updateCoupon,
} from "../../../../redux/action";
import { pagePaths } from "../../../../utils/constants/constant";
import { uploadImage } from "../../../../lib/services/file-upload";
import {
  couponRole,
  couponType,
  status,
} from "../../../../utils/constants/common.constants";
import { initialValues, validationSchema } from "./helper";
import styles from "./styles.module.scss";

const AdminCreateCouponsPage = ({ isEditPage = false }) => {
  const { coupons, brands, productOptions } = useSelector(
    (state) => state.admin
  );
  const { nestedCategories: category } = useSelector((state) => state.customer);
  const formikRef = useRef();
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useRouter();
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!brands?.length) {
      dispatch(fetchBrands());
    }
  }, [brands?.length, dispatch]);

  useEffect(() => {
    if (!category?.length) {
      dispatch(fetchNestedCategories());
    }
  }, [category?.length, dispatch]);

  useEffect(() => {
    if (!productOptions?.length) {
      dispatch(fetchProductsOptions());
    }
  }, [productOptions?.length, dispatch]);

  const options = productOptions?.map((product) => ({
    value: product.product_id,
    label: product.vendor_article_name,
  }));

  useEffect(() => {
    if (!coupons?.length && isEditPage) {
      dispatch(fetchCoupons());
    }
  }, [coupons?.length, dispatch, isEditPage]);
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        let fileUrl = "";
        if (!_.isEmpty(values.image?.name)) {
          if (typeof values.image === "string") {
            fileUrl = values.image;
          } else {
            const uploadData = await uploadImage(
              values.image,
              "coupons",
              (uploadProgress) => {
                console.log({ uploadProgress });
              }
            );
            fileUrl = uploadData.fileUrl;
          }
        }

        if (isEditPage) {
          dispatch(
            updateCoupon(
              id,
              {
                ...values,
                image: fileUrl,
                end_date: moment(values.end_date).format("YYYY-MM-DD"),
                start_date: moment(values.start_date).format("YYYY-MM-DD"),
              },
              () => {
                setLoading(false);
                navigate.push(pagePaths.adminCoupon);
              },
              () => {
                setLoading(false);
              }
            )
          );
        } else {
          dispatch(
            createCoupon(
              {
                ...values,
                image: fileUrl,
                end_date: moment(values.end_date).format("YYYY-MM-DD"),
                start_date: moment(values.start_date).format("YYYY-MM-DD"),
              },
              () => {
                setLoading(false);
                navigate.push(pagePaths.adminCoupon);
              },
              () => {
                setLoading(false);
              }
            )
          );
        }
      } catch (error) {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    formikRef.current = formik;
  }, [formik]);

  useEffect(() => {
    const formik = formikRef.current || {};
    if (isEditPage && coupons.length && id && formik.setValues) {
      const coupon = coupons.find((item) => parseInt(item.id) === parseInt(id));
      if (!coupon) {
        navigate.push(pagePaths.adminCoupon);
      }
      formik.setValues(coupon);
      setPreviewImage(coupon?.image);
    }
  }, [coupons, id, isEditPage, navigate]);

  return (
    <div className={styles.container}>
      <AdminBreadcrumbs
        items={[
          {
            path: pagePaths.adminCoupon,
            label: "Coupons Management",
          },
          {
            path: pagePaths.adminCreateCoupon,
            label: isEditPage ? "Edit Coupon" : "Create Coupon",
          },
        ]}
      />
      <div>
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <p className={styles.title}>Add Coupon Details</p>
          </div>
          <Form onSubmit={formik.handleSubmit} className={styles.formItems}>
            <Form.Group>
              <Form.Label htmlFor="name">
                Name<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.errors.name && formik.touched.name && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.name}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="coupon_code">
                Code<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="coupon_code"
                name="coupon_code"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.coupon_code}
              />
              {formik.errors.coupon_code && formik.touched.coupon_code && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.coupon_code}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="brand">Brand</Form.Label>
              <Form.Select
                aria-label="Select Category"
                id="brand"
                name="brand"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.brand}
              >
                <option value="">Select Brand</option>
                {brands?.map((value, key) => (
                  <option key={key} value={value?.id}>
                    {value?.name}
                  </option>
                ))}
              </Form.Select>
              {formik.errors.brand && formik.touched.brand && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.brand}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="category">Category</Form.Label>
              <Form.Select
                aria-label="Select Category"
                id="category"
                name="category"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.category}
              >
                <option value="">Select Category</option>
                {category.map((value, key) => (
                  <option key={key} value={value?.id}>
                    {value?.name}
                  </option>
                ))}
              </Form.Select>
              {formik.errors.category && formik.touched.category && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.category}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="product_id">Product</Form.Label>
              <Select
                id="product_id"
                name="product_id"
                options={options}
                onChange={(selectedOption) =>
                  formik.setFieldValue(
                    "product_id",
                    selectedOption ? selectedOption.value : ""
                  )
                }
                onBlur={formik.handleBlur}
                value={options.find(
                  (option) => option.value === formik.values.product_id
                )}
                placeholder="Select Product"
              />
              {formik.errors.product_id && formik.touched.product_id && (
                <Form.Text className="text-danger">
                  {formik.errors.product_id}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={(event) => {
                  const selectedFile = event.currentTarget.files[0];
                  if (selectedFile) {
                    const imageUrl = URL.createObjectURL(selectedFile);
                    setPreviewImage(imageUrl);
                    formik.setFieldValue("image", selectedFile);
                  } else {
                    formik.setFieldValue("image", null);
                    setPreviewImage(null);
                  }
                }}
                onBlur={formik.handleBlur}
              />
              {/* {formik.errors.image && formik.touched.image && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.image}
                </Form.Text>
              )} */}
            </Form.Group>
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                style={{ maxWidth: "200px", maxHeight: "100%" }}
              />
            )}
            <Form.Group>
              <Form.Label>
                Start Date<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="date"
                id="start_date"
                name="start_date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={moment(formik?.values?.start_date).format("YYYY-MM-DD")}
              />
              {formik.errors.start_date && formik.touched.start_date && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.start_date}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>
                End Date<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="date"
                id="end_date"
                name="end_date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={moment(formik?.values?.end_date).format("YYYY-MM-DD")}
              />
              {formik.errors.end_date && formik.touched.end_date && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.end_date}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="type">Type *</Form.Label>
              <Form.Select
                aria-label="Select Type"
                id="type"
                name="type"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.type}
              >
                {Object.entries(couponType).map(([key, value]) => {
                  return (
                    <option key={key} value={value}>
                      {value}
                    </option>
                  );
                })}
              </Form.Select>
              {formik.errors.type && formik.touched.type && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.type}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="offer_amount">Order Quantity</Form.Label>
              <Form.Control
                type="number"
                id="order_qty"
                name="order_qty"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.order_qty}
              />
              {formik.errors.order_qty && formik.touched.order_qty && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.order_qty}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="offer_amount">Free Quantity</Form.Label>
              <Form.Control
                type="number"
                id="free_qty"
                name="free_qty"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.free_qty}
              />
              {formik.errors.free_qty && formik.touched.free_qty && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.free_qty}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="access_role">Access Role *</Form.Label>
              <Form.Select
                aria-label="Select Type"
                id="access_role"
                name="access_role"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.couponRole}
              >
                {Object.entries(couponRole).map(([key, value]) => {
                  return (
                    <option key={key} value={value}>
                      {value}
                    </option>
                  );
                })}
              </Form.Select>
              {formik.errors.access_role && formik.touched.access_role && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.access_role}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="offer_amount">
                Max discount Amount<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                id="offer_amount"
                name="offer_amount"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.offer_amount}
              />
              {formik.errors.offer_amount && formik.touched.offer_amount && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.offer_amount}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="max_user_limit">
                Max User Limit<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                id="max_user_limit"
                name="max_user_limit"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.max_user_limit}
              />
              {formik.errors.max_user_limit &&
                formik.touched.max_user_limit && (
                  <Form.Text className={styles.errorText} muted>
                    {formik.errors.max_user_limit}
                  </Form.Text>
                )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="max_order_limit">
                Max Order Limit<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                id="max_order_limit"
                name="max_order_limit"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.max_order_limit}
              />
              {formik.errors.max_order_limit &&
                formik.touched.max_order_limit && (
                  <Form.Text className={styles.errorText} muted>
                    {formik.errors.max_order_limit}
                  </Form.Text>
                )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="min_order_value">
                Min Order Value<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                id="min_order_value"
                name="min_order_value"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.min_order_value}
              />
              {formik.errors.min_order_value &&
                formik.touched.min_order_value && (
                  <Form.Text className={styles.errorText} muted>
                    {formik.errors.min_order_value}
                  </Form.Text>
                )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="status">Status</Form.Label>
              <Form.Select
                aria-label="Select Status"
                id="status"
                name="status"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.status}
              >
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

export default AdminCreateCouponsPage;
