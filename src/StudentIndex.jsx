/* eslint-disable react/prop-types */
export function StudentIndex(props) {
  const userid = localStorage.getItem("user_id") === null;
  const teacherid = localStorage.getItem("teacher_id") === null;
  if (!userid || !teacherid) {
    return (
      <div>
        <h1>Students</h1>
        {props.students.map((student) => (
          <div key={student.id}>
            <h2>Child: {student.name} </h2>
            <h4> Teacher: {student.teacher} </h4>
            {userid && (
              <>
                <h4> Parent: {student.user} </h4>
              </>
            )}
            <button className="btn btn-primary" style={{ margin: 20 }} onClick={() => props.onShowStudent(student)}>
              more info
            </button>
          </div>
        ))}
      </div>
    );
  } else {
    return null;
  }
}
