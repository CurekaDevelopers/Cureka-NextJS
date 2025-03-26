"use client";
import { useFormik } from "formik";
import { useEffect, useMemo, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useRouter } from "next/navigation";
import Card from "../../../../components/Card";
import AdminBreadcrumbs from "../../../../components/admin/AdminBreadcrumbs/index";
import {
  createSubSubCategory,
  fetchCategories,
  fetchSubCategories,
  fetchSubsubCategories,
  updateSubsubCategory,
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

const AdminCreateSubSubCategoryPage = ({ isEditPage = false }) => {
  const { id } = useParams();
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
    dispatch(fetchSubsubCategories());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      let fileUrl = "";
      if (typeof values?.image == "string") {
        fileUrl = values?.image;
      } else {
        const uploadData = await uploadImage(
          values.image,
          "sub-sub-categories",
          (uploadProgress) => {
            console.log({ uploadProgress });
          }
        );
        fileUrl = uploadData.fileUrl;
      }
      console.log("fileUrl", fileUrl);
      if (fileUrl) {
        if (!isEditPage) {
          dispatch(
            createSubSubCategory(
              {
                ...values,
                image: fileUrl,
              },
              () => {
                setSubmitting(false);
                navigate.push(pagePaths.adminSubSubCategory);
              }
            )
          );
        } else {
          dispatch(
            updateSubsubCategory(
              id,
              {
                ...values,
                image: fileUrl,
              },
              () => {
                setSubmitting(false);
                navigate.push(pagePaths.adminSubSubCategory);
              }
            )
          );
        }
      }
    },
  });

  useEffect(() => {
    formikRef.current = formik;
  }, [formik]);

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

  const dynamicFilteredSubCategories = [
    { id: "Select Sub Category", name: "Select Sub Category" }, // Add a default "select" option
    ...filteredSubCategories,
  ];

  useEffect(() => {
    if (isEditPage) {
      if (subSubCategories && subSubCategories?.length > 0) {
        const subSubCategory = subSubCategories?.find(
          (item) => parseInt(item.id) === parseInt(id)
        );
        console.log("subSubCategory", subSubCategory);
        formik.setFieldValue("name", subSubCategory?.name);
        formik.setFieldValue("description", subSubCategory?.description);
        formik.setFieldValue("image", subSubCategory?.image);
        formik.setFieldValue(
          "category_id",
          Number(subSubCategory?.category_id)
        );
        formik.setFieldValue(
          "sub_category_id",
          Number(subSubCategory?.sub_category_id)
        );
        formik.setFieldValue("sub_sub_category_id", subSubCategory?.id);
        formik.setFieldValue("metaTitle", subSubCategory?.metaTitle);
        formik.setFieldValue(
          "metaDescription",
          subSubCategory?.metaDescription
        );

        setPreviewImage(subSubCategory?.image);
      }
    }
  }, [id, subSubCategories]);

  return (
    <div className={styles.container}>
      <AdminBreadcrumbs
        items={[
          {
            path: pagePaths.adminCategories,
            label: "Categories Management",
          },
          {
            path: pagePaths.adminCreateSubSubCategory,
            label: isEditPage
              ? "Edit Sub Sub Category"
              : "Create Sub Sub Category",
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
                {!!dynamicFilteredSubCategories?.length &&
                  dynamicFilteredSubCategories.map((item) => {
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
              <Form.Label htmlFor="name">Sub Sub Category Title</Form.Label>
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
            {previewImage && previewImage !== "" && (
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
              <Form.Label htmlFor="metaTitle">
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
              <Form.Label htmlFor="metaDescription">
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

export default AdminCreateSubSubCategoryPage;
