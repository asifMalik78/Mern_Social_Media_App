import styled from "styled-components";
import { UilEstate as HomeIcon } from "@iconscout/react-unicons";
import { UilBell as BellIcon } from "@iconscout/react-unicons";
import { UilCommentAltLines as ChatIcon } from "@iconscout/react-unicons";
import { UilUserCircle as ProfileIcon } from "@iconscout/react-unicons";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { UilMoon } from "@iconscout/react-unicons";
import { UilSun } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../redux/userSlice";
const Navigation = () => {
  const dispatch = useDispatch();
  const { userTheme: theme  , user:currUser} = useSelector((state) => state.User);
  const [mode, setMode] = useState(JSON.parse(theme));

  const clickHandler = () => {
    localStorage.setItem("theme", JSON.stringify(!mode));
    setMode(!mode);
    dispatch(changeTheme(!mode));
  };
  return (
    <Container themeMode={theme}>
      <div className="nav-bar">
        <Link to="/">
          <div className="nav-items" data-tooltip-id="home-tooltip">
            <HomeIcon />
          </div>
        </Link>
        <ReactTooltip
          id="home-tooltip"
          place="bottom"
          content="Home"
          style={{ fontSize: "0.9rem", zIndex: "9999" }}
        />

        <div className="nav-items" data-tooltip-id="notify-tooltip">
          <BellIcon />
        </div>

        <ReactTooltip
          id="notify-tooltip"
          place="bottom"
          content="Notification"
          style={{ fontSize: "0.9rem", zIndex: "9999" }}
        />

        <div className="nav-items" data-tooltip-id="chat-tooltip">
          <ChatIcon />
        </div>
        <ReactTooltip
          id="chat-tooltip"
          place="bottom"
          content="Chat"
          style={{ fontSize: "0.9rem", zIndex: "9999" }}
        />
        <div
          className="nav-items"
          data-tooltip-id="mode-tooltip"
          onClick={clickHandler}
        >
          {mode === true ? <UilMoon /> : <UilSun />}
        </div>
        <ReactTooltip
          id="mode-tooltip"
          place="bottom"
          content={mode ? "Dark Mode" : "Light Mode"}
          style={{ fontSize: "0.9rem", zIndex: "9999" }}
        />
        <Link to={`/profile/${currUser.user._id}`} style={{ textDecoration: "none" }}>
          <div className="nav-items" data-tooltip-id="profile-tooltip">
            <ProfileIcon />
          </div>
        </Link>
        <ReactTooltip
          id="profile-tooltip"
          place="bottom"
          content="Profile"
          style={{ fontSize: "0.9rem", zIndex: "9999" }}
        />
      </div>
    </Container>
  );
};

const Container = styled.section`
  position: relative;
  .nav-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .nav-items {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.6rem 0.8rem;
      border-radius: 0.6rem;
      color: ${({ themeMode }) =>
        themeMode === "true" ? "#121212" : "#f2f2f2"};
      font-weight: 900;
      &:hover {
        color: ${({ theme }) => theme.colors.lightMode.textColor};
        cursor: pointer;
        -webkit-box-shadow: 5px 7px 18px -8px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 5px 7px 18px -8px rgba(0, 0, 0, 0.75);
        box-shadow: 5px 7px 18px -8px rgba(0, 0, 0, 0.75);
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

        @media screen and (max-width: ${({ theme }) => theme.screens.md}) {
          background-color: none;
        }
      }
    }
  }
`;
export default Navigation;
