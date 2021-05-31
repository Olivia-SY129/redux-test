import { useEffect } from "react";

export default function UserList({ users, getUsers }) {
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (users.length === 0) {
    return <p>No User Info</p>;
  }

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{JSON.stringify(user.login)}</li>
      ))}
    </ul>
  );
}
