/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export function StudentsNew(props) {
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

  if (!teacherid) {
    // If teacherid does not exist, return null or an alternative component
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onCreateStudent(params, () => event.target.reset());
  };

  return (
    <div>
      <h1>Create a new student</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input name="name" type="text" />
        </div>
        <div>
          Image: <input name="image_url" type="text" />
        </div>
        <div>
          <input defaultValue={teacherid} name="teacher_id" type="text" hidden />
        </div>
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
        <button type="submit"> Create Student File </button>
      </form>
    </div>
  );
}
