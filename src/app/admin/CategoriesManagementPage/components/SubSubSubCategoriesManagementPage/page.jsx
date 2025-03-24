"use client";
import { useEffect, useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import * as XLSX from "xlsx";
import Card from "../../../../../components/Card";
import ConfirmationModel from "../../../../../components/ConfirmationModel";
import DeleteButton from "../../../../../components/DeleteButton/index";
import EditButton from "../../../../../components/EditButton/index";
import {
  deleteSubSubSubCategories,
  fetchSubSubSubCategories,
} from "../../../../../redux/action";
import { setSubSubSubCategories } from "../../../../../redux/slices/admin.slice";
import { pagePaths } from "../../../../../utils/constants/constant";
import lazyLoadable from "../../../../../utils/lazyLoadable";
import styles from "./styles.module.scss";

const RTable = lazyLoadable(() =>
  import("../../../../../components/Table/index")
);

const SubSubSubCategoriesManagementPage = () => {
  const { subSubSubCategories } = useSelector((state) => state.admin);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const { isAdminStatus, userRoles } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const onDeleteButtonClicked = (brand) => {
    setCategoryToDelete(brand);
  };

  const onDeleteConfirmed = () => {
    if (categoryToDelete?.id && subSubSubCategories?.length) {
      dispatch(
        deleteSubSubSubCategories(categoryToDelete.id, () => {
          const updatedConcernsList = subSubSubCategories.filter(
            (item) => item.id !== categoryToDelete.id
          );
          dispatch(setSubSubSubCategories(updatedConcernsList || []));
          setCategoryToDelete(null);
        })
      );
    }
  };

  const closeDeleteConfirmModal = () => {
    setCategoryToDelete(null);
  };
  const rolesPermission = userRoles.filter(
    (item) => item.name == "Sub Sub Sub Category"
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
        Header: "sub category Name",
        accessor: "sub_category_name",
      },
      {
        Header: "sub sub category Name",
        accessor: "sub_sub_category_name",
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
        accessor: "sub_sub_sub_category_name",
        Cell: ({ cell }) => {
          return (
            <span className={styles.titleColumn}>
              {cell.row.original.sub_sub_sub_category_name}
            </span>
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
                  <EditButton />
                  <DeleteButton
                    onClick={() => onDeleteButtonClicked(cell.row.original)}
                  />
                </div>
              ) : (
                <>
                  {rolesPermission &&
                    rolesPermission.map((role) => (
                      <div key={role.roleId}>
                        {role.isUpdate == 1 && <EditButton />}
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
    []
  );

  useEffect(() => {
    dispatch(fetchSubSubSubCategories());
  }, [dispatch]);

  const mappedSubSubSubcategories = subSubSubCategories.map((item) => {
    return {
      ...item,
    };
  });
  const exportToExcel = () => {
    try {
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(mappedSubSubSubcategories); // Use filteredBrands here
      XLSX.utils.book_append_sheet(workbook, worksheet, "subsubsubCategories");
      XLSX.writeFile(workbook, "subsubsubCategories.xlsx");
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
              <p className={styles.title}>Sub Sub Sub Categories Management</p>
              <Button className={styles.addButton} onClick={exportToExcel}>
                Export to Excel
              </Button>
              <div>
                {isAdminStatus == 1 ? (
                  <Link href={pagePaths.adminCreateSubSubSubCategory}>
                    <Button className={styles.addButton}>
                      <MdAdd /> Add Sub Sub Sub Categories
                    </Button>
                  </Link>
                ) : (
                  <>
                    {rolesPermission &&
                      rolesPermission.map((role) => (
                        <div key={role.roleId}>
                          {role.isAdd == 1 && (
                            <Link href={pagePaths.adminCreateSubSubSubCategory}>
                              <Button className={styles.addButton}>
                                <MdAdd /> Add Sub Sub Sub Categories
                              </Button>
                            </Link>
                          )}
                        </div>
                      ))}
                  </>
                )}
              </div>
            </div>
            {mappedSubSubSubcategories?.length ? (
              <RTable columns={columns} data={mappedSubSubSubcategories} />
            ) : (
              <p className={styles.noRecordFoundMessage}>
                No Sub Sub Sub Categories found, please add new sub sub sub
                category.
              </p>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default SubSubSubCategoriesManagementPage;
