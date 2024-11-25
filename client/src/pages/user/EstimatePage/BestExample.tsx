/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import DesignBest from "./DesignBest";
import EstimateBest from "./EstimateBest";

export default function BestExample() {
  return (
    <div css={container}>
      <DesignBest />
      <EstimateBest />
    </div>
  );
}

const container = css`
  display: flex;
  width: 1400px;
  padding: 100px 0px;
  flex-direction: column;
  align-items: flex-start;
  gap: 80px;
`;
