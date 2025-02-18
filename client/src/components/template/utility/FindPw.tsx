/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { OuterWrap, ContentsWrap } from "../commonComponent/Wrap";
import Title from "../commonComponent/Title";

export default function FindPw() {
  return (
    <OuterWrap padding="300px 0">
      <ContentsWrap>
        <div css={container}>
          <Title
            title="비밀번호 찾기"
            transform="uppercase"
            marginBottom={34}
            weight="light"
          />
          <div css={form_container}>
            <div css={input_container}>
              <p css={text_style}>아이디</p>
              <div css={input}>
                <p css={text_style}>아이디를 입력하세요</p>
              </div>
            </div>
            <div css={input_container}>
              <p css={text_style}>이름</p>
              <div css={input}>
                <p css={text_style}>이메일을 입력하세요</p>
              </div>
            </div>
            <div css={input_container}>
              <p css={text_style}>이메일로 찾기</p>
              <div css={input}>
                <p css={text_style}>비밀번호를 입력하세요</p>
              </div>
            </div>
            <div css={button_dark}>확인</div>
          </div>
        </div>
      </ContentsWrap>
    </OuterWrap>
  );
}

const container = css`
  width: 100%;
  max-width: 500px;
`;

const form_container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
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

const text_style = css`
  color: #486284;

  /* 15 */
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 24px */
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
