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
import { MessageIndex } from "./MessageIndex";
import { MessagesNew } from "./MessagesNew";
import { Modal } from "./Modal";

export function Content() {
  const [students, setStudents] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [isStudentsShowVisible, setIsStudentsShowVisible] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({});
  const [isAttendancesShowVisible, setIsAttendancesShowVisible] = useState(false);
  const [currentAttendance, setCurrentAttendance] = useState({});

  // const handleStudentIndex = () => {
  //   console.log("handleStudentIndex");
  //   axios.get("http://localhost:3000/students.json").then((response) => {
  //     console.log(response.date);
  //     setStudents(response.data);
  //   });
  // };

  const handleStudentIndex = () => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      axios
        .get(`http://localhost:3000/users/${userId}.json`)
        .then((response) => {
          const user = response.data;
          if (user && Array.isArray(user.students)) {
            console.log("User-specific students:", user.students);
            const userStudents = user.students.filter((student) => student.user_id === parseInt(userId, 10));
            setStudents(userStudents);
          } else {
            console.log("Error: No students array found in user info");
            setStudents([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching user-specific students:", error);
          setStudents([]);
        });
    } else {
      console.log("handleStudentIndex");
      axios.get("http://localhost:3000/students.json").then((response) => {
        console.log(response.data);
        setStudents(response.data);
      });
    }
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

  // const handleAttendanceIndex = () => {
  //   console.log("handleAttendanceIndex");
  //   axios.get(`http://localhost:3000/attendances.json`).then((response) => {
  //     console.log(response.data);
  //     setAttendances(response.data);
  //   });
  // };

  const handleAttendanceIndex = () => {
    const userId = localStorage.getItem("user_id");

    if (userId) {
      console.log("handleAttendanceIndex for user:", userId);
      axios
        .get(`http://localhost:3000/attendances.json`)
        .then((response) => {
          const allAttendances = response.data;

          // Filter attendances based on user_id
          const userAttendances = allAttendances.filter((attendance) => {
            return attendance.student && attendance.student.user_id === parseInt(userId);
          });

          console.log("User-specific attendances:", userAttendances);
          setAttendances(userAttendances);
        })
        .catch((error) => {
          console.error("Error fetching all attendances:", error);
          setAttendances([]);
        });
    } else {
      console.log("handleAttendanceIndex");
      axios
        .get(`http://localhost:3000/attendances.json`)
        .then((response) => {
          console.log(response.data);
          setAttendances(response.data);
        })
        .catch((error) => {
          console.error("Error fetching all attendances:", error);
          setAttendances([]);
        });
    }
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

  // const handleMessageIndex = () => {
  //   const userId = localStorage.getItem("user_id");

  //   if (userId) {
  //     console.log("handleMessageIndex");
  //     axios.get(`http://localhost:3000/users/${userId}.json`).then((response) => {
  //       console.log(response.data);
  //       setMessages(response.data);
  //     });
  //   } else {
  //     console.log("handleMessageIndex");
  //     axios.get("http://localhost:3000/messages.json").then((response) => {
  //       console.log(response.date);
  //       setMessages(response.data);
  //     });
  //   }
  // };

  const handleMessageIndex = () => {
    const userId = localStorage.getItem("user_id");

    if (userId) {
      console.log("handleMessageIndex for user:", userId);
      axios
        .get(`http://localhost:3000/users/${userId}.json`)
        .then((response) => {
          const user = response.data;
          if (user && Array.isArray(user.messages)) {
            console.log("User-specific messages:", user.messages);
            setMessages(user.messages);
          } else {
            console.log("Error: No messages array found in user info");
            setMessages([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching user-specific messages:", error);
          setMessages([]);
        });
    } else {
      console.log("handleMessageIndex for all messages");
      axios
        .get("http://localhost:3000/messages.json")
        .then((response) => {
          console.log(response.data);
          setMessages(response.data);
        })
        .catch((error) => {
          console.error("Error fetching all messages:", error);
          setMessages([]);
        });
    }
  };

  const handleMessageNew = (params, successCallback) => {
    console.log("handleMessageNew", params);
    axios.post("http://localhost:3000/messages.json", params).then((response) => {
      setMessages([...messages, response.data]);
      successCallback();
    });
  };

  const handleDestroyMessage = (message) => {
    console.log("handleDestroyMessage", message);

    if (message && message.id) {
      axios
        .delete(`http://localhost:3000/messages/${message.id}.json`)
        .then((response) => {
          setMessages(messages.filter((p) => p.id !== message.id));
          handleClose();
        })
        .catch((error) => {
          console.error("Error deleting message:", error);
        });
    } else {
      console.error("Error: Message or its ID is undefined");
    }
  };

  const handleTeacherIndex = () => {
    console.log("handleTeacherIndex");
    axios.get("http://localhost:3000/teachers.json").then((response) => {
      console.log(response.date);
      setTeachers(response.data);
    });
  };

  useEffect(handleStudentIndex, []);
  useEffect(handleAttendanceIndex, []);
  useEffect(handleUserIndex, []);
  useEffect(handleMessageIndex, []);
  useEffect(handleTeacherIndex, []);

  return (
    <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
      <h1>Kinder-Care</h1>
      <UserSignup />
      <UserLogin />
      <TeacherSignup />
      <TeacherLogin />
      <StudentIndex users={users} students={students} onShowStudent={handleShowStudent} />
      <StudentsNew users={users} onCreateStudent={handleStudentNew} />
      <Modal show={isStudentsShowVisible} onClose={handleClose}>
        <StudentsShow
          student={currentStudent}
          onUpdateStudent={handleUpdateStudent}
          onDestroyStudent={handleDestroyStudent}
        />
      </Modal>
      <AttendanceNew students={students} onCreateAttendance={handleAttendanceNew} />
      <AttendanceIndex users={users} attendances={attendances} onShowAttendance={handleShowAttendance} />
      <Modal show={isAttendancesShowVisible} onClose={handleClose}>
        <AttendanceShow
          attendance={currentAttendance}
          onUpdateAttendance={handleUpdateAttendance}
          onDestroyAttendance={handleDestroyAttendance}
        />
      </Modal>
      <MessagesNew users={users} students={students} teachers={teachers} onCreateMessage={handleMessageNew} />
      <MessageIndex messages={messages} onDestroyMessage={handleDestroyMessage} />
      <span></span>
    </div>
  );
}
