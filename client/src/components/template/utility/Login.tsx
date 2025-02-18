/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { OuterWrap, ContentsWrap } from "../commonComponent/Wrap";
import Title from "../commonComponent/Title";
import { ReactComponent as Naver } from "@svgs/template/naver.svg";
import { ReactComponent as Kakao } from "@svgs/template/kakao.svg";
import { text } from "stream/consumers";

export type Tlogin = "기본 로그인" | "소셜 로그인";

export interface Ilogin {
  option: Tlogin;
}

export default function Login(prop: Ilogin) {
  const { option } = prop;

  return (
    <OuterWrap padding="200px 0">
      <ContentsWrap>
        <div css={container}>
          <div css={title_container}>
            <Title
              title="회원 로그인"
              marginBottom={14}
              transform="uppercase"
              weight="light"
            />
            <p css={text_style}>member login</p>
          </div>
          <div css={form_container}>
            <div css={input_container}>
              <p css={text_style}>아이디</p>
              <div css={input}>
                <p css={text_style}>아이디를 입력하세요</p>
              </div>
            </div>
            <div css={input_container}>
              <p css={text_style}>비밀번호</p>
              <div css={input}>
                <p css={text_style}>비밀번호를 입력하세요</p>
              </div>
            </div>
            <div css={checkbox_container}>
              <span css={checkbox}></span>
              <p css={text_style}>아이디 저장</p>
            </div>
            <div css={button_container}>
              <div css={button_dark}>로그인</div>
              <div css={button_light}>회원가입</div>
            </div>
            <div css={link_container}>
              <p css={text_style}>아이디 찾기</p>
              <p css={text_style}>비밀번호 찾기</p>
            </div>
            {option === "소셜 로그인" && (
              <div css={sns_container}>
                <div css={sns_item}>
                  <Naver />
                  <p css={text_style}>네이버 로그인</p>
                </div>
                <div css={sns_item}>
                  <Kakao />
                  <p css={text_style}>카카오 로그인</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </ContentsWrap>
    </OuterWrap>
  );
}

const container = css`
  display: flex;
  flex-direction: column;
  gap: 34px;
  width: 500px;
`;

const sns_item = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const title_container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const text_style = css`
  color: #486284;

  /* 15 */
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 24px */
`;

const form_container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 34px;
`;

const input_container = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
const input = css`
  display: flex;
  width: 100%;
  height: 50px;
  padding: 10px;
  align-items: center;
  border-bottom: 1px solid #486284;
`;

const checkbox_container = css`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const button_container = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const checkbox = css`
  display: block;
  border: 1px solid #486284;

  width: 23px;
  height: 23px;
`;

const button_dark = css`
  display: flex;
  width: 500px;
  height: 50px;
  padding: 10px;
  justify-content: center;
  align-items: center;

  background: #486284;

  color: #fff;

  /* 15 */
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 24px */
`;

const button_light = css`
  display: flex;
  width: 500px;
  height: 50px;
  padding: 10px;
  justify-content: center;
  align-items: center;

  border: 1px solid #486284;

  color: #486284;

  /* 15 */
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 24px */
`;

const link_container = css`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`;

const sns_container = css`
  display: flex;
  gap: 30px;
  width: 100%;
  justify-content: center;
`;
