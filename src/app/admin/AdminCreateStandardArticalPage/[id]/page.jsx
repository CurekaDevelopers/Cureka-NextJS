"use client";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import Card from "../../../../components/Card";
import {
  addStandardSize,
  editStandardSize,
  fetchArticleType,
  fetchCategories,
  fetchListStandardSize,
} from "../../../../redux/action";
import { pagePaths } from "../../../../utils/constants/constant";
import lazyLoadable from "../../../../utils/lazyLoadable";
import { status } from "../../../../utils/constants/common.constants";
import { initialValues, validationSchema } from "./helper";
import styles from "./styles.module.scss";
import AdminBreadcrumbs from "../../../../components/admin/AdminBreadcrumbs/index";

const RichtextEditor = lazyLoadable(() =>
  import("../../../../components/RichtextEditor")
);

const AdminCreateStandardArticalPage = ({ isEditPage = false }) => {
  const formikRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useParams();
  const { articleType, listStandardSize } = useSelector((state) => state.admin);
  const [loading, setLoading] = useState(false);

  const { results } = articleType;

  // Ensure categories are fetched if editing
  useEffect(() => {
    if (!results?.length && isEditPage) {
      dispatch(fetchCategories());
    }
  }, [results?.length, dispatch, isEditPage]);

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      artical_type_id: "", // Initialize as empty string
      name: "",
      status: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);

      if (isEditPage) {
        dispatch(
          editStandardSize(id, { ...values }, () => {
            setSubmitting(false);
            router.back();
          })
        );
      } else {
        dispatch(
          addStandardSize({ ...values }, () => {
            setSubmitting(false);
            router.back();
          })
        );
      }
    },
  });

  useEffect(() => {
    formikRef.current = formik;
  }, [formik]);

  // Load form values if in edit mode
  useEffect(() => {
    if (isEditPage && listStandardSize?.length && id && formik.setValues) {
      const article_type_id = listStandardSize.find(
        (item) => parseInt(item.id) === parseInt(id)
      );
      formik.setValues(article_type_id || {});
    }
  }, [isEditPage, listStandardSize, id]);

  // Ensure that the article types and listStandardSize are fetched
  useEffect(() => {
    dispatch(fetchArticleType()); // Fetch article types

    // Fetch listStandardSize only if article_type_id is valid
    const articalTypeId = formik.values.artical_type_id;
    if (articalTypeId) {
      dispatch(fetchListStandardSize(articalTypeId)); // Fetch list based on the selected article_type_id
    }
  }, [dispatch, formik.values.artical_type_id]); // Watch formik values

  // Handle change in article type
  const handleArticleTypeChange = (e) => {
    const selectedArticalTypeId = e.target.value;
    formik.setFieldValue("artical_type_id", selectedArticalTypeId);

    // Only fetch listStandardSize when article_type_id is selected
    if (selectedArticalTypeId) {
      dispatch(fetchListStandardSize(selectedArticalTypeId)); // Fetch list with valid ID
    }
  };

  return (
    <div className={styles.container}>
      <AdminBreadcrumbs
        items={[
          { path: pagePaths.adminCategories, label: "Categories Management" },
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
              <Form.Label htmlFor="article_type_id">
                Select Article Type<span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                id="article_type_id"
                name="artical_type_id"
                onChange={handleArticleTypeChange} // Use the custom handler here
                onBlur={formik.handleBlur}
                value={formik.values.artical_type_id || ""} // Ensure empty fallback if undefined
              >
                <option value="">Select Article Type</option>
                {results?.map((value) => (
                  <option key={value.id} value={value.id}>
                    {value.name}
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
                id="status"
                name="status"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.status}
              >
                <option disabled>Select Status</option>
                {Object.entries(status).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
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
