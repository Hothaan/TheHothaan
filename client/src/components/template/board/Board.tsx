/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { OuterWrap, InnerWrap, ContentsWrap } from "../commonComponent/Wrap";
import Title from "../commonComponent/Title";
import Pagination from "../commonComponent/Pagination";
import ImageBox from "../commonComponent/ImageBox";

export interface IboardText {
  title?: string;
  desc?: string;
}

export type Tboard = "이미지형" | "텍스트형" | "동영상형";

export interface Iboard extends IboardText {
  option?: Tboard;
}

const title_ = "Nomal Board";

const col1_ = "483";
const col2_ = "게시글 제목";
const col2_id = "board_text_table_col2";
const col3_ = "닉네임";
const col4_ = "2024.12.31";
const item_num_ = "483";
const item_title_ = "lorem ipsum, quia do";
const item_title_id = "board_text_image_title";
const item_desc_ = "lorem ipsum, quia do";
const item_desc_id = "board_text_image_desc";

function TextTable(prop: IboardText) {
  const { title } = prop;

  const count = 10;
  const col1 = css`
    padding: 0 30px;
  `;
  const col2 = css`
    padding-right: 30px;
  `;
  const col4 = css`
    padding: 0 30px;
  `;
  const col1_text = css`
    width: 50px;
  `;
  const col2_text = css`
    width: 500px;
  `;
  const col3_text = css`
    width: 94px;
  `;
  const col4_text = css`
    width: 112px;
  `;

  const th = css`
    height: 55px;
    border-top: 2px solid #486284;
    border-bottom: 1px solid var(--stroke-f2f2f2, #f2f2f2);
    background: var(--background-F7F8FC, #f7f8fc);
  `;
  const th_text = css`
    color: #486284;
    text-align: center;

    font-family: Pretendard;
    font-size: 17px;
    font-style: normal;
    font-weight: 700;
    line-height: 55px;
  `;
  const td = css`
    height: 70px;
    border-bottom: 1px solid var(--E8E8E8, #e8e8e8);
    background: var(--background-FFFFFF, #fff);
  `;
  const td_text = css`
    color: #486284;
    text-align: center;

    /* pretendard/Regular/15px */
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 70px;
    letter-spacing: -0.15px;
  `;
  const td_title = css`
    color: #486284;

    /* pretendard/Bold/18px */
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%; /* 27px */
  `;
  const table = css`
    width: 100%;
    border-collapse: collapse;
  `;
  const table_container = css`
    width: 100%;
  `;

  return (
    <div css={table_container}>
      <p css={total}>총 100건</p>
      <table css={table}>
        <thead>
          <tr>
            <th css={[th, col1]}>
              <p css={[th_text, col1_text]}>번호</p>
            </th>
            <th css={[th, col2]}>
              <p css={[th_text, col2_text]}>제목</p>
            </th>
            <th css={[th]}>
              <p css={[th_text, col3_text]}>작성자</p>
            </th>
            <th css={[th, col4]}>
              <p css={[th_text, col4_text]}>등록일</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: count }, (_, index) => (
            <tr key={index}>
              <td css={[td, col1]}>
                <p css={[td_text, col1_text]}>{col1_}</p>
              </td>
              <td css={[td, col2]}>
                <p css={[td_title, col2_text]} id={col2_id + "_" + index}>
                  {title || col2_}
                </p>
              </td>
              <td css={[td]}>
                <p css={[td_text, col3_text]}>{col3_}</p>
              </td>
              <td css={[td, col4]}>
                <p css={[td_text, col4_text]}>{col4_}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
}

function ImageItem(prop: IboardText) {
  const { title, desc } = prop;
  const count = 6;

  const item_container = css`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  `;

  const item = css`
    width: 280px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
  `;

  const item_num = css`
    color: #486284;

    /* pretendard/Regular/15px */
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 22.5px */
    letter-spacing: -0.15px;
  `;

  const item_title = css`
    color: #486284;

    /* mall/subject */
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `;

  const item_desc = css`
    color: var(--A0A0A0, #a0a0a0);

    /* mall/subject_small */
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `;

  const info_container = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 4px;
  `;

  return (
    <div css={item_container}>
      {Array.from({ length: count }, (_, index) => (
        <div css={item} key={index}>
          <ImageBox
            container={{ width: "280px", height: "280px" }}
            icon={{ width: "40px", height: "40px" }}
            borderRadius="none"
            responsive={{
              maxWidth: 1000,
              container: "",
              icon: "width: 40px; height: 40px;",
            }}
          />
          <div css={info_container}>
            <p css={item_num}>{item_num_}</p>
            <p css={item_title} id={item_title_id + "_" + index}>
              {title || item_title_}
            </p>
            <p css={item_desc} id={item_desc_id + "_" + index}>
              {desc || item_desc_}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Board(prop: Iboard) {
  const { option, title, desc } = prop;

  return (
    <OuterWrap padding="70px 0">
      <InnerWrap>
        <ContentsWrap>
          <Title
            title={title_}
            weight="bold"
            marginBottom={50}
            transform="capitalize"
          />
          {option === "텍스트형" ? (
            <TextTable title={title || col2_} />
          ) : option === "이미지형" ? (
            <ImageItem title={title || item_title_} desc={desc || item_desc_} />
          ) : (
            <></>
          )}
        </ContentsWrap>
      </InnerWrap>
    </OuterWrap>
  );
}

const total = css`
  margin-bottom: 20px;
  color: #486284;

  /* pretendard/Regular/14px */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
  letter-spacing: -0.14px;
`;
