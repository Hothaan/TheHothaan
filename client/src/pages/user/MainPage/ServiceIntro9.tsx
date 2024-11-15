/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import MainPageSectionContainer from "./MainPageSectionContainer";
import Button, { Ibutton } from "@components/common/button/Button";

export default function ServiceIntro9() {
  const button: Ibutton = {
    size: "L",
    bg: "gradient",
    text: "뉴스레터 신청",
  };
  return (
    <MainPageSectionContainer bgColor="#161616">
      <div css={title_container}>
        <p css={title}>시작과 성장을 위한 IT정보를 보내드릴게요!</p>
      </div>
      <Button {...button} />
    </MainPageSectionContainer>
  );
}

const title_container = css`
  margin-bottom: 50px;
`;

const title = css`
  color: var(--FFF, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 45px */
`;
