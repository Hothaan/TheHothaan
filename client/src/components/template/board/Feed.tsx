/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Title from "../commonComponent/Title";
import ImageBox from "../commonComponent/ImageBox";
import { OuterWrap, InnerWrap } from "../commonComponent/Wrap";

interface IfeedItem {
  count: number;
  title: string;
}

const item_title_ = "lorem ipsum, quia do";

function FeedItem(prop: IfeedItem) {
  const { title, count } = prop;

  const item = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
  `;

  const image_wrap = css`
    width: 100%;
    padding: 0 45px;
    flex-wrap: wrap;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 30px;

    @media (max-width: 1000px) {
      padding: 0 50px;
      grid-template-columns: repeat(3, 1fr);
    }
  `;

  const item_title = css`
    color: #486284;

    /* mall/subject */
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `;

  return (
    <div css={image_wrap}>
      {Array.from({ length: count }, (_, index) => (
        <div css={item}>
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
          <p css={item_title}>{title || item_title_}</p>
        </div>
      ))}
    </div>
  );
}

export default function Feed() {
  const data: any[] = [];
  const count = 36;

  return (
    <OuterWrap padding="60px 0">
      <Title
        title="Feed"
        weight="bold"
        marginBottom={30}
        transform="capitalize"
      />
      <FeedItem count={count} title={item_title_} />
    </OuterWrap>
  );
}
