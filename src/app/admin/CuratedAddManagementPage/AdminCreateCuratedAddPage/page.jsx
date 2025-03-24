"use client";

import { useFormik } from "formik";
import _ from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { MultiSelect } from "react-multi-select-component";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useParams } from "react-router-dom";
import Card from "../../../../components/Card";
import AdminBreadcrumbs from "../../../../components/admin/AdminBreadcrumbs";
import {
  createCuratedAdd,
  fetchCuratedAdds,
  fetchProductsOptions,
  updateCuratedAdd,
} from "../../../../redux/action";
import { pagePaths } from "../../../../utils/constants/constant";
import { uploadImage } from "../../../../lib/services/file-upload";
import { status } from "../../../../utils/constants/common.constants";
import { initialValues, validationSchema } from "./helper";
import styles from "./styles.module.scss";

const AdminCreateCuratedAddPage = ({ isEditPage = false }) => {
  const formikRef = useRef();
  const dispatch = useDispatch();
  const navigate = useRouter();
  const { id } = useParams();
  const {
    curatedAdds: { CURATED },
    productOptions,
  } = useSelector((state) => state.admin);
  const { adminEmail } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    dispatch(fetchProductsOptions());
  }, [dispatch]);

  useEffect(() => {
    if (!CURATED?.length) {
      dispatch(fetchCuratedAdds());
    }
  }, [CURATED?.length, dispatch]);

  const maskProductOptions = (opt) => {
    return opt.map((dataObject) => ({
      value: dataObject.product_id,
      label: dataObject.vendor_article_name,
    }));
  };

  const options = useMemo(() => {
    return maskProductOptions(productOptions);
  }, [productOptions]);

  const onChangeProducts = (newSelected) => {
    setProductsList(newSelected);
    const parsedProductList = _.toString(_.map(newSelected, "value"));
    formik.setFieldValue("products", parsedProductList);
  };

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
            updateCuratedAdd(
              id,
              {
                ...values,
                image: fileUrl,
                updated_by: adminEmail,
              },
              () => {
                setLoading(false);
                navigate.push(pagePaths.adminCuratedAddManagement);
              }
            )
          );
        } else {
          dispatch(
            createCuratedAdd(
              {
                ...values,
                image: fileUrl,
              },
              () => {
                setLoading(false);
                navigate.push(pagePaths.adminCuratedAddManagement);
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
    if (isEditPage && CURATED.length && id && formik.setValues) {
      const curatedAdd = CURATED.find(
        (item) => parseInt(item.id) === parseInt(id)
      );
      if (!curatedAdd) {
        navigate.push(pagePaths.adminCuratedAddManagement);
      }
      formik.setValues(curatedAdd || {});
      setPreviewImage(curatedAdd?.image);

      if (curatedAdd?.products) {
        const maskedProducts = maskProductOptions(curatedAdd?.products);
        setProductsList(maskedProducts);
        const parsedProductList = _.toString(_.map(maskedProducts, "value"));
        formik.setFieldValue("products", parsedProductList);
      }
    }
  }, [isEditPage, CURATED, id, navigate]);

  return (
    <div className={styles.container}>
      <AdminBreadcrumbs
        items={[
          {
            path: pagePaths.adminCuratedAddManagement,
            label: "Curated Add Management",
          },
          {
            path: pagePaths.adminCreateCuratedAdd,
            label: isEditPage ? "Edit Curated" : "Create Curated Add",
          },
        ]}
      />
      <div>
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <p className={styles.title}>Add Curated Add Details</p>
          </div>
          <Form onSubmit={formik.handleSubmit} className={styles.formItems}>
            <Form.Group>
              <Form.Label>
                Curated Add URL <span className="text-danger">*</span>
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
                Curated Add Image<span className="text-danger">*</span>
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
              <Form.Label htmlFor="concerns">
                Products<span className="text-danger">*</span>
              </Form.Label>
              {options?.length > 0 && (
                <MultiSelect
                  value={productsList}
                  options={options}
                  onChange={onChangeProducts}
                />
              )}
            </Form.Group>
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

export default AdminCreateCuratedAddPage;
