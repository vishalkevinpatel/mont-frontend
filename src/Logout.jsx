import axios from "axios";

export function LogoutLink() {
  const handleClick = (event) => {
    event.preventDefault();
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    localStorage.removeItem("teacher_id");
    localStorage.removeItem("user_id");
    window.location.href = "/";
  };

  const userid = localStorage.getItem("user_id") === null;
  const teacherid = localStorage.getItem("teacher_id") === null;
  if (!userid || !teacherid) {
    return (
      <a href="#" onClick={handleClick}>
        Logout
      </a>
    );
  } else {
    return <div> </div>;
  }
}
