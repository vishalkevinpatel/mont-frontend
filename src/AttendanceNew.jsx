/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export function AttendanceNew(props) {
  const [teacherid, setTeacherId] = useState();

  useEffect(() => {
    const teacherid = localStorage.getItem("teacher_id");
    setTeacherId(teacherid);
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onCreateAttendance(params, () => event.target.reset());
  };

  return (
    <div>
      <h1>Attendance</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Name:{" "}
          <select name="student_id">
            <option value="" disabled>
              Select a student
            </option>
            {props.students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          Date: <input name="date" type="text" />
        </div>
        <div>
          Presence: <input name="presence" type="text" />
        </div>
        <div>
          <input defaultValue={teacherid} name="teacher_id" type="text" hidden />
        </div>
        <button type="submit">Create Attendance</button>
      </form>
    </div>
  );
}
