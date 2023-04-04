import { useDisclosure } from "@mantine/hooks";
import { Modal, Group } from "@mantine/core";
import styled from "styled-components";
import CreatePost from "../components/CreatePost";
import { useSelector } from "react-redux";

function SharePostModal({ children }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { userTheme:theme } = useSelector((state) => state.User);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        color="red"
        title=" "
        size="lg"
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
        <Container>
          <CreatePost />
        </Container>
      </Modal>

      <Group position="center">
        <span onClick={open} style={{ width: "100%" }}>
          {children}
        </span>
      </Group>
    </>
  );
}

const Container = styled.section`
  width: 100%;
`;
export default SharePostModal;
