/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useLayoutEffect,
} from "react";
import { OuterWrap, InnerWrap, ContentsWrap } from "../commonComponent/Wrap";
import Title from "../commonComponent/Title";
import Pagination from "../commonComponent/Pagination";
import ImageBox from "../commonComponent/ImageBox";
import EditableText from "@components/service/editableText/EditableText";
import useEditTemplate from "@hooks/useEditTemplate";

const title_ = "Nomal Board";

const col1_ = "483";
const col2_ = "게시글 제목";
const col3_ = "닉네임";
const col4_ = "2024.12.31";
const item_num_ = "483";
const item_title_ = "lorem ipsum, quia do";
const item_desc_ = "lorem ipsum, quia do";

export interface IboardContent {
  boardTitle?: string;
  boardDesc?: string;
}
export interface IboardStyle {
  boardTitle?: CSSObject;
  boardDesc?: CSSObject;
}

export type Tboard = "이미지형" | "텍스트형" | "동영상형";

export interface Iboard {
  content?: IboardContent | null;
  style?: IboardStyle | null;
  isEditable?: boolean;
  option?: Tboard;
  onChangeContent: (key: string, value: string) => void;
  onChangeStyle: (key: string, value: CSSObject) => void;
  index?: number;
  activeEditor?: string;
  setActiveEditor?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const board_item_option_image_title_css_: CSSObject = {
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",

  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export const board_item_option_image_desc_css_: CSSObject = {
  color: "var(--A0A0A0, #a0a0a0)",
  fontFamily: "Inter",
  fontSize: "15px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",

  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export const board_item_option_text_title_css_: CSSObject = {
  color: "#486284",
  fontFamily: "Pretendard",
  fontSize: "18px",
  fontStyle: "normal",
  fontWeight: "700",
  lineHeight: "150%",

  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

function TextTable(prop: Iboard) {
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
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 70px;
    letter-spacing: -0.15px;
  `;

  const table = css`
    width: 100%;
    border-collapse: collapse;
  `;
  const table_container = css`
    width: 100%;
  `;

  if (content?.boardTitle === undefined || style?.boardTitle === undefined) {
    return <></>;
  }

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
                {isEditable ? (
                  <EditableText
                    text={content.boardTitle as string}
                    className="boardTitle"
                    id={"boardTitle" + index}
                    isTextArea={false}
                    defaultCss={style.boardTitle as CSSObject}
                    onChangeText={(key, value) => onChangeContent(key, value)}
                    onChangeCss={(key, value) => onChangeStyle(key, value)}
                    activeEditor={activeEditor}
                    setActiveEditor={setActiveEditor}
                  />
                ) : (
                  <p css={[board_item_option_text_title_css_, col2_text]}>
                    {content?.boardTitle || col2_}
                  </p>
                )}
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

function ImageItem(prop: Iboard) {
  const { content, style, isEditable, onChangeContent, onChangeStyle } = prop;
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
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 22.5px */
    letter-spacing: -0.15px;
  `;

  const info_container = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 4px;
  `;

  if (
    content?.boardTitle === undefined ||
    style?.boardTitle === undefined ||
    content?.boardDesc === undefined ||
    style?.boardDesc === undefined
  ) {
    return <></>;
  }

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
            {isEditable ? (
              <EditableText
                text={content.boardTitle as string}
                className="boardTitle"
                isTextArea={false}
                defaultCss={style.boardTitle as CSSObject}
                onChangeText={(key, value) => onChangeContent(key, value)}
                onChangeCss={(key, value) => onChangeStyle(key, value)}
              />
            ) : (
              <p css={style?.boardTitle || board_item_option_image_title_css_}>
                {content?.boardTitle || item_title_}
              </p>
            )}
            {isEditable ? (
              <EditableText
                text={content.boardDesc as string}
                className="boardDesc"
                isTextArea={false}
                defaultCss={style.boardDesc as CSSObject}
                onChangeText={(key, value) => onChangeContent(key, value)}
                onChangeCss={(key, value) => onChangeStyle(key, value)}
              />
            ) : (
              <p css={style?.boardDesc || board_item_option_image_desc_css_}>
                {content?.boardDesc || item_desc_}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Board(prop: Iboard) {
  const {
    option,
    style,
    content,
    isEditable,
    onChangeContent,
    onChangeStyle,
    activeEditor,
    setActiveEditor,
  } = prop;

  const initialContent = {
    boardTitle: content?.boardTitle || item_title_,
    boardDesc: content?.boardDesc || item_desc_,
  };

  const initialStyle = {
    boardTitle:
      style?.boardTitle ||
      (option === "텍스트형"
        ? board_item_option_text_title_css_
        : board_item_option_image_title_css_),
    boardDesc: style?.boardDesc || board_item_option_image_desc_css_,
  };

  /* *********** */

  const updateValues = (source: any, initial: any) => {
    return Object.keys(initial).reduce((acc, key) => {
      const value = source?.[key];
      acc[key] = value ?? initial[key];
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
      setEditableContent((prev: any) => {
        return {
          ...prev,
          [key]: value,
        };
      });
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
            <TextTable
              content={editableContent}
              style={editableStyle}
              isEditable={isEditable}
              onChangeContent={handleEditContent}
              onChangeStyle={handleEditStyle}
              activeEditor={activeEditor}
              setActiveEditor={setActiveEditor}
            />
          ) : option === "이미지형" ? (
            <ImageItem
              content={editableContent}
              style={editableStyle}
              isEditable={isEditable}
              onChangeContent={handleEditContent}
              onChangeStyle={handleEditStyle}
              activeEditor={activeEditor}
              setActiveEditor={setActiveEditor}
            />
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
