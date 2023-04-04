import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { followUser, unfollowUser } from "../apiCalls";
import { Link } from "react-router-dom";

const Followers = ({ curr }) => {
  const dispatch = useDispatch();
  const { userTheme: theme, user: currUser } = useSelector(
    (state) => state.User
  );
  
  function isFriend(id) {
    return currUser.user.following.find((curr) => {
      return curr._id === id;
    });
  }

  const followHandler = async () => {
    await followUser(dispatch, curr);
  };

  const unfollowHandler = async () => {
    await unfollowUser(dispatch, curr);
  };
  return (
    <Container themeMode={theme}>
      <div className="wrapper">
        <Link to={`/profile/${curr._id}`} style={{ textDecoration: "none" }}>
          <div className="followers-img">
            <img src={curr.img} alt="img" />
          </div>
        </Link>
        <div className="followers-info">
          <h6>{curr.name}</h6>
          <p>@{curr.name}</p>
        </div>
      </div>

      {isFriend(curr._id)
        ? curr._id !== currUser.user._id && (
            <button className={"follow-btn-outlined"} onClick={unfollowHandler}>
              Unfollow
            </button>
          )
        : curr._id !== currUser.user._id && (
            <button className="follow-btn-solid" onClick={followHandler}>
              Follow
            </button>
          )}
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  &:hover {
    background-color: ${({ themeMode, theme }) =>
      themeMode === "true"
        ? theme.colors.lightMode.bgColor
        : theme.colors.darkMode.bgColor};
    cursor: pointer;
    -webkit-box-shadow: 5px 7px 18px -18px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 5px 7px 18px -18px rgba(0, 0, 0, 0.75);
    box-shadow: 5px 7px 18px -18px rgba(0, 0, 0, 0.75);
  }
  .wrapper {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
  .followers-img {
    height: 3.1rem;
    width: 3.1rem;
    border-radius: 50%;
    overflow: hidden;
    h6 {
      color: ${({ themeMode }) =>
        themeMode === "true" ? "#121212" : "#f2f2f2"};
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .followers-info {
    h6 {
      font-size: 1rem;
    }

    p {
      font-size: 0.8rem;
      text-align: center;
      color: ${({ themeMode }) =>
        themeMode === "true" ? "#121212" : "#f2f2f2e1"};
    }
  }

  .follow-btn-solid {
    padding: 0.5rem 1rem;
    border-radius: 0.3rem;
    border: none;
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
    cursor: pointer;
  }

  .follow-btn-outlined {
    padding: 0.5rem 1rem;
    border-radius: 0.3rem;
    transition:all 0.5s;
    border: 1px solid ${({ theme }) => theme.colors.lightMode.color};
    background-color: ${({ themeMode, theme }) =>
      themeMode === "true"
        ? theme.colors.lightMode.bgColor
        : theme.colors.darkMode.bgColor};
    color: ${({ theme }) => theme.colors.lightMode.color};
    cursor: pointer;
  }
`;
export default Followers;
