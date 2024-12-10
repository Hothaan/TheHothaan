/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { OuterWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import TemplateButton from "../commonComponent/TemplateButton";
import EditableText from "@components/service/editableText/EditableText";

// 수정된 위치 식별자 필요
// 수정되기 전 텍스트와 수정된 후 텍스트 비교 가능해야함
// 수정되기 전 css와 수정된 후 css 비교 가능해야함
// 모달 전체에서 수정 감지해서 수정된 내용 저장
// 모달에서 저장버튼 클릭시 수정한 내용 db에 업데이트

const title_ = "Headline H1";
const title_className = "main_banner_title";

const desc_ =
  "lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non";
const desc_className = "main_banner_desc";

const button_ = "button";
const button_className = "main_banner_button";

export interface ImainBannerText {
  title?: string;
  desc?: string;
  button?: string;
}

interface ImainBanner extends ImainBannerText {
  isEditable?: boolean;
}

export default function Mainbanner(prop: ImainBanner) {
  const { isEditable, title, desc, button } = prop;

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
            <p css={pass_desc} className={title_className}>
              {desc || desc_}
            </p>
          )}
          <TemplateButton
            type="default"
            text={button || button_}
            className={button_className}
          />
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

const pass_desc: Record<string, string> = {
  wordBreak: "keep-all",
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "150%",
  marginBottom: "80px",
  maxWidth: "676px",

  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  height: "100px",
  WebkitLineClamp: "2",
};
