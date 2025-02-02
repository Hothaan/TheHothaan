/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useEffect } from "react";
import { OuterWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import EditableText from "@components/service/editableText/EditableText";

export interface ImatchingServiceIntroduceMainContent {
  MatchingServiceIntroduceMainBannerTitle?: string;
  MatchingServiceIntroduceMainBannerDesc?: string;
  MatchingServiceIntroduceMainItemTitle?: string;
  MatchingServiceIntroduceMainItemDesc?: string;
}

export interface ImatchingServiceIntroduceMainStyle {
  MatchingServiceIntroduceMainBannerTitle?: CSSObject;
  MatchingServiceIntroduceMainBannerDesc?: CSSObject;
  MatchingServiceIntroduceMainItemTitle?: CSSObject;
  MatchingServiceIntroduceMainItemDesc?: CSSObject;
}

interface ImatchingServiceIntroduceMain {
  content?: ImatchingServiceIntroduceMainContent | null;
  style?: ImatchingServiceIntroduceMainStyle | null;
  isEditable?: boolean;
  onChangeContent: (key: string, value: string) => void;
  onChangeStyle: (key: string, value: CSSObject) => void;
}

const banner_title_ = "Headline H1";
const banner_desc_ =
  "lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non";

const item_title_ = "Headline H1";
const item_desc_ =
  "lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non";

const circle_text_ = "lorem ipsum";
const input_text_ = "lorem ipsum";
const input_button_ = "lorem ipsum";

export const matching_service_introduce_main_banner_title_css_ = css`
  color: #486284;
  text-align: center;

  /* H1 */
  font-family: Inter;
  font-size: 96px;
  font-style: normal;
  font-weight: 900;
  line-height: 150%; /* 144px */
`;

export const matching_service_introduce_main_banner_desc_css_ = css`
  color: #486284;
  text-align: center;

  /* h2_middle */
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const matching_service_introduce_main_item_title_css_ = css`
  color: #486284;
  text-align: center;
  font-family: Pretendard;
  font-size: 60px;
  font-style: normal;
  font-weight: 700;
  line-height: 80px; /* 133.333% */
`;

export const matching_service_introduce_main_item_desc_css_ = css`
  color: #486284;
  text-align: center;

  /* h2_middle */
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

function MatchingServiceIntroduceMainItem(prop: ImatchingServiceIntroduceMain) {
  const { content, style, isEditable, onChangeContent, onChangeStyle } = prop;

  return (
    <div css={item_container}>
      {isEditable ? (
        <EditableText
          text={content?.MatchingServiceIntroduceMainItemTitle as string}
          className="MatchingServiceIntroduceMainItemTitle"
          isTextArea={false}
          defaultCss={style?.MatchingServiceIntroduceMainItemTitle as CSSObject}
          onChangeText={(key, value) => onChangeContent(key, value)}
          onChangeCss={(key, value) => onChangeStyle(key, value)}
        />
      ) : (
        <p css={style?.MatchingServiceIntroduceMainItemTitle}>
          {content?.MatchingServiceIntroduceMainItemTitle}
        </p>
      )}
      {isEditable ? (
        <EditableText
          text={content?.MatchingServiceIntroduceMainItemDesc as string}
          className="MatchingServiceIntroduceMainItemDesc"
          isTextArea={false}
          defaultCss={style?.MatchingServiceIntroduceMainItemDesc as CSSObject}
          onChangeText={(key, value) => onChangeContent(key, value)}
          onChangeCss={(key, value) => onChangeStyle(key, value)}
        />
      ) : (
        <p css={style?.MatchingServiceIntroduceMainItemDesc}>
          {content?.MatchingServiceIntroduceMainItemDesc}
        </p>
      )}
      <div css={circle_wrap}>
        <div css={circle_container}>
          <span css={circle(false)}></span>
          <p css={circle_text}>{circle_text_}</p>
        </div>
        <div css={circle_container}>
          <span css={circle(true)}></span>
          <p css={circle_text}>{circle_text_}</p>
        </div>
      </div>
    </div>
  );
}

export default function MatchingServiceIntroduceMain(
  prop: ImatchingServiceIntroduceMain
) {
  const { content, style, isEditable, onChangeContent, onChangeStyle } = prop;

  const count = 3;

  const initialContent = {
    MatchingServiceIntroduceMainBannerTitle:
      content?.MatchingServiceIntroduceMainBannerTitle || banner_title_,
    MatchingServiceIntroduceMainBannerDesc:
      content?.MatchingServiceIntroduceMainBannerDesc || banner_desc_,
    MatchingServiceIntroduceMainItemTitle:
      content?.MatchingServiceIntroduceMainItemTitle || item_title_,
    MatchingServiceIntroduceMainItemDesc:
      content?.MatchingServiceIntroduceMainItemDesc || item_desc_,
  };

  const initialStyle = {
    MatchingServiceIntroduceMainBannerTitle:
      style?.MatchingServiceIntroduceMainBannerTitle ||
      matching_service_introduce_main_banner_title_css_,
    MatchingServiceIntroduceMainBannerDesc:
      style?.MatchingServiceIntroduceMainBannerDesc ||
      matching_service_introduce_main_banner_desc_css_,
    MatchingServiceIntroduceMainItemTitle:
      style?.MatchingServiceIntroduceMainItemTitle ||
      matching_service_introduce_main_item_title_css_,
    MatchingServiceIntroduceMainItemDesc:
      style?.MatchingServiceIntroduceMainItemDesc ||
      matching_service_introduce_main_item_desc_css_,
  };

  const [editableContent, setEditableContent] = useState<any>(null);
  const [editableStyle, setEditableStyle] = useState<any>(null);

  useEffect(() => {
    if (content) {
      if (content?.MatchingServiceIntroduceMainBannerTitle) {
        setEditableContent({
          ...initialContent,
          MatchingServiceIntroduceMainBannerTitle:
            content.MatchingServiceIntroduceMainBannerTitle,
        });
      } else {
        setEditableContent({
          ...initialContent,
          MatchingServiceIntroduceMainBannerTitle:
            initialContent.MatchingServiceIntroduceMainBannerTitle,
        });
      }

      if (content?.MatchingServiceIntroduceMainBannerDesc) {
        setEditableContent({
          ...initialContent,

          MatchingServiceIntroduceMainBannerDesc:
            content.MatchingServiceIntroduceMainBannerDesc,
        });
      } else {
        setEditableContent({
          ...initialContent,
          MatchingServiceIntroduceMainBannerDesc:
            initialContent.MatchingServiceIntroduceMainBannerDesc,
        });
      }

      if (content?.MatchingServiceIntroduceMainItemTitle) {
        setEditableContent({
          ...initialContent,

          MatchingServiceIntroduceMainItemTitle:
            content.MatchingServiceIntroduceMainItemTitle,
        });
      } else {
        setEditableContent({
          ...initialContent,
          MatchingServiceIntroduceMainItemTitle:
            initialContent.MatchingServiceIntroduceMainItemTitle,
        });
      }

      if (content?.MatchingServiceIntroduceMainItemDesc) {
        setEditableContent({
          ...initialContent,

          MatchingServiceIntroduceMainItemDesc:
            content.MatchingServiceIntroduceMainItemDesc,
        });
      } else {
        setEditableContent({
          ...initialContent,
          MatchingServiceIntroduceMainItemDesc:
            initialContent.MatchingServiceIntroduceMainItemDesc,
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
    <OuterWrap padding="150px 0">
      <div css={container}>
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
          <div css={banner_text_container}>
            {isEditable ? (
              <EditableText
                text={editableContent?.MatchingServiceIntroduceMainBannerTitle}
                defaultCss={
                  editableStyle?.MatchingServiceIntroduceMainBannerTitle
                }
                isTextArea={false}
                className="MatchingServiceIntroduceMainBannerTitle"
                onChangeText={(key, value) => handleEditContent(key, value)}
                onChangeCss={(key, value) => handleEditStyle(key, value)}
              />
            ) : (
              <p css={editableStyle.MatchingServiceIntroduceMainBannerTitle}>
                {editableContent?.MatchingServiceIntroduceMainBannerTitle}
              </p>
            )}
            {isEditable ? (
              <EditableText
                text={editableContent?.MatchingServiceIntroduceMainBannerDesc}
                defaultCss={
                  editableStyle?.MatchingServiceIntroduceMainBannerDesc
                }
                isTextArea={true}
                className="MatchingServiceIntroduceMainBannerDesc"
                onChangeText={(key, value) => handleEditContent(key, value)}
                onChangeCss={(key, value) => handleEditStyle(key, value)}
              />
            ) : (
              <p css={editableStyle.MatchingServiceIntroduceMainBannerTitle}>
                {editableContent?.MatchingServiceIntroduceMainBannerTitle}
              </p>
            )}
            {isEditable ? (
              <EditableText
                text={editableContent?.MatchingServiceIntroduceMainBannerDesc}
                defaultCss={
                  editableStyle?.MatchingServiceIntroduceMainBannerDesc
                }
                isTextArea={true}
                className="MatchingServiceIntroduceMainBannerDesc"
                onChangeText={(key, value) => handleEditContent(key, value)}
                onChangeCss={(key, value) => handleEditStyle(key, value)}
              />
            ) : (
              <p css={editableStyle.MatchingServiceIntroduceMainBannerTitle}>
                {editableContent?.MatchingServiceIntroduceMainBannerTitle}
              </p>
            )}
            {isEditable ? (
              <EditableText
                text={editableContent?.MatchingServiceIntroduceMainBannerDesc}
                defaultCss={
                  editableStyle?.MatchingServiceIntroduceMainBannerDesc
                }
                isTextArea={true}
                className="MatchingServiceIntroduceMainBannerDesc"
                onChangeText={(key, value) => handleEditContent(key, value)}
                onChangeCss={(key, value) => handleEditStyle(key, value)}
              />
            ) : (
              <p css={editableStyle.MatchingServiceIntroduceMainBannerTitle}>
                {editableContent?.MatchingServiceIntroduceMainBannerTitle}
              </p>
            )}
          </div>
        </div>
        <div css={item_wrap}>
          {Array.from({ length: count }, (_, index) => (
            <MatchingServiceIntroduceMainItem
              key={index}
              content={editableContent}
              style={editableStyle}
              isEditable={isEditable}
              onChangeContent={handleEditContent}
              onChangeStyle={handleEditStyle}
            />
          ))}
        </div>
        <div css={input_wrap}>
          <div css={input_container}>
            <p css={input_text}>
              {input_text_}
              <span css={high_light}>*</span>
            </p>
            <div css={input_box_container}>
              <div css={input_box("252px")}>
                <p css={input_text}>{input_text_}</p>
              </div>
              <div css={input_box("354px")}>
                <p css={input_text}>{input_text_}</p>
              </div>
            </div>
            <div css={input_checkbox_container}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="14"
                viewBox="0 0 15 14"
                fill="none"
              >
                <path
                  d="M1 2C1 1.17157 1.67157 0.5 2.5 0.5H12.5C13.3284 0.5 14 1.17157 14 2V12C14 12.8284 13.3284 13.5 12.5 13.5H2.5C1.67157 13.5 1 12.8284 1 12V2Z"
                  stroke="#B8B8B8"
                />
                <path d="M3.5 6.5L6.5 9.5L12 4" stroke="black" />
              </svg>
              <p css={input_checkbox_label}>{input_text_}</p>
            </div>
          </div>
          <p css={input_button}>{input_button_}</p>
        </div>
      </div>
    </OuterWrap>
  );
}

const container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 150px;
`;

const banner_container = css`
  position: relative;
  width: 100%;
  max-width: 1500px;
`;

const banner_text_container = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
`;

const item_wrap = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
`;

const item_container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  padding-bottom: 72px;
  border-bottom: 1px solid #d9d9d9;
`;

const circle_wrap = css`
  margin-top: 30px;
  display: flex;
  gap: 64px;
`;

const circle_container = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const circle = (isSelected: boolean) => css`
  display: block;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 25px solid ${isSelected ? "#9cb0c9" : "#EFF2F6"};
`;

const circle_text = css`
  color: #486284;
  text-align: center;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 80px; /* 333.333% */
`;

const input_wrap = css`
  display: flex;
  flex-direction: column;
  gap: 60px;
  align-items: center;
  justify-content: center;
`;

const input_container = css`
  display: flex;
  gap: 70px;
  flex-wrap: wrap;
  align-items: center;

  padding: 36px 130px;
  background: #f8f8f8;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

const input_box_container = css`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

const input_box = (width: string) => css`
  display: flex;
  align-items: center;
  width: ${width};
  height: 56px;
  flex-shrink: 0;
  padding: 0 20px;

  border: 1px solid #ddd;
  background: #fff;
`;

const input_text = css`
  color: #222;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px; /* 150% */
  letter-spacing: -0.4px;
`;

const high_light = css`
  color: #ff3a3a;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: -0.4px;
`;

const input_checkbox_container = css`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const input_checkbox_label = css`
  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 55px; /* 392.857% */
  letter-spacing: -0.14px;
  text-transform: lowercase;
`;

const input_button = css`
  padding: 16px 114px;
  flex-shrink: 0;

  border-radius: 35px;
  border: 2px solid #9cb0c9;

  color: #486284;
  text-align: center;

  /* h2_middle */
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
