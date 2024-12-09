/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { OuterWrap } from "../commonComponent/Wrap";
import { ReactComponent as SearchIcon } from "@svgs/template/search/search.svg";

export default function Search() {
  return (
    <OuterWrap padding="100px 0 780px">
      <div css={container}>
        <div css={search_bar}>
          <p css={text}>검색어를 입력해 주세요.</p>
          <SearchIcon />
        </div>
      </div>
    </OuterWrap>
  );
}

const container = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const search_bar = css`
  display: flex;
  width: 900px;
  height: 90px;
  padding: 10px 40px 10px 50px;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;

  border-radius: 100px;
  border: 2px solid #486284;
  background: var(--background-FFFFFF, #fff);
`;

const text = css`
  color: #486284;

  /* Pretendard/Regular/24 */
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 38.4px */
`;
