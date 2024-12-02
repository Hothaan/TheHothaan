/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { OuterWrap, InnerWrap } from "../commonComponent/Wrap";
import { ReactComponent as ChevUp } from "@svgs/template/faqMain/chevUp.svg";

const title_ = "FAQ";
const item_title_ =
  "FAQ 제목입니다. FAQ 제목입니다. FAQ 제목입니다. FAQ 제목입니다. ";
const item_content_ =
  "FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. ";

export interface IfaqMainItem {
  title: string;
  content: string;
  isOpen: boolean;
}

function FaqMainItem(prop: IfaqMainItem) {
  const { title, content, isOpen } = prop;

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
    <div css={item}>
      <div css={title_container}>
        <p css={item_title(isOpen)}>{title || item_title_}</p>
        <ChevUp css={icon(isOpen)} />
      </div>
      {isOpen && <p css={item_content}>{content || item_content_}</p>}
    </div>
  );
}

export default function FaqMain() {
  const data: IfaqMainItem[] = [
    {
      title: item_title_,
      content: item_content_,
      isOpen: false,
    },
    {
      title: item_title_,
      content: item_content_,
      isOpen: true,
    },
    {
      title: item_title_,
      content: item_content_,
      isOpen: false,
    },
    {
      title: item_title_,
      content: item_content_,
      isOpen: false,
    },
    {
      title: item_title_,
      content: item_content_,
      isOpen: false,
    },
    {
      title: item_title_,
      content: item_content_,
      isOpen: false,
    },
  ];

  return (
    <OuterWrap padding="114px 0">
      <InnerWrap>
        <div css={container}>
          <p css={title}>{title_}</p>
          <div css={item_container}>
            {data.map((item, idx) => (
              <FaqMainItem {...item} key={idx} />
            ))}
          </div>
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

const title = css`
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
