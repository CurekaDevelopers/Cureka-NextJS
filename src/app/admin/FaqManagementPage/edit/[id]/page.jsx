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
import { addFaq, editFaq } from "../../../../redux/action";
import { pagePaths } from "../../../../utils/constants/constant";
import { FAQType, status } from "../../../../utils/constants/common.constants";
import { initialValues, validationSchema } from "./helper";
import styles from "./styles.module.scss";

const AdminCreateFaqsPage = ({ isEditPage = false }) => {
  const formikRef = useRef();
  const dispatch = useDispatch();
  const navigate = useRouter();
  const { id } = useParams();
  const { faqs } = useSelector((state) => state.admin);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      if (isEditPage) {
        dispatch(
          editFaq(id, values, () => {
            setLoading(false);
            navigate.push(pagePaths.adminFaqManagement);
          })
        );
      } else {
        dispatch(
          addFaq(values, () => {
            setLoading(false);
            navigate.push(pagePaths.adminFaqManagement);
          })
        );
      }
    },
  });

  useEffect(() => {
    formikRef.current = formik;
  }, [formik]);

  useEffect(() => {
    const formik = formikRef.current || {};
    if (isEditPage && faqs.length && id && formik.setValues) {
      const faq = faqs.find((item) => parseInt(item.id) === parseInt(id));
      if (!faq) {
        navigate.push(pagePaths.adminFaqManagement);
      }
      formik.setValues(faq || {});
    }
  }, [isEditPage, faqs, id, navigate]);

  return (
    <div className={styles.container}>
      <AdminBreadcrumbs
        items={[
          {
            path: pagePaths.adminFaqManagement,
            label: "FAQ Management",
          },
          {
            path: pagePaths.adminCreateFaq,
            label: isEditPage ? "Edit FAQ" : "Create FAQ",
          },
        ]}
      />
      <div>
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <p className={styles.title}>Add Faq Details</p>
          </div>
          <Form onSubmit={formik.handleSubmit} className={styles.formItems}>
            <Form.Group>
              <Form.Label htmlFor="type">Type</Form.Label>
              <Form.Select
                aria-label="Select Type"
                id="type"
                name="type"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.type}
              >
                {Object.entries(FAQType).map(([key, value]) => {
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
              <Form.Label htmlFor="question">Question</Form.Label>
              <Form.Control
                type="text"
                id="question"
                name="question"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.question}
              />
              {formik.errors.question && formik.touched.question && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.question}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="answer">Answer</Form.Label>
              <Form.Control
                type="text"
                id="answer"
                name="answer"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.answer}
              />
              {formik.errors.answer && formik.touched.answer && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.answer}
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

export default AdminCreateFaqsPage;
