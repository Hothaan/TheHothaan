/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { OuterWrap, ContentsWrap } from "../commonComponent/Wrap";
import Title from "../commonComponent/Title";
import { ReactComponent as Arrow } from "@svgs/template/accordionArrow.svg";

export default function Join() {
  return (
    <OuterWrap padding="200px 0">
      <ContentsWrap>
        <div css={container}>
          <Title
            title="회원가입"
            transform="uppercase"
            marginBottom={40}
            weight="light"
          />
          <div css={form_container}>
            <div css={input_container}>
              <div css={label_container}>
                <p css={text_style}>아이디</p>
                <span css={required}>*</span>
              </div>
              <div css={text_field_container}>
                <div css={text_field}></div>
                <p css={error_message}>
                  아이디는 영문소문자 또는 숫자 4~16자로 입력해 주세요.
                </p>
              </div>
              <p css={info_message}>(영문소문자/숫자, 4~16자)</p>
            </div>
            <div css={input_container}>
              <div css={label_container}>
                <p css={text_style}>비밀번호</p>
                <span css={required}>*</span>
              </div>
              <div css={text_field_container}>
                <div css={text_field}></div>
              </div>
              <p css={info_message}>
                (영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10자~16자)
              </p>
            </div>
            <div css={input_container}>
              <div css={label_container}>
                <p css={text_style}>비밀번호 확인</p>
                <span css={required}>*</span>
              </div>
              <div css={text_field_container}>
                <div css={text_field}></div>
              </div>
            </div>
            <div css={input_container}>
              <div css={label_container}>
                <p css={text_style}>이름</p>
                <span css={required}>*</span>
              </div>
              <div css={text_field_container}>
                <div css={text_field}></div>
              </div>
            </div>
            <div css={input_container}>
              <div css={label_container}>
                <p css={text_style}>휴대전화</p>
                <span css={required}>*</span>
              </div>
              <div css={phone_number_container}>
                <div css={phone_number_input}>
                  <p css={text_style}>010</p>
                  <Arrow />
                </div>
                <p css={text_style}>-</p>
                <div css={phone_number_input}></div>
                <p css={text_style}>-</p>
                <div css={phone_number_input}></div>
              </div>
            </div>
            <div css={input_container}>
              <div css={label_container}>
                <p css={text_style}>이메일</p>
                <span css={required}>*</span>
              </div>
              <div css={text_field_container}>
                <div css={text_field}></div>
              </div>
            </div>
          </div>
          <div css={button}>회원가입</div>
        </div>
      </ContentsWrap>
    </OuterWrap>
  );
}

const button = css`
  margin-top: 40px;
  display: flex;
  width: 140px;
  height: 40px;
  justify-content: center;
  align-items: center;

  background: #486284;

  color: #fff;
  text-align: center;

  /* 15 */
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 24px */
`;
const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const form_container = css`
  width: 100%;
  border-top: 1px solid #486284;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const text_style = css`
  color: #486284;

  /* 15 */
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 24px */
`;

const input_container = css`
  width: 100%;
  padding: 13px 0;
  display: flex;
  align-items: center;
  gap: 14px;

  border-bottom: 1px solid #e5e5e5;
`;

const label_container = css`
  display: flex;
  width: 180px;
`;

const required = css`
  color: #ef441f;
  font-family: "Noto Sans KR";
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const text_field = css`
  width: 290px;
  height: 40px;

  border: 1px solid #e0e0e0;
  background: #fff;
`;

const text_field_container = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const error_message = css`
  color: #ec2a1d;

  /* 13 */
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 20.8px */
`;

const info_message = css`
  color: #486284;
  leading-trim: both;
  text-edge: cap;

  /* 13 */
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 160%; /* 20.8px */
`;

const phone_number_container = css`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const phone_number_input = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  border: 1px solid #e0e0e0;
  background: #fff;

  width: 86px;
  height: 40px;

  padding: 8px 11px;
`;
