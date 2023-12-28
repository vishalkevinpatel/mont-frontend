/* eslint-disable react/prop-types */
export function StudentIndex(props) {
  return (
    <div>
      <h1>The Kids arent alright</h1>
      {props.students.map((student) => (
        <div key={student.id}>
          <h2>Child: {student.name} </h2>
          <h4> Teacher: {student.teacher} </h4>
          <h4> Parent: {student.user} </h4>
          <button onClick={() => props.onShowStudent(student)}>more info</button>
        </div>
      ))}
    </div>
  );
}
