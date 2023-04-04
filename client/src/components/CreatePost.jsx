import styled from "styled-components";
import { UilImage as Photo } from "@iconscout/react-unicons";
import { UilVideo as Video } from "@iconscout/react-unicons";
import { UilMapMarker as Location } from "@iconscout/react-unicons";
import { UilSchedule as Schedule } from "@iconscout/react-unicons";
import { useState } from "react";
import { UilTimesCircle } from "@iconscout/react-unicons";
import { useSelector, useDispatch } from "react-redux";
import { createPost } from "../apiCalls";
import axios from "axios";
import { Loader } from "@mantine/core";

const uploadURL = process.env.REACT_APP_CLOUDINARY_URL;
const CreatePost = () => {
  const dispatch = useDispatch();
  const [previewImg, setPreviewImg] = useState(null);
  const [postDesc, setPostDesc] = useState("");
  const { userTheme: theme, user: currUser } = useSelector(
    (state) => state.User
  );
  const [uploadLoading, setUploadLoading] = useState(false);
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", previewImg);
    formData.append("upload_preset", "social_media");
    try {
      setUploadLoading(true);
      const res = await axios.post(uploadURL, formData);
      const { secure_url } = res.data;
      setUploadLoading(false);
      return secure_url;
    } catch (error) {
      console.log("error", error.message);
    }
  };
  const handleSubmit = async () => {
    let postImg = null;
    if (previewImg) {
      postImg = await uploadImage();
    }

    let data = {
      userId: currUser.user._id,
    };

    if (postDesc.length !== 0) {
      data.postDesc = postDesc;
    }

    if (postImg) {
      data.postImg = postImg;
    }
    await createPost(dispatch, data);
    setPostDesc("");
    setPreviewImg(null);
  };
  return (
    <Container themeMode={theme}>
      <div className="share-post">
        <div className="share-header">
          <div className="user-img">
            <img src={currUser.user.img} alt="img" />
          </div>

          <div className="share-post-input">
            <input
              type="text"
              placeholder={`What's on your mind ${currUser.user.name}?`}
              value={postDesc}
              onChange={(e) => {
                setPostDesc(e.target.value);
              }}
            />
          </div>
        </div>
        <hr />
        <div className="share-footer">
          <label
            className="wrapper"
            style={{ color: "#f72634" }}
            htmlFor="upload-photo"
          >
            <input
              type="file"
              id="upload-photo"
              style={{ display: "none" }}
              onChange={(e) => setPreviewImg(e.target.files[0])}
            />
            <Photo />
            <span>Photo</span>
          </label>

          <div className="wrapper" style={{ color: "#1f6924" }}>
            <Video />
            <span>Video</span>
          </div>
          <div className="wrapper" style={{ color: "#4900ff" }}>
            <Location />
            <span>Location</span>
          </div>
          <div className="wrapper" style={{ color: "#fdc500" }}>
            <Schedule />
            <span>Schedule</span>
          </div>

          <div className="share-btn">
            <button onClick={handleSubmit}>Share</button>
          </div>
        </div>
        {previewImg && (
          <div className="post-img-preview">
            <div className="remove-icon">
              <UilTimesCircle onClick={() => setPreviewImg(null)} />
            </div>
            <img src={URL.createObjectURL(previewImg)} alt="post-img" />
            {uploadLoading === true && (
              <div className="loader">
                <Loader size="xl" variant="bars" color="#8F43EE" />
              </div>
            )}
          </div>
        )}
      </div>
    </Container>
  );
};

const Container = styled.section`
  .share-post {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 1rem;
    padding: 1rem;
    transition:all 0.5s;
    background-color: ${({ themeMode, theme }) =>
      themeMode === "true"
        ? theme.colors.lightMode.bgColor
        : theme.colors.darkMode.bgColor};

    border-radius: 1.2rem;
    top: 0;
    left: 0;
    .share-header {
      display: grid;
      grid-template-columns: 1fr 8fr;
      .user-img {
        height: 3.1rem;
        width: 3.1rem;
        border-radius: 50%;
        overflow: hidden;
        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
      }

      .share-post-input {
        width: 100%;
        input {
          font-size: 1rem;
          padding: 0.6rem 0.3rem;
          border: none;
          outline: none;
          width: 100%;
          border-radius: 0.5rem;
          transition:all 0.5s;
          background-color: ${({ themeMode, theme }) =>
            themeMode === "true"
              ? theme.colors.lightMode.inputColor
              : theme.colors.darkMode.inputColor};

          color: ${({ themeMode, theme }) =>
            themeMode === "true" ? "#121212" : "#f2f2f2"};
        }
      }
    }

    .share-footer {
      padding: 0 0.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.4rem;
        &:hover {
          cursor: pointer;
        }

        span {
          font-size: 1rem;
        }
      }

      .share-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        button {
          padding: 0.5rem 0.9rem;
          border: none;
          color: ${({ theme }) => theme.colors.lightMode.textColor};
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

          border-radius: 0.5rem;

          &:hover {
            cursor: pointer;
          }
        }
      }
    }

    .post-img-preview {
      width: 100%;
      height: 18rem;
      transition:all 0.5s;
      background-color: ${({ themeMode, theme }) =>
        themeMode === "true"
          ? theme.colors.lightMode.commentBgColor
          : theme.colors.darkMode.commentBgColor};
      border-radius: 0.5rem;
      margin-top: 1rem;
      position: relative;
      .remove-icon {
        position: absolute;
        top: -2%;
        right: 0;
        color: red;
        cursor: pointer;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .loader {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      border-radius: 0.5rem;
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
export default CreatePost;
