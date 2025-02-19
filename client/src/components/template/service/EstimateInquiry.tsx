/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { OuterWrap } from "../commonComponent/Wrap";

const input_text_label_ = "lorem ipsum";
const input_text_placeholder_ = "lorem ipsum";
const checkbox_label_ = "lorem ipsum";
const link_text_ = "lorem ipsum";
const form_button_ = "lorem ipsum";

export default function EstimateInquiry() {
  return (
    <OuterWrap padding="300px 0">
      <div css={container}>
        <div css={form_row}>
          <div css={input_text_container}>
            <p css={input_text_label}>{input_text_label_}</p>
            <div css={input_text}>
              <p css={input_text_placeholder}>{input_text_placeholder_}</p>
            </div>
          </div>
          <div css={input_text_container}>
            <p css={input_text_label}>{input_text_label_}</p>
            <div css={input_text}>
              <p css={input_text_placeholder}>{input_text_placeholder_}</p>
            </div>
          </div>
        </div>
        <div css={form_row}>
          <div css={input_text_container}>
            <p css={input_text_label}>{input_text_label_}</p>
            <div css={input_text}>
              <p css={input_text_placeholder}>{input_text_placeholder_}</p>
            </div>
          </div>
          <div css={input_text_container}>
            <p css={input_text_label}>{input_text_label_}</p>
            <div css={input_text}>
              <p css={input_text_placeholder}>{input_text_placeholder_}</p>
            </div>
          </div>
        </div>
        <div css={form_row}>
          <div css={input_textarea_container}>
            <p css={input_text_label}>{input_text_label_}</p>
            <div css={input_textarea}></div>
          </div>
        </div>
        <div css={checkbox_row}>
          <div css={checkbox_container}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M17.9984 2.39844C19.9867 2.39844 21.5984 4.01021 21.5984 5.99844V17.9985C21.5984 19.9868 19.9867 21.5985 17.9984 21.5985H5.99844C4.01021 21.5985 2.39844 19.9868 2.39844 17.9985L2.39844 5.99844C2.39844 4.01021 4.01021 2.39844 5.99844 2.39844L17.9984 2.39844Z"
                stroke="#486284"
                strokeWidth="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p css={checkbox_label}>{checkbox_label_}</p>
          </div>
          <div css={link_container}>
            <p css={link_text}>{link_text_}</p>
            <div css={link_icon_container}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="7"
                height="12"
                viewBox="0 0 7 12"
                fill="none"
              >
                <path
                  d="M0.681433 10.6328L5.3125 6.00175L0.681433 1.37068"
                  stroke="#898989"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>
        </div>
        <p css={form_button}>{form_button_}</p>
      </div>
    </OuterWrap>
  );
}

const container = css`
  width: 100%;
  max-width: 1320px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 44px;

  @media (max-width: 1000px) {
    padding: 0 100px;
  }
`;

const form_row = css`
  width: 100%;
  display: flex;
  width: 100%;
  align-items: center;
  gap: 60px;
`;

const input_text_container = css`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
`;

const input_textarea_container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
`;

const input_text_label = css`
  color: #486284;
  leading-trim: both;
  text-edge: cap;

  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%; /* 38.4px */
`;

const input_text = css`
  width: 100%;
  display: flex;
  height: 60px;
  padding: 20px;
  align-items: center;

  background: #f7f8f9;
`;

const input_textarea = css`
  width: 100%;
  display: flex;
  height: 160px;
  padding: 20px;
  align-items: center;

  background: #f7f8f9;
`;

const input_text_placeholder = css`
  color: #486284;
  opacity: 0.5;

  /* body/pretendard/17px */
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 27.2px */
  text-transform: uppercase;
`;

const checkbox_row = css`
  display: flex;
  width: 100%;
  gap: 88px;
  align-items: center;
`;

const checkbox_container = css`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const checkbox_label = css`
  overflow: hidden;
  color: #486284;
  text-overflow: ellipsis;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 150% */
  text-transform: capitalize;
`;

const link_container = css`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const link_text = css`
  overflow: hidden;
  color: #898989;
  text-overflow: ellipsis;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px; /* 150% */
  text-transform: capitalize;
`;

const link_icon_container = css`
  display: flex;
  width: 18px;
  height: 18px;
  justify-content: center;
  align-items: center;
`;

const form_button = css`
  display: flex;
  height: 80px;
  padding: 20px 34px;
  justify-content: center;
  align-items: center;

  border-radius: 80px;
  background: #9cb0c9;

  color: #f7f8f9;
  leading-trim: both;
  text-edge: cap;

  /* body/pretendard/24px */
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%; /* 38.4px */
`;
