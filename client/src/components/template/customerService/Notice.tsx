/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { OuterWrap, ContentsWrap } from "../commonComponent/Wrap";
import Title from "../commonComponent/Title";
import BreadCrumble from "../commonComponent/BreadCrumble";
import TemplateTextField from "../commonComponent/form/TemplateTextField";
import Pagination from "../commonComponent/Pagination";
import FormButton from "../commonComponent/form/FormButton";
import SelectBox from "../commonComponent/form/SelectBox";
import ImageBox from "../commonComponent/ImageBox";

export interface Inotice {
  option: "text" | "image";
}

function NoticeTitle() {
  const container = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    align-self: stretch;
  `;

  const breadCrumble_container = css`
    width: 100%;
    display: flex;
    justify-content: end;
  `;
  return (
    <div css={container}>
      <div css={breadCrumble_container}>
        <BreadCrumble path1="홈" path2="LIST BOARD NAME" />
      </div>
      <Title
        title="LIST BOARD NAME"
        weight="light"
        marginBottom={0}
        transform="uppercase"
      />
    </div>
  );
}

function NoticeTable() {
  interface TableRow {
    id: number;
    title: string;
    date: string;
    views: number;
  }

  const mockData: TableRow[] = [
    { id: 10, title: "SUBJECT NAME", date: "YYYY.MM.DD", views: 1 },
    { id: 10, title: "게시글 제목입니다.", date: "YYYY.MM.DD", views: 1 },
    { id: 10, title: "게시글 제목입니다.", date: "YYYY.MM.DD", views: 1 },
    { id: 10, title: "게시글 제목입니다.", date: "YYYY.MM.DD", views: 1 },
    { id: 10, title: "게시글 제목입니다.", date: "YYYY.MM.DD", views: 1 },
    { id: 10, title: "게시글 제목입니다.", date: "YYYY.MM.DD", views: 1 },
    { id: 10, title: "게시글 제목입니다.", date: "2024.01.01", views: 1 },
    { id: 10, title: "게시글 제목입니다.", date: "YYYY.MM.DD", views: 1 },
    { id: 10, title: "게시글 제목입니다.", date: "YYYY.MM.DD", views: 1 },
  ];

  const tableStyle = css`
    width: 100%;
    border-collapse: collapse;
  `;

  const headerStyle = css`
    border-top: 1px solid #486284;
    border-bottom: 1px solid #cdcdcd;
    background: rgba(255, 255, 255, 0);
    padding: 16px 12px;
  `;

  const rowStyle = css`
    border-bottom: 1px solid #cdcdcd;
    background: rgba(255, 255, 255, 0);
  `;

  const cellStyle = css`
    box-sizing: contents-box;
    padding: 16px 0;
  `;

  const text_style = css`
    color: #486284;
    text-align: center;

    /* 15 */
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%; /* 24px */
  `;

  const col1 = css`
    width: calc(60px + 12px);
    padding: 16px 0 16px 12px;
  `;
  const col2 = css`
    width: calc(100% - 60px - 100px - 50px - 24px);
  `;
  const col3 = css`
    width: 100px;
  `;
  const col4 = css`
    width: calc(50px + 12px);
    padding: 16px 12px 16px 0;
  `;

  const text_align_left = css`
    text-align: left;
  `;

  return (
    <table css={tableStyle}>
      <thead>
        <tr>
          <th css={[headerStyle, text_style, col1]}>번호</th>
          <th css={[headerStyle, text_style, col2]}>제목</th>
          <th css={[headerStyle, text_style, col3]}>작성일</th>
          <th css={[headerStyle, text_style, col4]}>조회</th>
        </tr>
      </thead>
      <tbody>
        {mockData.map((item, index) => (
          <tr key={index} css={rowStyle}>
            <td css={[cellStyle, text_style, col1]}>{item.id}</td>
            <td css={[cellStyle, text_style, col2, text_align_left]}>
              {item.title}
            </td>
            <td css={[cellStyle, text_style, col3]}>{item.date}</td>
            <td css={[cellStyle, text_style, col4]}>{item.views}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function NoticeGalleryBoard() {
  const container = css`
    display: flex;
    flex-wrap: wrap;
    gap: 40px;

    width: 100%;
  `;
  const item_container = css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  `;
  const item_name = css`
    width: 100%;
    color: #486284;
    font-family: Montserrat;
    font-size: 17px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-transform: capitalize;
  `;
  return (
    <div css={container}>
      <div css={item_container}>
        <ImageBox
          container={{ width: "430px", height: "310px" }}
          icon={{ width: "50px", height: "50px" }}
          borderRadius="0"
        />
        <p css={item_name}>gallery board name</p>
      </div>
      <div css={item_container}>
        <ImageBox
          container={{ width: "430px", height: "310px" }}
          icon={{ width: "50px", height: "50px" }}
          borderRadius="0"
        />
        <p css={item_name}>gallery board name</p>
      </div>
      <div css={item_container}>
        <ImageBox
          container={{ width: "430px", height: "310px" }}
          icon={{ width: "50px", height: "50px" }}
          borderRadius="0"
        />
        <p css={item_name}>gallery board name</p>
      </div>
      <div css={item_container}>
        <ImageBox
          container={{ width: "430px", height: "310px" }}
          icon={{ width: "50px", height: "50px" }}
          borderRadius="0"
        />
        <p css={item_name}>gallery board name</p>
      </div>
      <div css={item_container}>
        <ImageBox
          container={{ width: "430px", height: "310px" }}
          icon={{ width: "50px", height: "50px" }}
          borderRadius="0"
        />
        <p css={item_name}>gallery board name</p>
      </div>
      <div css={item_container}>
        <ImageBox
          container={{ width: "430px", height: "310px" }}
          icon={{ width: "50px", height: "50px" }}
          borderRadius="0"
        />
        <p css={item_name}>gallery board name</p>
      </div>
      <div css={item_container}>
        <ImageBox
          container={{ width: "430px", height: "310px" }}
          icon={{ width: "50px", height: "50px" }}
          borderRadius="0"
        />
        <p css={item_name}>gallery board name</p>
      </div>
      <div css={item_container}>
        <ImageBox
          container={{ width: "430px", height: "310px" }}
          icon={{ width: "50px", height: "50px" }}
          borderRadius="0"
        />
        <p css={item_name}>gallery board name</p>
      </div>
    </div>
  );
}

function NoticeSearch() {
  const container = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    align-self: stretch;
  `;

  const form_container = css`
    width: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 8px;
  `;
  return (
    <div css={container}>
      <div css={form_container}>
        <SelectBox width="90px" height="36px" text="일주일" />
        <SelectBox width="110px" height="36px" text="제목" />
        <TemplateTextField width="203px" height="36px" />
        <FormButton width="60px" height="36px" text="찾기" />
      </div>
      <Pagination />
    </div>
  );
}

export default function Notice(prop: Inotice) {
  const { option } = prop;

  const container = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 50px;
  `;
  if (option === "text") {
    return (
      <OuterWrap padding="100px 0">
        <ContentsWrap>
          <div css={container}>
            <NoticeTitle />
            <NoticeTable />
            <NoticeSearch />
          </div>
        </ContentsWrap>
      </OuterWrap>
    );
  } else {
    return (
      <OuterWrap padding="100px 0">
        <ContentsWrap>
          <div css={container}>
            <NoticeTitle />
            <NoticeGalleryBoard />
            <NoticeSearch />
          </div>
        </ContentsWrap>
      </OuterWrap>
    );
  }
}
