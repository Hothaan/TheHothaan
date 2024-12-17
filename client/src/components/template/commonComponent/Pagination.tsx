/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { ReactComponent as Arrow } from "@svgs/template/paginationArrow.svg";

export interface Ipagination {
  isOnePage?: boolean;
}

export default function Pagination(prop: Ipagination) {
  const { isOnePage } = prop;

  return (
    <div css={container}>
      <div css={icon_container}>
        <Arrow />
        <Arrow />
      </div>
      <div css={icon_container}>
        <Arrow />
      </div>
      <div css={[page_container, selected]}>1</div>
      {isOnePage ? (
        ""
      ) : (
        <>
          <div css={[page_container]}>2</div>
          <div css={[page_container]}>3</div>
          <div css={[page_container]}>4</div>
          <div css={[page_container]}>5</div>
        </>
      )}

      <div css={icon_container}>
        <Arrow css={rotate} />
        <Arrow css={rotate} />
      </div>
      <div css={icon_container}>
        <Arrow css={rotate} />
      </div>
    </div>
  );
}

const container = css`
  display: flex;
  padding: 14px 0px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
`;

const icon_container = css`
  display: flex;
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
`;

const rotate = css`
  transform: rotate(180deg);
`;

const page_container = css`
  display: flex;
  width: 30px;
  height: 30px;
  padding: 0px 11px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  color: #486284;
  text-align: center;
  font-family: Montserrat;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-transform: uppercase;
`;

const selected = css`
  border-bottom: 1px solid #486284;
`;
