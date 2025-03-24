"use client";

import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useRouter } from "next/navigation";
import Card from "../../../../components/Card";
import AdminBreadcrumbs from "../../../../components/admin/AdminBreadcrumbs";
import {
  articleCategory,
  fetchArticleType,
  updateArticleType,
} from "../../../../redux/action";
import { pagePaths } from "../../../../utils/constants/constant";
import lazyLoadable from "../../../../utils/lazyLoadable";
import { uploadImage } from "../../../../lib/services/file-upload";
import { status } from "../../../../utils/constants/common.constants";
import { initialValues, validationSchema } from "./helper";
import styles from "./styles.module.scss";

const RichtextEditor = lazyLoadable(() =>
  import("../../../../components/RichtextEditor")
);

const AdminCreateCategoryPage = ({ isEditPage = false }) => {
  const formikRef = useRef();
  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useRouter();
  const { id } = useParams();
  const { articleType } = useSelector((state) => state.admin);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      //setLoading(true);

      if (isEditPage) {
        dispatch(
          updateArticleType(
            id,
            {
              ...values,
            },
            () => {
              setLoading(false);
              navigate(-1);
            }
          )
        );
      } else {
        dispatch(
          articleCategory(
            {
              ...values,
            },
            () => {
              setSubmitting(false);
              navigate.push(pagePaths.adminArticalType);
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
    if (isEditPage && articleType?.results?.length && id && formik.setValues) {
      const category = articleType?.results?.find(
        (item) => parseInt(item.id) === parseInt(id)
      );
      if (!category) {
        navigate.push(pagePaths.adminCategories);
      }
      formik.setValues(category || {});
      setPreviewImage(category?.image);
    }
  }, [isEditPage, articleType, id, navigate]);

  useEffect(() => {
    if (isEditPage) {
      dispatch(fetchArticleType());
    }
  }, [isEditPage]);

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
            label: isEditPage ? "Edit Article" : "Create Article",
          },
        ]}
      />
      <div>
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <p className={styles.title}>Add Article Details</p>
          </div>
          <Form onSubmit={formik.handleSubmit} className={styles.formItems}>
            <Form.Group>
              <Form.Label htmlFor="name">Article Type Title/Name</Form.Label>
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
