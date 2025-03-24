"use client";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { MultiSelect } from "react-multi-select-component";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
("react-router-dom");
import * as XLSX from "xlsx";
import Card from "../../../components/Card";
import AdminBreadcrumbs from "../../../components/admin/AdminBreadcrumbs";
import { productReport } from "../../../redux/action";
import { pagePaths } from "../utils/constants/constant";
import { exportExcel } from "../../../utils/constants/common.constants";
import { initialValues, validationSchema } from "./helper";
import styles from "./styles.module.scss";

const AdminReportExcel = ({ isEditPage = false }) => {
  const formikRef = useRef();
  const navigate = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [concernsList, setConcernsList] = useState([]);

  const onChangeConcerns = (newSelected) => {
    setConcernsList(newSelected);
  };
  const handleDownloadExcel = (res) => {
    console.log(res);
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(res.data.data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
    XLSX.writeFile(workbook, "products.xlsx");
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      // setLoading(true);
      let valuesArray = [];
      if (concernsList?.length > 0) {
        valuesArray = concernsList.map((item) => item.value);
      }
      console.log(valuesArray, "mohan");

      dispatch(
        productReport(
          {
            list: valuesArray,
          },
          (response) => {
            setLoading(false);
            handleDownloadExcel(response);
            // navigate.push(pagePaths.adminProductManagement);
          }
        )
      );
      // }
    },
  });

  useEffect(() => {
    formikRef.current = formik;
  }, [formik]);

  return (
    <div className={styles.container}>
      <AdminBreadcrumbs
        items={[
          {
            path: pagePaths.adminProductManagement,
            label: "Products Management",
          },
          //   {
          //     path: pagePaths.adminCreateBrand,
          //     label: "Report excel",
          //   },
        ]}
      />
      <div>
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <p className={styles.title}>Report excel</p>
          </div>
          <Form onSubmit={formik.handleSubmit} className={styles.formItems}>
            <Form.Group>
              <Form.Label htmlFor="concerns">
                Please select columns to download csv
              </Form.Label>

              {exportExcel?.length > 0 && (
                <MultiSelect
                  value={concernsList}
                  options={exportExcel}
                  onChange={onChangeConcerns}
                />
              )}
            </Form.Group>

            <Button
              disabled={loading}
              type="submit"
              className={styles.submitButton}
              variant="primary"
            >
              {loading ? "Loading..." : "Submit"}
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default AdminReportExcel;
