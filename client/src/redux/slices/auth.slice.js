import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  adminEmail: "",
  accessToken: "",
  showLoginModel: false,
  userDetails: {},
  roles: [],
  userRoles: [],
  isAdminStatus:"",
  adminAccessToken:""
};

export const authSliceName = "auth";

const authSlice = createSlice({
  name: authSliceName,
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = !!action.payload;
    },
    setAdminEmail: (state, action) => {
      state.adminEmail = action.payload;
    },
    setIsAdminStatus: (state, action) => {
      state.isAdminStatus = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setAdminAccessToken: (state, action) => {
      state.adminAccessToken = action.payload;
    },
    setShowLoginModel: (state, action) => {
      state.showLoginModel = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
    setUserRoles: (state, action) => {
      state.userRoles = action.payload;
    },
  },
});

const authReducer = authSlice.reducer;

export const { setIsLoggedIn, setAdminEmail, setIsAdminStatus,setUserRoles, setAccessToken, setAdminAccessToken,setRoles, setShowLoginModel, setUserDetails } =
  authSlice.actions;
export default authReducer;
