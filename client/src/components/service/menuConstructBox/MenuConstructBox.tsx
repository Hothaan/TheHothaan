/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect, useMemo } from "react";
import { MAX_NUM } from "@data/maxNum";
import { T2depth } from "@data/service/depth2/common";
import ButtonDepth1 from "../button/ButtonDepth1";
import { IbuttonChooseDepth2Function } from "../button/ButtonChooseDepth2Function";
import ButtonChooseDepth2Function from "../button/ButtonChooseDepth2Function";
import { IbuttonAddDepth2 } from "../button/ButtonAddDepth2";
import ButtonAddDepth2 from "../button/ButtonAddDepth2";
import { IbuttonDepth1 } from "../button/ButtonDepth1";
import { IselectableDepth2 } from "../button/ButtonAddDepth2";
import { IserviceTypeMenuItem, TmenuItem } from "@api/service/serviceTypeMenu";

export interface ImenuConstructBox {
  data: IserviceTypeMenuItem;
  onAddMenu: (updatedMenuItems: TmenuItem[], menu_id: number) => void;
  onSelectOption: (
    item_name: string,
    option_type: string,
    menu_id: number
  ) => void;
  onDelete: (menu_id: number, item_name: string) => void;
}

export default function MenuConstructBox(prop: ImenuConstructBox) {
  const { data, onAddMenu, onSelectOption, onDelete } = prop;

  const initialSelectableDepth2 = useMemo(() => {
    return data.items;
  }, [data]);
  const [selectableDepth2, setSelectableDepth2] = useState<TmenuItem[]>(
    initialSelectableDepth2
  );

  const filteredSelectedDepth2 = selectableDepth2.filter(
    (item: TmenuItem) => item.is_selected
  );
  const canAddMoreDepth2 =
    filteredSelectedDepth2.length < MAX_NUM &&
    filteredSelectedDepth2.length < selectableDepth2.length - 1;

  function handleAddMenu(updatedMenuItems: TmenuItem[]) {
    onAddMenu(updatedMenuItems, data.menu_id);
    setSelectableDepth2(updatedMenuItems);
  }

  const [addDepth2, setAddDepth2] = useState({
    data: data,
    onAddMenu: handleAddMenu,
    onCancel: () => {},
  });

  function handleDelete(item_name: string): void {
    setSelectableDepth2((prevDepths) =>
      prevDepths.map((item) =>
        item.item_name === item_name ? { ...item, is_selected: false } : item
      )
    );
    onDelete(data.menu_id, item_name);
  }

  useEffect(() => {
    setAddDepth2((prev) => ({
      ...prev,
      selectableDepth2: selectableDepth2,
    }));
  }, [selectableDepth2]);

  return (
    <div css={wrap}>
      <ButtonDepth1 menu_name={data.menu_name} />
      {filteredSelectedDepth2.map((item, idx) => {
        const chooseDepth2: IbuttonChooseDepth2Function = {
          menu_id: data.menu_id,
          data: item,
          onSelectOption: onSelectOption,
          onDelete: handleDelete,
        };
        return <ButtonChooseDepth2Function {...chooseDepth2} key={idx} />;
      })}
      {canAddMoreDepth2 && <ButtonAddDepth2 {...addDepth2} />}
    </div>
  );
}

const wrap = css`
  display: flex;
  flex-direction: column;
  gap: 14px;

  width: 100%;
  max-width: 216px;
  height: 482px;

  padding: 14px;
  border-radius: 20px;
  background: var(--F6F8FF, #f6f8ff);
`;
