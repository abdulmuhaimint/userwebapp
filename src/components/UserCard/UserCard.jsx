import React from "react";
import classes from "./UserCard.module.css";

function UserCard({ name, age, createdAt, statusMessage, isPublic }) {
  return (
    <div className={classes.card}>
      <div className={classes.col}>
        <div className={classes.dp} />
        <p>Age : {age}</p>
      </div>
      <div className={classes.col}>
        <h4>Name : {name}</h4>
        <p>{statusMessage}</p>
        <p>Created at : {new Date(createdAt).toLocaleString()}</p>
      </div>
      <div className={classes.icon}>
        {!isPublic && <div className={classes.line} />}
      </div>
    </div>
  );
}

export default UserCard;
