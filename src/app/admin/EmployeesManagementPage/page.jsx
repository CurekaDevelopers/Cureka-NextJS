"use client";
import _ from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
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
import {
  deleteEmployee,
  fetchEmployees,
  fetchAllRoles,
} from "../../../redux/action";
import { setEmployees } from "../../../redux/slices/admin.slice";
import { pagePaths } from "../../../utils/constants/constant";
import lazyLoadable from "../../../utils/lazyLoadable";
import styles from "./styles.module.scss";

const RTable = lazyLoadable(() => import("../../../components/Table/index"));

const EmployeesManagementPage = () => {
  const { employees = [] } = useSelector((state) => state.admin);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const navigate = useRouter();
  const { roles, isAdminStatus, userRoles } = useSelector(
    (state) => state.auth
  );
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  const onDeleteButtonClicked = (brand) => {
    setEmployeeToDelete(brand);
  };

  const onDeleteConfirmed = () => {
    if (employeeToDelete?.id && employees?.length) {
      dispatch(
        deleteEmployee(employeeToDelete.id, () => {
          const updatedEmployeesList = employees.filter(
            (item) => item.id !== employeeToDelete.id
          );
          dispatch(setEmployees(updatedEmployeesList || []));
          setEmployeeToDelete(null);
        })
      );
    }
  };

  const closeDeleteConfirmModal = () => {
    setEmployeeToDelete(null);
  };

  const onEdit = useCallback(
    (id) => {
      navigate.push(pagePaths.adminCreateEmployeeEdit.replace(":id", id));
    },
    [navigate]
  );
  const getRoleNames = (rolesArray, rolesOfEmployee) => {
    if (!rolesOfEmployee || rolesOfEmployee.length === 0) {
      return "No Roles"; // Handle case where employee has no roles
    }

    const roleIds = rolesOfEmployee.map((role) => role.roleId);
    const roleNames = roleIds.map((roleId) => {
      const role = rolesArray.find((role) => role.id === roleId);
      return role ? role && role.name : role && role.name;
    });
    const uniqueRoleNames = [...new Set(roleNames)].filter(
      (name) => name !== null
    );

    return uniqueRoleNames.join(", ");
  };
  const rolesPermission = userRoles.filter(
    (item) => item.name == "Employees Management"
  );
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ cell }) => {
          return (
            <span
              className={styles.titleColumn}
            >{`${cell.row.original.first_name} ${cell.row.original.last_name}`}</span>
          );
        },
      },
      {
        Header: "Roles",
        accessor: "roles",
        Cell: ({ cell }) => {
          return (
            <span className={styles.titleColumn}>
              {getRoleNames(roles, cell.row.original.roles)}
            </span>
          );
        },
      },
      {
        Header: "Created By",
        accessor: "created_by",
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
    dispatch(fetchEmployees());
    dispatch(fetchAllRoles());
  }, [dispatch]);

  // const mappedEmployees = employees.map((item) => {
  //   return {
  //     ...item,
  //   };
  // });
  const mappedEmployees = useMemo(() => {
    if (!searchTerm.trim()) return employees;

    const lowercasedSearchTerm = searchTerm.toLowerCase();

    return employees.filter((au) => {
      const firstName = au.first_name?.toLowerCase() ?? "";
      const lastName = au.last_name?.toLowerCase() ?? "";
      const id = au.id?.toString().toLowerCase() ?? "";
      return (
        firstName.includes(lowercasedSearchTerm) ||
        lastName.includes(lowercasedSearchTerm) ||
        id.includes(lowercasedSearchTerm)
      );
    });
  }, [employees, searchTerm]);

  return (
    <>
      <ConfirmationModel
        showModal={!!employeeToDelete}
        ctaTitle={"Delete"}
        label={"Delete Confirmation"}
        message={`Are you sure you want to delete the employee ${employeeToDelete?.name}, Id: ${employeeToDelete?.id}`}
        hideModal={closeDeleteConfirmModal}
        confirmModal={onDeleteConfirmed}
      />
      <div className={styles.container}>
        <AdminBreadcrumbs
          items={[
            {
              path: pagePaths.adminEmployee,
              label: "Employees Management",
            },
          ]}
        />
        <div>
          <Card className={styles.card}>
            <div className={styles.cardHeader}>
              <p className={styles.title}>Employee Management</p>

              <div>
                {isAdminStatus == 1 ? (
                  <Link href={pagePaths.adminCreateEmployee}>
                    <Button className={styles.addButton}>
                      <span className="flex items-center gap-1">
                        <MdAdd /> Add Employees
                      </span>
                    </Button>
                  </Link>
                ) : (
                  <>
                    {rolesPermission &&
                      rolesPermission.map((role) => (
                        <div key={role.roleId}>
                          {role.isAdd == 1 && (
                            <Link href={pagePaths.adminCreateEmployee}>
                              <Button className={styles.addButton}>
                                <MdAdd /> Add Employees
                              </Button>
                            </Link>
                          )}
                        </div>
                      ))}
                  </>
                )}
              </div>
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            {mappedEmployees?.length ? (
              <RTable columns={columns} data={mappedEmployees || []} />
            ) : (
              <p className={styles.noRecordFoundMessage}>
                No Employee found, please add new employee.
              </p>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default EmployeesManagementPage;
