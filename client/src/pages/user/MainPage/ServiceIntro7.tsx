/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import MainPageSectionContainer from "./MainPageSectionContainer";
import { Title } from "./Title";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

interface IserviceIntro7Card {
  image: string;
}

function ServiceIntro7Card(prop: IserviceIntro7Card) {
  const { image } = prop;

  const card_wrap = css`
    border-radius: 20px;
    border: 1px solid var(--DEDEDE, #dedede);
    position: relative;
  `;
  const image_style = css`
    border-radius: 20px;
    overflow: hidden;
  `;

  return (
    <div css={card_wrap}>
      <img
        css={image_style}
        src={`/assets/images/serviceIntro7/${image}.png`}
        alt={image}
      />
    </div>
  );
}

export default function ServiceIntro7() {
  const cardDatas: IserviceIntro7Card[] = [
    { image: "card1" },
    { image: "card1" },
    { image: "card1" },
    { image: "card1" },
    { image: "card1" },
    { image: "card1" },
    { image: "card1" },
    { image: "card1" },
    { image: "card1" },
    { image: "card1" },
    { image: "card1" },
    { image: "card1" },
  ];
  return (
    <MainPageSectionContainer bgColor="#F6F8FF">
      <div css={title_container}>
        <Title
          title="사전 구축된 1,500개 이상의 템플릿"
          highLight="템플릿"
          color="black"
        />
      </div>
      <div css={card_slide_wrap}>
        <div css={card_container}>
          <Swiper
            loop={true}
            slidesPerView={7}
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, FreeMode]}
            className="mySwiper"
          >
            {cardDatas.map((item, idx) => (
              <SwiperSlide key={idx}>
                <ServiceIntro7Card {...item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div css={card_container}>
          <Swiper
            loop={true}
            slidesPerView={7}
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            dir="rtl"
            modules={[Autoplay]}
            className="mySwiper"
          >
            {cardDatas.map((item, idx) => (
              <SwiperSlide key={idx}>
                <ServiceIntro7Card {...item} />
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
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const card_container = css`
  width: 100vw;
`;
