/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useEffect, useState } from "react";
import { OuterWrap, InnerWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import EditableText from "@components/service/editableText/EditableText";

const component_title_ = "게시판";

const item_title_ = "일반게시판(이미지형) 게시판입니다.";
const item_title_className = "image_board_main_item_title";

interface IimageBoardMainContent {
  imageBoardTitle?: string;
}

interface IimageBoardMainStyle {
  imageBoardTitle?: CSSObject;
}

interface IimageBoardMain {
  content?: IimageBoardMainContent | null;
  style?: IimageBoardMainStyle | null;
  isEditable?: boolean;
  onChangeContent: (key: string, value: string) => void;
  onChangeStyle: (key: string, value: CSSObject) => void;
}

export const image_board_title_css_ = css`
  color: #486284;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: capitalize;
`;

function ImageBoardMainItem(prop: IimageBoardMain) {
  const { content, style, isEditable, onChangeContent, onChangeStyle } = prop;

  const container = css`
    display: flex;
    flex-direction: column;
    gap: 20px;
  `;

  if (
    content?.imageBoardTitle === undefined ||
    style?.imageBoardTitle === undefined
  ) {
    return <></>;
  }

  return (
    <div css={container}>
      <ImageBox
        container={{ width: "430px", height: "310px" }}
        icon={{ width: "50px", height: "50px" }}
        borderRadius="none"
        responsive={{
          maxWidth: 1000,
          container: "",
          icon: "width: 50px; height: 50px;",
        }}
      />
      {isEditable ? (
        <EditableText
          text={content.imageBoardTitle as string}
          className="noticeTitle"
          isTextArea={false}
          defaultCss={style.imageBoardTitle as CSSObject}
          onChangeText={(key, value) => onChangeContent(key, value)}
          onChangeCss={(key, value) => onChangeStyle(key, value)}
        />
      ) : (
        <p
          css={style?.imageBoardTitle || image_board_title_css_}
          className={item_title_className}
        >
          {content?.imageBoardTitle || item_title_}
        </p>
      )}
    </div>
  );
}

export default function ImageBoardMain(prop: IimageBoardMain) {
  const { content, style, isEditable, onChangeContent, onChangeStyle } = prop;

  const count = 4;

  const initialContent = {
    imageBoardTitle: content?.imageBoardTitle || item_title_,
  };

  const initialStyle = {
    imageBoardTitle: style?.imageBoardTitle || image_board_title_css_,
  };

  const [editableContent, setEditableContent] = useState<any>(null);
  const [editableStyle, setEditableStyle] = useState<any>(null);

  useEffect(() => {
    if (content) {
      if (content?.imageBoardTitle) {
        setEditableContent({
          ...initialContent,
          imageBoardTitle: content.imageBoardTitle,
        });
      } else {
        setEditableContent({
          ...initialContent,
          imageBoardTitle: initialContent.imageBoardTitle,
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
    <OuterWrap padding="120px 0">
      <InnerWrap>
        <div css={container}>
          <p css={title_style}>{component_title_}</p>
          <div css={item_container}>
            {Array.from({ length: count }, (_, index) => (
              <ImageBoardMainItem
                key={index}
                content={editableContent}
                style={editableStyle}
                isEditable={isEditable}
                onChangeContent={handleEditContent}
                onChangeStyle={handleEditStyle}
              />
            ))}
          </div>
        </div>
      </InnerWrap>
    </OuterWrap>
  );
}

const container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const title_style = css`
  color: #486284;
  text-align: center;
  font-family: "Noto Sans KR";
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px; /* 100% */
`;

const item_container = css`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 40px;
`;
