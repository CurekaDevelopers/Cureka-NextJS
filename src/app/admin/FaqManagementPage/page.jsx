"use client";
import moment from "moment";
import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { deleteFaqs, getAllFaqs } from "../../../redux/action";
import { setFaqs } from "../../../redux/slices/admin.slice";
import { pagePaths } from "../../../utils/constants/constant";
import lazyLoadable from "../../../utils/lazyLoadable";
import styles from "./styles.module.scss";

const RTable = lazyLoadable(() => import("../../../components/Table/index"));

const FaqManagementPage = () => {
  const { faqs } = useSelector((state) => state.admin);
  const [deleteFaq, setDeleteFaq] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { isAdminStatus, userRoles } = useSelector((state) => state.auth);

  const navigate = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    getAllFaqs();
  }, [dispatch]);

  const onDeleteButtonClicked = (faq) => {
    setDeleteFaq(faq);
  };

  const onDeleteConfirmed = () => {
    if (deleteFaq?.id && faqs?.length) {
      dispatch(
        deleteFaqs(deleteFaq.id, () => {
          const updatedFaqsList = faqs.filter(
            (item) => item.id !== deleteFaq.id
          );
          dispatch(setFaqs(updatedFaqsList || []));
          setDeleteFaq(null);
        })
      );
    }
  };

  const onEdit = useCallback(
    (id) => {
      navigate.push(pagePaths.adminCreateFaqEdit.replace(":id", id));
    },
    [navigate]
  );

  const closeDeleteConfirmModal = () => {
    setDeleteFaq(null);
  };
  const rolesPermission = userRoles.filter(
    (item) => item.name == "FAQ Management"
  );
  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Type",
        accessor: "type",
      },
      {
        Header: "Question",
        accessor: "question",
      },
      {
        Header: "Date",
        accessor: "created_at",
        Cell: ({ cell }) => {
          return (
            <span className={styles.titleColumn}>
              {moment(cell.row.original.created_at).format("ll")}
            </span>
          );
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

  const mappedFaqs = useMemo(() => {
    if (!searchTerm.trim()) return faqs;

    return faqs.filter(
      (faq) =>
        faq.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [faqs, searchTerm]);

  return (
    <>
      <ConfirmationModel
        showModal={!!deleteFaq}
        ctaTitle={"Delete"}
        label={"Delete Confirmation"}
        message={`Are you sure you want to delete the faq ${deleteFaq?.name}, Id: ${deleteFaq?.id}`}
        hideModal={closeDeleteConfirmModal}
        confirmModal={onDeleteConfirmed}
      />
      <div className={styles.container}>
        <AdminBreadcrumbs
          items={[
            {
              path: pagePaths.adminBrandManagement,
              label: "FAQ Management",
            },
          ]}
        />
        <div>
          <Card className={styles.card}>
            <div className={styles.cardHeader}>
              <p className={styles.title}>FAQ Management</p>
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
                {isAdminStatus == 1 ? (
                  <Link href={pagePaths.adminCreateFaq}>
                    <Button className={styles.addButton}>
                      <MdAdd /> Add FAQ
                    </Button>
                  </Link>
                ) : (
                  <>
                    {rolesPermission &&
                      rolesPermission.map((role) => (
                        <div key={role.roleId}>
                          {role.isAdd == 1 && (
                            <Link href={pagePaths.adminCreateFaq}>
                              <Button className={styles.addButton}>
                                <MdAdd /> Add FAQ
                              </Button>
                            </Link>
                          )}
                        </div>
                      ))}
                  </>
                )}
              </div>
            </div>

            {mappedFaqs?.length ? (
              <RTable columns={columns} data={mappedFaqs} />
            ) : (
              <p className={styles.noRecordFoundMessage}>
                No faqs found, please add new faq.
              </p>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default FaqManagementPage;
