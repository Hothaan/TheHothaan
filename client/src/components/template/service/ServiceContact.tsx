/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { OuterWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import TemplateButton from "../commonComponent/TemplateButton";

export default function ServiceContact() {
  return (
    <OuterWrap padding="0">
      <div css={banner_container}>
        <ImageBox
          container={{ width: "100%", height: "740px" }}
          icon={{ width: "210px", height: "210px" }}
          borderRadius="none"
          responsive={{
            maxWidth: 1000,
            container: "",
            icon: "width: 110px; height: 108px;",
          }}
        />
        <div css={contents_container}>
          <p css={title}>
            Lorem ipsum dolor
            <br /> sit amet consectetur
          </p>
          <TemplateButton type="round" text="Lorem ipsum dolor" />
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

const contents_container = css`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 120px 112px;
  left: 0;
  top: 0;

  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  justify-content: center;
`;

const title = css`
  width: 100%;
  color: var(--Neutral-10, #486284);
  text-align: center;

  /* H2_50 */
  font-family: Inter;
  font-size: 50px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;
