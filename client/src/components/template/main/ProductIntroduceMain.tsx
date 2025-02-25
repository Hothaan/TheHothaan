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
  productIntroduceImageDesc1?: string;
  productIntroduceTitle1?: string;
  productIntroduceDesc1?: string;
  productIntroduceImageDesc2?: string;
  productIntroduceTitle2?: string;
  productIntroduceDesc2?: string;
}
export interface IproductIntroduceMainStyle {
  productIntroduceImageDesc1?: CSSObject;
  productIntroduceTitle1?: CSSObject;
  productIntroduceDesc1?: CSSObject;
  productIntroduceImageDesc2?: CSSObject;
  productIntroduceTitle2?: CSSObject;
  productIntroduceDesc2?: CSSObject;
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
    productIntroduceImageDesc1:
      content?.productIntroduceImageDesc1 || image_desc_,
    productIntroduceTitle1: content?.productIntroduceTitle1 || title_,
    productIntroduceDesc1: content?.productIntroduceDesc1 || desc_,
    productIntroduceImageDesc2:
      content?.productIntroduceImageDesc2 || image_desc_,
    productIntroduceTitle2: content?.productIntroduceTitle2 || title_,
    productIntroduceDesc2: content?.productIntroduceDesc2 || desc_,
  };

  const initialStyle = {
    productIntroduceImageDesc1:
      style?.productIntroduceImageDesc1 || product_introduce_image_desc_css_,
    productIntroduceTitle1:
      style?.productIntroduceTitle1 || product_introduce_title_css_,
    productIntroduceDesc1:
      style?.productIntroduceDesc1 || product_introduce_desc_css_,
    productIntroduceImageDesc2:
      style?.productIntroduceImageDesc2 || product_introduce_image_desc_css_,
    productIntroduceTitle2:
      style?.productIntroduceTitle2 || product_introduce_title_css_,
    productIntroduceDesc2:
      style?.productIntroduceDesc2 || product_introduce_desc_css_,
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
              text={editableContent.productIntroduceImageDesc1 as string}
              className="productIntroduceImageDesc1"
              id={"productIntroduceImageDesc1"}
              isTextArea={true}
              defaultCss={editableStyle.productIntroduceImageDesc1 as CSSObject}
              onChangeText={(key, value) => handleEditContent(key, value)}
              onChangeCss={(key, value) => handleEditStyle(key, value)}
              activeEditor={activeEditor}
              setActiveEditor={setActiveEditor}
              isWidth100={true}
            />
          ) : (
            <p
              css={
                editableStyle?.productIntroduceImageDesc1 ||
                product_introduce_image_desc_css_
              }
            >
              {editableContent?.productIntroduceImageDesc1 || image_desc_}
            </p>
          )}
        </div>
        <div css={text_container}>
          {isEditable ? (
            <EditableText
              text={editableContent.productIntroduceTitle1 as string}
              className="productIntroduceTitle1"
              id={"productIntroduceTitle1"}
              isTextArea={false}
              defaultCss={editableStyle.productIntroduceTitle1 as CSSObject}
              onChangeText={(key, value) => handleEditContent(key, value)}
              onChangeCss={(key, value) => handleEditStyle(key, value)}
              activeEditor={activeEditor}
              setActiveEditor={setActiveEditor}
              isWidth100={true}
            />
          ) : (
            <p
              css={
                editableStyle?.productIntroduceTitle1 ||
                product_introduce_title_css_
              }
            >
              {editableContent?.productIntroduceTitle1 || title_}
            </p>
          )}
          {isEditable ? (
            <EditableText
              text={editableContent.productIntroduceDesc1 as string}
              className="productIntroduceDesc1"
              id={"productIntroduceDesc1"}
              isTextArea={true}
              defaultCss={editableStyle.productIntroduceDesc1 as CSSObject}
              onChangeText={(key, value) => handleEditContent(key, value)}
              onChangeCss={(key, value) => handleEditStyle(key, value)}
              activeEditor={activeEditor}
              setActiveEditor={setActiveEditor}
              isWidth100={true}
            />
          ) : (
            <p
              css={
                editableStyle?.productIntroduceDesc1 ||
                product_introduce_desc_css_
              }
            >
              {editableContent?.productIntroduceDesc1 || desc_}
            </p>
          )}
        </div>
      </div>
      <div css={container}>
        <div css={text_container}>
          {isEditable ? (
            <EditableText
              text={editableContent.productIntroduceTitle2 as string}
              className="productIntroduceTitle2"
              id={"productIntroduceTitle2"}
              isTextArea={false}
              defaultCss={editableStyle.productIntroduceTitle2 as CSSObject}
              onChangeText={(key, value) => handleEditContent(key, value)}
              onChangeCss={(key, value) => handleEditStyle(key, value)}
              activeEditor={activeEditor}
              setActiveEditor={setActiveEditor}
            />
          ) : (
            <p
              css={
                editableStyle?.productIntroduceTitle2 ||
                product_introduce_title_css_
              }
            >
              {editableContent?.productIntroduceTitle2 || title_}
            </p>
          )}
          {isEditable ? (
            <EditableText
              text={editableContent.productIntroduceDesc2 as string}
              className="productIntroduceDesc2"
              id={"productIntroduceDesc2"}
              isTextArea={true}
              defaultCss={editableStyle.productIntroduceDesc2 as CSSObject}
              onChangeText={(key, value) => handleEditContent(key, value)}
              onChangeCss={(key, value) => handleEditStyle(key, value)}
              activeEditor={activeEditor}
              setActiveEditor={setActiveEditor}
              isWidth100={true}
            />
          ) : (
            <p
              css={
                editableStyle?.productIntroduceDesc2 ||
                product_introduce_desc_css_
              }
            >
              {editableContent?.productIntroduceDesc2 || desc_}
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
              text={editableContent.productIntroduceImageDesc2 as string}
              className="productIntroduceImageDesc2"
              id={"productIntroduceImageDesc2"}
              isTextArea={true}
              defaultCss={editableStyle.productIntroduceImageDesc2 as CSSObject}
              onChangeText={(key, value) => handleEditContent(key, value)}
              onChangeCss={(key, value) => handleEditStyle(key, value)}
              activeEditor={activeEditor}
              setActiveEditor={setActiveEditor}
              isWidth100={true}
            />
          ) : (
            <p
              css={
                editableStyle?.productIntroduceImageDesc2 ||
                product_introduce_image_desc_css_
              }
            >
              {editableContent?.productIntroduceImageDesc2 || image_desc_}
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
