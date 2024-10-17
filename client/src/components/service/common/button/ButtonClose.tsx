/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ReactComponent as Close } from "@svgs/close.svg";

export default function ButtonClose(prop: IbuttonClose) {
  const { deleteFunction } = prop;
  return (
    <button type="button" css={close_button} onClick={deleteFunction}>
      <Close />
    </button>
  );
}

const close_button = css`
  position: absolute;
  top: -3px;
  right: -6px;

  display: flex;
  width: var(--L, 24px);
  height: var(--L, 24px);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 90px;
  background: var(--383838, #383838);
`;
