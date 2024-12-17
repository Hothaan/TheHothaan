/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useEffect } from "react";
import { IserviceModal } from "@components/service/modal/ServiceModal";
import ServiceModal from "@components/service/modal/ServiceModal";
import { IradioButtonAccordion } from "@components/service/accordion/RadioButtonAccordion";
import RadioButtonAccordion from "@components/service/accordion/RadioButtonAccordion";
import { ReactComponent as Add } from "@svgs/service/add.svg";
import { IserviceTypeMenuItem, TmenuItem } from "@api/service/serviceTypeMenu";
import { MAX_NUM } from "@data/maxNum";

export interface IbuttonAddFeature {
  data: IserviceTypeMenuItem;
  onAddMenu: (updatedMenuItems: TmenuItem[]) => void;
  onCancel: () => void;
}

export default function ButtonAddFeature(prop: IbuttonAddFeature) {
  const { data, onAddMenu, onCancel } = prop;
  const [showOptions, setShowOptions] = useState(false);
  const [selectedArr, setSelectedArr] = useState<number>(
    data.items.filter((item) => item.is_selected === true).length
  );
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

  function handleCheckboxChange(
    selectedArrAmt: number,
    item_name: string,
    checked: boolean
  ) {
    if (selectedArrAmt < MAX_NUM) {
      setUpdateDepth2((prevState) =>
        prevState.map((item) =>
          item.item_name === item_name
            ? { ...item, is_selected: checked }
            : item
        )
      );
    }
  }

  useEffect(() => {
    setSelectedArr(updateDepth2.filter((item) => item.is_selected).length);
  }, [updateDepth2]);

  const options = updateDepth2.map((item) => {
    return {
      id: item.item_name,
      name: item.item_name,
      label: item.item_name,
      checked: item.is_selected,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        handleCheckboxChange(selectedArr, item.item_name, event.target.checked);
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

  useEffect(() => {
    if (isModalOpen) {
      console.log(updateDepth2);
    }
  }, [isModalOpen]);

  return (
    <div
      css={wrap}
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
