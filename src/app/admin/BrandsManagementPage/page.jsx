"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import AdminBreadcrumbs from "../../../components/admin/AdminBreadcrumbs";
import { deleteBrands, fetchBrands } from "../../../redux/action";
import { setBrands } from "../../../redux/slices/admin.slice";
import { pagePaths } from "../../../utils/constants/constant";
import lazyLoadable from "../../../utils/lazyLoadable";
import styles from "./styles.module.scss";

const RTable = lazyLoadable(() => import("../../../components/Table/index"));

const BrandsManagementPage = () => {
  const { brands } = useSelector((state) => state.admin);
  const [brandToDelete, setBrandToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { isAdminStatus, userRoles } = useSelector((state) => state.auth);
  const navigate = useRouter();

  const dispatch = useDispatch();

  const onDeleteButtonClicked = (brand) => {
    setBrandToDelete(brand);
  };

  const onDeleteConfirmed = () => {
    if (brandToDelete?.id && brands?.length) {
      dispatch(
        deleteBrands(brandToDelete.id, () => {
          const updatedBlogsList = brands.filter(
            (item) => item.id !== brandToDelete.id
          );
          dispatch(setBrands(updatedBlogsList || []));
          setBrandToDelete(null);
        })
      );
    }
  };

  const onEdit = useCallback(
    (id) => {
      navigate.push(pagePaths.adminCreateBrandEdit.replace(":id", id));
    },
    [navigate]
  );

  const closeDeleteConfirmModal = () => {
    setBrandToDelete(null);
  };
  const rolesPermission = userRoles.filter(
    (item) => item.name == "Brands Management"
  );

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
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
          const name = cell.row.original.name;
          return (
            <a
              className={styles.titleColumn}
              href={`/product-brands/${name}`}
              target="_blank"
              rel="noopener noreferrer" // Security measure to prevent tab hijacking
            >
              {name}
            </a>
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
    dispatch(fetchBrands());
  }, [dispatch]);

  const mappedBrands = useMemo(() => {
    if (!searchTerm.trim()) return brands;

    return brands.filter(
      (brand) =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [brands, searchTerm]);

  const exportToExcel = () => {
    try {
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(mappedBrands); // Use filteredBrands here
      XLSX.utils.book_append_sheet(workbook, worksheet, "Brands");
      XLSX.writeFile(workbook, "Brands.xlsx");
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
              path: pagePaths.adminBrandManagement,
              label: "Brands Management",
            },
          ]}
        />
        <div>
          <Card className={styles.card}>
            <div className={styles.cardHeader}>
              <p className={styles.title}>Brands Management</p>
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
                  <Link href={pagePaths.adminCreateBrand}>
                    <Button className={styles.addButton}>
                      <MdAdd /> Add Brand
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
                            <Link href={pagePaths.adminCreateBrand}>
                              <Button className={styles.addButton}>
                                <MdAdd /> Add Brand
                              </Button>
                            </Link>
                          )}
                        </div>
                      ))}
                  </>
                )}
              </div>
            </div>

            {mappedBrands?.length ? (
              <RTable columns={columns} data={mappedBrands} />
            ) : (
              <p className={styles.noRecordFoundMessage}>
                No brands found, please add new brand.
              </p>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default BrandsManagementPage;
