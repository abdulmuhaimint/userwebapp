import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3333",
});

export const fetchUsers = (
  page,
  limit,
  sortBy = "createdAt",
  sortOrder = "asc"
) => {
  return client.get("/users", {
    params: { _page: page, _limit: limit, _sort: sortBy, _order: sortOrder },
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

export const fetchUsersByName = (
  searchValue,
  page,
  limit,
  sortBy = "createdAt",
  sortOrder = "asc"
) => {
  return client.get("/users", {
    params: {
      _page: page,
      _limit: limit,
      name_like: searchValue,
      _sort: sortBy,
      _order: sortOrder,
    },
  });
};
