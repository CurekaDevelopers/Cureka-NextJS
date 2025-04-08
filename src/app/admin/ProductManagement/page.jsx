"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";
import Card from "../../../components/Card";
import ConfirmationModel from "../../../components/ConfirmationModel";
import DeleteButton from "../../../components/DeleteButton/index";
import EditButton from "../../../components/EditButton/index";
import ReplayButton from "../../../components/ReplayButton";
import AdminBreadcrumbs from "../../../components/admin/AdminBreadcrumbs";
import { deleteProducts, fetchProductsAdmin } from "../../../redux/action";
import { setProductsList } from "../../../redux/slices/admin.slice";
import { pagePaths } from "../../../utils/constants/constant";
import lazyLoadable from "../../../utils/lazyLoadable";
import styles from "./styles.module.scss";

const RTable = lazyLoadable(() => import("../../../components/Table/index"));

const ProductManagementPage = () => {
  const { productsList } = useSelector((state) => state.admin);
  const [brandToDelete, setBrandToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { isAdminStatus, userRoles } = useSelector((state) => state.auth);

  const navigate = useRouter();

  const dispatch = useDispatch();

  const onDeleteButtonClicked = (brand) => {
    setBrandToDelete(brand);
  };

  const onDeleteConfirmed = () => {
    if (brandToDelete?.id && productsList?.length) {
      dispatch(
        deleteProducts(brandToDelete.id, () => {
          const updatedBlogsList = productsList?.filter(
            (item) => item.id !== brandToDelete.id
          );
          dispatch(setProductsList(updatedBlogsList || []));
          setBrandToDelete(null);
        })
      );
    }
  };

  const onEdit = useCallback(
    (id, replay = "edit") => {
      if (replay === "faq") {
        navigate.push(pagePaths.adminCreateProductSize.replace(":id", id));
        return;
      }
      navigate.push(pagePaths.adminCreateProductEdit.replace(":id", id));
    },
    [navigate]
  );

  const closeDeleteConfirmModal = () => {
    setBrandToDelete(null);
  };

  useEffect(() => {
    dispatch(fetchProductsAdmin());
  }, [dispatch]);
  const rolesPermission = userRoles.filter(
    (item) => item.name == "Products Management"
  );

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "product_id",
      },
      // {
      //   Header: "Image",
      //   accessor: "image",
      //   Cell: ({ cell }) => {
      //     // Check if the product_image_array exists and has at least one image
      //     if (cell.row.original.product_image_array && cell.row.original.product_image_array.length > 0) {
      //       // Get the URL of the first image
      //       const firstImageUrl = cell.row.original.product_image_array[0].image;
      //       // Render the image
      //       return <img style={{ height: 50, width: 50 }} src={firstImageUrl} />;
      //     } else {
      //       // Render a placeholder if there are no images
      //       return <div>No image available</div>;
      //     }
      //   },
      // },
      {
        Header: "SKU",
        accessor: "sku_code",
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ cell }) => {
          return (
            <span className={styles.titleColumn}>{cell.row.original.name}</span>
          );
        },
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Actions",
        accessor: "Actions",
        Cell: ({ cell }) => {
          return (
            <div>
              {isAdminStatus == 1 ? (
                <div>
                  <EditButton onClick={() => onEdit(cell.row.original.id)} />
                  <ReplayButton
                    onClick={() => onEdit(cell.row.original.id, "faq")}
                  />
                  <DeleteButton
                    onClick={() => onDeleteButtonClicked(cell.row.original)}
                  />
                </div>
              ) : (
                <>
                  {rolesPermission &&
                    rolesPermission.map((role) => (
                      <div key={role.roleId}>
                        {role.isUpdate == 1 && (
                          <EditButton
                            onClick={() => onEdit(cell.row.original.id)}
                          />
                        )}
                        {role.isUpdate == 1 && (
                          <ReplayButton
                            onClick={() => onEdit(cell.row.original.id, "faq")}
                          />
                        )}
                        {role.isDelete == 1 && (
                          <DeleteButton
                            onClick={() =>
                              onDeleteButtonClicked(cell.row.original)
                            }
                          />
                        )}
                      </div>
                    ))}
                </>
              )}
            </div>
          );
        },
      },
    ],
    [onEdit]
  );

  const filteredBrands = useMemo(() => {
    if (!productsList) return [];

    if (!searchTerm) {
      return productsList.map((item) => ({
        image: item?.front_image || "",
        name: item?.vendor_article_name || "",
        ...item,
      }));
    }

    return productsList
      .filter((item) => {
        const searchTermLower = searchTerm.toLowerCase();
        // Normalize `sku_code` for consistent comparison
        const normalizedSku = item.sku_code ? item.sku_code.toLowerCase() : "";
        return (
          (item.vendor_article_name &&
            item.vendor_article_name.toLowerCase().includes(searchTermLower)) ||
          (item.product_id &&
            item.product_id.toString().includes(searchTermLower)) ||
          normalizedSku.includes(searchTermLower)
        );
      })
      .map((item) => ({
        image: item.front_image || "",
        name: item.vendor_article_name || "",
        ...item,
      }));
  }, [productsList, searchTerm]);

  const exportToExcel = () => {
    try {
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(filteredBrands); // Use filteredBrands here
      XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
      XLSX.writeFile(workbook, "products.xlsx");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
    }
  };

  return (
    <>
      <ConfirmationModel
        showModal={!!brandToDelete}
        ctaTitle={"Delete"}
        label={"Delete Confirmation"}
        message={`Are you sure you want to delete the brand ${brandToDelete?.name}, Id: ${brandToDelete?.id}`}
        hideModal={closeDeleteConfirmModal}
        confirmModal={onDeleteConfirmed}
      />
      <div className={styles.container}>
        <AdminBreadcrumbs
          items={[
            {
              path: pagePaths.adminProductManagement,
              label: "Products Management",
            },
          ]}
        />
        <div>
          <Card className={styles.card}>
            <div className={styles.cardHeader}>
              <p className={styles.title}>Products Management</p>
            </div>
            <div className="d-flex">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
              <div className="ml-auto">
                <Button className={styles.addButton} onClick={exportToExcel}>
                  Export to Excel
                </Button>
                <Link href={pagePaths.adminReportExcel}>
                  <Button className={styles.addButton}>Report Excel</Button>
                </Link>
                {isAdminStatus == 1 ? (
                  <Link href={pagePaths.adminCreateProducts}>
                    <Button className={styles.addButton}>
                      <span className="flex items-center gap-1">
                        <MdAdd /> Add Product
                      </span>
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Button
                      className={styles.addButton}
                      onClick={exportToExcel}
                    >
                      Export to Excel
                    </Button>
                    <Link href={pagePaths.adminReportExcel}>
                      <Button className={styles.addButton}>Report Excel</Button>
                    </Link>
                    {rolesPermission &&
                      rolesPermission.map((role) => (
                        <div key={role.roleId}>
                          {role.isAdd == 1 && (
                            <Link href={pagePaths.adminCreateProducts}>
                              <Button className={""}>
                                <MdAdd /> Add Product
                              </Button>
                            </Link>
                          )}
                        </div>
                      ))}
                  </>
                )}
              </div>
            </div>

            {filteredBrands.length ? (
              <RTable columns={columns} data={filteredBrands} />
            ) : (
              <p className={styles.noRecordFoundMessage}>
                Loading products, please wait...
              </p>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default ProductManagementPage;
