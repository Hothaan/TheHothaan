/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ReactComponent as Close } from "@svgs/close.svg";

export default function ButtonClose(prop: IbuttonClose) {
  const { deleteFunction, onClick, top, right } = prop;
  return (
    <button
      type="button"
      css={close_button(top, right)}
      onClick={() => {
        if (onClick) onClick();
        if (deleteFunction) deleteFunction();
      }}
    >
      <Close />
    </button>
  );
}

const close_button = (top: string, right: string) => css`
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
  background: var(--383838, #383838);
`;
