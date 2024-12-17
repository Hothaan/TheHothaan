/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import ResponsiveContainer from "@components/common/ui/Container/ResponsiveContainer";
import ExampleItem from "./ExampleItem";
import Title from "./Title";
import { IexampleItem } from "./ExampleItem";

import { ReactComponent as MarketingPlan } from "@svgs/estimate/marketingPlan.svg";
import { ReactComponent as DesignGuide } from "@svgs/estimate/designGuide.svg";
import { ReactComponent as ServicePlan } from "@svgs/estimate/servicePlan.svg";
import { ReactComponent as ProductPlan } from "@svgs/estimate/productPlan.svg";
import { ReactComponent as Uiux1 } from "@svgs/estimate/uiux1.svg";
import { ReactComponent as Uiux2 } from "@svgs/estimate/uiux2.svg";
import { ReactComponent as Uiux3 } from "@svgs/estimate/uiux3.svg";
import { useState } from "react";

export default function BestExample() {
  const [selectedDesign, setSelectedDesign] = useState("");
  const [selectedEstimate, setSelectedEstimate] = useState("");

  function handleSelectedDesign(selectedDesign: string) {
    setSelectedDesign(selectedDesign);
  }

  function handleEstimate(selectedEstimate: string) {
    setSelectedEstimate(selectedEstimate);
  }

  const estimateExample: IexampleItem[] = [
    {
      icon: <ServicePlan />,
      title: "서비스기획",
      isSelected: selectedEstimate === "서비스기획",
      onClick: () => {
        handleEstimate("서비스기획");
      },
    },
    {
      icon: <MarketingPlan />,
      title: "마테킹기획",
      isSelected: selectedEstimate === "마테킹기획",
      onClick: () => {
        handleEstimate("마테킹기획");
      },
    },
    {
      icon: <Uiux1 />,
      title: "UI/UX1",
      isSelected: selectedEstimate === "UI/UX1",
      onClick: () => {
        handleEstimate("UI/UX1");
      },
    },
    {
      icon: <ProductPlan />,
      title: "상품기획",
      isSelected: selectedEstimate === "상품기획",
      onClick: () => {
        handleEstimate("상품기획");
      },
    },
  ];

  const designExample: IexampleItem[] = [
    {
      icon: <DesignGuide />,
      title: "디자인가이드",
      isSelected: selectedDesign === "디자인가이드",
      onClick: () => {
        handleSelectedDesign("디자인가이드");
      },
    },
    {
      icon: <ServicePlan />,
      title: "서비스기획",
      isSelected: selectedDesign === "서비스기획",
      onClick: () => {
        handleSelectedDesign("서비스기획");
      },
    },
    {
      icon: <Uiux2 />,
      title: "UI/UX2",
      isSelected: selectedDesign === "UI/UX2",
      onClick: () => {
        handleSelectedDesign("UI/UX2");
      },
    },
    {
      icon: <Uiux3 />,
      title: "UI/UX3",
      isSelected: selectedDesign === "UI/UX3",
      onClick: () => {
        handleSelectedDesign("UI/UX3");
      },
    },
  ];

  return (
    <ResponsiveContainer>
      <div css={container}>
        <div css={inner_container}>
          <Title title="견적요청 best" />
          <div css={item_container}>
            {estimateExample.map((item, idx) => (
              <ExampleItem {...item} key={idx} />
            ))}
          </div>
        </div>
        <div css={inner_container}>
          <Title title="디자인분야 best" />
          <div css={item_container}>
            {designExample.map((item, idx) => (
              <ExampleItem {...item} key={idx} />
            ))}
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  );
}

const container = css`
  display: flex;
  width: 100%;
  padding: 100px 0px;
  flex-direction: column;
  align-items: flex-start;
  gap: 80px;
`;

const inner_container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  align-self: stretch;
`;

const item_container = css`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 30px;
`;
