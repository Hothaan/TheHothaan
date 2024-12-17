/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { OuterWrap, InnerWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import Title from "../commonComponent/Title";

const title_ = "My Profile";
const sub_title_ = "내 프로필";
const table_title_ = "lorem ipsum, quia";
const input_text_ = "lorem ipsum, quia";
const caption_ = "* lorem ipsum, quia";

interface Iinput {
  text?: string;
  disabled: boolean;
}

function Input(prop: Iinput) {
  const { text, disabled } = prop;

  const input = (disabled: boolean) => css`
    display: flex;
    width: 235px;
    height: 40px;
    padding: 16px 14px;
    align-items: center;
    gap: 10px;

    border-radius: 4px;
    border: 1px solid var(--d9d9d9, #d9d9d9);
    background: ${disabled ? "#fff" : "#F9FAFC"};
  `;

  const input_text = (disabled: boolean) => css`
    color: ${disabled ? "#BCBCBC" : "#486284"};
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-transform: lowercase;
  `;

  return (
    <div css={input(disabled)}>
      <p css={input_text(disabled)}>{text || input_text_}</p>
    </div>
  );
}

export default function MyProfile() {
  return (
    <OuterWrap padding="260px 0">
      <InnerWrap>
        <Title
          title={title_}
          weight="bold"
          transform="capitalize"
          marginBottom={20}
        />
        <div css={container}>
          <p css={sub_title}>{sub_title_}</p>
          <div css={table}>
            <div css={table_row}>
              <div css={table_title}>
                <p css={table_title_text}>{table_title_}</p>
              </div>
              <div css={table_content}>
                <div css={inner_container}>
                  <ImageBox
                    container={{ width: "150px", height: "150px" }}
                    icon={{ width: "60px", height: "60px" }}
                    borderRadius="none"
                    responsive={{
                      maxWidth: 1000,
                      container: "",
                      icon: "width: 40px; height: 40px;",
                    }}
                  />
                  <div css={caption_container}>
                    <p css={caption}>{caption_}</p>
                    <p css={caption}>{caption_}</p>
                    <p css={caption}>{caption_}</p>
                  </div>
                </div>
              </div>
            </div>
            <div css={table_row}>
              <div css={table_title}>
                <p css={table_title_text}>{table_title_}</p>
              </div>
              <div css={table_content}>
                <Input disabled={false} text="adminid12345" />
              </div>
            </div>
            <div css={table_row}>
              <div css={table_title}>
                <p css={table_title_text}>
                  {table_title_}
                  <span css={required}>*</span>
                </p>
              </div>
              <div css={table_content}>
                <Input disabled={true} />
              </div>
            </div>
            <div css={table_row}>
              <div css={table_title}>
                <p css={table_title_text}>{table_title_}</p>
              </div>
              <div css={table_content}>
                <Input disabled={true} />
              </div>
            </div>
            <div css={table_row}>
              <div css={table_title}>
                <p css={table_title_text}>{table_title_}</p>
              </div>
              <div css={table_content}>
                <Input disabled={true} />
              </div>
            </div>
            <div css={table_row}>
              <div css={table_title}>
                <p css={table_title_text}>{table_title_}</p>
              </div>
              <div css={table_content}>
                <Input disabled={true} />
              </div>
            </div>
          </div>
        </div>
      </InnerWrap>
    </OuterWrap>
  );
}

const required = css`
  padding-left: 5px;

  color: var(--E01515, #e01515);
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: uppercase;
`;

const container = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const sub_title = css`
  padding: 15px 0;
  width: 100%;
  max-width: 900px;
  border-bottom: 1px solid #486284;

  color: #486284;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  text-transform: uppercase;
`;

const table = css`
  width: 100%;
  max-width: 900px;
`;

const table_row = css`
  width: 100%;
  display: flex;
  border-bottom: 1px solid #ebebeb;
`;

const table_title = css`
  display: flex;
  align-items: center;
  background: #f9fafc;
  width: 200px;
  padding: 16px;
`;

const table_title_text = css`
  color: #486284;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: lowercase;
`;

const table_content = css`
  width: calc(100% - 200px);

  display: flex;
  align-items: center;
  justify-content: start;
  padding: 6px 10px;
`;

const inner_container = css`
  display: flex;
  gap: 10px;
  align-items: end;
`;

const caption_container = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
`;

const caption = css`
  color: #486284;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: lowercase;
`;
