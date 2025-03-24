"use client";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../../components/Card";
import ConfirmationModel from "../../../components/ConfirmationModel";
import AdminBreadcrumbs from "../../../components/admin/AdminBreadcrumbs";
import { deleteConcerns, fetchAdminUsers } from "../../../redux/action";
import { setConcerns } from "../../../redux/slices/admin.slice";
import { pagePaths } from "../../../utils/constants/constant";
import lazyLoadable from "../../../utils/lazyLoadable";
import styles from "./styles.module.scss";
import { Modal, Button, Form } from "react-bootstrap";
import { env } from "../../../config/env.config";
import { initializeCashfree } from "../../../utils/cashfree.utils";
import toast from "react-hot-toast";
import axios from "axios";
import * as XLSX from "xlsx";

const RTable = lazyLoadable(() => import("../../../components/Table/index"));

const UsersManagementPage = () => {
  const { concerns = [] } = useSelector((state) => state.admin);
  const { allusers = [] } = useSelector((state) => state.admin);
  const [concernToDelete, setConcernToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [custNumber, setCustNumber] = useState("");
  const [userID, setUserID] = useState("");
  const { adminEmail } = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (number, id) => {
    setCustNumber(number);
    setUserID(id);
    setShow(true);
  };
  const [userAmount, setUserAmount] = useState("");

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
  function handleSearch(event) {
    setSearchTerm(event.target.value);
  }

  const closeDeleteConfirmModal = () => {
    setConcernToDelete(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const todayDate = new Date().toISOString().split("T")[0];
    const formData = {
      txn_type: "CREDIT",
      amount: userAmount,
      transaction_id: todayDate,
      userId: userID,
    };
    try {
      const response = await axios.post(
        `${env.REACT_SERVER_BASE_URL}/user/account/addfunds`,
        formData
      );
      toast.success(response && response.data && response.data.message);
      handleClose(); // Close the modal after submission
      setUserAmount("");
    } catch (error) {
      const edata = error.response.data;
      toast.error(edata && edata.error);
    }
  };

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
          } else if (last_name && last_name !== "null") {
            return `${first_name || ""} ${last_name || ""}`.trim(); // Concatenate names, ensuring no null values
          } else {
            return first_name; // Return only first name if last name is not valid
          }
        },
      },
      {
        Header: "Email",
        accessor: "email",
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
        Header: "Actions",
        accessor: "Actions",
        Cell: ({ cell }) => {
          return (
            <div>
              <Button
                variant="primary"
                className={styles.addButton}
                onClick={() =>
                  handleShow(
                    cell.row.original.mobile_number,
                    cell.row.original.id
                  )
                }
              >
                Add Money to Wallet
              </Button>
            </div>
          );
        },
      },
    ],
    []
  );
  useEffect(() => {
    dispatch(fetchAdminUsers());
  }, [dispatch]);

  const mappedConcerns = useMemo(() => {
    if (!searchTerm.trim()) return allusers;

    const lowercasedSearchTerm = searchTerm.toLowerCase();

    return allusers.filter((au) => {
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
  }, [allusers, searchTerm]);
  const exportToExcel = () => {
    try {
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(mappedConcerns); // Use filteredBrands here
      XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
      XLSX.writeFile(workbook, "Users.xlsx");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
    }
  };

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
              path: pagePaths.adminUserManagement,
              label: "Users Management",
            },
          ]}
        />
        <div>
          <Card className={styles.card}>
            <div className={styles.cardHeader}>
              <p className={styles.title}>Users Management</p>
            </div>
            <div className="d-flex">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
              <div className="ml-auto">
                <Button className={styles.addButton} onClick={exportToExcel}>
                  Export to Excel
                </Button>
              </div>
            </div>

            {mappedConcerns?.length ? (
              <RTable columns={columns} data={mappedConcerns || []} />
            ) : (
              <p className={styles.noRecordFoundMessage}>
                No Users found, please add new Orders.
              </p>
            )}
          </Card>
          <Modal show={show} onHide={handleClose} id="moneyModal">
            {/* <!-- Modal Header --> */}
            <Modal.Header closeButton>
              <Modal.Title>Add Money to Wallet</Modal.Title>
            </Modal.Header>
            {/* <!-- Modal body --> */}
            <div className="modal-body d-flex-column justify-content-center">
              <Modal.Body className="d-flex-column modal-space">
                <Form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="amount" htmlFor="amount">
                      Amount
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="amount"
                      id="amount"
                      placeholder="Enter Amount"
                      onChange={(e) => setUserAmount(e.target.value)}
                      required
                      min="1"
                    />
                  </div>
                  <Button
                    className={styles.addButton}
                    variant="primary"
                    type="submit"
                  >
                    Add Money
                  </Button>
                </Form>
              </Modal.Body>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default UsersManagementPage;
