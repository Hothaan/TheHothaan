/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export interface IbuttonDepth1 {
  menu_name: string;
}

export default function ButtonMenuItem(prop: IbuttonDepth1) {
  const { menu_name } = prop;

  return (
    <div css={wrap}>
      <div css={[choose_function]}>
        <p css={[function_text]}>{menu_name}</p>
      </div>
    </div>
  );
}

const wrap = css`
  width: 188px;
  position: relative;
`;

const choose_function = css`
  // cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 188px;
  height: 64px;
  padding: 20px;

  justify-content: center;
  align-items: center;
  gap: 3px;
  flex-shrink: 0;

  border-radius: 10px;
  border: 2px solid transparent;
  background: linear-gradient(0deg, #eff6ff 0%, #eff6ff 100%), #119cd4;

  &:before {
    content: "";
    position: absolute;
    inset: -2px;
    border-radius: 10px;
    padding: 2px;
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    pointer-events: none;
    background: #119cd4;
  }
`;

const function_text = css`
  color: #119cd4;
  text-align: center;
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
