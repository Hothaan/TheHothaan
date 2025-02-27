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
  onDelete: (item_name: string) => void;
}

export default function ButtonAddFeature(prop: IbuttonAddFeature) {
  const { data, onAddMenu, onDelete } = prop;
  const [showOptions, setShowOptions] = useState(false);
  const [selectedArr, setSelectedArr] = useState<number>(
    data.items.filter((item) => item.is_selected === true).length
  );
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateDepth2, setUpdateDepth2] = useState<TmenuItem[]>([]);

  useEffect(() => {
    setUpdateDepth2(data.items);
  }, [data.items]);

  // useEffect(() => {
  //   setUpdateDepth2(data.items);
  // }, [data.items]);

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

  // function handleCheckboxChange(
  //   selectedArrAmt: number,
  //   item_name: string,
  //   checked: boolean
  // ) {
  //   if (selectedArrAmt < MAX_NUM) {
  //     setUpdateDepth2((prevState) =>
  //       prevState.map((item) =>
  //         item.item_name === item_name
  //           ? { ...item, is_selected: checked }
  //           : item
  //       )
  //     );
  //   }
  // }

  function handleCheckboxChange(
    selectedArrAmt: number,
    item_name: string,
    checked: boolean
  ) {
    // 깊은 복사 수행하여 참조 문제 방지
    setUpdateDepth2((prevState) => {
      if (!prevState) return prevState;

      // 새로운 배열을 생성하여 깊은 복사 적용
      const newState = prevState.map((item) => {
        if (item.item_name !== item_name) {
          return { ...item }; // 기존 아이템 유지 (새로운 객체 반환)
        }

        return {
          ...item,
          is_selected: checked, // 선택 여부 업데이트
          options: item.is_option
            ? item.options?.map((option) => ({
                ...option, // 깊은 복사 적용
                is_selected: checked, // 현재 체크 상태 반영
              }))
            : item.options,
        };
      });

      return newState;
    });
  }

  useEffect(() => {
    setSelectedArr(updateDepth2.filter((item) => item.is_selected).length);
  }, [updateDepth2]);

  const options = updateDepth2.map((item) => {
    return {
      id: item.item_name,
      name: item.item_name,
      label: item.item_name,
      isDefault: item.is_default,
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

  return (
    <div
      css={wrap}
      className="buttonAddFeature"
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
