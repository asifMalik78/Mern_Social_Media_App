import styled from "styled-components";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import SharePostModal from "../modals/SharePostModal";
const TrendingSection = () => {
  const theme = localStorage.getItem("theme")
    ? localStorage.getItem("theme")
    : "true";
  return (
    <>
      <Container themeMode={theme}>
        <div className="trending-section">
          <h3>Trends for you</h3>

          <div className="trends">
            <div className="wrapper">
              <h6>#Minions</h6>
              <p>97k shares</p>
            </div>
            <div className="wrapper">
              <h6>#Marvel</h6>
              <p>908k shares</p>
            </div>

            <div className="wrapper">
              <h6>#Cricket</h6>
              <p>971k shares</p>
            </div>

            <div className="wrapper">
              <h6>#Anime</h6>
              <p>17k shares</p>
            </div>

            <div className="wrapper">
              <h6>#God Of War</h6>
              <p>1080k shares</p>
            </div>

            <div className="wrapper">
              <h6>#GTA VI</h6>
              <p>17k shares</p>
            </div>
          </div>
        </div>
        <div className="share-btn">
          <SharePostModal>
            <button data-tooltip-id="share-tooltip">Share</button>
          </SharePostModal>
          <ReactTooltip
            id="share-tooltip"
            place="bottom"
            content="Share Post"
            style={{ fontSize: "0.9rem" }}
          />
        </div>
      </Container>
    </>
  );
};

const Container = styled.section`
  .trending-section {
    background-color: ${({ themeMode, theme }) =>
      themeMode === "true"
        ? theme.colors.lightMode.bgColor
        : theme.colors.darkMode.bgColor};
    position: relative;
    border-radius: 1.6rem;
    padding: 1.4rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 1rem;

    h3 {
      font-size: 1.4rem;
      color: ${({ themeMode }) =>
        themeMode === "true" ? "#121212" : "#f2f2f2"};
    }

    .trends {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 1rem;
      .wrapper {
        h6 {
          font-size: 1.2rem;
          color: ${({ themeMode }) =>
            themeMode === "true" ? "#121212" : "#f2f2f2"};
        }

        p {
          font-size: 1rem;
          color: ${({ themeMode }) =>
            themeMode === "true" ? "#121212" : "#f2f2f2ad"};
        }
      }
    }
  }

  .share-btn {
    width: 100%;
    padding: 0 1.2rem;
    margin-top: 1rem;
    button {
      width: 100%;
      border: none;
      padding: 0.5rem 0.8rem;
      border-radius: 0.5rem;
      color: white;
      font-size: 1.2rem;
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

      &:hover {
        cursor: pointer;
      }
    }
  }
`;
export default TrendingSection;
