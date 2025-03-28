"use client";
import _ from "lodash";
import moment from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

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

const RTable = lazyLoadable(() => import("../../../components/Table"));

const SelfAddManagementPage = () => {
  const { curatedAdds } = useSelector((state) => state.admin);
  const YOURSELF = curatedAdds?.YOURSELF || [];
  const [selfAddToDelete, setSelfAddToDelete] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAdminStatus, userRoles } = useSelector((state) => state.auth);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchCuratedAdds());
  }, [dispatch]);

  const onDeleteButtonClicked = (selfAdd) => setSelfAddToDelete(selfAdd);

  const closeDeleteConfirmModal = () => setSelfAddToDelete(null);

  const onDeleteConfirmed = () => {
    if (selfAddToDelete?.id) {
      dispatch(
        deleteCuratedAdd(selfAddToDelete.id, () => {
          const updatedSelfAddList = YOURSELF.filter(
            (item) => item.id !== selfAddToDelete.id
          );
          dispatch(
            setCuratedAdds({ ...curatedAdds, YOURSELF: updatedSelfAddList })
          );
          closeDeleteConfirmModal();
        })
      );
    }
  };

  const onEdit = useCallback(
    (id) => {
      router.push(pagePaths.adminCreateSelfAddEdit.replace(":id", id));
    },
    [router]
  );

  const hasAddPermission = userRoles.some(
    (role) => role.name === "Self Add Management" && role.isAdd === 1
  );
  const hasUpdatePermission = userRoles.some(
    (role) => role.name === "Self Add Management" && role.isUpdate === 1
  );
  const hasDeletePermission = userRoles.some(
    (role) => role.name === "Self Add Management" && role.isDelete === 1
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
            alt="Self Add"
          />
        ),
      },
      { Header: "Url", accessor: "url" },
      { Header: "Status", accessor: "status" },
      {
        Header: "Updated At",
        accessor: "updated_at",
        Cell: ({ cell }) => moment(cell.row.original.start_date).format("ll"),
      },
      {
        Header: "Actions",
        accessor: "Actions",
        Cell: ({ cell }) => (
          <div>
            {isAdminStatus === 1 || hasUpdatePermission ? (
              <EditButton onClick={() => onEdit(cell.row.original.id)} />
            ) : null}
            {isAdminStatus === 1 || hasDeletePermission ? (
              <DeleteButton
                onClick={() => onDeleteButtonClicked(cell.row.original)}
              />
            ) : null}
          </div>
        ),
      },
    ],
    [onEdit, isAdminStatus, hasUpdatePermission, hasDeletePermission]
  );

  return (
    <>
      <ConfirmationModel
        showModal={!!selfAddToDelete}
        ctaTitle="Delete"
        label="Delete Confirmation"
        message={`Are you sure you want to delete the self add ${selfAddToDelete?.name}, Id: ${selfAddToDelete?.id}?`}
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
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <p className={styles.title}>Self Add Management</p>
            {(isAdminStatus === 1 || hasAddPermission) && (
              <Link href={pagePaths.adminCreateSelfAdd}>
                <Button className={styles.addButton}>
                  <MdAdd /> Add Self Add
                </Button>
              </Link>
            )}
          </div>
          {YOURSELF.length ? (
            <RTable columns={columns} data={YOURSELF} />
          ) : (
            <p className={styles.noRecordFoundMessage}>
              No Self Add found, please add a new Self Add.
            </p>
          )}
        </Card>
      </div>
    </>
  );
};

export default SelfAddManagementPage;
