import axios from "axios";
import { useState, useEffect } from "react";

const jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

export function TeacherLogin() {
  const [teacherid, setTeacherId] = useState();

  useEffect(() => {
    const teacherid = localStorage.getItem("teacher_id");
    setTeacherId(teacherid);
  }, []);

  const [errors, setErrors] = useState([]);

  const [userid, setUserId] = useState();

  useEffect(() => {
    const userid = localStorage.getItem("user_id");
    setUserId(userid);
  });

  if (userid) {
    // If teacherid does not exist, return null or an alternative component
    return null;
  }

  if (teacherid) {
    // If teacherid does not exist, return null or an alternative component
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/sessions_teachers.json", params)
      .then((response) => {
        console.log(response.data);
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        localStorage.setItem("teacher_id", response.data.teacher_id);
        event.target.reset();
        window.location.href = "/"; // Change this to hide a modal, redirect to a specific page, etc.
      })
      .catch((error) => {
        console.log(error.response);
        setErrors(["Invalid email or password"]);
      });
  };

  return (
    <div id="login">
      <h1>Teacher Login</h1>
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div>
          Email: <input name="email" type="email" />
        </div>
        <div>
          Password: <input name="password" type="password" />
        </div>
        <button className="btn btn-primary" style={{ margin: 20 }} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
