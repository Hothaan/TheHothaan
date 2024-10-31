/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { ReactComponent as Prev } from "@svgs/arrowLeft.svg";
import { ReactComponent as Next } from "@svgs/arrowRight.svg";
import EditableText from "../editableText/EditableText";

interface ItemplateBox {
  children?: React.ReactNode;
}

type TslideBtnColor = "white" | "gray";

export default function TemplateSlide({ children }: ItemplateBox) {
  const templateBoxData = [
    { title: "메인" },
    { title: "상품" },
    { title: "고객센터" },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  function handleNext(): void {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % templateBoxData.length);
  }

  function handlePrev(): void {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? templateBoxData.length - 1
        : (prevIndex - 1) % templateBoxData.length
    );
  }

  function goToCurrentIndex(e: React.MouseEvent<HTMLDivElement>): void {
    const idx = e.currentTarget.dataset.idx;
    if (idx) {
      setCurrentIndex(parseInt(idx));
    }
  }

  return (
    <div css={container}>
      <div css={slide_container}>
        <div css={slide_item_container(currentIndex)}>
          {templateBoxData.map((data, index) => (
            <div
              key={index}
              css={[wrap(index)]}
              onClick={goToCurrentIndex}
              data-idx={index}
            >
              <p css={title_style}>{data.title || "제목"}</p>
              <div css={box}>{children}</div>
            </div>
          ))}
        </div>
        <div css={button_container}>
          <button
            css={[
              navButton(
                currentIndex === templateBoxData.length - 1 ? true : false
              ),
              next,
              color("white"),
            ]}
            onClick={handleNext}
          >
            <Next />
          </button>
          <button
            css={[
              navButton(currentIndex === 0 ? true : false),
              prev,
              color("white"),
            ]}
            onClick={handlePrev}
          >
            <Prev />
          </button>
        </div>
      </div>
    </div>
  );
}

const container = css`
  position: relative;
`;

const slide_container = css`
  width: 100%;
  // overflow: hidden;
  height: 800px;
  position: relative;
`;

const slide_item_container = (currentIndex: number) => css`
  width: 100%;
  max-width: 1000px;
  position: absolute;
  left: calc(
    ${currentIndex * -100}% - ${currentIndex * 50}px +
      ${(currentIndex + 1) * 200}px + ${currentIndex * 200}px
  );
  top: 0;
  transition: left 0.6s ease-out;
`;

const wrap = (index: number) => css`
  cursor: pointer;
  position: absolute;
  top: 0;
  left: calc(${index * 100}% + ${index * 50}px);
  min-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const title_style = css`
  width: 100%;
  max-width: 1000px;
  text-align: left;
  margin-bottom: 20px;
  color: var(--383838, #383838);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const box = css`
  width: 100%;
  max-width: 1000px;
  height: 100%;
  min-height: 800px;
  border-radius: 20px;
  border: 1px solid var(--DEDEDE, #dedede);
  background: lightgray 50% / cover no-repeat, #f6f6f6;
  padding: 30px;
`;

const button_container = css`
  width: 100%;
  max-width: 1000px;
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
`;

const navButton = (disabled: boolean) => css`
  display: inline-flex;
  padding: 10px;
  align-items: center;
  gap: 10px;

  border-radius: 70px;
  border: 1px solid #dedede;
  background: var(--FFF, #fff);
  box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.05);

  position: absolute;
  top: 0;

  cursor: ${disabled ? "default" : "pointer"};
  * {
    opacity: ${disabled ? 0.5 : 1};
  }
`;

const color = (color: TslideBtnColor) => css`
  background-color: ${color === "white" ? "#fff" : "#383838"};
  svg * {
    fill: ${color === "white" ? "#747474" : "#DEDEDE"};
  }
`;

const prev = css`
  left: 0;
  transform: translateX(-50%);
`;

const next = css`
  right: 0;
  transform: translateX(50%);
`;
