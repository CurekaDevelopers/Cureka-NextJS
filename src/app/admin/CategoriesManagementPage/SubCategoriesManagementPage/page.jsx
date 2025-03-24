"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";
import Card from "../../../../components/Card";
import ConfirmationModel from "../../../../components/ConfirmationModel";
import DeleteButton from "../../../../components/DeleteButton/index";
import EditButton from "../../../../components/EditButton/index";
import {
  deleteSubCategories,
  fetchSubCategories,
} from "../../../../redux/action";
import { setSubCategories } from "../../../../redux/slices/admin.slice";
import { pagePaths } from "../../../../utils/constants/constant";
import lazyLoadable from "../../../../utils/lazyLoadable";
import styles from "./styles.module.scss";

const RTable = lazyLoadable(() => import("../../../../components/Table/index"));

const SubCategoriesManagementPage = () => {
  const { subCategories } = useSelector((state) => state.admin);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const navigate = useRouter();
  const dispatch = useDispatch();
  const { isAdminStatus, userRoles } = useSelector((state) => state.auth);
  const onDeleteButtonClicked = (brand) => {
    setCategoryToDelete(brand);
  };

  const onDeleteConfirmed = () => {
    if (categoryToDelete?.id && mappedSubCategories?.length) {
      dispatch(
        deleteSubCategories(categoryToDelete.id, () => {
          const updatedSubCategoriesList = mappedSubCategories.filter(
            (item) => item.id !== categoryToDelete.id
          );
          dispatch(setSubCategories(updatedSubCategoriesList || []));
          setCategoryToDelete(null);
        })
      );
    }
  };

  const onEdit = useCallback(
    (id) => {
      navigate.push(pagePaths.adminCreateSubCategoryEdit.replace(":id", id));
    },
    [navigate]
  );

  const closeDeleteConfirmModal = () => {
    setCategoryToDelete(null);
  };
  const [searchTerm, setSearchTerm] = useState("");
  const rolesPermission = userRoles.filter(
    (item) => item.name == "Sub Category"
  );

  const columns = useMemo(
    () => [
      {
        Header: "id",
        accessor: "id",
      },
      {
        Header: "category Name",
        accessor: "category_name",
      },
      {
        Header: "Image",
        accessor: "image",
        Cell: ({ cell }) => {
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
          const category_name = cell.row.original.category_slug;
          const name = cell.row.original.slug;
          return (
            <Link
              className={styles.titleColumn}
              href={`/product-category/${category_name}/${name}`}
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
    dispatch(fetchSubCategories());
  }, [dispatch]);

  // const mappedSubCategories = subCategories.map((item) => {
  //   return {
  //     ...item,
  //   };
  // });
  const mappedSubCategories = useMemo(() => {
    if (!searchTerm.trim()) return subCategories;

    return subCategories.filter(
      (brand) =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.category_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [subCategories, searchTerm]);

  const exportToExcel = () => {
    try {
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(mappedSubCategories); // Use filteredBrands here
      XLSX.utils.book_append_sheet(workbook, worksheet, "SubCategories");
      XLSX.writeFile(workbook, "SubCategories.xlsx");
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
        message={`Are you sure you want to delete the sub category ${categoryToDelete?.name}, Id: ${categoryToDelete?.id}`}
        hideModal={closeDeleteConfirmModal}
        confirmModal={onDeleteConfirmed}
      />
      <div className={styles.container}>
        <div>
          <Card className={styles.card}>
            <div className={styles.cardHeader}>
              <p className={styles.title}>Sub Categories Management</p>
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
                  <Link href={pagePaths.adminCreateSubCategory}>
                    <Button className={styles.addButton}>
                      <MdAdd /> Add Sub Categories
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
                            <Link href={pagePaths.adminCreateSubCategory}>
                              <Button className={styles.addButton}>
                                <MdAdd /> Add Sub Categories
                              </Button>
                            </Link>
                          )}
                        </div>
                      ))}
                  </>
                )}
              </div>
            </div>

            {mappedSubCategories?.length ? (
              <RTable columns={columns} data={mappedSubCategories} />
            ) : (
              <p className={styles.noRecordFoundMessage}>
                No Sub Categories found, please add new Sub Categories.
              </p>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default SubCategoriesManagementPage;
