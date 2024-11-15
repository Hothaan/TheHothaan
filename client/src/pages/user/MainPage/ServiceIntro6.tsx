/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import MainPageSectionContainer from "./MainPageSectionContainer";
import { Title } from "./Title";

interface IserviceIntro6Card {
  title: string;
  desc: string;
  image: string;
}

function ServiceIntro6Card(prop: IserviceIntro6Card) {
  const { title, desc, image } = prop;

  const card_wrap = css`
    display: flex;
    padding: 50px;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    gap: 10px;
    width: 506px;
    height: 534px;

    border-radius: 30px;
    border: 3px solid transparent;
    position: relative;

    transition: 0.4s ease-in-out;

    &:before {
      content: "";
      position: absolute;
      inset: -2px;
      border-radius: 30px;
      padding: 3px;
      -webkit-mask: linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: destination-out;
      mask-composite: exclude;
      pointer-events: none;
    }

    &:hover {
      .fill,
      .title,
      .desc {
        display: block;
      }
      transform: translateY(-2.5%);
      &:before {
        background: linear-gradient(to right, #3b82f6, #a855f7);
      }
    }
  `;

  const fill = css`
    display: none;
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    border-radius: 30px;
    background: linear-gradient(
      to bottom,
      rgba(0, 202, 185, 0) 0%,
      rgba(0, 202, 185, 0.3) 20%,
      rgba(0, 202, 185, 0.5) 40%,
      #2d3ac3 100%
    );
  `;

  const title_style = css`
    display: none;
    position: relative;
    z-index: 1;
    color: var(--FFF, #fff);
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%; /* 36px */
  `;

  const desc_style = css`
    display: none;
    position: relative;
    z-index: 1;
    color: var(--FFF, #fff);
    font-family: Pretendard;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 25.5px */
  `;

  const image_container = (image: string) => css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(/assets/images/serviceIntro6/${image}.png);
    background-size: cover;
    background-repeat: no-repeat;
  `;

  const image_wrap = css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    border-radius: 30px;
  `;

  return (
    <div css={card_wrap}>
      <div css={image_wrap}>
        <div css={image_container(image)}></div>
      </div>

      <div css={fill} className="fill"></div>
      <p css={title_style} className="title">
        {title}
      </p>
      <p css={desc_style} className="desc">
        {desc}
      </p>
    </div>
  );
}

export default function ServiceIntro6() {
  const cardDatas: IserviceIntro6Card[] = [
    {
      title: "웹서비스 런칭 목표 시 필수로 써야 할 혁신적인 플랫폼입니다!😆",
      desc: "예전에는 기획안 작성에 너무 많은 시간을 쏟았지만, 이 플랫폼을 사용한 후로는 훨씬 빠르고 효율적으로 기획안을 만들 수 있게 되었습니다. 덕분에 더 많은 시간을 창의적인 아이디어를 발상하는 데 할애할 수 있게 되었습니다.",
      image: "card1",
    },
    {
      title: "웹서비스 런칭 목표 시 필수로 써야 할 혁신적인 플랫폼입니다!😆",
      desc: "예전에는 기획안 작성에 너무 많은 시간을 쏟았지만, 이 플랫폼을 사용한 후로는 훨씬 빠르고 효율적으로 기획안을 만들 수 있게 되었습니다. 덕분에 더 많은 시간을 창의적인 아이디어를 발상하는 데 할애할 수 있게 되었습니다.",
      image: "card2",
    },
    {
      title: "웹서비스 런칭 목표 시 필수로 써야 할 혁신적인 플랫폼입니다!😆",
      desc: "예전에는 기획안 작성에 너무 많은 시간을 쏟았지만, 이 플랫폼을 사용한 후로는 훨씬 빠르고 효율적으로 기획안을 만들 수 있게 되었습니다. 덕분에 더 많은 시간을 창의적인 아이디어를 발상하는 데 할애할 수 있게 되었습니다.",
      image: "card3",
    },
  ];
  return (
    <MainPageSectionContainer>
      <div css={title_container}>
        <Title title="플랫폼 사용 후기💡" color="black" />
      </div>
      <div css={card_container}>
        {cardDatas.map((item, idx) => (
          <ServiceIntro6Card {...item} key={idx} />
        ))}
      </div>
    </MainPageSectionContainer>
  );
}

const title_container = css`
  margin-bottom: 50px;
`;

const card_container = css`
  display: flex;
  gap: 20px;
`;
