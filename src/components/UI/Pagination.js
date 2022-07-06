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

  const leftArrowClasses =
    currentPage === 1
      ? classes.paginationItem + " " + classes.disabled
      : classes.paginationItem;

  const rightArrowClasses =
    currentPage === lastPage
      ? classes.paginationItem + " " + classes.disabled
      : classes.paginationItem;
  const pillClassesHnadler = (pageNumber) => {
    return pageNumber === currentPage
      ? classes.paginationItem + " " + classes.selected
      : classes.paginationItem;
  };
  const leftArrow = classes.arrow + " " + classes.left;
  const rightArrow = classes.arrow + " " + classes.right;

  return (
    <>
      {/* <ul className={classes.paginationContainer}> */}
      <ul className={classes.paginationContainer + " " + className}>
        {/* Left navigation arrow */}
        <li className={leftArrowClasses} onClick={onPrevious}>
          <div className={leftArrow} />
        </li>
        {paginationRange.map((pageNumber) => {
          // If the pageItem is a DOT, render the DOTS unicode character
          if (pageNumber === DOTS) {
            return <li className={classes.paginationItem}>&#8230;</li>;
          }

          // Render our Page Pills
          return (
            <li
              className={pillClassesHnadler(pageNumber)}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}
        {/*  Right Navigation arrow */}
        <li className={rightArrowClasses} onClick={onNext}>
          <div className={rightArrow} />
        </li>
      </ul>
    </>
  );
};

export default Pagination;
