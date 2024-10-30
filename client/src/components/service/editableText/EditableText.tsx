/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";

import { ReactComponent as UnderLine } from "@svgs/underLine.svg";
import { ReactComponent as CancleLine } from "@svgs/cancleLine.svg";
import { ReactComponent as Bold } from "@svgs/bold.svg";
import { ReactComponent as Italic } from "@svgs/italic.svg";
import { ReactComponent as TextAlignCenter } from "@svgs/textAlignCenter.svg";
import { ReactComponent as TextAlignLeft } from "@svgs/textAlignLeft.svg";
import { ReactComponent as TextAlignRight } from "@svgs/textAlignRight.svg";

type TselectableColor = "#383838" | "#000";
type TselectableFontSize =
  | "16px"
  | "18px"
  | "24px"
  | "28px"
  | "32px"
  | "36px"
  | "40px"
  | "48px";
type TselectableFontStyle = "normal" | "italic";
type TselectableTextDecoration = "underline" | "line-through" | "none";
type TselectableTextAlign = "center" | "left" | "right";
type TfontWeight = "bold" | "regular";

interface Istyles {
  color: TselectableColor;
  fontSize: TselectableFontSize;
  fontStyle: TselectableFontStyle;
  textDecoration: TselectableTextDecoration;
  textAlign: TselectableTextAlign;
  fontWeight: TfontWeight;
}

export default function EditableText() {
  const [isEditing, setIsEditing] = useState(false);
  const [textContent, setTextContent] = useState("편집 가능한 텍스트");
  const [styles, setStyles] = useState<Istyles>({
    color: "#383838",
    fontSize: "16px",
    fontStyle: "normal",
    textDecoration: "none",
    textAlign: "left",
    fontWeight: "regular",
  });

  const updateStyles = (newStyle: Partial<Istyles>) => {
    setStyles((prevStyles) => ({ ...prevStyles, ...newStyle }));
  };

  const Toolbar: React.FC = () => (
    <div css={toolbar}>
      <button onClick={() => updateStyles({ fontWeight: "bold" })}>
        <Bold />
      </button>
      <button onClick={() => updateStyles({ fontStyle: "italic" })}>
        <Italic />
      </button>
      <button onClick={() => updateStyles({ textDecoration: "line-through" })}>
        <CancleLine />
      </button>
      <button onClick={() => updateStyles({ textDecoration: "underline" })}>
        <UnderLine />
      </button>
      <button onClick={() => updateStyles({ textAlign: "left" })}>
        <TextAlignLeft />
      </button>
      <button onClick={() => updateStyles({ textAlign: "center" })}>
        <TextAlignCenter />
      </button>
      <button onClick={() => updateStyles({ textAlign: "right" })}>
        <TextAlignRight />
      </button>
    </div>
  );

  return (
    <div style={{ position: "relative" }}>
      {isEditing && <Toolbar />}
      <input
        css={css`
          color: ${styles.color};
          font-size: ${styles.fontSize};
          font-style: ${styles.fontStyle};
          text-decoration: ${styles.textDecoration};
          text-align: ${styles.textAlign};
          font-weight: ${styles.fontWeight === "bold" ? "bold" : "normal"};
          cursor: ${isEditing ? "text" : "pointer"};
          border: none;
          outline: none;
          width: 100%;
          background: transparent;
        `}
        value={textContent}
        onClick={() => setIsEditing(!isEditing)}
        onChange={(e) => setTextContent(e.target.value)}
      />
    </div>
  );
}

const toolbar = css`
  position: absolute;
  top: -24px;
  left: 0;
  transform: translate(-25%, -100%);
  display: flex;
  align-items: center;
  padding: 12px 8px;
  border-radius: 8px;
  background: var(--Neutral-Background, #fff);
  box-shadow: 0px 327px 91px 0px rgba(0, 0, 0, 0),
    0px 209px 84px 0px rgba(0, 0, 0, 0.01),
    0px 118px 71px 0px rgba(0, 0, 0, 0.05),
    0px 52px 52px 0px rgba(0, 0, 0, 0.09), 0px 13px 29px 0px rgba(0, 0, 0, 0.1);
`;
