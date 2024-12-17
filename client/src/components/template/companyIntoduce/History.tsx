/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useEffect, useState } from "react";
import { OuterWrap } from "../commonComponent/Wrap";

const desc_ =
  "lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non";

export interface IhistoryText {
  desc?: string;
}

export interface IhistoryContent {
  desc?: {
    text?: string;
    css?: CSSObject;
  };
}

interface Ihistory {
  content?: IhistoryContent | null;
  isEditable?: boolean;
  onChange?: (content: IhistoryContent) => void;
}

export const history_desc_css_ = (
  isSelected?: boolean,
  isLast?: boolean
) => css`
  position: relative;

  max-width: 600px;
  color: #486284;

  /* h2_middle */
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  padding-bottom: ${isLast ? "0px" : isSelected ? "240px" : "140px"};

  &:after {
    display: block;
    content: "";
    width: 1px;
    height: 100%;
    position: absolute;
    background-color: ${isSelected ? "#486284" : "#D6D6D6"};
    top: 20px;
    left: -34px;
  }
`;

export default function History(prop: Ihistory) {
  const { content, isEditable, onChange } = prop;

  const initial = {
    desc: {
      text: content?.desc?.text || desc_,
      css: content?.desc?.css || history_desc_css_,
    },
  };

  const [edit, setEdit] = useState(initial);

  useEffect(() => {
    if (content) {
      setEdit(initial);
    }
  }, [content]);

  function handleEdit(
    field: keyof IhistoryContent,
    updatedText: string,
    updatedCss: CSSObject
  ) {
    const updatedState = {
      ...edit,
      [field]: {
        text: updatedText,
        css: updatedCss,
      },
    };
    setEdit(updatedState);
    onChange?.(updatedState);
  }

  const count = 6;

  return (
    <OuterWrap padding="200px 0">
      <div css={container}>
        <ul css={history_list}>
          {Array.from({ length: count }, (_, index) => (
            <li css={history_item} key={index}>
              <p css={year_style}>{2021 - index}</p>
              <div css={circle_container}>
                <span css={circle(index === 0 ? true : false)}></span>
              </div>
              <p
                css={history_desc_css_(
                  index === 0 ? true : false,
                  index === count - 1 ? true : false
                )}
              >
                {content?.desc?.text || desc_}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </OuterWrap>
  );
}

const container = css`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const history_list = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const history_item = css`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
  gap: 24px;
`;

const year_style = css`
  color: #486284;
  font-family: "Kumbh Sans";
  font-size: 36px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

const circle_container = css`
  display: flex;
  align-items: center;
  height: 54px;
`;

const circle = (isSelected?: boolean) => css`
  position: relative;

  width: 20px;
  height: 20px;
  display: block;
  border: 5px solid ${isSelected ? "#486284" : "#D6D6D6"};
  background-color: #fff;
  border-radius: 50%;

  &:before {
    display: block;
    content: "";
    z-index: 1;
    width: 10px;
    height: 10px;
    position: absolute;
    border-radius: 50%;
    background-color: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
