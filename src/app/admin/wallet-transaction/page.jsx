"use client";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../../components/Card";
import AdminBreadcrumbs from "../../../components/admin/AdminBreadcrumbs";
import { pagePaths } from "../../../utils/constants/constant";
import lazyLoadable from "../../../utils/lazyLoadable";
import styles from "./styles.module.scss";
import {
  fetchAdminUsers,
  fetchUserWalletTransactions,
} from "../../../redux/action";

const RTable = lazyLoadable(() => import("../../../components/Table/index"));

const UsersManagementPage = () => {
  const { adminWalletTransaction = [] } = useSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  function handleSearch(event) {
    setSearchTerm(event.target.value);
  }

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: (row) => {
          const { first_name, last_name } = row;
          if (!first_name && !last_name) {
            return ""; // Return an empty string if both names are empty or null
          }
          return `${first_name || ""} ${last_name || ""}`.trim(); // Concatenate names, ensuring no null values
        },
      },
      {
        Header: "Transaction Type",
        accessor: "transaction_type",
        Cell: ({ cell }) => {
          return (
            <span className={styles.titleColumn}>
              {" "}
              {cell.row.original.transaction_type == "CREDIT"
                ? "Amount Credit"
                : "Amount Debit"}
            </span>
          );
        },
      },
      {
        Header: "Amount",
        accessor: "amount",
        Cell: ({ cell }) => {
          return (
            <span className={styles.titleColumn}>
              {" "}
              {cell.row.original.transaction_type == "CREDIT" ? "+" : "-"} ₹
              {cell.row.original.amount}
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
              {" "}
              {"+91"} {cell.row.original.mobile_number}
            </span>
          );
        },
      },
      {
        Header: "Transaction Date",
        accessor: "txn_date",
        Cell: ({ cell }) => {
          return (
            <span className={styles.titleColumn}>
              {new Date(cell.row.original.txn_date).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}{" "}
            </span>
          );
        },
      },
    ],
    []
  );
  useEffect(() => {
    dispatch(fetchAdminUsers());
    dispatch(fetchUserWalletTransactions());
  }, [dispatch]);

  const mappedConcerns = useMemo(() => {
    if (!searchTerm.trim()) return adminWalletTransaction;

    const lowercasedSearchTerm = searchTerm.toLowerCase();

    return adminWalletTransaction.filter((au) => {
      const firstName = au.first_name?.toLowerCase() ?? "";
      const lastName = au.last_name?.toLowerCase() ?? "";
      const email = au.email?.toLowerCase() ?? "";
      const mobileNumber = au.mobile_number?.toLowerCase() ?? "";

      return (
        firstName.includes(lowercasedSearchTerm) ||
        lastName.includes(lowercasedSearchTerm) ||
        email.includes(lowercasedSearchTerm) ||
        mobileNumber.includes(lowercasedSearchTerm)
      );
    });
  }, [adminWalletTransaction, searchTerm]);

  return (
    <>
      <div className={styles.container}>
        <AdminBreadcrumbs
          items={[
            {
              path: pagePaths.adminUserWalletTransaction,
              label: "Wallet Transaction Management",
            },
          ]}
        />
        <div>
          <Card className={styles.card}>
            <div className={styles.cardHeader}>
              <p className={styles.title}>Wallet Transaction Management</p>
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            {mappedConcerns?.length ? (
              <RTable columns={columns} data={mappedConcerns || []} />
            ) : (
              <p className={styles.noRecordFoundMessage}>
                No Users found, please add new Orders.
              </p>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default UsersManagementPage;
