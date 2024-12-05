/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Attention from "@components/common/ui/Attention/Attention";

const bubble_ = "더핫한은 지금 준비중!";
const text_ = ["잠깐! 준비하고 있으니", <br />, "잠시만 기다려주세요"];

export default function PreparePage() {
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
