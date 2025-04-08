"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import { useRouter } from "next/navigation";
import Card from "../../../../../components/Card";
import ConfirmationModel from "../../../../../components/ConfirmationModel";
import DeleteButton from "../../../../../components/DeleteButton/index";
import EditButton from "../../../../../components/EditButton/index";
import {
  deletePreferenceType,
  fetchPreferenceType,
} from "../../../../../redux/action";
import { setSubSubSubCategories } from "../../../../../redux/slices/admin.slice";
import { pagePaths } from "../../../../../utils/constants/constant";
import lazyLoadable from "../../../../../utils/lazyLoadable";
import styles from "./styles.module.scss";

const RTable = lazyLoadable(() =>
  import("../../../../../components/Table/index")
);

const PreferenceTypeManagementPage = () => {
  const { preferenceType } = useSelector((state) => state.admin);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const { results, pagination } = preferenceType;
  const dispatch = useDispatch();
  const navigate = useRouter();
  const { isAdminStatus, userRoles } = useSelector((state) => state.auth);

  const onDeleteButtonClicked = (brand) => {
    setCategoryToDelete(brand);
  };
  const [searchTerm, setSearchTerm] = useState("");

  const onDeleteConfirmed = () => {
    if (categoryToDelete?.id && results?.length) {
      dispatch(
        deletePreferenceType(categoryToDelete, () => {
          console.log("results in callback functoin", results);
          const updatedConcernsList = results?.filter(
            (item) => item.id !== categoryToDelete.id
          );
          dispatch(setSubSubSubCategories(updatedConcernsList || []));
          setCategoryToDelete(null);
        })
      );
    }
  };

  const onEdit = useCallback(
    (id, replay = "edit") => {
      console.log("replay", replay);
      if (replay === "replay") {
        navigate.push(pagePaths.adminCreatePreferenceType.replace(":id", id));
        return;
      }
      navigate.push(pagePaths.adminCreatePreferenceEdit.replace(":id", id));
    },
    [navigate]
  );

  const closeDeleteConfirmModal = () => {
    setCategoryToDelete(null);
  };
  const rolesPermission = userRoles.filter(
    (item) => item.name == "Preference Type Management"
  );

  const columns = useMemo(
    () => [
      {
        Header: "id",
        accessor: "id",
      },
      {
        Header: "Preference Name",
        accessor: "name",
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

  useEffect(() => {
    dispatch(fetchPreferenceType());
  }, [dispatch]);

  // const mappedSubSubSubcategories = results?.map((item) => {
  //   return {
  //     ...item,
  //   };
  // });

  const mappedSubSubSubcategories = useMemo(() => {
    if (!searchTerm.trim()) return results;

    return results.filter((pref) =>
      pref.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [results, searchTerm]);

  return (
    <>
      <ConfirmationModel
        showModal={!!categoryToDelete}
        ctaTitle={"Delete"}
        label={"Delete Confirmation"}
        message={`Are you sure you want to delete the Preference type ${categoryToDelete?.name}, Id: ${categoryToDelete?.id}`}
        hideModal={closeDeleteConfirmModal}
        confirmModal={onDeleteConfirmed}
      />
      <div className={styles.container}>
        <div>
          <Card className={styles.card}>
            <div className={styles.cardHeader}>
              <p className={styles.title}>Preference Type Management</p>
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
                  <Link href={pagePaths.adminCreatePreferenceType}>
                    <Button className={styles.addButton}>
                      <span className="flex items-center gap-1">
                        <MdAdd /> Add Preference Type
                      </span>
                    </Button>
                  </Link>
                ) : (
                  <>
                    {rolesPermission &&
                      rolesPermission.map((role) => (
                        <div key={role.roleId}>
                          {role.isAdd == 1 && (
                            <Link href={pagePaths.adminCreatePreferenceType}>
                              <Button className={styles.addButton}>
                                <MdAdd /> Add Preference Type
                              </Button>
                            </Link>
                          )}
                        </div>
                      ))}
                  </>
                )}
              </div>
            </div>

            {mappedSubSubSubcategories?.length ? (
              <RTable columns={columns} data={mappedSubSubSubcategories} />
            ) : (
              <p className={styles.noRecordFoundMessage}>
                No Preference types found, please add new Preference type.
              </p>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default PreferenceTypeManagementPage;
