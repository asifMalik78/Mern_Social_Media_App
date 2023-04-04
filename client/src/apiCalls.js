import {
  userLoading,
  userError,
  userSuccess,
  userUpdate,
  profileLoading,
  profileSuccess,
  profileError,
  followUser as follow,
  unfollowUser as unfollow,
  searchLoading,
  searchSuccess,
  searchError,
  userUpdateLoading,
  userUpdateError,
} from "./redux/userSlice";
import {
  postLoading,
  postError,
  postSuccess,
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
} from "./redux/postSlice";
import { publicRequest, userRequest } from "./apiConfig";

//login user
export const login = async (dispatch, user) => {
  await dispatch(userLoading());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(userSuccess(res.data));
  } catch (error) {
    await dispatch(userError());
  }
};

//register user
export const register = async (dispatch, user) => {
  await dispatch(userLoading());
  try {
    const res = await publicRequest.post("/auth/register", user);
    await dispatch(userSuccess(res.data));
  } catch (error) {
    await dispatch(userError());
  }
};

//update user
export const updateUser = async (dispatch, userId, user) => {
  dispatch(userUpdateLoading());
  try {
    const res = await userRequest.put(`/user/${userId}`, user);
    await dispatch(userUpdate(res.data));
  } catch (error) {
    userUpdateError();
  }
};

//get all post of user
export const getAllPost = async (dispatch) => {
  await dispatch(postLoading());
  try {
    const res = await userRequest.get("/post/all");
    await dispatch(postSuccess(res.data.allPost));
  } catch (error) {
    await dispatch(postError());
  }
};

//get profile post
export const getProfilePost = async (dispatch, id) => {
  await dispatch(profilePostLoading());
  try {
    const res = await userRequest.get(`/post/all?id=${id}`);
    await dispatch(profilePostSuccess(res.data));
  } catch (error) {
    await dispatch(profilePostError());
  }
};

//get profile
export const getProfile = async (dispatch, id) => {
  await dispatch(profileLoading());
  try {
    const res = await userRequest.get(`/user/${id}`);
    await dispatch(profileSuccess(res.data));
  } catch (error) {
    await dispatch(profileError());
  }
};

//create post
export const createPost = async (dispatch, postData) => {
  await dispatch(addPostLoading());
  try {
    const res = await userRequest.post("/post/create", postData);
    await dispatch(addPostSuccess(res.data.post));
  } catch (error) {
    await dispatch(addPostError());
  }
};

//update post
export const updatePost = async (dispatch, postId, profileData) => {
  dispatch(updatePostLoading());
  try {
    const res = await userRequest.put(`/post/${postId}`, profileData);
    await dispatch(updatePostSuccess(res.data));
  } catch (error) {
    await dispatch(updatePostError());
  }
};

//delete post
export const deletePost = async (dispatch, id) => {
  try {
    await userRequest.delete(`/post/${id}`);
    await dispatch(deletePostSuccess(id));
  } catch (error) {}
};

//like post
export const likePost = async (likeData) => {
  try {
    await userRequest.put(`/post/like/${likeData.id}`, {
      likedBy: likeData.likedBy,
    });
  } catch (error) {
    console.log(error);
  }
};

//comment post
export const commentPost = async (commentData) => {
  try {
    const res = await userRequest.post("/comment/create", commentData);
    return res.data;
  } catch (error) {}
};

//delete comment
export const deleteComment = async (commentId) => {
  try {
    await userRequest.delete(`/comment/${commentId}`);
  } catch (error) {}
};

//follow user
export const followUser = async (dispatch, user) => {
  try {
    await userRequest.put(`/user/follow/${user._id}`);
    dispatch(follow(user));
  } catch (error) {}
};

//unfollow user
export const unfollowUser = async (dispatch, user) => {
  try {
    await userRequest.put(`/user/unfollow/${user._id}`);
    dispatch(unfollow(user));
  } catch (error) {}
};

//search user
export const searchUsers = async (dispatch, query) => {
  dispatch(searchLoading());
  try {
    const res = await userRequest.get(`/user?search=${query}`);
    dispatch(searchSuccess(res.data.users));
  } catch (error) {
    dispatch(searchError());
  }
};
