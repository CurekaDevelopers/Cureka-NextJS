"use client";

import dayjs from "dayjs";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useRouter } from "next/navigation";
import Card from "../../../../../components/Card";
import AdminBreadcrumbs from "../../../../../components/admin/AdminBreadcrumbs";
import {
  createBlog,
  fetchBlogs,
  fetchCategories,
  fetchConcerns,
  updateBlogs,
} from "../../../../../redux/action";
import { pagePaths } from "../../../../../utils/constants/constant";
import lazyLoadable from "../../../../../utils/lazyLoadable";
import { uploadImage } from "../../../../../lib/services/file-upload";
import {
  convertToUrlSlug,
  getMySqlDate,
} from "../../../../../utils/common.utils";
import {
  initialValues,
  validationSchema,
} from "../../AdminCreateBlogsPage/helper";
import styles from "./styles.module.scss";

const RichtextEditor = lazyLoadable(() =>
  import("../../../../../components/RichtextEditor")
);

const AdminCreateBlogsPage = ({ isEditPage = false }) => {
  // Default value set to false

  const formikRef = useRef();
  const { categories, blogs, concerns } = useSelector((state) => state.admin);
  const navigate = useRouter();
  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState(null);
  const [previewImageThumbnail, setPreviewImageThumbnail] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [formData, setFromData] = useState({
    anyInput: "something",
    dropdownInput: null,
  });

  useEffect(() => {
    if (!blogs?.length && isEditPage) {
      dispatch(fetchBlogs());
    }
  }, [blogs?.length, dispatch, isEditPage]);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchConcerns());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let imageFileUrl = "";
      if (typeof values.image === "string") {
        imageFileUrl = values.image;
      } else {
        const uploadData = await uploadImage(
          values.image,
          "blogs",
          (uploadProgress) => {
            console.log({ uploadProgress });
          }
        );
        imageFileUrl = uploadData.fileUrl;
      }

      let thumbnailImageFileUrl = "";
      if (typeof values.thumbnail_image === "string") {
        thumbnailImageFileUrl = values.thumbnail_image;
      } else {
        const uploadData = await uploadImage(
          values.thumbnail_image,
          "blogs",
          (uploadProgress) => {
            console.log({ uploadProgress });
          }
        );
        thumbnailImageFileUrl = uploadData.fileUrl;
      }

      const blog_date = getMySqlDate(values.blog_date);
      if (thumbnailImageFileUrl && imageFileUrl) {
        if (isEditPage) {
          dispatch(
            updateBlogs(
              id,
              {
                ...values,
                image: imageFileUrl,
                thumbnail_image: thumbnailImageFileUrl,
                blog_date,
              },
              () => {
                setLoading(false);
                navigate.push(pagePaths.adminBlogs);
              }
            )
          );
        } else {
          dispatch(
            createBlog(
              {
                ...values,
                image: imageFileUrl,
                thumbnail_image: thumbnailImageFileUrl,
                blog_date,
              },
              () => {
                setLoading(false);
                navigate.push(pagePaths.adminBlogs);
              }
            )
          );
        }
      }
    },
  });

  useEffect(() => {
    const formik = formikRef.current || {};
    if (isEditPage && blogs.length && id && formik.setValues) {
      const blog = blogs.find((item) => parseInt(item.id) === parseInt(id));
      if (!blog) {
        navigate.push(pagePaths.adminBlogs);
        return;
      }
      formik.setValues(blog);
      setPreviewImage(blog.image);
      setPreviewImageThumbnail(blog.thumbnail_image);
    }
  }, [isEditPage, blogs, id, navigate]);

  useEffect(() => {
    formikRef.current = formik;
  }, [formik]);

  // useEffect(() => {
  //   const formik = formikRef.current || {};
  //   if (categories?.length && formik) {
  //     formik.setFieldValue("category_id", categories[0].id);
  //   }
  // }, [categories]);

  // useEffect(() => {
  //   const formik = formikRef.current || {};
  //   if (concerns?.length && formik) {
  //     formik.setFieldValue("concern_id", concerns[0].id);
  //   }
  // }, [concerns]);

  return (
    <div className={styles.container}>
      <AdminBreadcrumbs
        items={[
          {
            path: pagePaths.adminBlogs,
            label: "Blogs",
          },
          {
            path: pagePaths.adminCreateBlogs,
            label: isEditPage ? "Edit Blog" : "Create Blog",
          },
        ]}
      />
      <div>
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <p className={styles.title}>
              {!isEditPage ? "Add Blog Details" : "Edit Blog Details"}
            </p>
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
              <Form.Label>Select Concern</Form.Label>
              <Form.Select
                id="concern_id"
                name="concern_id"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.concern_id}
                aria-label="Select Concern"
              >
                {!!concerns?.length &&
                  concerns.map((item) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </Form.Select>
              {formik.errors.concern_id && formik.touched.concern_id && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.concern_id}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Blog Image<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="file"
                id="image"
                // name="image"
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
              )}{" "}
            </Form.Group>
            {previewImage && (
              <img src={previewImage} alt="Preview" style={{}} />
            )}

            <Form.Group>
              <Form.Label>
                Thumbnail Image <span className="text-danger">*</span>
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
                    setPreviewImageThumbnail(imageUrl);
                    formik.setFieldValue("thumbnail_image", selectedFile);
                  } else {
                    formik.setFieldValue("thumbnail_image", null);
                    setPreviewImageThumbnail(null);
                  }
                }}
                onBlur={formik.handleBlur}
              />
              {formik.errors.thumbnail_image &&
                formik.touched.thumbnail_image && (
                  <Form.Text className={styles.errorText} muted>
                    {formik.errors.thumbnail_image}
                  </Form.Text>
                )}
            </Form.Group>
            {previewImageThumbnail && (
              <img src={previewImageThumbnail} alt="Preview" style={{}} />
            )}
            <Form.Group>
              <Form.Label>
                Blog Title<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="title"
                name="title"
                onChange={(e) => {
                  const urlSlug = convertToUrlSlug(e?.target?.value || "");
                  formik.setFieldValue("url", urlSlug);
                  formik.setFieldValue("canonical_url", urlSlug);
                  formik.handleChange(e);
                }}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />
              {formik.errors.title && formik.touched.title && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.title}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Blog URL <span className="text-danger">*</span>
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
                Blog Description <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="description"
                name="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              />
              {formik.errors.description && formik.touched.description && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.description}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Canonical</Form.Label>
              <Form.Control
                type="text"
                id="canonical_url"
                name="canonical_url"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.canonical_url}
              />
              {formik.errors.canonical_url && formik.touched.canonical_url && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.canonical_url}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Og Tag</Form.Label>
              <Form.Control
                type="text"
                id="og_tag"
                name="og_tag"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.og_tag}
              />
              {formik.errors.og_tag && formik.touched.og_tag && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.og_tag}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Keywords</Form.Label>
              <Form.Control
                type="text"
                id="keywords"
                name="keywords"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.keywords}
              />
              {formik.errors.keywords && formik.touched.keywords && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.keywords}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Popularity</Form.Label>
              <Form.Select
                name="popularity"
                // onChange={({ target }) => {
                //   setFromData((prev) => ({ ...prev, dropdownInput: target?.value }));
                // }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.popularity}

                // value="yes"
              >
                <option key="blankKey" hidden value></option>
                {["yes", "no"].map((i) => {
                  return (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  );
                })}
              </Form.Select>
              {formik.errors.popularity && formik.touched.popularity && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.popularity}
                </Form.Text>
              )}
            </Form.Group>
            {/* <Form.Group>
              <Form.Label>Select Populariry</Form.Label>
              <Form.Select
                id="popularity"
                name="popularity"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.popularity}
                aria-label="Select Popularity"
              >
                {["Yes", "No"].map((item) => {
                  return (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  );
                })}
              </Form.Select>
              {formik.errors.popularity && formik.touched.popularity && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.popularity}
                </Form.Text>
              )}
            </Form.Group> */}
            <Form.Group>
              <Form.Label>
                Content <span className="text-danger">*</span>
              </Form.Label>
              <RichtextEditor
                value={formik.values.content}
                onChange={(value) => formik.setFieldValue("content", value)}
              />
              {formik.errors.content && formik.touched.content && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.content}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Blog Date
                <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="date"
                id="blog_date"
                name="blog_date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={dayjs(formik?.values?.blog_date).format("YYYY-MM-DD")}
                max={dayjs().format("YYYY-MM-DD")}
              />
              {formik.errors.blog_date && formik.touched.blog_date && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.blog_date}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label>Content 1</Form.Label>
              <RichtextEditor
                value={formik.values.content1}
                onBlur={formik.handleBlur}
                onChange={(value) => formik.setFieldValue("content1", value)}
              />
              {formik.errors.content1 && formik.touched.content1 && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.content1}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="status">Status n</Form.Label>
              <Form.Select
                aria-label="Select Status"
                id="status"
                name="status"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.status} // Ensure the correct value is pre-selected during update
              >
                <option disabled value="">
                  Select Status
                </option>
                <option value="Active">Active</option>
                <option value="In-Active">In-Active</option>
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

export default AdminCreateBlogsPage;
