// import "bootstrap/dist/css/bootstrap.min.css";
// import { memo } from "react";
// import BTable from "react-bootstrap/Table";
// import { FaArrowLeft, FaArrowRight, FaSortUp, FaStepBackward, FaStepForward } from "react-icons/fa";
// import { FaSortDown } from "react-icons/fa6";
// import { usePagination, useSortBy, useTable } from "react-table";
// import styles from "./styles.module.scss";

// export default memo(function RTable({ columns, data }) {
//   // Use the state and functions returned from useTable to build your UI
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     prepareRow,
//     page, // Instead of using 'rows', we'll use page,
//     // which has only the rows for the active page

//     // The rest of these things are super handy, too ;)
//     canPreviousPage,
//     canNextPage,
//     pageOptions,
//     pageCount,
//     gotoPage,
//     nextPage,
//     previousPage,
//     setPageSize,
//     state: { pageIndex, pageSize },
//   } = useTable(
//     {
//       columns,
//       data,
//       disableSortBy: true,

//     },
//     useSortBy,
//     usePagination,
//   );

//   // Render the UI for your table
//   return (
//     <div>
//       <div className={styles.tableWrapper}>
//         <div className="table-scroll">
//           <BTable striped size="sm" {...getTableProps()} className={styles.table}>
//             <thead>
//               {headerGroups.map((headerGroup) => (
//                 <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
//                   {headerGroup.headers.map((column) => (
//                     // Add the sorting props to control sorting. For this example
//                     // we can add them into the header props
//                     <th
//                       key={column.id}
//                       {...column.getHeaderProps(column.getSortByToggleProps())}
//                       className={styles.tableHeader}
//                     >
//                       {column.render("Header")}
//                       {/* Add a sort direction indicator */}
//                       <span className={styles.headerSortIcon}>
//                         {column.isSorted ? column.isSortedDesc ? <FaSortDown /> : <FaSortUp /> : ""}
//                       </span>
//                     </th>
//                   ))}
//                 </tr>
//               ))}
//             </thead>
//             <tbody {...getTableBodyProps()}>
//               {page.map((row, i) => {
//                 prepareRow(row);
//                 return (
//                   <tr key={i} {...row.getRowProps()} className={styles.tableRow}>
//                     {row.cells.map((cell, i) => {
//                       return (
//                         <td key={i} {...cell.getCellProps()}>
//                           {cell.render("Cell")}
//                         </td>
//                       );
//                     })}
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </BTable>
//         </div>
//       </div>
//       <div className={`pagination ${styles.pagination}`} style={{ marginTop: "10px" }}>
//         <button
//           className={styles.paginationButton}
//           onClick={() => gotoPage(0)}
//           disabled={!canPreviousPage}
//         >
//           <FaStepBackward />
//         </button>{" "}
//         <button
//           className={styles.paginationButton}
//           onClick={() => previousPage()}
//           disabled={!canPreviousPage}
//         >
//           <FaArrowLeft />
//         </button>{" "}
//         <button
//           className={styles.paginationButton}
//           onClick={() => nextPage()}
//           disabled={!canNextPage}
//         >
//           <FaArrowRight />
//         </button>{" "}
//         <button
//           className={styles.paginationButton}
//           style={{ marginRight: "10px" }}
//           onClick={() => gotoPage(pageCount - 1)}
//           disabled={!canNextPage}
//         >
//           <FaStepForward />
//         </button>{" "}
//         <span>
//           Page{" "}
//           <strong>
//             {pageIndex + 1} of {pageOptions.length}
//           </strong>{" "}
//           &nbsp;| Go to page:{" "}
//           <input
//             type="number"
//             min="1"
//             max={pageOptions.length}
//             defaultValue={pageIndex + 1}
//             onChange={(e) => {
//               const page = e.target.value ? Number(e.target.value) - 1 : 0;
//               gotoPage(page);
//             }}
//             style={{ width: "100px" }}
//           />
//         </span>{" "}
//         <select
//           value={pageSize}
//           onChange={(e) => {
//             setPageSize(Number(e.target.value));
//           }}
//         >
//           {[10, 20, 30, 40, 50].map((pageSize) => (
//             <option key={pageSize} value={pageSize}>
//               Show {pageSize}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// });

import "bootstrap/dist/css/bootstrap.min.css";
import { memo } from "react";
import BTable from "react-bootstrap/Table";
import {
  FaArrowLeft,
  FaArrowRight,
  FaSortUp,
  FaStepBackward,
  FaStepForward,
} from "react-icons/fa";
import { FaSortDown } from "react-icons/fa6";
import { usePagination, useSortBy, useTable } from "react-table";
import styles from "./styles.module.scss";

export default memo(function RTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      disableSortBy: true,
    },
    useSortBy,
    usePagination
  );

  return (
    <div>
      <div className={styles.tableWrapper}>
        <div className="table-scroll">
          <BTable
            striped
            size="sm"
            {...getTableProps()}
            className={styles.table}
          >
            <thead>
              {headerGroups.map((headerGroup) => {
                const { key: headerKey, ...headerProps } =
                  headerGroup.getHeaderGroupProps();
                return (
                  <tr key={headerKey} {...headerProps}>
                    {headerGroup.headers.map((column) => {
                      const { key: columnKey, ...columnProps } =
                        column.getHeaderProps(column.getSortByToggleProps());
                      return (
                        <th
                          key={columnKey}
                          {...columnProps}
                          className={styles.tableHeader}
                        >
                          {column.render("Header")}
                          <span className={styles.headerSortIcon}>
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <FaSortDown />
                              ) : (
                                <FaSortUp />
                              )
                            ) : (
                              ""
                            )}
                          </span>
                        </th>
                      );
                    })}
                  </tr>
                );
              })}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                const { key: rowKey, ...rowProps } = row.getRowProps();
                return (
                  <tr key={rowKey} {...rowProps} className={styles.tableRow}>
                    {row.cells.map((cell) => {
                      const { key: cellKey, ...cellProps } =
                        cell.getCellProps();
                      return (
                        <td key={cellKey} {...cellProps}>
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </BTable>
        </div>
      </div>
      <div
        className={`pagination ${styles.pagination}`}
        style={{ marginTop: "10px" }}
      >
        <button
          className={styles.paginationButton}
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          <FaStepBackward />
        </button>{" "}
        <button
          className={styles.paginationButton}
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          <FaArrowLeft />
        </button>{" "}
        <button
          className={styles.paginationButton}
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          <FaArrowRight />
        </button>{" "}
        <button
          className={styles.paginationButton}
          style={{ marginRight: "10px" }}
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          <FaStepForward />
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
          &nbsp;| Go to page:{" "}
          <input
            type="number"
            min="1"
            max={pageOptions.length}
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
});
