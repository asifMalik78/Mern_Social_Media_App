import styled from "styled-components";
import { UilSearch } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import SearchResult from "./SearchResult";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { searchUsers } from "../apiCalls";
import { useRef } from "react";
import { searchNull } from "../redux/userSlice";

const LogoSearch = () => {
  const dispatch = useDispatch();
  const btnRef = useRef();
  const {
    userTheme: theme,
    searchResult,
  } = useSelector((state) => state.User);

  const [query, setQuery] = useState("");

  useEffect(() => {
    const closeSearchResult = (e) => {
      if (!btnRef?.current?.contains(e.target)) {
        dispatch(searchNull());
        setQuery("");
      }
    };

    document.addEventListener("click", closeSearchResult);
    return () => document.removeEventListener("click", closeSearchResult);
  }, []);

  const searchHandler = async (e) => {
    setQuery(e.target.value);
    await searchUsers(dispatch, e.target.value);
  };

  const clickHandler = () => {
    dispatch(searchNull());
    setQuery("");
  };
  return (
    <Container themeMode={theme}>
      <Link to="/" onClick={clickHandler}>
        <div className="logo">
          <img
            src="http://localhost:3000/images/logo.png"
            alt="logo"
            className="src"
          />
        </div>
      </Link>
      <div className="wrapper">
        <div className="search">
          <input
            type="text"
            placeholder="#explore"
            value={query}
            onChange={searchHandler}
          />
          <div className="search-icon">
            <UilSearch />
          </div>
        </div>

        {searchResult !== null && searchResult?.length !== 0 ? (
          <div className="search-result" ref={btnRef}>
            {searchResult.map((curr) => {
              return <SearchResult curr={curr} key={curr._id} />;
            })}
          </div>
        ) : null}
      </div>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;

  .logo {
    height: 3.8rem;
    width: 3.8rem;
    position: relative;
    cursor: pointer;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .wrapper {
    position: relative;
    .search {
      display: flex;
      align-items: center;
      border-radius: 10px;
      padding: 5px;
      transition:all 0.5s;
      background-color: ${({ themeMode, theme }) =>
        themeMode === "true"
          ? theme.colors.lightMode.inputColor
          : theme.colors.darkMode.inputColor};

      input {
        padding: 3px 4px;
        font-size: 0.9rem;
        background-color: transparent;
        border: none;
        outline: none;
        color: ${({ themeMode }) =>
          themeMode === "true" ? "#121212" : "#f2f2f2"};
      }

      .search-icon {
        display: flex;
        justify-content: center;
        align-items: center;
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

        padding: 5px;
        color: ${({ theme }) => theme.colors.lightMode.textColor};
        border-radius: 5px;
        &:hover {
          cursor: pointer;
        }
      }
    }
    .search-result {
      position: absolute;
      padding: 0.6rem;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      z-index: 999;
      max-height: 434px;
      width: 100%;
      overflow: scroll;
      left: 0;
      top: 105%;
      transition:all 0.5s;
      color: ${({ themeMode }) =>
        themeMode === "true" ? "#121212" : "#f2f2f2"};
      background-color: ${({ themeMode, theme }) =>
        themeMode === "true"
          ? theme.colors.lightMode.bgColor
          : theme.colors.darkMode.bgColor};
      border-radius: 0.5rem;
    }
  }
`;
export default LogoSearch;
