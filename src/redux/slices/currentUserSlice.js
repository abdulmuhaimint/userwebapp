import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  statusMessage: "",
  email: "",
  age: "",
  isPublic: "",
  avatarUrl: "",
  message: "",
  createdAt: "",
};

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setStatusMessage: (state, action) => {
      state.statusMessage = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setAge: (state, action) => {
      state.age = action.payload;
    },
    setIsPublic: (state, action) => {
      state.isPublic = action.payload;
    },
    setAvatarUrl: (state, action) => {
      state.avatarUrl = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setCreatedAt: (state, action) => {
      state.createdAt = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.age = action.payload.age;
      state.email = action.payload.email;
      state.isPublic = action.payload.isPublic;
      state.avatarUrl = action.payload.avatarUrl;
      state.createdAt = action.payload.createdAt;
      state.name = action.payload.name;
      state.statusMessage = action.payload.statusMessage;
    },
    getCurrentUser: () => {},
  },
});

export const {
  setAge,
  setAvatarUrl,
  setCreatedAt,
  setEmail,
  setIsPublic,
  setMessage,
  setName,
  setStatusMessage,
  getCurrentUser,
  setCurrentUser
} = currentUserSlice.actions;

export default currentUserSlice.reducer;
