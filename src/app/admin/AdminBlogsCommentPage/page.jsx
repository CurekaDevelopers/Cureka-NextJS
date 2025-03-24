"use client";

import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Card from "../../../components/Card";
import ConfirmationModel from "../../../components/ConfirmationModel";
import AdminBreadcrumbs from "../../../components/admin/AdminBreadcrumbs";
import {
  blogCommentAction,
  fetchBlogsListUserComment,
} from "../../../redux/action";
import { setBlogs } from "../../../redux/slices/customer.slice";
import { pagePaths } from "../../../utils/constants/constant";

import lazyLoadable from "../../../utils/lazyLoadable";

import AcceptButton from "../../../components/AcceptButton";
import RejectButton from "../../../components/RejectButton";
import styles from "./styles.module.scss";
const RTable = lazyLoadable(() => import("../../../components/Table/index"));

const AdminBlogsPage = () => {
  const { blogsComments } = useSelector((state) => state.admin);
  const { id } = useParams();
  const [blogToDelete, setBlogToDelete] = useState({
    isShow: null,
    id: null,
    type: null,
  });
  const [category, setCategory] = useState(null);
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search_term") || ""
  );
  const { nestedCategories } = useSelector((state) => state.customer);
  const navigate = useRouter();

  const onDeleteButtonClicked = (blog, type) => {
    setBlogToDelete({ isShow: true, id: blog, type: type });
  };
  const onDeleteConfirmed = () => {
    if (blogToDelete?.id && blogsComments?.results.length) {
      dispatch(
        blogCommentAction(
          { id: blogToDelete.id, action: blogToDelete?.type },
          () => {
            const updatedBlogsList = blogsComments?.results?.filter(
              (item) => item.id !== blogToDelete.id
            );
            dispatch(setBlogs(updatedBlogsList || []));
            // setBlogToDelete({ isShow: false, id: null, type: null });

            setBlogToDelete(null);
            navigate.push(pagePaths.adminBlogs);
          }
        )
      );
    }
  };
  const closeDeleteConfirmModal = () => {
    setBlogToDelete({ isShow: false, id: null, type: null });
  };

  const onEdit = useCallback(
    (id, replay = "edit") => {
      console.log("replay", replay);
      if (replay === "replay") {
        navigate.push(pagePaths.adminCreateBlogsComment.replace(":id", id));
        return;
      }
      navigate.push(pagePaths.adminCreateBlogsEdit.replace(":id", id));
    },
    [navigate]
  );

  const dispatch = useDispatch([]);
  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "User comment",
        accessor: "comment",
        Cell: ({ cell }) => {
          return (
            <span className={styles.titleColumn}>
              {cell.row.original.comment ? cell.row.original.comment : "N/A"}
            </span>
          );
        },
      },
      {
        Header: "User Name",
        accessor: "user_name",
        Cell: ({ cell }) => {
          return (
            <span className={styles.titleColumn}>
              {cell.row.original.user_name
                ? cell.row.original.user_name
                : "N/A"}
            </span>
          );
        },
      },
      {
        Header: "User Email",
        accessor: "user_email",
        Cell: ({ cell }) => {
          return (
            <span className={styles.titleColumn}>
              {cell.row.original.user_email
                ? cell.row.original.user_email
                : "N/A"}
            </span>
          );
        },
      },
      {
        Header: "Comment Date",
        accessor: "commented_at",
      },

      // {
      //   Header: "Status",
      //   accessor: "is_approved",
      // },
      {
        Header: "Actions",
        accessor: "Actions",
        Cell: ({ cell }) => {
          return (
            <>
              <AcceptButton
                onClick={() =>
                  onDeleteButtonClicked(cell.row.original.id, "accept")
                }
              />
              <RejectButton
                onClick={() =>
                  onDeleteButtonClicked(cell.row.original.id, "reject")
                }
              />
            </>
          );
        },
      },
    ],
    [onEdit]
  );

  useEffect(() => {
    dispatch(fetchBlogsListUserComment(id));
  }, []);

  const mappedBlogs = blogsComments?.results?.map((item) => {
    return {
      ...item,
      blog_date: dayjs(item.blog_date).format("YYYY-MM-DD"),
    };
  });
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

  return (
    <>
      <ConfirmationModel
        showModal={blogToDelete?.isShow}
        ctaTitle={blogToDelete?.type === "reject" ? "Reject" : "Accept"}
        label={"Message"}
        message={`Are you sure you want to  ${
          blogToDelete?.type === "reject" ? "reject" : "accept"
        } the user message, Id: ${blogToDelete?.id}`}
        hideModal={closeDeleteConfirmModal}
        confirmModal={onDeleteConfirmed}
        type={blogToDelete?.type}
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
              <p className={styles.title}>Blog comment page</p>
              {/* <div className="row">
                <div className="input-group">
                  <input
                    className="form-control py-2"
                    type="search"
                    value={searchTerm}
                    id="example-search-input"
                    onChange={handleSearch}
                    aria-describedby="search"
                    onSubmit={onSearchFormSubmit}
                  />
                  <span className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button">
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </span>
                </div>
              </div> */}
              {/* <Link to={pagePaths.adminCreateBlogs}>
                <Button className={styles.addButton}>
                  <MdAdd /> Add Blog
                </Button>
              </Link> */}
            </div>
            {mappedBlogs?.length ? (
              <RTable columns={columns} data={mappedBlogs} />
            ) : (
              <p className={styles.noRecordFoundMessage}>
                No blog comments found.
              </p>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default AdminBlogsPage;
