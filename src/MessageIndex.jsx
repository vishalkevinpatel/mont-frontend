/* eslint-disable react/prop-types */
export function MessageIndex(props) {
  const userid = localStorage.getItem("user_id") === null;
  const teacherid = localStorage.getItem("teacher_id") === null;
  if (!userid || !teacherid) {
    return (
      <div>
        <h1>All messages</h1>
        {props.messages.map((message) => (
          <div key={message.id}>
            <h2>Student: {message.student}</h2>
            <p>Message: {message.text}</p>
            <p>Teacher: {message.teacher} </p>
            <p>Parent: {message.parent}</p>
          </div>
        ))}
      </div>
    );
  } else {
    return null;
  }
}
