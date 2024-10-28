/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useRef, useEffect } from "react";
import { IserviceModal } from "@components/service/modal/ServiceModal";
import ServiceModal from "@components/service/modal/ServiceModal";
import Button from "@components/common/button/Button";
import { IbuttonClose } from "@components/common/button/ButtonClose";
import ButtonClose from "@components/common/button/ButtonClose";
import RadioButton from "@components/common/form/RadioButton";

export interface IbuttonChooseDepth2Function {
  isDefault: boolean;
  info: string;
  depth1Kor: string;
  depth1Eng: string;
  depth2: { eng: string; kor: string };
  options?: T2depthOption[];
  onSelectOption: (
    depth1Eng: string,
    depth2Eng: string,
    optionKor: string
  ) => void;
  onDelete: (depth1prop: string, depth2prop: string) => void;
}

export default function ButtonChooseDepth2Function(
  prop: IbuttonChooseDepth2Function
) {
  const {
    isDefault,
    depth1Eng,
    depth1Kor,
    depth2,
    options,
    info,
    onSelectOption,
    onDelete,
  } = prop;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeletedButton, setShowDeletedButton] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const optionRef = useRef<HTMLDivElement | null>(null);

  const serviceModal: IserviceModal = {
    isOpen: isModalOpen,
    title: depth2.kor,
    onClick: () => {
      setIsModalOpen(false);
    },
    buttons: [
      {
        size: "M",
        bg: "gray",
        text: "취소",
        onClick: () => {
          setSelectedValue("");
          setIsModalOpen(!isModalOpen);
        },
      },
      {
        size: "M",
        bg: "gradient",
        text: "저장",
        onClick: () => {
          onSelectOption(depth1Eng, depth2.eng, selectedValue);
          setIsModalOpen(!isModalOpen);
        },
      },
    ],
  };

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    setSelectedValue(e.currentTarget.value);
  }

  const closeButton: IbuttonClose = {
    onDelete: () => {
      onDelete(depth1Eng, depth2.eng);
    },
    top: "-3px",
    right: "-6px",
  };

  return (
    <div
      css={wrap(options)}
      onMouseEnter={() => {
        setShowDeletedButton(true);
      }}
      onMouseLeave={() => {
        setShowDeletedButton(false);
      }}
    >
      <div
        css={[
          choose_function(selectedValue, options),
          choose_function_color(selectedValue),
        ]}
        onClick={() => {
          setIsModalOpen(!isModalOpen);
        }}
      >
        <p css={[function_text]}>{depth2.kor}</p>
        {selectedValue && (
          <p css={selectedValue_text_container}>
            <span>{`(`}</span>
            <span css={selectedValue_text}>{selectedValue}</span>
            <span>{`)`}</span>
          </p>
        )}
      </div>
      {!isDefault && showDeletedButton && <ButtonClose {...closeButton} />}
      {options && (
        <ServiceModal {...serviceModal}>
          <p css={info_text}>{info}</p>
          <div ref={optionRef} onClick={(e) => e.stopPropagation()}>
            <ul css={options_container}>
              {options.map((option) => {
                const option_radio = {
                  id: option.kor,
                  name: depth2.eng,
                  value: option.kor,
                  label: option.kor,
                  checked: selectedValue === option.kor,
                  onChange: handleChange,
                  required: true,
                };
                return (
                  <li
                    key={option.kor}
                    css={[
                      option_style,
                      option_style_color(selectedValue, option.kor),
                    ]}
                  >
                    <RadioButton {...option_radio} />
                  </li>
                );
              })}
            </ul>
          </div>
        </ServiceModal>
      )}
    </div>
  );
}

const info_text = css`
  margin-bottom: 10px;

  color: var(--119CD4, #119cd4);
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 22.5px */
`;

const wrap = (options: T2depthOption[] | undefined) => css`
  cursor: ${options !== undefined ? "pointer" : "default"};
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

const choose_function = (
  selectedValue: string | null,
  options: T2depthOption[] | undefined
) => css`
  cursor: ${options !== undefined ? "pointer" : "default"};
  position: relative;
  display: flex;
  flex-direction: column;
  width: 188px;
  height: 64px;
  padding: 20px;

  justify-content: ${selectedValue ? "center" : "start"};
  align-items: center;
  gap: 3px;
  flex-shrink: 0;

  border-radius: 10px;
  border: 2px solid transparent;
  border-bottom: 2px solid #fff;
  background: var(--FFF, #fff);
  background-clip: padding-box;

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
  }

  &:hover:before {
    background: linear-gradient(to right, #383838, #383838);
  }
`;

const options_container = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const option_style_color = (
  selectedValue: string | null,
  option: string | null
) => {
  if (selectedValue && option) {
    if (selectedValue === option) {
      return css`
        background: var(--EEF7FD, #eef7fd);
        &:before {
          background: linear-gradient(to right, #3b82f6, #a855f7);
        }
      `;
    } else {
      return css`
        &:before {
          background: linear-gradient(to right, #ececec, #ececec);
        }
      `;
    }
  } else {
    return css`
      &:before {
        background: linear-gradient(to right, #ececec, #ececec);
      }
    `;
  }
};

const option_style = css`
  position: relative;
  display: flex;
  padding: 10px 14px;
  align-items: center;
  gap: 6px;
  align-self: stretch;

  border-radius: 10px;
  border: 2px solid transparent;
  border-bottom: 2px solid #fff;
  background: var(--FFF, #fff);
  background-clip: padding-box;

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
  }
`;

const function_text = css`
  padding: 0;
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
