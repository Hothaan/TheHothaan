/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { OuterWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";

const banner_title_ = "Headline H1";
const banner_desc_ =
  "lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non";

const item_title_ = "Headline H1";
const item_desc_ =
  "lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non";
const circle_text_ = "lorem ipsum";

function MatchingServiceIntroduceMainItem() {
  return (
    <div css={item_container}>
      <p css={item_title_css}>{item_title_}</p>
      <p css={item_desc_css}>{item_desc_}</p>
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

export default function MatchingServiceIntroduceMain() {
  const count = 3;

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
            <p css={banner_title_css}>{banner_title_}</p>
            <p css={banner_desc_css}>{banner_desc_}</p>
            <p css={banner_desc_css}>{banner_desc_}</p>
            <p css={banner_desc_css}>{banner_desc_}</p>
          </div>
        </div>
        <div css={item_wrap}>
          {Array.from({ length: count }, (_, index) => (
            <MatchingServiceIntroduceMainItem key={index} />
          ))}
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

const banner_title_css = css`
  color: #486284;
  text-align: center;

  /* H1 */
  font-family: Inter;
  font-size: 96px;
  font-style: normal;
  font-weight: 900;
  line-height: 150%; /* 144px */
`;

const banner_desc_css = css`
  color: #486284;
  text-align: center;

  /* h2_middle */
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
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

const item_title_css = css`
  color: #486284;
  text-align: center;
  font-family: Pretendard;
  font-size: 60px;
  font-style: normal;
  font-weight: 700;
  line-height: 80px; /* 133.333% */
`;

const item_desc_css = css`
  color: #486284;
  text-align: center;

  /* h2_middle */
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
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
