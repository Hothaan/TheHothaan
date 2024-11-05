/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from "@emotion/react";
import { ReactComponent as Add } from "@svgs/close.svg";

export interface IbuttonAdd {
  top: string;
  left: string;
}

export default function ButtonAdd(prop: IbuttonAdd) {
  const { top, left } = prop;
  return (
    <button type="button" css={[add_button(top, left), add_button_color]}>
      <div css={icon}>
        <Add />
      </div>
    </button>
  );
}

const add_button_color = css`
  background: linear-gradient(to right, #56c0fe, #6d0ee6);
`;

const add_button = (top: string, left: string): SerializedStyles => css`
  position: absolute;
  top: ${top};
  left: ${left};

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

const icon = css`
  transform: rotate(45deg);
`;
