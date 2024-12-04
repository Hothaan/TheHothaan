/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import Pagination from "@components/common/table/Pagination";

interface IboardItem {
  title?: string;
  category?: string;
  date?: string;
}

const item_title_ = "게시글 제목";
const item_category_ = "분류명";
const item_date_ = "2024.12.04";

function BoardItem(prop: IboardItem) {
  const { title, category, date } = prop;

  const container = css`
    width: 420px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  `;

  const image_container = css`
    width: 420px;
    height: 250px;
    border-radius: 20px;
    background: var(--DEDEDE, #dedede);
  `;

  const title_style = css`
    color: var(--383838, #383838);
    font-family: Pretendard;
    font-size: 17px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  `;

  const info_container = css`
    display: flex;
    gap: 18px;
  `;

  const info = css`
    color: var(--747474, #747474);
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `;

  return (
    <div css={container}>
      <div css={image_container}></div>
      <p css={title_style}>{title || item_title_}</p>
      <div css={info_container}>
        <p css={info}>{category || item_category_}</p>
        <p css={info}>{date || item_date_}</p>
      </div>
    </div>
  );
}

export default function Board() {
  const [currentPage, setCurrentPage] = useState(1);
  const count = 6;

  const container = css`
    width: 900px;
    margin: 0 auto;
  `;

  const item_container = css`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 60px;
  `;

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  return (
    <div css={container}>
      <div css={item_container}>
        {Array.from({ length: count }, (_, index) => (
          <BoardItem key={index} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
