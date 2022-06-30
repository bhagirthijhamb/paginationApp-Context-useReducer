import { useContext } from "react";

import useHttp from "./../../hooks/useHttp";
import { getUsers } from "../../api/api";
import { useEffect } from "react";
import { AppContext } from "../../context/appContext";

import Student from "./Student";

const StudentList = () => {
  const {
    studentData: students,
    nameFilter,
    tagFilter,
    sendRequest,
  } = useHttp(getUsers);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  const nameFilteredStudents = students.data.filter((student) => {
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

  return (
    <ul>
      {tagFilteredStudents.map((studentDetails) => (
        <Student key={studentDetails.id} studentDetails={studentDetails} />
      ))}
    </ul>
  );
};

export default StudentList;
