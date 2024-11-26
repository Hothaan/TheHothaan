/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ReactElement } from "react";

export interface IexampleItem {
  icon: ReactElement;
  title: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function ExampleItem(prop: IexampleItem) {
  const { icon, title, isSelected, onClick } = prop;

  return (
    <div css={container(isSelected)} onClick={onClick}>
      {icon}
      <p css={title_style}>{title}</p>
    </div>
  );
}

const container = (isSelected: boolean) => css`
  display: flex;
  padding: 40px 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex: 1 0 0;

  border-radius: 20px;
  border: 1px solid var(--ECECEC, #ececec);
  background: var(--F6F8FF, #f6f8ff);
  position: relative;

  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    transform: translateY(-5%);
  }

  &:after {
    position: absolute;
    content: "";
    display: block;

    inset: -3px;
    border-radius: 20px;
    padding: 3px;
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    pointer-events: none;
    background: linear-gradient(
      to right,
      ${isSelected ? "#56c0fe -1.67%, #6d0ee6 98.33%" : "transparent"}
    );
  }
`;

const title_style = css`
  color: var(--383838, #383838);
  text-align: center;
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: uppercase;
`;
