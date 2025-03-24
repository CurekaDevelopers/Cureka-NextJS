"use client";
import { useFormik } from "formik";
import _ from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { MultiSelect } from "react-multi-select-component";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useRouter } from "next/navigation";
import Card from "../../../components/Card";
import AdminBreadcrumbs from "../../../components/admin/AdminBreadcrumbs";
import {
  createCuratedAdd,
  fetchCuratedAdds,
  fetchProductsOptions,
  updateCuratedAdd,
} from "../../../redux/action";
import { pagePaths } from "../utils/constants/constant";
import { uploadImage } from "../../../services/file-upload";
import { status } from "../../../utils/constants/common.constants";
import { initialValues, validationSchema } from "./helper";
import styles from "./styles.module.scss";
import { FixedSizeList as List } from "react-window";

const AdminCreateSelfAddPage = ({ isEditPage = false }) => {
  const formikRef = useRef();
  const dispatch = useDispatch();
  const navigate = useRouter();
  const { id } = useParams();
  const {
    curatedAdds: { YOURSELF },
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
    if (YOURSELF?.length) {
      dispatch(fetchCuratedAdds());
    }
  }, [YOURSELF?.length, dispatch]);

  const maskProductOptions = (opt) => {
    return opt.map((dataObject) => ({
      value: dataObject.product_id,
      label: dataObject.vendor_article_name,
    }));
  };

  const options = useMemo(() => {
    return maskProductOptions(productOptions);
  }, [productOptions]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState(new Set());
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    setFilteredOptions(
      options.filter((option) =>
        option.label.toLowerCase().includes(lowerCaseSearchTerm)
      )
    );
  }, [searchTerm, options]);

  // const handleProductChange = (option) => {
  //   setSelectedProducts(prev => {
  //     const updated = new Set(prev);
  //     updated.has(option.value) ? updated.delete(option.value) : updated.add(option.value);
  //     return updated;
  //   });
  // };
  const handleProductChange = (option) => {
    setSelectedProducts((prev) => {
      const updated = new Set(prev);
      updated.has(option.value)
        ? updated.delete(option.value)
        : updated.add(option.value);

      // Convert Set to array and then to a string for Formik
      const parsedProductList = Array.from(updated).toString();

      // Set the field value in Formik
      formik.setFieldValue("products", parsedProductList);

      return updated; // Return the updated Set
    });
  };

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
                navigate.push(pagePaths.adminSelfAddManagement);
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
                navigate.push(pagePaths.adminSelfAddManagement);
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
    if (isEditPage && YOURSELF.length && id && formik.setValues) {
      const selfAdd = YOURSELF.find(
        (item) => parseInt(item.id) === parseInt(id)
      );
      if (!selfAdd) {
        navigate.push(pagePaths.adminSelfAddManagement);
      }
      formik.setValues(selfAdd || {});
      setPreviewImage(selfAdd?.image);

      if (selfAdd?.products) {
        const maskedProducts = maskProductOptions(selfAdd?.products);
        setProductsList(maskedProducts);
        const parsedProductList = _.toString(_.map(maskedProducts, "value"));
        formik.setFieldValue("products", parsedProductList);
        loadProductData(parsedProductList);
      }
    }
  }, [isEditPage, YOURSELF, id, navigate]);
  const loadProductData = (filterProductIds) => {
    const idsArray = filterProductIds.split(",").map((id) => parseInt(id, 10)); // Convert string to array of integers

    const filteredProducts = options.filter((product) =>
      idsArray.includes(product.value)
    );
    const proData = new Set(
      filteredProducts.map((dataObject) => dataObject.value)
    );
    setSelectedProducts(proData);
  };
  return (
    <div className={styles.container}>
      <AdminBreadcrumbs
        items={[
          {
            path: pagePaths.adminSelfAddManagement,
            label: "Self Add Management",
          },
          {
            path: pagePaths.adminCreateSelfAdd,
            label: isEditPage ? "Edit Self" : "Create Self Add",
          },
        ]}
      />
      <div>
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <p className={styles.title}>Add Self Add Details</p>
          </div>
          <Form onSubmit={formik.handleSubmit} className={styles.formItems}>
            <Form.Group>
              <Form.Label>
                Self Add URL <span className="text-danger">*</span>
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
                Self Add Image<span className="text-danger">*</span>
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
            {/* <Form.Group>
              <Form.Label htmlFor="concerns">Products<span className="text-danger">*</span></Form.Label>
              {options?.length > 0 && <MultiSelect
                value={productsList}
                options={options}
                onChange={onChangeProducts}
              />}
            </Form.Group> */}
            <Form.Group>
              <Form.Label htmlFor="concerns">
                Products<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Products..."
                style={{ marginBottom: "20px" }}
              />

              <List
                height={100}
                itemCount={filteredOptions.length}
                itemSize={35}
              >
                {({ index, style }) => {
                  const option = filteredOptions[index];
                  const isSelected = selectedProducts.has(option.value);
                  return (
                    <div
                      style={{
                        ...style,
                        backgroundColor: isSelected ? "#bde4ff" : "white",
                        cursor: "pointer",
                        padding: "5px",
                      }}
                      key={option.value}
                      onClick={() => handleProductChange(option)}
                    >
                      {option.label}
                    </div>
                  );
                }}
              </List>
              {selectedProducts.size > 0 && (
                <div>
                  <strong>Selected Products:</strong>
                  <ul>
                    {Array.from(selectedProducts).map((value) => (
                      <li key={value}>
                        {
                          options.find((option) => option.value === value)
                            ?.label
                        }
                      </li>
                    ))}
                  </ul>
                </div>
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

export default AdminCreateSelfAddPage;
