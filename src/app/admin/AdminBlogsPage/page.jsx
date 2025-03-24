"use client";

import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";

import Link from "next/link";

import { useRouter } from "next/navigation";
import Card from "../../../components/Card";
import ConfirmationModel from "../../../components/ConfirmationModel";
import DeleteButton from "../../../components/DeleteButton/index";
import EditButton from "../../../components/EditButton/index";
import ReplayButton from "../../../components/ReplayButton";
import AdminBreadcrumbs from "../../../components/admin/AdminBreadcrumbs";
import { deleteBlog, fetchBlogs } from "../../../redux/action";
import { setBlogs } from "../../../redux/slices/customer.slice";
import { pagePaths } from "../../../utils/constants/constant";
import lazyLoadable from "../../../utils/lazyLoadable";
import styles from "./styles.module.scss";
const RTable = lazyLoadable(() => import("../../../components/Table/index"));

const AdminBlogsPage = () => {
  const { blogs } = useSelector((state) => state.admin);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [category, setCategory] = useState(null);
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const { isAdminStatus, userRoles } = useSelector((state) => state.auth);
  const { nestedCategories } = useSelector((state) => state.customer);
  const navigate = useRouter();

  const onDeleteButtonClicked = (blog) => {
    setBlogToDelete(blog);
  };
  const onDeleteConfirmed = () => {
    if (blogToDelete?.id && blogs?.length) {
      dispatch(
        deleteBlog(blogToDelete.id, () => {
          const updatedBlogsList = blogs.filter(
            (item) => item.id !== blogToDelete.id
          );
          dispatch(setBlogs(updatedBlogsList || []));
          setBlogToDelete(null);
        })
      );
    }
  };
  const closeDeleteConfirmModal = () => {
    setBlogToDelete(null);
  };

  const onEdit = useCallback(
    (id, replay = "edit") => {
      if (replay === "replay") {
        navigate.push(pagePaths.adminCreateBlogsComment.replace(":id", id));
        return;
      }
      //navigate.push(pagePaths.adminCreateBlogsEdit.replace(":id", id));
      const url = pagePaths.adminCreateBlogsEdit.replace(":id", id);
      window.open(url, "_blank");
      return;
    },
    [navigate]
  );
  const rolesPermission = userRoles.filter((item) => item.name == "Blogs");

  const dispatch = useDispatch();
  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Title",
        accessor: "title",
        Cell: ({ cell }) => {
          return (
            <span className={styles.titleColumn}>
              {cell.row.original.title}
            </span>
          );
        },
      },
      {
        Header: "Date",
        accessor: "blog_date",
        Cell: ({ cell }) => {
          return (
            <span>
              {dayjs(cell.row.original.blog_date).format("YYYY-MM-DD")}
            </span>
          );
        },
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
                  <ReplayButton
                    onClick={() => onEdit(cell.row.original.id, "replay")}
                  />
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
                        {role.isUpdate == 1 && (
                          <ReplayButton
                            onClick={() =>
                              onEdit(cell.row.original.id, "replay")
                            }
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
    dispatch(fetchBlogs());
  }, [dispatch]);

  // const mappedBlogs = blogs?.map((item) => {
  //   return {
  //     ...item,
  //     blog_date: dayjs(item.blog_date).format("YYYY-MM-DD"),
  //   };
  // });
  function handleSearch(event) {
    setSearchTerm(event.target.value);
  }
  const onSearchClicked = () => {
    let searchPageUrl = `${pagePaths.products}?search_term=${searchTerm}`;
    if (category?.name) {
      // searchPageUrl += `&category_name=${category?.name}`;
      searchPageUrl += `&category_id=${category?.id}`;
    }
    navigate.push(searchPageUrl);
  };
  const onSearchFormSubmit = (e) => {
    e.preventDefault();
    onSearchClicked();
  };
  useEffect(() => {
    if (!searchParams) return; // ✅ Prevents errors if searchParams is undefined

    const categoryId = searchParams.get("category_id") || "";

    if (nestedCategories?.length && categoryId) {
      const foundCategory = nestedCategories.find(
        (item) => item.id === Number(categoryId)
      );
      setCategory(foundCategory || null);
    }
  }, [nestedCategories, searchParams]);

  const mappedBlogs = useMemo(() => {
    if (!searchTerm.trim()) return blogs;

    return blogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [blogs, searchTerm]);

  return (
    <>
      <ConfirmationModel
        showModal={!!blogToDelete}
        ctaTitle={"Delete"}
        label={"Delete Confirmation"}
        message={`Are you sure you want to delete the blog ${blogToDelete?.title}, Id: ${blogToDelete?.id}`}
        hideModal={closeDeleteConfirmModal}
        confirmModal={onDeleteConfirmed}
      />
      <div className={styles.container}>
        <AdminBreadcrumbs
          items={[
            {
              path: pagePaths.adminBlogs,
              label: "Blogs",
            },
          ]}
        />
        <div>
          <Card className={styles.card}>
            <div className={styles.cardHeader}>
              <p className={styles.title}>Blogs Management</p>
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
                  <Link href={pagePaths.adminCreateBlogs}>
                    <Button className={styles.addButton}>
                      <MdAdd /> Add Blog
                    </Button>
                  </Link>
                ) : (
                  <>
                    {rolesPermission &&
                      rolesPermission.map((role) => (
                        <div key={role.roleId}>
                          {role.isAdd == 1 && (
                            <Link href={pagePaths.adminCreateBlogs}>
                              <Button className={styles.addButton}>
                                <MdAdd /> Add Blog
                              </Button>
                            </Link>
                          )}
                        </div>
                      ))}
                  </>
                )}
              </div>
            </div>
            {mappedBlogs?.length ? (
              <RTable columns={columns} data={mappedBlogs} />
            ) : (
              <p className={styles.noRecordFoundMessage}>
                No blogs found, please add new blog.
              </p>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default AdminBlogsPage;
