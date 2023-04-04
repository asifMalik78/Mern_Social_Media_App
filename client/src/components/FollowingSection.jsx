import { useSelector } from "react-redux";
import styled from "styled-components";
import FriendModal from "../modals/FriendModal";
import Followers from "./Followers";

const FollowingSection = ({ isProfile }) => {
  const {
    userTheme: theme,
    user: currUser,
    profile,
  } = useSelector((state) => state.User);

  {
    if (isProfile === true) {
      return (
        <Container themeMode={theme}>
          <h6>Friend</h6>
          <div className="followers-section">
            {profile &&
              (profile.following.length > 3
                ? profile.following.slice(0, 3).map((curr) => {
                    return <Followers curr={curr} key={curr._id}/>;
                  })
                : profile.following.map((curr) => {
                    return <Followers curr={curr} key={curr._id} />;
                  }))}
          </div>
          <FriendModal isProfile={true}>
            {profile && profile.following.length > 2 && (
              <p className="show-more">Show More</p>
            )}
          </FriendModal>
        </Container>
      );
    } else {
      return (
        <Container themeMode={theme}>
          <h6>Friend</h6>
          <div className="followers-section">
            {currUser &&
              (currUser.user.following.length > 2
                ? currUser.user.following.slice(0, 2).map((curr) => {
                    return <Followers curr={curr} key={curr._id} />;
                  })
                : currUser.user.following.map((curr) => {
                    return <Followers curr={curr} key={curr._id} />;
                  }))}
          </div>
          <FriendModal isProfile={false}>
            {currUser && currUser.user.following.length > 2 && (
              <p className="show-more">Show More</p>
            )}
          </FriendModal>
        </Container>
      );
    }
  }
};

const Container = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
  h6 {
    color: ${({ themeMode }) => (themeMode === "true" ? "#121212" : "#f2f2f2")};
    margin-left: 0.6rem;
  }
  .followers-section {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .show-more {
    font-size: 1.2rem;
    padding-left: 10px;
    color: ${({ theme }) => theme.colors.lightMode.color};
    cursor: pointer;
  }
`;
export default FollowingSection;
