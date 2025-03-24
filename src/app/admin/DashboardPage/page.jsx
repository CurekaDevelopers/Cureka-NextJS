"use client";
import axios from "axios";
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useMemo, useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";
import shopping from "../../../public/svg-components/bag-shopping-solid.svg";
import dollar from "../../../public/svg-components/dollar-sign-solid.svg";
import file from "../../../public/svg-components/file-contract-solid.svg";
import users from "../../../public/svg-components/users-solid.svg";
import AdminBreadcrumbs from "../../../components/admin/AdminBreadcrumbs";
import DashboardChart from "../../../components/admin/DashboardChart";
import { env } from "../../../config/env.config";
import { pagePaths } from "../../../utils/constants/constant";
import lazyLoadable from "../../../utils/lazyLoadable";
import styles from "./styles.module.scss";
const RTable = lazyLoadable(() => import("../../../components/Table/index"));

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const DashboardPage = () => {
  const { isAdminStatus } = useSelector((state) => state.auth);
  const [getSalesList, setGetSalesList] = useState({});
  const [getProductsRevenueList, setGetProductsRevenueList] = useState({});
  const [selectedFromDate, setSelectedFromDate] = useState(null);
  const [selectedToDate, setSelectedToDate] = useState(null);
  const [selectedProRevFromDate, setSelectedProRevFromDate] = useState(null);
  const [selectedProRevToDate, setSelectedProRevToDate] = useState(null);
  const gList = getProductsRevenueList;
  useEffect(() => {
    const fetchSalesList = async () => {
      try {
        const response = await axios.get(
          `${env.REACT_SERVER_BASE_URL}/dashboard/dashboard`
        );
        setGetSalesList(response && response.data && response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchSalesList();
    const fetchProductsAndRevenuList = async () => {
      try {
        const response = await axios.get(
          `${env.REACT_SERVER_BASE_URL}/dashboard/overview`
        );
        setGetProductsRevenueList(
          response && response.data && response.data.results
        );
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state or notify user
      }
    };
    fetchProductsAndRevenuList();
  }, []);
  console.log(getProductsRevenueList, "getProductsRevenueList");

  const pieChartData = {
    labels:
      getProductsRevenueList &&
      getProductsRevenueList.top5CategoryWiseData &&
      getProductsRevenueList.top5CategoryWiseData.map((item) => item.key),
    datasets: [
      {
        label: "Sales",
        data:
          getProductsRevenueList &&
          getProductsRevenueList.top5CategoryWiseData &&
          getProductsRevenueList.top5CategoryWiseData.map((item) => item.value),
        backgroundColor: [
          "rgba(0, 227, 150, 1)",
          "rgba(254, 176, 25, 1)",
          "rgba(0, 143, 251, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderColor: [
          "rgba(255,255,255, 1)",
          "rgba(255,255,255, 1)",
          "rgba(255,255,255, 1)",
          "rgba(255,255,255, 1)",
          "rgba(255,255,255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
  };

  const labels =
    getProductsRevenueList &&
    getProductsRevenueList.salesOverview &&
    getProductsRevenueList.salesOverview.map((item) => item.month);
  const totalVisitorsData =
    getProductsRevenueList &&
    getProductsRevenueList.salesOverview &&
    getProductsRevenueList.salesOverview.map((item) => item.visitorsCount);
  const totalSalesData =
    getProductsRevenueList &&
    getProductsRevenueList.salesOverview &&
    getProductsRevenueList.salesOverview.map((item) => parseFloat(item.sales));
  const lineData = {
    labels,
    datasets: [
      {
        label: "Total Visitors",
        data: totalVisitorsData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Total Sales",
        data: totalSalesData,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const categoryColumns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "key",
      },
      {
        Header: "Purchased",
        accessor: "value",
      },
    ],
    []
  );
  const brandColumns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "key",
      },
      {
        Header: "Purchased",
        accessor: "value",
      },
    ],
    []
  );
  const concernColumns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "key",
      },
      {
        Header: "Purchased",
        accessor: "value",
      },
    ],
    []
  );
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
      if (encodedstartDate && encodedendtDate) {
        try {
          const url = `${env.REACT_SERVER_BASE_URL}/dashboard/dashboard?start_date=${encodedstartDate}&end_date=${encodedendtDate}`;
          const response = await axios.get(url);
          setGetSalesList(response && response.data && response.data.results);
          const url2 = `${env.REACT_SERVER_BASE_URL}/dashboard/overview?start_date=${encodedstartDate}&end_date=${encodedendtDate}`;
          const responseData = await axios.get(url2);
          setGetProductsRevenueList(
            responseData && responseData.data && responseData.data.results
          );
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        toast.error("Please Select From Date And To Date");
      }
    }
  };

  const exportToSalesExcel = () => {
    try {
      const workbook = XLSX.utils.book_new();
      const arrayData = [getSalesList];
      const worksheet = XLSX.utils.json_to_sheet(arrayData); // Use filteredBrands here
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sales");
      XLSX.writeFile(workbook, "Sales.xlsx");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
    }
  };

  return (
    <div className={styles.container}>
      <AdminBreadcrumbs
        items={[
          {
            path: pagePaths.adminDashboard,
            label: "Dashboard",
          },
        ]}
      />
      {isAdminStatus == 1 ? (
        <>
          <div className="row">
            <div className="col-lg-3">
              <div className={styles.dashboard}>
                <DateTime
                  value={selectedFromDate}
                  onChange={handleFromDateChange}
                  inputProps={{ placeholder: "Select From Date" }}
                  dateFormat="YYYY-MM-DD"
                  timeFormat="HH:mm:ss"
                />
              </div>
            </div>
            <div className="col-lg-3">
              <div className={styles.dashboard}>
                <DateTime
                  value={selectedToDate}
                  onChange={handleToDateChange}
                  inputProps={{ placeholder: "Select To Date" }}
                  dateFormat="YYYY-MM-DD"
                  timeFormat="HH:mm:ss"
                />
              </div>
            </div>
            {/* <div className="col-lg-3">
              <div className={styles.dashboard}>
                <Button className={styles.addButton} onClick={exportToSalesExcel}>Export to Excel</Button>
              </div>
            </div> */}
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className={styles.card}>
                <div className={styles.dashboard}>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <div className={styles.circle}>
                        <img
                          className={styles.icon}
                          src={shopping}
                          width={"25px"}
                          height={"25px"}
                        />
                      </div>
                      <div className="ml-3">
                        <p>Total Sales</p>
                        <h5 className={styles.sales}>
                          {getSalesList && getSalesList.totalSales}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className={styles.card}>
                <div className={styles.dashboard}>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <div className={styles.circleone}>
                        <img
                          className={styles.icon}
                          src={dollar}
                          width={"25px"}
                          height={"25px"}
                        />
                      </div>
                      <div className="ml-3">
                        <p>Total Income</p>
                        <h5 className={styles.sales}>
                          {getSalesList && getSalesList.totalIncome}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className={styles.card}>
                <div className={styles.dashboard}>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <div className={styles.circletwo}>
                        <img
                          className={styles.icon}
                          src={file}
                          width={"25px"}
                          height={"25px"}
                        />
                      </div>
                      <div className="ml-3">
                        <p>Current Day Sales</p>
                        <h5 className={styles.sales}>
                          {getSalesList && getSalesList.currentDaySales}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className={styles.card}>
                <div className={styles.dashboard}>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <div className={styles.circlethree}>
                        <img
                          className={styles.icon}
                          src={users}
                          width={"25px"}
                          height={"25px"}
                        />
                      </div>
                      <div className="ml-3">
                        <p>Total Visitors</p>
                        <h5 className={styles.sales}>
                          {getSalesList && getSalesList.vistorsCount}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="row">
            <div className="col-lg-3">
              <div className={styles.dashboard}>
                <DateTime
                  value={selectedProRevFromDate}
                  onChange={handleProRevFromDateChange}
                  inputProps={{ placeholder: "Select From Date" }}
                  dateFormat="YYYY-MM-DD"
                  timeFormat="HH:mm:ss"
                />
              </div>
            </div>
            <div className="col-lg-3">
              <div className={styles.dashboard}>
                <DateTime
                  value={selectedProRevToDate}
                  onChange={handleProRevToDateChange}
                  inputProps={{ placeholder: "Select To Date" }}
                  dateFormat="YYYY-MM-DD"
                  timeFormat="HH:mm:ss"
                />
              </div>
            </div> <div className="col-lg-3">
              <div className={styles.dashboard}>
                <Button className={styles.addButton} onClick={exportToProRevExcel}>Export to Excel 12</Button>
              </div>
            </div>
          </div> */}
          <div className="row">
            <div className="col-lg-4">
              <div className={styles.card}>
                <div className={styles.dashboard}>
                  <h5 className={styles.sales}>Products overview</h5>
                  {getProductsRevenueList &&
                  getProductsRevenueList.top5CategoryWiseData &&
                  getProductsRevenueList.top5CategoryWiseData.length > 0 ? (
                    <Pie data={pieChartData} />
                  ) : (
                    <p>No data found</p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className={styles.card}>
                <div className={styles.dashboard}>
                  <h5 className={styles.sales}>Sales Overview</h5>
                  <Line options={options} data={lineData} />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className={styles.dashboard}>
                <h5 className={styles.sales}>Total Earnings</h5>
                <DashboardChart
                  barData={
                    getProductsRevenueList &&
                    getProductsRevenueList.totalEarnings
                  }
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className={styles.card}>
                <div className={styles.dashboard}>
                  <h5 className={styles.sales}>Category Data</h5>
                  {getProductsRevenueList &&
                  getProductsRevenueList.categoryByData &&
                  getProductsRevenueList.categoryByData.length > 0 ? (
                    <RTable
                      columns={categoryColumns}
                      data={
                        (getProductsRevenueList &&
                          getProductsRevenueList.categoryByData) ||
                        []
                      }
                    />
                  ) : (
                    <p className={styles.noRecordFoundMessage}>
                      No Category Data found
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className={styles.card}>
                <div className={styles.dashboard}>
                  <h5 className={styles.sales}>Brand Data</h5>
                  {getProductsRevenueList &&
                  getProductsRevenueList.brandByData &&
                  getProductsRevenueList.brandByData.length > 0 ? (
                    <RTable
                      columns={brandColumns}
                      data={
                        (getProductsRevenueList &&
                          getProductsRevenueList.brandByData) ||
                        []
                      }
                    />
                  ) : (
                    <p className={styles.noRecordFoundMessage}>
                      No Brand Data found
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className={styles.card}>
                <div className={styles.dashboard}>
                  <h5 className={styles.sales}>Concern Data</h5>
                  {getProductsRevenueList &&
                  getProductsRevenueList.concernData &&
                  getProductsRevenueList.concernData.length > 0 ? (
                    <RTable
                      columns={concernColumns}
                      data={
                        (getProductsRevenueList &&
                          getProductsRevenueList.concernData) ||
                        []
                      }
                    />
                  ) : (
                    <p className={styles.noRecordFoundMessage}>
                      No Concern Data found
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh",
            textAlign: "center",
          }}
        >
          <h1>Welcome To The Admin Dashboard</h1>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
