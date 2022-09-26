import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3333",
});

export const fetchUsers = (options) => {
  return client.get("/users", {
    params: {
      _page: options.page,
      _limit: options.limit,
      _sort: options.sortBy,
      _order: options.sortOrder,
    },
  });
};

export const fetchSingleUser = (id) => {
  return client.get(`/users/${id}`);
};

export const updateUser = (user) => {
  return client.put(`/users/${user.id}`, user);
};

export const deleteUser = (id) => {
  return client.delete(`/users/${id}`);
};

export const createUser = (user) => {
  return client.post("/users", user);
};

export const fetchUsersByName = (options) => {
  return client.get("/users", {
    params: {
      _page: options.page,
      _limit: options.limit,
      name_like: options.searchValue,
      _sort: options.sortBy,
      _order: options.sortOrder,
    },
  });
};
