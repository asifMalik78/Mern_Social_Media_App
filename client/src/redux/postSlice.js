import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPost: [],
  profilePost: [],
  isLoading: false,
  isError: false,
};

const postSlice = createSlice({
  name: "Post",
  initialState,
  reducers: {
    postLoading: (state) => {
      state.isLoading = true;
      state.isError = false;
    },

    postSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.allPost = action.payload;
    },

    postError: (state) => {
      state.isLoading = false;
      state.isError = true;
    },

    addPostLoading: (state) => {
      state.isLoading = true;
      state.isError = false;
    },

    addPostSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.allPost = [action.payload, ...state.allPost];
      if (state.profilePost.length !== 0) {
        state.profilePost = [action.payload, ...state.profilePost];
      }
    },

    addPostError: (state) => {
      state.isLoading = false;
      state.isError = true;
    },

    profilePostLoading: (state) => {
      state.isLoading = true;
      state.isError = false;
    },

    profilePostSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.profilePost = action.payload;
    },

    profilePostError: (state) => {
      state.isLoading = false;
      state.isError = true;
    },

    deletePostSuccess: (state, action) => {
      const id = action.payload;
      let arr = state.allPost.filter((curr) => {
        return curr._id !== id;
      });
      state.allPost = arr;
      if (state.profilePost.length !== 0) {
        arr = state.profilePost.filter((curr) => {
          return curr._id !== id;
        });

        state.profilePost = arr;
      }
    },

    updatePostLoading: (state) => {
      state.isLoading = true;
      state.isError = false;
    },

    updatePostSuccess: (state, action) => {
      let arr = state.allPost;
      let id = action.payload._id;
      let idx = arr.findIndex((curr) => {
        return curr._id === id;
      });

      state.allPost[idx] = action.payload;

      if (state.profilePost.length !== 0) {
        arr = state.profilePost;
        idx = arr.findIndex((curr) => {
          return curr._id === id;
        });

        state.profilePost[idx] = action.payload;
      }
    },

    updatePostError: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const {
  postLoading,
  postSuccess,
  postError,
  profilePostLoading,
  profilePostSuccess,
  profilePostError,
  addPostLoading,
  addPostSuccess,
  addPostError,
  deletePostSuccess,
  updatePostLoading,
  updatePostSuccess,
  updatePostError,
} = postSlice.actions;
export default postSlice.reducer;
