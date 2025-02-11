/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { OuterWrap, ContentsWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import { useEffect, useState, useCallback, useMemo } from "react";
import EditableText from "@components/service/editableText/EditableText";

const banner_title_ = "headline h1";

const banner_desc_ =
  "lorem ipsum, quia dolor sit, amet,consectetur, adipisci velit, sed quia non";

const item_title_ = "headline h1";

const item_desc_ =
  "lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia nonlorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia nonlorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia nonlorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non";

export interface IbrandIntroduceContent {
  brandIntroduceBannerTitle?: string;
  brandIntroduceBannerDesc?: string;
  brandIntroduceItemTitle?: string;
  brandIntroduceItemDesc?: string;
}

export interface IbrandIntroduceStyle {
  brandIntroduceBannerTitle?: CSSObject;
  brandIntroduceBannerDesc?: CSSObject;
  brandIntroduceItemTitle?: CSSObject;
  brandIntroduceItemDesc?: CSSObject;
}

interface IbrandIntroduce {
  content?: IbrandIntroduceContent | null;
  style?: IbrandIntroduceStyle | null;
  isEditable?: boolean;
  onChangeContent: (key: string, value: string) => void;
  onChangeStyle: (key: string, value: CSSObject) => void;
  index?: number;
  activeEditor?: string | null;
  setActiveEditor?: (classname?: string) => void;
}

export const brandIntroduce_banner_title_css: CSSObject = {
  marginBottom: "30px",
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "96px",
  fontStyle: "normal",
  fontWeight: "900",
  lineHeight: "150%",
  textTransform: "capitalize",
  textAlign: "center",

  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export const brandIntroduce_banner_desc_css: CSSObject = {
  textAlign: "center",
  wordBreak: "keep-all",
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",
  // maxWidth: "676px",

  width: "100%",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  height: "80px",
  WebkitLineClamp: "2",
};

export const brandIntroduce_item_title_css: CSSObject = {
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "96px",
  fontStyle: "normal",
  fontWeight: "900",
  lineHeight: "150%",
  textTransform: "capitalize",

  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export const brandIntroduce_item_desc_css: CSSObject = {
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",

  display: "-webkit-box",
  width: "100%",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  height: "312px",
  WebkitLineClamp: "6",
};

function BrandIntroduceItem(prop: IbrandIntroduce) {
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
    content?.brandIntroduceItemTitle === undefined ||
    content?.brandIntroduceItemDesc === undefined ||
    style?.brandIntroduceItemTitle === undefined ||
    style?.brandIntroduceItemDesc === undefined
  ) {
    return <></>;
  }

  return (
    <div css={item_container}>
      <ImageBox
        container={{ width: "100%", height: "905px" }}
        icon={{ width: "100px", height: "100px" }}
        borderRadius="none"
        responsive={{
          maxWidth: 1000,
          container: "",
          icon: "width: 100px; height: 100px;",
        }}
      />
      {isEditable ? (
        <EditableText
          text={content.brandIntroduceItemTitle}
          className="brandIntroduceItemTitle"
          isTextArea={false}
          defaultCss={style.brandIntroduceItemTitle}
          onChangeText={(key, value) => onChangeContent(key, value)}
          onChangeCss={(key, value) => onChangeStyle(key, value)}
          id={"brandIntroduceItemTitle" + index}
          activeEditor={activeEditor}
          setActiveEditor={setActiveEditor}
        />
      ) : (
        <p
          css={style?.brandIntroduceItemTitle || brandIntroduce_item_title_css}
        >
          {content?.brandIntroduceItemTitle || item_title_}
        </p>
      )}
      {isEditable ? (
        <EditableText
          text={content.brandIntroduceItemDesc}
          className="brandIntroduceItemDesc"
          isTextArea={true}
          defaultCss={style.brandIntroduceItemDesc}
          onChangeText={(key, value) => onChangeContent(key, value)}
          onChangeCss={(key, value) => onChangeStyle(key, value)}
          id={"brandIntroduceItemDesc" + index}
          isWidth100={true}
          activeEditor={activeEditor}
          setActiveEditor={setActiveEditor}
        />
      ) : (
        <p css={style?.brandIntroduceItemDesc || brandIntroduce_item_desc_css}>
          {content?.brandIntroduceItemDesc || item_desc_}
        </p>
      )}
    </div>
  );
}

export default function BrandIntroduce(prop: IbrandIntroduce) {
  const { isEditable, content, style, onChangeContent, onChangeStyle } = prop;

  const count = 2;

  const initialContent = {
    brandIntroduceBannerTitle:
      content?.brandIntroduceBannerTitle || banner_title_,
    brandIntroduceBannerDesc: content?.brandIntroduceBannerDesc || banner_desc_,
    brandIntroduceItemTitle: content?.brandIntroduceItemTitle || item_title_,
    brandIntroduceItemDesc: content?.brandIntroduceItemDesc || item_desc_,
  };

  const initialStyle = {
    brandIntroduceBannerTitle:
      style?.brandIntroduceBannerTitle || brandIntroduce_banner_title_css,
    brandIntroduceBannerDesc:
      style?.brandIntroduceBannerDesc || brandIntroduce_banner_desc_css,
    brandIntroduceItemTitle:
      style?.brandIntroduceItemTitle || brandIntroduce_item_title_css,
    brandIntroduceItemDesc:
      style?.brandIntroduceItemDesc || brandIntroduce_item_desc_css,
  };

  const [activeEditor, setActiveEditor] = useState<string | undefined>(
    undefined
  );

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
      // 기존 객체와 새 객체를 비교하여 변경된 경우에만 업데이트
      if (!shallowEqual(prev, updatedContent)) {
        return { ...prev, ...updatedContent };
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
      !objA ||
      !objB ||
      typeof objA !== "object" ||
      typeof objB !== "object"
    ) {
      return false;
    }

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) return false;

    return keysA.every((key) => Object.is(objA[key], objB[key]));
  };

  const handleEditContent = useCallback(
    (key: string, value: string) => {
      setEditableContent((prev: any) => {
        if (prev[key] === value) return prev; // 값이 동일하면 업데이트 안 함
        return { ...prev, [key]: value };
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

  return (
    <OuterWrap padding="0">
      <div css={banner_container}>
        <ImageBox
          container={{ width: "100%", height: "850px" }}
          icon={{ width: "210px", height: "210px" }}
          borderRadius="none"
          responsive={{
            maxWidth: 1000,
            container: "",
            icon: "width: 110px; height: 108px;",
          }}
        />
        <div css={container}>
          {isEditable ? (
            <EditableText
              text={editableContent.brandIntroduceBannerTitle}
              className="brandIntroduceBannerTitle"
              isTextArea={false}
              defaultCss={editableStyle.brandIntroduceBannerTitle}
              onChangeText={(key, value) => handleEditContent(key, value)}
              onChangeCss={(key, value) => handleEditStyle(key, value)}
              id={"brandIntroduceBannerTitle"}
              activeEditor={activeEditor}
              setActiveEditor={setActiveEditor}
              // isWidth100={true}
              justifyContent="center"
            />
          ) : (
            <p
              css={
                editableStyle?.brandIntroduceBannerTitle ||
                brandIntroduce_banner_title_css
              }
            >
              {editableContent?.brandIntroduceBannerTitle || banner_title_}
            </p>
          )}
          {isEditable ? (
            <EditableText
              text={editableContent.brandIntroduceBannerDesc}
              className="brandIntroduceBannerDesc"
              isTextArea={true}
              defaultCss={editableStyle.brandIntroduceBannerDesc}
              onChangeText={(key, value) => handleEditContent(key, value)}
              onChangeCss={(key, value) => handleEditStyle(key, value)}
              id={"brandIntroduceBannerDesc"}
              activeEditor={activeEditor}
              setActiveEditor={setActiveEditor}
              isWidth100={true}
              justifyContent="center"
            />
          ) : (
            <p
              css={
                editableStyle?.brandIntroduceBannerDesc ||
                brandIntroduce_banner_title_css
              }
            >
              {editableContent?.brandIntroduceBannerDesc || banner_title_}
            </p>
          )}
        </div>
      </div>
      <OuterWrap padding="290px">
        <ContentsWrap>
          <div css={item_wrap}>
            {Array.from({ length: count }, (_, index) => (
              <BrandIntroduceItem
                key={index}
                content={editableContent}
                style={editableStyle}
                isEditable={isEditable}
                onChangeContent={handleEditContent}
                onChangeStyle={handleEditStyle}
                index={index}
                activeEditor={activeEditor}
                setActiveEditor={setActiveEditor}
              />
            ))}
          </div>
        </ContentsWrap>
      </OuterWrap>
    </OuterWrap>
  );
}

const item_wrap = css`
  display: flex;
  flex-direction: column;
  gap: 100px;
`;

const banner_container = css`
  position: relative;
  width: 100%;
  height: 100%;
`;

const container = css`
  position: absolute;

  width: 100%;
  height: 100%;
  padding: 212px 132px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const item_container = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;
