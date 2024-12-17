/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { ReactComponent as Image } from "@svgs/template/imageTemplate.svg";

export interface IimageBox {
  container: { width: string; height: string };
  icon: { width: string; height: string };
  borderRadius: string;
  responsive?: {
    maxWidth: number;
    container: string;
    icon: string;
  };
}

export default function ImageBox(prop: IimageBox) {
  const { container, icon, borderRadius, responsive } = prop;
  return (
    <div
      css={image_container(
        container,
        borderRadius,
        responsive?.maxWidth,
        responsive?.container
      )}
    >
      <div css={gradient}>
        <Image css={icon_style(icon, responsive?.maxWidth, responsive?.icon)} />
      </div>
    </div>
  );
}
const image_container = (
  container: { width: string; height: string },
  borderRadius: string,
  maxWidth?: number,
  responsive?: string
) => css`
  width: ${container.width};
  height: ${container.height};

  flex-shrink: 0;
  border-radius: ${borderRadius};
  background-color: #e2e8ef;
  overflow: hidden;

  @media (max-width: ${maxWidth}px) {
    ${responsive};
  }
`;

const gradient = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #9cb0c900 0%, #9cb0c933 100%);
`;

const icon_style = (
  icon: { width: string; height: string },
  maxWidth?: number,
  responsive?: string
) => css`
  width: ${icon.width};
  height: ${icon.height};

  @media (max-width: ${maxWidth}px) {
    ${responsive};
  }
`;
