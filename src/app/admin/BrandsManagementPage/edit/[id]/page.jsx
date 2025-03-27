"use client";

import { useFormik } from "formik";
import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Card from "../../../../../components/Card";
import AdminBreadcrumbs from "../../../../../components/admin/AdminBreadcrumbs";
import {
  createBrand,
  fetchBrands,
  updateBrand,
} from "../../../../../redux/action";
import { pagePaths } from "../../../../../utils/constants/constant";
import lazyLoadable from "../../../../../utils/lazyLoadable";
import { uploadImage } from "../../../../../lib/services/file-upload";
import { status } from "../../../../../utils/constants/common.constants";
import { initialValues, validationSchema } from "./helper";
import styles from "./styles.module.scss";

const RichtextEditor = lazyLoadable(() =>
  import("../../../../../components/RichtextEditor")
);

const AdminCreateBrandsPage = ({ isEditPage = true }) => {
  const formikRef = useRef();
  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState(null);
  const [previewBrandImage, setPreviewBrandImage] = useState(null);
  const navigate = useRouter();
  const { id } = useParams();
  const { brands } = useSelector((state) => state.admin);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!brands?.length && isEditPage) {
      dispatch(fetchBrands());
    }
  }, [brands?.length, dispatch, isEditPage]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      let fileUrl = "";
      let brandImageFileUrl = "";

      if (typeof values.image === "string") {
        fileUrl = values.image;
      } else {
        const uploadData = await uploadImage(
          values.image,
          "brands",
          (uploadProgress) => {
            console.log({ uploadProgress });
          }
        );
        fileUrl = uploadData.fileUrl;
      }

      if (!_.isEmpty(values.brand_image)) {
        if (typeof values.brand_image === "string") {
          brandImageFileUrl = values.brand_image;
        } else {
          const uploadData = await uploadImage(
            values.brand_image,
            "brands",
            (uploadProgress) => {
              console.log({ uploadProgress });
            }
          );
          brandImageFileUrl = uploadData.fileUrl;
        }
      }
      if (fileUrl) {
        if (isEditPage) {
          dispatch(
            updateBrand(
              id,
              {
                ...values,
                image: fileUrl,
                brand_image: brandImageFileUrl,
              },
              () => {
                setLoading(false);
                navigate.push(pagePaths.adminBrandManagement);
              }
            )
          );
        } else {
          dispatch(
            createBrand(
              {
                ...values,
                image: fileUrl,
                brand_image: brandImageFileUrl,
              },
              () => {
                setLoading(false);
                navigate.push(pagePaths.adminBrandManagement);
              }
            )
          );
        }
      }
    },
  });

  useEffect(() => {
    formikRef.current = formik;
  }, [formik]);

  useEffect(() => {
    const formik = formikRef.current || {};
    if (isEditPage && brands.length && id && formik.setValues) {
      const brand = brands.find((item) => parseInt(item.id) === parseInt(id));
      if (!brand) {
        navigate.push(pagePaths.adminBrandManagement);
      }
      formik.setValues(brand || {});
      setPreviewImage(brand?.image);
      setPreviewBrandImage(brand?.brand_image);
    }
  }, [isEditPage, brands, id, navigate]);

  return (
    <div className={styles.container}>
      <AdminBreadcrumbs
        items={[
          {
            path: pagePaths.adminBrandManagement,
            label: "Brands Management",
          },
          {
            path: pagePaths.adminCreateBrand,
            label: isEditPage ? "Edit Brand" : "Create Brand",
          },
        ]}
      />
      <div>
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <p className={styles.title}>Add Brand Details</p>
          </div>
          <Form onSubmit={formik.handleSubmit} className={styles.formItems}>
            <Form.Group>
              <Form.Label htmlFor="name">
                Brand Title<span className="text-danger">*</span>
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
              <Form.Label htmlFor="image">
                Image<span className="text-danger">*</span>
              </Form.Label>
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
              {formik.errors.image && formik.touched.image && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.image}
                </Form.Text>
              )}
            </Form.Group>
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                style={{ maxWidth: "200px", maxHeight: "100%" }}
              />
            )}
            <Form.Group>
              <Form.Label htmlFor="brand_image">Brand Banner Image</Form.Label>
              <Form.Control
                type="file"
                id="brand_image"
                name="brand_image"
                accept="image/*"
                onChange={(event) => {
                  const selectedFile = event.currentTarget.files[0];
                  if (selectedFile) {
                    const imageUrl = URL.createObjectURL(selectedFile);
                    setPreviewBrandImage(imageUrl);
                    formik.setFieldValue("brand_image", selectedFile);
                  } else {
                    formik.setFieldValue("brand_image", null);
                    setPreviewBrandImage(null);
                  }
                }}
                onBlur={formik.handleBlur}
              />
              {/* {formik.errors.brand_image && formik.touched.brand_image && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.brand_image}
                </Form.Text>
              )} */}
            </Form.Group>
            {previewBrandImage && (
              <img
                src={previewBrandImage}
                alt="Preview"
                style={{ maxWidth: "200px", maxHeight: "100%" }}
              />
            )}
            <Form.Group>
              <Form.Label htmlFor="description">Description</Form.Label>
              <RichtextEditor
                id="description"
                value={formik.values.description || ""}
                onChange={(value) => formik.setFieldValue("description", value)}
              />
              {/* {formik.errors.description && formik.touched.description && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.description}
                </Form.Text>
              )} */}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="name">
                Meta Title<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="metaTitle"
                name="metaTitle"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.metaTitle}
              />
              {formik.errors.metaTitle && formik.touched.metaTitle && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.metaTitle}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="name">
                Meta Description<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="metaDescription"
                name="metaDescription"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.metaDescription}
              />
              {formik.errors.metaDescription &&
                formik.touched.metaDescription && (
                  <Form.Text className={styles.errorText} muted>
                    {formik.errors.metaDescription}
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
                value={formik.values.status}
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

export default AdminCreateBrandsPage;
