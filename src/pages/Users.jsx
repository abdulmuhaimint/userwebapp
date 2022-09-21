import React from "react";
import UserCard from "../components/UserCard/UserCard";

function Users() {
  return (
    <div>
      <h1>Users</h1>
      <div style={{ width: "30%" }}>
        <UserCard
          age={22}
          createdAt={"05/15/2022 10:00"}
          isPublic={false}
          name="Abdul Muhaimin"
          statusMessage={"Working from home"}
        />
      </div>
    </div>
  );
}

export default Users;
