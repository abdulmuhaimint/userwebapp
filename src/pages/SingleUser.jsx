import React, { useEffect, useState } from "react";
import { deleteUser, fetchSingleUser, updateUser } from "../api/user";
import classes from "./CreateUser.module.css";
import { useNavigate, useParams } from "react-router-dom";

function User() {
  const [name, setName] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [isPublic, setIsPublic] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [message, setMessage] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const navigate = useNavigate();
  const { id: userId } = useParams();

  //fetch user details on mount
  useEffect(() => {
    (async () => {
      try {
        if (!userId) return;
        const { data } = await fetchSingleUser(userId);
        setName(data.name);
        setAvatarUrl(data.avatarUrl);
        setAge(data.age);
        setEmail(data.email);
        setIsPublic(data.isPublic);
        setStatusMessage(data.statusMessage);
        setCreatedAt(data.createdAt);
      } catch (error) {
        setMessage(error);
      }
    })();
  }, [userId]);

  const handleSubmit = async (e) => {
    setMessage("");
    e.preventDefault();
    if (name && statusMessage && email && age && isPublic) {
      const res = await updateUser({
        name,
        statusMessage,
        email,
        age,
        isPublic: isPublic === "true",
        avatarUrl,
        id: userId,
        createdAt,
      });
      if (res.status === 200) {
        setMessage("User updated");
      } else {
        setMessage("Error");
      }
    }
    return;
  };

  const handleDelete = async () => {
    const confirm = window.confirm("are you sure to delete ?");
    if (!confirm) return;

    try {
      await deleteUser(userId);
      navigate(-1);
    } catch (error) {
      setMessage(error);
    }
  };

  return (
    <div style={{ padding: "0rem 2rem" }}>
      <h1 style={{ textAlign: "center" }}>User details</h1>
      <div className={classes.formContainer}>
        <div
          className={classes.dp}
          style={{ backgroundImage: `url(${avatarUrl})` }}
        />
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
          <input
            id="avatarUrl"
            placeholder="avatar url"
            onChange={(e) => setAvatarUrl(e.target.value)}
            value={avatarUrl}
          />
          <br />
          <div style={{ alignSelf: "flex-end" }}>
            <button type="button" onClick={() => navigate(-1)}>
              Back
            </button>
            <button type="submit" style={{ margin: "0rem 0.5rem" }}>
              Save
            </button>
            <button type="button" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </form>
        <p>created at :{new Date(createdAt).toLocaleString()}</p>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default User;
