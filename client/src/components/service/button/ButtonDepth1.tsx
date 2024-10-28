/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { T2depth } from "@data/service/depth2/common";
import { IselectableDepth2 } from "./ButtonAddDepth2";
import { IbuttonClose } from "@components/common/button/ButtonClose";

export interface IbuttonDepth1 {
  depth1: { kor: string; eng: string };
  data: any;
  onAddMenu: (updatedDepth2Data: T2depth[], depth1prop: string) => void;
  onSelectOption: (
    depth1Eng: string,
    depth2Eng: string,
    optionKor: string
  ) => void;
  onDelete: (depth1prop: string, depth2prop: string) => void;
}

export default function ButtonDepth1(prop: IbuttonDepth1) {
  const { depth1, onDelete } = prop;
  const [showDeletedButton, setShowDeletedButton] = useState(false);

  const closeButton: IbuttonClose = {
    onDelete: () => {
      // onDelete();
    },
    top: "-3px",
    right: "-6px",
    color: "blue",
  };

  return (
    <div
      css={wrap}
      onMouseEnter={() => {
        setShowDeletedButton(true);
      }}
      onMouseLeave={() => {
        setShowDeletedButton(false);
      }}
    >
      <div css={[choose_function]}>
        <p css={[function_text]}>{depth1.kor}</p>
      </div>
      {/* {showDeletedButton && <ButtonClose {...closeButton} />} */}
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
