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
import DeleteButton from "../../../components/DeleteButton";
import EditButton from "../../../components/EditButton";
import AdminBreadcrumbs from "../../../components/admin/AdminBreadcrumbs";
import { deleteCoupons, fetchCoupons } from "../../../redux/action";
import { setCoupons } from "../../../redux/slices/admin.slice";
import { pagePaths } from "../../../utils/constants/constant";
import lazyLoadable from "../../../utils/lazyLoadable";
import styles from "./styles.module.scss";

const RTable = lazyLoadable(() => import("../../../components/Table"));

const CouponsManagementPage = () => {
  const { coupons } = useSelector((state) => state.admin);
  const { isAdminStatus, userRoles } = useSelector((state) => state.auth);
  const [couponToDelete, setCouponToDelete] = useState(null);
  const dispatch = useDispatch();
  const navigate = useRouter();

  useEffect(() => {
    dispatch(fetchCoupons());
  }, [dispatch]);

  const onDeleteButtonClicked = (coupon) => {
    setCouponToDelete(coupon);
  };

  const onDeleteConfirmed = () => {
    if (couponToDelete?.id && coupons?.length) {
      dispatch(
        deleteCoupons(couponToDelete.id, () => {
          dispatch(
            setCoupons(coupons.filter((item) => item.id !== couponToDelete.id))
          );
          setCouponToDelete(null);
        })
      );
    }
  };

  const closeDeleteConfirmModal = () => {
    setCouponToDelete(null);
  };

  const onEdit = useCallback(
    (id) => {
      navigate.push(pagePaths.adminCreateCouponEdit.replace(":id", id));
    },
    [navigate]
  );

  const rolesPermission = useMemo(
    () => userRoles.find((item) => item.name === "Coupons Management"),
    [userRoles]
  );

  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ cell }) => (
          <span className={styles.titleColumn}>{cell.row.original.name}</span>
        ),
      },
      { Header: "Coupon Code", accessor: "coupon_code" },
      { Header: "Offer Amount", accessor: "offer_amount" },
      {
        Header: "Start Date",
        accessor: "start_date",
        Cell: ({ cell }) => moment(cell.row.original.start_date).format("ll"),
      },
      {
        Header: "End Date",
        accessor: "end_date",
        Cell: ({ cell }) => moment(cell.row.original.end_date).format("ll"),
      },
      { Header: "Status", accessor: "status" },
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
              rolesPermission && (
                <>
                  {rolesPermission.isUpdate === 1 && (
                    <EditButton onClick={() => onEdit(cell.row.original.id)} />
                  )}
                  {rolesPermission.isDelete === 1 && (
                    <DeleteButton
                      onClick={() => onDeleteButtonClicked(cell.row.original)}
                    />
                  )}
                </>
              )
            )}
          </div>
        ),
      },
    ],
    [isAdminStatus, onEdit, rolesPermission]
  );

  return (
    <>
      <ConfirmationModel
        showModal={!!couponToDelete}
        ctaTitle="Delete"
        label="Delete Confirmation"
        message={`Are you sure you want to delete the coupon ${couponToDelete?.name}, Id: ${couponToDelete?.id}?`}
        hideModal={closeDeleteConfirmModal}
        confirmModal={onDeleteConfirmed}
      />
      <div className={styles.container}>
        <AdminBreadcrumbs
          items={[{ path: pagePaths.adminCoupon, label: "Coupons Management" }]}
        />
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <p className={styles.title}>Coupons Management</p>
            {isAdminStatus === 1 || rolesPermission?.isAdd === 1 ? (
              <Link href={pagePaths.adminCreateCoupon}>
                <Button className={styles.addButton}>
                  <MdAdd /> Add Coupons
                </Button>
              </Link>
            ) : null}
          </div>
          {coupons?.length > 0 ? (
            <RTable columns={columns} data={coupons} />
          ) : (
            <p className={styles.noRecordFoundMessage}>
              No Coupons found, please add a new coupon.
            </p>
          )}
        </Card>
      </div>
    </>
  );
};

export default CouponsManagementPage;
