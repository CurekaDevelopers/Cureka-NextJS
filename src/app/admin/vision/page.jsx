"use client";
import { useFormik } from "formik";
import { useEffect, useRef, useState, useCallback } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../../components/Card";
import AdminBreadcrumbs from "../../../components/admin/AdminBreadcrumbs";
import { addPolicy, fetchHomePage } from "../../../redux/action";
import { pagePaths } from "../../../utils/constants/constant";
import lazyLoadable from "../../../utils/lazyLoadable";
import { initialValues, validationSchema } from "./helper";
import styles from "./styles.module.scss";
import { uploadImage } from "../../../lib/services/file-upload";
import { env } from "../../../config/env.config";
import axios from "axios";
import toast from "react-hot-toast";

const RichtextEditor = lazyLoadable(() =>
  import("../../../components/RichtextEditor")
);

const Vision = () => {
  const formikRef = useRef();
  const { healthPage } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState(null);

  console.log(healthPage);

  useEffect(() => {
    dispatch(fetchHomePage());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let fileUrl = "";
      if (typeof values.image === "string") {
        fileUrl = values.image;
      } else {
        const uploadData = await uploadImage(
          values.image,
          "ratingAndReviews",
          (uploadProgress) => {
            console.log({ uploadProgress });
          }
        );
        fileUrl = uploadData.fileUrl;
      }
      if (fileUrl) {
        const postData = {
          id: 1,
          image: fileUrl ? fileUrl : values.image,
          heading: values.heading,
          content: values.content,
        };
        // console.log(postData,'postData');
        // return;
        try {
          const response = await axios.post(
            `${env.REACT_SERVER_BASE_URL}/adds/updatehomecontent`,
            postData
          );
          let data = response.data;
          if (data) {
            toast.success(data && data.message);
          }
          fetchHomePage();
        } catch (error) {
          console.error("Order error:", error);
          toast.error("Something went to wrong");
        }
      }
    },
  });

  useEffect(() => {
    formikRef.current = formik;
  }, [formik]);

  useEffect(() => {
    const formik = formikRef.current || {};

    if (healthPage && healthPage.length > 0) {
      if (healthPage.length > 0 && formik) {
        formik.setFieldValue(
          "heading",
          healthPage && healthPage[0] && healthPage[0].heading
        );
        formik.setFieldValue(
          "content",
          healthPage && healthPage[0] && healthPage[0].content
        );
        formik.setFieldValue(
          "image",
          healthPage && healthPage[0] && healthPage[0].image
        );
        setPreviewImage(healthPage && healthPage[0] && healthPage[0].image);
      }
    }
  }, [
    healthPage && healthPage[0] && healthPage[0].heading,
    healthPage && healthPage[0] && healthPage[0].content,
  ]);

  return (
    <div className={styles.container}>
      <AdminBreadcrumbs
        items={[
          {
            path: pagePaths.adminPrivacyPolicyPage,
            label: "Home Vision Page",
          },
        ]}
      />
      <Card className={styles.card}>
        <div className={styles.cardHeader}>
          <p className={styles.title}>Health Page</p>
        </div>
        <Form onSubmit={formik.handleSubmit} className={styles.formItems}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              id="heading"
              name="heading"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.heading}
            />
            {formik.errors.heading && formik.touched.heading && (
              <Form.Text className={styles.errorText} muted>
                {formik.errors.heading}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Add Image<span className="text-danger">*</span>
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
            <Form.Label>Content</Form.Label>
            <RichtextEditor
              id="content"
              value={formik.values.content}
              onChange={(value) => formik.setFieldValue("content", value)}
            />
            {formik.errors.content && formik.touched.content && (
              <Form.Text className={styles.errorText} muted>
                {formik.errors.content}
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

export default Vision;
