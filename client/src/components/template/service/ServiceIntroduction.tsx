/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Title from "../commonComponent/Title";
import { OuterWrap, InnerWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import { ReactComponent as GotoLink } from "@svgs/template/gotoLink.svg";

function ServiceIntroductionItem() {
  const item = css`
    display: flex;
    flex-direction: column;
    gap: 28px;
  `;

  const info_container = css`
    width: 280px;
    overflow: hidden;
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

  const item_title = css`
    width: 100%;
    height: 36px;

    overflow: hidden;
    color: #486284;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: Inter;
    font-size: 24px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
  `;

  const item_desc = css`
    color: #7f7f7f;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%; /* 25.6px */
  `;

  const icon = css`
    flex-shrink: 0;
  `;

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
          <p css={item_title}> lorem ipsum, quia do ddd</p>
          <p css={item_desc}>lorem ipsum</p>
        </div>
        <GotoLink css={icon} />
      </div>
    </div>
  );
}

export default function ServiceIntroduction() {
  return (
    <OuterWrap padding="160px 0">
      <InnerWrap>
        <div css={title_container}>
          <Title
            title="service Introduction"
            transform="capitalize"
            marginBottom={20}
          />
          <p css={title_desc}>lorem ipsum, quia dolorem ipsum, quia do</p>
        </div>
        <div css={item_container}>
          <ServiceIntroductionItem />
          <ServiceIntroductionItem />
          <ServiceIntroductionItem />
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