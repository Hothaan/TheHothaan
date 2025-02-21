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
import { OuterWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import EditableText from "@components/service/editableText/EditableText";
import useEditTemplate from "@hooks/useEditTemplate";

const image_desc_ =
  "lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non";

const title_ = "Headline H1";

const desc_ =
  "lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non";

export interface IproductIntroduceMainContent {
  productIntroduceImageDesc?: string;
  productIntroduceTitle?: string;
  productIntroduceDesc?: string;
}
export interface IproductIntroduceMainStyle {
  productIntroduceImageDesc?: CSSObject;
  productIntroduceTitle?: CSSObject;
  productIntroduceDesc?: CSSObject;
}

interface IproductIntroduceMain {
  content?: IproductIntroduceMainContent | null;
  style?: IproductIntroduceMainStyle | null;
  isEditable?: boolean;
  onChangeContent: (key: string, value: string) => void;
  onChangeStyle: (key: string, value: CSSObject) => void;
  index?: number;
  activeEditor?: string;
  setActiveEditor?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const product_introduce_image_desc_css_: CSSObject = {
  maxWidth: "calc(100% - 140px)",
  overflow: "hidden",
  textOverflow: "ellipsis",
  width: "100%",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "2",
  height: "calc(2 * 1.25em)",

  position: "absolute",
  bottom: "70px",
  left: "70px",
  color: "#486284",
  wordBreak: "break-all",
  fontFamily: "Inter",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "1.25em",
};

export const product_introduce_title_css_: CSSObject = {
  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",

  color: "#486284",
  fontFamily: "Inter",
  fontSize: "96px",
  fontStyle: "normal",
  fontWeight: "900",
  lineHeight: "1.5em",

  "@media (max-width: 1000px)": {
    fontSize: "50px",
  },
};

export const product_introduce_desc_css_: CSSObject = {
  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "6",
  height: "calc(6 * 1.25em)",

  color: "#486284",
  fontFamily: "Inter",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "1.25em",
  wordBreak: "break-all",
};

export default function ProductIntroduceMain(prop: IproductIntroduceMain) {
  const {
    content,
    style,
    isEditable,
    onChangeContent,
    onChangeStyle,
    activeEditor,
    setActiveEditor,
  } = prop;

  const initialContent = {
    productIntroduceImageDesc:
      content?.productIntroduceImageDesc || image_desc_,
    productIntroduceTitle: content?.productIntroduceTitle || title_,
    productIntroduceDesc: content?.productIntroduceDesc || desc_,
  };

  const initialStyle = {
    productIntroduceImageDesc:
      style?.productIntroduceImageDesc || product_introduce_image_desc_css_,
    productIntroduceTitle:
      style?.productIntroduceTitle || product_introduce_title_css_,
    productIntroduceDesc:
      style?.productIntroduceDesc || product_introduce_desc_css_,
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
    <OuterWrap padding="0">
      <div css={container}>
        <div css={image_container}>
          <ImageBox
            container={{ width: "100%", height: "860px" }}
            icon={{ width: "110px", height: "110px" }}
            borderRadius="none"
            responsive={{
              maxWidth: 1000,
              container: "",
              icon: "width: 110px; height: 110px;",
            }}
          />
          {isEditable ? (
            <EditableText
              text={editableContent.productIntroduceImageDesc as string}
              className="productIntroduceImageDesc"
              id={"productIntroduceImageDesc" + 1}
              isTextArea={true}
              defaultCss={editableStyle.productIntroduceImageDesc as CSSObject}
              onChangeText={(key, value) => handleEditContent(key, value)}
              onChangeCss={(key, value) => handleEditStyle(key, value)}
              activeEditor={activeEditor}
              setActiveEditor={setActiveEditor}
              isWidth100={true}
            />
          ) : (
            <p
              css={
                editableStyle?.productIntroduceImageDesc ||
                product_introduce_image_desc_css_
              }
            >
              {editableContent?.productIntroduceImageDesc || image_desc_}
            </p>
          )}
        </div>
        <div css={text_container}>
          {isEditable ? (
            <EditableText
              text={editableContent.productIntroduceTitle as string}
              className="productIntroduceTitle"
              id={"productIntroduceTitle" + 1}
              isTextArea={false}
              defaultCss={editableStyle.productIntroduceTitle as CSSObject}
              onChangeText={(key, value) => handleEditContent(key, value)}
              onChangeCss={(key, value) => handleEditStyle(key, value)}
              activeEditor={activeEditor}
              setActiveEditor={setActiveEditor}
              isWidth100={true}
            />
          ) : (
            <p
              css={
                editableStyle?.productIntroduceTitle ||
                product_introduce_title_css_
              }
            >
              {editableContent?.productIntroduceTitle || title_}
            </p>
          )}
          {isEditable ? (
            <EditableText
              text={editableContent.productIntroduceDesc as string}
              className="productIntroduceDesc"
              id={"productIntroduceDesc" + 1}
              isTextArea={true}
              defaultCss={editableStyle.productIntroduceDesc as CSSObject}
              onChangeText={(key, value) => handleEditContent(key, value)}
              onChangeCss={(key, value) => handleEditStyle(key, value)}
              activeEditor={activeEditor}
              setActiveEditor={setActiveEditor}
              isWidth100={true}
            />
          ) : (
            <p
              css={
                editableStyle?.productIntroduceDesc ||
                product_introduce_desc_css_
              }
            >
              {editableContent?.productIntroduceDesc || desc_}
            </p>
          )}
        </div>
      </div>
      <div css={container}>
        <div css={text_container}>
          {isEditable ? (
            <EditableText
              text={editableContent.productIntroduceTitle as string}
              className="productIntroduceTitle"
              id={"productIntroduceTitle" + 2}
              isTextArea={false}
              defaultCss={editableStyle.productIntroduceTitle as CSSObject}
              onChangeText={(key, value) => handleEditContent(key, value)}
              onChangeCss={(key, value) => handleEditStyle(key, value)}
              activeEditor={activeEditor}
              setActiveEditor={setActiveEditor}
            />
          ) : (
            <p
              css={
                editableStyle?.productIntroduceTitle ||
                product_introduce_title_css_
              }
            >
              {editableContent?.productIntroduceTitle || title_}
            </p>
          )}
          {isEditable ? (
            <EditableText
              text={editableContent.productIntroduceDesc as string}
              className="productIntroduceDesc"
              id={"productIntroduceDesc" + 2}
              isTextArea={true}
              defaultCss={editableStyle.productIntroduceDesc as CSSObject}
              onChangeText={(key, value) => handleEditContent(key, value)}
              onChangeCss={(key, value) => handleEditStyle(key, value)}
              activeEditor={activeEditor}
              setActiveEditor={setActiveEditor}
              isWidth100={true}
            />
          ) : (
            <p
              css={
                editableStyle?.productIntroduceDesc ||
                product_introduce_desc_css_
              }
            >
              {editableContent?.productIntroduceDesc || desc_}
            </p>
          )}
        </div>
        <div css={image_container}>
          <ImageBox
            container={{ width: "100%", height: "860px" }}
            icon={{ width: "110px", height: "110px" }}
            borderRadius="none"
            responsive={{
              maxWidth: 1000,
              container: "",
              icon: "width: 110px; height: 110px;",
            }}
          />
          {isEditable ? (
            <EditableText
              text={editableContent.productIntroduceImageDesc as string}
              className="productIntroduceImageDesc"
              id={"productIntroduceImageDesc" + 2}
              isTextArea={true}
              defaultCss={editableStyle.productIntroduceImageDesc as CSSObject}
              onChangeText={(key, value) => handleEditContent(key, value)}
              onChangeCss={(key, value) => handleEditStyle(key, value)}
              activeEditor={activeEditor}
              setActiveEditor={setActiveEditor}
              isWidth100={true}
            />
          ) : (
            <p
              css={
                editableStyle?.productIntroduceImageDesc ||
                product_introduce_image_desc_css_
              }
            >
              {editableContent?.productIntroduceImageDesc || image_desc_}
            </p>
          )}
        </div>
      </div>
    </OuterWrap>
  );
}

const container = css`
  width: 100%;
  display: flex;
`;

const image_container = css`
  width: 50%;
  position: relative;
`;

const text_container = css`
  display: flex;
  flex-direction: column;
  gap: 60px;

  width: 50%;
  padding: 110px 144px;

  background-color: #fff;

  @media (max-width: 1000px) {
    padding: 110px 70px;
    gap: 40px;
  }
`;
