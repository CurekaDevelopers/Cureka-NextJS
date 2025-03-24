"use client";
import countryList from "country-list";
import { useFormik } from "formik";
import _ from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { MultiSelect } from "react-multi-select-component";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useRouter } from "next/navigation";
import Card from "../../../../components/Card";
import AdminBreadcrumbs from "../../../../components/admin/AdminBreadcrumbs";
import {
  createProduct,
  fetchArticleType,
  fetchBrands,
  fetchConcerns,
  fetchNestedCategories,
  fetchPreferenceType,
  fetchProductsAdmin,
  fetchStandardSizeList,
  updateProduct,
} from "../../../../redux/action";
import { pagePaths } from "../../../../utils/constants/constant";
import lazyLoadable from "../../../../utils/lazyLoadable";
import { uploadImage } from "../../../../lib/services/file-upload";
import { convertToUrlSlug } from "../../../../utils/common.utils";
import {
  status,
  stock_status,
} from "../../../../utils/constants/common.constants";
import { initialValues, validationSchema } from "./helper";
import styles from "./styles.module.scss";

const RichtextEditor = lazyLoadable(() =>
  import("../../../../components/RichtextEditor")
);

const AdminCreateBrandsPage = ({ isEditPage = false }) => {
  const formikRef = useRef();
  const navigate = useRouter();
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    productsList,
    brands,
    concerns,
    preferenceType,
    articleType,
    standardSizeList,
  } = useSelector((state) => state.admin);
  const { nestedCategories } = useSelector((state) => state.customer);

  const [previewImage, setPreviewImage] = useState([]);
  const [previewVideo, setPreviewVideo] = useState([]);
  const [faqData, setFaqData] = useState([
    {
      question: "",
      answer: "",
    },
  ]);
  const [tags, setTags] = useState([]);
  const [categoryItem, setCategoryItem] = useState({
    category: {},
    subCategory: {},
    subSubCategory: {},
    subSubSubCategory: {},
  });
  const [loading, setLoading] = useState(false);
  const [concernsList, setConcernsList] = useState([]);
  const [preferenceList, setPreferenceList] = useState([]);

  const parseOptions = (opt) => {
    return opt.map((dataObject) => ({
      value: dataObject.id,
      label: dataObject.name,
    }));
  };

  const concernOptions = useMemo(() => {
    if (!_.isEmpty(concerns)) {
      return parseOptions(concerns);
    }
    return [];
  }, [concerns]);

  const preferenceOptions = useMemo(() => {
    if (!_.isEmpty(preferenceType)) {
      return parseOptions(preferenceType?.results);
    }
    return [];
  }, [preferenceType]);

  const onChangeConcerns = (newSelected) => {
    if (newSelected.length <= 3) {
      setConcernsList(newSelected);
      // setValue('concern', newSelected)
    } else {
      toast.error("Maximum 3 selections allowed!");
    }
  };

  const onChangePreference = (newSelected) => {
    if (newSelected.length <= 3) {
      setPreferenceList(newSelected);
      // setValue('preference', newSelected)
    } else {
      toast.error("Maximum 3 selections allowed!");
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      if (faqData?.length < 1) {
        formik.setFieldError("faqs_option", "Please add at least one faq.");
        return;
      } else {
        // formik?.setFieldError("tags", null)
      }

      // if (tags?.length < 1) {
      //   formik.setFieldError("tags", "Please create at least on tag.")
      //   return
      // }

      if (!values?.product_image) {
        formik.setFieldError("product_image", "Image is required.");
        return;
      }

      // setLoading(true);
      let fileUrl = [];
      let videoUrl = "";
      let sizeChart = "";

      if (values?.size_chart) {
        const uploadData = await uploadImage(
          values?.size_chart[0],
          "product",
          (uploadProgress) => {
            console.log({ uploadProgress });
            return uploadData.fileUrl;
          }
        );
        sizeChart = uploadData.fileUrl;
      }

      if (
        values?.product_image &&
        typeof values?.product_image[0] === "string"
      ) {
        fileUrl = values?.product_image;
      } else {
        let imageUrls = [];
        const uploadPromises = values.product_image?.map(async (val) => {
          const uploadData = await uploadImage(
            val,
            "product",
            (uploadProgress) => {
              console.log({ uploadProgress });
            }
          );
          return uploadData.fileUrl;
          // imageUrls.push(uploadData.fileUrl)
        });
        imageUrls = await Promise.all(uploadPromises);
        fileUrl.push(imageUrls);
      }
      if (
        values?.product_video &&
        typeof values?.product_video[0] === "string"
      ) {
        videoUrl = values?.product_video;
      } else if (values.product_video?.length !== undefined) {
        let videoLink = [];
        const uploadPromises = values.product_video?.map(async (val) => {
          const uploadData = await uploadImage(
            val,
            "product",
            (uploadProgress) => {
              console.log({ uploadProgress });
            }
          );
          return uploadData.fileUrl;
          // videoLink.push(uploadData.fileUrl)
        });

        videoLink = await Promise.all(uploadPromises);
        videoUrl = videoLink;
      }

      if (isEditPage) {
        dispatch(
          updateProduct(
            id,
            {
              ...values,
              tags: tags,
              category_id: categoryItem?.category?.id,
              category_name: categoryItem?.category?.name,
              sub_category: categoryItem?.subCategory?.name,
              sub_sub_category: categoryItem?.subSubCategory?.name,
              sub_sub_sub_category: categoryItem?.subSubSubCategory?.name,
              brand_image: JSON.stringify(fileUrl),
              faqs_option: JSON.stringify(faqData),
              preference: JSON.stringify(preferenceList),
              product_video: videoUrl,
              vendor_article_number: "1",
              size_chart: sizeChart,
              // brand_image: brandImageFileUrl,
            },
            () => {
              setLoading(false);
              navigate.push(pagePaths.adminProductManagement);
            }
          )
        );
      } else {
        delete values?.sub_sub_sub_category;
        delete values?.sub_sub_category;
        delete values?.sub_category;
        dispatch(
          createProduct(
            {
              ...values,
              tags: tags,
              category_id: categoryItem?.category?.id,
              category_name: categoryItem?.category?.name,
              sub_category_id: categoryItem?.subCategory?.id,
              sub_sub_category_id: categoryItem?.subSubCategory?.id,
              sub_sub_sub_category_id: categoryItem?.subSubSubCategory?.id,
              concern: JSON.stringify(concernsList),
              preference: JSON.stringify(preferenceList),
              product_image: JSON.stringify(fileUrl[0]),
              faqs_option: JSON.stringify(faqData),
              product_video: JSON.stringify(videoUrl),
              size_chart: sizeChart,
              // vendor_article_number:'1',
              // importer_name_and_address_with_pincode:'1',
              // weight_kg:'1',
              // expires_in_days:'1',
              // min_age_years:'1',
              // max_age_years:'1',
              // directions_of_use:'1',
              // tags:'1',
              // name:'1'
              // image: fileUrl,
              // brand_image: brandImageFileUrl,
            },
            () => {
              setLoading(false);
              navigate.push(pagePaths.adminProductManagement);
            }
          )
        );
      }
    },
  });
  console.log("formik", formik);

  formik.handleChangeCategory = (event) => {
    const eventData = JSON.parse(event?.target?.value);
    const myData = {
      id: eventData?.id,
      code: eventData?.code,
      name: eventData?.name,
      sub_categories: eventData?.sub_categories,
    };
    setCategoryItem((pre) => ({ ...pre, category: myData }));
    formik.setFieldValue(event.target.name, event.target.value);
  };

  formik.handleChangeSubCategory = (event) => {
    const eventData = JSON.parse(event.target.value);
    const myData = {
      id: eventData?.id,
      code: eventData?.code,
      name: eventData?.name,
      sub_sub_categories: eventData?.sub_sub_categories,
    };
    setCategoryItem((pre) => ({ ...pre, subCategory: myData }));

    formik.setFieldValue(event.target.name, event.target.value);
  };
  formik.handleChangeSubSubCategory = (event) => {
    let eventData = JSON.parse(event?.target?.value);
    const myData = {
      id: eventData?.id,
      code: eventData?.code,
      name: eventData?.name,
      sub_sub_sub_categories: eventData?.sub_sub_categories,
    };
    setCategoryItem((pre) => ({ ...pre, subSubCategory: myData }));
    formik.setFieldValue(event.target.name, event.target.value);
  };

  formik.handleChangeSubSubSubCategory = (event) => {
    eventData = JSON.parse(event.target.value);
    const myData = {
      id: eventData?.id,
      code: eventData?.code,
      name: eventData?.name,
    };
    setCategoryItem((pre) => ({ ...pre, subSubSubCategory: myData }));
    formik.setFieldValue(event.target.name, event.target.value);
  };

  // const handleRemoveImage = (ind) => {
  //   const myArray = previewImage
  //   myArray.splice(ind, 1)
  //   setPreviewImage([...myArray])
  // }
  const handleRemoveVideo = (ind) => {
    const myArray = previewVideo;
    myArray.splice(ind, 1);
    setPreviewVideo([...myArray]);
  };

  const removeTags = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
    if (tags?.length < 1) {
      // formik.setFieldError("tags", "Please create at least on tag")
    } else {
      // formik?.setFieldError("tags", null)
    }
  };
  const addTags = (event) => {
    if (event.target.value !== "") {
      setTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };

  const handleFaqQuestion = (event, ind) => {
    faqData.splice(ind, 1, { question: event, answer: faqData[ind]?.answer });
    setFaqData([...faqData]);
  };
  const handleFaqAnswer = (event, ind) => {
    faqData.splice(ind, 1, { answer: event, question: faqData[ind]?.question });
    setFaqData([...faqData]);
  };

  const handleRemoveFaq = (ind) => {
    if (faqData?.length > 0) {
      faqData.splice(ind, 1);
      setFaqData([...faqData]);
      return;
    } else {
      formik.setFieldError("faqs_option", "Please create at least one faqs");
    }
    toast.error("Please add Faq first.");
  };

  // useEffect(() => {
  //   if (tags?.length < 1) {
  //     // formik.setFieldError("tags", "Please create at least on tag")
  //   }
  //   else {
  //     formik?.setFieldError("tags", null)
  //     console.log("no error in tags field")
  //   }
  //   // console.log(tags)
  // }, [tags])

  useEffect(() => {
    if (faqData?.length < 1) {
      formik.setFieldError("faqs_option", "Please create at least one faqs");
    } else {
      formik?.setFieldError("faqs_option", null);
    }
    // console.log(tags)
  }, [faqData]);
  useEffect(() => {
    if (isEditPage) {
      formik.setFieldValue("category_name", formik?.values?.category_name);
    }
  }, [concerns]);

  useEffect(() => {
    formikRef.current = formik;
  }, [formik]);

  useEffect(() => {
    const formik = formikRef.current || {};
    if (isEditPage && productsList?.length && id && formik?.setValues) {
      const product = productsList?.find(
        (item) => parseInt(item.id) === parseInt(id)
      );
      console.log("product", product);
      if (!product) {
        navigate.push(pagePaths?.adminProductManagement);
      }
      formik.setValues(product || {});
      // formik.setFieldValue('category', product?.category);
      // setPreviewImage(product?.image);
      // setPreviewBrandImage(brand?.brand_image);
    }
  }, [isEditPage, productsList, id, navigate]);

  useEffect(() => {
    if (formik.values?.article_type) {
      dispatch(fetchStandardSizeList(formik.values?.article_type));
    }
  }, [formik.values?.article_type]);

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchProductsAdmin());
    dispatch(fetchNestedCategories());
    dispatch(fetchConcerns());
    dispatch(fetchArticleType());
    dispatch(fetchPreferenceType());
  }, [isEditPage]);

  const [sizeChartImage, setSizeChartImage] = useState();
  const handleChangeSizeChart = (e) => {
    const selectedFile = Array.from(e?.target?.files);
    const SizeChartUrl = URL.createObjectURL(e?.target?.files[0]);
    formik.setFieldValue("size_chart", selectedFile);
    setSizeChartImage(SizeChartUrl);
  };

  const [previewImages, setPreviewImages] = useState([]);
  const [uploadedImage, setUploadedImage] = useState([]);
  const handleImageChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setUploadedImage((prevSelectedFiles) => [
      ...prevSelectedFiles,
      ...selectedFiles,
    ]);
    if (selectedFiles.length > 0) {
      const imageArray = selectedFiles.map((file) => URL.createObjectURL(file));
      setPreviewImages((prevImages) => [...prevImages, ...imageArray]);
    }
  };

  useEffect(() => {
    if (uploadedImage?.length) {
      formik.setFieldValue("product_image", uploadedImage);
    } else {
      formik.setFieldValue("product_image", null);
    }
  }, [uploadedImage]);

  const handleRemoveImage = (index) => {
    const newPreviewImages = [...previewImages];
    const imgFile = [...uploadedImage];
    imgFile.splice(index, 1);
    setUploadedImage(imgFile);
    newPreviewImages.splice(index, 1);
    setPreviewImages(newPreviewImages);
  };

  const imgRef = useRef();

  const handleRemoveSizeChart = () => {
    formik.setFieldValue("size_chart", "");
    imgRef.current.value = null;
    setSizeChartImage("");
  };

  return (
    <div className={styles.container}>
      <AdminBreadcrumbs
        items={[
          {
            path: pagePaths.adminProductManagement,
            label: "Products Management",
          },
          {
            path: pagePaths.adminCreateBrand,
            label: isEditPage ? "Edit Products" : "Create Products",
          },
        ]}
      />
      <div>
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <p className={styles.title}>Add Products Details</p>
          </div>
          <Form onSubmit={formik.handleSubmit} className={styles.formItems}>
            {/* <Form.Group>
              <Form.Label htmlFor="name">Name<span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.name}
              />
              {formik.errors.name && formik.touched.name && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.name}
                </Form.Text>
              )}
            </Form.Group> */}

            <Form.Group>
              <Form.Label htmlFor="vendor_article_name">
                Vendor article name<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="vendor_article_name"
                name="vendor_article_name"
                onChange={(e) => {
                  const urlSlug = convertToUrlSlug(e?.target?.value || "");
                  formik.setFieldValue("url", urlSlug);
                  formik.handleChange(e);
                }}
                onBlur={formik.handleBlur}
                value={formik.values?.vendor_article_name}
              />
              {formik.errors.vendor_article_name &&
                formik.touched.vendor_article_name && (
                  <Form.Text className={styles.errorText} muted>
                    {formik.errors.vendor_article_name}
                  </Form.Text>
                )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="url">
                Url<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="url"
                name="url"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.url}
              />
              {formik.errors.url && formik.touched.url && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.url}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="category_name">
                Category<span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                aria-label="Select Category"
                id="category_name"
                name="category_name"
                onChange={formik.handleChangeCategory}
                onBlur={formik.handleBlur}
                value={formik?.values?.category_name}
              >
                <option value="">Select Category</option>
                {nestedCategories?.map((value, key) => (
                  <option key={key} value={JSON.stringify(value)}>
                    {value?.name}
                  </option>
                ))}
              </Form.Select>
              {formik.errors?.category_name && formik.touched.category_name && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors?.category_name}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="sub_category">Sub Category</Form.Label>
              <Form.Select
                aria-label="Select Category"
                id="sub_category"
                name="sub_category"
                onChange={formik.handleChangeSubCategory}
                onBlur={formik.handleBlur}
                // value={categoryItem?.subCategory?.name}
              >
                <option>Select Sub Category</option>
                {categoryItem?.category?.sub_categories?.length > 0 &&
                  categoryItem?.category?.sub_categories?.map((value, key) => {
                    return (
                      <option key={key} value={JSON.stringify(value)}>
                        {value?.name}
                      </option>
                    );
                  })}
              </Form.Select>
              {formik.errors.sub_category && formik.touched.sub_category && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.sub_category}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="sub_sub_category">
                Sub Sub Category
              </Form.Label>
              <Form.Select
                aria-label="Select Category"
                id="sub_sub_category"
                name="sub_sub_category"
                onChange={formik.handleChangeSubSubCategory}
                onBlur={formik.handleBlur}
                // value={categoryItem?.subSubCategory?.name}
              >
                <option>Select Sub Sub Category</option>
                {categoryItem?.subCategory?.sub_sub_categories?.length > 0 &&
                  categoryItem?.subCategory?.sub_sub_categories?.map(
                    (value, key) => {
                      return (
                        <option key={key} value={JSON.stringify(value)}>
                          {value?.name}
                        </option>
                      );
                    }
                  )}
              </Form.Select>
              {formik.errors.sub_sub_category &&
                formik.touched.sub_sub_category && (
                  <Form.Text className={styles.errorText} muted>
                    {formik.errors.sub_sub_category}
                  </Form.Text>
                )}
            </Form.Group>

            {/* <Form.Group>
              <Form.Label htmlFor="sub_sub_sub_category">Sub Sub Sub Category</Form.Label>
              <Form.Select
                aria-label="Select Category"
                id="sub_sub_sub_category"
                name="sub_sub_sub_category"
                onChange={formik.handleChangeSubSubSubCategory}
                onBlur={formik.handleBlur}
              // value={categoryItem?.subSubSubCategory?.name}
              >
                <option>Select Sub Sub Sub Category</option>
                {categoryItem?.subSubCategory?.sub_sub_sub_categories && categoryItem?.subSubCategory?.sub_sub_sub_categories?.map((value, key) => {
                  return (
                    <option key={key} value={JSON.stringify(value)}>
                      {value?.name}
                    </option>
                  );
                })}
              </Form.Select>
              {formik.errors.sub_sub_sub_category && formik.touched.sub_sub_sub_category && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.sub_sub_sub_category}
                </Form.Text>
              )}
            </Form.Group> */}

            <Form.Group>
              <Form.Label htmlFor="vendor_sku_code">
                Vendor SKU<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="vendor_sku_code"
                name="vendor_sku_code"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.vendor_sku_code}
              />
              {formik.errors.vendor_sku_code &&
                formik.touched.vendor_sku_code && (
                  <Form.Text className={styles.errorText} muted>
                    {formik.errors.vendor_sku_code}
                  </Form.Text>
                )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="brand">
                Brand<span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                aria-label="Select Category"
                id="brand"
                name="brand"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.brand}
              >
                <option value="">Select Brand</option>
                {brands?.map((value, key) => (
                  <option key={key} value={value?.id}>
                    {value?.name}
                  </option>
                ))}
              </Form.Select>
              {formik.errors.brand && formik.touched.brand && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.brand}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="concerns">Concerns</Form.Label>
              {concernOptions?.length > 0 && (
                <MultiSelect
                  value={concernsList}
                  options={concernOptions}
                  onChange={onChangeConcerns}
                />
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="concerns">Preferences</Form.Label>
              {preferenceOptions?.length > 0 && (
                <MultiSelect
                  value={preferenceList}
                  options={preferenceOptions}
                  onChange={onChangePreference}
                />
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="manufacturer_name_and_address_with_pincode">
                Manufacturer name and address with pincode
                <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="manufacturer_name_and_address_with_pincode"
                name="manufacturer_name_and_address_with_pincode"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={
                  formik.values?.manufacturer_name_and_address_with_pincode
                }
              />
              {formik.errors.manufacturer_name_and_address_with_pincode &&
                formik.touched.manufacturer_name_and_address_with_pincode && (
                  <Form.Text className={styles.errorText} muted>
                    {formik.errors.manufacturer_name_and_address_with_pincode}
                  </Form.Text>
                )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="packer_name_and_address_with_pincode">
                Packer name and address with pincode
                <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="packer_name_and_address_with_pincode"
                name="packer_name_and_address_with_pincode"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.packer_name_and_address_with_pincode}
              />
              {formik.errors.packer_name_and_address_with_pincode &&
                formik.touched.packer_name_and_address_with_pincode && (
                  <Form.Text className={styles.errorText} muted>
                    {formik.errors.packer_name_and_address_with_pincode}
                  </Form.Text>
                )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="importer_name_and_address_with_pincode">
                Importer name and address with pincode
              </Form.Label>
              <Form.Control
                type="text"
                id="importer_name_and_address_with_pincode"
                name="importer_name_and_address_with_pincode"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.importer_name_and_address_with_pincode}
              />
              {formik.errors.importer_name_and_address_with_pincode &&
                formik.touched.importer_name_and_address_with_pincode && (
                  <Form.Text className={styles.errorText} muted>
                    {formik.errors.importer_name_and_address_with_pincode}
                  </Form.Text>
                )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="country_of_origin">
                Country of origin<span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                aria-label="Select country of origin"
                id="country_of_origin"
                name="country_of_origin"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.country_of_origin}
              >
                <option disabled>Select country of origin</option>
                {Object.entries(countryList?.getCodeList()).map(
                  ([key, value]) => {
                    return (
                      <option key={key} value={value}>
                        {value}
                      </option>
                    );
                  }
                )}
              </Form.Select>
              {formik.errors.country_of_origin &&
                formik.touched.country_of_origin && (
                  <Form.Text className={styles.errorText} muted>
                    {formik.errors.country_of_origin}
                  </Form.Text>
                )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="weight_kg">
                Weight (kg)<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                id="weight_kg"
                name="weight_kg"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.weight_kg}
              />
              {formik.errors.weight_kg && formik.touched.weight_kg && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.weight_kg}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="dimensions_cm">
                Dimensions (cm)<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="dimensions_cm"
                name="dimensions_cm"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.dimensions_cm}
              />
              {formik.errors.dimensions_cm && formik.touched.dimensions_cm && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.dimensions_cm}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="components">
                Components<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="components"
                name="components"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.components}
              />
              {formik.errors.components && formik.touched.components && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.components}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="expires_in_days">
                Expires in (Enter number of days)
                <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                id="expires_in_days"
                min="0"
                name="expires_in_days"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.expires_in_days}
              />
              {formik.errors.expires_in_days &&
                formik.touched.expires_in_days && (
                  <Form.Text className={styles.errorText} muted>
                    {formik.errors.expires_in_days}
                  </Form.Text>
                )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="article_type">
                Article type<span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                aria-label="Select Category"
                id="article_type"
                name="article_type"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.article_type}
              >
                <option value="">Select article type</option>
                {articleType?.results?.map((value, key) => (
                  <option key={key} value={value?.id}>
                    {value?.name}
                  </option>
                ))}
              </Form.Select>
              {formik.errors.article_type && formik.touched.article_type && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.article_type}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="standard_size">
                Standard size<span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                aria-label="Standard size"
                id="standard_size"
                name="standard_size"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.standard_size}
              >
                <option value="">Select standard size</option>
                {standardSizeList?.results?.map((value, key) => (
                  <option key={key} value={value?.id}>
                    {value?.name}
                  </option>
                ))}
              </Form.Select>

              {formik.errors.standard_size && formik.touched.standard_size && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.standard_size}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="brand_size">
                Brand size<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="brand_size"
                name="brand_size"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.brand_size}
              />
              {formik.errors.brand_size && formik.touched.brand_size && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.brand_size}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="hsn">
                HSN<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                id="hsn"
                name="hsn"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.hsn}
              />
              <span className="text-info">
                Please Enter 8 Digit HSN Code Only
              </span>
              {formik.errors.hsn && formik.touched.hsn && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.hsn}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="sku_code">
                SKU Code<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="sku_code"
                name="sku_code"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.sku_code}
              />
              {formik.errors.sku_code && formik.touched.sku_code && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.sku_code}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="age_group">
                Age Group<span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                aria-label="Select Group"
                id="age_group"
                name="age_group"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.age_group}
              >
                <option value="">Select Age Group</option>
                {[
                  "Adult Men",
                  "Adult Women",
                  "Adult Unisex",
                  "Kids Unisex",
                  "Kids Boys",
                  "Kids Girls",
                ].map((value, key) => (
                  <option key={key}>{value}</option>
                ))}
              </Form.Select>
              {formik.errors.age_group && formik.touched.age_group && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.age_group}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="min_age_years">
                Min age (Years)<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                id="min_age_years"
                name="min_age_years"
                min="0"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.min_age_years}
              />
              {formik.errors.min_age_years && formik.touched.min_age_years && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.min_age_years}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="max_age_years">
                Max age (Years)<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                id="max_age_years"
                name="max_age_years"
                min="0"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.max_age_years}
              />
              {formik.errors.max_age_years && formik.touched.max_age_years && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.max_age_years}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="directions_of_use">
                Directions of use <span className="text-danger">*</span>
              </Form.Label>
              <RichtextEditor
                id="directions_of_use"
                value={formik.values?.directions_of_use || ""}
                onChange={(value) =>
                  formik.setFieldValue("directions_of_use", value)
                }
              />
              {formik.errors.directions_of_use &&
                formik.touched.directions_of_use && (
                  <Form.Text className={styles.errorText} muted>
                    {formik.errors.directions_of_use}
                  </Form.Text>
                )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="description">
                Description <span className="text-danger">*</span>
              </Form.Label>
              <RichtextEditor
                id="description"
                value={formik.values?.description || ""}
                onChange={(value) => formik.setFieldValue("description", value)}
              />
              {formik.errors?.description && formik.touched.description && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.description}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="product_benefits">
                Product benefits
              </Form.Label>
              <RichtextEditor
                id="product_benefits"
                value={formik.values?.product_benefits || ""}
                onChange={(value) =>
                  formik.setFieldValue("product_benefits", value)
                }
              />
              {formik.errors.product_benefits &&
                formik.touched.product_benefits && (
                  <Form.Text className={styles.errorText} muted>
                    {formik.errors.product_benefits}
                  </Form.Text>
                )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="product_highlights">
                Product highlights<span className="text-danger">*</span>
              </Form.Label>
              <RichtextEditor
                id="product_highlights"
                value={formik.values?.product_highlights || ""}
                onChange={(value) =>
                  formik.setFieldValue("product_highlights", value)
                }
              />
              {formik.errors.product_highlights &&
                formik.touched.product_highlights && (
                  <Form.Text className={styles.errorText} muted>
                    {formik.errors.product_highlights}
                  </Form.Text>
                )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="safety_information">
                Safety information<span className="text-danger">*</span>
              </Form.Label>
              <RichtextEditor
                id="safety_information"
                value={formik.values?.safety_information || ""}
                onChange={(value) =>
                  formik.setFieldValue("safety_information", value)
                }
              />
              {formik.errors.safety_information &&
                formik.touched.safety_information && (
                  <Form.Text className={styles.errorText} muted>
                    {formik.errors.safety_information}
                  </Form.Text>
                )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="special_features">
                Special features
              </Form.Label>
              <RichtextEditor
                id="special_features"
                value={formik.values?.special_features || ""}
                onChange={(value) =>
                  formik.setFieldValue("special_features", value)
                }
              />
              {formik.errors.special_features &&
                formik.touched.special_features && (
                  <Form.Text className={styles.errorText} muted>
                    {formik.errors.special_features}
                  </Form.Text>
                )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="tags">
                Tags<span className="text-danger">*</span>
              </Form.Label>
              {/* <TagsInput
                id="tags"
                name="tags"
                value={tags}
                onChange={handleTagsChange}
                placeholder="Add tags"
                removeKeys={[13, 8]}
              />
              {tags.length > 0 && (
                <p>Selected tags: {tags.join(', ')}</p>
              )} */}

              <div className="tags-input">
                <ul id="tags">
                  {tags.map((tag, index) => (
                    <li key={index} className="tag">
                      <span className="tag-title">{tag}</span>
                      <span
                        className="tag-close-icon"
                        onClick={() => removeTags(index)}
                      >
                        x
                      </span>
                    </li>
                  ))}
                </ul>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  onKeyUp={(event) =>
                    event.key === "Shift" ? addTags(event) : null
                  }
                  placeholder="Press shift to add tags"
                />
              </div>
              {formik.errors.tags && formik.touched.tags && (
                <div style={{ color: "red" }}>{formik.errors.tags}</div>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="mrp">
                MRP<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                id="mrp"
                name="mrp"
                min="0"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.mrp}
              />
              {formik.errors.mrp && formik.touched.mrp && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.mrp}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="discount_in_percent">
                Discount in percent
              </Form.Label>
              <Form.Control
                type="number"
                id="discount_in_percent"
                name="discount_in_percent"
                min="0"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.discount_in_percent}
              />
              {formik.errors.discount_in_percent &&
                formik.touched.discount_in_percent && (
                  <Form.Text className={styles.errorText} muted>
                    {formik.errors.discount_in_percent}
                  </Form.Text>
                )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="discount_in_amount">
                Discount in amount
              </Form.Label>
              <Form.Control
                type="number"
                id="discount_in_amount"
                name="discount_in_amount"
                min="0"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.discount_in_amount}
              />
              {formik.errors.discount_in_amount &&
                formik.touched.discount_in_amount && (
                  <Form.Text className={styles.errorText} muted>
                    {formik.errors.discount_in_amount}
                  </Form.Text>
                )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="key_ingredients">Key Ingredients</Form.Label>
              <Form.Control
                type="text"
                id="key_ingredients"
                name="key_ingredients"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.key_ingredients}
              />
              {formik.errors.key_ingredients &&
                formik.touched.key_ingredients && (
                  <Form.Text className={styles.errorText} muted>
                    {formik.errors.key_ingredients}
                  </Form.Text>
                )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="other_ingredients">
                Other Ingredients
              </Form.Label>
              <Form.Control
                type="text"
                id="other_ingredients"
                name="other_ingredients"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.other_ingredients}
              />
              {formik.errors.other_ingredients &&
                formik.touched.other_ingredients && (
                  <Form.Text className={styles.errorText} muted>
                    {formik.errors.other_ingredients}
                  </Form.Text>
                )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="min_order_quantity">
                Min order Quantity
              </Form.Label>
              <Form.Control
                type="number"
                min="0"
                id="min_order_quantity"
                name="min_order_quantity"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.min_order_quantity}
              />
              {formik.errors.min_order_quantity &&
                formik.touched.min_order_quantity && (
                  <Form.Text className={styles.errorText} muted>
                    {formik.errors.min_order_quantity}
                  </Form.Text>
                )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="max_order_quantity">
                Max order Quantity
              </Form.Label>
              <Form.Control
                type="number"
                min="0"
                id="max_order_quantity"
                name="max_order_quantity"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.max_order_quantity}
              />
              {formik.errors.max_order_quantity &&
                formik.touched.max_order_quantity && (
                  <Form.Text className={styles.errorText} muted>
                    {formik.errors.max_order_quantity}
                  </Form.Text>
                )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="back_order_quantity">
                Back order quantity
              </Form.Label>
              <Form.Control
                type="number"
                id="back_order_quantity"
                name="back_order_quantity"
                min="0"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.back_order_quantity}
              />
              {formik.errors.back_order_quantity &&
                formik.touched.back_order_quantity && (
                  <Form.Text className={styles.errorText} muted>
                    {formik.errors.back_order_quantity}
                  </Form.Text>
                )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="meta_title">Meta title</Form.Label>
              <Form.Control
                type="text"
                id="meta_title"
                name="meta_title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.meta_title}
              />
              {formik.errors.meta_title && formik.touched.meta_title && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.meta_title}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="meta_description">
                Meta description
              </Form.Label>
              <Form.Control
                type="text"
                id="meta_description"
                name="meta_description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.meta_description}
              />
              {formik.errors.meta_description &&
                formik.touched.meta_description && (
                  <Form.Text className={styles.errorText} muted>
                    {formik.errors.meta_description}
                  </Form.Text>
                )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="faqs_option">
                FAQS option<span className="text-danger">*</span>
              </Form.Label>
              {faqData?.map((val, ind) => (
                <>
                  <p>Question</p>
                  <Form.Control
                    type="text"
                    id="faqs_option"
                    name="faqs_option"
                    onChange={(e) => handleFaqQuestion(e.target.value, ind)}
                    value={val?.question}
                  />
                  <p>Answer</p>
                  <Form.Control
                    type="text"
                    id="faqs_option"
                    name="faqs_option"
                    onChange={(e) => handleFaqAnswer(e.target.value, ind)}
                    value={val?.answer}
                  />
                  <Button
                    type="button"
                    className="mt-2 p-2 mb-2"
                    style={{
                      fontSize: "12px",
                      backgroundColor: "red",
                      borderColor: "red",
                    }}
                    variant="primary"
                    onClick={() => handleRemoveFaq(ind)}
                  >
                    Remove
                  </Button>
                </>
              ))}
              <div>
                <Button
                  type="button"
                  className="mt-2"
                  variant="primary"
                  onClick={() =>
                    setFaqData((pre) => [...pre, { question: "", answer: "" }])
                  }
                >
                  Add Faq
                </Button>
              </div>
              {formik.errors.faqs_option && (
                <div style={{ color: "red" }}>{formik.errors.faqs_option}</div>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="image">Product Video</Form.Label>
              <Form.Control
                type="file"
                id="product_video"
                name="product_video"
                multiple
                accept="video/*"
                onChange={(event) => {
                  const selectedFile = Array.from(event.currentTarget.files);
                  if (selectedFile?.length > 0) {
                    let videoArray = [];
                    selectedFile?.map((val, ind) => {
                      const videoUrl = URL.createObjectURL(val);
                      videoArray.push(videoUrl);
                    });
                    setPreviewVideo([...videoArray]);
                    formik.setFieldValue("product_video", selectedFile);
                  } else {
                    formik.setFieldValue("product_video", null);
                    setPreviewVideo(null);
                  }
                }}
                onBlur={formik.handleBlur}
              />
              {formik.errors.product_video && formik.touched.product_video && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.product_video}
                </Form.Text>
              )}
            </Form.Group>

            <div className="d-flex justify-content-start">
              {previewVideo?.map((val, ind) => (
                <div
                  className="mr-2"
                  style={{
                    position: "relative",
                    border: "1px solid #000",
                    borderRadius: "7px",
                  }}
                >
                  <video width="320" height="240" controls>
                    <source src={val} type="video/mp4" />
                    <source src={val} type="video/ogg" />
                    Your browser does not support the video tag.
                  </video>

                  <span
                    onClick={() => handleRemoveVideo(ind)}
                    style={{ position: "absolute", right: 10, top: 10 }}
                  >
                    <RxCross2
                      style={{
                        fontSize: "30px",
                        background: "#757575",
                        borderRadius: "50%",
                        color: "#fff",
                        padding: 5,
                        cursor: "pointer",
                      }}
                    />
                  </span>
                </div>
              ))}
            </div>

            <Form.Group>
              <Form.Label htmlFor="image">
                Product images<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="file"
                id="product_image"
                name="product_image"
                multiple
                accept="image/*"
                // onChange={(event) => {
                //   const selectedFile = Array.from(event.currentTarget.files);
                //   if (selectedFile?.length > 0) {
                //     let imageArray = []
                //     selectedFile?.map((val, ind) => {
                //       const imageUrl = URL.createObjectURL(val);
                //       imageArray.push(imageUrl)
                //     })
                //     setPreviewImage([...imageArray]);
                //     formik.setFieldValue("product_image", selectedFile);
                //   } else {
                //     formik.setFieldValue("product_image", null);
                //     setPreviewImage(null);
                //   }
                // }}

                onChange={handleImageChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.product_image && formik.touched.product_image && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.product_image}
                </Form.Text>
              )}
            </Form.Group>

            <div className="d-flex justify-content-start">
              {previewImages?.map((val, ind) => (
                <div
                  className="mr-2"
                  style={{
                    position: "relative",
                    border: "1px solid #000",
                    borderRadius: "7px",
                  }}
                >
                  <img
                    src={val}
                    style={{
                      maxWidth: "200px",
                      maxHeight: "100%",
                      borderRadius: "7px",
                      overflow: "hidden",
                    }}
                  />
                  <span
                    onClick={() => handleRemoveImage(ind)}
                    style={{ position: "absolute", right: 10, top: 10 }}
                  >
                    <RxCross2
                      style={{
                        fontSize: "30px",
                        background: "#757575",
                        borderRadius: "50%",
                        color: "#fff",
                        padding: 5,
                        cursor: "pointer",
                      }}
                    />
                  </span>
                </div>
              ))}
            </div>

            {/** new fields  skin type */}
            <Form.Group>
              <Form.Label htmlFor="skin_type">Skin Type</Form.Label>
              <Form.Select
                aria-label="Select Category"
                id="skin_type"
                name="skin_type"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.skin_type}
              >
                <option value="">Select skin type</option>
                {["Normal", "Oily", "Dry", "Sensitive", "Combination"].map(
                  (value, key) => (
                    <option key={key}>{value}</option>
                  )
                )}
              </Form.Select>
              {formik.errors.skin_type && formik.touched.skin_type && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.skin_type}
                </Form.Text>
              )}
            </Form.Group>

            {/** new fields  skin type */}
            <Form.Group>
              <Form.Label htmlFor="hair_type">Hair Type</Form.Label>
              <Form.Select
                aria-label="Select Category"
                id="hair_type"
                name="hair_type"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.hair_type}
              >
                <option value="">Select hair type</option>
                {["Dry", "Frizzy", "Curly", "Normal", "Coloured Hair"].map(
                  (value, key) => (
                    <option key={key}>{value}</option>
                  )
                )}
              </Form.Select>
              {formik.errors.hair_type && formik.touched.hair_type && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.hair_type}
                </Form.Text>
              )}
            </Form.Group>

            {/** new fields  spf type */}
            <Form.Group>
              <Form.Label htmlFor="spf_type">SPF Type</Form.Label>
              <Form.Select
                aria-label="Select Category"
                id="spf_type"
                name="spf_type"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.spf_type}
              >
                <option value="">Select spf type</option>
                {["< 15", "15 - 20", "20 - 50", "Above 50"].map(
                  (value, key) => (
                    <option key={key}>{value}</option>
                  )
                )}
              </Form.Select>
              {formik.errors.spf_type && formik.touched.spf_type && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.spf_type}
                </Form.Text>
              )}
            </Form.Group>

            {/** new fields  size chart type */}
            <Form.Group>
              <Form.Label htmlFor="size_chart_type">Size chart Type</Form.Label>
              <Form.Select
                aria-label="Select Category"
                id="size_chart_type"
                name="size_chart_type"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.size_chart_type}
              >
                <option value="">Select size chart </option>
                {["CH", "S", "M", "L", "XL", "XXL", "XXL", "Uni", "Spl"].map(
                  (value, key) => (
                    <option key={key}>{value}</option>
                  )
                )}
              </Form.Select>
              {formik.errors.size_chart_type &&
                formik.touched.size_chart_type && (
                  <Form.Text className={styles.errorText} muted>
                    {formik.errors.size_chart_type}
                  </Form.Text>
                )}
            </Form.Group>

            {/** new fields  cols  type */}
            <Form.Group>
              <Form.Label htmlFor="color">Color</Form.Label>
              <Form.Select
                aria-label="Select Category"
                id="color"
                name="color"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.color}
              >
                <option value="">Select color</option>
                {[
                  "Red",
                  "Blue",
                  "Green",
                  "Black",
                  "Purple",
                  "Beige Brown",
                  "Grey Black",
                  "White",
                  "Pink",
                  "Grey",
                  "Brown",
                  "Yellow",
                  "Orange",
                  "Navy Blue",
                  "Maroon",
                  "Cream",
                  "Silver",
                  "Gold",
                  "Tan",
                  "Beige",
                  "Peach",
                  "Multi",
                  "Copper",
                  "Steel",
                  "Olive",
                  "Khaki",
                  "Rose",
                  "Taupe",
                  "Off White",
                  "Metallic",
                  "Charcoal",
                  "Grey Melange",
                  "Turquoise Blue",
                  "Coffee Brown",
                  "Sea Green",
                  "Lavender",
                  "Lime Green",
                ].map((value, key) => (
                  <option key={key}>{value}</option>
                ))}
              </Form.Select>
              {formik.errors.color && formik.touched.color && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.color}
                </Form.Text>
              )}
            </Form.Group>

            {/** new fields flavour  type */}
            <Form.Group>
              <Form.Label htmlFor="flavour">Flavour</Form.Label>
              <Form.Select
                aria-label="Select Category"
                id="flavour"
                name="flavour"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.flavour}
              >
                <option value="">Select flavours</option>
                {[
                  "Green Apple",
                  "Lemon",
                  "Mango",
                  "Orange",
                  "Vanilla and Cinnamon",
                  "Chocolate",
                  "Vanilla",
                  "Banana",
                  "Kesar Badam",
                  "Berries",
                  "Banana and Vanilla",
                  "Mango Ice Cream",
                  "Cookies and Cream",
                  "Anjeer and Honey",
                  "Pina Colada",
                  "Choco Nut",
                  "Coffee Caramel",
                  "Choco Sensation",
                  "Koffee Frappe",
                  "Cappuccino",
                  "American Ice Cream",
                  "Choc Fixx",
                  "Intense Chocolate",
                  "Choco Cookies",
                  "Nutty Caramel",
                  "Masala Milk",
                  "Swiss Chocolate",
                  "Creamy Vanilla",
                  "Caramel",
                  "Kesar Pista",
                  "Butterscotch",
                  "Elaichi",
                  "Apple",
                  "Lemon And Strawberry",
                  "Cinnamon",
                  "Vanilla Toffee",
                  "Caramel Vanilla",
                  "Cardamom",
                  "Mixed Fruit",
                  "Strawberry",
                  "Misty Orange Mint",
                  "Mixed Berry Blast",
                  "Kesar Elaichi",
                  "Raspberry",
                  "Wild Berry",
                  "Pashanbhed Ghan (Bergenia Ligulata ) 40 mg",
                  "Coffee",
                  "Honey Lemon",
                  "Pineapple",
                  "Cola",
                  "Tangy Orange",
                  "Watermelon",
                  "Red Fruits",
                  "Lime And Lemon",
                  "Wild Raspberry",
                  "Kesar",
                  "Biscuity and Vanilla",
                  "Mixed Berry",
                  "Sweet Cherry",
                  "Valencia Orange",
                  "Guava",
                  "Lemon Ice Tea",
                  "Cocoa",
                  "Dark Chocolate Hazelnut",
                  "French Vanilla",
                  "Dark Chocolate",
                  "Exotic Mango",
                  "Exotic Elderberry",
                  "Strawberry Mint",
                  "Mint",
                  "Assorted",
                  "Lychee",
                  "Forest Fruit",
                  "Cranberry",
                  "Active Ajwain",
                  "Active Jeera",
                ].map((value, key) => (
                  <option key={key}>{value}</option>
                ))}
              </Form.Select>
              {formik.errors.flavour && formik.touched.flavour && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.flavour}
                </Form.Text>
              )}
            </Form.Group>

            {/** new fields protien type */}
            <Form.Group>
              <Form.Label htmlFor="protein_type">Protein Type</Form.Label>
              <Form.Select
                aria-label="Select Category"
                id="protein_type"
                name="protein_type"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.protein_type}
              >
                <option value="">Select protein type</option>
                {[
                  "Whey Protein",
                  "Casein Protein",
                  "Soy Protein",
                  "Vegan Protein",
                ].map((value, key) => (
                  <option key={key}>{value}</option>
                ))}
              </Form.Select>
              {formik.errors.protein_type && formik.touched.protein_type && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.protein_type}
                </Form.Text>
              )}
            </Form.Group>

            {/** new fields diaper type */}
            <Form.Group>
              <Form.Label htmlFor="diaper_style"> Diaper style</Form.Label>
              <Form.Select
                aria-label="Select Category"
                id="diaper_style"
                name="diaper_style"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.diaper_style}
              >
                <option value="">Select diaper style</option>
                {["Pant Style", "Tape Style"].map((value, key) => (
                  <option key={key}>{value}</option>
                ))}
              </Form.Select>
              {formik.errors.diaper_style && formik.touched.diaper_style && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.diaper_style}
                </Form.Text>
              )}
            </Form.Group>

            {/** new fields formulation type */}
            <Form.Group>
              <Form.Label htmlFor="formulation_type">
                Formulation type
              </Form.Label>
              <Form.Select
                aria-label="Select Category"
                id="formulation_type"
                name="formulation_type"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.formulation_type}
              >
                <option value="">Select formulation type</option>
                {[
                  "Gel",
                  "Oil",
                  "Lotion",
                  "Cream",
                  "Balm",
                  "Tablet",
                  "Capsule",
                  "Gummy",
                  "Spray",
                  "Gel",
                  "Balm",
                  "Oil",
                  "Bar",
                  "Lotion",
                  "Liquid",
                  "Foam",
                  "Powder",
                  "Cream",
                  "Mask",
                  "Patches",
                  "Gel Cream",
                  "Serum",
                  "Tablet",
                  "Capsule",
                  "Gummies",
                  "Gel Sheet",
                  "Spary",
                  "Gel Serum",
                  "Pad",
                ].map((value, key) => (
                  <option key={key}>{value}</option>
                ))}
              </Form.Select>
              {formik.errors.formulation_type &&
                formik.touched.formulation_type && (
                  <Form.Text className={styles.errorText} muted>
                    {formik.errors.formulation_type}
                  </Form.Text>
                )}
            </Form.Group>

            {/** new fields formulation type */}
            <Form.Group>
              <Form.Label htmlFor="staging">Staging</Form.Label>
              <Form.Select
                aria-label="Select Category"
                id="staging"
                name="staging"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.staging}
              >
                <option value="">Select staging</option>
                {["Stage 1", "Stage 2", "Stage 3", "Stage 4"].map(
                  (value, key) => (
                    <option key={key}>{value}</option>
                  )
                )}
              </Form.Select>
              {formik.errors.staging && formik.touched.staging && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.staging}
                </Form.Text>
              )}
            </Form.Group>

            {/** new fields ends here */}

            <Form.Group>
              <Form.Label htmlFor="checkout">
                Checkout<span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                aria-label="Select Checkout"
                id="checkout"
                name="checkout"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.checkout}
              >
                <option disabled>Select Checkout</option>
                <option value="NO">No</option>
                <option value="YML">YML</option>
                <option value="LMB">LMB</option>
              </Form.Select>
              {formik.errors.checkout && formik.touched.checkout && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.checkout}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="status">
                Status<span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                aria-label="Select Category"
                id="status"
                name="status"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.status}
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

            <Form.Group>
              <Form.Label htmlFor="stock_status">Stock status</Form.Label>
              <Form.Select
                aria-label="Select stock status"
                id="stock_status"
                name="stock_status"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.stock_status}
              >
                <option disabled>Select stock status</option>
                {Object.entries(stock_status).map(([key, value]) => {
                  return (
                    <option key={key} value={value}>
                      {value}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="show_stock">Show Stock?</Form.Label>
              <Form.Select
                aria-label="Select Stock Status"
                id="show_stock"
                name="show_stock"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.show_stock}
              >
                <option disabled>Select Show Stock Status</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </Form.Select>
              {formik.errors.show_stock && formik.touched.show_stock && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.show_stock}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="new_arival">Is New Arrival?</Form.Label>
              <Form.Select
                aria-label="Select New Arrival"
                id="new_arrival"
                name="new_arrival"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.new_arrival}
              >
                <option disabled>Select New Arrival Status</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </Form.Select>
              {formik.errors.new_arrival && formik.touched.new_arrival && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.new_arrival}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="top_picks">Is Top Pick?</Form.Label>
              <Form.Select
                aria-label="Select Top Pick"
                id="top_picks"
                name="top_picks"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.top_picks}
              >
                <option disabled>Select Top Pick Status</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </Form.Select>
              {formik.errors.top_picks && formik.touched.top_picks && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.top_picks}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="ranking">Sort Order</Form.Label>
              <Form.Control
                type="number"
                id="ranking"
                name="ranking"
                min="0"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.ranking}
              />
              {formik.errors.ranking && formik.touched.ranking && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.ranking}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="newarrival_ranking">
                New Arrival Order
              </Form.Label>
              <Form.Control
                type="number"
                id="newarrival_ranking"
                name="newarrival_ranking"
                min="0"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.newarrival_ranking}
              />
              {formik.errors.newarrival_ranking &&
                formik.touched.newarrival_ranking && (
                  <Form.Text className={styles.errorText} muted>
                    {formik.errors.newarrival_ranking}
                  </Form.Text>
                )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="toppics_ranking">Top Picks Order</Form.Label>
              <Form.Control
                type="number"
                id="toppics_ranking"
                name="toppics_ranking"
                min="0"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.toppics_ranking}
              />
              {formik.errors.toppics_ranking &&
                formik.touched.toppics_ranking && (
                  <Form.Text className={styles.errorText} muted>
                    {formik.errors.toppics_ranking}
                  </Form.Text>
                )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="expert_advice">
                Expert advice <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="expert_advice"
                name="expert_advice"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.expert_advice}
              />

              {formik.errors.expert_advice && formik.touched.expert_advice && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.expert_advice}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="specifications">
                Accessories/specifications
              </Form.Label>
              <Form.Control
                type="text"
                id="specifications"
                name="specifications"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.specifications}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="feeding_table">Feeding table</Form.Label>
              <RichtextEditor
                id="feeding_table"
                value={formik.values?.feeding_table || ""}
                onChange={(value) =>
                  formik.setFieldValue("feeding_table", value)
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="size_chart">Size Chart</Form.Label>
              <Form.Control
                type="file"
                id="size_chart"
                name="size_chart"
                multiple
                accept="image/*"
                onChange={handleChangeSizeChart}
                ref={imgRef}
              />
            </Form.Group>
            {sizeChartImage && (
              <div className="d-flex justify-content-start">
                <div
                  className="mr-2"
                  style={{
                    position: "relative",
                    border: "1px solid #000",
                    borderRadius: "7px",
                  }}
                >
                  <img
                    src={sizeChartImage}
                    style={{
                      maxWidth: "200px",
                      maxHeight: "100%",
                      borderRadius: "7px",
                      overflow: "hidden",
                    }}
                    alt={`Preview`}
                  />
                  <span
                    onClick={() => handleRemoveSizeChart()}
                    style={{ position: "absolute", right: 10, top: 10 }}
                  >
                    <i
                      className="fas fa-times"
                      style={{
                        fontSize: "18px",
                        background: "#757575",
                        borderRadius: "50%",
                        color: "#fff",
                        padding: "5px",
                        cursor: "pointer",
                      }}
                    />
                  </span>
                </div>
              </div>
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

export default AdminCreateBrandsPage;
