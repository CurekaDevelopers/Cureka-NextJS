"use client";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import toast from "react-hot-toast";
import Card from "../../../components/Card";
import AdminBreadcrumbs from "../../../components/admin/AdminBreadcrumbs";
import { pagePaths } from "../../../utils/constants/constant";
import api from "../../../utils/api.utils";
import { apiUrls } from "../../../utils/constants/api.constants";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";

const ImportProductsPage = () => {
  const [downloadUrl, setDownloadUrl] = useState("");
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const { isAdminStatus, userRoles } = useSelector((state) => state.auth);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    api
      .get(apiUrls.downloadSampleExcelFile)
      .then((response) => {
        setDownloadUrl(response.data.downloadUrl);
      })
      .catch((error) => {
        console.error("Error fetching download URL:", error);
      });
  }, []);

  const handleDownload = () => {
    if (downloadUrl) {
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", "sample.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await api.post(apiUrls.uploadProducts, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 4 * 60 * 1000, // 4 minutes timeout
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setUploadProgress(progress);
        },
      });
      // Show the toast and get its ID
      const toastId = toast.success(
        response.data?.message || response.message,
        {
          autoClose: false, // Disable autoClose
        }
      );
      setTimeout(() => {
        toast.dismiss(toastId);
      }, 5000);

      setFile(null);
      setUploadProgress(0);
    } catch (error) {
      console.log("catch");
      console.log(error?.response?.status);
      if (error.response && error.response.status === 404) {
        // Handle 404 error specifically
        toast.error(error?.response?.data?.error || error.message);
      } else if (error.response && error.response.status === 400) {
        // Handle 400 error specifically
        toast.error(error?.response?.data?.message[0]);
      } else {
        // Handle other errors
        toast.error(
          error?.response?.data?.error ||
            error.message ||
            error?.response?.data?.message[0] ||
            "Something went wrong while fetching blogs!"
        );
      }
      console.error("Error uploading file:", error);
    }
    setLoading(false);
  };
  const rolesPermission = userRoles.filter(
    (item) => item.name == "Import Products"
  );

  return (
    <div className={styles.container}>
      <AdminBreadcrumbs
        items={[
          {
            path: pagePaths.adminImportProducts,
            label: "Import Products",
          },
        ]}
      />
      <div>
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <p className={styles.title}>Import Products</p>
              <Button onClick={handleDownload} className={styles.addButton}>
                Download Sample File
              </Button>
            </div>

            <div>
              {isAdminStatus == 1 ? (
                <Form className="mt-4">
                  <Form.Group>
                    <input type="file" onChange={handleFileChange} />
                  </Form.Group>
                  <Button
                    disabled={loading}
                    variant="primary"
                    className={styles.addButton}
                    style={{ marginTop: "24px" }}
                    onClick={handleUpload}
                  >
                    Upload
                  </Button>
                </Form>
              ) : (
                <>
                  {rolesPermission &&
                    rolesPermission.map((role) => (
                      <div key={role.roleId}>
                        {role.isAdd == 1 && (
                          <Form className="mt-4">
                            <Form.Group>
                              <input type="file" onChange={handleFileChange} />
                            </Form.Group>
                            <Button
                              disabled={loading}
                              variant="primary"
                              className={styles.addButton}
                              style={{ marginTop: "24px" }}
                              onClick={handleUpload}
                            >
                              Upload
                            </Button>
                          </Form>
                        )}
                      </div>
                    ))}
                </>
              )}
            </div>
          </div>

          {uploadProgress > 0 && (
            <div className="progress mt-3">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${uploadProgress}%` }}
                aria-valuenow={uploadProgress}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {uploadProgress}%
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ImportProductsPage;
