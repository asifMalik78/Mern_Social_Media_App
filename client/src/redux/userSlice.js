import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("User")),
  userTheme: localStorage.getItem("theme"),
  profile: null,
  searchResult: null,
  isLoading:false,
  isError:false,
  isUpdateLoading:false,
  isUpdateError:false
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    userLoading: (state) => {
      state.isLoading = true;
      state.isError = false;
    },

    userSuccess: (state, action) => {
      localStorage.setItem("User", JSON.stringify(action.payload));
      state.isLoading = false;
      state.isError = false;
      state.user = action.payload;
    },

    userError: (state) => {
      state.isLoading = false;
      state.isError = true;
    },

    changeTheme: (state, action) => {
      localStorage.setItem("theme", JSON.stringify(action.payload));
      state.userTheme = JSON.stringify(action.payload);
    },

    userLogout: (state) => {
      localStorage.setItem("User", null);
      state.user = null;
    },

    userUpdateLoading:(state) => {
      state.isUpdateLoading = true;
      state.isUpdateError = false;
    },

    userUpdate: (state, action) => {
      state.isUpdateLoading = false;
      state.user = action.payload;
      localStorage.setItem("User", JSON.stringify(action.payload));
    },

    userUpdateError:(state) => {
      state.isUpdateLoading = true;
      state.isUpdateError = false;
    }
    ,

    profileLoading: (state) => {
      state.isLoading = true;
      state.isError = false;
    },

    profileSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.profile = action.payload;
    },

    profileError: (state) => {
      state.isLoading = false;
      state.isError = true;
    },

    followUser: (state, action) => {
      let arr = state.user.user.following;
      state.user.user.following = [...arr, action.payload];
      localStorage.setItem("User", JSON.stringify(state.user));
    },
    unfollowUser: (state, action) => {
      let arr = state.user.user.following;
      arr = arr.filter((curr) => {
        return curr._id !== action.payload._id;
      });

      state.user.user.following = arr;
      localStorage.setItem("User", JSON.stringify(state.user));
    },

    searchLoading: (state) => {
      state.isLoading = true;
      state.isError = false;
    },

    searchSuccess: (state, action) => {
      state.isLoading = false;
      state.searchResult = action.payload;
    },

    searchError: (state) => {
      state.isLoading = false;
      state.isError = true;
    },

    searchNull: (state) => {
      state.searchResult = null;
    },
  },
});

export const {
  userLoading,
  userSuccess,
  userError,
  changeTheme,
  userLogout,
  profileLoading,
  profileSuccess,
  profileError,
  followUser,
  unfollowUser,
  searchLoading,
  searchSuccess,
  searchError,
  searchNull,
  userUpdate,
  userUpdateLoading,
  userUpdateError
} = userSlice.actions;
export default userSlice.reducer;
