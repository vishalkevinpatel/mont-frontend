/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
export function MessagesNew(props) {
  const [teacherid, setTeacherId] = useState();

  useEffect(() => {
    const teacherid = localStorage.getItem("teacher_id");
    setTeacherId(teacherid);
  });

  const [userid, setUserId] = useState();

  useEffect(() => {
    const userid = localStorage.getItem("user_id");
    setUserId(userid);
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onCreateMessage(params, () => event.target.reset());
  };
  if (userid || teacherid) {
    return (
      <div>
        <h1>New message</h1>
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
            Message: <textarea className="form-control" id="textarea" name="text" type="text" />
          </div>
          {teacherid ? (
            <input name="teacher" type="hidden" value={teacherid} />
          ) : (
            <div>
              Teacher:{" "}
              <select className="form-select" name="teacher_id">
                <option value="" disabled>
                  Select a Teacher
                </option>
                {props.teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          {userid ? (
            <input name="user" type="hidden" value={userid} />
          ) : (
            <div>
              Parent:{" "}
              <select className="form-select" name="user_id">
                <option value="" disabled>
                  Select a parent
                </option>
                {props.users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <button className="btn btn-primary" style={{ margin: 20 }} type="submit">
            Create Message
          </button>
        </form>
      </div>
    );
  } else {
    return null;
  }
}
