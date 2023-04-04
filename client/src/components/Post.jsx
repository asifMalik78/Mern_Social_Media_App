import styled from "styled-components";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { UilThumbsUp as Like } from "@iconscout/react-unicons";
import { UilChat as Comment } from "@iconscout/react-unicons";
import { UilShare as Share } from "@iconscout/react-unicons";
import Comments from "./Comments";
import { useState } from "react";
import { UilEdit } from "@iconscout/react-unicons";
import { UilTrashAlt } from "@iconscout/react-unicons";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Link } from "react-router-dom";
import PostModal from "../modals/PostModal";
import { useSelector, useDispatch } from "react-redux";
import { likePost, deletePost } from "../apiCalls";
TimeAgo.addLocale(en);
const Post = ({ curr }) => {
  const dispatch = useDispatch();
  const [openComment, setOpenComment] = useState(false);
  const { userTheme: theme, user: currUser } = useSelector(
    (state) => state.User
  );
  const [postLikes, setPostLikes] = useState(curr.postLikes.length);
  const timeAgo = new TimeAgo("en-US");
  const isLiked = () => {
    const found = curr.postLikes.find((id) => {
      return id === currUser.user._id ? true : false;
    });

    return found;
  };
  const [inc, setInc] = useState(isLiked);
  const postLikeHandler = async () => {
    const found = curr.postLikes.find((id) => {
      return id === currUser.user._id ? true : false;
    });

    if (inc) {
      setPostLikes(postLikes - 1);
      setInc(!inc);
    } else {
      setPostLikes(postLikes + 1);
      setInc(!inc);
    }
    const likeData = {
      id: curr._id,
      likedBy: currUser.user._id,
    };
    await likePost(likeData);
  };

  const deletePostHandler = async () => {
    await deletePost(dispatch, curr._id);
  };
  return (
    <Container themeMode={theme}>
      <div className="post-container">
        <div className="post-header">
          <Link
            to={`/profile/${curr.postedBy._id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="wrapper">
              <div className="post-profile">
                <img src={curr.postedBy.img} alt="img" />
              </div>

              <div className="user-name">
                <h6>{curr.postedBy.name}</h6>
                <p>{timeAgo.format(new Date(curr.createdAt))}</p>
              </div>
            </div>
          </Link>

          {curr.postedBy._id === currUser.user._id && (
            <div className="options">
              <div className="edit" data-tooltip-id="edit-tooltip">
                <PostModal post={curr}>
                  <UilEdit />
                </PostModal>
              </div>
              <ReactTooltip
                id="edit-tooltip"
                place="bottom"
                content="Edit Post"
                style={{ fontSize: "0.9rem" }}
              />

              <div className="delete" data-tooltip-id="delete-tooltip">
                <UilTrashAlt
                  style={{ color: "red" }}
                  onClick={deletePostHandler}
                />
              </div>

              <ReactTooltip
                id="delete-tooltip"
                place="bottom"
                content="Delete Post"
                style={{ fontSize: "0.9rem" }}
              />
            </div>
          )}
        </div>

        <div className="post-body">
          <div className="post-desc">
            <p>{curr.postDesc}</p>
          </div>

          {curr.postImg && (
            <div className="post-img">
              <img src={curr.postImg} alt="img" />
            </div>
          )}
        </div>

        <div className="post-footer">
          <div className="footer-icons-wrapper">
            <div className="icon">
              <Like onClick={postLikeHandler} />
            </div>

            <div className="icon" onClick={() => setOpenComment(!openComment)}>
              <Comment />
            </div>

            <div className="icon">
              <Share />
            </div>
          </div>

          <div className="cnt-section">
            <div className="like-cnt">
              {postLikes} <span>Likes</span>
            </div>
            <hr />
            <div className="comment-cnt">
              {curr.postComments.length} <span>Comments</span>
            </div>
          </div>
        </div>
        {openComment && (
          <Comments postComments={curr.postComments} postId={curr._id}/>
        )}
      </div>
    </Container>
  );
};

const Container = styled.section`
  .post-container {
    padding: 1rem;
    padding-bottom: 0.3rem;
    background-color: "white";
    transition:all 0.5s;
    background-color: ${({ themeMode, theme }) =>
      themeMode === "true"
        ? theme.colors.lightMode.bgColor
        : theme.colors.darkMode.bgColor};
    margin-top: 1.5rem;
    border-radius: 1rem;
    .post-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      .wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1.3rem;
        .post-profile {
          height: 3rem;
          width: 3rem;
          border-radius: 50%;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            height: 100%;
            width: 100%;
            object-fit: cover;
          }

          &:hover {
            cursor: pointer;
          }
        }

        .user-name {
          font-size: 1.6rem;
          h6 {
            margin: 0;
            color: ${({ themeMode }) =>
              themeMode === "true" ? "#121212" : "#f2f2f2"};
          }
          p {
            font-size: 0.8rem;
            color: ${({ themeMode }) =>
              themeMode === "true" ? "#121212" : "#f2f2f2e2"};
          }
        }
      }

      .options {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.7rem;
        color: ${({ themeMode }) =>
          themeMode === "true" ? "#121212" : "#f2f2f2"};
        .edit,
        .delete:hover {
          cursor: pointer;
        }
      }
    }

    .post-body {
      display: flex;
      flex-direction: column;

      .post-desc {
        p {
          font-size: 1.2rem;
          overflow-wrap: break-word;
          color: ${({ themeMode }) =>
            themeMode === "true" ? "#121212" : "#f2f2f2"};
        }
      }

      .post-img {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        min-height: 20rem;
        border-radius: 0.9rem;
        overflow: hidden;
        margin-top: 1rem;
        transition:all 0.5s;
        background-color: ${({ themeMode, theme }) =>
          themeMode === "true"
            ? theme.colors.lightMode.bgColor
            : theme.colors.darkMode.bgColor};
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }

    .post-footer {
      display: grid;
      grid-template-columns: 1fr 3fr;
      align-items: center;
      padding: 0 0.5rem;
      margin-top: 0.5rem;
      .footer-icons-wrapper {
        display: flex;
        justify-content: space-between;
        .icon {
          padding: 0.3rem 0.5rem;
          border-radius: 0.5rem;
          color: ${({ themeMode }) =>
            themeMode === "true" ? "#121212" : "#f2f2f2"};
          &:hover {
            cursor: pointer;
            background-color: ${({ themeMode, theme }) =>
              themeMode === "true"
                ? theme.colors.lightMode.bgColor
                : "#121212"};
          }
        }
      }

      .cnt-section {
        display: flex;
        font-size: 1rem;
        justify-content: flex-end;
        gap: 0.5rem;
        color: ${({ themeMode }) =>
          themeMode === "true" ? "#121212" : "#f2f2f2"};
      }
    }
  }
`;
export default Post;
