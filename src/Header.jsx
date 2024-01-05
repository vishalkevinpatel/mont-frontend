export function Header() {
  const userid = localStorage.getItem("user_id") === null;
  const teacherid = localStorage.getItem("teacher_id") === null;
  if (!userid || !teacherid) {
    return null;
  } else {
    return (
      <div>
        <h3>Please Signup or Login as a teacher or user.</h3>{" "}
      </div>
    );
  }
}
