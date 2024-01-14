/* eslint-disable react/prop-types */
export function StudentsShow(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onUpdateStudent(props.student.id, params, () => event.target.reset());
  };

  const handleClick = () => {
    props.onDestroyStudent(props.student);
  };

  const teacherid = localStorage.getItem("teacher_id") !== null;

  return (
    <div>
      <h1>Student Info</h1>
      <p>Name: {props.student.name} </p>
      <p>Image: {props.student.image_url} </p>
      <p>Teacher: {props.student.teacher} </p>
      {props.student.attendances && props.student.attendances.length > 0 && (
        <div>
          <p>Attendances</p>
          <ul className="nobull">
            {props.student.attendances.map((attendance) => (
              <li key={attendance.id}>
                Date: {attendance.date} - Presence: {attendance.presence.toString()}
              </li>
            ))}
          </ul>
        </div>
      )}
      {teacherid && (
        <>
          <p>Parent: {props.student.user} </p>
          <form onSubmit={handleSubmit}>
            <div>
              Name: <input defaultValue={props.student.name} name="name" type="text" />
            </div>
            <div>
              Image: <input defaultValue={props.student.image_url} name="image_ulr" type="text" />
            </div>
            <div>
              Teacher: <input defaultValue={props.student.teacher.name} name="teacher" type="text" />
            </div>
            <div>
              Parent: <input defaultValue={props.student.user} name="user" type="text" />
            </div>
          </form>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <button className="btn btn-primary" style={{ margin: 20 }} type="submit">
              Update info
            </button>
            <button className="btn btn-primary" style={{ margin: 20 }} onClick={handleClick}>
              Erase Student File
            </button>
          </div>
        </>
      )}
    </div>
  );
}
