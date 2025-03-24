import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
      margin: 0;
      padding:0;
      font-size: 100%;
      box-sizing: border-box;
      outline: 0;
      border: 0;
      list-style: none;   
  }

  body {
    font-family: 'Poppins', sans-serif;
  }


  img {
    display: block;
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
  }

  .chatRoom::-webkit-scrollbar {
    width: 15px;
  }

  .chatRoom::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  .chatRoom::-webkit-scrollbar-thumb {
    background: #0000FF;
  }

  .chatRoom::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  @media (max-width: 768px) {
    .enterBtnContainer {
      display: flex;
      justify-content: center;
      margin: 10px;
    }  
`;
