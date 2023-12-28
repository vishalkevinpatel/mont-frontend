/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState, useEffect } from "react";
import { StudentIndex } from "./StudentIndex";
import { StudentsNew } from "./StudentsNew";
import { UserSignup } from "./UserSignup";
import { UserLogin } from "./UserLogin";
import { TeacherSignup } from "./TeacherSignup";
import { TeacherLogin } from "./TeacherLogin";
import { StudentsShow } from "./StudentsShow";
import { AttendanceIndex } from "./AttendanceIndex";
import { AttendanceNew } from "./AttendanceNew";
import { AttendanceShow } from "./AttendanceShow";
import { Modal } from "./Modal";

export function Content() {
  const [students, setStudents] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const [users, setUsers] = useState([]);
  const [isStudentsShowVisible, setIsStudentsShowVisible] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({});
  const [isAttendancesShowVisible, setIsAttendancesShowVisible] = useState(false);
  const [currentAttendance, setCurrentAttendance] = useState({});

  const handleStudentIndex = () => {
    console.log("handleStudentIndex");
    axios.get("http://localhost:3000/students.json").then((response) => {
      console.log(response.date);
      setStudents(response.data);
    });
  };

  const handleStudentNew = (params, successCallback) => {
    console.log("handleStudentNew", params);
    axios.post("http://localhost:3000/students.json", params).then((response) => {
      console.log("student made", response.data);
      setStudents([...students, response.data]);
      successCallback();
    });
  };

  const handleShowStudent = (student) => {
    console.log("handleShowStudent", student);
    setIsStudentsShowVisible(true);
    setCurrentStudent(student);
  };

  const handleUpdateStudent = (id, params, successCallback) => {
    console.log("handleUpdateStudent", params);
    axios.patch(`http://localhost:3000/students/${id}.json`, params).then((response) => {
      setStudents(
        students.map((student) => {
          if (student.id === response.data.id) {
            return response.data;
          } else {
            return student;
          }
        })
      );
      successCallback();
      handleClose();
    });
  };

  const handleShowAttendance = (attendance) => {
    console.log("handleShowAttendance", attendance);
    setIsAttendancesShowVisible(true);
    setCurrentAttendance(attendance);
  };

  const handleClose = () => {
    console.log("handleClose");
    setIsStudentsShowVisible(false);
    setIsAttendancesShowVisible(false);
    window.location.reload();
  };

  const handleDestroyStudent = (student) => {
    console.log("handleDestoryStudent", student);
    axios.delete(`http://localhost:3000/students/${student.id}.json`).then((response) => {
      setStudents(students.filter((p) => p.id !== student.id));
      handleClose();
    });
  };

  const handleAttendanceIndex = () => {
    console.log("handleAttendanceIndex");
    axios.get(`http://localhost:3000/attendances.json`).then((response) => {
      console.log(response.data);
      setAttendances(response.data);
    });
  };

  const handleAttendanceNew = (params, successCallback) => {
    console.log("handleAttendanceNew", params);
    axios.post("http://localhost:3000/attendances.json", params).then((response) => {
      setAttendances([...attendances, response.data]);
      successCallback();
    });
  };

  const handleUpdateAttendance = (id, params, successCallback) => {
    console.log("handleUpdateattendance", params);
    axios.patch(`http://localhost:3000/attendances/${id}.json`, params).then((response) => {
      setAttendances(
        attendances.map((attendance) => {
          if (attendance.id === response.data.id) {
            return response.data;
          } else {
            return attendance;
          }
        })
      );
      successCallback();
      handleClose();
    });
  };

  const handleDestroyAttendance = (attendance) => {
    console.log("handleDestoryStudent", attendance);
    axios.delete(`http://localhost:3000/attendances/${attendance.id}.json`).then((response) => {
      setAttendances(attendances.filter((p) => p.id !== attendance.id));
      handleClose();
    });
  };

  const handleUserIndex = () => {
    console.log("handleUserIndex");
    axios.get("http://localhost:3000/users.json").then((response) => {
      console.log(response.date);
      setUsers(response.data);
    });
  };

  useEffect(handleStudentIndex, []);
  useEffect(handleAttendanceIndex, []);
  useEffect(handleUserIndex, []);

  return (
    <div>
      <UserSignup />
      <UserLogin />
      <TeacherSignup />
      <TeacherLogin />
      <StudentsNew users={users} onCreateStudent={handleStudentNew} />
      <StudentIndex students={students} onShowStudent={handleShowStudent} />
      <Modal show={isStudentsShowVisible} onClose={handleClose}>
        <StudentsShow
          student={currentStudent}
          onUpdateStudent={handleUpdateStudent}
          onDestroyStudent={handleDestroyStudent}
        />
      </Modal>
      <AttendanceIndex attendances={attendances} onShowAttendance={handleShowAttendance} />
      <Modal show={isAttendancesShowVisible} onClose={handleClose}>
        <AttendanceShow
          attendance={currentAttendance}
          onUpdateAttendance={handleUpdateAttendance}
          onDestroyAttendance={handleDestroyAttendance}
        />
      </Modal>
      <AttendanceNew students={students} onCreateAttendance={handleAttendanceNew} />
      <span>omg all the info needs to go in here</span>
    </div>
  );
}
