/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ReactComponent as Pc } from "@svgs/service/pc.svg";
import { ReactComponent as Tablet } from "@svgs/service/tablet.svg";
import { ReactComponent as Mobile } from "@svgs/service/mobile.svg";

export interface IbuttonChooseDevice {
  isSelected: boolean;
  device: Tdevice;
  onClick?: () => void;
}

export default function ButtonChooseDevice(props: IbuttonChooseDevice) {
  const { isSelected, device, onClick } = props;

  function makeText(device: Tdevice) {
    switch (device) {
      case "pc":
        return "PC";
      case "tablet":
        return "테블릿(Tablet)";
      case "mobile":
        return "모바일(Mobile)";
      default:
        return "PC";
    }
  }

  function makeIcon(device: Tdevice) {
    switch (device) {
      case "pc":
        return <Pc />;
      case "tablet":
        return <Tablet />;
      case "mobile":
        return <Mobile />;
      default:
        return <Pc />;
    }
  }

  return (
    <button
      css={[choose_device, choose_device_color(isSelected)]}
      onClick={onClick}
    >
      {makeIcon(device)}
      <p>{makeText(device)}</p>
    </button>
  );
}

const choose_device_color = (isSelected: boolean) => {
  if (isSelected) {
    return css`
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
  height: 197px;
  padding: 30px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

  p {
    color: var(--383838, #383838);
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;
