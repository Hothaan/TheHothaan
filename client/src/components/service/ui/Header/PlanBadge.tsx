/** @jsxImportSource @emotion/react */
import { css, Theme, useTheme } from "@emotion/react";
import { ReactComponent as CrownWhite } from "@svgs/crownWhite.svg";
import { ReactComponent as CrownGradient } from "@svgs/crownGradient.svg";

export default function PlanBadge(prop: TuserInfo) {
  const { plan, term } = prop;
  const theme = useTheme();

  switch (plan) {
    case "free":
      return (
        <div css={badge_free(theme)}>
          <CrownWhite />
          <p css={[plan_text, color_white(theme)]}>Free plan</p>
        </div>
      );
    case "basic":
      return (
        <div css={badge_basic}>
          <CrownGradient />
          <p css={[plan_text, color_gradient]}>Basic plan</p>
          <span css={[badge_divider, bg_gray3]}></span>
          <p css={[term_text, color_gray]}>{term}</p>
        </div>
      );
    case "pro":
      return (
        <div css={badge_pro}>
          <CrownWhite />
          <p css={[plan_text, color_white]}>Pro plan</p>
          <span css={[badge_divider, bg_white, `opacity: 0.3`]}></span>
          <p css={[term_text, color_white]}>{term}</p>
        </div>
      );
    default:
      return (
        <div css={badge_free(theme)}>
          <CrownWhite />
          <p css={[plan_text, color_white(theme)]}>Free plan</p>
        </div>
      );
  }
}

const badge_free = (theme: Theme) => css`
  display: inline-flex;
  padding: 5px 10px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border-radius: 34px;
  background: ${theme.colors.text.dark};
`;

const badge_basic = css`
  display: inline-flex;
  padding: 5px 10px;
  justify-content: center;
  align-items: center;
  position: relative;
  gap: 5px;
  border-radius: 34px;
  background-clip: padding-box;
  border: 1px solid transparent;
  background-color: #fff;

  &:before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 30px;
    padding: 2px;
    background: linear-gradient(to right, #3b82f6, #a855f7);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    pointer-events: none;
  }
`;

const badge_pro = css`
  display: inline-flex;
  padding: 5px 10px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border-radius: 34px;
  background: var(
    --Linear,
    linear-gradient(90deg, #56c0fe -1.67%, #6d0ee6 98.33%)
  );
`;

const color_white = (theme: Theme) => css`
  color: ${theme.colors.mono.white};
`;

const color_gray = (theme: Theme) => css`
  color: ${theme.colors.mono.gray4};
`;

const color_gradient = css`
  background: var(
    --Linear,
    linear-gradient(90deg, #56c0fe -1.67%, #6d0ee6 98.33%)
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const bg_gray3 = (theme: Theme) =>
  css`
    background-color: ${theme.colors.mono.gray3};
  `;

const bg_white = (theme: Theme) => css`
  background-color: ${theme.colors.mono.white};
`;

const plan_text = css`
  font-family: "SUITE Variable", sans-serif;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const term_text = css`
  font-family: "Preahvihear", sans-serif;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const badge_divider = css`
  width: 1px;
  height: 10px;
`;
