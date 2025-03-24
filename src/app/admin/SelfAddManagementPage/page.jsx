"use client";
import _ from "lodash";
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
import { deleteCuratedAdd, fetchCuratedAdds } from "../../../redux/action";
import { setCuratedAdds } from "../../../redux/slices/admin.slice";
import { pagePaths } from "../../../utils/constants/constant";
import lazyLoadable from "../../../utils/lazyLoadable";
import styles from "./styles.module.scss";

const RTable = lazyLoadable(() => import("../../../components/Table/index"));

const SelfAddManagementPage = () => {
  const {
    curatedAdds,
    curatedAdds: { YOURSELF },
  } = useSelector((state) => state.admin);
  const [selfAddToDelete, setSelfAddToDelete] = useState(null);
  const navigate = useRouter();
  const dispatch = useDispatch();
  const { isAdminStatus, userRoles } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCuratedAdds());
  }, [dispatch]);

  const onDeleteButtonClicked = (selfAdd) => {
    setSelfAddToDelete(selfAdd);
  };

  const onDeleteConfirmed = () => {
    if (selfAddToDelete?.id && YOURSELF?.length) {
      dispatch(
        deleteCuratedAdd(
          selfAddToDelete.id,
          () => {
            const updatedSelfAddList = YOURSELF.filter(
              (item) => item.id !== selfAddToDelete.id
            );
            let curatedAddsCopy = _.cloneDeep(curatedAdds);
            curatedAddsCopy.YOURSELF = updatedSelfAddList;
            dispatch(setCuratedAdds(curatedAddsCopy || []));
            setSelfAddToDelete(null);
          },
          closeDeleteConfirmModal
        )
      );
    }
  };

  const closeDeleteConfirmModal = () => {
    setSelfAddToDelete(null);
  };

  const onEdit = useCallback(
    (id) => {
      navigate.push(pagePaths.adminCreateSelfAddEdit.replace(":id", id));
    },
    [navigate]
  );
  const rolesPermission = userRoles.filter(
    (item) => item.name == "Self Add Management"
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

  const mappedSelfAdds = YOURSELF.map((item) => {
    return {
      ...item,
    };
  });

  return (
    <>
      <ConfirmationModel
        showModal={!!selfAddToDelete}
        ctaTitle={"Delete"}
        label={"Delete Confirmation"}
        message={`Are you sure you want to delete the self add ${selfAddToDelete?.name}, Id: ${selfAddToDelete?.id}`}
        hideModal={closeDeleteConfirmModal}
        confirmModal={onDeleteConfirmed}
      />
      <div className={styles.container}>
        <AdminBreadcrumbs
          items={[
            {
              path: pagePaths.adminSelfAddManagement,
              label: "Self Add Management",
            },
          ]}
        />
        <div>
          <Card className={styles.card}>
            <div className={styles.cardHeader}>
              <p className={styles.title}>Self Add Management</p>
              <div>
                {isAdminStatus == 1 ? (
                  <Link href={pagePaths.adminCreateSelfAdd}>
                    <Button className={styles.addButton}>
                      <MdAdd /> Add Self Add
                    </Button>
                  </Link>
                ) : (
                  <>
                    {rolesPermission &&
                      rolesPermission.map((role) => (
                        <div key={role.roleId}>
                          {role.isAdd == 1 && (
                            <Link href={pagePaths.adminCreateSelfAdd}>
                              <Button className={styles.addButton}>
                                <MdAdd /> Add Self Add
                              </Button>
                            </Link>
                          )}
                        </div>
                      ))}
                  </>
                )}
              </div>
            </div>
            {mappedSelfAdds?.length ? (
              <RTable columns={columns} data={mappedSelfAdds || []} />
            ) : (
              <p className={styles.noRecordFoundMessage}>
                No Self Add found, please add new Self Add.
              </p>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default SelfAddManagementPage;
