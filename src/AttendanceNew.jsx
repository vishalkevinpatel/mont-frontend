/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export function AttendanceNew(props) {
  const [teacherid, setTeacherId] = useState();

  useEffect(() => {
    const teacherid = localStorage.getItem("teacher_id");
    setTeacherId(teacherid);
  });

  if (!teacherid) {
    // If teacherid does not exist, return null or an alternative component
    return null;
  }

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
          <select className="form-select" name="student_id">
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
          Date:{" "}
          <input
            className="form-control"
            name="date"
            type="text"
            defaultValue={new Date().toISOString().split("T")[0]}
          />
        </div>
        <div>
          Presence:{" "}
          <select className="form-select" name="presence">
            <option value="" disabled>
              Select presence
            </option>
            <option value="true">Present</option>
            <option value="false">Truant</option>
          </select>
        </div>
        {teacherid ? (
          <input name="teacher" type="hidden" value={teacherid} />
        ) : (
          <div>
            Teacher: <input name="teacher" type="text" />
          </div>
        )}
        <button className="btn btn-primary" style={{ margin: 20 }} type="submit">
          Create Attendance
        </button>
      </form>
    </div>
  );
}
