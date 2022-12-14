import { takeLatest } from "redux-saga/effects";

//handlers goes here
import {
  handleCreateUser,
  handleDeleteUser,
  handleFetchSingleUser,
  handleFetchUsers,
  handleFetchUsersByName,
  handleUpdateUser,
} from "./handlers/userHandler";

//actions to watch
import {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  getUsersByName,
} from "../slices/usersSlice";
import { getCurrentUser } from "../slices/currentUserSlice";

export function* watcherSaga() {
  //watch each action here
  yield takeLatest(createUser.type, handleCreateUser);
  yield takeLatest(updateUser.type, handleUpdateUser);
  yield takeLatest(deleteUser.type, handleDeleteUser);
  yield takeLatest(getCurrentUser.type, handleFetchSingleUser);
  yield takeLatest(getUsers.type, handleFetchUsers);
  yield takeLatest(getUsersByName.type, handleFetchUsersByName);

}
