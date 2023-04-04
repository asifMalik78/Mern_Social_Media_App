import styled from "styled-components";
import { UilMessage } from "@iconscout/react-unicons";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { useSelector } from "react-redux";
import { useState } from "react";
import { deleteComment as commentDelete } from "../apiCalls";
import { commentPost } from "../apiCalls";
import "react-tooltip/dist/react-tooltip.css";

import CommentsData from "./CommentsData";
TimeAgo.addLocale(en);

const Comments = ({ postComments, postId }) => {
  const { userTheme: theme, user: currUser } = useSelector(
    (state) => state.User
  );

  const [message, setMessage] = useState("");
  const [comments, setComments] = useState(postComments);
  const submitComment = async () => {
    if (message.length === 0) {
      alert("comment cannot be empty");
      return;
    }

    const data = {
      postId,
      commentDesc: message,
      userId: currUser.user._id,
    };

    const { comment: commentData } = await commentPost(data);

    setComments((prev) => {
      return [...prev, commentData];
    });

    setMessage("");
  };

  const deleteComment = async (commentId) => {
    setComments((prev) => {
      let arr = prev.filter((curr) => {
        return curr._id !== commentId;
      });

      return arr;
    });

    await commentDelete(commentId);
  };
  return (
    <Container themeMode={theme}>
      {comments.length !== 0 ? (
        <div className="comment-box">
          {comments &&
            comments.map((curr) => {
              return (
                <CommentsData
                  curr={curr}
                  deleteComment={deleteComment}
                  userId={currUser.user._id}
                  key={curr._id}
                />
              );
            })}
        </div>
      ) : null}

      <div className="comment-footer">
        <div className="comment-footer-input">
          <input
            type="text"
            placeholder="comment..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="comment-footer-btn">
          <UilMessage onClick={submitComment} />
        </div>
      </div>
    </Container>
  );
};

const Container = styled.section`
  .comment-box {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
    max-height: 15rem;
    transition:all 0.5s;
    background-color: ${({ themeMode, theme }) =>
      themeMode === "true"
        ? theme.colors.lightMode.commentBgColor
        : theme.colors.darkMode.commentBgColor};
    border-radius: 1rem;
    padding: 1rem;
    font-size: 1rem;
    overflow: auto;
    .comment {
      display: grid;
      grid-template-columns: 0.1fr 1fr;
      align-items: center;
      gap: 0.5rem;
      .comment-img {
        height: 2.5rem;
        width: 2.5rem;
        border-radius: 50%;
        overflow: hidden;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .comment-content {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 0.3rem;

        .content {
          padding: 0.3rem 0.5rem;
          border-radius: 0.5rem;
          width: fit-content;
          transition:all 0.5s;
          background-color: ${({ themeMode, theme }) =>
            themeMode === "true"
              ? theme.colors.lightMode.commentColor
              : theme.colors.darkMode.commentColor};

          overflow-wrap: break-word;
          word-wrap: break-word;
          white-space: pre-wrap;
          word-break: break-word;
          color: ${({ themeMode }) =>
            themeMode === "true" ? "#121212" : "#f2f2f2"};
        }
        .wrapper {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          .comment-delete-btn {
            color: red;
            font-size: 1rem;
            cursor: pointer;
          }
        }
        .comment-time {
          font-size: 0.7rem;
        }
      }
    }
  }

  .comment-footer {
    display: grid;
    grid-template-columns: 1fr 0.1fr;
    align-items: center;
    margin-top: 1rem;
    gap: 0.5rem;
    margin-bottom: 0.6rem;
    .comment-footer-input {
      display: flex;
      justify-content: flex-start;
      input {
        transition:all 0.5s;
        font-size: 1rem;
        width: 100%;
        border: none;
        outline: none;
        background-color: ${({ themeMode, theme }) =>
          themeMode === "true"
            ? theme.colors.lightMode.commentBgColor
            : theme.colors.darkMode.commentBgColor};

        padding: 0.6rem 0.8rem;
        color: ${({ themeMode }) =>
          themeMode === "true" ? "#121212" : "#f2f2f2"};
        border-radius: 0.3rem;
      }
    }

    .comment-footer-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.4rem 0;
      background-image: linear-gradient(
        150deg,
        hsl(267deg 83% 60%) 0%,
        hsl(264deg 83% 61%) 39%,
        hsl(261deg 84% 62%) 51%,
        hsl(258deg 84% 62%) 58%,
        hsl(255deg 84% 63%) 62%,
        hsl(252deg 84% 64%) 64%,
        hsl(249deg 84% 65%) 66%,
        hsl(245deg 84% 65%) 67%,
        hsl(242deg 84% 66%) 68%,
        hsl(237deg 85% 65%) 70%,
        hsl(234deg 86% 64%) 71%,
        hsl(230deg 87% 62%) 74%,
        hsl(226deg 88% 61%) 79%,
        hsl(223deg 89% 58%) 86%,
        hsl(219deg 90% 56%) 100%
      );

      color: ${({ theme }) => theme.colors.lightMode.textColor};

      border-radius: 0.5rem;

      &:hover {
        cursor: pointer;
      }
    }
  }
`;
export default Comments;
