"use client";
import _ from "lodash";
import { useEffect, useState } from "react";
import { Button, FormGroup, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useRouter } from "next/navigation";
import Card from "../../../../../components/Card";
import AdminBreadcrumbs from "../../../../../components/admin/AdminBreadcrumbs";
import {
  createEmployee,
  fetchAllRoles,
  fetchEmployees,
  updateEmployee,
} from "../../../../../redux/action";
import { pagePaths } from "../../../../../utils/constants/constant";
import styles from "./styles.module.scss";
import axios from "axios";
import { env } from "../../../../../config/env.config";

const staticSubMenus = ["Add", "Update", "Delete"];
const UserRoleManagement = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("Active");
  const [selectedRoles, setSelectedRoles] = useState([]);
  const { roles, adminEmail } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  console.log(id, "id");
  useEffect(() => {
    dispatch(fetchAllRoles());
    const fetchEditData = async () => {
      try {
        const response = await axios.get(
          `${env.REACT_SERVER_BASE_URL}/admin_user/getEmployee/${id}`
        );
        setFirstName(
          response &&
            response.data &&
            response.data.data &&
            response.data.data.first_name
        );
        setLastName(
          response &&
            response.data &&
            response.data.data &&
            response.data.data.last_name
        );
        setEmail(
          response &&
            response.data &&
            response.data.data &&
            response.data.data.email
        );
        setPassword(
          response &&
            response.data &&
            response.data.data &&
            response.data.data.password
        );
        setStatus(
          response &&
            response.data &&
            response.data.data &&
            response.data.data.status
        );
        setSelectedRoles(
          response &&
            response.data &&
            response.data.data &&
            response.data.data.roles
        );
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state or notify user
      }
    };
    fetchEditData();
  }, [dispatch]);
  const handleRoleSelect = (e, id) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedRoles((prevRoles) => [
        ...prevRoles,
        { roleId: id, isAdd: false, isUpdate: false, isDelete: false },
      ]);
    } else {
      setSelectedRoles((prevRoles) =>
        prevRoles.filter((role) => role.roleId !== id)
      );
    }
  };

  const handleSubmit = async (e) => {
    const newRole = {
      roleId: 2,
      isAdd: 0,
      isUpdate: 0,
      isDelete: 0,
    };
    selectedRoles.push(newRole);
    e.preventDefault();
    try {
      const formData = {
        email: email,
        // password: password,
        first_name: firstName,
        last_name: lastName,
        status: status,
        updated_by: adminEmail,
        roles: selectedRoles,
      };
      console.log(formData, "editdata");
      dispatch(
        updateEmployee(
          id,
          {
            ...formData,
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
    } catch (error) {
      setLoading(false);
    }
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
            label: "Edit Employee",
          },
        ]}
      />
      <div>
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <p className={styles.title}>Add Employee Details</p>
          </div>
          <Form onSubmit={handleSubmit} className={styles.formItems}>
            <FormGroup>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Form.Label>Roles</Form.Label>
              <Row>
                {roles &&
                  roles.map((menu) => (
                    <Col key={menu.id} sm={3}>
                      {/* <div key={menu.id}> */}
                      <Form.Check
                        type="checkbox"
                        label={menu.name}
                        id={`menu-${menu.id}`}
                        checked={selectedRoles.some(
                          (role) => role.roleId === menu.id
                        )}
                        onChange={(e) => handleRoleSelect(e, menu.id)}
                      />
                      {selectedRoles.some(
                        (role) => role.roleId === menu.id
                      ) && (
                        <div style={{ paddingLeft: "20px" }}>
                          {staticSubMenus.map((subMenu) => (
                            <Form.Check
                              key={`${menu.id}-${subMenu}`}
                              type="checkbox"
                              label={subMenu}
                              id={`submenu-${menu.id}-${subMenu}`}
                              checked={
                                selectedRoles.find(
                                  (role) => role.roleId === menu.id
                                )[`is${subMenu}`]
                              }
                              onChange={() => {
                                const updatedRoles = selectedRoles.map((role) =>
                                  role.roleId === menu.id
                                    ? {
                                        ...role,
                                        [`is${subMenu}`]: !role[`is${subMenu}`],
                                      }
                                    : role
                                );
                                setSelectedRoles(updatedRoles);
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </Col>
                  ))}
              </Row>
            </FormGroup>
            <FormGroup>
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Control>
            </FormGroup>
            <Button type="submit" className={styles.submitButton}>
              Submit
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default UserRoleManagement;
