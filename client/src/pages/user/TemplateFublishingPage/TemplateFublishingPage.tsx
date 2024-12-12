/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import IntermediaryMatchMain from "@components/template/templateStructureForCapture/intermediaryMatch/IntermediaryMatchMain";
export default function TemplateFublishingPage() {
  return (
    <div css={container}>
      <p>IntermediaryMatchMain</p>
      <IntermediaryMatchMain />
    </div>
  );
}

const container = css`
  margin-top: 80px;
`;
