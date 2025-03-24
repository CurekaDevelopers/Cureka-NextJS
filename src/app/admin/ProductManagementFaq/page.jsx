"use client";
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
import ReplayButton from "../../../components/ReplayButton";
import AdminBreadcrumbs from "../../../components/admin/AdminBreadcrumbs";
import { deleteProducts, fetchProductsAdmin } from "../../../redux/action";
import { setProductsList } from "../../../redux/slices/admin.slice";
import { pagePaths } from "../../../utils/constants/constant";
import lazyLoadable from "../../../utils/lazyLoadable";
import styles from "./styles.module.scss";

const RTable = lazyLoadable(() => import("../../../components/Table/index"));

const ProductManagementPage = () => {
  const { productsList } = useSelector((state) => state.admin);
  const [brandToDelete, setBrandToDelete] = useState(null);

  const navigate = useRouter();

  const dispatch = useDispatch();

  const onDeleteButtonClicked = (brand) => {
    setBrandToDelete(brand);
  };

  const onDeleteConfirmed = () => {
    if (brandToDelete?.id && productsList?.length) {
      dispatch(
        deleteProducts(brandToDelete.id, () => {
          const updatedBlogsList = productsList?.filter(
            (item) => item.id !== brandToDelete.id
          );
          dispatch(setProductsList(updatedBlogsList || []));
          setBrandToDelete(null);
        })
      );
    }
  };

  const onEdit = useCallback(
    (id) => {
      if (replay === "faq") {
        navigate.push(pagePaths.adminCreateProductFaq.replace(":id", id));
        return;
      }
      navigate.push(pagePaths.adminCreateProductEdit.replace(":id", id));
    },
    [navigate]
  );

  const closeDeleteConfirmModal = () => {
    setBrandToDelete(null);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Image",
        accessor: "image",
        Cell: ({ cell }) => {
          return (
            <img
              style={{ height: 50, width: 50 }}
              src={cell.row.original.image}
            />
          );
        },
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ cell }) => {
          return (
            <span className={styles.titleColumn}>{cell.row.original.name}</span>
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
            <>
              <EditButton onClick={() => onEdit(cell.row.original.id)} />
              <ReplayButton
                onClick={() => onEdit(cell.row.original.id, "faq")}
              />
              <DeleteButton
                onClick={() => onDeleteButtonClicked(cell.row.original)}
              />
            </>
          );
        },
      },
    ],
    [onEdit]
  );

  useEffect(() => {
    dispatch(fetchProductsAdmin());
  }, [dispatch]);

  const mappedBrands = productsList?.map((item) => {
    console.log();
    return {
      image: item?.front_image,
      name: item?.vendor_article_name,
      ...item,
    };
  });

  return (
    <>
      <ConfirmationModel
        showModal={!!brandToDelete}
        ctaTitle={"Delete"}
        label={"Delete Confirmation"}
        message={`Are you sure you want to delete the Product  ${brandToDelete?.name}, Id: ${brandToDelete?.id}`}
        hideModal={closeDeleteConfirmModal}
        confirmModal={onDeleteConfirmed}
      />
      <div className={styles.container}>
        <AdminBreadcrumbs
          items={[
            {
              path: pagePaths.adminProductManagement,
              label: "Products Management",
            },
          ]}
        />
        <div>
          <Card className={styles.card}>
            <div className={styles.cardHeader}>
              <p className={styles.title}>Products FAQ Management</p>
              <Link href={pagePaths.adminCreateProducts}>
                <Button className={styles.addButton}>
                  <MdAdd /> Add FAQ
                </Button>
              </Link>
            </div>
            {mappedBrands?.length ? (
              <RTable columns={columns} data={mappedBrands} />
            ) : (
              <p className={styles.noRecordFoundMessage}>
                No products found, please add new brand.
              </p>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default ProductManagementPage;
