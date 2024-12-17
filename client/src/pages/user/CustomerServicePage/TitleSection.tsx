/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";

interface ItitleSection {
  title?: string;
}

const title_ = "페이지 제목";

export default function TitleSection(prop: ItitleSection) {
  const { title } = prop;
  return (
    <div css={container}>
      <p css={title_style}>{title || title_}</p>
    </div>
  );
}

const container = css`
  display: flex;
  padding: 100px 0px;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  align-self: stretch;

  background: var(--F6F8FF, #f6f8ff);
`;

const title_style = css`
  color: var(--383838, #383838);
  text-align: center;
  font-family: Pretendard;
  font-size: 45px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
