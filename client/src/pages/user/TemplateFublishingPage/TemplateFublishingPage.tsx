/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import IntermediaryMatchMain from "@components/template/templateStructureForCapture/intermediaryMatch/IntermediaryMatchMain";
import IntermediaryMatchPrice from "@components/template/templateStructureForCapture/intermediaryMatch/IntermediaryMatchPrice";
import IntermediaryMatchServiceIntroduce from "@components/template/templateStructureForCapture/intermediaryMatch/IntermediaryMatchServiceIntroduce";
import IntermediaryMatchEstimateInquiry from "@components/template/templateStructureForCapture/intermediaryMatch/IntermediaryMatchEstimateInquiry";
import IntermediaryMatchFAQ from "@components/template/templateStructureForCapture/intermediaryMatch/IntermediaryMatchFAQ";
import IntermediaryMatchSearch from "@components/template/templateStructureForCapture/intermediaryMatch/IntermediaryMatchSearch";
export default function TemplateFublishingPage() {
  return (
    <div css={container}>
      <p>IntermediaryMatchMain</p>
      <IntermediaryMatchMain />
      <p>IntermediaryMatchPrice</p>
      <IntermediaryMatchPrice />
      <p>IntermediaryMatchServiceIntroduce</p>
      <IntermediaryMatchServiceIntroduce />
      <p>IntermediaryMatchEstimateInquiry</p>
      <IntermediaryMatchEstimateInquiry />
      <p>IntermediaryMatchFAQ</p>
      <IntermediaryMatchFAQ />
      <p>IntermediaryMatchSearch</p>
      <IntermediaryMatchSearch />
    </div>
  );
}

const container = css`
  margin-top: 80px;
`;
