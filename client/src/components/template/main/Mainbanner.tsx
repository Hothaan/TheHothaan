/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { OuterWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import TemplateButton from "../commonComponent/TemplateButton";
import EditableText from "@components/service/editableText/EditableText";
import { CSSProperties } from "react";

export interface ImainBanner {
  isEditable?: boolean;
  title: string;
  desc: string;
}

export default function Mainbanner(prop: ImainBanner) {
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
              text={title}
              isTextArea={false}
              defaultCss={pass_h1}
            />
          ) : (
            <p css={pass_h1}>{title}</p>
          )}
          {isEditable ? (
            <EditableText
              text={desc}
              isTextArea={true}
              defaultCss={pass_desc}
            />
          ) : (
            <p css={pass_desc}>{desc}</p>
          )}

          <TemplateButton type="default" text="button" />
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
  padding: 212px 132px;
  left: 0;
  top: 0;

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
`;

const pass_h1: Record<string, string> = {
  marginBottom: "30px",
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

const desc_style = css`
  word-break: keep-all;
  color: #486284;
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 80px;
  max-width: 676px;

  display: -webkit-box; /* Flex 기반 레이아웃 */
  -webkit-box-orient: vertical; /* 박스를 수직 방향으로 정렬 */
  overflow: hidden; /* 넘치는 텍스트 숨김 */
  text-overflow: ellipsis; /* 말줄임표 적용 */
  height: 100px;
  -webkit-line-clamp: 2; /* 보여줄 줄 수 */
`;

const pass_desc: Record<string, string> = {
  wordBreak: "keep-all",
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",
  marginBottom: "80px",
  maxWidth: "676px",

  display: "-webkit-box",
  "-webkit-box-orient": "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  height: "100px",
  "-webkit-line-clamp": "2",
};
