"use client";

import { useFormik } from "formik";
import { useEffect, useRef, useState, useCallback } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";

import { useRouter } from "next/navigation";
import Card from "../../../../../../components/Card";
import AdminBreadcrumbs from "../../../../../../components/admin/AdminBreadcrumbs";
import {
  fetchCategories,
  updateCategory,
} from "../../../../../../redux/action";
import { pagePaths } from "../../../../../../utils/constants/constant";
import lazyLoadable from "../../../../../../utils/lazyLoadable";
import { uploadImage } from "../../../../../../lib/services/file-upload";
import {
  status,
  nav_link,
} from "../../../../../../utils/constants/common.constants";
import { initialValues, validationSchema } from "./helper";
import styles from "./styles.module.scss";
import { createCategory } from "../../../../../../redux/action";
const RichtextEditor = lazyLoadable(() =>
  import("../../../../../../components/RichtextEditor")
);

const AdminCreateCategoryPage = ({ isEditPage = true }) => {
  const formikRef = useRef();
  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState(null);
  const router = useRouter();
  const { id } = useParams();
  console.log("ID from useParams:", id);

  const { categories } = useSelector((state) => state.admin);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditPage && id) {
      console.log("Fetching categories", id);
      dispatch(fetchCategories());
    }
  }, [isEditPage, dispatch, categories]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      let fileUrl = values.image;

      // Upload image if it's a file
      if (values.image && typeof values.image !== "string") {
        const uploadData = await uploadImage(
          values.image,
          "categories",
          (uploadProgress) => {
            console.log({ uploadProgress });
          }
        );
        fileUrl = uploadData?.fileUrl || "";
      }

      if (fileUrl) {
        const categoryData = { ...values, image: fileUrl };

        if (isEditPage) {
          dispatch(
            updateCategory(id, categoryData, () => {
              setLoading(false);
              router.push(pagePaths.adminCategories);
            })
          );
        } else {
          dispatch(
            createCategory(categoryData, () => {
              setSubmitting(false);
              router.push(pagePaths.adminCategories);
            })
          );
        }
      }
    },
  });

  useEffect(() => {
    formikRef.current = formik;
  }, [formik]);

  // Populate form when editing
  useEffect(() => {
    if (isEditPage && categories.length > 0 && id) {
      const category = categories.find(
        (item) => String(item.id) === String(id)
      );

      if (!category) {
        router.push(pagePaths.adminCategories);
      } else {
        formik.setValues(category);
        setPreviewImage(category.image);
      }
    }
  }, [isEditPage, categories, id, router]);

  return (
    <div className={styles.container}>
      <AdminBreadcrumbs
        items={[
          {
            path: pagePaths.adminCategories,
            label: "Categories Management",
          },
          {
            path: pagePaths.adminCreateCategory,
            label: isEditPage ? "Edit Category" : "Create Category",
          },
        ]}
      />
      <div>
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <p className={styles.title}>Add Category Details</p>
          </div>
          <Form onSubmit={formik.handleSubmit} className={styles.formItems}>
            <Form.Group>
              <Form.Label htmlFor="name">Category Title</Form.Label>
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
            {/* <Form.Group>
              <Form.Label htmlFor="name">Slug Name</Form.Label>
              <Form.Control
                type="text"
                id="slug"
                name="slug"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.slug}
              />
              {formik.errors.slug && formik.touched.slug && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.slug}
                </Form.Text>
              )}
            </Form.Group> */}
            <Form.Group>
              <Form.Label htmlFor="image">Image</Form.Label>
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
              <Form.Label htmlFor="description">Description</Form.Label>
              <RichtextEditor
                id="description"
                value={formik.values.description}
                onChange={(value) => formik.setFieldValue("description", value)}
              />
              {formik.errors.description && formik.touched.description && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.description}
                </Form.Text>
              )}
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
              <Form.Label htmlFor="status">Status</Form.Label>
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
            <Form.Group>
              <Form.Label htmlFor="navLink">Nav Link</Form.Label>
              <Form.Select
                aria-label="Select Category"
                id="navLink"
                name="navLink"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nav_link}
              >
                <option disabled>Select Status</option>
                {Object.entries(nav_link).map(([key, value]) => {
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

export default AdminCreateCategoryPage;
