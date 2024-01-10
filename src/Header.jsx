export function Header() {
  const userid = localStorage.getItem("user_id") === null;
  const teacherid = localStorage.getItem("teacher_id") === null;
  if (!userid || !teacherid) {
    return null;
  } else {
    return (
      <div>
        <h5 className="align-items-center justify-content-center text-center">
          please signup or login as a user or teacher
        </h5>{" "}
      </div>
    );
  }
}
