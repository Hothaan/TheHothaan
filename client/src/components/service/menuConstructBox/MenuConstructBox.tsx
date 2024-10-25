/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect, useMemo } from "react";
import { MAX_NUM } from "@data/maxNum";
import { T2depth } from "@data/service/depth2/types";
import ButtonDepth1 from "../button/ButtonDepth1";
import ButtonChooseDepth2Function from "../button/ButtonChooseDepth2Function";
import ButtonAddDepth2 from "../button/ButtonAddDepth2";

export default function MenuConstructBox(prop: IbuttonDepth1) {
  const { depth1Kor, depth1Eng, data, onAddMenu, onSelectOption, onDelete } =
    prop;

  const initialSelectableDepth2 = useMemo(() => {
    return Object.entries(data).map(([key, value]) => {
      const keyValue = value as T2depth;
      return {
        depth2: { kor: keyValue.kor, eng: keyValue.eng },
        isDefault: keyValue.isDefault,
        isSelected: keyValue.isDefault,
        options: keyValue.options || null,
      };
    });
  }, [data]);

  const [selectableDepth2, setSelectableDepth2] = useState<IselectableDepth2[]>(
    initialSelectableDepth2
  );

  const filteredSelectedDepth2 = selectableDepth2.filter(
    (item) => item.isSelected
  );
  const canAddMoreDepth2 =
    filteredSelectedDepth2.length < MAX_NUM &&
    filteredSelectedDepth2.length < selectableDepth2.length - 1;

  function handleAddMenu(updatedDepth2: IselectableDepth2[]) {
    onAddMenu(updatedDepth2, depth1Eng);
    setSelectableDepth2(updatedDepth2);
  }

  const [addDepth2, setAddDepth2] = useState<IbuttonAddDepth2>({
    depth1Kor: depth1Kor,
    depth1Eng: depth1Eng,
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
          depth1Kor: depth1Kor,
          depth1Eng: depth1Eng,
          depth2: { eng: depth2.depth2.eng, kor: depth2.depth2.kor },
          options: depth2.options,
          onSelectOption: onSelectOption,
          onDelete: () => {
            handleDelete(depth1Eng, depth2.depth2.eng);
            onDelete(depth1Eng, depth2.depth2.eng);
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
