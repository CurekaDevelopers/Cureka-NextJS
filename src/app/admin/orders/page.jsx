"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MdAdd } from "react-icons/md";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../../components/Card";
import EditButton from "../../../components/EditButton/index";
import AdminBreadcrumbs from "../../../components/admin/AdminBreadcrumbs";
import { fetchOrdersForAdmin } from "../../../redux/action";
import { pagePaths } from "../../../utils/constants/constant";
import lazyLoadable from "../../../utils/lazyLoadable";
import styles from "./styles.module.scss";
import moment from "moment";
import { Button, Modal } from "react-bootstrap";
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";
import RejectButton from "../../../components/RejectButton";
import { env } from "../../../config/env.config";

const RTable = lazyLoadable(() => import("../../../components/Table/index"));

const OrderManagementPage = () => {
  // customerAdminOrders
  const { customerAdminOrders = [] } = useSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState("");
  const [show, setShow] = useState(false);
  const [productData, setProductData] = useState([]);
  const navigate = useRouter();
  const dispatch = useDispatch();
  const [selectedFromDate, setSelectedFromDate] = useState(null);
  const [selectedToDate, setSelectedToDate] = useState(null);
  const [adminOrderList, setAdminOrderList] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const { isAdminStatus, userRoles } = useSelector((state) => state.auth);
  const [cancellationReason, setCancellationReason] = useState("");
  const [orderCancelClose, setOrderCancelClose] = useState(false);
  const [orderId, setOrdeId] = useState(false);

  const { adminAccessToken } = useSelector((state) => state.auth);

  const handleFromDateChange = (date) => {
    setSelectedFromDate(date);
  };
  const handleToDateChange = async (date) => {
    setSelectedToDate(date);
    if (date) {
      const encodedstartDate = encodeURIComponent(
        selectedFromDate && selectedFromDate.format("YYYY-MM-DD h:mm:ss")
      );
      const encodedendtDate = encodeURIComponent(
        date && date.format("YYYY-MM-DD h:mm:ss")
      );
      // console.log(encodedendtDate, 'encodedendtDate',encodedendtDate,'encodedendtDate')
      if (encodedstartDate && encodedendtDate) {
        try {
          const url = `${env.REACT_SERVER_BASE_URL}/api/v1/checkout/adminOrders?start_date=${encodedstartDate}&end_date=${encodedendtDate}`;
          const response = await axios.get(url);
          // console.log(response.data, "response")
          setAdminOrderList(response && response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
          // Handle error state or notify user
        }
      } else {
        toast.error("Please Select From Date And To Date");
      }
    }
  };
  useEffect(() => {
    fetchOrdersForAdmin();
    const fetchAdminOrderList = async () => {
      try {
        const response = await axios.get(
          `${env.REACT_SERVER_BASE_URL}/api/v1/checkout/adminOrders`
        );
        setAdminOrderList(response && response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state or notify user
      }
    };
    fetchAdminOrderList();
  }, [dispatch]);

  const onEdit = useCallback(
    (id) => {
      navigate.push(pagePaths.adminEditOrder.replace(":id", id));
    },
    [navigate]
  );
  const handleClose = () => setShow(false);

  const hadleProductData = async (id) => {
    try {
      const response = await axios.get(
        `${env.REACT_SERVER_BASE_URL}/api/v1/checkout/getAdminOrderDetails/${id}`
      );
      if (response.data) {
        setProductData(response && response.data);
        setShow(true);
      } else {
        setShow(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error state or notify user
    }
  };
  const rolesPermission = userRoles.filter(
    (item) => item.name == "Order Management"
  );
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "order_id",
      },
      {
        Header: "Order Date & Time",
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
      {
        Header: "Status",
        accessor: "order_placed_status",
      },
      {
        Header: "Customer Name",
        accessor: "first_name",
        Cell: ({ cell }) => {
          return (
            <span className={styles.titleColumn}>
              {cell.row.original.shipping_address.name}
            </span>
          );
        },
      },
      {
        Header: "Coupons",
        accessor: "coupon_code",
        Cell: ({ cell }) => {
          return (
            <>
              {cell.row.original.coupon_code
                ? cell.row.original.coupon_code
                : "No Coupons"}
            </>
          );
        },
      },
      // {
      //   Header: "Products",
      //   accessor: "Products",
      //   Cell: ({ cell }) => {
      //     return (
      //       <>
      //         {/* <EditButton /> */}
      //         <h6 style={{ color: "#007bff" }}
      //           // onClick={hadleProductData(cell.row.original.order_id)}
      //           onClick={() => hadleProductData(cell.row.original.order_id)}
      //         >View</h6>
      //       </>
      //     );
      //   },
      // },
      {
        Header: "Payment",
        accessor: "is_cod",
        Cell: ({ cell }) => {
          return (
            <>
              {/* {cell.row.original.is_cod === 1 ? "COD" : "Online Transaction"} */}
              {cell.row.original.is_cod == 1
                ? "COD"
                : cell.row.original.is_wallet_option == 1
                ? "Wallet Transaction" // When wallet option is selected and not COD
                : "Online Transaction"}
            </>
          );
        },
      },
      {
        Header: "Wallat Money",
        accessor: "walletMoneyUsed",
        Cell: ({ cell }) => {
          return <>₹ {Number(cell.row.original.walletMoneyUsed).toFixed(2)}</>;
        },
      },
      {
        Header: "Total Amount",
        accessor: "subtotal",
        Cell: ({ cell }) => {
          return <>₹ {Number(cell.row.original.subtotal).toFixed(2)}</>;
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
                  <EditButton
                    onClick={() => onEdit(cell.row.original.order_id)}
                  />
                  {cell.row.original.order_placed_status !== "Cancelled" ? (
                    <RejectButton
                      onClick={() =>
                        handleCancelOrder(
                          cell.row.original.order_id,
                          "Cancel Order"
                        )
                      }
                    />
                  ) : (
                    ""
                  )}
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
                        {cell.row.original.order_placed_status !== "Cancelled"
                          ? role.isDelete == 1 && (
                              <RejectButton
                                onClick={() =>
                                  handleCancelOrder(
                                    cell.row.original.order_id,
                                    "Rejected"
                                  )
                                }
                              />
                            )
                          : ""}
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
  const mappedCustomerOrders = useMemo(() => {
    if (!searchTerm.trim()) return adminOrderList;
    return adminOrderList.filter(
      (item) =>
        item.shipping_address.name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (item.order_id && item.order_id.toString().includes(searchTerm)) ||
        item.coupon_code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.order_placed_status
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  }, [adminOrderList, searchTerm]);
  // console.log(adminOrderList,'adminOrderList')
  const exportToExcel = () => {
    try {
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(adminOrderList); // Use filteredBrands here
      XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
      XLSX.writeFile(workbook, "Orders.xlsx");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
    }
  };

  //handle cancel order
  const handleSubmitCancelOrder = async () => {
    if (cancellationReason) {
      const token = adminAccessToken;
      const formData = {
        orderId: orderId,
        cancellationReason: cancellationReason,
      };
      try {
        const response = await axios.post(
          `${env.REACT_SERVER_BASE_URL}/api/v1/checkout/cancelOrder`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        let data = response;
        // console.log(data,'data',data.errors)
        if (data) {
          toast.success(data && data.errors && data.errors[0].message);
          setOrderCancelClose(false);
          setCancellationReason("");
          window.location.reload();
        }
      } catch (error) {
        const edata = error.response.data;
        toast.error(edata && edata.error);
      }
    } else {
      toast.error("Please Enter Cancellation Reason");
    }
  };
  const handleCancelOrder = (id) => {
    setOrdeId(id);
    setOrderCancelClose(true);
  };
  const handleOrderCancelClose = () => {
    setOrderCancelClose(false);
  };
  return (
    <div className={styles.container}>
      <AdminBreadcrumbs
        items={[
          {
            path: pagePaths.adminOrders,
            label: "Orders Management",
          },
        ]}
      />
      <div>
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <p className={styles.title}>Orders Management</p>
          </div>
          <div className="d-flex">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <div className="ml-2">
              <DateTime
                value={selectedFromDate}
                onChange={handleFromDateChange}
                inputProps={{ placeholder: "Select From Date" }}
                dateFormat="YYYY-MM-DD"
                timeFormat="HH:mm:ss"
              />
            </div>
            <div className="ml-2">
              <DateTime
                value={selectedToDate}
                onChange={handleToDateChange}
                inputProps={{ placeholder: "Select To Date" }}
                dateFormat="YYYY-MM-DD"
                timeFormat="HH:mm:ss"
              />
            </div>
            <div className="ml-auto">
              <Button className={styles.addButton} onClick={exportToExcel}>
                Export to Excel
              </Button>
              {isAdminStatus == 1 ? (
                <Link href={pagePaths.adminCreateOrder}>
                  <Button className={styles.addButton}>
                    <MdAdd /> Add Order
                  </Button>
                </Link>
              ) : (
                <>
                  <Button className={styles.addButton} onClick={exportToExcel}>
                    Export to Excel
                  </Button>
                  {rolesPermission &&
                    rolesPermission.map((role) => (
                      <div key={role.roleId}>
                        {role.isAdd == 1 && (
                          <Link href={pagePaths.adminCreateOrder}>
                            <Button className={styles.addButton}>
                              <MdAdd /> Add Order
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
              No orders found, please add new Orders.
            </p>
          )}
        </Card>
        <div style={{ width: "150%" }}>
          <Modal show={show} onHide={handleClose} id="rateproductModal">
            <Modal.Header closeButton className="mx-0"></Modal.Header>
            <Modal.Body>
              <div className="modal-dialog">
                <div className="modal-content border-0">
                  <h4>Product Details</h4>
                  {productData.length > 0 && (
                    <>
                      <table className="table table-striped mt-3">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          {productData &&
                            productData.map((productName) => (
                              <tr key={productName.product_id}>
                                <td>{productName.product_id}</td>
                                <td>{productName.product_name}</td>
                                <td>{productName.product_price}</td>
                                <td>{productName.quantity}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </>
                  )}
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>

        <div style={{ width: "150%" }}>
          <Modal
            show={orderCancelClose}
            onHide={handleOrderCancelClose}
            id="rateproductModal"
          >
            <Modal.Header closeButton className="mx-0"></Modal.Header>
            <Modal.Body>
              <div className="form-group" style={{ width: "400px" }}>
                <label className="rate-product" htmlFor="title">
                  Cancellation Reason
                </label>

                <textarea
                  className="form-control"
                  type="text"
                  id="cancellationReason"
                  name="cancellationReason"
                  placeholder="Enter Cancellation Reason"
                  rows={3}
                  cols={3}
                  value={cancellationReason}
                  onChange={(e) => setCancellationReason(e.target.value)}
                  required
                />
              </div>
              <div className="submit-btn">
                <Button
                  onClick={handleSubmitCancelOrder}
                  className={styles.addButton}
                >
                  Submit
                </Button>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default OrderManagementPage;
