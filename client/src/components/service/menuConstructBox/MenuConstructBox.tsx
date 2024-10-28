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

export default function MenuConstructBox(prop: IbuttonDepth1) {
  const { depth1, data, onAddMenu, onSelectOption, onDelete } = prop;

  console.log(data);

  const initialSelectableDepth2 = useMemo(() => {
    return Object.entries(data.selectableDepth2).map(([key, value]) => {
      const keyValue = value as T2depth;
      return {
        depth2: keyValue.depth2,
        isDefault: keyValue.isDefault,
        isSelected: keyValue.isDefault,
        options: keyValue.options,
      };
    });
  }, [data]);

  const [selectableDepth2, setSelectableDepth2] = useState<T2depth[]>(
    initialSelectableDepth2
  );

  const filteredSelectedDepth2 = selectableDepth2.filter(
    (item) => item.isSelected
  );
  const canAddMoreDepth2 =
    filteredSelectedDepth2.length < MAX_NUM &&
    filteredSelectedDepth2.length < selectableDepth2.length - 1;

  function handleAddMenu(updatedDepth2: T2depth[]) {
    onAddMenu(updatedDepth2, depth1.eng);
    setSelectableDepth2(updatedDepth2);
  }

  const [addDepth2, setAddDepth2] = useState<IbuttonAddDepth2>({
    depth1Kor: depth1.kor,
    depth1Eng: depth1.eng,
    selectableDepth2: selectableDepth2,
    onAddMenu: handleAddMenu,
    onCancel: () => {},
  });

  function handleDelete(depth1Eng: string, depth2Eng: string) {
    setSelectableDepth2((prevDepths) =>
      prevDepths.map((item) =>
        item.depth2.eng === depth2Eng ? { ...item, isSelected: false } : item
      )
    );
  }

  useEffect(() => {
    setAddDepth2((prev) => ({
      ...prev,
      selectableDepth2: selectableDepth2,
    }));
  }, [selectableDepth2]);

  return (
    <div css={wrap}>
      <ButtonDepth1 {...prop} />
      {filteredSelectedDepth2.map((depth2) => {
        const chooseDepth2: IbuttonChooseDepth2Function = {
          isDefault: depth2.isDefault,
          info: "유형 선택",
          depth1Kor: depth1.kor,
          depth1Eng: depth1.eng,
          depth2: { eng: depth2.depth2.eng, kor: depth2.depth2.kor },
          options: depth2.options,
          onSelectOption: onSelectOption,
          onDelete: () => {
            handleDelete(depth1.eng, depth2.depth2.eng);
            onDelete(depth1.eng, depth2.depth2.eng);
          },
        };
        return (
          <ButtonChooseDepth2Function
            {...chooseDepth2}
            key={depth2.depth2.eng}
          />
        );
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
