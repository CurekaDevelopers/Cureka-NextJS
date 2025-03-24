"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../../components/Card";
import ConfirmationModel from "../../../components/ConfirmationModel";
import AdminBreadcrumbs from "../../../components/admin/AdminBreadcrumbs";
import { deleteConcerns, fetchabondedCart } from "../../../redux/action";
import { setConcerns } from "../../../redux/slices/admin.slice";
import { pagePaths } from "../../../utils/constants/constant";
import lazyLoadable from "../../../utils/lazyLoadable";
import styles from "./styles.module.scss";
import moment from "moment";

const RTable = lazyLoadable(() => import("../../../components/Table/index"));

const UsersManagementPage = () => {
  const { concerns = [] } = useSelector((state) => state.admin);
  const { abondedCart = [] } = useSelector((state) => state.admin);
  const [concernToDelete, setConcernToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  const onDeleteConfirmed = () => {
    if (concernToDelete?.id && concerns?.length) {
      dispatch(
        deleteConcerns(concernToDelete.id, () => {
          const updatedConcernsList = concerns.filter(
            (item) => item.id !== concernToDelete.id
          );
          dispatch(setConcerns(updatedConcernsList || []));
          setConcernToDelete(null);
        })
      );
    }
  };

  const closeDeleteConfirmModal = () => {
    setConcernToDelete(null);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Image",
        accessor: "image",
        Cell: ({ cell }) => {
          return (
            <img
              style={{ height: 50, width: 50 }}
              src={
                cell.row.original.product_images &&
                cell.row.original.product_images[0] &&
                cell.row.original.product_images[0].image
              }
            />
          );
        },
      },
      {
        Header: "Product Name",
        accessor: "vendor_article_name",
        Cell: ({ cell }) => {
          return (
            <span className={styles.titleColumn}>
              {cell.row.original.vendor_article_name}
            </span>
          );
        },
      },
      {
        Header: "Name",
        accessor: "first_name",
        Cell: ({ cell }) => {
          return (
            <span className={styles.titleColumn}>
              {cell.row.original.first_name}
            </span>
          );
        },
      },
      {
        Header: "Mobile",
        accessor: "mobile_number",
        Cell: ({ cell }) => {
          return (
            <span className={styles.titleColumn}>
              {"+91"} {cell.row.original.mobile_number}
            </span>
          );
        },
      },
      {
        Header: "Created Date & Time",
        accessor: "created_at",
        Cell: ({ cell }) => {
          return (
            <span className={styles.titleColumn}>
              {moment(cell.row.original.created_at).format(
                "YYYY-MM-DD HH:mm:ss"
              )}
            </span>
          );
        },
      },
    ],
    []
  );
  useEffect(() => {
    dispatch(fetchabondedCart());
  }, [dispatch]);

  // const mappedCart = abondedCart.map((item) => {
  //   return {
  //     ...item,
  //   };
  // });

  const mappedCart = useMemo(() => {
    if (!searchTerm.trim()) return abondedCart;

    const lowercasedSearchTerm = searchTerm.toLowerCase();

    return abondedCart.filter((au) => {
      const firstName = au.first_name?.toLowerCase() ?? "";
      const lastName = au.last_name?.toLowerCase() ?? "";
      const id = au.id?.toString().toLowerCase() ?? "";
      const vendor_article_name = au.vendor_article_name?.toLowerCase() ?? "";
      const mobileNumber = au.mobile_number?.toLowerCase() ?? "";

      return (
        firstName.includes(lowercasedSearchTerm) ||
        lastName.includes(lowercasedSearchTerm) ||
        id.includes(lowercasedSearchTerm) ||
        vendor_article_name.includes(lowercasedSearchTerm) ||
        mobileNumber.includes(lowercasedSearchTerm)
      );
    });
  }, [abondedCart, searchTerm]);
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
              path: pagePaths.adminAbandonedCart,
              label: "Abandoned Cart ",
            },
          ]}
        />
        <div>
          <Card className={styles.card}>
            <div className={styles.cardHeader}>
              <p className={styles.title}>Abandoned Cart</p>
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            {mappedCart?.length ? (
              <RTable columns={columns} data={mappedCart || []} />
            ) : (
              <p className={styles.noRecordFoundMessage}>No Data found</p>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default UsersManagementPage;
