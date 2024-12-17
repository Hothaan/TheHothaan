/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import Attention from "@components/common/ui/Attention/Attention";

const bubble_ = "존재하지 않는 페이지";
const text_ = ["접속 경로가 잘못되었어요."];

export default function NotFoundPage() {
  return (
    <div css={container}>
      <Attention text={text_} bubble={bubble_} />
    </div>
  );
}

const container = css`
  margin: 80px auto 0;
  min-height: calc(100vh - 300px);
  padding: 100px 0;
  width: 100%;
  display: flex;

  align-items: center;
  justify-content: center;
`;
