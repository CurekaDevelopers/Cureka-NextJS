"use client";
import moment from "moment";
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
import { deleteMultipleAdd, fetchMultipleAdds } from "../../../redux/action";
import { setMultipleAdds } from "../../../redux/slices/admin.slice";
import { pagePaths } from "../../../utils/constants/constant";
import lazyLoadable from "../../../utils/lazyLoadable";
import styles from "./styles.module.scss";

const RTable = lazyLoadable(() => import("../../../components/Table/index"));

const MultipleAddManagementPage = () => {
  const { multipleAdds } = useSelector((state) => state.admin);
  const [multipleAddToDelete, setMultipleAddToDelete] = useState(null);
  const navigate = useRouter();
  const dispatch = useDispatch();
  const { isAdminStatus, userRoles } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchMultipleAdds());
  }, [dispatch]);

  const onDeleteButtonClicked = (brand) => {
    setMultipleAddToDelete(brand);
  };

  const onDeleteConfirmed = () => {
    if (multipleAddToDelete?.id && multipleAdds?.length) {
      dispatch(
        deleteMultipleAdd(multipleAddToDelete.id, () => {
          const updatedMultipleAddList = multipleAdds.filter(
            (item) => item.id !== multipleAddToDelete.id
          );
          dispatch(setMultipleAdds(updatedMultipleAddList || []));
          setMultipleAddToDelete(null);
        })
      );
    }
  };

  const closeDeleteConfirmModal = () => {
    setMultipleAddToDelete(null);
  };

  const onEdit = useCallback(
    (id) => {
      navigate.push(pagePaths.adminCreateMultipleAddEdit.replace(":id", id));
    },
    [navigate]
  );
  const rolesPermission = userRoles.filter(
    (item) => item.name == "Multiple Add Management"
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
              alt="Multiple Add"
            />
          );
        },
      },
      {
        Header: "Url",
        accessor: "url",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Updated At",
        accessor: "updated_at",
        Cell: ({ cell }) => {
          return <>{moment(cell.row.original.updated_at).format("ll")}</>;
        },
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ cell }) => {
          return (
            <div>
              {isAdminStatus === 1 ? (
                <div>
                  <EditButton onClick={() => onEdit(cell.row.original.id)} />
                  <DeleteButton
                    onClick={() => onDeleteButtonClicked(cell.row.original)}
                  />
                </div>
              ) : (
                rolesPermission.map((role) => (
                  <div key={role.roleId}>
                    {role.isUpdate === 1 && (
                      <EditButton
                        onClick={() => onEdit(cell.row.original.id)}
                      />
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
          );
        },
      },
    ],
    [onEdit, rolesPermission, isAdminStatus]
  );

  const mappedMultipleAdds = multipleAdds.map((item) => {
    return {
      ...item,
    };
  });

  return (
    <>
      <ConfirmationModel
        showModal={!!multipleAddToDelete}
        ctaTitle={"Delete"}
        label={"Delete Confirmation"}
        message={`Are you sure you want to delete the multiple add ${multipleAddToDelete?.name}, Id: ${multipleAddToDelete?.id}`}
        hideModal={closeDeleteConfirmModal}
        confirmModal={onDeleteConfirmed}
      />
      <div className={styles.container}>
        <AdminBreadcrumbs
          items={[
            {
              path: pagePaths.adminMultipleAddManagement,
              label: "Multiple Add Management",
            },
          ]}
        />
        <div>
          <Card className={styles.card}>
            <div className={styles.cardHeader}>
              <p className={styles.title}>Multiple Add Management</p>
              <div>
                {isAdminStatus == 1 ? (
                  <Link href={pagePaths.adminCreateMultipleAdd}>
                    <Button className={styles.addButton}>
                      <span className="flex items-center gap-1">
                        <MdAdd /> Add Multiple Add
                      </span>
                    </Button>
                  </Link>
                ) : (
                  <>
                    {rolesPermission &&
                      rolesPermission.map((role) => (
                        <div key={role.roleId}>
                          {role.isAdd == 1 && (
                            <Link href={pagePaths.adminCreateMultipleAdd}>
                              <Button className={styles.addButton}>
                                <MdAdd /> Add Multiple Add
                              </Button>
                            </Link>
                          )}
                        </div>
                      ))}
                  </>
                )}
              </div>
            </div>
            {mappedMultipleAdds?.length ? (
              <RTable columns={columns} data={mappedMultipleAdds || []} />
            ) : (
              <p className={styles.noRecordFoundMessage}>
                No multiple Add found, please add new Multiple Add.
              </p>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default MultipleAddManagementPage;
