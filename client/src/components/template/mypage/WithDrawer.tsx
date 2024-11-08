/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { OuterWrap, ContentsWrap } from "../commonComponent/Wrap";
import Title from "../commonComponent/Title";

export default function WithDrawer() {
  return (
    <OuterWrap padding="208px 0">
      <ContentsWrap>
        <div css={container}>
          <Title
            title="탈퇴 하시겠습니까?"
            marginBottom={42}
            transform="uppercase"
          />
          <div css={box}>
            <p css={desc}>
              탈퇴를 하시게 되면 아래의 정보가 복구 될 수 없습니다.
              <br /> 그래도 탈퇴하시겠습니까?
            </p>
            <div css={inner_box}>
              <div css={info_container}>
                <p css={text_style}>정보</p>
                <p css={text_style}>123456789</p>
              </div>
              <div css={info_container}>
                <p css={text_style}>정보</p>
                <p css={text_style}>123456789</p>
              </div>
              <div css={info_container}>
                <p css={text_style}>정보</p>
                <p css={text_style}>123456789</p>
              </div>
              <div css={info_container}>
                <p css={text_style}>정보</p>
                <p css={text_style}>123456789</p>
              </div>
            </div>
          </div>
          <div css={button_container}>
            <div css={button_big_dark}>홈으로</div>
            <div css={button_big_light}>탈퇴하기</div>
          </div>
        </div>
      </ContentsWrap>
    </OuterWrap>
  );
}
const container = css`
  width: 100%;
`;

const button_container = css`
  margin-top: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const box = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 28px;
  width: 100%;
  padding: 60px 0 80px;
  border: 1px solid var(--E5E5E5, #e5e5e5);
`;

const desc = css`
  color: #486284;
  text-align: center;
  font-family: "Noto Sans KR";
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const inner_box = css`
  width: 100%;
  padding: 26px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 472px;
  border-top: 1px solid #d7d5d5;
  border-bottom: 1px solid #d7d5d5;
`;

const text_style = css`
  color: #486284;
  font-family: "Noto Sans KR";
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const info_container = css`
  display: flex;
  padding: 0 10px;
  gap: 50px;
`;

const button_big_dark = css`
  display: flex;
  width: 138px;
  height: 50px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;

  background: #486284;

  color: #fff;
  text-align: center;
  font-family: "Noto Sans KR";
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 35px; /* 233.333% */
`;

const button_big_light = css`
  display: flex;
  width: 138px;
  height: 50px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;

  border: 1px solid #bcbcbc;

  color: #486284;
  text-align: center;
  font-family: "Noto Sans KR";
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 35px; /* 233.333% */
`;
