/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useEffect } from "react";
import { MAX_NUM } from "@data/maxNum";
import ButtonMenuItem from "../button/ButtonMenuItem";
import { IbuttonChooseDepth2Function } from "../button/ButtonChooseFeature";
import ButtonChooseFeature from "../button/ButtonChooseFeature";
import ButtonAddFeature from "../button/ButtonAddFeature";
import {
  IserviceTypeMenuItem,
  TmenuItem,
  ToptionItem,
} from "@api/service/serviceTypeMenu";

export interface ImenuConstructBox {
  data: IserviceTypeMenuItem;
  onAddMenu: (updatedMenuItems: TmenuItem[], menu_id: number) => void;
  onSelectOption: (
    item_name: string,
    option_type: string,
    menu_id: number,
    options: ToptionItem[] | undefined
  ) => void;
  onDelete: (menu_id: number, item_name: string) => void;
}

export default function MenuConstructBox(prop: ImenuConstructBox) {
  const { data, onAddMenu, onSelectOption, onDelete } = prop;
  const [selectableFeature, setSelectableFeature] = useState<TmenuItem[]>(
    data.items
  );

  const filteredSelectedFeature = data.items.filter(
    (menuItem: TmenuItem) => menuItem.is_selected
  );
  const canAddMoreDepth2: boolean =
    filteredSelectedFeature.length < MAX_NUM &&
    filteredSelectedFeature.length < data.items.length - 1;

  function handleAddMenu(updatedMenuItems: TmenuItem[]) {
    onAddMenu(updatedMenuItems, data.menu_id);
    // setSelectableFeature(updatedMenuItems);
  }

  function handleDelete(item_name: string): void {
    // setSelectableFeature((prevDepths) =>
    //   prevDepths.map(
    //     (item) => {
    //       if (item.item_name === item_name) {
    //         if (item.is_option && item.options) {
    //           return {
    //             ...item,
    //             is_selected: false,
    //             options: item.options.map((item) => {
    //               return { ...item, is_selected: false };
    //             }),
    //           };
    //         } else {
    //           return { ...item, is_selected: false };
    //         }
    //       }
    //       return item;
    //     }
    //   )
    // );
    onDelete(data.menu_id, item_name);
    console.log(data.menu_id, item_name);
  }

  // useEffect(() => {
  //   setAddDepth2((prev) => ({
  //     ...prev,
  //     selectableFeature: data.items,
  //   }));
  // }, [data.items]);

  return (
    <div css={wrap}>
      <ButtonMenuItem menu_name={data.menu_name} />
      {filteredSelectedFeature.map((item, idx) => {
        const chooseDepth2: IbuttonChooseDepth2Function = {
          menu_id: data.menu_id,
          data: item,
          onSelectOption: onSelectOption,
          onDelete: handleDelete,
        };
        return <ButtonChooseFeature {...chooseDepth2} key={idx} />;
      })}
      {canAddMoreDepth2 && (
        <ButtonAddFeature
          data={data}
          onAddMenu={handleAddMenu}
          onDelete={handleDelete}
        />
      )}
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
