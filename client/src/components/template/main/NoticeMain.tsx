/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { OuterWrap, InnerWrap } from "../commonComponent/Wrap";

const component_title_ = "공지사항";

const title_ = "공지사항 제목입니다.";
const title_id = "notice_main_title";

const content_ =
  "공지사항 입니다. 공지사항 입니다. 공지사항 입니다. 공지사항 입니다. 공지사항 입니다. 공지사항 입니다. 공지사항 입니다. 공지사항 입니다. 공지사항 입니다. 공지사항 입니다. 공지사항 입니다. ";
const content_id = "notice_main_content";

const date_ = "2024.11.12";

export interface InoticeMainText {
  title?: string;
  content?: string;
}

export interface InoticeMain extends InoticeMainText {}

export interface InoticeMainItem extends InoticeMainText {
  idx?: string;
}

export function NoticeMainItem(prop: InoticeMainItem) {
  const { title, content, idx } = prop;

  const container = css`
    display: flex;
    flex-direction: column;
    padding: 30px 0px;
    justify-content: center;
    align-items: flex-start;
    gap: 5px;
    border-top: 1px solid var(--stroke-E2E2E2, #e2e2e2);
    border-bottom: 1px solid var(--stroke-E2E2E2, #e2e2e2);
  `;

  const title_container = css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;

  const title_inner_container = css`
    display: flex;
    align-items: center;
    gap: 5px;
  `;

  const tag = css`
    display: flex;
    padding: 3px 5px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    color: #486284;
    border-radius: 100px;
    border: 1px solid #486284;
  `;

  const title_style = css`
    overflow: hidden;
    color: #486284;
    text-overflow: ellipsis;

    /* pretendard/Regular/20px */
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%; /* 30px */
    letter-spacing: -0.4px;
  `;

  const date_style = css`
    color: #7d7d7d;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 24px */
    letter-spacing: -0.32px;
  `;

  const content_style = css`
    width: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    color: var(--black-gray-888888, #888);
    text-overflow: ellipsis;

    /* pretendard/Regular/15px */
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 22.5px */
    letter-spacing: -0.15px;
  `;

  return (
    <div css={container}>
      <div css={title_container}>
        <div css={title_inner_container}>
          <p css={tag}>NEW</p>
          <p css={title_style} id={title_id + "_" + idx}>
            {title || title_}
          </p>
        </div>
        <p css={date_style}>{date_}</p>
      </div>
      <p css={content_style} id={content_id + "_" + idx}>
        {content || content_}
      </p>
    </div>
  );
}

export default function NoticeMain(prop: InoticeMain) {
  const { title, content } = prop;
  const count = 3;

  return (
    <OuterWrap padding="98px 0">
      <InnerWrap>
        <div css={container}>
          <p css={title_style}>{component_title_}</p>
          <div css={item_container}>
            {Array.from({ length: count }, (_, index) => (
              <NoticeMainItem
                key={index}
                title={title || title_}
                content={content || content_}
                idx={index.toString()}
              />
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
  gap: 20px;
`;

const title_style = css`
  color: #486284;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 800;
  line-height: 130%; /* 31.2px */
  letter-spacing: -0.24px;
`;

const item_container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
