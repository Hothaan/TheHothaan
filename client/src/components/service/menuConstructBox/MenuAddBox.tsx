/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import ButtonDepth1 from "../button/ButtonDepth1";
import ButtonChooseDepth2Function from "../button/ButtonChooseDepth2Function";
import ButtonAddDepth2 from "../button/ButtonAddDepth2";

export default function MenuAddbox(prop: IbuttonDepth1) {
  const { depth1, deleteFunction } = prop;

  const [selectableDepth2, setSelectableDepth2] = useState<IselectableDepth2[]>(
    [
      {
        isSelected: true,
        depth2: "상품 목록",
        options: ["텍스트형 게시판", "동영상형 게시판", "이미지형 게시판"],
      },
      {
        isSelected: false,
        depth2: "상품 상세",
        options: ["텍스트 강조", "동영상 강조", "이미지 강조"],
      },
      {
        isSelected: false,
        depth2: "상품 리뷰",
        options: ["텍스트 리뷰", "동영상 리뷰", "이미지 리뷰"],
      },
    ]
  );

  function handleSelectableDepth2Change(
    upadateDepth2: IselectableDepth2[]
  ): void {
    setSelectableDepth2(upadateDepth2);
  }

  const [addDepth2, setAddDepth2] = useState<IbuttonAddDepth2>({
    depth1: "상품",
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
      selectableDepth2: selectableDepth2, // 변경된 selectableDepth2 반영
    }));
  }, [selectableDepth2]);

  return (
    <div css={wrap}>
      <ButtonDepth1 {...prop} />
      {selectableDepth2
        .filter((item) => item.isSelected)
        .map((depth2) => {
          const chooseDepth2: IbuttonChooseDepth2Function = {
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
      {selectableDepth2.filter((item) => item.isSelected).length <
        selectableDepth2.length && <ButtonAddDepth2 {...addDepth2} />}
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
