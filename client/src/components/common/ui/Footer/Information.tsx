/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";

export default function Information() {
  return (
    <div css={bottom_container}>
      <p css={info}>
        <span>주식회사 핫한</span>
      </p>
      <p css={info}>
        <span>
          서울특별시 강서구 마곡서로 152, B동 502호 (마곡동, 두산더랜드타워)
        </span>
      </p>
      <p css={info}>
        <span>TEL 1588-5162</span>
        <span>FAX 02-0000-0000</span>
        <span>대표자 : 김예지</span>
        <span>사업자등록번호 : 331-81-02895</span>
      </p>
    </div>
  );
}

const bottom_container = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const info = css`
  display: flex;
  gap: 10px;
  width: 100%;
  span {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    color: var(--747474, #747474);
  }
  span:not(:last-child) {
    position: relative;
    padding-right: 10px;
  }
  span:not(:last-child):after {
    position: absolute;
    z-index: 0;
    display: block;
    content: "";
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 1px;
    height: 12px;
    background-color: #ededed;
  }
`;
