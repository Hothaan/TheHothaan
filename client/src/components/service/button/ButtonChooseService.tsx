/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { TserviceDataKey } from "@data/service/serviceData";
import { ReactComponent as ShoppingMall } from "@svgs/service/shoppingMall.svg";
import { ReactComponent as CommunitySns } from "@svgs/service/communitySns.svg";
import { ReactComponent as IntermediaryMatch } from "@svgs/service/intermediaryMatch.svg";
import { ReactComponent as HomepageBoard } from "@svgs/service/homepageBoard.svg";
import { ReactComponent as LandingIntroduce } from "@svgs/service/landingIntroduce.svg";

export interface IbuttonChooseService {
  isSelected: boolean;
  service: Tservice;
  onClick?: () => void;
}

export default function ButtonChooseService(props: IbuttonChooseService) {
  const { isSelected, service, onClick } = props;

  function makeTitle(service: TserviceDataKey) {
    switch (service) {
      case "shoppingMall":
        return "쇼핑몰";
      case "communitySns":
        return "커뮤니티‧sns";
      case "intermediaryMatch":
        return "중개‧매칭";
      case "homepageBoard":
        return "홈페이지‧게시판";
      case "landingIntroduce":
        return "랜딩‧소개";
      default:
        return "";
    }
  }

  function makeDesc(service: TserviceDataKey) {
    switch (service) {
      case "shoppingMall":
        return "상품을 등록하고 판매해요";
      case "communitySns":
        return "게시판을 통해 소통해요";
      case "intermediaryMatch":
        return "플랫폼을 제작해요";
      case "homepageBoard":
        return "회사를 소개해요";
      case "landingIntroduce":
        return "제품을 소개해요";
      default:
        return "";
    }
  }

  function makeIcon(service: TserviceDataKey) {
    switch (service) {
      case "shoppingMall":
        return <ShoppingMall />;
      case "communitySns":
        return <CommunitySns />;
      case "intermediaryMatch":
        return <IntermediaryMatch />;
      case "homepageBoard":
        return <HomepageBoard />;
      case "landingIntroduce":
        return <LandingIntroduce />;
      default:
        return "";
    }
  }

  return (
    <button
      css={[choose_device, choose_device_color(isSelected)]}
      onClick={onClick}
    >
      {makeIcon(service)}
      <p css={title}>{makeTitle(service)}</p>
      <p css={desc}>{makeDesc(service)}</p>
    </button>
  );
}

const choose_device_color = (isSelected: boolean) => {
  if (isSelected) {
    return css`
      border-radius: 10px;
      border: 2px solid var(--Linear, #56c0fe);
      background: var(--FFF, #fff);
      &:before {
        background: linear-gradient(to right, #56c0fe, #6d0ee6);
      }
    `;
  } else {
    return css`
      background: var(--F6F8FF, #f6f8ff);
      &:before {
        background: linear-gradient(to right, #f6f8ff, #f6f8ff);
      }
    `;
  }
};

const choose_device = css`
  position: relative;
  display: flex;
  width: 400px;
  height: 219px;
  padding: 30px;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  border-radius: 10px;
  border: 2px solid transparent;

  transition: 0.3s ease;

  &:hover {
    background: var(--EEF7FD, #eef7fd);
  }

  &:before {
    content: "";
    position: absolute;
    inset: -2px;
    border-radius: 10px;
    padding: 2px;
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    pointer-events: none;
  }
`;

const title = css`
  color: var(--383838, #383838);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const desc = css`
  color: var(--747474, #747474);
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
