import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  page: 0,
  totalPages: 0,
  searchValue: "",
  sortBy: "createdAt",
  sortOrder: "asc",
  loading: false,
  error: false,
  limit:4
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    getUsers: () => {},
    getUsersByName : ()=>{},
    createUser: () => {},
    updateUser: () => {},
    deleteUser: () => {},
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setUsers,
  setPage,
  setSearchValue,
  setSortBy,
  setSortOrder,
  setTotalPages,
  getUsers,
  getUsersByName,
  createUser,
  deleteUser,
  updateUser,
  setLoading,
  setError,
} = userSlice.actions;

export default userSlice.reducer;
