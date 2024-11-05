/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ReactComponent as Image } from "@svgs/template/imageTemplate.svg";

export default function Footer() {
  return (
    <div css={wrap}>
      <div css={text_wrap}>
        <div css={text_container}>
          <div css={logo_wrap}>
            <div css={logo_container}>
              <Image css={logo} />
            </div>
            <p css={logo_text}>logo</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const wrap = css`
  width: 100%;
  max-width: 1920px;
  min-width: 1000px;
  background-color: #9cb0c9;

  padding: 55px 90px 75px;
`;

const text_wrap = css`
  display: flex;
  align-items: start;
`;

const text_container = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const logo_wrap = css`
  display: flex;
  gap: 7.5px;
  align-items: center;
`;

const logo_container = css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 27.74px;
  height: 27.74px;

  border-radius: 50%;
  background-color: #e2e8ef;
`;

const logo = css`
  width: 14px;
  height: 14px;
`;

const logo_text = css`
  color: #fff;
  font-family: Inter;
  font-size: 20.805px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  text-transform: uppercase;
`;
