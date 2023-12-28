/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState } from "react";

export function AttendanceShow(props) {
  const [presence, setPresence] = useState(props.attendance.presence);

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onUpdateAttendance(props.attendance.id, params, () => event.target.reset());
  };

  const handleClick = () => {
    props.onDestroyAttendance(props.attendance);
  };

  return (
    <div>
      <h1>
        {props.attendance.student.name}'s Attendance on {props.attendance.date}{" "}
      </h1>
      <form onSubmit={handleSubmit}>
        <p>
          Presence:{" "}
          <select name="presence" value={presence.toString()} onChange={(e) => setPresence(e.target.value === "true")}>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </p>
        <button type="submit">Update Truancy</button>
      </form>
      <button onClick={handleClick}>Delete Day</button>
    </div>
  );
}
