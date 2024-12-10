/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { OuterWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import EditableText from "@components/service/editableText/EditableText";

// 수정된 위치 식별자 필요
// 수정되기 전 텍스트와 수정된 후 텍스트 비교 가능해야함
// 수정되기 전 css와 수정된 후 css 비교 가능해야함
// 모달 전체에서 수정 감지해서 수정된 내용 저장
// 모달에서 저장버튼 클릭시 수정한 내용 db에 업데이트

const title_ = "Lorem ipsum dolorsit amet consectetur";
const title_className = "explore_service_title";

const button_ = "Lorem ipsum dolor";
const button_className = "explore_service_button";

const item_title_ = "Explore";
const item_title_className = "explore_service_title";

const item_button_ = "Explore";
const item_button_className = "explore_service_button";

export interface IexploreServiceText {
  title?: string;
  button?: string;
  exploreTitle?: string;
  exploreButton?: string;
}

interface IexploreService extends IexploreServiceText {
  isEditable?: boolean;
}

export default function ExploreServiceMain(prop: IexploreService) {
  const { isEditable, title, button, exploreTitle, exploreButton } = prop;

  const count = 3;

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
          <div css={text_container}>
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
            <ul css={explore_list}>
              {Array.from({ length: count }, (_, index) => (
                <li css={explore_item} key={index}>
                  <p css={explore_title} className={item_title_className}>
                    {exploreTitle || item_title_}
                  </p>
                  <p css={explore_button} className={item_button_className}>
                    {exploreButton || item_button_}
                  </p>
                </li>
              ))}
            </ul>
            <div css={button_style} className={button_className}>
              {button || button_}
            </div>
          </div>
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
  align-items: center;
  justify-content: center;
`;

const text_container = css`
  max-width: 550px;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const pass_h1: Record<string, string> = {
  marginBottom: "30px",
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "50px",
  fontStyle: "normal",
  fontWeight: "800",
  lineHeight: "normal",
  textTransform: "capitalize",
  width: "100%",
  textAlign: "center",
};

const button_style = css`
  display: flex;
  padding: 12px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 50px;
  border: 1px solid var(--Neutral-10, #486284);
  background: var(--Neutral-10, #486284);

  color: var(--Neutral-0, #fff);

  /* h2_small */
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 32px */
`;

const explore_list = css`
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  justify-content: center;

  margin-bottom: 40px;
`;

const explore_item = css`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const explore_title = css`
  color: var(--Neutral-10, #486284);

  /* body/small */
  font-family: "DM Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  letter-spacing: 0.5px;
`;

const explore_button = css`
  display: flex;
  width: 380px;
  padding: 12px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 50px;
  border: 1px solid var(--Neutral-10, #486284);
  background: #fff;

  color: var(--Neutral-10, #486284);

  /* body/small */
  font-family: "DM Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  letter-spacing: 0.5px;
`;
