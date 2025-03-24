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
import { deleteCategories, fetchCategories } from "../../../../../redux/action";
import { setCategories } from "../../../../../redux/slices/admin.slice";
import { pagePaths } from "../../../../../utils/constants/constant";
import lazyLoadable from "../../../../../utils/lazyLoadable";
import styles from "./styles.module.scss";

const RTable = lazyLoadable(() =>
  import("../../../../../components/Table/index")
);

const CategoriesManagementPage = () => {
  const { categories } = useSelector((state) => state.admin);
  const { isAdminStatus, userRoles } = useSelector((state) => state.auth);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const navigate = useRouter();
  const dispatch = useDispatch();

  const onDeleteButtonClicked = (brand) => {
    setCategoryToDelete(brand);
  };
  const [searchTerm, setSearchTerm] = useState("");

  const onDeleteConfirmed = () => {
    if (categoryToDelete?.id && categories?.length) {
      dispatch(
        deleteCategories(categoryToDelete.id, () => {
          const updatedCategoriesList = categories.filter(
            (item) => item.id !== categoryToDelete.id
          );
          dispatch(setCategories(updatedCategoriesList || []));
          setCategoryToDelete(null);
        })
      );
    }
  };

  const closeDeleteConfirmModal = () => {
    setCategoryToDelete(null);
  };

  const onEdit = useCallback(
    (id) => {
      navigate.push(pagePaths.adminCreateCategoryEdit.replace(":id", id));
    },
    [navigate]
  );
  const rolesPermission = userRoles.filter(
    (item) => item.name == "Categories Management"
  );

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Nav Link",
        accessor: "nav_link",
      },
      {
        Header: "code",
        accessor: "code",
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
          const slug = cell.row.original.slug;
          return (
            <Link
              className={styles.titleColumn}
              href={`/product-category/${slug}`}
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
    dispatch(fetchCategories());
  }, [dispatch]);

  // const mappedCategories = categories.map((item) => {
  //   return {
  //     ...item,
  //   };
  // });
  // const [searchTerm, setSearchTerm] = useState('');
  const mappedCategories = useMemo(() => {
    if (!searchTerm.trim()) return categories;

    return categories.filter(
      (categories) =>
        categories.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        categories.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categories, searchTerm]);

  const exportToExcel = () => {
    try {
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(mappedCategories); // Use filteredBrands here
      XLSX.utils.book_append_sheet(workbook, worksheet, "Categories");
      XLSX.writeFile(workbook, "Categories.xlsx");
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
        message={`Are you sure you want to delete the category ${categoryToDelete?.name}, Id: ${categoryToDelete?.id}`}
        hideModal={closeDeleteConfirmModal}
        confirmModal={onDeleteConfirmed}
      />
      <div className={styles.container}>
        <div>
          <Card className={styles.card}>
            <div className={styles.cardHeader}>
              <p className={styles.title}>Categories Management</p>
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
                  <Link href={pagePaths.adminCreateCategory}>
                    <Button className={styles.addButton}>
                      <MdAdd /> Add Categories
                    </Button>
                  </Link>
                ) : (
                  <>
                    {rolesPermission &&
                      rolesPermission.map((role) => (
                        <div key={role.roleId}>
                          {role.isAdd == 1 && (
                            <Link href={pagePaths.adminCreateCategory}>
                              <Button className={styles.addButton}>
                                <MdAdd /> Add Categories
                              </Button>
                            </Link>
                          )}
                        </div>
                      ))}
                  </>
                )}
              </div>
            </div>

            {mappedCategories?.length ? (
              <RTable columns={columns} data={mappedCategories} />
            ) : (
              <p className={styles.noRecordFoundMessage}>
                No Categories found, please add new Categories.
              </p>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default CategoriesManagementPage;
