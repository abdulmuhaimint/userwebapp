import React, { useState } from "react";
import classes from "./CreateUser.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setAge,
  setEmail,
  setIsPublic,
  setMessage,
  setName,
  setStatusMessage,
} from "../redux/slices/createUserSlice";
import { createUser } from "../redux/slices/usersSlice";

function CreateUser() {
  const name = useSelector((state) => state.createUser.name);
  const statusMessage = useSelector((state) => state.createUser.statusMessage);
  const email = useSelector((state) => state.createUser.email);
  const age = useSelector((state) => state.createUser.age);
  const isPublic = useSelector((state) => state.createUser.isPublic);
  const message = useSelector((state) => state.createUser.message);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setMessage(""));
    let user = {
      name,
      statusMessage,
      email,
      age,
      isPublic,
      createdAt: new Date().toISOString(),
    };
    try {
      dispatch({
        ...createUser(user),
        meta: {
          cb: () => {
            navigate(-1);
          },
        },
      });
    } catch (error) {
      setMessage(error);
    }
  };

  return (
    <div style={{ padding: "0rem 2rem" }}>
      <h1 style={{ textAlign: "center" }}>Create user</h1>
      <div className={classes.formContainer}>
        <div className={classes.dp} />
        <form onSubmit={handleSubmit}>
          <input
            id="name"
            placeholder="name"
            onChange={(e) => dispatch(setName(e.target.value))}
            value={name}
          />
          <br />
          <input
            id="statusMessage"
            placeholder="status message"
            onChange={(e) => dispatch(setStatusMessage(e.target.value))}
            value={statusMessage}
          />
          <br />
          <input
            id="email"
            placeholder="email"
            onChange={(e) => dispatch(setEmail(e.target.value))}
            value={email}
          />
          <br />
          <input
            id="age"
            placeholder="age"
            onChange={(e) => dispatch(setAge(e.target.value))}
            value={age}
          />
          <br />
          <input
            id="isPublic"
            placeholder="isPublic : true | false"
            onChange={(e) => dispatch(setIsPublic(e.target.value))}
            value={isPublic}
          />
          <br />
          <div style={{ alignSelf: "flex-end" }}>
            <button type="button" onClick={() => navigate(-1)}>
              Back
            </button>
            <button type="submit" style={{ marginLeft: "0.5rem" }}>
              Create
            </button>
          </div>{" "}
        </form>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default CreateUser;
