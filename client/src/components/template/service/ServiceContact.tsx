/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { OuterWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import TemplateButton from "../commonComponent/TemplateButton";

const title_ = [`Lorem ipsum dolor`, <br key="1" />, `sit amet consectetur`];
const title_className = "service_contact_title";

const button_ = "Lorem ipsum dolor";
const button_className = "service_contact_button";

export interface IserviceContact {
  title?: string;
  button?: string;
}

export default function ServiceContact(prop: IserviceContact) {
  const { title, button } = prop;

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
          <p css={title_style} className={title_className}>
            {title || title_}
          </p>
          <TemplateButton
            type="round"
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

const title_style = css`
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
