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

const title_ = [`Lorem ipsum dolor`, <br key="1" />, `sit amet consectetur`];
const button_ = "Lorem ipsum dolor";

export interface IserviceContactContent {
  serviceContactTitle?: string;
  serviceContactButton?: string;
}
export interface IserviceContactStyle {
  serviceContactTitle?: CSSObject;
  serviceContactButton?: CSSObject;
}

interface IserviceContact {
  content?: IserviceContactContent | null;
  style?: IserviceContactStyle | null;
  isEditable?: boolean;
  onChangeContent: (key: string, value: string) => void;
  onChangeStyle: (key: string, value: CSSObject) => void;
  index?: number;
  activeEditor?: string;
  setActiveEditor?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const service_contact_title_css_: CSSObject = {
  color: "#486284",
  textAlign: "center",
  fontFamily: "Inter",
  fontSize: "50px",
  fontStyle: "normal",
  fontWeight: "800",
  lineHeight: "1.25em",

  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  height: "calc(2 * 1.25em)",
  WebkitLineClamp: "2",
};

export const service_contact_button_css_: CSSObject = {
  display: "flex",
  padding: "12px 20px",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50px",
  background: "var(--Neutral-10, #486284)",
  color: "var(--Neutral-0, #fff)",
  fontFamily: "Inter",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "1.6em",
  textAlign: "center",

  width: "fit-content",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export default function ServiceContact(prop: IserviceContact) {
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
    serviceContactTitle: content?.serviceContactTitle || title_,
    serviceContactButton: content?.serviceContactButton || button_,
  };

  const initialStyle = {
    serviceContactTitle:
      style?.serviceContactTitle || service_contact_title_css_,
    serviceContactButton:
      style?.serviceContactButton || service_contact_button_css_,
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
      <div css={banner_container}>
        <ImageBox
          container={{ width: "100%", height: "740px" }}
          icon={{ width: "210px", height: "210px" }}
          borderRadius="none"
          responsive={{
            maxWidth: 1000,
            container: "",
            icon: "width: 110px; height: 108px;",
          }}
        />
        <div css={contents_container}>
          {isEditable ? (
            <EditableText
              text={editableContent.serviceContactTitle as string}
              className="serviceContactTitle"
              isTextArea={true}
              defaultCss={editableStyle.serviceContactTitle as CSSObject}
              onChangeText={(key, value) => handleEditContent(key, value)}
              onChangeCss={(key, value) => handleEditStyle(key, value)}
              id={"serviceContactTitle"}
              activeEditor={activeEditor}
              setActiveEditor={setActiveEditor}
              isWidth100={true}
            />
          ) : (
            <p css={editableStyle?.serviceContactTitle}>
              {editableContent?.serviceContactTitle || title_}
            </p>
          )}
          {isEditable ? (
            <EditableText
              text={editableContent.serviceContactButton as string}
              className="serviceContactButton"
              isTextArea={false}
              hasBg={true}
              defaultCss={editableStyle.serviceContactButton as CSSObject}
              onChangeText={(key, value) => handleEditContent(key, value)}
              onChangeCss={(key, value) => handleEditStyle(key, value)}
              id={"serviceContactButton"}
              activeEditor={activeEditor}
              setActiveEditor={setActiveEditor}
            />
          ) : (
            <p css={editableStyle?.serviceContactButton}>
              {editableContent?.serviceContactButton || button_}
            </p>
          )}
        </div>
      </div>
    </OuterWrap>
  );
}

const banner_container = css`
  position: relative;
  width: 100%;
  height: 100%;
`;

const contents_container = css`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 120px 112px;
  left: 0;
  top: 0;

  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  justify-content: center;
`;
