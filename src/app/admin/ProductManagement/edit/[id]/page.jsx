"use client";
import axios from "axios";
import countryList from "country-list";
import _ from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { MultiSelect } from "react-multi-select-component";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useParams } from "next/navigation";
import Card from "../../../../../components/Card";
import AdminBreadcrumbs from "../../../../../components/admin/AdminBreadcrumbs";
import { env } from "../../../../../config/env.config";
import {
  fetchArticleType,
  fetchBrands,
  fetchConcerns,
  fetchNestedCategories,
  fetchPreferenceType,
  fetchProductsAdmin,
  fetchStandardSizeList,
  updateProduct,
} from "../../../../../redux/action";
import { pagePaths } from "../../../../../utils/constants/constant";
import lazyLoadable from "../../../../../utils/lazyLoadable";
import { uploadImage } from "../../../../../lib/services/file-upload";
import { convertToUrlSlug } from "../../../../../utils/common.utils";
import {
  status,
  stock_status,
} from "../../../../../utils/constants/common.constants";
import styles from "./styles.module.scss";

const RichtextEditor = lazyLoadable(() =>
  import("../../../../../components/RichtextEditor")
);

const AdminCreateBrandsPage = ({ isEditPage = true }) => {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { preferenceType, brands, concerns, articleType, standardSizeList } =
    useSelector((state) => state.admin);
  const { nestedCategories } = useSelector((state) => state.customer);
  const [previewVideo, setPreviewVideo] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    control,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "faqs_option", // name of the field array in your form data
  });

  const [uploadedImage, setUploadedImage] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
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
      setValue("concern", newSelected);
    } else {
      toast.error("Maximum 3 selections allowed!");
    }
  };

  const onChangePreference = (newSelected) => {
    if (newSelected.length <= 3) {
      setPreferenceList(newSelected);
      setValue("preference", newSelected);
    } else {
      toast.error("Maximum 3 selections allowed!");
    }
  };

  const onSubmit = async (values) => {
    let fileUrl = [];
    let videoUrl = "";
    let sizeChart = "";

    if (values?.size_chart) {
      if (values?.size_chart && typeof values?.size_chart === "string") {
        sizeChart = values?.size_chart;
      } else {
        const uploadData = await uploadImage(
          values?.size_chart[0],
          "product",
          (uploadProgress) => {
            console.log({ uploadProgress });
          }
        );
        sizeChart = uploadData?.fileUrl;
      }
    }
    console.log(previewImages, ";previewImages");
    if (previewImages?.length > 0) {
      await Promise.all(
        values?.product_image?.map(async (val) => {
          if (typeof val === "string") {
            fileUrl.push(val);
          } else {
            const uploadData = await uploadImage(
              val,
              "product",
              (uploadProgress) => {
                console.log({ uploadProgress });
              }
            );
            fileUrl.push(uploadData?.fileUrl);
          }
        })
      );
    } else {
      setError("product_image", {
        message: "Product image is required.",
      });
    }

    if (values?.product_video && typeof values?.product_video === "string") {
      videoUrl = values?.product_video;
    } else if (
      values?.product_video &&
      typeof values.product_video === "object"
    ) {
      const uploadData = await uploadImage(
        values.product_video[0],
        "product",
        (uploadProgress) => {
          console.log("uploadProgress", { uploadProgress });
        }
      );
      videoUrl = uploadData.fileUrl;
    }

    if (previewImages?.length > 0) {
      if (isEditPage) {
        dispatch(
          updateProduct(
            id,
            {
              ...values,
              category_id: values?.category_id,
              concern: JSON.stringify(values?.concern),
              preference: JSON.stringify(values?.preference),
              faqs_option: JSON.stringify(values?.faqs_option),
              meta_description: values?.meta_description || null,
              product_image: JSON.stringify(fileUrl),
              product_video: videoUrl,
              vendor_article_number: "1",
              size_chart: sizeChart,
            },
            () => {
              setLoading(false);
              navigate(pagePaths.adminProductManagement);
            }
          )
        );
      }
    } else {
      setError("product_image", { message: "Please select image." });
    }
  };

  const handleRemoveVideo = (ind) => {
    const myArray = previewVideo;
    myArray.splice(ind, 1);
    setPreviewVideo([...myArray]);
    setValue("product_video", "");
  };

  const removeTags = (indexToRemove, event) => {
    let newTags = [...tags.filter((_, index) => index !== indexToRemove)];
    // let newTags = [...tags, event?.target?.value]

    if (newTags?.length < 1) {
      setError("tags", {
        message: "Tags are required.",
      });
    } else {
      clearErrors("tags");
    }

    setTags(newTags);
    setValue("tags", newTags.join());
  };
  const addTags = (event) => {
    if (event.target.value !== "") {
      let newTags = [...tags, event?.target?.value];
      setTags(newTags);
      setValue("tags", newTags.join());
      if (newTags?.length < 1) {
        setError("tags", {
          message: "Tags are required.",
        });
      } else {
        clearErrors("tags");
      }

      event.target.value = "";
    }
  };

  const handleAppend = () => {
    append({ question: "", answer: "" });
  };

  useEffect(() => {
    if (fields?.length < 1) {
      setError("faqs_option", {
        message: "Please add at least one faq.",
      });
    } else {
      clearErrors("faqs_option");
    }
  }, [fields]);

  const handleKeyUp = (event) => {
    if (event.key === "Shift") {
      addTags(event);
    }
  };
  const [cateGory, setCategory] = useState();
  const [directionOfUse, setDirectionOfUse] = useState("");
  const [description, setDescription] = useState("");
  const [productBenefit, setProductBenefit] = useState("");
  const [productHilight, setProductHilight] = useState("");
  const [safetyInformation, setSafetyInformation] = useState("");
  const [specialFeatures, setSpecialFeatures] = useState("");
  const [feedingTable, setFeedingTable] = useState();
  const [sizeChartImage, setSizeChartImage] = useState();

  const [categoryList, setCategoryList] = useState({});
  const [subCategoryList, setSubCategoryList] = useState({});
  const [subSubCategoryList, setSubSubCategoryList] = useState({});
  const [subSubSubCategoryList, setSubSubSubCategoryList] = useState({});
  const [productData, setProductData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadNestedCategories = async () => {
      if (nestedCategories.length === 0) {
        await dispatch(fetchNestedCategories());
      }
      setIsLoading(false);
    };

    loadNestedCategories();
  }, [dispatch, nestedCategories.length]);

  const [slug, setSlug] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [subCategorySlug, setSubCategorySlug] = useState("");
  const [subSubCategorySlug, setSubSubCategorySlug] = useState("");

  useEffect(() => {
    const fetchProductData = async () => {
      if (isEditPage && id) {
        try {
          const response = await axios.get(
            `${env.REACT_SERVER_BASE_URL}/admin-fetch-products-by-id/${id}`
          );
          const product = response.data?.[0];

          console.log("Product list", product);

          if (product) {
            setSlug(product.slug || ""); // Ensure default to empty string
            setCategorySlug(product.category_slug || ""); // Ensure default to empty string
            setSubCategorySlug(product.sub_category_slug || ""); // Ensure default to empty string
            setSubSubCategorySlug(product.sub_sub_category_slug || ""); // Ensure default to empty string
          }

          setProductData(product);
          setValue("vendor_article_name", product?.vendor_article_name);
          setValue("url", product?.url);
          setValue("category_id", product?.category_id);
          setValue("sub_category_id", product?.sub_category_id);
          setValue("sub_sub_category_id", product?.sub_sub_category_id);
          setValue("sub_sub_sub_category_id", product?.sub_sub_sub_category_id);
          setValue("vendor_sku_code", product?.vendor_sku_code);
          setValue("brand", product?.brand);
          setValue("checkout", product?.checkout);
          setValue(
            "packer_name_and_address_with_pincode",
            product?.packer_name_and_address_with_pincode
          );
          setValue(
            "importer_name_and_address_with_pincode",
            product?.importer_name_and_address_with_pincode
          );
          setValue("country_of_origin", product?.country_of_origin);
          setValue("weight_kg", product?.weight_kg);
          setValue("dimensions_cm", product?.dimensions_cm);
          setValue("components", product?.components);
          setValue("expires_in_days", product?.expires_in_days);
          setValue("article_type", product?.article_type);
          setValue("brand_size", product?.brand_size);
          setValue("hsn", product?.hsn);
          setValue("sku_code", product?.sku_code);
          setValue("age_group", product?.age_group);
          setValue("min_age_years", product?.min_age_years);
          setValue("max_age_years", product?.max_age_years);
          setValue("stock_status", product?.stock_status);
          setValue("new_arrival", product?.new_arrival);
          setValue("show_stock", product?.show_stock);
          setValue("top_picks", product?.top_picks);
          setValue("ranking", product?.ranking);
          setValue("newarrival_ranking", product?.newarrival_ranking);
          setValue("toppics_ranking", product?.toppics_ranking);
          if (product?.product_video) {
            setPreviewVideo([product?.product_video]);
            setValue(
              "product_video",
              product?.product_video ? product?.product_video : ""
            );
          }
          setValue("directions_of_use", product?.directions_of_use);
          setDirectionOfUse(product.directions_of_use);

          setValue("description", product?.description);
          setDescription(product?.description);

          setValue("product_benefits", product?.product_benefits);
          setProductBenefit(product.product_benefits || "");

          setValue("product_highlights", product?.product_highlights || "");
          setProductHilight(product?.product_highlights || "");

          setValue("safety_information", product?.safety_information);
          setSafetyInformation(product.safety_information || "");
          setSpecialFeatures(product.special_features || "");
          setValue(
            "manufacturer_name_and_address_with_pincode",
            product?.manufacturer_name_and_address_with_pincode
          );

          setValue("tags", product?.tags?.split(","));
          setTags(product?.tags?.split(","));

          setValue("skin_type", product?.skin_type);
          setValue("hair_type", product?.hair_type);
          setValue("spf_type", product?.spf);
          setValue("size_chart_type", product?.size_chart_type);
          setValue("color", product?.colours);
          setValue("flavour", product?.flavours);
          setValue("protein_type", product?.protein_type);
          setValue("diaper_style", product?.diaper_style);
          setValue("formulation_type", product?.formulation);
          setValue("staging", product?.staging);
          setValue("mrp", product?.mrp);
          setValue("discount_in_percent", product?.discount_percent);
          setValue("discount_in_amount", product?.discount_amount);
          setValue("key_ingredients", product?.key_ingredients);
          setValue("other_ingredients", product?.other_ingredients);
          setValue("max_order_quantity", product?.max_order_quantity);
          setValue("min_order_quantity", product?.min_order_quantity);
          setValue("back_order_quantity", product?.back_order_quantity);
          setValue("meta_title", product?.meta_title);
          setValue("meta_description", product?.meta_description);
          setValue("expert_advice", product?.expert_advice);
          setValue("article_type", product?.article_type);
          let productImgArr = product?.product_image_array?.map((res) => {
            return res?.image;
          });
          setValue("product_image", productImgArr);
          setConcernsList(product?.product_concern_array);
          setPreferenceList(product?.product_preference_array);
          setValue("preference", product?.product_preference_array);
          setValue("concern", product?.product_concern_array);
          setValue("faqs_option", product?.product_faq_array);
          setFeedingTable(product?.feeding_table);
          setValue("feeding_table", product?.feeding_table);
          setValue("specifications", product?.accessories_specification);
          if (product?.size_chart) setValue("size_chart", product?.size_chart);
          setSizeChartImage(
            (product?.size_chart !== "null" && product?.size_chart) || null
          );
          setPreviewImages(
            product?.product_image_array?.map((res) => {
              return [res?.image];
            })
          );
          setUploadedImage(
            product?.product_image_array?.map((res) => {
              return res?.image;
            })
          );
          const subCategory = nestedCategories?.find(
            (item) => parseInt(item.id) === parseInt(product?.category_id)
          );
          if (subCategory) {
            setCategoryList(subCategory);
            const sub_subCategory = subCategory?.sub_categories?.find(
              (item) => parseInt(item.id) === parseInt(product?.sub_category_id)
            );
            if (sub_subCategory) {
              setSubCategoryList(sub_subCategory);
              const sub_sub_sub_Category =
                sub_subCategory?.sub_sub_categories?.find(
                  (item) =>
                    parseInt(item.id) === parseInt(product?.sub_sub_category_id)
                );
              if (sub_sub_sub_Category) {
                setSubSubCategoryList(sub_sub_sub_Category);
              }
            }
          }

          dispatch(fetchStandardSizeList(3326));
          if (!product) {
            navigate(pagePaths?.adminProductManagement);
          }
        } catch (error) {
          console.error("Error fetching product data:", error);
        }
      }
    };

    fetchProductData();
  }, [isEditPage, id, nestedCategories]);

  const buildUrl = () => {
    const slugs = [slug, categorySlug, subCategorySlug, subSubCategorySlug];
    // Filter out any null or empty slugs
    const validSlugs = slugs.filter((slug) => slug); // Keep only truthy values (non-empty strings)
    return `/shop/${validSlugs.join("/")}`; // Join remaining slugs
  };

  const [standerdSize, setStanderdSize] = useState();
  useEffect(() => {
    if (productData) {
      console.log(productData, "productData");
      setValue("sub_category_id", productData?.sub_category_id);
      setValue("sub_sub_category_id", productData?.sub_sub_category_id);
      setValue("sub_sub_sub_category_id", productData?.sub_sub_sub_category_id);
    }

    if (productData?.article_type) {
      dispatch(fetchStandardSizeList(productData?.article_type));
      setValue("standard_size", productData?.standard_size);
      setStanderdSize(productData?.standard_size);
    }
  }, [productData]);

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchProductsAdmin());
    // dispatch(fetchNestedCategories());
    dispatch(fetchConcerns());
    dispatch(fetchArticleType());
    dispatch(fetchPreferenceType());
  }, [isEditPage]);

  // const handleImageChange = (event) => {
  //     const selectedFiles = Array.from(event.target.files);
  //     setUploadedImage(prevSelectedFiles => [...prevSelectedFiles, ...selectedFiles])
  //     clearErrors('product_image')
  //     if (selectedFiles.length > 0) {
  //         const imageArray = selectedFiles.map(file => URL.createObjectURL(file));
  //         setPreviewImages(prevImages => [...prevImages, ...imageArray]);
  //     }
  // };

  // useEffect(() => {
  //     if (uploadedImage?.length > 0) {
  //         setValue('product_image', uploadedImage)
  //     }
  // }, [uploadedImage])

  // const handleRemoveImage = (index) => {
  //     const newPreviewImages = [...previewImages];
  //     const imgFile = [...uploadedImage]
  //     imgFile.splice(index, 1);
  //     setUploadedImage(imgFile)
  //     newPreviewImages.splice(index, 1);
  //     setPreviewImages(newPreviewImages);
  // };

  const handleImageChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setUploadedImage((prevSelectedFiles) => [
      ...prevSelectedFiles,
      ...selectedFiles,
    ]);
    clearErrors("product_image");

    if (selectedFiles.length > 0) {
      const imageArray = selectedFiles.map((file) => URL.createObjectURL(file));
      setPreviewImages((prevImages) => [...prevImages, ...imageArray]);
    }
  };

  useEffect(() => {
    if (uploadedImage.length > 0) {
      setValue("product_image", uploadedImage);
    }
  }, [uploadedImage, setValue]);

  const handleRemoveImage = (index) => {
    const newPreviewImages = [...previewImages];
    const newUploadedImages = [...uploadedImage];
    newUploadedImages.splice(index, 1);
    setUploadedImage(newUploadedImages);
    newPreviewImages.splice(index, 1);
    setPreviewImages(newPreviewImages);
  };

  const handleDragStart = (index) => (event) => {
    event.dataTransfer.setData("imageIndex", index);
  };

  const handleDrop = (index) => (event) => {
    const draggedIndex = event.dataTransfer.getData("imageIndex");
    const images = [...previewImages];

    // Reorder the images array
    const [draggedImage] = images.splice(draggedIndex, 1);
    images.splice(index, 0, draggedImage);

    // Update the previewImages state
    setPreviewImages(images);

    // Update the uploadedImage array to reflect the new order
    const uploadedImagesCopy = [...uploadedImage];
    const [draggedUploadedImage] = uploadedImagesCopy.splice(draggedIndex, 1);
    uploadedImagesCopy.splice(index, 0, draggedUploadedImage);
    setUploadedImage(uploadedImagesCopy);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleChangeSizeChart = (e) => {
    const SizeChartUrl = URL.createObjectURL(e?.target?.files[0]);
    setSizeChartImage(SizeChartUrl);
    setValue("size_chart", e?.target?.files);
  };

  const handleRemoveSizeChart = () => {
    setValue("size_chart", "");
    setSizeChartImage("");
  };

  const handleChangeCategory = (event) => {
    setValue("sub_category_id", "");
    setValue("sub_sub_category_id", "");
    setValue("sub_sub_sub_category_id", "");

    setCategory(event?.target?.value);
    const subCategory = nestedCategories?.find(
      (item) => parseInt(item.id) === parseInt(event?.target?.value)
    );
    setCategoryList(subCategory);
    setSubCategoryList({});
    setSubSubCategoryList({});
  };

  const handleChangeSubCategory = (event) => {
    setValue("sub_sub_category_id", "");
    setValue("sub_sub_sub_category_id", "");

    const sub_subCategory = categoryList?.sub_categories?.find(
      (item) => parseInt(item.id) === parseInt(event?.target?.value)
    );
    setSubCategoryList(sub_subCategory);
    setSubSubCategoryList({});
  };

  const handleChangeSubSubCategory = (event) => {
    setValue("sub_sub_sub_category_id", "");
    const sub_sub_sub_Category = subCategoryList?.sub_sub_categories?.find(
      (item) => parseInt(item.id) === parseInt(event?.target?.value)
    );
    setSubSubCategoryList(sub_sub_sub_Category);
  };
  const handleChangeSubSubSubCategory = (event) => {
    eventData = JSON.parse(event.target.value);
    const myData = {
      id: eventData?.id,
      code: eventData?.code,
      name: eventData?.name,
    };
    setCategoryItem((pre) => ({ ...pre, subSubSubCategory: myData }));
  };

  const onChangeArticleType = (e) => {
    dispatch(fetchStandardSizeList(e?.target?.value));
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
            <p className={styles.title}>Edit Products Details</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.formItems}>
            <Form.Group>
              <Form.Label htmlFor="vendor_article_name">
                Vendor article name<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="vendor_article_name"
                name=""
                {...register("vendor_article_name", {
                  required: "Vendor article name is required.",
                  onChange: (e) => {
                    const urlSlug = convertToUrlSlug(e?.target?.value || "");
                    setValue("url", urlSlug);
                  },
                })}
              />
              {errors?.vendor_article_name && (
                <small className="text-danger">
                  {errors?.vendor_article_name?.message}
                </small>
              )}
              {/* Show the generated URL link */}
              <Form.Text>
                <a
                  // href={buildUrl()} // Use the buildUrl function to generate the link
                  href={`/shop/${categorySlug}/${subCategorySlug}/${subSubCategorySlug}/${slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-info"
                >
                  Open Product Detail
                </a>
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="url">
                Url<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="url"
                name="url"
                {...register("url", { required: "Blog URL slug is required." })}
              />
              {errors?.url && (
                <small className="text-danger">{errors?.url?.message}</small>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="category_name">
                Category<span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                aria-label="Select Category"
                id="category_id"
                name="category_id"
                value={cateGory}
                {...register("category_id", {
                  required: "Category is required.",
                  onChange: (e) => {
                    handleChangeCategory(e);
                  },
                })}
              >
                <option value="">Select Category</option>
                {nestedCategories?.map((value, key) => (
                  <option key={key} value={value?.id}>
                    {value?.name}
                  </option>
                ))}
              </Form.Select>
              {errors?.category_id && (
                <small className="text-danger">
                  {errors?.category_id?.message}
                </small>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="sub_category">Sub Category</Form.Label>
              <Form.Select
                aria-label="Select Category"
                id="sub_category_id"
                name="sub_category_id"
                {...register("sub_category_id", {
                  onChange: (e) => {
                    handleChangeSubCategory(e);
                  },
                })}
              >
                <option value="">Select Sub Category</option>
                {categoryList?.sub_categories?.length > 0 &&
                  categoryList?.sub_categories?.map((value, key) => {
                    return (
                      <option key={key} value={value?.id}>
                        {value?.name}
                      </option>
                    );
                  })}
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="sub_sub_category">
                Sub Sub Category
              </Form.Label>
              <Form.Select
                aria-label="Select Category"
                id="sub_sub_category_id"
                name="sub_sub_category_id"
                {...register("sub_sub_category_id", {
                  onChange: (e) => {
                    handleChangeSubSubCategory(e);
                  },
                })}
              >
                <option value="">Select Sub Sub Category</option>
                {subCategoryList?.sub_sub_categories?.length > 0 &&
                  subCategoryList?.sub_sub_categories?.map((value, key) => {
                    return (
                      <option key={key} value={value?.id}>
                        {value?.name}
                      </option>
                    );
                  })}
              </Form.Select>
            </Form.Group>

            {/* <Form.Group>
                            <Form.Label htmlFor="sub_sub_sub_category">Sub Sub Sub Category</Form.Label>
                            <Form.Select
                                aria-label="Select Category"
                                id="sub_sub_sub_category_id"
                                name="sub_sub_sub_category_id"

                                {...register('sub_sub_sub_category_id',)}

                            >
                                <option value=''>Select Sub Sub Sub Category</option>
                                {subSubCategoryList?.sub_sub_sub_categories && subSubCategoryList?.sub_sub_sub_categories?.map((value, key) => {
                                    return (
                                        <option key={key} value={value?.id}>
                                            {value?.name}
                                        </option>
                                    );
                                })}
                            </Form.Select>

                        </Form.Group> */}

            <Form.Group>
              <Form.Label htmlFor="vendor_sku_code">
                Vendor SKU<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="vendor_sku_code"
                name="vendor_sku_code"
                {...register("vendor_sku_code", {
                  required: "Cureka SKU is required.",
                  pattern: {
                    value: /^[A-Z0-9a-z/]+$/,
                    message:
                      "Allow only Upper-case Alphabet, / and numbers only.",
                  },
                })}
              />
              {errors?.vendor_sku_code && (
                <small className="text-danger">
                  {errors?.vendor_sku_code?.message}
                </small>
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
                {...register("brand", { required: "Brand is required." })}
              >
                <option value="">Select Brand</option>
                {brands?.map((value, key) => (
                  <option key={key} value={value?.id}>
                    {value?.name}
                  </option>
                ))}
              </Form.Select>
              {errors?.brand && (
                <small className="text-danger">{errors?.brand?.message}</small>
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
                {...register("manufacturer_name_and_address_with_pincode", {
                  required: "Manufacturer name and address is required.",
                })}
              />
              {errors?.manufacturer_name_and_address_with_pincode && (
                <small className="text-danger">
                  {errors?.manufacturer_name_and_address_with_pincode?.message}
                </small>
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
                {...register("packer_name_and_address_with_pincode", {
                  required: "Packer name and address is required.",
                })}
              />
              {errors?.packer_name_and_address_with_pincode && (
                <small className="text-danger">
                  {errors?.packer_name_and_address_with_pincode?.message}
                </small>
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
                {...register("importer_name_and_address_with_pincode")}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="country_of_origin">
                Country of origin<span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                aria-label="Select country of origin"
                id="country_of_origin"
                name="country_of_origin"
                {...register("country_of_origin", {
                  required: "Country of origin is required.",
                })}
              >
                <option value="">Select country of origin</option>
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
              {errors?.country_of_origin && (
                <small className="text-danger">
                  {errors?.country_of_origin?.message}
                </small>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="weight_kg">
                Weight (kg)<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="weight_kg"
                name="weight_kg"
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                // value={formik.values?.weight_kg}
                {...register("weight_kg", { required: "Weight is required." })}
              />
              {errors?.weight_kg && (
                <small className="text-danger">
                  {errors?.weight_kg?.message}
                </small>
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
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                // value={formik.values?.dimensions_cm}
                {...register("dimensions_cm", {
                  required: "Dimensions is required.",
                })}
              />
              {errors?.dimensions_cm && (
                <small className="text-danger">
                  {errors?.dimensions_cm?.message}
                </small>
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
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                // value={formik.values?.components}
                {...register("components", {
                  required: "Components is required.",
                })}
              />
              {errors?.components && (
                <small className="text-danger">
                  {errors?.components?.message}
                </small>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="expires_in_days">
                Expires in (Enter number of days){" "}
                <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                id="expires_in_days"
                name="expires_in_days"
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                // value={formik.values?.expires_in_days}
                {...register("expires_in_days", {
                  required: "Expires in days required.",
                })}
              />
              {errors?.expires_in_days && (
                <small className="text-danger">
                  {errors?.expires_in_days?.message}
                </small>
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
                {...register("article_type", {
                  required: "Article type is required.",
                  onChange: (e) => {
                    onChangeArticleType(e);
                  },
                })}
              >
                <option value="">Select article type</option>
                {articleType?.results?.map((value, key) => (
                  <option key={key} value={value?.id}>
                    {value?.name}
                  </option>
                ))}
              </Form.Select>
              {errors?.article_type && (
                <small className="text-danger">
                  {errors?.article_type?.message}
                </small>
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
                value={standerdSize}
                {...register("standard_size", {
                  required: "Standard size is required.",
                  onChange: (e) => {
                    setStanderdSize(e?.target?.value);
                  },
                })}
              >
                <option value="">Select standard size</option>
                {standardSizeList?.results?.map((value, key) => (
                  <option key={key} value={value?.id}>
                    {value?.name}
                  </option>
                ))}
              </Form.Select>

              {errors?.standard_size && (
                <small className="text-danger">
                  {errors?.standard_size?.message}
                </small>
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
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                // value={formik.values?.brand_size}
                {...register("brand_size", {
                  required: "Brand size is required.",
                })}
              />
              {errors?.brand_size && (
                <small className="text-danger">
                  {errors?.brand_size?.message}
                </small>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="hsn">
                HSN<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="hsn"
                name="hsn"
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                // value={formik.values?.hsn}
                {...register("hsn", { required: "HSN size is required." })}
              />
              {errors?.hsn && (
                <small className="text-danger">{errors?.hsn?.message}</small>
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
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                // value={formik.values?.sku_code}
                {...register("sku_code", { required: "SKU code is required." })}
              />
              {errors?.sku_code && (
                <small className="text-danger">
                  {errors?.sku_code?.message}
                </small>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="age_group">Age group</Form.Label>
              <Form.Control
                type="text"
                id="age_group"
                name="age_group"
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                // value={formik.values?.age_group}
                {...register("age_group")}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="min_age_years">
                Min age (Years)<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="min_age_years"
                name="min_age_years"
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                // value={formik.values?.min_age_years}
                {...register("min_age_years", {
                  required: "Min age is required.",
                })}
              />
              {errors?.min_age_years && (
                <small className="text-danger">
                  {errors?.min_age_years?.message}
                </small>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="max_age_years">
                Max age (Years)<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="max_age_years"
                name="max_age_years"
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                // value={formik.values?.max_age_years}
                {...register("max_age_years", {
                  required: "Max age is required.",
                })}
              />
              {errors?.max_age_years && (
                <small className="text-danger">
                  {errors?.max_age_years?.message}
                </small>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="directions_of_use">
                Directions of use<span className="text-danger">*</span>
              </Form.Label>
              <RichtextEditor
                id="directions_of_use"
                value={directionOfUse || ""}
                onChange={(value) => {
                  setValue("directions_of_use", value);
                  setDirectionOfUse(value);
                }}
                register={register("directions_of_use", {
                  required: "Direction of use is required.",
                })}
              />
              {errors?.directions_of_use && (
                <small className="text-danger">
                  {errors?.directions_of_use?.message}
                </small>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="description">
                Description<span className="text-danger">*</span>
              </Form.Label>
              <RichtextEditor
                id="description"
                value={description || ""}
                onChange={(value) => {
                  setValue("description", value);
                  setDescription(value);
                }}
                register={register("description", {
                  required: "Description is required.",
                })}
              />
              {errors?.description && (
                <small className="text-danger">
                  {errors?.description?.message}
                </small>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="product_benefits">
                Product benefits
              </Form.Label>
              <RichtextEditor
                id="product_benefits"
                value={productBenefit || ""}
                onChange={(value) => {
                  setValue("product_benefits", value);
                  setProductBenefit(value);
                }}
                // register={register('product_benefits', { required: 'Product highlights is required.', })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="product_highlights">
                Product highlights<span className="text-danger">*</span>
              </Form.Label>
              <RichtextEditor
                id="product_highlights"
                onChange={(value) => {
                  setValue("product_highlights", value);
                  setProductHilight(value);
                }}
                value={productHilight || ""}
                register={register("product_highlights", {
                  required: "Product highlights is required.",
                })}
              />
              {errors?.product_highlights && (
                <small className="text-danger">
                  {errors?.product_highlights?.message}
                </small>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="safety_information">
                Safety information<span className="text-danger">*</span>
              </Form.Label>
              <RichtextEditor
                id="safety_information"
                onChange={(value) => {
                  setValue("safety_information", value);
                  setSafetyInformation(value);
                }}
                value={safetyInformation || ""}
                register={register("safety_information", {
                  required: "Safety information is required.",
                })}
              />
              {errors?.safety_information && (
                <small className="text-danger">
                  {errors?.safety_information?.message}
                </small>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="special_features">
                Special features
              </Form.Label>
              <RichtextEditor
                id="special_features"
                value={specialFeatures || ""}
                onChange={(value) => {
                  setValue("special_features", value);
                  setSpecialFeatures(value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="tags">
                Tags<span className="text-danger">*</span>
              </Form.Label>
              <div className="tags-input">
                <ul id="tags">
                  {tags?.map((tag, index) => (
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
                  onKeyUp={handleKeyUp}
                  placeholder="Press shift to update tags"
                  // {...register('tags', { required: 'Tags are required.', })}
                />
                {errors?.tags && (
                  <small className="text-danger">{errors?.tags?.message}</small>
                )}
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="mrp">
                MRP<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="mrp"
                name="mrp"
                {...register("mrp", { required: "MRP is required." })}
              />
              {errors?.mrp && (
                <small className="text-danger">{errors?.mrp?.message}</small>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="discount_in_percent">
                Discount in percent
              </Form.Label>
              <Form.Control
                type="text"
                id="discount_in_percent"
                name="discount_in_percent"
                {...register("discount_in_percent")}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="discount_in_amount">
                Discount in amount
              </Form.Label>
              <Form.Control
                type="text"
                id="discount_in_amount"
                name="discount_in_amount"
                {...register("discount_in_amount")}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="key_ingredients">Key Ingredients</Form.Label>
              <Form.Control
                type="text"
                id="key_ingredients"
                name="key_ingredients"
                {...register("key_ingredients")}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="other_ingredients">
                Other Ingredients
              </Form.Label>
              <Form.Control
                type="text"
                id="other_ingredients"
                name="other_ingredients"
                {...register("other_ingredients")}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="min_order_quantity">
                Min order Quantity
              </Form.Label>
              <Form.Control
                type="text"
                id="min_order_quantity"
                name="min_order_quantity"
                {...register("min_order_quantity")}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="max_order_quantity">
                Max order Quantity
              </Form.Label>
              <Form.Control
                type="text"
                id="max_order_quantity"
                name="max_order_quantity"
                {...register("max_order_quantity")}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="back_order_quantity">
                Back order quantity
              </Form.Label>
              <Form.Control
                type="text"
                id="back_order_quantity"
                name="back_order_quantity"
                {...register("back_order_quantity")}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="meta_title">Meta title</Form.Label>
              <Form.Control
                type="text"
                id="meta_title"
                name="meta_title"
                {...register("meta_title")}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="meta_description">
                Meta description
              </Form.Label>
              <Form.Control
                type="text"
                id="meta_description"
                name="meta_description"
                {...register("meta_description")}
              />
            </Form.Group>

            {/* {console.log(faqs_option)} */}
            <Form.Group>
              <div>
                <Form.Label htmlFor="faqs_option">
                  FAQS option<span className="text-danger">*</span>
                </Form.Label>
              </div>
              {fields.map((item, index) => (
                <>
                  <div
                    key={item.id}
                    className="contents"
                    style={{ display: "contents" }}
                  >
                    <p>Question</p>
                    <Form.Control
                      type="text"
                      name={`faqs_option[${index}].faq`}
                      // defaultValue={item.question}
                      {...register(`faqs_option[${index}].faq`)}
                    />
                    <p>Answer</p>
                    <Form.Control
                      type="text"
                      name={`faqs_option[${index}].faq_a`}
                      // defaultValue={item.answer}
                      {...register(`faqs_option[${index}].faq_a`)}
                    />
                    <Button
                      type="button"
                      onClick={() => remove(index)}
                      className="my-3"
                      style={{
                        fontSize: "12px",
                        backgroundColor: "red",
                        borderColor: "red",
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </>
              ))}
              <Button
                type="button"
                onClick={handleAppend}
                className="mx-2 my-3"
                style={{ fontSize: "12px" }}
              >
                Add Faq
              </Button>

              {errors.faqs_option && (
                <small className="text-danger">
                  {errors.faqs_option.message}
                </small>
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
                      console.log("videoUrl", videoUrl);
                      videoArray.push(videoUrl);
                    });
                    setPreviewVideo([...videoArray]);
                    setValue("product_video", event?.currentTarget?.files);
                  } else {
                    setPreviewVideo(null);
                  }
                }}
              />
            </Form.Group>
            <div className="d-flex justify-content-start">
              {previewVideo?.length > 0 &&
                previewVideo[0] !== "null" &&
                previewVideo?.map((val, ind) => (
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

            {/* <Form.Group>
                            <Form.Label htmlFor="product_image">Product images<span className="text-danger">*</span></Form.Label>
                            {previewImages?.length < 5 && <Form.Control
                                type="file"
                                id="product_image"
                                onChange={handleImageChange}
                                name="product_image"
                                multiple
                                accept="image/*"
                            />}
                            {errors.product_image && <small className="text-danger">{errors.product_image.message}</small>}
                        </Form.Group>

                        <div className="d-flex justify-content-start">
                            {previewImages.map((imageUrl, index) => (
                                <div key={index} className="mr-2" style={{ position: 'relative', border: '1px solid #000', borderRadius: '7px' }}>
                                    <img src={imageUrl} style={{ maxWidth: "200px", maxHeight: "100%", borderRadius: '7px', overflow: 'hidden' }} alt={`Preview ${index + 1}`} />
                                    <span onClick={() => handleRemoveImage(index)} style={{ position: 'absolute', right: 10, top: 10 }}>
                                        <i className="fas fa-times" style={{ fontSize: '18px', background: '#757575', borderRadius: '50%', color: '#fff', padding: '5px', cursor: 'pointer' }} />
                                    </span>
                                </div>
                            ))}
                        </div> */}
            <Form.Group>
              <Form.Label htmlFor="product_image">
                Product Images<span className="text-danger">*</span>
              </Form.Label>
              {previewImages.length < 5 && (
                <Form.Control
                  type="file"
                  id="product_image"
                  onChange={handleImageChange}
                  name="product_image"
                  multiple
                  accept="image/*"
                />
              )}
              {errors.product_image && (
                <small className="text-danger">
                  {errors.product_image.message}
                </small>
              )}

              <div className="d-flex justify-content-start mt-2">
                {previewImages.map((imageUrl, index) => (
                  <div
                    key={index}
                    className="mr-2"
                    style={{
                      position: "relative",
                      border: "1px solid #000",
                      borderRadius: "7px",
                    }}
                    draggable
                    onDragStart={handleDragStart(index)}
                    onDrop={handleDrop(index)}
                    onDragOver={handleDragOver}
                  >
                    <img
                      src={imageUrl}
                      style={{
                        maxWidth: "200px",
                        maxHeight: "100%",
                        borderRadius: "7px",
                        overflow: "hidden",
                      }}
                      alt={`Preview ${index + 1}`}
                    />
                    <span
                      onClick={() => handleRemoveImage(index)}
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
                ))}
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="skin_type">Skin Type</Form.Label>
              <Form.Select
                aria-label="Select Category"
                id="skin_type"
                name="skin_type"
                value={cateGory}
                {...register("skin_type")}
              >
                <option value="">Select Skin Type</option>
                {["Normal", "Oily", "Dry", "Sensitive", "Combination"]?.map(
                  (value, key) => (
                    <option key={key} value={value}>
                      {value}
                    </option>
                  )
                )}
              </Form.Select>
              {errors?.skin_type && (
                <small className="text-danger">
                  {errors?.skin_type?.message}
                </small>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="hair_type">Hair Type</Form.Label>
              <Form.Select
                aria-label="Select Category"
                id="hair_type"
                name="hair_type"
                value={cateGory}
                {...register("hair_type")}
              >
                <option value="">Select Hair Type</option>
                {["Dry", "Frizzy", "Curly", "Normal", "Coloured Hair"]?.map(
                  (value, key) => (
                    <option key={key} value={value}>
                      {value}
                    </option>
                  )
                )}
              </Form.Select>
              {errors?.hair_type && (
                <small className="text-danger">
                  {errors?.hair_type?.message}
                </small>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="spf_type">SPF Type</Form.Label>
              <Form.Select
                aria-label="Select Category"
                id="spf_type"
                name="spf_type"
                {...register("spf_type")}
              >
                <option value="">Select SPF Type</option>
                {["< 15", "15 - 20", "20 - 50", "Above 50"]?.map(
                  (value, key) => (
                    <option key={key} value={value}>
                      {value}
                    </option>
                  )
                )}
              </Form.Select>
              {errors?.spf_type && (
                <small className="text-danger">
                  {errors?.spf_type?.message}
                </small>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="size_chart_type">Size Chart Type</Form.Label>
              <Form.Select
                aria-label="Select Category"
                id="size_chart_type"
                name="size_chart_type"
                {...register("size_chart_type")}
              >
                <option value="">Select Size Chart Type</option>
                {["CH", "S", "M", "L", "XL", "XXL", "XXL", "Uni", "Spl"]?.map(
                  (value, key) => (
                    <option key={key} value={value}>
                      {value}
                    </option>
                  )
                )}
              </Form.Select>
              {errors?.size_chart_type && (
                <small className="text-danger">
                  {errors?.size_chart_type?.message}
                </small>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="color">Color</Form.Label>
              <Form.Select
                aria-label="Select Category"
                id="color"
                name="color"
                {...register("color")}
              >
                <option value="">Select Color</option>
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
                ]?.map((value, key) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              </Form.Select>
              {errors?.color && (
                <small className="text-danger">{errors?.color?.message}</small>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="flavour">Flavour</Form.Label>
              <Form.Select
                aria-label="Select Category"
                id="flavour"
                name="flavour"
                {...register("flavour")}
              >
                <option value="">Select Flavour</option>
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
                ]?.map((value, key) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              </Form.Select>
              {errors?.flavour && (
                <small className="text-danger">
                  {errors?.flavour?.message}
                </small>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="protein_type">Protein Type</Form.Label>
              <Form.Select
                aria-label="Select Category"
                id="protein_type"
                name="protein_type"
                {...register("protein_type")}
              >
                <option value="">Select Protein Type</option>
                {[
                  "Whey Protein",
                  "Casein Protein",
                  "Soy Protein",
                  "Vegan Protein",
                ]?.map((value, key) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              </Form.Select>
              {errors?.protein_type && (
                <small className="text-danger">
                  {errors?.protein_type?.message}
                </small>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="diaper_style">Diaper Style</Form.Label>
              <Form.Select
                aria-label="Select Category"
                id="diaper_style"
                name="diaper_style"
                {...register("diaper_style")}
              >
                <option value="">Select Diaper Style</option>
                {["Pant Style", "Tape Style"]?.map((value, key) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              </Form.Select>
              {errors?.diaper_style && (
                <small className="text-danger">
                  {errors?.diaper_style?.message}
                </small>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="diaper_style">Formulation Type</Form.Label>
              <Form.Select
                aria-label="Select Category"
                id="formulation_type"
                name="formulation_type"
                {...register("formulation_type")}
              >
                <option value="">Select Formulation Type</option>
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
                ]?.map((value, key) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              </Form.Select>
              {errors?.formulation_type && (
                <small className="text-danger">
                  {errors?.formulation_type?.message}
                </small>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="staging">Staging</Form.Label>
              <Form.Select
                aria-label="Select Category"
                id="staging"
                name="staging"
                {...register("staging")}
              >
                <option value="">Select Staging</option>
                {["Stage 1", "Stage 2", "Stage 3", "Stage 4"]?.map(
                  (value, key) => (
                    <option key={key} value={value}>
                      {value}
                    </option>
                  )
                )}
              </Form.Select>
              {errors?.staging && (
                <small className="text-danger">
                  {errors?.staging?.message}
                </small>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="checkout">Checkout</Form.Label>
              <Form.Select
                aria-label="Select Checkout"
                id="checkout"
                name="checkout"
                {...register("checkout")}
              >
                <option value="">Select Checkout</option>
                {["NO", "LMB", "YML"]?.map((value, key) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              </Form.Select>
              {errors?.checkout && (
                <small className="text-danger">
                  {errors?.checkout?.message}
                </small>
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
                {...register("status", { required: "Status is required." })}
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
              {errors?.status && (
                <small className="text-danger">{errors?.status?.message}</small>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="stock_status">Stock status</Form.Label>
              <Form.Select
                aria-label="Select stock status"
                id="stock_status"
                name="stock_status"
                {...register("stock_status")}
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
              {errors?.stock_status && (
                <small className="text-danger">
                  {errors?.stock_status?.message}
                </small>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="show_stock">Show Stock?</Form.Label>
              <Form.Select
                aria-label="Select Show Stock "
                id="show_stock"
                name="show_stock"
                {...register("show_stock")}
              >
                <option disabled>Select Show Stock status</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </Form.Select>
              {errors?.show_stock && (
                <small className="text-danger">
                  {errors?.show_stock?.message}
                </small>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="new_arrival">Is New Arrival?</Form.Label>
              <Form.Select
                aria-label="Select New Arrival"
                id="new_arrival"
                name="new_arrival"
                {...register("new_arrival")}
              >
                <option disabled>Select New Arrival status</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </Form.Select>
              {errors?.new_arrival && (
                <small className="text-danger">
                  {errors?.new_arrival?.message}
                </small>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="top_picks">Is Top Pick?</Form.Label>
              <Form.Select
                aria-label="Select Top Pick"
                id="top_picks"
                name="top_picks"
                {...register("top_picks")}
              >
                <option disabled>Select Top Pick status</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </Form.Select>
              {errors?.top_picks && (
                <small className="text-danger">
                  {errors?.top_picks?.message}
                </small>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="ranking">Sort Order</Form.Label>
              <Form.Control
                type="number"
                id="ranking"
                min="0"
                name="ranking"
                {...register("ranking")}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="ranking">New Arrival Order</Form.Label>
              <Form.Control
                type="number"
                min="0"
                id="newarrival_ranking"
                name="newarrival_ranking"
                {...register("newarrival_ranking")}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="ranking">Top Picks Order</Form.Label>
              <Form.Control
                type="number"
                min="0"
                id="toppics_ranking"
                name="toppics_ranking"
                {...register("toppics_ranking")}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="expert_advice">Expert advice</Form.Label>
              <Form.Control
                type="text"
                id="expert_advice"
                name="expert_advice"
                {...register("expert_advice")}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="specifications">
                Accessories/specifications
              </Form.Label>
              <Form.Control
                type="text"
                id="specifications"
                name="specifications"
                {...register("specifications", {
                  required: "Specifications is required.",
                })}
              />
            </Form.Group>
            {errors?.specifications && (
              <small className="text-danger">
                {errors?.specifications?.message}
              </small>
            )}

            <Form.Group>
              <Form.Label htmlFor="feeding_table">Feeding table</Form.Label>
              <RichtextEditor
                id="feeding_table"
                onChange={(value) => {
                  setValue("feeding_table", value);
                  setFeedingTable(value);
                }}
                value={feedingTable || ""}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="size_chart">Size Chart</Form.Label>
              <Form.Control
                type="file"
                // id="size_chart"
                // name="size_chart"
                // multiple
                accept="image/*"
                onChange={handleChangeSizeChart}
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
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AdminCreateBrandsPage;
