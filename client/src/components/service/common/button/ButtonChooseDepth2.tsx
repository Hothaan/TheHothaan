/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import ButtonClose from "./ButtonClose";
import { ReactComponent as Add } from "@svgs/add.svg";

export default function ButtonChooseDepth2(prop: IbuttonChooseDepth2) {
  const { depth2, options, selectedOption, onChoose, onAdd, deleteFunction } =
    prop;
  const [showDeletedButton, setShowDeletedButton] = useState(false);

  if (!depth2) {
    return (
      <div
        css={button_container}
        onMouseEnter={() => {
          setShowDeletedButton(true);
        }}
        onMouseLeave={() => {
          setShowDeletedButton(false);
        }}
      >
        <button
          type="button"
          css={[choose_function, choose_function_color(selectedOption)]}
        >
          <Add />
        </button>
      </div>
    );
  }

  return (
    <div
      css={button_container}
      onMouseEnter={() => {
        setShowDeletedButton(true);
      }}
      onMouseLeave={() => {
        setShowDeletedButton(false);
      }}
    >
      <button
        type="button"
        css={[choose_function, choose_function_color(selectedOption)]}
      >
        <p css={function_text}>{depth2}</p>
        {selectedOption && (
          <p css={selectedOption_text}>{`(${selectedOption})`}</p>
        )}
      </button>
      {showDeletedButton && <ButtonClose deleteFunction={deleteFunction} />}
    </div>
  );
}

const button_container = css`
  width: 188px;
  position: relative;
`;

const choose_function_color = (selectedOption: string | null) => {
  if (selectedOption) {
    return css`
      &:before {
        background: linear-gradient(to right, #3b82f6, #a855f7);
      }
    `;
  } else {
    return css`
      &:before {
        background: #dedede;
      }
    `;
  }
};

const function_text = css`
  color: var(--383838, #383838);
  text-align: center;
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const selectedOption_text = css`
  color: var(--747474, #747474);
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const choose_function = css`
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
  background: var(--FFF, #fff);

  &:before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 10px;
    padding: 2px;
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    pointer-events: none;
  }
`;
