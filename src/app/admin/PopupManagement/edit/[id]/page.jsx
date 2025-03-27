"use client";
import { useEffect, useMemo, useState } from "react";
import Form from "react-bootstrap/Form";
import Card from "../../../../../components/Card";
import AdminBreadcrumbs from "../../../../../components/admin/AdminBreadcrumbs";
import { pagePaths } from "../../../../../utils/constants/constant";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  fetchNestedCategories,
  fetchConcerns,
  fetchProductsOptions,
  fetchBrands,
} from "../../../../../redux/action";
import toast from "react-hot-toast";
import Button from "react-bootstrap/Button";
import { MultiSelect } from "react-multi-select-component";
import { uploadImage } from "../../../../../lib/services/file-upload";
import { useParams } from "next/navigation";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { env } from "../../../../../config/env.config";
import { FixedSizeList as List } from "react-window";

const AdminEditPopupPage = () => {
  const { productOptions, concerns, brands } = useSelector(
    (state) => state.admin
  );
  const { nestedCategories } = useSelector((state) => state.customer);
  const [previewImage, setPreviewImage] = useState(null);
  const [image, setImage] = useState("");
  const [editImage, SetEditImage] = useState("");
  const [name, setName] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [couponValu, setCouponValue] = useState("");
  const [count, setCount] = useState();
  const [timeLag, setTimeLag] = useState();
  const [status, setStatus] = useState();
  const [activecouponeList, setActiveCouponeList] = useState([]);
  const [couponsList, setCouponList] = useState({});
  const [page, setPage] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [concernsList, setConcernsList] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [couponData, setCouponData] = useState();
  const [categoryData, setCategoryData] = useState();
  const [concernsData, setConcernsData] = useState();
  const [productData, setProductData] = useState();
  const [brandData, setBrandData] = useState();
  const { isLoggedIn, adminEmail } = useSelector((state) => state.auth);
  const navigate = useRouter();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchNestedCategories());
    dispatch(fetchConcerns());
    dispatch(fetchProductsOptions());
    dispatch(fetchBrands());
    const fetchDataActiveCoupons = async () => {
      try {
        const response = await axios.get(
          `${env.REACT_SERVER_BASE_URL}/coupons/getAllActiveCoupons`
        );
        setActiveCouponeList(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state or notify user
      }
    };
    fetchDataActiveCoupons();
    const fetchEditData = async () => {
      try {
        const response = await axios.get(
          `${env.REACT_SERVER_BASE_URL}/popup/getPopup/${id}`
        );
        const result = response && response.data && response.data.results[0];
        setPreviewImage(result.image);
        setName(result.name);
        setImageLink(result.link);
        setCount(result.count_down);
        setStatus(result.status);
        setPage(result.page_type);
        SetEditImage(result.image);
        setTimeLag(result.time_lag);
        // setImage(result.image)
        //get coupon
        setCouponData(result.coupon_code);
        setBrandData(result && result.brand);
        setConcernsData(result && result.concern);
        setCategoryData(result && result.category);
        setProductData(result && result.product_id);
        setCouponValue(result && result.coupon_code);

        //get category
        const filterCategoryIds = result.category;
        const filteredCategory = nestedCategories.filter((cat) =>
          filterCategoryIds.includes(cat.id)
        );
        const cData = filteredCategory.map((dataObject) => ({
          value: dataObject.id,
          label: dataObject.name,
        }));
        setCategoryList(cData);

        //get concerns
        const filterConcernsIds = result.concern;
        const filteredConcerns = concerns.filter((con) =>
          filterConcernsIds.includes(con.id)
        );
        const conData = filteredConcerns.map((dataObject) => ({
          value: dataObject.id,
          label: dataObject.name,
        }));
        setConcernsList(conData);

        //get brands
        const filterBrandsIds = result.brand;
        const filteredBrands = brands.filter((brands) =>
          filterBrandsIds.includes(brands.id)
        );
        const brandData = filteredBrands.map((dataObject) => ({
          value: dataObject.id,
          label: dataObject.name,
        }));
        setBrandList(brandData);

        //get products
        const filterProductIds = result.product_id;
        console.log(filterProductIds, "filterProductIds");
        // const filteredProducts = productOptions.filter(product => filterProductIds.includes(product.product_id));
        // const proData = filteredProducts.map((dataObject) => ({
        //   value: dataObject.product_id,
        //   label: dataObject.vendor_article_name,
        // }))
        // setProductsList(proData);
        // const filteredProducts = productOptions.filter(product =>
        //   filterProductIds.includes(product.value)
        // );
        // console.log(filteredProducts,'filteredProducts')

        // const proData = new Set(filteredProducts.map(dataObject => dataObject.value));
        // setSelectedProducts(proData);
        loadProductData(result.product_id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchEditData();
  }, [dispatch]);
  // Function to load product data from a comma-separated string
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
  //get couponlist

  const activeCouponsOptions = (opt) => {
    return opt.map((dataObject) => ({
      value: dataObject.id,
      label: dataObject.coupon_code,
    }));
  };

  const couponOptions = useMemo(() => {
    const filterCoupons = couponValu;
    const filteredCoupons = activecouponeList.find(
      (coupon) => coupon.coupon_code == filterCoupons
    );
    setCouponList(filteredCoupons && filteredCoupons.id);
    return activeCouponsOptions(activecouponeList);
  }, [activecouponeList]);

  //categories
  const categoriesOptions = (opt) => {
    return opt.map((dataObject) => ({
      value: dataObject.id,
      label: dataObject.name,
    }));
  };

  const categoryOptions = useMemo(() => {
    return categoriesOptions(nestedCategories);
  }, [nestedCategories]);

  //concerns
  const parseOptions = (opt) => {
    return opt.map((dataObject) => ({
      value: dataObject.id,
      label: dataObject.name,
    }));
  };

  const concernOptions = useMemo(() => {
    return parseOptions(concerns);
  }, [concerns]);

  //brand
  const parseBrandOptions = (opt) => {
    return opt.map((dataObject) => ({
      value: dataObject.id,
      label: dataObject.name,
    }));
  };

  const optionBrand = useMemo(() => {
    return parseBrandOptions(brands);
  }, [brands]);

  //product list
  const maskProductOptions = (opt) => {
    return opt.map((dataObject) => ({
      value: dataObject.product_id,
      label: dataObject.vendor_article_name,
    }));
  };

  //product list
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

  const handleProductChange = (option) => {
    setSelectedProducts((prev) => {
      const updated = new Set(prev);
      updated.has(option.value)
        ? updated.delete(option.value)
        : updated.add(option.value);
      return updated;
    });
  };

  // console.log(selectedProducts, 'selectedProducts', Array.from(selectedProducts).join(','))
  const handleName = (event) => {
    setName(event.target.value);
  };
  const handleImageLink = (event) => {
    setImageLink(event.target.value);
  };
  const handleCount = (event) => {
    setCount(event.target.value);
  };
  const handleStatus = (event) => {
    setStatus(event.target.value);
  };
  const handlePage = (event) => {
    setPage(event.target.value);
  };
  const handleTimeLag = (event) => {
    setTimeLag(event.target.value);
  };
  // on change products
  const onChangeCoupons = (event) => {
    const data = activecouponeList.find(
      (item) => item.id == event.target.value
    );
    setCouponData(data && data.coupon_code);
    setCouponList(event.target.value);
  };
  // console.log(couponsList, 'couponsList')
  // on change products
  const onChangeProducts = (newSelected) => {
    const data = newSelected.map((obj) => obj.value);
    const idsString = data.join(",");
    setProductData(idsString);
    setProductsList(newSelected);
  };
  //on change categories
  const onChangeCategory = (newSelected) => {
    const data = newSelected.map((obj) => obj.value);
    const idsString = data.join(",");
    setCategoryData(idsString);
    setCategoryList(newSelected);
  };
  // on change concerns
  const onChangeConcerns = (newSelected) => {
    const data = newSelected.map((obj) => obj.value);
    const idsString = data.join(",");
    setConcernsData(idsString);
    setConcernsList(newSelected);
  };
  // on Brand change
  const onChangebrand = (newSelected) => {
    const data = newSelected.map((obj) => obj.value);
    const idsString = data.join(",");
    setBrandData(idsString);
    setBrandList(newSelected);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    let formData = {};
    let fileUrl = "";
    if (image) {
      const uploadData = await uploadImage(
        image,
        "ratingAndReviews",
        (uploadProgress) => {
          console.log({ uploadProgress });
          console.log(image, "image true");
        }
      );
      fileUrl = uploadData.fileUrl;
      formData = {
        name: name,
        image: fileUrl,
        link: imageLink,
        coupon_code: couponData,
        // product_id: productData,
        product_id: Array.from(selectedProducts).join(","),
        category: categoryData,
        brand: brandData,
        concern: concernsData,
        time_lag: timeLag,
        count_down: count,
        page_type: page,
        updated_by: adminEmail,
        status: status,
      };
    } else {
      fileUrl = editImage;
      console.log(editImage, "editImage");
      formData = {
        name: name,
        image: editImage,
        link: imageLink,
        coupon_code: couponData,
        // product_id: productData,
        product_id: Array.from(selectedProducts).join(","),
        category: categoryData,
        brand: brandData,
        concern: concernsData,
        time_lag: timeLag,
        count_down: count,
        page_type: page,
        updated_by: adminEmail,
        status: status,
      };
    }
    console.log(formData, "formData");
    // return;
    try {
      const response = await axios.put(
        `${env.REACT_SERVER_BASE_URL}/popup/editPopup/${id}`,
        formData
      );
      let data = response.data;
      if (data) {
        toast.success("Popup Updated Successfully");
      }
      navigate.push(pagePaths.adminPopupManagement);
    } catch (error) {
      // console.error('Popup error:', error);
      // toast.error('Something went to wrong');
      const edata = error.response.data;
      toast.error(edata && edata.error);
    }
  };

  return (
    <div className={styles.container}>
      <AdminBreadcrumbs
        items={[
          {
            path: pagePaths.adminPopupManagement,
            label: "Popup Management",
          },
          {
            // path: pagePaths.adminPopupManagementEdit,
            label: "Edit Popup",
          },
        ]}
      />
      <div>
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <p className={styles.title}>Add Popup</p>
          </div>
          <Form onSubmit={handleSubmit} className={styles.formItems}>
            <Form.Group>
              <Form.Label>
                Popup Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleName}
              />
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
                  setImage(selectedFile);
                  if (selectedFile) {
                    const imageUrl = URL.createObjectURL(selectedFile);
                    setPreviewImage(imageUrl);
                  } else {
                    setPreviewImage(null);
                  }
                }}
              />
            </Form.Group>
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                style={{ maxWidth: "200px", maxHeight: "100%" }}
              />
            )}
            <Form.Group>
              <Form.Label>
                Image Link <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="imageLink"
                name="imageLink"
                value={imageLink}
                onChange={handleImageLink}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Count Down <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                value={count}
                onChange={handleCount}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Time Lag <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                value={timeLag}
                onChange={handleTimeLag}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Coupons<span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                name="coupon"
                onChange={onChangeCoupons}
                value={couponsList}
              >
                <option value="selectValue">Select </option>

                {couponOptions.length > 0 &&
                  couponOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="concerns">Category</Form.Label>
              {categoryOptions?.length > 0 && (
                <MultiSelect
                  value={categoryList}
                  options={categoryOptions}
                  onChange={onChangeCategory}
                />
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
              <Form.Label htmlFor="concerns">Brands</Form.Label>
              {optionBrand?.length > 0 && (
                <MultiSelect
                  value={brandList}
                  options={optionBrand}
                  onChange={onChangebrand}
                />
              )}
            </Form.Group>
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
              <Form.Label>
                Status<span className="text-danger">*</span>
              </Form.Label>
              <Form.Select name="status" onChange={handleStatus} value={status}>
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="In-Active">In-Active</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Page Type<span className="text-danger">*</span>
              </Form.Label>
              <Form.Select name="page" onChange={handlePage} value={page}>
                <option value="">Select Page</option>
                <option value="HOME">Home Page</option>
                <option value="CART">Cart Page</option>
              </Form.Select>
            </Form.Group>
            <Button
              type="submit"
              className={styles.submitButton}
              variant="primary"
            >
              Submit
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default AdminEditPopupPage;
