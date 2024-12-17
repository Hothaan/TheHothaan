/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { ReactComponent as ShoppingMall } from "@svgs/service/shoppingMall.svg";
import { ReactComponent as CommunitySns } from "@svgs/service/communitySns.svg";
import { ReactComponent as IntermediaryMatch } from "@svgs/service/intermediaryMatch.svg";
import { ReactComponent as HomepageBoard } from "@svgs/service/homepageBoard.svg";
import { ReactComponent as LandingIntroduce } from "@svgs/service/landingIntroduce.svg";

export interface IbuttonChooseServiceType {
  id: number;
  name: string;
  description: string;
  isSelected: boolean;
  onClick?: () => void;
}

export default function ButtonChooseServiceType(
  props: IbuttonChooseServiceType
) {
  const { id, name, description, isSelected, onClick } = props;

  function makeIcon(id: number) {
    switch (id) {
      case 1:
        return <ShoppingMall />;
      case 2:
        return <CommunitySns />;
      case 3:
        return <IntermediaryMatch />;
      case 4:
        return <HomepageBoard />;
      case 5:
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
      {makeIcon(id)}
      <p css={title}>{name}</p>
      <p css={desc}>{description}</p>
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
