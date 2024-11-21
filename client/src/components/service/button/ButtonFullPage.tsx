/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ReactComponent as FullPage } from "@svgs//service/buttonFullPage.svg";

export interface IbuttonFullPage {
  onClick: () => void;
}

export default function ButtonFullPage(prop: IbuttonFullPage) {
  const { onClick } = prop;
  return (
    <button css={container} type="button" onClick={onClick}>
      <FullPage />
    </button>
  );
}

const container = css`
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;

  border-radius: 70px;
  border: 1px solid var(--DEDEDE, #dedede);

  background-color: #fff;

  svg * {
    fill: #747474;
  }
`;
