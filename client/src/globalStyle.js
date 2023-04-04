import { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`
 * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    scrollbar-width: auto;
    scrollbar-color: #d9d9d9 #ffffff;
  }

  html {
    /* font-size: 62.5%; */
    scroll-behavior: smooth;
    /* 1rem = 10px */
  }

 

  body{
    position: relative;
  }


 *::-webkit-scrollbar {
    display: none;
}




  .app{
    background-color: #F3F3F3;
    padding:10px;
  }

  .blur{
    /* display: none; */
    position: absolute;
    width:20rem;
    height:22rem;
    border-radius: 50%;
    background-color: #d8bbff;
    filter:blur(7.2rem);
  }
`;
