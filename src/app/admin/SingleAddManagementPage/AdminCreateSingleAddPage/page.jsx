"use client";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useRouter } from "next/navigation";
import Card from "../../../../components/Card/index";
import AdminBreadcrumbs from "../../../../components/admin/AdminBreadcrumbs";
import {
  createSingleAdd,
  fetchSingleAdds,
  updateSingleAdd,
} from "../../../../redux/action";
import { pagePaths } from "../../../../utils/constants/constant";
import { uploadImage } from "../../../../lib/services/file-upload";
import { status } from "../../../../utils/constants/common.constants";
import { initialValues, validationSchema } from "./helper";
import styles from "./styles.module.scss";

const AdminCreateSingleAddPage = ({ isEditPage = false }) => {
  const formikRef = useRef();
  const dispatch = useDispatch();
  const navigate = useRouter();
  const { id } = useParams();
  const { singleAdds } = useSelector((state) => state.admin);
  const { adminEmail } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (!singleAdds?.length) {
      dispatch(fetchSingleAdds());
    }
  }, [singleAdds?.length, dispatch]);

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
        setLoading(true);
        if (isEditPage) {
          dispatch(
            updateSingleAdd(
              id,
              {
                ...values,
                image: fileUrl,
                updated_by: adminEmail,
              },
              () => {
                setLoading(false);
                navigate.push(pagePaths.adminSingleAddManagement);
              }
            )
          );
        } else {
          dispatch(
            createSingleAdd(
              {
                ...values,
                image: fileUrl,
              },
              () => {
                setLoading(false);
                navigate.push(pagePaths.adminSingleAddManagement);
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

  useEffect(() => {
    const formik = formikRef.current || {};
    if (isEditPage && singleAdds.length && id && formik.setValues) {
      const singleAdd = singleAdds.find(
        (item) => parseInt(item.id) === parseInt(id)
      );
      if (!singleAdd) {
        navigate.push(pagePaths.adminSingleAddManagement);
      }
      formik.setValues(singleAdd || {});
      setPreviewImage(singleAdd?.image);
    }
  }, [isEditPage, singleAdds, id, navigate]);

  return (
    <div className={styles.container}>
      <AdminBreadcrumbs
        items={[
          {
            path: pagePaths.adminSingleAddManagement,
            label: "Single Add Management",
          },
          {
            path: pagePaths.adminCreateSingleAdd,
            label: isEditPage ? "Edit Single" : "Create Single Add",
          },
        ]}
      />
      <div>
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <p className={styles.title}>Add Single Add Details</p>
          </div>
          <Form onSubmit={formik.handleSubmit} className={styles.formItems}>
            <Form.Group>
              <Form.Label>
                Single Add URL <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="url"
                name="url"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.url}
              />
              {formik.errors.url && formik.touched.url && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.url}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label>
                Single Add Image<span className="text-danger">*</span>
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
            {isEditPage && (
              <Form.Group>
                <Form.Label htmlFor="status">
                  Status<span className="text-danger">*</span>
                </Form.Label>
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
              </Form.Group>
            )}
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

export default AdminCreateSingleAddPage;
