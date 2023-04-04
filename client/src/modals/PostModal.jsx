import { useDisclosure } from "@mantine/hooks";
import { Modal, Group } from "@mantine/core";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { updatePost } from "../apiCalls";
import { useSelector, useDispatch } from "react-redux";

const uploadURL = process.env.REACT_APP_CLOUDINARY_URL;
function PostModal({ children, post }) {
  const dispatch = useDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const [previewImg, setPreviewImg] = useState(null);
  const [postDesc, setPostDesc] = useState("");

  const { userTheme: theme } = useSelector((state) => state.User);
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", previewImg);
    formData.append("upload_preset", "social_media");
    const res = await axios.post(uploadURL, formData);
    const { secure_url } = res.data;
    return secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let postImg = null;
    if (previewImg) {
      postImg = await uploadImage();
    }

    let data = {};
    if (postDesc.length !== 0) {
      data.postDesc = postDesc;
    }
    if (postImg) {
      data.postImg = postImg;
    }

    await updatePost(dispatch, post._id, data);
    setPostDesc("");
    close();
  };
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
          <h6>Edit Post</h6>
          <form>
            <p>Post Description</p>
            <textarea
              type="text"
              placeholder="write something..."
              value={postDesc}
              rows="1"
              onChange={(e) => setPostDesc(e.target.value)}
            ></textarea>

            {post.postImg && (
              <div className="wrapper">
                <label className="post-img" htmlFor="profile">
                  <p>Change Post Image</p>
                  <div className="img-wrapper">
                    <input
                      type="file"
                      id="profile"
                      onChange={(e) => setPreviewImg(e.target.files[0])}
                    />
                    <div className="img-preview">
                      <img
                        src={
                          post.postImg && previewImg === null
                            ? post.postImg
                            : previewImg && URL.createObjectURL(previewImg)
                        }
                        alt="img"
                      />
                    </div>
                  </div>
                </label>
              </div>
            )}

            <button className="submit-btn" onClick={handleSubmit}>
              Save Changes
            </button>
          </form>
        </Container>
      </Modal>

      <Group position="center">
        <span onClick={open}>{children}</span>
      </Group>
    </>
  );
}

const Container = styled.section`
  padding: 1rem;
  width: 100%;
  h6 {
    font-size: 1.5rem;
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    margin-top: 1rem;
    textarea {
      width: 100%;
      padding: 0.6rem 0.3rem;
      background-color: ${({ themeMode, theme }) =>
        themeMode === "true"
          ? theme.colors.lightMode.inputColor
          : theme.colors.darkMode.inputColor};
      color: ${({ themeMode, theme }) =>
        themeMode === "true" ? "#121212" : "#f2f2f2"};
      border: none;
      outline: none;
      border-radius: 0.5rem;
      resize: vertical;
      font-size:1.2rem;
    }

    .wrapper {
      width: 100%;
      input[type="file"] {
        display: none;
      }

      p {
        margin-bottom: 1rem;
      }

      .img-wrapper {
        width: 100%;
        .img-preview {
          height: 15rem;
          width: 100%;
          overflow: hidden;
          cursor: pointer;
          border-radius: 0.5rem;
          border: 2px solid #8f43ee;
          img {
            height: 100%;
            width: 100%;
            object-fit: cover;
          }
        }
      }
    }

    .submit-btn {
      width: 100%;
      margin-top: 0.5rem;
      font-size: 1rem;
      padding: 0.5rem 1.2rem;
      border-radius: 0.5rem;
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
      color: white;
      cursor: pointer;
    }
  }
`;
export default PostModal;
