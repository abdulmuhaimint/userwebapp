import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  statusMessage: "",
  email: "",
  age: "",
  isPublic: "",
  message: "",
};

export const createUserSlice = createSlice({
  name: "createUser",
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
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const {
  setAge,
  setEmail,
  setIsPublic,
  setMessage,
  setName,
  setStatusMessage,
} = createUserSlice.actions;

export default createUserSlice.reducer;
