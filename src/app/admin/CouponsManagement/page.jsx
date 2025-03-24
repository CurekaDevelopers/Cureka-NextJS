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
import { deleteCoupons, fetchCoupons } from "../../../redux/action";
import { setCoupons } from "../../../redux/slices/admin.slice";
import { pagePaths } from "../../../utils/constants/constant";
import lazyLoadable from "../../../utils/lazyLoadable";
import styles from "./styles.module.scss";

const RTable = lazyLoadable(() => import("../../../components/Table/index"));

const CouponsManagementPage = () => {
  const { coupons } = useSelector((state) => state.admin);
  const [couponToDelete, setCouponToDelete] = useState(null);
  const navigate = useRouter();
  const { isAdminStatus, userRoles } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCoupons());
  }, [dispatch]);

  const onDeleteButtonClicked = (brand) => {
    setCouponToDelete(brand);
  };

  const onDeleteConfirmed = () => {
    if (couponToDelete?.id && coupons?.length) {
      dispatch(
        deleteCoupons(couponToDelete.id, () => {
          const updatedConcernsList = coupons.filter(
            (item) => item.id !== couponToDelete.id
          );
          dispatch(setCoupons(updatedConcernsList || []));
          setCouponToDelete(null);
        })
      );
    }
  };

  const closeDeleteConfirmModal = () => {
    setCouponToDelete(null);
  };
  // const onEdit
  const onEdit =
    useCallback();
    //   (id) => {
    //     navigate.push(pagePaths.adminCreateCouponEdit.replace(":id", id));
    //   },
    //   [navigate]
  const rolesPermission = userRoles.filter(
    (item) => item.name == "Coupons Management"
  );

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ cell }) => {
          return (
            <span className={styles.titleColumn}>{cell.row.original.name}</span>
          );
        },
      },
      {
        Header: "Coupon code",
        accessor: "coupon_code",
      },
      {
        Header: "Offer Amount",
        accessor: "offer_amount",
      },
      {
        Header: "Start Date",
        accessor: "start_date",
        Cell: ({ cell }) => {
          return <>{moment(cell.row.original.start_date).format("ll")}</>;
        },
      },
      {
        Header: "End Date",
        accessor: "end_date",
        Cell: ({ cell }) => {
          return <>{moment(cell.row.original.end_date).format("ll")}</>;
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

  const mappedCoupons = coupons.map((item) => {
    return {
      ...item,
    };
  });

  return (
    <>
      <ConfirmationModel
        showModal={!!couponToDelete}
        ctaTitle={"Delete"}
        label={"Delete Confirmation"}
        message={`Are you sure you want to delete the coupon ${couponToDelete?.name}, Id: ${couponToDelete?.id}`}
        hideModal={closeDeleteConfirmModal}
        confirmModal={onDeleteConfirmed}
      />
      <div className={styles.container}>
        <AdminBreadcrumbs
          items={[
            {
              path: pagePaths.adminCoupon,
              label: "Coupons Management",
            },
          ]}
        />
        <div>
          <Card className={styles.card}>
            <div className={styles.cardHeader}>
              <p className={styles.title}>Coupons Management</p>
              <div>
                {isAdminStatus == 1 ? (
                  <Link href={pagePaths.adminCreateCoupon}>
                    <Button className={styles.addButton}>
                      <MdAdd /> Add Coupons
                    </Button>
                  </Link>
                ) : (
                  <>
                    {rolesPermission &&
                      rolesPermission.map((role) => (
                        <div key={role.roleId}>
                          {role.isAdd == 1 && (
                            <Link href={pagePaths.adminCreateCoupon}>
                              <Button className={styles.addButton}>
                                <MdAdd /> Add Coupons
                              </Button>
                            </Link>
                          )}
                        </div>
                      ))}
                  </>
                )}
              </div>
            </div>
            {mappedCoupons?.length ? (
              <RTable columns={columns} data={mappedCoupons || []} />
            ) : (
              <p className={styles.noRecordFoundMessage}>
                No Coupons found, please add new Coupon.
              </p>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default CouponsManagementPage;
