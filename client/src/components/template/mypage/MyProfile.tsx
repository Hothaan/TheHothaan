/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { OuterWrap, InnerWrap } from "../commonComponent/Wrap";
import Title from "../commonComponent/Title";

const title_ = "My Profile";
const sub_title_ = "Headline H1";

export default function MyProfile() {
  return (
    <OuterWrap padding="260px 0">
      <InnerWrap>
        <Title
          title={title_}
          weight="bold"
          transform="capitalize"
          marginBottom={20}
        />
        <div css={container}>
          <p css={sub_title}>{sub_title_}</p>
        </div>
      </InnerWrap>
    </OuterWrap>
  );
}

const container = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const sub_title = css`
  padding: 15px 0;
  width: 100%;
  max-width: 900px;
  border-bottom: 1px solid #486284;

  color: #486284;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  text-transform: uppercase;
`;
