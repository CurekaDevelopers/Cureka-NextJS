"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import { useRouter } from "next/navigation";
import Card from "../../../components/Card";
import ConfirmationModel from "../../../components/ConfirmationModel";
import DeleteButton from "../../../components/DeleteButton/index";
import EditButton from "../../../components/EditButton/index";
import AdminBreadcrumbs from "../../../components/admin/AdminBreadcrumbs";
import { deleteConcerns, fetchAdminConcerns } from "../../../redux/action";
import { setAdminConcerns } from "../../../redux/slices/admin.slice";
import { pagePaths } from "../../../utils/constants/constant";
import lazyLoadable from "../../../utils/lazyLoadable";
import styles from "./styles.module.scss";

const RTable = lazyLoadable(() => import("../../../components/Table/index"));

const ConcernsManagementPage = () => {
  const { adminConcerns = [] } = useSelector((state) => state.admin);
  const [concernToDelete, setConcernToDelete] = useState(null);
  const navigate = useRouter();
  const { isAdminStatus, userRoles } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onDeleteButtonClicked = (brand) => {
    setConcernToDelete(brand);
  };

  const onDeleteConfirmed = () => {
    if (concernToDelete?.id && adminConcerns?.length) {
      dispatch(
        deleteConcerns(concernToDelete.id, () => {
          const updatedConcernsList = adminConcerns.filter(
            (item) => item.id !== concernToDelete.id
          );
          dispatch(setAdminConcerns(updatedConcernsList || []));
          setConcernToDelete(null);
        })
      );
    }
  };

  const closeDeleteConfirmModal = () => {
    setConcernToDelete(null);
  };
  const [searchTerm, setSearchTerm] = useState("");

  const onEdit = useCallback(
    (id) => {
      navigate.push(pagePaths.adminCreateConcernEdit.replace(":id", id));
    },
    [navigate]
  );
  const rolesPermission = userRoles.filter(
    (item) => item.name == "Concerns Management"
  );

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
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
            <a
              className={styles.titleColumn}
              href={`/concern/${slug}`}
              target="_blank"
              rel="noopener noreferrer" // Security measure to prevent tab hijacking
            >
              {cell.row.original.name}
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
    dispatch(fetchAdminConcerns());
  }, [dispatch]);

  // const mappedConcerns = adminConcerns.map((item) => {
  //   return {
  //     ...item,
  //   };
  // });
  const mappedConcerns = useMemo(() => {
    if (!searchTerm.trim()) return adminConcerns;

    return adminConcerns.filter((concern) =>
      concern.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [adminConcerns, searchTerm]);

  return (
    <>
      <ConfirmationModel
        showModal={!!concernToDelete}
        ctaTitle={"Delete"}
        label={"Delete Confirmation"}
        message={`Are you sure you want to delete the concern ${concernToDelete?.name}, Id: ${concernToDelete?.id}`}
        hideModal={closeDeleteConfirmModal}
        confirmModal={onDeleteConfirmed}
      />
      <div className={styles.container}>
        <AdminBreadcrumbs
          items={[
            {
              path: pagePaths.adminConcern,
              label: "Concerns Management",
            },
          ]}
        />
        <div>
          <Card className={styles.card}>
            <div className={styles.cardHeader}>
              <p className={styles.title}>Concerns Management</p>
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
                {isAdminStatus == 1 ? (
                  <Link href={pagePaths.adminCreateConcern}>
                    <Button className={styles.addButton}>
                      <MdAdd /> Add Concern
                    </Button>
                  </Link>
                ) : (
                  <>
                    {rolesPermission &&
                      rolesPermission.map((role) => (
                        <div key={role.roleId}>
                          {role.isAdd == 1 && (
                            <Link href={pagePaths.adminCreateConcern}>
                              <Button className={styles.addButton}>
                                <MdAdd /> Add Concern
                              </Button>
                            </Link>
                          )}
                        </div>
                      ))}
                  </>
                )}
              </div>
            </div>

            {mappedConcerns?.length ? (
              <RTable columns={columns} data={mappedConcerns || []} />
            ) : (
              <p className={styles.noRecordFoundMessage}>
                No concerns found, please add new concern.
              </p>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default ConcernsManagementPage;
