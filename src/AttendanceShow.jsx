/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState } from "react";

export function AttendanceShow(props) {
  const [presence, setPresence] = useState(props.attendance.presence);

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onUpdateAttendance(props.attendance.id, params, () => event.target.reset());
    window.location.href = "/AttendanceIndex";
  };

  const handleClick = () => {
    props.onDestroyAttendance(props.attendance);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1>
        {props.attendance.student.name}'s attendance on {props.attendance.date}{" "}
      </h1>
      <form onSubmit={handleSubmit}>
        <p>
          Presence:{" "}
          <select name="presence" value={presence.toString()} onChange={(e) => setPresence(e.target.value === "true")}>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <button className="btn btn-primary" type="submit">
            Update Truancy
          </button>
          <button className="btn btn-primary" onClick={handleClick}>
            Delete Day
          </button>
        </div>
      </form>
    </div>
  );
}
