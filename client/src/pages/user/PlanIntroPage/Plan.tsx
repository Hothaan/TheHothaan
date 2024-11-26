/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import ResponsiveContainer from "@components/common/ui/Container/ResponsiveContainer";
import { cardDatas, ServiceIntro8Card } from "../MainPage/ServiceIntro8";
import { ReactComponent as Symbol } from "@svgs/common/symbol.svg";

export default function Plan() {
  return (
    <ResponsiveContainer>
      <div css={container}>
        <div css={title_container}>
          <div css={icon_container}>
            <Symbol />
          </div>
          <p css={title}>더핫한 기획서 작성 솔루션 요금안내</p>
        </div>
        <div css={card_container}>
          {cardDatas.map((item, idx) => (
            <ServiceIntro8Card {...item} key={idx} />
          ))}
        </div>
      </div>
    </ResponsiveContainer>
  );
}

const container = css`
  padding: 100px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
`;

const title_container = css`
  width: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const icon_container = css`
  display: flex;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 16px;
  border: 1px solid var(--DEDEDE, #dedede);
  background: var(--FFF, #fff);
`;

const card_container = css`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 40px;
`;

const title = css`
  color: var(--383838, #383838);
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
