/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import ButtonClose from "./ButtonClose";
import Button from "./Button";
import RadioButton from "@components/service/form/RadioButton";

export default function ButtonChooseDepth2(prop: IbuttonChooseDepth2) {
  const { depth2, options, onChoose, deleteFunction } = prop;
  const [showDeletedButton, setShowDeletedButton] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>("");

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    setSelectedValue(e.currentTarget.value);
  }

  const closeButton: IbuttonClose = {
    deleteFunction: () => {},
    top: "-3px",
    right: "-6px",
  };
  const saveButton: Ibutton = {
    size: "S",
    bg: "gradient",
    text: "저장",
    onClick: () => {
      onChoose();
      setShowOptions(false);
    },
    disabled: false,
  };
  const cancelButton: Ibutton = {
    size: "S",
    bg: "gray",
    text: "취소",
    onClick: () => {
      setSelectedValue("");
      setShowOptions(false);
    },
    disabled: false,
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
      <div
        css={[
          choose_function,
          choose_function_padding(showOptions),
          choose_function_height(showOptions),
          choose_function_color(selectedValue),
        ]}
        onClick={() => {
          setShowOptions(!showOptions);
        }}
      >
        <p css={[function_text, function_text_padding(showOptions)]}>
          {depth2}
        </p>
        {selectedValue && !showOptions && (
          <p css={selectedValue_text_container}>
            <span>{`(`}</span>
            <span css={selectedValue_text}>{selectedValue}</span>
            <span>{`)`}</span>
          </p>
        )}
        {showOptions && (
          <div css={options_container} onClick={(e) => e.stopPropagation()}>
            <ul css={option_style}>
              {options.map((option) => {
                const option_radio = {
                  id: option,
                  name: depth2,
                  value: option,
                  label: option,
                  checked: selectedValue === option,
                  onChange: handleChange,
                  required: true,
                };
                return (
                  <li key={option}>
                    <RadioButton {...option_radio} />
                  </li>
                );
              })}
            </ul>
            <div css={buttons_container}>
              <Button {...saveButton} />
              <Button {...cancelButton} />
            </div>
          </div>
        )}
      </div>
      {showDeletedButton && <ButtonClose {...closeButton} />}
    </div>
  );
}

const wrap = css`
  width: 188px;
  position: relative;
`;

const choose_function_color = (selectedValue: string | null) => {
  if (selectedValue) {
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

const choose_function_height = (showOptions: boolean) => {
  if (showOptions) {
    return css`
      height: auto;
    `;
  } else {
    return css`
      height: 64px;
    `;
  }
};

const choose_function_padding = (showOptions: boolean) => {
  if (showOptions) {
    return css`
      padding-top: 20px;
    `;
  } else {
    return css`\
     padding: 20px;`;
  }
};

const choose_function = css`
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 188px;

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

const options_container = css`
  width: 100%;
`;

const option_style = css`
  li {
    display: flex;
    padding: 10px 14px;
    align-items: center;
    gap: 6px;
    align-self: stretch;

    border-bottom: 1px solid var(--ECECEC, #ececec);
    background-color: #fff;
    &:hover {
      background: var(--EEF7FD, #eef7fd);
    }
  }
  li: first-child {
    border-top: 1px solid var(--ECECEC, #ececec);
  }
`;

const buttons_container = css`
  width: 100%;
  display: flex;
  gap: 10px;
  padding: 14px;
`;

const function_text_padding = (showOptions: boolean) => {
  if (showOptions) {
    return css`
      padding-bottom: 15px;
    `;
  } else {
    return css`
      padding: 0;
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

const selectedValue_text_container = css`
  display: inline-flex;
  justify-content: center;
  gap: 0;
  text-align: center;
`;

const selectedValue_text = css`
  color: var(--747474, #747474);
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  width: 100%;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  // flex-shrink: 1;
`;
