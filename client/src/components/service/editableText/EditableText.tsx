/** @jsxImportSource @emotion/react */
import { css, Theme } from "@emotion/react";
import { useState } from "react";
import { ReactComponent as ArrowDown } from "@svgs/arrowDownSmall.svg";
import { ReactComponent as Bold } from "@svgs/bold.svg";
import { ReactComponent as Italic } from "@svgs/italic.svg";
import { ReactComponent as TextColor } from "@svgs/textColor.svg";
import { ReactComponent as TextAlignCenter } from "@svgs/textAlignCenter.svg";

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
type TselectableFontDecoration = "";

export default function EditableText() {
  const [isEditing, setIsEditing] = useState(false);
  const [textContent, setTextContent] = useState("편집 가능한 텍스트");
  const [styles, setStyles] = useState({
    color: "#383838",
    fontSize: "16px",
    fontStyle: "normal",
    textDecoration: "none",
    textAlign: "left",
    fontWeight: "regular",
  });
  const [style, setStyle] = useState<React.CSSProperties>({
    color: "",
    fontSize: "16px",
    fontStyle: "normal",
    textDecoration: "none",
    textAlign: "left",
  });

  const Toolbar: React.FC<{
    applyStyle: (style: React.CSSProperties) => void;
  }> = ({ applyStyle }) => (
    <div css={toolbar}>
      <button onClick={() => applyStyle({ fontWeight: "bold" })}>Bold</button>
      <button onClick={() => applyStyle({ fontStyle: "italic" })}>
        Italic
      </button>
      <button onClick={() => applyStyle({ textDecoration: "underline" })}>
        Underline
      </button>
      <button onClick={() => applyStyle({ textAlign: "left" })}>Left</button>
      <button onClick={() => applyStyle({ textAlign: "center" })}>
        Center
      </button>
      <button onClick={() => applyStyle({ textAlign: "right" })}>Right</button>
    </div>
  );

  console.log(isEditing);

  const handleStyleChange = (newStyle: React.CSSProperties) => {
    setStyle((prevStyle) => ({ ...prevStyle, ...newStyle }));
  };

  return (
    <div style={{ position: "relative" }}>
      {isEditing && <Toolbar applyStyle={handleStyleChange} />}
      <div
        contentEditable={isEditing}
        suppressContentEditableWarning
        style={{ ...style, cursor: "pointer" }}
        onClick={() => setIsEditing(!isEditing)}
        onInput={(e) => setTextContent(e.currentTarget.innerText)}
      >
        {textContent}
      </div>
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
