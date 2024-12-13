/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { OuterWrap, InnerWrap } from "../commonComponent/Wrap";
import { ReactComponent as ChevUp } from "@svgs/template/faqMain/chevUp.svg";

const title_ = "FAQ";

const item_title_ =
  "FAQ 제목입니다. FAQ 제목입니다. FAQ 제목입니다. FAQ 제목입니다. ";
const item_title_className = "faq_main_item_title";

const item_content_ =
  "FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. ";
const item_content_className = "faq_main_item_content";

export interface IfaqText {
  title?: string;
  content?: string;
}

interface IfaqItem extends IfaqText {}

interface Ifaq extends IfaqText {}

function FaqItem(prop: IfaqItem) {
  const { title, content } = prop;
  const count = 6;

  const item = css`
    width: 100%;
    padding: 18px 0;
    border-bottom: 1px solid #486284;
  `;

  const title_container = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  const item_title = (isOpen: boolean) => css`
    color: #486284;

    /* pretendard/Regular/15px */
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: ${isOpen ? "700" : "400"};
    line-height: 150%; /* 22.5px */
    letter-spacing: -0.15px;
  `;

  const item_content = css`
    margin-top: 20px;
    color: #486284;

    /* pretendard/Regular/15px */
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 22.5px */
    letter-spacing: -0.15px;
  `;

  const icon = (isOpen: boolean) =>
    isOpen
      ? css`
          transform: rotate(180deg);
        `
      : "";

  return (
    <div css={item_container}>
      {Array.from({ length: count }, (_, index) => {
        if (index === 1) {
          return (
            <div css={item}>
              <div css={title_container}>
                <p css={item_title(true)} className={item_title_className}>
                  {title || item_title_}
                </p>
                <ChevUp css={icon(true)} />
              </div>
              {
                <p css={item_content} className={item_content_className}>
                  {content || item_content_}
                </p>
              }
            </div>
          );
        } else {
          return (
            <div css={item}>
              <div css={title_container}>
                <p css={item_title(false)} className={item_title_className}>
                  {title || item_title_}
                </p>
                <ChevUp css={icon(false)} />
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}

export default function FAQ(prop: Ifaq) {
  const { title, content } = prop;

  return (
    <OuterWrap padding="114px 0">
      <InnerWrap>
        <div css={container}>
          <p css={title_style}>{title_}</p>
          <FaqItem
            title={title || item_title_}
            content={content || item_content_}
          />
        </div>
      </InnerWrap>
    </OuterWrap>
  );
}

const container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 0 60px;
`;

const title_style = css`
  color: #486284;
  text-align: center;
  font-family: "Noto Sans KR";
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px; /* 100% */
`;

const item_container = css`
  width: 100%;
`;
