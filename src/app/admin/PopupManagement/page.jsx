"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import { MdAdd } from "react-icons/md";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../../components/Card";
import EditButton from "../../../components/EditButton/index";
import AdminBreadcrumbs from "../../../components/admin/AdminBreadcrumbs";
import { fetchAdminPopupList, deletePopup } from "../../../redux/action";
import { pagePaths } from "../../../utils/constants/constant";
import lazyLoadable from "../../../utils/lazyLoadable";
import styles from "./styles.module.scss";
import {
  setAdminEmail,
  setIsLoggedIn,
  setUserRoles,
} from "../../../redux/slices/auth.slice";
import ConfirmationModel from "../../../components/ConfirmationModel";
import DeleteButton from "../../../components/DeleteButton/index";
import { setAdminPopupList } from "../../../redux/slices/admin.slice";

const RTable = lazyLoadable(() => import("../../../components/Table/index"));

const PopupManagementPage = () => {
  const { adminPopupList } = useSelector((state) => state.admin);
  const [popupToDelete, setPopupToDelete] = useState(null);
  const navigate = useRouter();
  const dispatch = useDispatch();
  const { isAdminStatus, userRoles } = useSelector((state) => state.auth);
  const onEdit = useCallback(
    (id) => {
      navigate.push(pagePaths.adminPopupManagementEdit.replace(":id", id));
    },
    [navigate]
  );
  const onDeleteButtonClicked = (brand) => {
    setPopupToDelete(brand);
  };
  const onDeleteConfirmed = () => {
    if (popupToDelete?.id && adminPopupList?.length) {
      dispatch(
        deletePopup(popupToDelete.id, () => {
          const updatedPopupList = adminPopupList.filter(
            (item) => item.id !== popupToDelete.id
          );
          dispatch(setAdminPopupList(updatedPopupList || []));
          setPopupToDelete(null);
        })
      );
    }
  };

  const closeDeleteConfirmModal = () => {
    setPopupToDelete(null);
  };
  useEffect(() => {
    fetchAdminPopupList();
  }, [dispatch]);
  const rolesPermission = userRoles.filter(
    (item) => item.name == "Popup Management"
  );

  const columns = useMemo(
    () => [
      {
        Header: "Popup ID",
        accessor: "id",
      },
      {
        Header: "Popup Name",
        accessor: "name",
      },
      {
        Header: "Image",
        accessor: "image",
        Cell: ({ cell }) => {
          const firstImageUrl = cell.row.original.image;
          return <img style={{ height: 50, width: 50 }} src={firstImageUrl} />;
        },
      },
      {
        Header: "Coupon",
        accessor: "coupon_code",
        Cell: ({ cell }) => {
          return (
            <span className={styles.titleColumn}>
              {cell.row.original.coupon_code
                ? cell.row.original.coupon_code
                : "No Coupons"}
            </span>
          );
        },
      },
      {
        Header: "Count Down",
        accessor: "count_down",
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
    []
  );
  const mappedCustomerOrders = adminPopupList.map((item) => {
    return {
      ...item,
    };
  });

  return (
    <div className={styles.container}>
      <AdminBreadcrumbs
        items={[
          {
            path: pagePaths.adminPopupManagement,
            label: "Popup Management",
          },
        ]}
      />
      <div>
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <p className={styles.title}>Popup Management</p>
            <div>
              {isAdminStatus == 1 ? (
                <Link href={pagePaths.adminPopupManagementAdd}>
                  <Button className={styles.addButton}>
                    <span className="flex items-center gap-1">
                      <MdAdd /> Add Popup
                    </span>
                  </Button>
                </Link>
              ) : (
                <>
                  {rolesPermission &&
                    rolesPermission.map((role) => (
                      <div key={role.roleId}>
                        {role.isAdd == 1 && (
                          <Link href={pagePaths.adminPopupManagementAdd}>
                            <Button className={styles.addButton}>
                              <MdAdd /> Add Popup
                            </Button>
                          </Link>
                        )}
                      </div>
                    ))}
                </>
              )}
            </div>
          </div>
          {mappedCustomerOrders?.length ? (
            <RTable columns={columns} data={mappedCustomerOrders || []} />
          ) : (
            <p className={styles.noRecordFoundMessage}>
              No Popup found, please add new Popup.
            </p>
          )}
        </Card>
      </div>
      <ConfirmationModel
        showModal={!!popupToDelete}
        ctaTitle={"Delete"}
        label={"Delete Confirmation"}
        message={`Are you sure you want to delete the coupon ${popupToDelete?.name}, Id: ${popupToDelete?.id}`}
        hideModal={closeDeleteConfirmModal}
        confirmModal={onDeleteConfirmed}
      />
    </div>
  );
};

export default PopupManagementPage;
