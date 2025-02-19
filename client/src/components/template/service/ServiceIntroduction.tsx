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
import { ReactComponent as GotoLink } from "@svgs/template/gotoLink.svg";
import EditableText from "@components/service/editableText/EditableText";
import useEditTemplate from "@hooks/useEditTemplate";

const component_title_ = "service Introduction";
const component_desc_ = "lorem ipsum, quia dolorem ipsum, quia do";

const item_title_ = "lorem ipsum, quia do ddd";

const item_desc_ = "lorem ipsum";

export interface IserviceIntroductionContent {
  serviceIntroductionTitle?: string;
  serviceIntroductionDesc?: string;
}
export interface IserviceIntroductionStyle {
  serviceIntroductionTitle?: CSSObject;
  serviceIntroductionDesc?: CSSObject;
}

interface IserviceIntroduction {
  content?: IserviceIntroductionContent | null;
  style?: IserviceIntroductionStyle | null;
  isEditable?: boolean;
  onChangeContent: (key: string, value: string) => void;
  onChangeStyle: (key: string, value: CSSObject) => void;
  index?: number;
  activeEditor?: string;
  setActiveEditor?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const service_introduction_title_css_: CSSObject = {
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "24px",
  fontStyle: "normal",
  fontWeight: "800",
  lineHeight: "1.5em",

  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export const service_introduction_desc_css_: CSSObject = {
  color: "#7f7f7f",
  fontFamily: "Inter",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "160%",

  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

function ServiceIntroductionItem(prop: IserviceIntroduction) {
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
    content?.serviceIntroductionTitle === undefined ||
    content?.serviceIntroductionDesc === undefined ||
    style?.serviceIntroductionTitle === undefined ||
    style?.serviceIntroductionDesc === undefined
  ) {
    return <></>;
  }

  return (
    <div css={item}>
      <ImageBox
        container={{ width: "400px", height: "570px" }}
        icon={{ width: "68px", height: "68px" }}
        borderRadius="20px"
        responsive={{
          maxWidth: 1500,
          container: "width: 280px; height: 400px;",
          icon: "width: 50px; height: 50px;",
        }}
      />
      <div css={info_container}>
        <div css={text_container}>
          {isEditable ? (
            <EditableText
              text={content.serviceIntroductionTitle}
              className="serviceIntroductionTitle"
              isTextArea={false}
              defaultCss={style.serviceIntroductionTitle}
              onChangeText={(key, value) => onChangeContent(key, value)}
              onChangeCss={(key, value) => onChangeStyle(key, value)}
              id={"serviceIntroductionTitle" + index}
              activeEditor={activeEditor}
              setActiveEditor={setActiveEditor}
            />
          ) : (
            <p
              css={
                style?.serviceIntroductionTitle ||
                service_introduction_title_css_
              }
            >
              {content?.serviceIntroductionTitle || item_title_}
            </p>
          )}
          {isEditable ? (
            <EditableText
              text={content.serviceIntroductionDesc}
              className="serviceIntroductionDesc"
              isTextArea={false}
              defaultCss={style.serviceIntroductionDesc}
              onChangeText={(key, value) => onChangeContent(key, value)}
              onChangeCss={(key, value) => onChangeStyle(key, value)}
              id={"serviceIntroductionDesc" + index}
              activeEditor={activeEditor}
              setActiveEditor={setActiveEditor}
            />
          ) : (
            <p
              css={
                style?.serviceIntroductionDesc || service_introduction_desc_css_
              }
            >
              {content?.serviceIntroductionDesc || item_desc_}
            </p>
          )}
        </div>
        <GotoLink css={icon} />
      </div>
    </div>
  );
}

export default function ServiceIntroduction(prop: IserviceIntroduction) {
  const {
    content,
    style,
    isEditable,
    onChangeContent,
    onChangeStyle,
    activeEditor,
    setActiveEditor,
  } = prop;

  const count = 3;

  const initialContent = {
    serviceIntroductionTitle: content?.serviceIntroductionTitle || item_title_,
    serviceIntroductionDesc: content?.serviceIntroductionDesc || item_desc_,
  };

  const initialStyle = {
    serviceIntroductionTitle:
      style?.serviceIntroductionTitle || service_introduction_title_css_,
    serviceIntroductionDesc:
      style?.serviceIntroductionDesc || service_introduction_desc_css_,
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
    <OuterWrap padding="160px 0">
      <InnerWrap>
        <div css={title_container}>
          <Title
            title={component_title_}
            transform="capitalize"
            marginBottom={20}
          />
          <p css={title_desc}>{component_desc_}</p>
        </div>
        <div css={item_container}>
          {Array.from({ length: count }, (_, index) => (
            <ServiceIntroductionItem
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
      </InnerWrap>
    </OuterWrap>
  );
}

const title_container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 50px;
`;

const title_desc = css`
  color: #486284;
  text-align: center;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 32px */
`;

const item_container = css`
  display: flex;
  align-items: center;
  gap: 90px;
  @media (max-width: 1500px) {
    gap: 30px;
  }
`;

const item = css`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const info_container = css`
  width: 280px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const text_container = css`
  width: calc(100% - 10px - 32px - 6px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 7px;
`;

const icon = css`
  flex-shrink: 0;
`;
