/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";

export type TtabsData = {
  isSelected: boolean;
  text: string;
};

export interface Itabs {
  tabsData: TtabsData[];
  onClick: React.Dispatch<React.SetStateAction<string>>;
}

export default function Tabs(prop: Itabs) {
  const { tabsData, onClick } = prop;

  return (
    <div css={tabs_container_css}>
      {tabsData.map((item, idx) => (
        <p
          css={tab_css(item.isSelected)}
          key={idx}
          onClick={() => {
            onClick(item.text);
          }}
        >
          {item.text}
        </p>
      ))}
    </div>
  );
}

const tabs_container_css = css`
  display: flex;
  width: 100%;
`;
const tab_css = (isSelected: boolean) => css`
  width: 100%;
  padding: 12px;
  border-bottom: 2px solid ${isSelected ? "#119cd4" : "#747474"};
  margin-top: 30px;

  cursor: pointer;

  color: ${isSelected ? "#119cd4" : "#747474"};
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-align: center;
`;
