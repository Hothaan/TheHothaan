/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from "@emotion/react";
import { ReactComponent as Close } from "@svgs/service/close.svg";

export interface IbuttonClose {
  top: string;
  right: string;
  color?: "gray" | "blue";
  onDelete?: () => void;
  onClick?: () => void;
}

export default function ButtonClose(prop: IbuttonClose) {
  const { onDelete, color, onClick, top, right } = prop;
  return (
    <button
      type="button"
      css={[close_button(top, right), close_button_color(color)]}
      onClick={() => {
        if (onClick) onClick();
        if (onDelete) onDelete();
      }}
    >
      <Close />
    </button>
  );
}

const close_button_color = (color?: string): SerializedStyles => {
  if (color === undefined) {
    return css`
      background: var(--383838, #383838);
    `;
  } else if (color === "gray") {
    return css`
      background: var(--383838, #383838);
    `;
  } else if (color === "blue") {
    return css`
      background: var(--119CD4, #119cd4);
    `;
  } else {
    return css`
      background: var(--383838, #383838);
    `;
  }
};

const close_button = (top: string, right: string): SerializedStyles => css`
  position: absolute;
  top: ${top};
  right: ${right};

  display: flex;
  width: var(--L, 24px);
  height: var(--L, 24px);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 90px;
`;
