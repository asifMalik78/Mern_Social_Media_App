import styled from "styled-components";
import PostSide from "../components/PostSide";
import ProfileSide from "../components/ProfileSide";
import RightSide from "../components/RightSide";
const Home = () => {
  return (
    <Container>
      <main>
        <ProfileSide />
        <PostSide />
        <RightSide />
      </main>
    </Container>
  );
};

const Container = styled.section`
  max-width: ${({ theme }) => theme.screens.xl};
  margin: 0 auto;

  main {
    display: grid;
    grid-template-columns: 21rem auto 20rem;
    font-size: 2rem;
  }
`;

export default Home;
