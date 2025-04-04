"use client";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import Card from "../../../components/Card";
import AdminBreadcrumbs from "../../../components/admin/AdminBreadcrumbs";
import { pagePaths } from "../../../utils/constants/constant";
import api from "../../../utils/api.utils";
import { apiUrls } from "../../../utils/constants/api.constants";
import styles from "./styles.module.scss";

const ImportCuratedUploadImages = () => {
  const [downloadUrl, setDownloadUrl] = useState("");
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  console.log(id, "idid");
  useEffect(() => {
    api
      .get(apiUrls.downloadSampleExcelFileOffers)
      .then((response) => {
        setDownloadUrl(response.data.downloadUrl);
      })
      .catch((error) => {
        console.error("Error fetching download URL:", error);
      });
  }, []);

  const handleDownload = () => {
    console.log("handleDownload", downloadUrl);
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
    formData.append("id", id);

    try {
      setLoading(true);
      const response = await api.post(
        apiUrls.uploadProductsOfferExcelFile,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 120 * 1000,
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadProgress(progress);
          },
        }
      );
      toast.success(response.data?.message || response.message);
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
            <p className={styles.title}>Import Products</p>
            <Button onClick={handleDownload} className={styles.addButton}>
              Download Sample File
            </Button>
          </div>
          <Form className="mt-4">
            <Form.Group>
              <input type="file" onChange={handleFileChange} />
            </Form.Group>
            <Button
              disabled={loading}
              variant="primary"
              className="mt-3"
              onClick={handleUpload}
            >
              Upload
            </Button>
          </Form>
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

export default ImportCuratedUploadImages;
