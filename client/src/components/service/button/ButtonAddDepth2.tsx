/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import { IserviceModal } from "@components/service/modal/ServiceModal";
import ServiceModal from "@components/service/modal/ServiceModal";
import { IradioButtonAccordion } from "@components/service/accordion/RadioButtonAccordion";
import RadioButtonAccordion from "@components/service/accordion/RadioButtonAccordion";
import { ReactComponent as Add } from "@svgs/add.svg";

export interface IbuttonAddDepth2 {
  depth1Kor: string;
  depth1Eng: string; //상위 메뉴 정보를 받아와서 선택 가능한 메뉴 경우의수 받아옴
  selectableDepth2: IselectableDepth2[]; //해당 상위 메뉴에서 선택 가능한 하위 메뉴 경우의 수와 선택 값
  onAddMenu: (
    updatedDepth2Data: IselectableDepth2[],
    depth1prop: string
  ) => void; //체크박스 선택 후 저장시 모달을 닫고 새로 선택된 하위메뉴의 buttonChooseDepth2를 생성
  onCancel: () => void; //체크박스 수정사항을 저장하지 않고 원래 값으로 돌린 뒤 모달 닫음
}

export interface IselectableDepth2 {
  depth2: { eng: string; kor: string };
  isDefault: boolean;
  isSelected: boolean;
  options: T2depthOption[] | null;
}

export default function ButtonAddDepth2(prop: IbuttonAddDepth2) {
  const { depth1Eng, depth1Kor, selectableDepth2, onAddMenu, onCancel } = prop;
  const [showDeletedButton, setShowDeletedButton] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateDepth2, setUpdateDepth2] =
    useState<IselectableDepth2[]>(selectableDepth2);

  useEffect(() => {
    setUpdateDepth2(selectableDepth2);
  }, [selectableDepth2]);

  const serviceModal: IserviceModal = {
    isOpen: isModalOpen,
    title: "메뉴 추가",
    onClick: () => {
      setIsModalOpen(false);
    },
    buttons: [
      {
        size: "M",
        bg: "gray",
        text: "취소",
        onClick: () => {
          setIsModalOpen(!isModalOpen);
        },
      },
      {
        size: "M",
        bg: "gradient",
        text: "저장",
        onClick: () => {
          onAddMenu(updateDepth2, depth1Kor);
          setIsModalOpen(!isModalOpen);
        },
      },
    ],
  };

  function handleCheckboxChange(id: string, checked: boolean) {
    setUpdateDepth2((prevState) =>
      prevState.map((item) =>
        item.depth2.eng === id ? { ...item, isSelected: checked } : item
      )
    );
  }

  const options = updateDepth2.map((item) => {
    return {
      id: item.depth2.eng,
      name: item.depth2.eng,
      label: item.depth2.kor,
      checked: item.isSelected,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        handleCheckboxChange(item.depth2.eng, event.target.checked);
      },
    };
  });

  const addDepth2: IradioButtonAccordion = {
    radioButton: {
      id: depth1Kor,
      name: depth1Kor,
      value: depth1Kor,
      label: depth1Kor,
      checked: true,
      onChange: () => {},
    },
    options: options,
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
      onClick={() => {
        setIsModalOpen(true);
      }}
    >
      <button
        type="button"
        css={[
          choose_function,
          choose_function_padding(showOptions),
          choose_function_height(showOptions),
          choose_function_color(selectedValue),
        ]}
      >
        <Add />
      </button>
      <ServiceModal {...serviceModal}>
        <RadioButtonAccordion {...addDepth2} />
      </ServiceModal>
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
