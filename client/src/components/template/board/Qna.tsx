/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { OuterWrap, ContentsWrap } from "../commonComponent/Wrap";
import Title from "../commonComponent/Title";
import BreadCrumble from "../commonComponent/BreadCrumble";
import TemplateTextField from "../commonComponent/form/TemplateTextField";
import Pagination from "../commonComponent/Pagination";
import FormButton from "../commonComponent/form/FormButton";
import SelectBox from "../commonComponent/form/SelectBox";
import ImageBox from "../commonComponent/ImageBox";
import { ReactComponent as Reply } from "@svgs/template/faq/reply.svg";
import EditableText from "@components/service/editableText/EditableText";
import useEditTemplate from "@hooks/useEditTemplate";

const title_ = "Q&A LIST BOARD";

const item_title = "Q&A 제목";

export type Tqna = "텍스트형" | "이미지형";

export interface IqnaContent {
  qnaTitle?: string;
}
export interface IqnaStyle {
  qnaTitle?: CSSObject;
}

export interface Iqna {
  content?: IqnaContent | null;
  style?: IqnaStyle | null;
  isEditable?: boolean;
  option?: Tqna;
  onChangeContent: (key: string, value: string) => void;
  onChangeStyle: (key: string, value: CSSObject) => void;
  index?: number;
  activeEditor?: string;
  setActiveEditor?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const qna_item_title_css_: CSSObject = {
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "15px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "160%",

  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

function QnaTitle() {
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
        <BreadCrumble path1="홈" path2={title_} />
      </div>
      <Title
        title={title_}
        weight="bold"
        marginBottom={0}
        transform="uppercase"
      />
    </div>
  );
}

function QnaTable(prop: Iqna) {
  const {
    content,
    style,
    isEditable,
    onChangeContent,
    onChangeStyle,
    activeEditor,
    setActiveEditor,
  } = prop;

  const count = 10;

  interface TableRow {
    id: number;
    title: string;
    date: string;
    views: number;
    isReply: boolean;
  }

  const date_ = "YYYY.MM.DD";
  const views_ = 1;

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
    font-size: 16px;
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

  const inner_container = css`
    display: flex;
    gap: 10px;
    align-items: center;
  `;

  if (content?.qnaTitle === undefined || style?.qnaTitle === undefined) {
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
            <td css={[cellStyle, text_style, col1]}>{index + 1}</td>
            <td css={[cellStyle, col2, text_align_left]}>
              <div css={inner_container}>
                {(index + 1) % 2 === 0 && <Reply />}
                {isEditable ? (
                  <EditableText
                    text={content.qnaTitle as string}
                    className="qnaTitle"
                    id={"qnaTitle" + index}
                    isTextArea={false}
                    defaultCss={style.qnaTitle as CSSObject}
                    onChangeText={(key, value) => onChangeContent(key, value)}
                    onChangeCss={(key, value) => onChangeStyle(key, value)}
                    activeEditor={activeEditor}
                    setActiveEditor={setActiveEditor}
                    isWidth100={true}
                  />
                ) : (
                  <p css={style?.qnaTitle || qna_item_title_css_}>
                    {content?.qnaTitle || item_title}
                  </p>
                )}
              </div>
            </td>
            <td css={[cellStyle, text_style, col3]}>{date_}</td>
            <td css={[cellStyle, text_style, col4]}>{views_}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function QnaGalleryBoard() {
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

function QnaSearch() {
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

export default function Qna(prop: Iqna) {
  const {
    content,
    style,
    isEditable,
    onChangeContent,
    onChangeStyle,
    activeEditor,
    setActiveEditor,
  } = prop;

  const container = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 50px;
  `;

  const initialContent = {
    qnaTitle: content?.qnaTitle || title_,
  };

  const initialStyle = {
    qnaTitle: style?.qnaTitle || qna_item_title_css_,
  };

  /* *********** */

  const updateValues = (source: any, initial: any) => {
    return Object.keys(initial).reduce((acc, key) => {
      const value = source?.[key];
      acc[key] = value === "" ? initial[key] : value ?? initial[key];
      return acc;
    }, {} as any);
  };

  const [editableContent, setEditableContent] = useState(() =>
    updateValues(content, initialContent)
  );
  const [editableStyle, setEditableStyle] = useState(() =>
    updateValues(style, initialStyle)
  );

  // `useMemo`로 최적화된 업데이트 값 생성
  const updatedContent = useMemo(
    () => updateValues(content, initialContent),
    [content, initialContent]
  );
  const updatedStyle = useMemo(
    () => updateValues(style, initialStyle),
    [style, initialStyle]
  );

  useEffect(() => {
    setEditableContent((prev: any) => {
      // 객체 비교를 수행하여 변경된 경우에만 업데이트
      if (!shallowEqual(prev, updatedContent)) {
        return updatedContent;
      }
      return prev;
    });
  }, [updatedContent]);

  useEffect(() => {
    setEditableStyle((prev: any) => {
      if (!shallowEqual(prev, updatedStyle)) {
        return updatedStyle;
      }
      return prev;
    });
  }, [updatedStyle]);

  // 얕은 비교를 수행하는 함수
  const shallowEqual = (objA: any, objB: any) => {
    if (Object.is(objA, objB)) return true;
    if (
      typeof objA !== "object" ||
      typeof objB !== "object" ||
      objA === null ||
      objB === null
    )
      return false;

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) return false;

    return keysA.every((key) => objA[key] === objB[key]);
  };

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

  const handleEditStyle = useCallback(
    (key: string, value: CSSObject) => {
      setEditableStyle((prev: any) => ({
        ...prev,
        [key]: value,
      }));
      onChangeStyle?.(key, value);
    },
    [onChangeStyle]
  );

  if (!editableContent) {
    return <></>;
  }

  /* *********** */

  return (
    <OuterWrap padding="100px 0">
      <ContentsWrap>
        <div css={container}>
          <QnaTitle />
          <QnaTable
            content={editableContent}
            style={editableStyle}
            isEditable={isEditable}
            onChangeContent={handleEditContent}
            onChangeStyle={handleEditStyle}
            activeEditor={activeEditor}
            setActiveEditor={setActiveEditor}
          />
          <QnaSearch />
        </div>
      </ContentsWrap>
    </OuterWrap>
  );
}
