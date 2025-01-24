/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useEffect, useState } from "react";
import { OuterWrap } from "../commonComponent/Wrap";
import EditableText from "@components/service/editableText/EditableText";

const desc_ =
  "lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non";

export interface IhistoryContent {
  historyDesc?: string;
}
export interface IhistoryStyle {
  historyDesc?: CSSObject;
}

interface Ihistory {
  content?: IhistoryContent | null;
  style?: IhistoryStyle | null;
  isEditable?: boolean;
  onChangeContent: (key: string, value: string) => void;
  onChangeStyle: (key: string, value: CSSObject) => void;
}

export const history_desc_css_ = css`
  position: relative;

  max-width: 600px;
  color: #486284;

  /* h2_middle */
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &:after {
    display: block;
    content: "";
    width: 1px;
    height: 100%;
    position: absolute;

    top: 20px;
    left: -34px;
  }
`;

export default function History(prop: Ihistory) {
  const { content, style, isEditable, onChangeContent, onChangeStyle } = prop;

  const count = 6;

  const initialContent = {
    historyDesc: content?.historyDesc || desc_,
  };
  const initialStyle = {
    historyDesc: style?.historyDesc || history_desc_css_,
  };

  const [editableContent, setEditableContent] = useState<any>(null);
  const [editableStyle, setEditableStyle] = useState<any>(null);

  useEffect(() => {
    if (content) {
      if (content?.historyDesc) {
        setEditableContent({
          ...initialContent,
          historyDesc: content.historyDesc,
        });
      } else {
        setEditableContent({
          ...initialContent,
          historyDesc: initialContent.historyDesc,
        });
      }

      setEditableStyle(initialStyle);
    }
  }, [content]);

  function handleEditContent(key: string, value: string) {
    setEditableContent({
      ...editableContent,
      [key]: value,
    });
    onChangeContent?.(key, value);
  }

  function handleEditStyle(key: string, value: CSSObject) {
    setEditableStyle({
      ...editableStyle,
      [key]: value,
    });
    onChangeStyle?.(key, value);
  }

  if (!editableContent) {
    return <></>;
  }

  return (
    <OuterWrap padding="200px 0">
      <div css={container}>
        <ul css={history_list}>
          {Array.from({ length: count }, (_, index) => (
            <li css={history_item} key={index}>
              <p css={year_style}>{2021 - index}</p>
              <div css={circle_container}>
                <span css={circle(index === 0 ? true : false)}></span>
              </div>
              {isEditable ? (
                <EditableText
                  text={editableContent.historyDesc}
                  className="historyDesc"
                  isTextArea={false}
                  defaultCss={{
                    ...editableStyle.historyDesc,
                    ...history_desc_change(
                      index === 0 ? true : false,
                      index === count - 1 ? true : false
                    ),
                  }}
                  onChangeText={(key, value) => handleEditContent(key, value)}
                  onChangeCss={(key, value) => handleEditStyle(key, value)}
                />
              ) : (
                <p
                  css={[
                    editableStyle?.historyDesc,
                    history_desc_change(
                      index === 0 ? true : false,
                      index === count - 1 ? true : false
                    ),
                  ]}
                >
                  {editableContent?.historyDesc}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </OuterWrap>
  );
}

const container = css`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const history_list = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const history_item = css`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
  gap: 24px;
`;

const year_style = css`
  color: #486284;
  font-family: "Kumbh Sans";
  font-size: 36px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

const circle_container = css`
  display: flex;
  align-items: center;
  height: 54px;
`;

const circle = (isSelected?: boolean) => css`
  position: relative;

  width: 20px;
  height: 20px;
  display: block;
  border: 5px solid ${isSelected ? "#486284" : "#D6D6D6"};
  background-color: #fff;
  border-radius: 50%;

  &:before {
    display: block;
    content: "";
    z-index: 1;
    width: 10px;
    height: 10px;
    position: absolute;
    border-radius: 50%;
    background-color: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const history_desc_change = (isSelected?: boolean, isLast?: boolean) => css`
  padding-bottom: ${isLast ? "0px" : isSelected ? "240px" : "140px"};

  &:after {
    background-color: ${isSelected ? "#486284" : "#D6D6D6"};
  }
`;
