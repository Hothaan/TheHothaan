/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import Attention from "@components/common/ui/Attention/Attention";

const bubble_ = "잠시 오류가 난 것 같아요!";
const text_ = ["인터넷 연결을 점검하거나", <br />, "관리자에게 문의해주세요."];

export default function ErrorPage() {
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
