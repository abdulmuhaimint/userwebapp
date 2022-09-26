import React, { useEffect } from "react";
import classes from "./CreateUser.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  updateUser,
} from "../redux/slices/usersSlice";
import { getCurrentUser, setAge, setAvatarUrl, setCurrentUser, setCurrentUserDefault, setEmail, setIsPublic, setMessage, setName, setStatusMessage } from "../redux/slices/currentUserSlice";

function User() {
  const name = useSelector((state) => state.currentUser.name);
  const statusMessage = useSelector((state) => state.currentUser.statusMessage);
  const email = useSelector((state) => state.currentUser.email);
  const age = useSelector((state) => state.currentUser.age);
  const isPublic = useSelector((state) => state.currentUser.isPublic);
  const avatarUrl = useSelector((state) => state.currentUser.avatarUrl);
  const message = useSelector((state) => state.currentUser.message);
  const createdAt = useSelector((state) => state.currentUser.createdAt);

  const navigate = useNavigate();
  const { id: userId } = useParams();

  const dispatch = useDispatch();

  //fetch user details on mount
  useEffect(() => {
    dispatch(setMessage(""));
    (async () => {
      try {
        if (!userId) return;
        dispatch(setCurrentUserDefault())
        dispatch(getCurrentUser(userId));
      } catch (error) {
        dispatch(setMessage(error));
      }
    })();
  }, [userId, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setMessage(""));

    dispatch(
      updateUser({
        name,
        statusMessage,
        email,
        age,
        isPublic: isPublic === "true",
        avatarUrl,
        id: userId,
        createdAt,
      })
    );
  };

  const handleDelete = async () => {
    const confirm = window.confirm("are you sure to delete ?");
    if (!confirm) return;

    try {
      dispatch({ ...deleteUser(userId), meta: { cb: () => navigate(-1) } });
    } catch (error) {
      dispatch(setMessage(error));
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
          <input
            id="avatarUrl"
            placeholder="avatar url"
            onChange={(e) => dispatch(setAvatarUrl(e.target.value))}
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
