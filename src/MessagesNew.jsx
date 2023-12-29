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
            Message: <input name="text" type="text" />
          </div>
          {teacherid ? (
            <input name="teacher" type="hidden" value={teacherid} />
          ) : (
            <div>
              Teacher:{" "}
              <select name="teacher_id">
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
              <select name="user_id">
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
          <button type="submit">Create Message</button>
        </form>
      </div>
    );
  } else {
    return null;
  }
}
