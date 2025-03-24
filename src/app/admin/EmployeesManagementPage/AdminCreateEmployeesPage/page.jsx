"use client";
import { useFormik } from "formik";
import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useRouter } from "next/navigation";
import Card from "../../../../components/Card";
import AdminBreadcrumbs from "../../../../components/admin/AdminBreadcrumbs";
import {
  createEmployee,
  fetchAllRoles,
  fetchEmployees,
  updateEmployee,
} from "../../../../redux/action";
import { pagePaths } from "../../../../utils/constants/constant";
import { status } from "../../../../utils/constants/common.constants";
import { initialValues, validationSchema } from "./helper";
import styles from "./styles.module.scss";

const AdminCreateEmployeePage = ({ isEditPage = false }) => {
  const formikRef = useRef();
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useRouter();
  const { employees } = useSelector((state) => state.admin);
  const { roles, adminEmail } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState([]);

  useEffect(() => {
    if (!employees?.length && isEditPage) {
      dispatch(fetchEmployees());
    }
  }, [employees?.length, dispatch, isEditPage]);

  useEffect(() => {
    if (!roles?.length) {
      dispatch(fetchAllRoles());
    }
  }, [roles?.length, dispatch]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        if (isEditPage) {
          dispatch(
            updateEmployee(
              id,
              {
                ...values,
                roles: _.toString(values.roles),
                updated_by: adminEmail,
              },
              () => {
                setLoading(false);
                navigate.push(pagePaths.adminEmployee);
              },
              () => {
                setLoading(false);
              }
            )
          );
        } else {
          dispatch(
            createEmployee(
              {
                ...values,
                created_by: adminEmail,
                roles: _.toString(values.roles),
              },
              () => {
                setLoading(false);
                navigate.push(pagePaths.adminEmployee);
              },
              () => {
                setLoading(false);
              }
            )
          );
        }
      } catch (error) {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    formikRef.current = formik;
  }, [formik]);

  useEffect(() => {
    const formik = formikRef.current || {};
    if (isEditPage && employees.length && id && formik.setValues) {
      const employee = employees.find(
        (item) => parseInt(item.id) === parseInt(id)
      );
      if (!employee) {
        navigate.push(pagePaths.adminEmployee);
      }
      formik.setValues(employee);
      setSelectedRoles(_.map(employee.roles, "id"));
    }
  }, [employees, id, isEditPage, navigate]);

  const handleRoleSelect = (e, id) => {
    const checked = e.target.checked;
    let selectedRolesCopy = _.cloneDeep(selectedRoles);

    if (checked) {
      selectedRolesCopy.push(id);
    } else {
      const findIndex = selectedRolesCopy.indexOf(id);
      selectedRolesCopy.splice(findIndex, 1);
    }
    setSelectedRoles(selectedRolesCopy);
    formik.setFieldValue("roles", selectedRolesCopy);
  };

  return (
    <div className={styles.container}>
      <AdminBreadcrumbs
        items={[
          {
            path: pagePaths.adminEmployee,
            label: "Employees Management",
          },
          {
            path: pagePaths.adminCreateEmployee,
            label: isEditPage ? "Edit Employee" : "Create Employee",
          },
        ]}
      />
      <div>
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <p className={styles.title}>Add Employee Details</p>
          </div>
          <Form onSubmit={formik.handleSubmit} className={styles.formItems}>
            <Form.Group>
              <Form.Label htmlFor="first_name">First name</Form.Label>
              <Form.Control
                type="text"
                id="first_name"
                name="first_name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.first_name}
              />
              {formik.errors.first_name && formik.touched.first_name && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.first_name}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="last_name">Last name</Form.Label>
              <Form.Control
                type="text"
                id="last_name"
                name="last_name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.last_name}
              />
              {formik.errors.last_name && formik.touched.last_name && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.last_name}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.email}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                type="password"
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.errors.password && formik.touched.password && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.password}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="roles" className={styles.rolesTitle}>
                Roles
              </Form.Label>
              {roles &&
                roles.map((role) => (
                  <Form.Check
                    inline
                    type="checkbox"
                    id={role.id}
                    name="roles"
                    className={styles.roles}
                    onChange={(e) => handleRoleSelect(e, role.id)}
                    onBlur={formik.handleBlur}
                    checked={selectedRoles.includes(role.id)}
                    label={role.name}
                  />
                ))}
              {formik.errors.roles && formik.touched.roles && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.roles}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="status">Status</Form.Label>
              <Form.Select
                aria-label="Select Category"
                id="status"
                name="status"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.status}
              >
                <option disabled>Select Status</option>
                {Object.entries(status).map(([key, value]) => {
                  return (
                    <option key={key} value={value}>
                      {value}
                    </option>
                  );
                })}
              </Form.Select>
              {formik.errors.status && formik.touched.status && (
                <Form.Text className={styles.errorText} muted>
                  {formik.errors.status}
                </Form.Text>
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

export default AdminCreateEmployeePage;
