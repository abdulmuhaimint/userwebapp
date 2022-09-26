import { call, put, select } from "redux-saga/effects";

//actions
import {
  setCurrentUser,
  setError,
  setLoading,
  setTotalPages,
  setUsers,
} from "../../slices/userSlice";

//api reuests
import {
  createUser,
  deleteUser,
  fetchSingleUser,
  fetchUsers,
  fetchUsersByName,
  updateUser,
} from "../requests/userRequests";

//handlers goes here

export function* handleCreateUser(action) {
  try {
    yield put(setLoading(true));
    yield call(createUser, action.payload);
    yield put(setLoading(false));
  } catch (error) {
    console.log(error);
  }
}

export function* handleDeleteUser(action) {
  try {
    yield put(setLoading(true));
    yield call(deleteUser, action.payload);
    yield put(action.navigate("/users"));
    yield put(setLoading(false));
  } catch (error) {
    console.log(error);
    yield put(setError(true));
  }
}

export function* handleUpdateUser(action) {
  try {
    yield put(setError(false));
    yield put(setLoading(true));
    yield call(updateUser, action.payload);
    yield put(setLoading(false));
  } catch (error) {
    console.log(error);
    yield put(setError(true));
  }
}

export function* handleFetchUsers(action) {
  try {
    const response = yield call(fetchUsers, action.payload);
    const { data, headers } = response;
    if (headers["x-total-count"]) {
      let total_count = headers["x-total-count"];
      let limit = yield select((state) => state.user.limit);
      let pagecount = Math.ceil(total_count / limit);
      yield put(setTotalPages(pagecount));
    }
    yield put(setUsers(data));
  } catch (error) {
    console.log(error);
  }
}

export function* handleFetchSingleUser(action) {
  try {
    const response = yield call(fetchSingleUser, action.payload);
    const { data } = response;
    yield put(setCurrentUser(data));
  } catch (error) {
    console.log(error);
  }
}

export function* handleFetchUsersByName(action) {
  try {
    const response = yield call(fetchUsersByName, action.payload);
    const { data, headers } = response;
    if (headers["x-total-count"]) {
      let total_count = headers["x-total-count"];
      let limit = yield select((state) => state.user.limit);
      let pagecount = Math.ceil(total_count / limit);
      yield put(setTotalPages(pagecount));
    }
    yield put(setUsers(data));
  } catch (error) {
    console.log(error);
  }
}
