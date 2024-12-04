/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import TitleSection from "../TitleSection";
import Tab from "../Tab";
import Categories from "../Categories";
import Board from "../Board";

const title_ = "매뉴얼";

export default function ManualPage() {
  return (
    <>
      <TitleSection title={title_} />
      <div css={inner_container}>
        <Tab />
        <Categories />
        <Board />
      </div>
    </>
  );
}
const inner_container = css`
  padding: 100px 0;
`;
