"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  fetchArticleType,
  updateArticleType,
} from "../../../../../redux/action";
import { initialValues, validationSchema } from "./helper";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "../../../../../components/Card";
import AdminBreadcrumbs from "../../../../../components/admin/AdminBreadcrumbs";
import { pagePaths } from "../../../../../utils/constants/constant";
import { status } from "../../../../../utils/constants/common.constants";
import styles from "./styles.module.scss";

const AdminArticalPageEdit = ({ isEditPage = true }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useParams();

  console.log("ID from useParams:", id);

  const { articleType } = useSelector((state) => state.admin);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditPage && id) {
      dispatch(fetchArticleType(id));
    }
  }, [isEditPage, id, dispatch]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log("Submitting Form with Values:", values);
      setLoading(true);

      if (isEditPage && id) {
        dispatch(
          updateArticleType(id, values, (error) => {
            console.log("Update Callback Triggered", error);
            setLoading(false);
            if (!error) {
              router.back();
            } else {
              console.error("Update Failed:", error);
            }
          })
        );
      }
    },
  });

  useEffect(() => {
    if (isEditPage && articleType?.results?.length && id) {
      const category = articleType.results.find(
        (item) => item.id === parseInt(id)
      );
      if (category) {
        formik.setValues({
          name: category.name || "",
          status: category.status || "",
        });
      } else {
        router.push(pagePaths.adminCategories);
      }
    }
  }, [isEditPage, articleType, id, router]);

  return (
    <div className={styles.container}>
      <AdminBreadcrumbs
        items={[
          { path: pagePaths.adminCategories, label: "Categories Management" },
          {
            path: pagePaths.adminCreateCategory,
            label: isEditPage ? "Edit Artical Management" : "Create Category",
          },
        ]}
      />
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
              id="status"
              name="status"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.status}
            >
              <option disabled>Select Status</option>
              {Object.entries(status).map(([key, value]) => (
                <option key={key} value={value}>
                  {value}
                </option>
              ))}
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
  );
};

export default AdminArticalPageEdit;
