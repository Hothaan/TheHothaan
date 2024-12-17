/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { ReactComponent as ChevDown } from "@svgs/template/chevDownTemplate.svg";

export interface InavItem {
  category?: string;
  isOption: boolean;
}

export default function NavItem(prop: InavItem) {
  const { category, isOption } = prop;
  return (
    <li css={nav_item}>
      <p css={nav_text}>{category || "category"}</p>
      {isOption && <ChevDown />}
    </li>
  );
}

const nav_item = css`
  display: flex;
  align-items: center;
`;

const nav_text = css`
  color: #486284;
  font-family: Inter;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-transform: capitalize;
  @media (max-width: 1300px) {
    font-size: 16px;
  }
`;
