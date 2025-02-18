/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";

export interface IcolorPicker {
  show: boolean;
  selected: string;
  options: readonly string[];
  // direction: string;
  onClick: () => void;
  onSelect: (color: string) => void;
}

export default function ColorPicker(prop: IcolorPicker) {
  const { show, selected, options, onClick, onSelect } = prop;
  return (
    <div css={container}>
      <button
        css={selected_color(selected)}
        type="button"
        onClick={onClick}
      ></button>
      {show && (
        <div css={option_container}>
          <ul css={option_box}>
            {options.map((option, idx) => (
              <li
                css={option_item(option, selected)}
                onClick={() => {
                  onSelect(option as string);
                }}
                key={idx}
              ></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const container = css`
  position: relative;
  z-index: 10;
`;

const selected_color = (selected: string) => css`
  width: 20px;
  height: 20px;
  border-radius: 50%;

  background-color: ${selected};
  border: 1px solid #dedede;
`;

const option_container = css`
  position: absolute;
  right: 0;
  bottom: calc(100% + 40px);
  // transform: "translateY(100%)" : "none"};

  z-index: 10;

  display: flex;
  width: 400px;
  height: auto;
  padding: 10px;
  align-items: center;
  gap: 10px;

  border-radius: 20px;
  background: var(--FFF, #fff);

  box-shadow: 0px 327px 91px 0px rgba(0, 0, 0, 0),
    0px 209px 84px 0px rgba(0, 0, 0, 0.01),
    0px 118px 71px 0px rgba(0, 0, 0, 0.05),
    0px 52px 52px 0px rgba(0, 0, 0, 0.09), 0px 13px 29px 0px rgba(0, 0, 0, 0.1);
`;

const option_box = css`
  width: 100%;
  height: 330px;
  display: inline-flex;
  overflow: hidden;
  flex-wrap: wrap;
  gap: 0;
  border-radius: 10px;
`;

const option_item = (option: string, selected: string) => css`
  flex: 1 0 8.3%;
  position: relative;
  height: 33px;
  background-color: ${option};
  cursor: pointer;

  &:after {
    position: absolute;
    content: "";
    display: inline-block;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border: ${selected === option ? "3px solid #fff" : "none"};
    border-radius: 3px;
  }
`;
