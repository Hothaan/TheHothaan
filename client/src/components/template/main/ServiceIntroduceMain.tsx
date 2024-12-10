/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { OuterWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import EditableText from "@components/service/editableText/EditableText";

const title_ = "Headline H1";
const title_className = "main_banner_title";

const desc_ =
  "lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non";
const desc_className = "main_banner_desc";

export interface IserviceIntroduceText {
  title?: string;
  desc?: string;
}

export interface IserviceIntroduce extends IserviceIntroduceText {
  isEditable?: boolean;
}

export default function ServiceIntroduce(prop: IserviceIntroduce) {
  const { isEditable, title, desc } = prop;

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
              text={title || title_}
              isTextArea={false}
              defaultCss={pass_h1}
              className={title_className}
            />
          ) : (
            <p css={pass_h1} className={title_className}>
              {title || title_}
            </p>
          )}
          {isEditable ? (
            <EditableText
              text={desc || desc_}
              isTextArea={true}
              defaultCss={pass_desc}
              className={desc_className}
            />
          ) : (
            <p css={pass_desc}>{desc || desc_}</p>
          )}
          {isEditable ? (
            <EditableText
              text={desc || desc_}
              isTextArea={true}
              defaultCss={pass_desc}
              className={desc_className}
            />
          ) : (
            <p css={pass_desc} className={desc_className}>
              {desc || desc_}
            </p>
          )}
          {isEditable ? (
            <EditableText
              text={desc || desc_}
              isTextArea={true}
              defaultCss={pass_desc}
              className={desc_className}
            />
          ) : (
            <p css={pass_desc} className={desc_className}>
              {desc || desc_}
            </p>
          )}
          {isEditable ? (
            <EditableText
              text={desc || desc_}
              isTextArea={true}
              defaultCss={pass_desc_line}
              className={desc_className}
            />
          ) : (
            <p css={pass_desc_line} className={desc_className}>
              {desc || desc_}
            </p>
          )}
          {isEditable ? (
            <EditableText
              text={desc || desc_}
              isTextArea={true}
              defaultCss={pass_desc_line}
              className={desc_className}
            />
          ) : (
            <p css={pass_desc_line} className={desc_className}>
              {desc || desc_}
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

const container = css`
  position: absolute;

  width: 100%;
  height: 100%;
  padding: 80px 70px;
  left: 0;
  top: 0;

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 40px;
`;

const pass_h1: Record<string, string> = {
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "96px",
  fontStyle: "normal",
  fontWeight: "900",
  lineHeight: "150%",
  textTransform: "capitalize",
  width: "100%",
  overflow: "hidden" /* 넘치는 텍스트 숨김 */,
  textOverflow: "ellipsis" /* 말줄임표 적용 */,
  whiteSpace: "nowrap" /* 텍스트를 한 줄로 처리 */,
};

const pass_desc: Record<string, string> = {
  wordBreak: "keep-all",
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",
  maxWidth: "676px",

  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  WebkitLineClamp: "2",
};

const pass_desc_line: Record<string, string> = {
  wordBreak: "keep-all",
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",

  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  WebkitLineClamp: "2",
};
