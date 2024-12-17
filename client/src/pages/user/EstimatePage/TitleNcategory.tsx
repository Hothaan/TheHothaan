/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { ReactElement, useState } from "react";
import { ReactComponent as Plan } from "@svgs/estimate/categoryPlan.svg";
import { ReactComponent as Design } from "@svgs/estimate/categoryDesign.svg";
import { ReactComponent as Develop } from "@svgs/estimate/categoryDevelop.svg";

export type Tcategory = "기획 분야" | "디자인 분야" | "개발 분야";

export interface IcategoryItem {
  category: Tcategory;
  isSelected: boolean;
  icon: ReactElement;
  onClick: () => void;
}

function CategoryItem(prop: IcategoryItem) {
  const { category, isSelected, icon, onClick } = prop;
  const item_container = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;

    cursor: pointer;

    transition: 0.3s ease;

    &:hover {
      transform: translateY(-5%);
    }
  `;

  const category_style = css`
    color: var(--383838, #383838);
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `;

  const icon_container = (isSelected: boolean) => css`
    position: relative;
    display: flex;
    width: 100px;
    height: 100px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;

    border-radius: 30px;
    background: var(--FFF, #fff);
    border: 3px solid transparent;

    &:after {
      position: absolute;
      content: "";
      display: block;

      inset: -3px;
      border-radius: 30px;
      padding: 3px;
      -webkit-mask: linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: destination-out;
      mask-composite: exclude;
      pointer-events: none;
      background: linear-gradient(
        to right,
        ${isSelected ? "#56c0fe -1.67%, #6d0ee6 98.33%" : "transparent"}
      );
    }
  `;

  return (
    <div css={item_container} onClick={onClick}>
      <div css={icon_container(isSelected)}>{icon}</div>
      <p css={category_style}>{category || "카테고리"}</p>
    </div>
  );
}

export default function TitleNcategory() {
  const [selectedCategory, setSelectedCategory] = useState<Tcategory | null>(
    null
  );

  const itemDatas: IcategoryItem[] = [
    {
      category: "기획 분야",
      isSelected: selectedCategory === "기획 분야",
      icon: <Plan />,
      onClick: () => {
        handleSelectedCategory("기획 분야");
      },
    },
    {
      category: "디자인 분야",
      isSelected: selectedCategory === "디자인 분야",
      icon: <Design />,
      onClick: () => {
        handleSelectedCategory("디자인 분야");
      },
    },
    {
      category: "개발 분야",
      isSelected: selectedCategory === "개발 분야",
      icon: <Develop />,
      onClick: () => {
        handleSelectedCategory("개발 분야");
      },
    },
  ];

  function handleSelectedCategory(category: Tcategory) {
    setSelectedCategory(category);
  }

  return (
    <div css={container}>
      <p css={title}>기획부터 개발까지 견적서도 더핫한🔥</p>
      <div css={category_container}>
        {itemDatas.map((item, idx) => (
          <CategoryItem {...item} key={idx} />
        ))}
      </div>
    </div>
  );
}

const container = css`
  margin-top: 80px;
  padding: 100px 0;
  width: 100%;
  background: var(--F6F8FF, #f6f8ff);
`;

const title = css`
  color: var(--161616, #161616);
  text-align: center;
  font-family: Pretendard;
  font-size: 45px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 50px;
`;

const category_container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;
