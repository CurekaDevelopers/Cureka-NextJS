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
  editPreferenceType,
  fetchPreferenceType,
  preferenceCategory,
} from "../../../../redux/action";
import { pagePaths } from "../../../../utils/constants/constant";
import lazyLoadable from "../../../../utils/lazyLoadable";
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
  const { categories, preferenceType } = useSelector((state) => state.admin);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!categories?.length && isEditPage) {
      dispatch(fetchPreferenceType());
    }
  }, [categories?.length, dispatch, isEditPage]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      //setLoading(true);

      if (isEditPage) {
        dispatch(
          editPreferenceType(
            id,
            {
              ...values,
            },
            () => {
              setSubmitting(false);
              navigate.push(pagePaths.adminPreferenceType);
            }
          )
        );
      } else {
        dispatch(
          preferenceCategory(
            {
              ...values,
            },
            () => {
              setSubmitting(false);
              navigate.push(pagePaths.adminPreferenceType);
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
    if (
      isEditPage &&
      preferenceType?.results.length &&
      id &&
      formik.setValues
    ) {
      const category = preferenceType?.results.find(
        (item) => parseInt(item.id) === parseInt(id)
      );
      if (!category) {
        navigate.push(pagePaths.adminPreferenceType);
      }
      formik.setValues(category || {});
      // setPreviewImage(category?.image);
    }
  }, [isEditPage, preferenceType?.results, id, navigate]);

  return (
    <div className={styles.container}>
      <AdminBreadcrumbs
        items={[
          {
            path: pagePaths.adminPreferenceType,
            label: "Preference  Management",
          },
          {
            path: pagePaths.adminCreateCategory,
            label: isEditPage ? "Edit Preference" : "Create Preference",
          },
        ]}
      />
      <div>
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <p className={styles.title}>Add Preference Details</p>
          </div>
          <Form onSubmit={formik.handleSubmit} className={styles.formItems}>
            <Form.Group>
              <Form.Label htmlFor="name">Preference Name</Form.Label>
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
