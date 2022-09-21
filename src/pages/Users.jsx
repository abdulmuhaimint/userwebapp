import React, { useEffect, useState } from "react";
import { fetchUsers } from "../api/user";
import UserCard from "../components/UserCard/UserCard";

function Users() {
  const [users, setUsers] = useState([]);
  console.log({ users });

  useEffect(() => {
    (async () => {
      const { data } = await fetchUsers();
      setUsers(data);
    })();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Users</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          gap: "1rem",
        }}
      >
        {users.map((user) => (
          <UserCard {...user} key={user.id.toString()} />
        ))}
      </div>
    </div>
  );
}

export default Users;
