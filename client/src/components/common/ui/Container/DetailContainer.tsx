/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link } from "react-router-dom";

export interface IdetailContainer {
  children?: React.ReactNode;
  title?: string;
}

export default function DetailContainer(prop: IdetailContainer) {
  const { children, title } = prop;
  return (
    <div css={container}>
      <Link to="/myPage/myProject" css={go_to_prev_button}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
        >
          <path
            d="M15 16.5L10.707 12.207L15 7.914L13.586 6.5L7.879 12.207L13.586 17.914L15 16.5Z"
            fill="#747474"
          />
        </svg>
        <p>{title}</p>
      </Link>
      {children}
    </div>
  );
}

const container = css`
  display: flex;
  width: 100%;
  padding: 50px;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
`;

const go_to_prev_button = css`
  display: flex;
  align-items: center;
  gap: 10px;
  align-self: stretch;

  color: var(--383838, #383838);
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
