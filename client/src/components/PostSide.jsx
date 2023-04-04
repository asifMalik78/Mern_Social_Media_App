import styled from "styled-components";
import CreatePost from "./CreatePost";
import Post from "./Post";
import ProfileCard from "./ProfileCard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllPost, getProfilePost } from "../apiCalls";
import { useParams } from "react-router-dom";
const PostSide = ({ type }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user: currUser, profile } = useSelector((state) => state.User);
  const { allPost, profilePost } = useSelector((state) => state.Post);

  const fetchPosts = async () => {
    if (type === "profile") {
      await getProfilePost(dispatch, id);
    } else {
      await getAllPost(dispatch);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [currUser, id]);

  {
    return type !== "profile" ? (
      <Container>
        {type === "profile" ? <ProfileCard type={type} /> : null}
        <CreatePost />
        <>
          {allPost &&
            allPost?.map((curr) => {
              return <Post key={curr._id} curr={curr} />;
            })}
        </>
      </Container>
    ) : (
      <Container>
        {type === "profile" ? <ProfileCard type={type} /> : null}
        {currUser.user._id === profile?._id && <CreatePost />}

        <>
          {profilePost &&
            profilePost?.map((curr) => {
              return <Post key={curr._id} curr={curr} />;
            })}
        </>
      </Container>
    );
  }
};

const Container = styled.section`
  max-height: 96vh;
  overflow: scroll;
  padding: 0 15px;
`;
export default PostSide;
