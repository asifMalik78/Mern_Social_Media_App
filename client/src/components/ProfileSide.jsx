import styled from "styled-components";
import FollowingSection from "./FollowingSection";
import LogoSearch from "./LogoSearch";
import ProfileCard from "./ProfileCard";
import UserInfo from "./UserInfo";

const ProfileSide = ({ type }) => {
  {
    if (type === "profile") {
      return (
        <Container>
          <LogoSearch />
          {type === "profile" ? <UserInfo /> : <ProfileCard />}
          <FollowingSection isProfile={true} />
        </Container>
      );
    } else {
      return (
        <Container>
          <LogoSearch />
          {type === "profile" ? <UserInfo /> : <ProfileCard />}
          <FollowingSection isProfile={false} />
        </Container>
      );
    }
  }
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-height: 97vh;
  overflow: scroll;
`;
export default ProfileSide;
