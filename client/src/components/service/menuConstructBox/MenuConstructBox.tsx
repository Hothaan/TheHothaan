/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import { MAX_NUM } from "@data/maxNum";
import { T2depth } from "@data/serviceData";
import ButtonDepth1 from "../button/ButtonDepth1";
import ButtonChooseDepth2Function from "../button/ButtonChooseDepth2Function";
import ButtonAddDepth2 from "../button/ButtonAddDepth2";

export default function MenuConstructBox(prop: IbuttonDepth1) {
  const { depth1, data, deleteFunction, onChange } = prop;

  function makeInitialSelectableDepth2(data: any) {
    return Object.entries(data).map(([key, value]) => {
      const keyValue = value as T2depth;
      return {
        isDefault: keyValue.isDefault,
        isSelected: keyValue.isDefault,
        depth2: keyValue.kor,
        options: keyValue.options || null,
      };
    });
  }

  const initialSelectableDepth2 = makeInitialSelectableDepth2(data);

  const [selectableDepth2, setSelectableDepth2] = useState<IselectableDepth2[]>(
    initialSelectableDepth2
  );

  // console.log(selectableDepth2);

  function handleSelectableDepth2Change(
    upadateDepth2: IselectableDepth2[]
  ): void {
    setSelectableDepth2(upadateDepth2);
  }

  const [addDepth2, setAddDepth2] = useState<IbuttonAddDepth2>({
    depth1: depth1,
    selectableDepth2: selectableDepth2,
    onAdd: handleSelectableDepth2Change,
    onCancel: () => {},
  });

  function handleDelete(depth2: string) {
    setSelectableDepth2((prevDepths) =>
      prevDepths.map((item) =>
        item.depth2 === depth2 ? { ...item, isSelected: false } : item
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
      {selectableDepth2
        .filter((item) => item.isSelected)
        .map((depth2) => {
          const chooseDepth2: IbuttonChooseDepth2Function = {
            isDefault: depth2.isDefault,
            info: "유형 선택",
            depth1: depth1,
            depth2: depth2.depth2,
            options: depth2.options,
            onChoose: () => {},
            deleteFunction: () => handleDelete(depth2.depth2),
          };
          return (
            <ButtonChooseDepth2Function {...chooseDepth2} key={depth2.depth2} />
          );
        })}
      {selectableDepth2.filter((item) => item.isSelected).length < MAX_NUM && (
        <ButtonAddDepth2 {...addDepth2} />
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
