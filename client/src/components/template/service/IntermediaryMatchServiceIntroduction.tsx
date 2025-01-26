/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useEffect, useState } from "react";
import { OuterWrap, InnerWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";

const title_ = "Headline H1";
const desc_ =
  "lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non";

export interface IintermediaryMatchServiceIntroductionContent {
  IntermediaryMatchServiceIntroductionTitle?: string;
  IntermediaryMatchServiceIntroductionDesc?: string;
}

export interface IintermediaryMatchServiceIntroductionStyle {
  IntermediaryMatchServiceIntroductionTitle?: CSSObject;
  IntermediaryMatchServiceIntroductionDesc?: CSSObject;
}

interface IintermediaryMatchServiceIntroduction {
  content?: IintermediaryMatchServiceIntroductionContent | null;
  style?: IintermediaryMatchServiceIntroductionStyle | null;
  isEditable?: boolean;
  onChangeContent?: (key: string, value: string) => void;
  onChangeStyle?: (key: string, value: CSSObject) => void;
}

export const intermediary_match_service_introduction_title_css_ = css`
  color: #486284;

  /* H1 */
  font-family: Inter;
  font-size: 96px;
  font-style: normal;
  font-weight: 900;
  line-height: 150%; /* 144px */

  @media (max-width: 1000px) {
    color: #486284;
    font-family: Inter;
    font-size: 64px;
    font-style: normal;
    font-weight: 900;
    line-height: 150%; /* 96px */
  }
`;

export const intermediary_match_service_introduction_desc_css_ = css`
  color: #486284;

  /* h2_middle */
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  word-break: break-all;

  @media (max-width: 1000px) {
    color: #486284;

    /* h2_middle */
    font-family: Inter;
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export default function IntermediaryMatchServiceIntroduction(
  prop: IintermediaryMatchServiceIntroduction
) {
  const { isEditable, style, content, onChangeContent, onChangeStyle } = prop;

  console.log(content);

  const initial = {
    IntermediaryMatchServiceIntroductionTitle: {
      text: content?.IntermediaryMatchServiceIntroductionTitle || title_,
      css:
        style?.IntermediaryMatchServiceIntroductionTitle ||
        intermediary_match_service_introduction_title_css_,
    },
    IntermediaryMatchServiceIntroductionDesc: {
      text: content?.IntermediaryMatchServiceIntroductionDesc || desc_,
      css:
        style?.IntermediaryMatchServiceIntroductionDesc ||
        intermediary_match_service_introduction_desc_css_,
    },
  };

  const [edit, setEdit] = useState(initial);

  useEffect(() => {
    if (content) {
      setEdit(initial);
    }
  }, [content]);

  return (
    <OuterWrap padding="0">
      <div css={container}>
        <div css={banner_1_container}>
          <div css={text_container_absolute}>
            <p
              css={
                edit?.IntermediaryMatchServiceIntroductionTitle?.css ||
                intermediary_match_service_introduction_title_css_
              }
            >
              {edit?.IntermediaryMatchServiceIntroductionTitle?.text || title_}
            </p>
            <p
              css={
                edit?.IntermediaryMatchServiceIntroductionDesc?.css ||
                intermediary_match_service_introduction_desc_css_
              }
            >
              {edit?.IntermediaryMatchServiceIntroductionDesc?.text || desc_}
            </p>
          </div>
          <ImageBox
            container={{ width: "100%", height: "1120px" }}
            icon={{ width: "100px", height: "100px" }}
            borderRadius="0"
            responsive={{
              maxWidth: 1000,
              container: "",
              icon: "width: 80px; height: 80px;",
            }}
          />
        </div>
        <div css={banner_2_container}>
          <div css={text_wrap}>
            <div css={text_container}>
              <p
                css={
                  edit?.IntermediaryMatchServiceIntroductionTitle?.css ||
                  intermediary_match_service_introduction_title_css_
                }
              >
                {edit?.IntermediaryMatchServiceIntroductionTitle?.text ||
                  title_}
              </p>
              <p
                css={
                  edit?.IntermediaryMatchServiceIntroductionDesc?.css ||
                  intermediary_match_service_introduction_desc_css_
                }
              >
                {edit?.IntermediaryMatchServiceIntroductionDesc?.text || desc_}
              </p>
            </div>
          </div>
          <ImageBox
            container={{ width: "50%", height: "668px" }}
            icon={{ width: "80px", height: "80px" }}
            borderRadius="0"
            responsive={{
              maxWidth: 1000,
              container: "",
              icon: "width: 80px; height: 80px;",
            }}
          />
        </div>
        <div css={banner_3_container}>
          <ImageBox
            container={{ width: "50%", height: "668px" }}
            icon={{ width: "80px", height: "80px" }}
            borderRadius="0"
            responsive={{
              maxWidth: 1000,
              container: "",
              icon: "width: 80px; height: 80px;",
            }}
          />
          <div css={text_wrap}>
            <div css={text_container}>
              <p
                css={
                  edit?.IntermediaryMatchServiceIntroductionTitle?.css ||
                  intermediary_match_service_introduction_title_css_
                }
              >
                {edit?.IntermediaryMatchServiceIntroductionTitle?.text ||
                  title_}
              </p>
              <p
                css={
                  edit?.IntermediaryMatchServiceIntroductionDesc?.css ||
                  intermediary_match_service_introduction_desc_css_
                }
              >
                {edit?.IntermediaryMatchServiceIntroductionDesc?.text || desc_}
              </p>
            </div>
          </div>
        </div>
        <div css={banner_4_container}>
          <p
            css={
              edit?.IntermediaryMatchServiceIntroductionTitle?.css ||
              intermediary_match_service_introduction_title_css_
            }
          >
            {edit?.IntermediaryMatchServiceIntroductionTitle?.text || title_}
          </p>
          <p
            css={[
              text_align_center,
              edit?.IntermediaryMatchServiceIntroductionDesc?.css ||
                intermediary_match_service_introduction_desc_css_,
            ]}
          >
            {edit?.IntermediaryMatchServiceIntroductionDesc?.text || desc_}
          </p>
        </div>
      </div>
    </OuterWrap>
  );
}

const text_align_center = css`
  text-align: center;
  padding: 0 100px;
`;

const container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 100px;
  padding-bottom: 240px;
`;
const banner_1_container = css`
  position: relative;
  width: 100%;
  padding-left: 560px;

  @media (max-width: 1000px) {
    padding-left: 280px;
  }
`;

const banner_2_container = css`
  display: flex;
  position: relative;
  width: 100%;
`;

const banner_3_container = css`
  display: flex;
  position: relative;
  width: 100%;
`;
const banner_4_container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 60px;

  @media (max-width: 1000px) {
    padding: 0 180px;
  }
`;

const text_wrap = css`
  width: 50%;
`;

const text_container_absolute = css`
  position: absolute;
  top: 160px;
  left: 120px;
  width: 100%;
  max-width: 680px;
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const text_container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 60px;

  padding: 80px 114px;

  @media (max-width: 1000px) {
    padding: 80px 40px 80px 80px;
  }
`;
