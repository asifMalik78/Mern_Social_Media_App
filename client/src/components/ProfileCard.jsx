import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const ProfileCard = ({ type }) => {
  const {
    userTheme: theme,
    user: currUser,
    profile,
  } = useSelector((state) => state.User);
  
  {
    if (type !== "profile") {
      return (
        <Container
          themeMode={theme}
          coverSize={type === "profile" ? "12rem" : "8rem"}
          bottomMargin={type === "profile" ? "2rem" : "0rem"}
          profile={type === "profile" ? "true" : "false"}
        >
          <div className="card-images">
            <div className="cover-image">
              <img src={currUser.user.coverImg} alt="img" />
            </div>

            <div className="profile-image">
              <img src={currUser.user.img} alt="img" />
            </div>
          </div>

          <div className="profile-desc">
            <h6>{currUser.user.name}</h6>
            <p>{currUser.user.email}</p>
          </div>

          <div className="follow-follwoing-section">
            <hr className="hr" />
            <div className="splitter">
              <div className="follow-section">
                <div className="wrapper">
                  <h6>{currUser.user.followers.length}</h6>
                  <p>Followers</p>
                </div>
              </div>
              <hr className="hr" />
              <div className="follow-section">
                <div className="wrapper">
                  <h6>{currUser.user.following.length}</h6>
                  <p>Following</p>
                </div>
              </div>
            </div>
            <hr className="ht" />
          </div>

          <div className="my-profile">
            {type === "profile" ? null : (
              <Link
                to={`/profile/${currUser.user._id}`}
                style={{ textDecoration: "none" }}
              >
                <p>My Profile</p>
              </Link>
            )}
          </div>
        </Container>
      );
    } else {
      return (
        <Container
          themeMode={theme}
          coverSize={type === "profile" ? "12rem" : "8rem"}
          bottomMargin={type === "profile" ? "2rem" : "0rem"}
          profile={type === "profile" ? "true" : "false"}
        >
          <div className="card-images">
            <div className="cover-image">
              <img src={profile?.coverImg} alt="img" />
            </div>

            <div className="profile-image">
              <img src={profile?.img} alt="img" />
            </div>
          </div>

          <div className="profile-desc">
            <h6>{profile?.name}</h6>
            <p>{profile?.email}</p>
          </div>

          <div className="follow-follwoing-section">
            <hr className="hr" />
            <div className="splitter">
              <div className="follow-section">
                <div className="wrapper">
                  <h6>{profile?.followers.length}</h6>
                  <p>Followers</p>
                </div>
              </div>
              <hr className="hr" />
              <div className="follow-section">
                <div className="wrapper">
                  <h6>{profile?.following.length}</h6>
                  <p>Following</p>
                </div>
              </div>
            </div>
            <hr className="ht" />
          </div>

          <div className="my-profile">
            {type === "profile" ? null : (
              <Link
                to={`/profile/${currUser.user._id}`}
                style={{ textDecoration: "none" }}
              >
                <p>My Profile</p>
              </Link>
            )}
          </div>
        </Container>
      );
    }
  }
};

const Container = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border-radius: 1.3rem;
  transition:all 0.5s;
  background-color: ${({ themeMode, theme }) =>
    themeMode === "true"
      ? theme.colors.lightMode.bgColor
      : theme.colors.darkMode.bgColor};
  overflow: hidden;
  width: 100%;
  margin-bottom: ${(props) => props.bottomMargin};
  top: 0;
  left: 0;
  .card-images {
    .cover-image {
      width: 100%;
      height: 8rem;
      height: ${(props) => props.coverSize};
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .profile-image {
      width: 7rem;
      height: 7rem;
      border-radius: 50%;
      overflow: hidden;
      margin: -4rem auto;
      -webkit-box-shadow: 5px 7px 18px -7px rgba(0, 0, 0, 0.75);
      -moz-box-shadow: 5px 7px 18px -7px rgba(0, 0, 0, 0.75);
      box-shadow: 5px 7px 18px -7px rgba(0, 0, 0, 0.75);
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
  }

  .profile-desc {
    margin-top: 3.8rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h6 {
      color: ${({ themeMode }) =>
        themeMode === "true" ? "#121212" : "#f2f2f2"};
    }

    p {
      font-size: 1rem;
      color: ${({ themeMode }) =>
        themeMode === "true" ? "#121212" : "#f2f2f2"};
    }
  }

  .follow-follwoing-section {
    padding: 0 25px;
    .hr {
      border: 1px solid
        ${({ themeMode, theme }) => theme.colors.lightMode.hrColor};
    }

    .splitter {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      .follow-section {
        width: 100%;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        .wrapper {
          h6 {
            font-size: 1rem;
            margin-bottom: 0.4rem;
            color: ${({ themeMode }) =>
              themeMode === "true" ? "#121212" : "#f2f2f2"};
          }

          p {
            font-size: 0.8rem;
            color: ${({ themeMode }) =>
              themeMode === "true" ? "#121212" : "#f2f2f2"};
          }
        }
      }
    }
  }

  .my-profile {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: ${(props) => (props.profile === "true" ? "0" : "1.5rem")};
    p {
      font-size: 1.3rem;
      color: ${({ theme }) => theme.colors.lightMode.color};

      &:hover {
        cursor: pointer;
      }
    }
  }
`;
export default ProfileCard;
