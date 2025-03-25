"use client";
import { useFormik } from "formik";
import { useEffect, useMemo, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
("react-router-dom");
import Card from "../../../../../components/Card";
import AdminBreadcrumbs from "../../../../../components/admin/AdminBreadcrumbs/index";
import {
  createSubSubSubCategory,
  fetchCategories,
  fetchSubCategories,
  fetchSubsubCategories,
} from "../../../../../redux/action/";
import { pagePaths } from "../../../../../utils/constants/constant";
import lazyLoadable from "../../../../../utils/lazyLoadable";
import { uploadImage } from "../../../../../lib/services/file-upload";
import { status } from "../../../../../utils/constants/common.constants";
import { initialValues, validationSchema } from "./helper";
import styles from "./styles.module.scss";
const RichtextEditor = lazyLoadable(() =>
  import("../../../../../components/RichtextEditor")
);

const AdminCreateSubSubSubCategoryPage = () => {
  const formikRef = useRef();
  const { categories, subCategories, subSubCategories } = useSelector(
    (state) => state.admin
  );
  const dispatch = useDispatch();
  const navigate = useRouter();
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchSubCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchSubsubCategories());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const uploadData = await uploadImage(
        values.image,
        "sub-sub-sub-categories",
        (uploadProgress) => {
          console.log({ uploadProgress });
        }
      );
      if (uploadData.fileUrl) {
        dispatch(
          createSubSubSubCategory(
            {
              ...values,
              image: uploadData.fileUrl,
            },
            () => {
              setSubmitting(false);
              navigate.push(pagePaths.adminSubSubSubCategory);
            }
          )
        );
      }
    },
  });

  useEffect(() => {
    formikRef.current = formik;
  }, [formik]);

  useEffect(() => {
    const formik = formikRef.current || {};
    if (categories?.length && formik) {
      formik.setFieldValue("category_id", categories[0].id);
    }
  }, [categories]);

  const filteredSubCategories = useMemo(() => {
    if (subCategories?.length && formik.values.category_id) {
      return subCategories?.filter((item) => {
        return (
          parseInt(item.category_id) === parseInt(formik.values.category_id)
        );
      });
    }
    return [];
  }, [formik.values.category_id, subCategories]);

  useEffect(() => {
    const formik = formikRef.current || {};
    if (filteredSubCategories?.length) {
      formik.setFieldValue("sub_category_id", filteredSubCategories[0].id);
    } else {
      formik.setFieldValue("sub_category_id", undefined);
    }
  }, [filteredSubCategories]);

  const filteredSubSubCategories = useMemo(() => {
    if (subSubCategories?.length && formik.values.sub_category_id) {
      return subSubCategories?.filter((item) => {
        return (
          parseInt(item.sub_category_id) ===
          parseInt(formik.values.sub_category_id)
        );
      });
    }
    return [];
  }, [formik.values.sub_category_id, subSubCategories]);

  useEffect(() => {
    const formik = formikRef.current || {};
    if (filteredSubSubCategories?.length) {
      formik.setFieldValue(
        "sub_sub_category_id",
        filteredSubSubCategories[0].id
      );
    } else {
      formik.setFieldValue("sub_sub_category_id", undefined);
    }
  }, [filteredSubSubCategories]);

  return (
    <div className={styles.container}>
      <AdminBreadcrumbs
        items={[
          {
            path: pagePaths.adminSubSubSubCategory,
            label: "Sub Sub Sub Categories",
          },
          {
            path: pagePaths.adminCreateSubSubSubCategory,
            label: "Create Sub Sub Sub Category",
          },
        ]}
      />
      <div>
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <p className={styles.title}>Add Sub Sub Category Details</p>
          </div>
          <Form onSubmit={formik.handleSubmit} className={styles.formItems}>
            <Form.Group>
              <Form.Label>Select Category</Form.Label>
              <Form.Select
                id="category_id"
                name="category_id"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.category_id}
                aria-label="Select Category"
              >
                {!!categories?.length &&
                  categories.map((item) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </Form.Select>
              {formik.errors.category_id && formik.touched.category_id && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.category_id}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Select Sub Category</Form.Label>
              <Form.Select
                id="sub_category_id"
                name="sub_category_id"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.sub_category_id}
                aria-label="Select Sub Category"
              >
                {!!filteredSubCategories?.length &&
                  filteredSubCategories.map((item) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </Form.Select>
              {formik.errors.sub_category_id &&
                formik.touched.sub_category_id && (
                  <Form.Text className={styles.errorText} muted>
                    {formik.errors.sub_category_id}
                  </Form.Text>
                )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Select Sub Sub Category</Form.Label>
              <Form.Select
                id="sub_sub_category_id"
                name="sub_sub_category_id"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.sub_sub_category_id}
                aria-label="Select Sub Sub Category"
              >
                {!!filteredSubSubCategories?.length &&
                  filteredSubSubCategories.map((item) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </Form.Select>
              {formik.errors.sub_sub_category_id &&
                formik.touched.sub_sub_category_id && (
                  <Form.Text className={styles.errorText} muted>
                    {formik.errors.sub_sub_category_id}
                  </Form.Text>
                )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="name">Sub Sub Sub Category Title</Form.Label>
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
            </Form.Group>
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
            <Button
              disabled={formik.isSubmitting}
              type="submit"
              className={styles.submitButton}
              variant="primary"
            >
              {formik.isSubmitting ? "Loading..." : "Submit"}
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default AdminCreateSubSubSubCategoryPage;
