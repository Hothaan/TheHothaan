import { css } from "@emotion/react";

export const globalStyles = css`
  body,
  html {
    font-family: "Pretendard", sans-serif;
    color: #383838;
  }

  * {
    box-sizing: border-box;
  }

  button {
    cursor: pointer;
    padding: 0;
    border: none;
    background-color: transparent;
  }

  textarea {
    resize: none;
  }

  a {
    text-decoration: none;
  }
`;
