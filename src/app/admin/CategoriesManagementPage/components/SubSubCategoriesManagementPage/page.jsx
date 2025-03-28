"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";
import Card from "../../../../../components/Card";
import ConfirmationModel from "../../../../../components/ConfirmationModel";
import DeleteButton from "../../../../../components/DeleteButton/index";
import EditButton from "../../../../../components/EditButton/index";
import {
  deleteSubSubCategories,
  fetchSubsubCategories,
} from "../../../../../redux/action";
import { setSubSubCategories } from "../../../../../redux/slices/admin.slice";
import { pagePaths } from "../../../../../utils/constants/constant";
import lazyLoadable from "../../../../../utils/lazyLoadable";
import styles from "./styles.module.scss";

const RTable = lazyLoadable(() =>
  import("../../../../../components/Table/index")
);

const SubSubSubCategoriesManagementPage = () => {
  const { subSubCategories } = useSelector((state) => state.admin);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const { isAdminStatus, userRoles } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useRouter();

  const onDeleteButtonClicked = (brand) => {
    setCategoryToDelete(brand);
  };

  const onDeleteConfirmed = () => {
    if (categoryToDelete?.id && subSubCategories?.length) {
      dispatch(
        deleteSubSubCategories(categoryToDelete.id, () => {
          const updatedConcernsList = subSubCategories.filter(
            (item) => item.id !== categoryToDelete.id
          );
          dispatch(setSubSubCategories(updatedConcernsList || []));
          setCategoryToDelete(null);
        })
      );
    }
  };

  const onEdit = useCallback(
    (id) => {
      navigate.push(pagePaths.adminCreateSubSubCategoryEdit.replace(":id", id));
    },
    [navigate]
  );
  const closeDeleteConfirmModal = () => {
    setCategoryToDelete(null);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const rolesPermission = userRoles.filter(
    (item) => item.name == "Sub Sub Category"
  );

  const columns = useMemo(
    () => [
      {
        Header: "id",
        accessor: "id",
      },
      {
        Header: "Category Name",
        accessor: "category_name",
      },
      {
        Header: "Sub Category Name",
        accessor: "sub_category_name",
      },
      {
        Header: "Image",
        accessor: "image",
        Cell: ({ cell }) => {
          const imageSrc = cell.row.original.image;

          // If imageSrc is an empty string or not valid, render a placeholder or nothing
          if (!imageSrc || imageSrc === "") {
            return <span>No image</span>; // Or render a placeholder image
          }
          return (
            <img
              style={{ height: 50, width: 50 }}
              src={cell.row.original.image}
            />
          );
        },
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ cell }) => {
          const category_name = cell.row.original.category_slug
            .toLowerCase()
            .replace(/\s+/g, "-");
          const sub_category_name = cell.row.original.sub_category_slug
            .toLowerCase()
            .replace(/\s+/g, "-");
          const name = cell.row.original.slug
            .toLowerCase() // Convert to lowercase
            .replace(/\s+/g, "-"); // Replace spaces with hyphens;
          return (
            <Link
              className={styles.titleColumn}
              href={`/product-category/${category_name}/${sub_category_name}/${name}`}
              target="_blank"
              rel="noopener noreferrer" // Security measure to prevent tab hijacking
            >
              {cell.row.original.name}
            </Link>
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

  useEffect(() => {
    dispatch(fetchSubsubCategories());
  }, [dispatch]);

  // const mappedSubSubCategories = subSubCategories.map((item) => {
  //   return {
  //     ...item,
  //   };
  // });

  const mappedSubSubCategories = useMemo(() => {
    if (!searchTerm.trim()) return subSubCategories;

    return subSubCategories.filter((brand) => {
      const searchLower = searchTerm.toLowerCase();

      return (
        (brand.name && brand.name.toLowerCase().includes(searchLower)) ||
        (brand.category_name &&
          brand.category_name.toLowerCase().includes(searchLower)) ||
        (brand.sub_category_name &&
          brand.sub_category_name.toLowerCase().includes(searchLower))
      );
    });
  }, [subSubCategories, searchTerm]);

  const exportToExcel = () => {
    try {
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(mappedSubSubCategories); // Use filteredBrands here
      XLSX.utils.book_append_sheet(workbook, worksheet, "subsubCategories");
      XLSX.writeFile(workbook, "subsubCategories.xlsx");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
    }
  };

  return (
    <>
      <ConfirmationModel
        showModal={!!categoryToDelete}
        ctaTitle={"Delete"}
        label={"Delete Confirmation"}
        message={`Are you sure you want to delete the sub sub sub category ${categoryToDelete?.name}, Id: ${categoryToDelete?.id}`}
        hideModal={closeDeleteConfirmModal}
        confirmModal={onDeleteConfirmed}
      />
      <div className={styles.container}>
        <div>
          <Card className={styles.card}>
            <div className={styles.cardHeader}>
              <p className={styles.title}>Sub Sub Categories Management</p>
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
                {isAdminStatus == 1 ? (
                  <Link href={pagePaths.adminCreateSubSubCategory}>
                    <Button className={styles.addButton}>
                      <MdAdd /> Add Sub Sub Categories
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
                    {rolesPermission &&
                      rolesPermission.map((role) => (
                        <div key={role.roleId}>
                          {role.isAdd == 1 && (
                            <Link href={pagePaths.adminCreateSubSubCategory}>
                              <Button className={styles.addButton}>
                                <MdAdd /> Add Sub Sub Categories
                              </Button>
                            </Link>
                          )}
                        </div>
                      ))}
                  </>
                )}
              </div>
            </div>
            {mappedSubSubCategories?.length ? (
              <RTable columns={columns} data={mappedSubSubCategories} />
            ) : (
              <p className={styles.noRecordFoundMessage}>
                No Sub Sub Categories found, please add new sub sub category.
              </p>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default SubSubSubCategoriesManagementPage;
