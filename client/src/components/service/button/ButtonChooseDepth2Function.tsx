/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useRef } from "react";
import { IserviceModal } from "@components/service/modal/ServiceModal";
import ServiceModal from "@components/service/modal/ServiceModal";
import { IbuttonClose } from "@components/common/button/ButtonClose";
import ButtonClose from "@components/common/button/ButtonClose";
import ButtonAdd, { IbuttonAdd } from "@components/service/button/ButtonAdd";
import RadioButton from "@components/common/form/RadioButton";
import { TmenuItem, ToptionItem } from "@api/service/serviceTypeMenu";

export interface IbuttonChooseDepth2Function {
  menu_id: number;
  data: TmenuItem;
  onSelectOption: (
    item_name: string,
    option_type: string,
    menu_id: number
  ) => void;
  onDelete: (item_name: string) => void;
}

export default function ButtonChooseDepth2Function(
  prop: IbuttonChooseDepth2Function
) {
  const { menu_id, data, onSelectOption, onDelete } = prop;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeletedButton, setShowDeletedButton] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>(
    data.options?.filter((item) => item.is_selected)[0].option_type || ""
  );
  const optionRef = useRef<HTMLDivElement | null>(null);

  const serviceModal: IserviceModal = {
    isOpen: isModalOpen,
    title: data.item_name,
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
          onSelectOption(data.item_name, selectedValue, menu_id);
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
      onDelete(data.item_name);
    },
    top: "-3px",
    right: "-6px",
  };

  const addButton: IbuttonAdd = {
    top: "-3px",
    left: "-6px",
  };

  return (
    <div
      css={wrap(data.options)}
      onMouseEnter={() => {
        setShowDeletedButton(true);
      }}
      onMouseLeave={() => {
        setShowDeletedButton(false);
      }}
    >
      <div
        css={[
          choose_function(selectedValue, data.options),
          choose_function_color(selectedValue),
        ]}
        onClick={() => {
          setIsModalOpen(!isModalOpen);
        }}
      >
        <p css={[function_text]}>{data.item_name}</p>
        {selectedValue && (
          <p css={selectedValue_text_container}>
            <span>{`(`}</span>
            <span css={selectedValue_text}>{selectedValue}</span>
            <span>{`)`}</span>
          </p>
        )}
      </div>
      {data.options && selectedValue === "" && <ButtonAdd {...addButton} />}
      {!data.is_default && showDeletedButton && (
        <ButtonClose {...closeButton} />
      )}
      {data.options && (
        <ServiceModal {...serviceModal}>
          <p css={info_text}>유형 선택</p>
          <div ref={optionRef} onClick={(e) => e.stopPropagation()}>
            <ul css={options_container}>
              {data.options.map((option, idx) => {
                const option_radio = {
                  id: option.option_type,
                  name: option.option_type,
                  value: option.option_type,
                  label: option.option_type,
                  checked: selectedValue === option.option_type,
                  onChange: handleChange,
                  required: true,
                };
                return (
                  <li
                    key={idx}
                    css={[
                      option_style,
                      option_style_color(selectedValue, option.option_type),
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

const wrap = (options: ToptionItem[] | undefined) => css`
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
  options: ToptionItem[] | undefined
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
