import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SearchResult = ({ curr }) => {
  const { userTheme: theme } = useSelector((state) => state.User);
  return (
    <Container themeMode={theme}>
      <Link to={`/profile/${curr._id}`} style={{ textDecoration: "none" }}>
        <div className="wrapper">
          <div className="img-wrapper">
            <img src={curr.img} alt="img" />
          </div>

          <div className="user-detail">
            <p className="name">{curr.name}</p>

            <p className="email">{curr.email}</p>
          </div>
        </div>
      </Link>
    </Container>
  );
};

const Container = styled.section`
  .wrapper {
    display: flex;
    column-gap: 1.2rem;
    align-items: center;
    padding: 0.3rem 0.5rem;
    cursor: pointer;
    border-radius: 0.5rem;
    &:hover {
      background-color: ${({ themeMode, theme }) =>
        themeMode === "true" ? "#f2f2f2" : "#000000"};
      -webkit-box-shadow: 5px 7px 18px -18px rgba(0, 0, 0, 0.75);
      -moz-box-shadow: 5px 7px 18px -18px rgba(0, 0, 0, 0.75);
      box-shadow: 5px 7px 18px -18px rgba(0, 0, 0, 0.75);
    }
    .img-wrapper {
      height: 3rem;
      width: 3rem;
      border-radius: 50%;
      overflow: hidden;
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }

    .user-detail {
      color: ${({ themeMode }) =>
        themeMode === "true" ? "#121212" : "#f2f2f2"};
      .name {
        font-size: 1.2rem;
      }

      .email {
        font-size: 0.8rem;
      }
    }
  }
`;
export default SearchResult;
