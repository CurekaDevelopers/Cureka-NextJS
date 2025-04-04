"use client";
import { useFormik } from "formik";
import _ from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { MultiSelect } from "react-multi-select-component";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useParams } from "next/navigation";
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

const AdminCreateCuratedAddPage = ({ isEditPage }) => {
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

  const maskProductOptions = (opt) =>
    opt.map((dataObject) => ({
      value: dataObject.product_id,
      label: dataObject.vendor_article_name,
    }));

  const options = useMemo(
    () => maskProductOptions(productOptions),
    [productOptions]
  );

  const onChangeProducts = (newSelected) => {
    setProductsList(newSelected);
    const parsedProductList = _.toString(_.map(newSelected, "value"));
    formikRef.current?.setFieldValue("products", parsedProductList);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        let fileUrl = values.image;
        if (values.image && typeof values.image !== "string") {
          const uploadData = await uploadImage(
            values.image,
            "ratingAndReviews"
          );
          fileUrl = uploadData?.fileUrl || "";
        }

        if (fileUrl) {
          const payload = { ...values, image: fileUrl, updated_by: adminEmail };
          if (isEditPage) {
            dispatch(
              updateCuratedAdd(id, payload, () =>
                navigate.push(pagePaths.adminCuratedAddManagement)
              )
            );
          } else {
            dispatch(
              createCuratedAdd(payload, () =>
                navigate.push(pagePaths.adminCuratedAddManagement)
              )
            );
          }
        }
      } catch (error) {
        console.error("Image upload error:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    formikRef.current = formik;
  }, [formik]);

  useEffect(() => {
    if (isEditPage && CURATED.length && id && formikRef.current) {
      const curatedAdd = CURATED.find(
        (item) => parseInt(item.id) === parseInt(id)
      );
      if (!curatedAdd) {
        navigate.push(pagePaths.adminCuratedAddManagement);
      } else {
        formikRef.current.setValues(curatedAdd);
        setPreviewImage(curatedAdd.image);

        if (curatedAdd.products) {
          const maskedProducts = maskProductOptions(curatedAdd.products);
          setProductsList(maskedProducts);
          const parsedProductList = _.toString(_.map(maskedProducts, "value"));
          formikRef.current.setFieldValue("products", parsedProductList);
        }
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
              {...formik.getFieldProps("url")}
            />
            {formik.touched.url && formik.errors.url && (
              <Form.Text className={styles.errorText}>
                {formik.errors.url}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Curated Add Image <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={(event) => {
                const selectedFile = event.target.files[0];
                if (selectedFile) {
                  setPreviewImage(URL.createObjectURL(selectedFile));
                  formik.setFieldValue("image", selectedFile);
                }
              }}
            />
            {formik.touched.image && formik.errors.image && (
              <Form.Text className={styles.errorText}>
                {formik.errors.image}
              </Form.Text>
            )}
          </Form.Group>

          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              style={{ maxWidth: "200px" }}
            />
          )}

          <Form.Group>
            <Form.Label>
              Products <span className="text-danger">*</span>
            </Form.Label>
            {options.length > 0 && (
              <MultiSelect
                value={productsList}
                options={options}
                onChange={onChangeProducts}
              />
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Status <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select {...formik.getFieldProps("status")}>
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

export default AdminCreateCuratedAddPage;
