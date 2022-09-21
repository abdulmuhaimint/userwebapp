import axios from "axios";
const client = axios.create({
  baseURL: "http://localhost:3333",
});

export const fetchUsers = (page, limit) => {
  return client.get("/users", { params: { _page: page, _limit: limit } });
};

export const updateUser = () => {};

export const deleteUser = () => {};

export const createUser = (user) => {
  return client.post("/users", user);
};
