"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Card from "../../../components/Card";
import ConfirmationModel from "../../../components/ConfirmationModel";
import DeleteButton from "../../../components/DeleteButton/index";
import EditButton from "../../../components/EditButton/index";
import {
  deleteStandardSizeList,
  fetchListStandardSize,
} from "../../../redux/action";
import { setListStandardSize } from "../../../redux/slices/admin.slice";
import { pagePaths } from "../../../utils/constants/constant";
import lazyLoadable from "../../../utils/lazyLoadable";
import styles from "./styles.module.scss";

const RTable = lazyLoadable(() => import("../../../components/Table/index"));

const StandardSizeManagementPage = () => {
  const { listStandardSize } = useSelector((state) => state.admin);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const dispatch = useDispatch();
  const navigate = useRouter();
  const { id } = useParams();

  const onDeleteButtonClicked = (listId) => {
    setCategoryToDelete(listId);
  };

  const onDeleteConfirmed = () => {
    if (categoryToDelete?.id && listStandardSize?.length) {
      dispatch(
        deleteStandardSizeList(categoryToDelete.id, () => {
          const updatedConcernsList = listStandardSize.filter(
            (item) => item.id !== categoryToDelete.id
          );
          dispatch(setListStandardSize(updatedConcernsList || []));
          setCategoryToDelete(null);
        })
      );
    }
  };

  const closeDeleteConfirmModal = () => {
    setCategoryToDelete(null);
  };
  const onEdit = useCallback(
    (tableId) => {
      const removeId = pagePaths.adminEditStandardArticalType.replace(
        ":id",
        id
      );
      const lastUrl = removeId.replace(":standardEdit", tableId);
      navigate.push(lastUrl);
    },
    [navigate]
  );

  const columns = useMemo(
    () => [
      {
        Header: "id",
        accessor: "id",
      },
      {
        Header: "Standard Size Title",
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
            <>
              <EditButton onClick={() => onEdit(cell.row.original.id)} />
              <DeleteButton
                onClick={() => onDeleteButtonClicked(cell.row.original)}
              />
            </>
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    dispatch(fetchListStandardSize({ id }));
  }, [dispatch]);

  const mappedSubSubSubcategories = listStandardSize?.map((item) => {
    return {
      ...item,
    };
  });

  return (
    <>
      <ConfirmationModel
        showModal={!!categoryToDelete}
        ctaTitle={"Delete"}
        label={"Delete Confirmation"}
        message={`Are you sure you want to delete the standard artical type ${categoryToDelete?.name}, Id: ${categoryToDelete?.id}`}
        hideModal={closeDeleteConfirmModal}
        confirmModal={onDeleteConfirmed}
      />
      <div className={styles.container}>
        <div>
          <Card className={styles.card}>
            <div className={styles.cardHeader}>
              <p className={styles.title}>Standard Sizes List </p>
              {/* <Link to={pagePaths.adminCreateStandardArticalType}> */}
              <Button
                className={styles.addButton}
                onClick={() =>
                  navigate.push(
                    pagePaths.adminCreateStandardArticalType.replace(":id", id)
                  )
                }
              >
                <MdAdd /> Add Standard size
              </Button>
              {/* </Link> */}
            </div>
            {mappedSubSubSubcategories?.length ? (
              <RTable columns={columns} data={mappedSubSubSubcategories} />
            ) : (
              <p className={styles.noRecordFoundMessage}>
                No standard artical types found, please add new standard artical
                type.
              </p>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default StandardSizeManagementPage;
