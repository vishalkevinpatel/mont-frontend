/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export function AttendanceIndex(props) {
  // const [teacherid, setTeacherId] = useState();

  // useEffect(() => {
  //   const teacherid = localStorage.getItem("teacher_id");
  //   setTeacherId(teacherid);
  // });

  // if (!teacherid) {
  //   return null;
  // }

  return (
    <div>
      <h1>All attendances</h1>
      {props.attendances.map((attendance) => (
        <div key={attendance.id}>
          <p>Student: {attendance.student.name}</p>
          <p>Date: {attendance.date}</p>
          <label>
            <p>
              Presence: <input type="radio" checked={attendance.presence} readOnly />{" "}
            </p>
          </label>
          <button onClick={() => props.onShowAttendance(attendance)}>Edit</button>
        </div>
      ))}
    </div>
  );
}
