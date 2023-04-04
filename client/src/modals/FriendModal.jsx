import { useDisclosure } from "@mantine/hooks";
import { Modal, Group } from "@mantine/core";
import styled from "styled-components";

import Followers from "../components/Followers";
import { useSelector } from "react-redux";

function FriendeModal({ children, isProfile }) {
  const [opened, { open, close }] = useDisclosure(false);
  const {
    user: currUser,
    profile,
    userTheme: theme,
  } = useSelector((state) => state.User);

  if (isProfile) {
    return (
      <>
        <Modal
          opened={opened}
          onClose={close}
          color="red"
          title=" "
          styles={
            theme === "false"
              ? {
                  body: { backgroundColor: "#292929", color: "white" },
                  header: { backgroundColor: "#292929", color: "white" },
                }
              : {
                  body: { backgroundColor: "white", color: "black" },
                  header: { backgroundColor: "white", color: "black" },
                }
          }
          overlayProps={{
            color: theme === "true" ? "#f2f2f2" : "#121212",
            opacity: 0.55,
            blur: 3,
          }}
        >
          <Container themeMode={theme}>
            <h6>Friends</h6>
            <div className="friend-container">
              {profile &&
                profile?.following.map((curr) => {
                  return <Followers curr={curr} key={curr._id} />;
                })}
            </div>
          </Container>
        </Modal>

        <Group position="center">
          <span onClick={open}>{children}</span>
        </Group>
      </>
    );
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title=" "
        styles={
          theme === "false"
            ? {
                body: { backgroundColor: "#292929", color: "white" },
                header: { backgroundColor: "#292929", color: "white" },
              }
            : {
                body: { backgroundColor: "white", color: "black" },
                header: { backgroundColor: "white", color: "black" },
              }
        }
        overlayProps={{
          color: theme === "true" ? "#f2f2f2" : "#121212",
          opacity: 0.55,
          blur: 3,
        }}
      >
        <Container themeMode={theme}>
          <h6>Friends</h6>
          <div className="friend-container">
            <div className="friend-container">
              {currUser?.user?.following.map((curr) => {
                return <Followers curr={curr} key={curr._id} />;
              })}
            </div>
          </div>
        </Container>
      </Modal>

      <Group position="center">
        <span onClick={open}>{children}</span>
      </Group>
    </>
  );
}

const Container = styled.section`
  h6 {
    font-size: 1.5rem;
    text-align: center;
  }

  .friend-container {
    margin-top: 1rem;
    background-color: ${({ themeMode, theme }) =>
      themeMode === "true" ? "#f2f2f2" : "#121212"};
    padding: 0.3rem 0.3rem;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;
export default FriendeModal;
