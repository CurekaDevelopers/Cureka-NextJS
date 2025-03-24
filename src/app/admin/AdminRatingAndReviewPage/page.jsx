"use client";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AcceptButton from "../../../components/AcceptButton";
import Card from "../../../components/Card";
import RejectButton from "../../../components/RejectButton";
import AdminBreadcrumbs from "../../../components/admin/AdminBreadcrumbs";
import { editReviewStatus, fetchRatingAndReview } from "../../../redux/action";
import { pagePaths } from "../../../utils/constants/constant";
import lazyLoadable from "../../../utils/lazyLoadable";
import styles from "./styles.module.scss";
const RTable = lazyLoadable(() => import("../../../components/Table/index"));

const AdminRatingAndReviewPage = () => {
  const { ratingAndReviews } = useSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { isAdminStatus, userRoles } = useSelector((state) => state.auth);

  const onEdit = (id, status) => {
    editReviewStatus(id, status).then((rep) => {
      if (rep.status === 200) {
        dispatch(fetchRatingAndReview());
      }
    });
  };
  const rolesPermission = userRoles.filter(
    (item) => item.name == "RatingAndReview"
  );

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Product Name",
        accessor: "vendor_article_name",
      },
      {
        Header: "Review Comment",
        accessor: "comments",
      },
      {
        Header: "Rating",
        accessor: "rating",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Actions",
        accessor: "Actions",
        Cell: ({ cell }) => {
          const { status } = cell.row.original; // Get the status from the row data

          return (
            <div>
              {isAdminStatus == 1 ? (
                <div className="d-flex">
                  {status !== "Approved" && (
                    <AcceptButton
                      onClick={() => onEdit(cell.row.original.id, "Approved")}
                    />
                  )}
                  {status === "Approved" && (
                    <RejectButton
                      onClick={() => onEdit(cell.row.original.id, "Rejected")}
                    />
                  )}
                </div>
              ) : (
                <>
                  {rolesPermission &&
                    rolesPermission.map((role) => (
                      <div key={role.roleId} className="d-flex">
                        {role.isUpdate == 1 && status !== "Approved" && (
                          <AcceptButton
                            onClick={() =>
                              onEdit(cell.row.original.id, "Approved")
                            }
                          />
                        )}
                        {role.isDelete == 1 && status === "Approved" && (
                          <RejectButton
                            onClick={() =>
                              onEdit(cell.row.original.id, "Rejected")
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

  useEffect(() => {
    dispatch(fetchRatingAndReview());
  }, [dispatch]);

  const mappedRateAndReview = useMemo(() => {
    if (!searchTerm.trim()) return ratingAndReviews;

    return ratingAndReviews.filter(
      (item) =>
        item &&
        item.vendor_article_name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  }, [ratingAndReviews, searchTerm]);

  return (
    <div className={styles.container}>
      <AdminBreadcrumbs
        items={[
          {
            path: pagePaths.adminRatingAndReview,
            label: "RatingAndReview",
          },
        ]}
      />
      <div>
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <p className={styles.title}>Rating and Review Management</p>
          </div>

          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          {mappedRateAndReview?.length ? (
            <RTable columns={columns} data={mappedRateAndReview} />
          ) : (
            <p className={styles.noRecordFoundMessage}>
              No Rating and Reviews found, please add new blog.
            </p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AdminRatingAndReviewPage;
