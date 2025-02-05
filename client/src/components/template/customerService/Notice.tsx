/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useEffect, useCallback } from "react";
import { OuterWrap, ContentsWrap } from "../commonComponent/Wrap";
import Title from "../commonComponent/Title";
import BreadCrumble from "../commonComponent/BreadCrumble";
import TemplateTextField from "../commonComponent/form/TemplateTextField";
import Pagination from "../commonComponent/Pagination";
import FormButton from "../commonComponent/form/FormButton";
import SelectBox from "../commonComponent/form/SelectBox";
import ImageBox from "../commonComponent/ImageBox";
import EditableText from "@components/service/editableText/EditableText";

const title_ = "게시글 제목";

export interface InoticeContent {
  noticeTitle?: string;
}
export interface InoticeStyle {
  noticeTitle?: CSSObject;
}

export type Tnotice = "텍스트형" | "이미지형";

interface Inotice {
  content?: InoticeContent | null;
  style?: InoticeStyle | null;
  isEditable?: boolean;
  option?: Tnotice;
  onChangeContent: (key: string, value: string) => void;
  onChangeStyle: (key: string, value: CSSObject) => void;
}

export const notice_title_option_text_css_: CSSObject = {
  color: "#486284",
  textAlign: "center",
  fontFamily: "Inter",
  fontSize: "15px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "160%",
};

export const notice_title_option_image_css_: CSSObject = {
  width: "100%",
  color: "#486284",
  fontFamily: "Montserrat",
  fontSize: "17px",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "normal",
  textTransform: "capitalize",
};

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
        <BreadCrumble path1="홈" path2="공지사항" />
      </div>
      <Title
        title="공지사항"
        weight="light"
        marginBottom={0}
        transform="uppercase"
      />
    </div>
  );
}

function NoticeTable(prop: Inotice) {
  const { content, isEditable, onChangeContent, onChangeStyle, style } = prop;

  const count = 10;

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

  if (content?.noticeTitle === undefined || style?.noticeTitle === undefined) {
    return <></>;
  }

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
        {Array.from({ length: count }, (_, index) => (
          <tr key={index} css={rowStyle}>
            <td css={[cellStyle, text_style, col1]}>{10}</td>
            <td css={[cellStyle, col2, text_align_left]}>
              {isEditable ? (
                <EditableText
                  text={content?.noticeTitle as string}
                  className="noticeTitle"
                  isTextArea={false}
                  defaultCss={style?.noticeTitle as CSSObject}
                  onChangeText={(key, value) => onChangeContent(key, value)}
                  onChangeCss={(key, value) => onChangeStyle(key, value)}
                />
              ) : (
                <p css={style.noticeTitle || notice_title_option_text_css_}>
                  {content?.noticeTitle || title_}
                </p>
              )}
            </td>
            <td css={[cellStyle, text_style, col3]}>{"YYYY.MM.DD"}</td>
            <td css={[cellStyle, text_style, col4]}>{1}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function NoticeGalleryBoard(prop: Inotice) {
  const { content, style, isEditable, onChangeContent, onChangeStyle } = prop;

  const count = 8;

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

  if (content?.noticeTitle === undefined || style?.noticeTitle === undefined) {
    return <></>;
  }

  return (
    <div css={container}>
      {Array.from({ length: count }, (_, index) => (
        <div css={item_container} key={index}>
          <ImageBox
            container={{ width: "430px", height: "310px" }}
            icon={{ width: "50px", height: "50px" }}
            borderRadius="0"
          />
          {isEditable ? (
            <EditableText
              text={content.noticeTitle as string}
              className="noticeTitle"
              isTextArea={false}
              defaultCss={style.noticeTitle as CSSObject}
              onChangeText={(key, value) => onChangeContent(key, value)}
              onChangeCss={(key, value) => onChangeStyle(key, value)}
            />
          ) : (
            <p css={style?.noticeTitle || notice_title_option_image_css_}>
              {content?.noticeTitle || title_}
            </p>
          )}
        </div>
      ))}
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
  const { option, style, content, isEditable, onChangeContent, onChangeStyle } =
    prop;

  const initialContent = {
    noticeTitle: content?.noticeTitle || title_,
  };
  const initialStyle = {
    noticeTitle:
      style?.noticeTitle ||
      (option === "텍스트형"
        ? notice_title_option_text_css_
        : notice_title_option_image_css_),
  };

  const [editableContent, setEditableContent] = useState<any>(null);
  const [editableStyle, setEditableStyle] = useState<any>(null);

  useEffect(() => {
    if (content?.noticeTitle !== editableContent?.noticeTitle) {
      setEditableContent({
        ...initialContent,
        noticeTitle: content?.noticeTitle ?? initialContent.noticeTitle,
      });
    }

    if (style?.noticeTitle !== editableStyle?.noticeTitle) {
      setEditableStyle(initialStyle);
    }
  }, [content, style]);

  const handleEditContent = useCallback(
    (key: string, value: string) => {
      setEditableContent((prev: any) => ({
        ...prev,
        [key]: value,
      }));
      onChangeContent?.(key, value);
    },
    [onChangeContent]
  );

  function handleEditStyle(key: string, value: CSSObject) {
    setEditableStyle({
      ...editableStyle,
      [key]: value,
    });
    onChangeStyle?.(key, value);
  }

  const container = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 50px;
  `;

  return (
    <OuterWrap padding="100px 0">
      <ContentsWrap>
        <div css={container}>
          <NoticeTitle />
          {option === "텍스트형" ? (
            <NoticeTable
              content={editableContent}
              style={editableStyle}
              isEditable={isEditable}
              onChangeContent={handleEditContent}
              onChangeStyle={handleEditStyle}
            />
          ) : (
            <NoticeGalleryBoard
              content={editableContent}
              style={editableStyle}
              isEditable={isEditable}
              onChangeContent={handleEditContent}
              onChangeStyle={handleEditStyle}
            />
          )}
          <NoticeSearch />
        </div>
      </ContentsWrap>
    </OuterWrap>
  );
}
