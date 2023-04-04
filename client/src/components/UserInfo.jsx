import styled from "styled-components";
import { UilLocationPinAlt } from "@iconscout/react-unicons";
import { UilSuitcase } from "@iconscout/react-unicons";
import { UilPen } from "@iconscout/react-unicons";
import { UilUserSquare } from "@iconscout/react-unicons";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import ProfileModal from "../modals/ProfileModal";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../redux/userSlice";
import { followUser as follow, unfollowUser as unfollow } from "../apiCalls";
const UserInfo = () => {
  const {
    userTheme: theme,
    user: currUser,
    profile,
  } = useSelector((state) => state.User);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    await dispatch(userLogout());
    navigate("/login");
  };

  function isFriend(id) {
    return currUser.user.following.find((curr) => {
      return curr._id === id;
    });
  }

  const followHandler = async () => {
    await follow(dispatch, profile);
  };

  const unfollowHandler = async () => {
    await unfollow(dispatch, profile);
  };
  return (
    <Container themeMode={theme}>
      <div className="user-info-container">
        <div className="wrapper">
          <h6>Profile</h6>
          {profile?._id === currUser?.user?._id && (
            <div
              className="edit-wrapper"
              data-tooltip-id="edit-tooltip-profile"
            >
              <ProfileModal>
                <UilPen className="edit" />
              </ProfileModal>
            </div>
          )}
        </div>
        <ReactTooltip
          id="edit-tooltip-profile"
          place="bottom"
          content="Edit Profile"
          style={{ fontSize: "0.9rem" }}
        />
        <div className="user-info">
          <ul>
            <li>
              <UilLocationPinAlt />
              <span>
                {profile && profile.location
                  ? profile.location
                  : "Not Updated Yet"}
              </span>
            </li>

            <li>
              <UilSuitcase />
              <span>
                {profile && profile.occupation
                  ? profile.occupation
                  : "Not Updated Yet"}
              </span>
            </li>

            <li>
              <UilUserSquare />
              <span>
                {profile && profile.desc ? profile.desc : "Not Updated Yet"}
              </span>
            </li>
          </ul>
        </div>
        <div className="logout-btn">
          {profile?._id === currUser?.user?._id ? (
            <button onClick={logoutHandler}>Logout</button>
          ) : isFriend(profile?._id) ? (
            <button onClick={unfollowHandler}>Unfollow</button>
          ) : (
            <button onClick={followHandler}>Follow</button>
          )}
        </div>
      </div>
    </Container>
  );
};

const Container = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border-radius: 1.3rem;
  background-color: ${({ themeMode, theme }) =>
    themeMode === "true"
      ? theme.colors.lightMode.bgColor
      : theme.colors.darkMode.bgColor};
  color: ${({ themeMode }) => (themeMode === "true" ? "#121212" : "#f2f2f2")};
  width: 100%;
  min-height: 10rem;
  .user-info-container {
    padding: 1.2rem;

    .wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .edit {
        &:hover {
          cursor: pointer;
        }
      }
    }
    .user-info {
      ul {
        list-style-type: none;
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        li {
          overflow-wrap: break-word;
          word-wrap: break-word;
          white-space: pre-wrap;
          word-break: break-word;
          font-size: 1.2rem;
          display: grid;
          grid-template-columns: 0.13fr 1fr;
          align-items: center;
        }
      }
    }

    .logout-btn {
      button {
        margin-top: 3rem;
        width: 100%;
        border: none;
        padding: 0.5rem 0.8rem;
        border-radius: 0.5rem;
        color: ${({ theme }) => theme.colors.lightMode.textColor};
        font-size: 1.2rem;
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
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
`;
export default UserInfo;
