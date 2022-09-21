import axios from "axios";
const client = axios.create({
  baseURL: "http://localhost:3333/users",
});
export const fetchUsers = () => {
    return client.get("/")
};

export const updateUser = () => {};

export const deleteUser = () => {};

export const createUser = () => {};
