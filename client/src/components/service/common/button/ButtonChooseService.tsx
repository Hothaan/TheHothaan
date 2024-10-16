/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ReactComponent as ShoppingMall } from "@svgs/shoppingMall.svg";
import { ReactComponent as CommunitySns } from "@svgs/communitySns.svg";
import { ReactComponent as DashboardStats } from "@svgs/dashboardStatus.svg";
import { ReactComponent as IntermediaryMatch } from "@svgs/intermediaryMatch.svg";
import { ReactComponent as HomepageBoard } from "@svgs/homepageBoard.svg";
import { ReactComponent as LandingIntroduce } from "@svgs/landingIntroduce.svg";

export default function ButtonChooseService(props: IbuttonChooseService) {
  const { isSelected, service } = props;

  function makeTitle(service: Tservice) {
    switch (service) {
      case "shoppingMall":
        return "쇼핑몰";
      case "communitySns":
        return "커뮤니티‧sns";
      case "dashboardStats":
        return "대시보드‧통계";
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

  function makeDesc(service: Tservice) {
    switch (service) {
      case "shoppingMall":
        return "상품을 등록하고 판매해요";
      case "communitySns":
        return "게시판을 통해 소통해요";
      case "dashboardStats":
        return "통계나 공지를 확인해요";
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

  function makeIcon(service: Tservice) {
    switch (service) {
      case "shoppingMall":
        return <ShoppingMall />;
      case "communitySns":
        return <CommunitySns />;
      case "dashboardStats":
        return <DashboardStats />;
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
    <button css={[choose_device, choose_device_color(isSelected)]}>
      {makeIcon(service)}
      <p css={title}>{makeTitle(service)}</p>
      <p css={desc}>{makeDesc(service)}</p>
    </button>
  );
}

const choose_device_color = (isSelected: boolean) => {
  if (isSelected) {
    return css`
      background: var(--EEF7FD, #eef7fd);
      &:before {
        background: linear-gradient(to right, #56c0fe, #6d0ee6);
      }
    `;
  } else {
    return css`
      background: var(--FFF, #fff);
      &:before {
        background: linear-gradient(to right, #dedede, #dedede);
      }
    `;
  }
};

const choose_device = css`
  position: relative;
  display: flex;
  width: 400px;
  padding: 30px;
  flex-direction: column;
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
  font-size: 20px;
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
