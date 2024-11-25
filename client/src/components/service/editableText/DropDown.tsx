/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ReactComponent as ArrowDown } from "@svgs/common/buttonArrowBottom.svg";

type TdropdownContainerSize = "140px" | "111px";

export interface IdropDown {
  show: boolean;
  isFontFamily: boolean;
  size: TdropdownContainerSize;
  selected: string;
  options: readonly string[];
  onClick: () => void;
  onSelect: (e: React.MouseEvent<HTMLLIElement>) => void;
}

export default function DropDown(prop: IdropDown) {
  const { show, size, selected, options, onClick, onSelect, isFontFamily } =
    prop;
  return (
    <div css={dropdown_container(size)} onClick={onClick}>
      <div css={selected_container(show)}>
        <p css={selected_text(isFontFamily, selected)}>{selected}</p>
        <ArrowDown />
      </div>
      {show && (
        <ul css={option_container(size)} onMouseLeave={onClick}>
          {options.map((option, idx) => (
            <li
              onClick={onSelect}
              key={idx}
              css={option_text(isFontFamily, option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const option_text = (isFontFamily: boolean, option: string) => css`
  width: 100%;
  color: var(--747474, #747474);
  font-size: 15px;
  font-style: normal;
  font-weight: 350;
  line-height: normal;
  font-family: ${isFontFamily ? option : "Pretendard"};
`;

const selected_text = (isFontFamily: boolean, selected: string) => css`
  white-space: nowrap;
  color: var(--747474, #747474);
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  font-family: ${isFontFamily ? selected : "Pretendard"};
`;

const dropdown_container = (size: TdropdownContainerSize) => css`
  position: relative;
  width: ${size};
  height: 40px;
  cursor: pointer;
  z-index: 10;
`;
const selected_container = (showFontFamilyOptions: boolean) => css`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 6px 6px 6px 10px;
  justify-content: space-between;
  align-items: center;

  border-top: 1px solid var(--DEDEDE, #dedede);
  border-right: 1px solid var(--DEDEDE, #dedede);
  border-bottom: ${showFontFamilyOptions
    ? "1px solid transparent"
    : "1px solid var(--DEDEDE, #dedede)"};
  border-left: 1px solid var(--DEDEDE, #dedede);
  background: var(--FFF, #fff);
`;
const option_container = (size: TdropdownContainerSize) => css`
  position: absolute;

  display: flex;
  width: ${size};
  padding: 6px 6px 16px 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;

  border-right: 1px solid var(--DEDEDE, #dedede);
  border-bottom: 1px solid var(--DEDEDE, #dedede);
  border-left: 1px solid var(--DEDEDE, #dedede);

  background: var(--FFF, #fff);
`;
