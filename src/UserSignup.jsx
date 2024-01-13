import axios from "axios";
import { useState, useEffect } from "react";

export function UserSignup() {
  const [errors, setErrors] = useState([]);

  const [userid, setUserId] = useState();

  useEffect(() => {
    const userid = localStorage.getItem("user_id");
    setUserId(userid);
  });

  const teacherid = localStorage.getItem("teacher_id") !== null;

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
      .post("http://localhost:3000/users.json", params)
      .then((response) => {
        console.log(response.data);
        event.target.reset();
        window.location.href = "/"; // Change this to hide a modal, redirect to a specific page, etc.
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div id="signup">
      <h1>User Signup</h1>
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input className="form-control" name="name" type="text" />
        </div>
        <div>
          Email: <input className="form-control" name="email" type="email" />
        </div>
        <div>
          Password: <input className="form-control" name="password" type="password" />
        </div>
        <div>
          Password confirmation: <input className="form-control" name="password_confirmation" type="password" />
        </div>
        <button className="btn btn-primary" style={{ margin: 20 }} type="submit">
          Signup
        </button>
      </form>
    </div>
  );
}
