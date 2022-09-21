import React from "react";
import classes from "./UserCard.module.css";

function UserCard({
  name,
  age,
  createdAt,
  statusMessage,
  isPublic,
  avatarUrl,
  onClick
}) {
  return (
    <div className={classes.card} onClick={onClick}>
      <div className={classes.col}>
        <div
          className={classes.dp}
          style={{ backgroundImage: `url(${avatarUrl})` }}
        />
        <p>Age : {age}</p>
      </div>
      <div className={classes.col}>
        <h4>Name : {name}</h4>
        <p>{statusMessage}</p>
        <p>{new Date(createdAt).toLocaleString()}</p>
      </div>
      <div className={classes.icon}>
        {!isPublic && <div className={classes.line} />}
      </div>
    </div>
  );
}

export default UserCard;
