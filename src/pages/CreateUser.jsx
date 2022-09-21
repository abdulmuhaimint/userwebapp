import React, { useState } from "react";
import { createUser } from "../api/user";
import classes from "./CreateUser.module.css";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [name, setName] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [isPublic, setIsPublic] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setMessage("");
    e.preventDefault();
    if (name && statusMessage && email && age && isPublic) {
      const res = await createUser({
        name,
        statusMessage,
        email,
        age,
        isPublic,
        createdAt: new Date().toISOString(),
      });
      if (res.status === 201) {
        setMessage("User created");
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      } else {
        setMessage("Error");
      }
    }
    return;
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
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <br />
          <input
            id="statusMessage"
            placeholder="status message"
            onChange={(e) => setStatusMessage(e.target.value)}
            value={statusMessage}
          />
          <br />
          <input
            id="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <br />
          <input
            id="age"
            placeholder="age"
            onChange={(e) => setAge(e.target.value)}
            value={age}
          />
          <br />
          <input
            id="isPublic"
            placeholder="isPublic : true | false"
            onChange={(e) => setIsPublic(e.target.value)}
            value={isPublic}
          />
          <br />
          <button type="submit">Create</button>
        </form>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default CreateUser;
