/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import { IserviceModal } from "@components/service/modal/ServiceModal";
import { T2depth } from "@data/service/depth2/common";
import ServiceModal from "@components/service/modal/ServiceModal";
import { IradioButtonAccordion } from "@components/service/accordion/RadioButtonAccordion";
import RadioButtonAccordion from "@components/service/accordion/RadioButtonAccordion";
import { ReactComponent as Add } from "@svgs/add.svg";
import { IserviceTypeMenuItem, TmenuItem } from "@api/service/serviceTypeMenu";

// export interface IbuttonAddDepth2 {
//   depth1Kor: string;
//   depth1Eng: string;
//   selectableDepth2: T2depth[];
//   onAddMenu: (updatedDepth2Data: T2depth[], depth1prop: string) => void;
//   onCancel: () => void;
// }

export interface IbuttonAddDepth2 {
  data: IserviceTypeMenuItem;
  onAddMenu: (updatedMenuItems: TmenuItem[]) => void;
  onCancel: () => void;
}

export interface IselectableDepth2 {
  depth2: { eng: string; kor: string };
  isDefault: boolean;
  isSelected: boolean;
  structure?: string;
  options?: T2depthOption[];
}

export default function ButtonAddDepth2(prop: IbuttonAddDepth2) {
  const { data, onAddMenu, onCancel } = prop;
  const [showDeletedButton, setShowDeletedButton] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateDepth2, setUpdateDepth2] = useState<TmenuItem[]>(data.items);

  useEffect(() => {
    setUpdateDepth2(data.items);
  }, [data.items]);

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
          setUpdateDepth2(data.items);
          setIsModalOpen(!isModalOpen);
        },
      },
      {
        size: "M",
        bg: "gradient",
        text: "저장",
        onClick: () => {
          onAddMenu(updateDepth2);
          setIsModalOpen(!isModalOpen);
        },
      },
    ],
  };

  // function handleCheckboxChange(id: string, checked: boolean) {
  //   setUpdateDepth2((prevState) =>
  //     prevState.map((item) =>
  //       item.depth2.eng === id ? { ...item, isSelected: checked } : item
  //     )
  //   );
  // }

  function handleCheckboxChange(item_name: string, checked: boolean) {
    setUpdateDepth2((prevState) =>
      prevState.map((item) =>
        item.item_name === item_name ? { ...item, is_selected: checked } : item
      )
    );
  }

  // const options = updateDepth2.map((item) => {
  //   return {
  //     id: item.depth2.eng,
  //     name: item.depth2.eng,
  //     label: item.depth2.kor,
  //     checked: item.isSelected,
  //     onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
  //       handleCheckboxChange(item.depth2.eng, event.target.checked);
  //     },
  //   };
  // });

  const options = updateDepth2.map((item) => {
    return {
      id: item.item_name,
      name: item.item_name,
      label: item.item_name,
      checked: item.is_selected,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        handleCheckboxChange(item.item_name, event.target.checked);
      },
    };
  });

  const addDepth2: IradioButtonAccordion = {
    radioButton: {
      id: data.menu_name,
      name: data.menu_name,
      value: data.menu_name,
      label: data.menu_name,
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
