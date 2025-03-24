"use client";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useRouter } from "next/navigation";
import Card from "../../../components/Card";
import AdminBreadcrumbs from "../../../components/admin/AdminBreadcrumbs";
import {
  addStandardSize,
  editStandardSize,
  fetchArticleType,
  fetchCategories,
  fetchListStandardSize,
} from "../../../redux/action";
import { pagePaths } from "../../../utils/constants/constant";
import lazyLoadable from "../../../utils/lazyLoadable";
import { status } from "../../../utils/constants/common.constants";
import { initialValues, validationSchema } from "./helper";
import styles from "./styles.module.scss";

const RichtextEditor = lazyLoadable(() =>
  import("../../../components/RichtextEditor")
);

const AdminCreateStandardArticalPage = ({ isEditPage = false }) => {
  const formikRef = useRef();
  const dispatch = useDispatch();
  const navigate = useRouter();
  const { id, standardEdit } = useParams();
  const { articleType, listStandardSize } = useSelector((state) => state.admin);
  const [loading, setLoading] = useState(false);

  const { results, pagination } = articleType;

  useEffect(() => {
    if (!results?.length && isEditPage) {
      dispatch(fetchCategories());
    }
  }, [results?.length, dispatch, isEditPage]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);

      if (isEditPage) {
        dispatch(
          editStandardSize(
            standardEdit,
            {
              ...values,
            },
            () => {
              setSubmitting(false);
              navigate(-1);
            }
          )
        );
      } else {
        dispatch(
          addStandardSize(
            {
              ...values,
            },
            () => {
              setSubmitting(false);
              navigate(-1);
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
    if (isEditPage && listStandardSize?.length && id && formik.setValues) {
      const artical_type_id = listStandardSize?.find(
        (item) => parseInt(item.id) === parseInt(standardEdit)
      );
      formik.setValues(artical_type_id || {});
    }
  }, [isEditPage, listStandardSize, id, navigate]);

  useEffect(() => {
    dispatch(fetchArticleType());
    dispatch(fetchListStandardSize({ id }));
  }, [dispatch]);

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
            label: isEditPage
              ? "Edit Standard Article"
              : "Create Standard Article",
          },
        ]}
      />
      <div>
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <p className={styles.title}>Add standard size details</p>
          </div>
          <Form onSubmit={formik.handleSubmit} className={styles.formItems}>
            <Form.Group>
              <Form.Label htmlFor="artical_type_id">
                Select Article Type<span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                aria-label="Select Category"
                id="artical_type_id"
                name="artical_type_id"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.artical_type_id || formik.values?.id}
              >
                <option value="">Select Article Type</option>
                {results?.map((value, key) => (
                  <option key={key} value={value?.id}>
                    {value?.name}
                  </option>
                ))}
              </Form.Select>
              {formik.errors.artical_type_id &&
                formik.touched.artical_type_id && (
                  <Form.Text className={styles.errorText} muted>
                    {formik.errors.artical_type_id}
                  </Form.Text>
                )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="name">Name</Form.Label>
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

export default AdminCreateStandardArticalPage;
