/* eslint import/no-extraneous-dependencies: off */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import history from '../../@history'

export const setUser = createAsyncThunk(
  "user/setUser",
  async (user, { dispatch, getState }) => {
    console.log(user);
    // set userrole in arr or null
    return { role: [user.role], data: user.data };
  }
);

export const logoutUser = () => async (dispatch, getState) => {
  history.push({
    pathname: "/page-login",
  });

  return dispatch(userLoggedOut());
};

const initialState = {
  role: null,
  data: {
    displayName: "John Doe",
    email: "johndoe@withinpixels.com",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoggedOut: (state, action) => initialState,
  },
  extraReducers: {
    [setUser.fulfilled]: (state, action) => action.payload,
  },
});

export const { userLoggedOut } = userSlice.actions;

export const selectUser = ({ user }) => user;

export default userSlice.reducer;
