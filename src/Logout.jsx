import axios from "axios";

export function LogoutLink() {
  const handleClick = (event) => {
    event.preventDefault();
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    localStorage.removeItem("teacher_id");
    window.location.href = "/";
  };

  return (
    <a href="#" onClick={handleClick}>
      Logout
    </a>
  );
}