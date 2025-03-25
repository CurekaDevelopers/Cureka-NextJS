"use client";
import { useFormik } from "formik";
import { useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../../components/Card";
import AdminBreadcrumbs from "../../../components/admin/AdminBreadcrumbs";
import { addPolicy, fetchPolicy } from "../../../redux/action";
import { pagePaths } from "../../../utils/constants/constant";
import lazyLoadable from "../../../utils/lazyLoadable";
import { initialValues, validationSchema } from "./helper";
import styles from "./styles.module.scss";

const RichtextEditor = lazyLoadable(() =>
  import("../../../components/RichtextEditor")
);

const PrivacyPolicyPage = ({
  policyName = "Terms & Conditions",
  policySlug = "Terms & Conditions",
}) => {
  const formikRef = useRef();
  const { policy } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  console.log({ policy });

  useEffect(() => {
    if (policySlug) {
      dispatch(fetchPolicy(policySlug));
    }
  }, [dispatch, policySlug]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      dispatch(
        addPolicy(
          {
            ...values,
            policy_slug: policySlug,
          },
          () => {
            setSubmitting(false);
          }
        )
      );
    },
  });

  useEffect(() => {
    formikRef.current = formik;
  }, [formik]);

  useEffect(() => {
    const formik = formikRef.current || {};
    if (policy?.policy_name && formik) {
      formik.setFieldValue("policy_name", policy?.policy_name);
      formik.setFieldValue("policy_content", policy?.policy_content);
    }
  }, [policy?.policy_content, policy?.policy_name]);

  return (
    <div className={styles.container}>
      <AdminBreadcrumbs
        items={[
          {
            path: pagePaths.adminPrivacyPolicyPage,
            label: policyName,
          },
        ]}
      />
      <Card className={styles.card}>
        <div className={styles.cardHeader}>
          <p className={styles.title}>{policyName}</p>
        </div>
        <Form onSubmit={formik.handleSubmit} className={styles.formItems}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              id="policy_name"
              name="policy_name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.policy_name}
            />
            {formik.errors.policy_name && formik.touched.policy_name && (
              <Form.Text className={styles.errorText} muted>
                {formik.errors.policy_name}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>{policyName}</Form.Label>
            <RichtextEditor
              id="policy_content"
              value={formik.values.policy_content}
              onChange={(value) =>
                formik.setFieldValue("policy_content", value)
              }
            />
            {formik.errors.policy_content && formik.touched.policy_content && (
              <Form.Text className={styles.errorText} muted>
                {formik.errors.policy_content}
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
  );
};

export default PrivacyPolicyPage;
