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
import DeleteButton from "../../../../../components/DeleteButton";
import EditButton from "../../../../../components/EditButton";
import {
  deleteSubSubCategories,
  fetchSubsubCategories,
} from "../../../../../redux/action";
import { setSubSubCategories } from "../../../../../redux/slices/admin.slice";
import { pagePaths } from "../../../../../utils/constants/constant";
import lazyLoadable from "../../../../../utils/lazyLoadable";
import styles from "./styles.module.scss";

const RTable = lazyLoadable(() => import("../../../../../components/Table"));

const SubSubSubCategoriesManagementPage = () => {
  const { subSubCategories } = useSelector((state) => state.admin);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const { isAdminStatus, userRoles } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useRouter();

  useEffect(() => {
    dispatch(fetchSubsubCategories());
  }, [dispatch]);

  const onDeleteButtonClicked = (category) => {
    setCategoryToDelete(category);
  };

  const onDeleteConfirmed = () => {
    if (categoryToDelete?.id) {
      dispatch(
        deleteSubSubCategories(categoryToDelete.id, () => {
          const updatedList = subSubCategories.filter(
            (item) => item.id !== categoryToDelete.id
          );
          dispatch(setSubSubCategories(updatedList));
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

  const columns = useMemo(
    () => [
      {
        Header: "ID",
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
          return imageSrc ? (
            <img
              style={{ height: 50, width: 50 }}
              src={imageSrc}
              alt="Category"
            />
          ) : (
            <span>No Image</span>
          );
        },
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ cell }) => {
          const categorySlug = cell.row.original.category_slug || "";
          const subCategorySlug = cell.row.original.sub_category_slug || "";
          const nameSlug = cell.row.original.slug || "";

          return (
            <Link
              className={styles.titleColumn}
              href={`/product-category/${categorySlug.toLowerCase()}/${subCategorySlug.toLowerCase()}/${nameSlug.toLowerCase()}`}
              target="_blank"
              rel="noopener noreferrer"
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
        accessor: "actions",
        Cell: ({ cell }) => (
          <div>
            {isAdminStatus === 1 ? (
              <>
                <EditButton onClick={() => onEdit(cell.row.original.id)} />
                <DeleteButton
                  onClick={() => onDeleteButtonClicked(cell.row.original)}
                />
              </>
            ) : (
              userRoles.map((role) => (
                <div key={role.roleId}>
                  {role.isUpdate === 1 && (
                    <EditButton onClick={() => onEdit(cell.row.original.id)} />
                  )}
                  {role.isDelete === 1 && (
                    <DeleteButton
                      onClick={() => onDeleteButtonClicked(cell.row.original)}
                    />
                  )}
                </div>
              ))
            )}
          </div>
        ),
      },
    ],
    [onEdit, isAdminStatus, userRoles]
  );

  const [searchTerm, setSearchTerm] = useState("");
  const filteredCategories = useMemo(
    () =>
      subSubCategories.filter((category) =>
        [
          category.name,
          category.category_name,
          category.sub_category_name,
        ].some((field) =>
          field?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      ),
    [subSubCategories, searchTerm]
  );

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredCategories);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "SubSubCategories");
    XLSX.writeFile(workbook, "subsubCategories.xlsx");
  };

  return (
    <div className={styles.container}>
      <ConfirmationModel
        showModal={!!categoryToDelete}
        ctaTitle="Delete"
        label="Delete Confirmation"
        message={`Are you sure you want to delete ${categoryToDelete?.name} (ID: ${categoryToDelete?.id})?`}
        hideModal={() => setCategoryToDelete(null)}
        confirmModal={onDeleteConfirmed}
      />
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
          <Button className={styles.addButton} onClick={exportToExcel}>
            Export to Excel
          </Button>
        </div>
        {filteredCategories.length ? (
          <RTable columns={columns} data={filteredCategories} />
        ) : (
          <p className={styles.noRecordFoundMessage}>No categories found.</p>
        )}
      </Card>
    </div>
  );
};

export default SubSubSubCategoriesManagementPage;
