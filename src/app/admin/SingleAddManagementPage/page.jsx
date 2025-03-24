"use client";
import moment from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import { useRouter } from "next/navigation";
import Card from "../../../components/Card";
import Button from "react-bootstrap/Button";
import { MdAdd } from "react-icons/md";
import ConfirmationModel from "../../../components/ConfirmationModel";
import DeleteButton from "../../../components/DeleteButton/index";
import EditButton from "../../../components/EditButton/index";
import AdminBreadcrumbs from "../../../components/admin/AdminBreadcrumbs";
import { deleteSingleAdd, fetchSingleAdds } from "../../../redux/action";
import { setSingleAdds } from "../../../redux/slices/admin.slice";
import { pagePaths } from "../../../utils/constants/constant";
import lazyLoadable from "../../../utils/lazyLoadable";
import styles from "./styles.module.scss";

const RTable = lazyLoadable(() => import("../../../components/Table/index"));

const SingleAddManagementPage = () => {
  const { singleAdds } = useSelector((state) => state.admin);
  const [singleAddToDelete, setSingleAddToDelete] = useState(null);
  const navigate = useRouter();
  const dispatch = useDispatch();
  const { isAdminStatus, userRoles } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchSingleAdds());
  }, [dispatch]);

  const onDeleteButtonClicked = (brand) => {
    setSingleAddToDelete(brand);
  };

  const onDeleteConfirmed = () => {
    if (singleAddToDelete?.id && singleAdds?.length) {
      dispatch(
        deleteSingleAdd(singleAddToDelete.id, () => {
          const updatedSingleAddList = singleAdds.filter(
            (item) => item.id !== singleAddToDelete.id
          );
          dispatch(setSingleAdds(updatedSingleAddList || []));
          setSingleAddToDelete(null);
        })
      );
    }
  };

  const closeDeleteConfirmModal = () => {
    setSingleAddToDelete(null);
  };

  const onEdit = useCallback(
    (id) => {
      navigate.push(pagePaths.adminCreateSingleAddEdit.replace(":id", id));
    },
    [navigate]
  );
  const rolesPermission = userRoles.filter(
    (item) => item.name == "Single Add Management"
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
          return <>{moment(cell.row.original.start_date).format("ll")}</>;
        },
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

  const mappedSingleAdds = singleAdds.map((item) => {
    return {
      ...item,
    };
  });

  return (
    <>
      <ConfirmationModel
        showModal={!!singleAddToDelete}
        ctaTitle={"Delete"}
        label={"Delete Confirmation"}
        message={`Are you sure you want to delete the single add ${singleAddToDelete?.name}, Id: ${singleAddToDelete?.id}`}
        hideModal={closeDeleteConfirmModal}
        confirmModal={onDeleteConfirmed}
      />
      <div className={styles.container}>
        <AdminBreadcrumbs
          items={[
            {
              path: pagePaths.adminSingleAddManagement,
              label: "Single Add Management",
            },
          ]}
        />
        <div>
          <Card className={styles.card}>
            <div className={styles.cardHeader}>
              <p className={styles.title}>Single Add Management</p>
              {/* <Link to={pagePaths.adminCreateSingleAdd}>
                <Button className={styles.addButton}>
                  <MdAdd /> Add Single Add
                </Button>
              </Link> */}
              <div>
                {isAdminStatus == 1 ? (
                  <Link href={pagePaths.adminCreateSingleAdd}>
                    <Button className={styles.addButton}>
                      <MdAdd /> Add Single Add
                    </Button>
                  </Link>
                ) : (
                  <>
                    {rolesPermission &&
                      rolesPermission.map((role) => (
                        <div key={role.roleId}>
                          {role.isAdd == 1 && (
                            <Link href={pagePaths.adminCreateSingleAdd}>
                              <Button className={styles.addButton}>
                                <MdAdd /> Add Single Add
                              </Button>
                            </Link>
                          )}
                        </div>
                      ))}
                  </>
                )}
              </div>
            </div>
            {mappedSingleAdds?.length ? (
              <RTable columns={columns} data={mappedSingleAdds || []} />
            ) : (
              <p className={styles.noRecordFoundMessage}>
                No single Add found, please add new Single Add.
              </p>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default SingleAddManagementPage;
