import React from "react";
import classes from "./Pagination.module.css";
import { usePagination, DOTS } from "./../../hooks/usePagination";

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  console.log("paginationRange", paginationRange);
  console.log("currentPage", currentPage);

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <>
      <ul className={classes.paginationContainer}>
        {/* Left navigation arrow */}
        <li className={classes.paginationItem} onClick={onPrevious}>
          <div className="arrow left" />
        </li>
        {paginationRange.map((pageNumber) => {
          // If the pageItem is a DOT, render the DOTS unicode character
          if (pageNumber === DOTS) {
            return <li className={classes.paginationItem}></li>;
          }

          // Render our Page Pills
          return (
            <li
              className={classes.paginationItem}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}
        {/*  Right Navigation arrow */}
        <li className={classes.paginationItem} onClick={onNext}>
          <div className="arrow right" />
        </li>
      </ul>
    </>
  );
};

export default Pagination;
