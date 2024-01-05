/* eslint-disable react/prop-types */
export function AttendanceIndex(props) {
  const userid = localStorage.getItem("user_id") === null;
  const teacherid = localStorage.getItem("teacher_id") === null;

  if (!teacherid || !userid) {
    return (
      <div>
        <h1>All attendances</h1>
        {props.attendances.map((attendance) => (
          <div key={attendance.id}>
            <p>Student: {attendance.student.name}</p>
            <p>Date: {attendance.date}</p>
            <label>
              <p>
                Presence: <input type="checkbox" checked={attendance.presence} readOnly />{" "}
              </p>
            </label>
            <span></span>
            <span></span>
            <button
              className="btn btn-primary"
              style={{ margin: 20 }}
              onClick={() => props.onShowAttendance(attendance)}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    );
  } else {
    return null;
  }
}
