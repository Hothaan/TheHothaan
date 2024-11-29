/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import CommunitySnsMain from "@components/template/templateStructureForCapture/communitySns/CommunitySnsMain";

export default function TemplateFublishingPage() {
  return (
    <div css={container}>
      <p>CommunitySnsMain</p>
      <CommunitySnsMain />
    </div>
  );
}

const container = css`
  margin-top: 80px;
`;
