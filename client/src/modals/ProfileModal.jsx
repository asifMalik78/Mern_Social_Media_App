import { useDisclosure } from "@mantine/hooks";
import { Modal, Group } from "@mantine/core";
import styled from "styled-components";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { updateUser } from "../apiCalls";
import { useNavigate } from "react-router-dom";
import { Loader } from "@mantine/core";

const uploadURL = process.env.REACT_APP_CLOUDINARY_URL;
function ProfileModal({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const { userTheme: theme } = useSelector((state) => state.User);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [desc, setDesc] = useState("");
  // const [uploadLoading, setUploadLoading] = useState(false);
  const { user: currUser, isUpdateLoading } = useSelector(
    (state) => state.User
  );
  const uploadImage = async (img) => {
    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", "social_media");
    try {
      // setUploadLoading(true);
      const res = await axios.post(uploadURL, formData);
      const { secure_url } = res.data;
      // setUploadLoading(false);
      return secure_url;
    } catch (error) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !profileImage &&
      !coverImage &&
      !name &&
      !email &&
      !location &&
      !occupation &&
      !desc
    ) {
      close();
      return;
    }
    const data = {};
    if (profileImage !== null) {
      const imgUrl = await uploadImage(profileImage);
      data.img = imgUrl;
    }

    if (coverImage !== null) {
      const imgUrl = await uploadImage(coverImage);
      data.coverImg = imgUrl;
    }

    if (name.length !== 0) {
      data.name = name;
    }

    if (email.length !== 0) {
      data.email = email;
    }

    if (location.length !== 0) {
      data.location = location;
    }

    if (occupation.length !== 0) {
      data.occupation = occupation;
    }

    if (desc.length !== 0) {
      data.desc = desc;
    }

    await updateUser(dispatch, currUser.user._id, data);
    setName("");
    setEmail("");
    setLocation("");
    setOccupation("");
    setDesc("");
    close();
    navigate("/login");
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
          <h6>Update Profile</h6>
          <form>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <input
              type="text"
              placeholder="Occupation"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <div className="wrapper">
              <label className="profile-img" htmlFor="profile">
                <p>Change Profile Image</p>
                <div className="img-wrapper">
                  <input
                    type="file"
                    id="profile"
                    onChange={(e) => setProfileImage(e.target.files[0])}
                  />
                  <div className="img-preview">
                    <img
                      src={
                        profileImage
                          ? URL.createObjectURL(profileImage)
                          : currUser.user.img
                      }
                      alt="img"
                    />
                  </div>
                </div>
              </label>
              <label className="cover-img" htmlFor="cover">
                <p>Change Cover Image</p>
                <div className="img-wrapper">
                  <input
                    type="file"
                    id="cover"
                    onChange={(e) => setCoverImage(e.target.files[0])}
                  />
                  <div className="img-preview">
                    <img
                      src={
                        coverImage
                          ? URL.createObjectURL(coverImage)
                          : currUser.user.coverImg
                      }
                      alt="img"
                    />
                  </div>
                </div>
              </label>
            </div>

            <button className="submit-btn" onClick={handleSubmit}>
              Save Changes
            </button>
            {isUpdateLoading === true && (
              <div className="loader">
                <Loader size="xl" color="black" />
              </div>
            )}
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
  postion: relative;
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
    input {
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
    }

    .wrapper {
      width: 100%;
      display: flex;
      justify-content: space-between;
      gap: 0.5rem;
      input[type="file"] {
        display: none;
      }

      p {
        margin-bottom: 1rem;
      }

      .img-wrapper {
        .img-preview {
          height: 10rem;
          width: 10rem;
          border-radius: 50%;
          overflow: hidden;
          border: 5px solid #8f43ee;
          cursor: pointer;
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

    .loader {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      border-radius: 0.2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(255, 255, 255, 0.447);
      background-color: ${({ themeMode, theme }) =>
        themeMode === "true"
          ? "rgba(255, 255, 255, 0.447)"
          : "rgba(255, 255, 255, 0.447)"};
    }
  }
`;
export default ProfileModal;
