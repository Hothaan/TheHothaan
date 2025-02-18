/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState } from "react";
import MainPageSectionContainer from "./MainPageSectionContainer";
import { Title } from "./Title";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
// import "./styles.css";

interface IServiceIntro5Card {
  ex: string;
  name: string;
  desc: string;
  icon: string;
}

function ServiceIntro5Card(prop: IServiceIntro5Card) {
  const { ex, name, desc, icon } = prop;

  const card_wrap = css`
    display: flex;
    width: 420px;
    padding: 50px;
    flex-direction: column;
    gap: 20px;
    flex-shrink: 0;

    background: rgba(255, 255, 255, 0.05);

    position: relative;
    border-radius: 30px;
    border: 3px solid transparent;

    transition: 0.4s ease-in-out;

    &:before {
      content: "";
      position: absolute;
      inset: -3px;
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
      box-shadow: 0px 0px 24px 0px rgba(17, 156, 212, 0.5);
      &:before {
        background: linear-gradient(to right, #3b82f6, #a855f7);
      }
    }
  `;

  const info_container = css`
    display: flex;
    align-items: center;
    gap: 20px;
  `;

  const icon_container = css`
    display: flex;
    width: 100px;
    height: 100px;
    justify-content: center;
    align-items: center;

    border-radius: 50%;
    background: #0d0822;
  `;

  const info_text_container = css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  `;

  const badge = css`
    display: flex;
    padding: 5px 10px;
    justify-content: center;
    align-items: center;
    background-color: #000;

    position: relative;
    border-radius: 70px;
    border: 2px solid transparent;

    &:before {
      content: "";
      position: absolute;
      inset: -2px;
      border-radius: 70px;
      padding: 2px;
      -webkit-mask: linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: destination-out;
      mask-composite: exclude;
      pointer-events: none;
      background: linear-gradient(to right, #3b82f6, #a855f7);
    }
  `;

  const badge_text = css`
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%; /* 22.5px */

    background: var(
      --Linear,
      linear-gradient(90deg, #56c0fe -1.67%, #6d0ee6 98.33%)
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  `;

  const name_style = css`
    color: var(--FFF, #fff);
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%; /* 30px */
  `;

  const desc_style = css`
    color: var(--FFF, #fff);
    font-family: Pretendard;
    font-size: 17px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 25.5px */
  `;

  return (
    <div css={card_wrap}>
      <div css={info_container}>
        <div css={icon_container}>
          <img src={`/assets/images/serviceIntro5/${icon}.png`} alt={icon} />
        </div>
        <div css={info_text_container}>
          <div css={badge}>
            <p css={badge_text}>{ex}</p>
          </div>
          <p css={name_style}>{name}</p>
        </div>
      </div>
      <p css={desc_style}>{desc}</p>
    </div>
  );
}

export default function ServiceIntro5() {
  const cardDatas: IServiceIntro5Card[] = [
    {
      ex: "스타트업 A",
      name: "김**",
      desc: "스타트업 A는 저희 플랫폼을 활용하여 새로운 서비스 론칭 기획안을 성공적으로 작성했습니다. 자동 생성 기능을 통해 시간과 비용을 절약하고, 전문적인 템플릿을 활용하여 완성도 높은 기획안을 만들 수 있었습니다. 이를 통해 투자 유치에 성공하고 사업을 빠르게 확장할 수 있었습니다.",
      icon: "card1",
    },
    {
      ex: "스타트업 A",
      name: "김**",
      desc: "스타트업 A는 저희 플랫폼을 활용하여 새로운 서비스 론칭 기획안을 성공적으로 작성했습니다. 자동 생성 기능을 통해 시간과 비용을 절약하고, 전문적인 템플릿을 활용하여 완성도 높은 기획안을 만들 수 있었습니다. 이를 통해 투자 유치에 성공하고 사업을 빠르게 확장할 수 있었습니다.",
      icon: "card2",
    },
    {
      ex: "스타트업 A",
      name: "김**",
      desc: "스타트업 A는 저희 플랫폼을 활용하여 새로운 서비스 론칭 기획안을 성공적으로 작성했습니다. 자동 생성 기능을 통해 시간과 비용을 절약하고, 전문적인 템플릿을 활용하여 완성도 높은 기획안을 만들 수 있었습니다. 이를 통해 투자 유치에 성공하고 사업을 빠르게 확장할 수 있었습니다.",
      icon: "card3",
    },
    {
      ex: "스타트업 A",
      name: "김**",
      desc: "스타트업 A는 저희 플랫폼을 활용하여 새로운 서비스 론칭 기획안을 성공적으로 작성했습니다. 자동 생성 기능을 통해 시간과 비용을 절약하고, 전문적인 템플릿을 활용하여 완성도 높은 기획안을 만들 수 있었습니다. 이를 통해 투자 유치에 성공하고 사업을 빠르게 확장할 수 있었습니다.",
      icon: "card4",
    },
    {
      ex: "스타트업 A",
      name: "김**",
      desc: "스타트업 A는 저희 플랫폼을 활용하여 새로운 서비스 론칭 기획안을 성공적으로 작성했습니다. 자동 생성 기능을 통해 시간과 비용을 절약하고, 전문적인 템플릿을 활용하여 완성도 높은 기획안을 만들 수 있었습니다. 이를 통해 투자 유치에 성공하고 사업을 빠르게 확장할 수 있었습니다.",
      icon: "card1",
    },
    {
      ex: "스타트업 A",
      name: "김**",
      desc: "스타트업 A는 저희 플랫폼을 활용하여 새로운 서비스 론칭 기획안을 성공적으로 작성했습니다. 자동 생성 기능을 통해 시간과 비용을 절약하고, 전문적인 템플릿을 활용하여 완성도 높은 기획안을 만들 수 있었습니다. 이를 통해 투자 유치에 성공하고 사업을 빠르게 확장할 수 있었습니다.",
      icon: "card2",
    },
    {
      ex: "스타트업 A",
      name: "김**",
      desc: "스타트업 A는 저희 플랫폼을 활용하여 새로운 서비스 론칭 기획안을 성공적으로 작성했습니다. 자동 생성 기능을 통해 시간과 비용을 절약하고, 전문적인 템플릿을 활용하여 완성도 높은 기획안을 만들 수 있었습니다. 이를 통해 투자 유치에 성공하고 사업을 빠르게 확장할 수 있었습니다.",
      icon: "card3",
    },
    {
      ex: "스타트업 A",
      name: "김**",
      desc: "스타트업 A는 저희 플랫폼을 활용하여 새로운 서비스 론칭 기획안을 성공적으로 작성했습니다. 자동 생성 기능을 통해 시간과 비용을 절약하고, 전문적인 템플릿을 활용하여 완성도 높은 기획안을 만들 수 있었습니다. 이를 통해 투자 유치에 성공하고 사업을 빠르게 확장할 수 있었습니다.",
      icon: "card4",
    },
  ];

  return (
    <MainPageSectionContainer bgColor="#120C30">
      <div css={title_container}>
        <Title title="고객사례🙌🏻" color="white" />
      </div>
      <div css={card_slide_wrap}>
        <div css={card_container}>
          <Swiper
            slidesPerView={4.2}
            spaceBetween={0}
            centeredSlides={true}
            modules={[Autoplay]}
            className="mySwiper"
            autoplay={{
              delay: 1000,
            }}
          >
            {cardDatas.map((item, idx) => (
              <SwiperSlide key={idx}>
                <ServiceIntro5Card {...item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </MainPageSectionContainer>
  );
}

const title_container = css`
  margin-bottom: 50px;
`;

const card_slide_wrap = css`
  position: relative;
  width: 100%;
  height: 404.5px;
`;

const card_container = css`
  position: absolute;
  width: 100vw;
  left: -360px;
  overflow: hidden;
`;
