"use client";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

const CuratedAddManagementPage = () => {
  const {
    curatedAdds,
    curatedAdds: { CURATED },
  } = useSelector((state) => state.admin);
  const [curatedAddToDelete, setCuratedAddToDelete] = useState(null);
  const navigate = useRouter();
  const dispatch = useDispatch();
  const { isAdminStatus, userRoles } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCuratedAdds());
  }, [dispatch]);

  const onDeleteButtonClicked = (brand) => {
    setCuratedAddToDelete(brand);
  };

  const onDeleteConfirmed = () => {
    if (curatedAddToDelete?.id && CURATED?.length) {
      dispatch(
        deleteCuratedAdd(
          curatedAddToDelete.id,
          () => {
            const updatedCuratedAddList = CURATED.filter(
              (item) => item.id !== curatedAddToDelete.id
            );
            let curatedAddsCopy = _.cloneDeep(curatedAdds);
            curatedAddsCopy.CURATED = updatedCuratedAddList;
            dispatch(setCuratedAdds(curatedAddsCopy || []));
            setCuratedAddToDelete(null);
          },
          closeDeleteConfirmModal
        )
      );
    }
  };

  const closeDeleteConfirmModal = () => {
    setCuratedAddToDelete(null);
  };

  const onEdit = useCallback(
    (id) => {
      navigate.push(pagePaths.adminCreateCuratedAddEdit.replace(":id", id));
    },
    [navigate]
  );
  const handleUpload = (id) => {
    window.open(`/admin/curated/upload/images/${id}`, "_blank");
  };
  const rolesPermission = userRoles.filter(
    (item) => item.name == "Curated Add Management"
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
                  <button
                    className={styles.upload}
                    onClick={() => handleUpload(cell.row.original.id)}
                  >
                    <FontAwesomeIcon icon={faUpload} />
                  </button>
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
                        {role.isUpdate == 1 && (
                          <button
                            className={styles.upload}
                            onClick={() => handleUpload(cell.row.original.id)}
                          >
                            <FontAwesomeIcon icon={faUpload} />
                          </button>
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

  const mappedCuratedAdds = CURATED.map((item) => {
    return {
      ...item,
    };
  });

  return (
    <>
      <ConfirmationModel
        showModal={!!curatedAddToDelete}
        ctaTitle={"Delete"}
        label={"Delete Confirmation"}
        message={`Are you sure you want to delete the curated add ${curatedAddToDelete?.name}, Id: ${curatedAddToDelete?.id}`}
        hideModal={closeDeleteConfirmModal}
        confirmModal={onDeleteConfirmed}
      />
      <div className={styles.container}>
        <AdminBreadcrumbs
          items={[
            {
              path: pagePaths.adminCuratedAddManagement,
              label: "Curated Add Management",
            },
          ]}
        />
        <div>
          <Card className={styles.card}>
            <div className={styles.cardHeader}>
              <p className={styles.title}>Curated Add Management</p>
              <div>
                {isAdminStatus == 1 ? (
                  <Link href={pagePaths.adminCreateCuratedAdd}>
                    <Button className={styles.addButton}>
                      <MdAdd /> Add Curated Add
                    </Button>
                  </Link>
                ) : (
                  <>
                    {rolesPermission &&
                      rolesPermission.map((role) => (
                        <div key={role.roleId}>
                          {role.isAdd == 1 && (
                            <Link href={pagePaths.adminCreateCuratedAdd}>
                              <Button className={styles.addButton}>
                                <MdAdd /> Add Curated Add
                              </Button>
                            </Link>
                          )}
                        </div>
                      ))}
                  </>
                )}
              </div>
            </div>
            {mappedCuratedAdds?.length ? (
              <RTable columns={columns} data={mappedCuratedAdds || []} />
            ) : (
              <p className={styles.noRecordFoundMessage}>
                No curated Add found, please add new Curated Add.
              </p>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default CuratedAddManagementPage;
