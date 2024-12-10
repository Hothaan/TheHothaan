/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Title from "../commonComponent/Title";
import ImageBox from "../commonComponent/ImageBox";
import { OuterWrap, InnerWrap } from "../commonComponent/Wrap";

/* text 없는 컴포넌트 */

export default function FeedMain() {
  const count = 36;

  return (
    <OuterWrap padding="60px 0">
      <InnerWrap>
        <Title
          title="Feed"
          weight="bold"
          marginBottom={30}
          transform="capitalize"
        />
      </InnerWrap>
      <div css={image_wrap}>
        {Array.from({ length: count }, (_, index) => (
          <ImageBox
            container={{ width: "100%", height: "280px" }}
            icon={{ width: "40px", height: "40px" }}
            borderRadius="none"
            responsive={{
              maxWidth: 1000,
              container: "",
              icon: "width: 40px; height: 40px;",
            }}
            key={index}
          />
        ))}
      </div>
    </OuterWrap>
  );
}

const image_wrap = css`
  padding: 0 45px;
  width: 100%;
  flex-wrap: wrap;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 30px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
