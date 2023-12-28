/* eslint-disable react/prop-types */
export function AttendanceIndex(props) {
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
