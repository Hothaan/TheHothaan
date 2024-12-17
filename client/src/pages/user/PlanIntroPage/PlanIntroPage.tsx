/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import Plan from "./Plan";
import Title from "./Title";
import Detail from "./Detail";

export default function PlanIntroPage() {
  return (
    <div>
      <Title />
      <Plan />
      <Detail />
    </div>
  );
}
