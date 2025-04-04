"use client";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import moment from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Card from "../../../components/Card";
import ConfirmationModel from "../../../components/ConfirmationModel";
import DeleteButton from "../../../components/DeleteButton";
import EditButton from "../../../components/EditButton";
import AdminBreadcrumbs from "../../../components/admin/AdminBreadcrumbs";
import { deleteCuratedAdd, fetchCuratedAdds } from "../../../redux/action";
import { setCuratedAdds } from "../../../redux/slices/admin.slice";
import { pagePaths } from "../../../utils/constants/constant";
import lazyLoadable from "../../../utils/lazyLoadable";
import styles from "./styles.module.scss";

// Lazy load table component
const RTable = lazyLoadable(() => import("../../../components/Table"));

export default function CuratedAddManagementPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { curatedAdds } = useSelector((state) => state.admin);
  const { isAdminStatus, userRoles } = useSelector((state) => state.auth);

  const CURATED = curatedAdds?.CURATED || [];
  const [curatedAddToDelete, setCuratedAddToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchCuratedAdds());
  }, [dispatch]);

  const onDeleteButtonClicked = (addItem) => {
    setCuratedAddToDelete(addItem);
  };

  const closeDeleteConfirmModal = () => {
    setCuratedAddToDelete(null);
  };

  const onDeleteConfirmed = () => {
    if (curatedAddToDelete?.id) {
      dispatch(
        deleteCuratedAdd(
          curatedAddToDelete.id,
          () => {
            const updatedList = CURATED.filter(
              (item) => item.id !== curatedAddToDelete.id
            );
            dispatch(setCuratedAdds({ ...curatedAdds, CURATED: updatedList }));
            closeDeleteConfirmModal();
          },
          closeDeleteConfirmModal
        )
      );
    }
  };

  const onEdit = useCallback(
    (id) => {
      router.push(pagePaths.adminCreateCuratedAddEdit.replace(":id", id));
    },
    [router]
  );

  const handleUpload = (id) => {
    window.open(`/admin/curated/upload/images/${id}`, "_blank");
  };

  const rolesPermission = userRoles.filter(
    (item) => item.name === "Curated Add Management"
  );

  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      {
        Header: "Image",
        accessor: "image",
        Cell: ({ cell }) => (
          <img
            style={{ height: 50, width: 50 }}
            src={cell.row.original.image}
            alt="Curated Banner"
          />
        ),
      },
      { Header: "Url", accessor: "url" },
      { Header: "Status", accessor: "status" },
      {
        Header: "Updated At",
        accessor: "start_date",
        Cell: ({ cell }) => (
          <>
            {cell.row.original.start_date
              ? moment(cell.row.original.start_date).format("ll")
              : "N/A"}
          </>
        ),
      },
      {
        Header: "Actions",
        accessor: "Actions",
        Cell: ({ cell }) => {
          const item = cell.row.original;
          return (
            <div>
              {isAdminStatus === 1 ? (
                <>
                  <EditButton onClick={() => onEdit(item.id)} />
                  <DeleteButton onClick={() => onDeleteButtonClicked(item)} />
                  <button
                    className={styles.upload}
                    onClick={() => handleUpload(item.id)}
                  >
                    <FontAwesomeIcon icon={faUpload} />
                  </button>
                </>
              ) : (
                rolesPermission.map((role) => (
                  <div key={role.roleId}>
                    {role.isUpdate === 1 && (
                      <EditButton onClick={() => onEdit(item.id)} />
                    )}
                    {role.isDelete === 1 && (
                      <DeleteButton
                        onClick={() => onDeleteButtonClicked(item)}
                      />
                    )}
                    {role.isUpdate === 1 && (
                      <button
                        className={styles.upload}
                        onClick={() => handleUpload(item.id)}
                      >
                        <FontAwesomeIcon icon={faUpload} />
                      </button>
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

  return (
    <>
      {/* Confirmation Modal */}
      <ConfirmationModel
        showModal={!!curatedAddToDelete}
        ctaTitle="Delete"
        label="Delete Confirmation"
        message={`Are you sure you want to delete the curated add "${
          curatedAddToDelete?.name || "Unnamed"
        }", ID: ${curatedAddToDelete?.id || "Unknown"}?`}
        hideModal={closeDeleteConfirmModal}
        confirmModal={onDeleteConfirmed}
      />

      {/* Main UI */}
      <div className={styles.container}>
        <AdminBreadcrumbs
          items={[
            {
              path: pagePaths.adminCuratedAddManagement,
              label: "Curated Add Management",
            },
          ]}
        />
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <p className={styles.title}>Curated Add Management</p>
            <div>
              {isAdminStatus === 1 ? (
                <Link href={pagePaths.adminCreateCuratedAdd}>
                  <Button className={styles.addButton}>
                    <MdAdd /> Add Curated Add
                  </Button>
                </Link>
              ) : (
                rolesPermission.map(
                  (role) =>
                    role.isAdd === 1 && (
                      <Link
                        key={role.roleId}
                        href={pagePaths.adminCreateCuratedAdd}
                      >
                        <Button className={styles.addButton}>
                          <MdAdd /> Add Curated Add
                        </Button>
                      </Link>
                    )
                )
              )}
            </div>
          </div>

          {/* Table */}
          {CURATED.length > 0 ? (
            <RTable columns={columns} data={CURATED} />
          ) : (
            <p className={styles.noRecordFoundMessage}>
              No curated add found. Please add a new one.
            </p>
          )}
        </Card>
      </div>
    </>
  );
}
