import { useContext, useMemo, useState } from "react";

import useHttp from "./../../hooks/useHttp";
import { getUsers } from "../../api/api";
import { useEffect } from "react";
import classes from "./StudentList.module.css";

import Student from "./Student";
import Pagination from "./../UI/Pagination";
import LoadingSpinner from "../UI/LoadingSpinner";

import { AppContext } from "./../../context/appContext";

let PageSize = 4;

const StudentList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { state } = useContext(AppContext);
  const { data, error, status } = state.studentData;
  const {
    studentData: students,
    nameFilter,
    tagFilter,
    sendRequest,
  } = useHttp(getUsers);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  // const nameFilteredStudents = students.data.filter((student) => {
  const nameFilteredStudents = data.filter((student) => {
    return (
      student.name.toLowerCase().indexOf(nameFilter.value.toLowerCase()) !== -1
    );
  });

  const tagFilteredStudents = nameFilteredStudents.filter((student) => {
    let tagString = "";

    if (student.tags.length !== 0) {
      tagString = student.tags.reduce((acc, tag) => {
        acc = acc + tag;
        return acc;
      }, "");
    }
    return (
      tagString.toLowerCase().indexOf(tagFilter.value.toLowerCase()) !== -1
    );
  });

  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return tagFilteredStudents.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, tagFilteredStudents]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="centered">
        <p className={classes.errorMessage}>{error}</p>
      </div>
    );
  }

  //  if (status === "completed" && (!loadedQuotes || loadedQuotes.length === 0)) {
  //    return <NoQuotesFound />;
  //  }

  // const NoQuotesFound = () => {
  //   return (
  //     <div className={classes.noquotes}>
  //       <p>No quotes found!</p>
  //       <Link className="btn" to="/new-quote">
  //         Add a Quote
  //       </Link>
  //     </div>
  //   );
  // };

  return (
    <>
      <ul className="studentList">
        {/* {tagFilteredStudents.map((studentDetails) => ( */}
        {currentData.map((studentDetails) => (
          <Student key={studentDetails.id} studentDetails={studentDetails} />
        ))}
      </ul>
      <Pagination
        className={classes.paginationBar}
        currentPage={currentPage}
        totalCount={tagFilteredStudents.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default StudentList;
