/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState } from "react";

export default function Categories() {
  const [cate, setCate] = useState("분류명1");
  const cateData = ["분류명1", "분류명2", "분류명3", "분류명4", "분류명5"];

  function handleChangeCate(cate: string): void {
    setCate(cate);
  }

  return (
    <div css={container}>
      {cateData.map((item, idx) => (
        <p
          css={tab(cate === item)}
          key={idx}
          onClick={() => {
            handleChangeCate(item);
          }}
        >
          {item}
        </p>
      ))}
    </div>
  );
}

const container = css`
  width: 100%;
  justify-content: center;
  padding: 50px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const tab = (isSelected: boolean) => css`
  cursor: pointer;

  display: flex;
  padding: 9px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 50px;

  background-color: ${isSelected ? "#119CD4" : "#F6F8FF"};
  color: ${isSelected ? "#fff" : "#747474"};

  transition: all 0.3s;

  &:hover {
    background-color: #50b6df;
    color: #fff;
  }
`;
