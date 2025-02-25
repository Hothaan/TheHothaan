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
import Title from "../commonComponent/Title";
import { OuterWrap, InnerWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import { ReactComponent as Star } from "@svgs/template/star.svg";
import EditableText from "@components/service/editableText/EditableText";
import useEditTemplate from "@hooks/useEditTemplate";

const title_ =
  "Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit phasellus mollis sit aliquam sit nullam.";
const desc_ =
  "Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit phasellus mollis sit aliquam sit nullam.";
const name_ = "Lorem ipsum";
const role_ = "Lorem ipsum";

export interface IreviewContent {
  reviewInfo?: string;
  reviewTitle?: string;
  reviewDesc?: string;
  reviewName?: string;
  reviewRole?: string;
}

export interface IreviewStyle {
  reviewInfo?: CSSObject;
  reviewTitle?: CSSObject;
  reviewDesc?: CSSObject;
  reviewName?: CSSObject;
  reviewRole?: CSSObject;
}

interface Ireview {
  content?: IreviewContent | null;
  style?: IreviewStyle | null;
  isEditable?: boolean;
  onChangeContent: (key: string, value: string) => void;
  onChangeStyle: (key: string, value: CSSObject) => void;
  index?: number;
  activeEditor?: string;
  setActiveEditor?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const review_info_css: CSSObject = {
  color: "var(--Neutral-colors-600, #6d758f)",
  textAlign: "center",
  wordBreak: "keep-all",
  fontFamily: "Inter",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "160%",
};

export const review_item_title_css: CSSObject = {
  color: "#6d758f",

  fontFamily: "Inter",
  fontSize: "18px",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "1.25em",

  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  height: "calc(2 * 1.25em)",
  WebkitLineClamp: "2",
};

export const review_item_desc_css: CSSObject = {
  color: "#6d758f",
  maxHeight: "48px",
  fontFamily: "Inter",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "1.5em",

  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  height: "calc(2 * 1.5em)",
  WebkitLineClamp: "2",
};

export const review_item_caption_name_css: CSSObject = {
  color: "#6d758f",
  fontFamily: "Inter",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "16px",

  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export const review_item_caption_role_css: CSSObject = {
  color: "#b4b9c9",
  fontFamily: "Inter",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "16px",

  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

function ReviewItem(prop: Ireview) {
  const {
    content,
    style,
    isEditable,
    onChangeContent,
    onChangeStyle,
    index,
    activeEditor,
    setActiveEditor,
  } = prop;

  if (
    content?.reviewTitle === undefined ||
    content?.reviewDesc === undefined ||
    content?.reviewName === undefined ||
    content?.reviewRole === undefined ||
    style?.reviewTitle === undefined ||
    style?.reviewDesc === undefined ||
    style?.reviewName === undefined ||
    style?.reviewRole === undefined
  ) {
    return <></>;
  }

  return (
    <div css={item}>
      <ImageBox
        container={{ width: "260px", height: "260px" }}
        icon={{ width: "22px", height: "22px" }}
        borderRadius="8px 8px 0 0"
      />
      <div css={info_container}>
        <div css={star_container}>
          <Star />
          <Star />
          <Star />
          <Star />
          <Star />
        </div>
        {isEditable ? (
          <EditableText
            text={content.reviewTitle}
            className="reviewTitle"
            id={"reviewTitle" + index}
            isTextArea={false}
            defaultCss={style.reviewTitle}
            onChangeText={(key, value) => onChangeContent(key, value)}
            onChangeCss={(key, value) => onChangeStyle(key, value)}
            activeEditor={activeEditor}
            setActiveEditor={setActiveEditor}
          />
        ) : (
          <p css={style?.reviewTitle}>{content?.reviewTitle || title_}</p>
        )}
        {isEditable ? (
          <EditableText
            text={content.reviewDesc}
            className="reviewDesc"
            id={"reviewDesc" + index}
            isTextArea={true}
            defaultCss={style.reviewDesc}
            onChangeText={(key, value) => onChangeContent(key, value)}
            onChangeCss={(key, value) => onChangeStyle(key, value)}
            activeEditor={activeEditor}
            setActiveEditor={setActiveEditor}
          />
        ) : (
          <p css={style?.reviewDesc}>{content?.reviewDesc || desc_}</p>
        )}
        <div css={item_caption_container}>
          {isEditable ? (
            <EditableText
              text={content.reviewName}
              className="reviewName"
              id={"reviewName" + index}
              isTextArea={false}
              defaultCss={style.reviewName}
              onChangeText={(key, value) => onChangeContent(key, value)}
              onChangeCss={(key, value) => onChangeStyle(key, value)}
              activeEditor={activeEditor}
              setActiveEditor={setActiveEditor}
            />
          ) : (
            <p css={style?.reviewName}>{content?.reviewName || name_}</p>
          )}
          {isEditable ? (
            <EditableText
              text={content.reviewRole}
              className="reviewRole"
              id={"reviewRole" + index}
              isTextArea={false}
              defaultCss={style.reviewRole}
              onChangeText={(key, value) => onChangeContent(key, value)}
              onChangeCss={(key, value) => onChangeStyle(key, value)}
              activeEditor={activeEditor}
              setActiveEditor={setActiveEditor}
            />
          ) : (
            <p css={style?.reviewRole}>{content?.reviewRole || role_}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Review(prop: Ireview) {
  const {
    content,
    style,
    isEditable,
    onChangeContent,
    onChangeStyle,
    activeEditor,
    setActiveEditor,
  } = prop;

  const count = 7;

  const initialContent = {
    reviewInfo: content?.reviewInfo || title_,
    reviewTitle: content?.reviewTitle || title_,
    reviewDesc: content?.reviewDesc || desc_,
    reviewName: content?.reviewName || name_,
    reviewRole: content?.reviewRole || role_,
  };

  const initialStyle = {
    reviewInfo: style?.reviewInfo || review_info_css,
    reviewTitle: style?.reviewTitle || review_item_title_css,
    reviewDesc: style?.reviewDesc || review_item_desc_css,
    reviewName: style?.reviewName || review_item_caption_name_css,
    reviewRole: style?.reviewRole || review_item_caption_role_css,
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
    <OuterWrap padding="80px 0">
      <InnerWrap>
        <div css={text_container}>
          <Title title="Review" transform="capitalize" marginBottom={24} />
          {isEditable ? (
            <EditableText
              text={editableContent.reviewInfo}
              className="reviewInfo"
              id={"reviewInfo"}
              isTextArea={false}
              defaultCss={editableStyle.reviewInfo}
              onChangeText={(key, value) => onChangeContent(key, value)}
              onChangeCss={(key, value) => onChangeStyle(key, value)}
              activeEditor={activeEditor}
              setActiveEditor={setActiveEditor}
            />
          ) : (
            <p css={editableStyle.reviewInfo}>{editableContent.reviewInfo}</p>
          )}
        </div>
        <div css={item_container}>
          {Array.from({ length: count }, (_, index) => (
            <ReviewItem
              key={index}
              index={index}
              content={editableContent}
              style={editableStyle}
              isEditable={isEditable}
              activeEditor={activeEditor}
              setActiveEditor={setActiveEditor}
              onChangeContent={handleEditContent}
              onChangeStyle={handleEditStyle}
            />
          ))}
        </div>
      </InnerWrap>
    </OuterWrap>
  );
}

const text_container = css`
  width: 100%;
  max-width: 900px;
  margin-bottom: 40px;
`;

const item_container = css`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 40px;
  @media (max-width: 1000px) {
    overflow: hidden;
  }
`;

const info_container = css`
  display: flex;
  width: 260px;
  height: 260px;
  padding: 24px;
  flex-direction: column;
  gap: 20px;

  border-radius: 0px 0px 8px 8px;
  border: 1px solid var(--Neutral-colors-300, #f1f3f7);
  background: var(--Neutral-colors-100, #fff);

  /* Neutral/Shadow 02 */
  box-shadow: 0px 1px 4px 0px rgba(25, 33, 61, 0.08);
`;

const item = css`
  width: 260px;

  display: flex;
  flex-direction: column;

  border-radius: 8px;
`;

const star_container = css`
  display: flex;
  gap: 4px;
`;

const item_caption_container = css`
  height: 36px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
