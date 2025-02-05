/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import {
  TselectableColor,
  TfontFamily,
  TselectableFontSize,
  TselectableFontStyle,
  TselectableTextDecoration,
  TselectableTextAlign,
  TfontWeight,
  fontFamilyArr,
  selectableFontSizeArr,
  selectableColorArr,
} from "./types";
import { IdropDown } from "./DropDown";
import DropDown from "./DropDown";
import { IcolorPicker } from "./ColorPicker";
import ColorPicker from "./ColorPicker";
import { ReactComponent as UnderLine } from "@svgs/textEditor/underLine.svg";
import { ReactComponent as CancleLine } from "@svgs/textEditor/cancleLine.svg";
import { ReactComponent as Bold } from "@svgs/textEditor/bold.svg";
import { ReactComponent as Italic } from "@svgs/textEditor/italic.svg";
import { ReactComponent as TextAlignCenter } from "@svgs/textEditor/textAlignCenter.svg";
import { ReactComponent as TextAlignLeft } from "@svgs/textEditor/textAlignLeft.svg";
import { ReactComponent as TextAlignRight } from "@svgs/textEditor/textAlignRight.svg";

interface Istyles {
  color: TselectableColor;
  fontFamily: TfontFamily;
  fontSize: TselectableFontSize;
  fontStyle: TselectableFontStyle;
  textDecoration: TselectableTextDecoration;
  textAlign: TselectableTextAlign;
  fontWeight: TfontWeight;
}

interface IeditableText {
  id?: string;
  className?: string;
  text: string;
  isTextArea: boolean;
  defaultCss: CSSObject;
  hasBg?: boolean;
  onChangeText?: (key: string, text: string) => void;
  onChangeCss?: (key: string, css: CSSObject) => void;
}

export default function EditableText(prop: IeditableText) {
  const {
    className,
    text,
    isTextArea,
    defaultCss,
    hasBg,
    onChangeText,
    onChangeCss,
  } = prop;

  const divRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });
  const [colorPickerPosition, setColorPickerPosition] = useState("top");
  const [isEditing, setIsEditing] = useState(false);
  // const [styles, setStyles] = useState<CSSObject>({
  //   ...defaultCss,
  // });

  useEffect(() => {
    if (onChangeText && className && text) {
      onChangeText(className, text);
    }
  }, [text]);

  useEffect(() => {
    if (onChangeCss && className) {
      onChangeCss(className, defaultCss);
    }
  }, [defaultCss]);

  useLayoutEffect(() => {
    if (isEditing && divRef.current && toolbarRef.current) {
      const divRect = divRef.current.getBoundingClientRect();
      const toolbarRect = toolbarRef.current.getBoundingClientRect();

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const colorPickerWidth = 400;
      const colorPickerHeight = 350;

      const minimalPadding: number = 20;

      const needHeightSpace =
        toolbarRect.height - minimalPadding + colorPickerHeight;
      const needWidthSpace =
        toolbarRect.width - minimalPadding + colorPickerWidth;

      let top = 0;

      if (divRect.top <= needHeightSpace) {
        // 위쪽 공간이 없을 때 아래 배치
        top = minimalPadding + divRect.height;
        setColorPickerPosition("bottom");
      } else if (divRect.bottom + toolbarRect.height > viewportHeight) {
        // 아래쪽 공간이 부족할 때 위에 배치
        top = -minimalPadding - toolbarRect.height;
        setColorPickerPosition("top");
      } else {
        // 기본적으로 위에 배치
        top = -minimalPadding - toolbarRect.height;
        setColorPickerPosition("top");
      }

      let left = divRect.left;

      if (divRect.left <= needWidthSpace) {
        // 왼쪽 공간이 부족할 때 오른쪽에 배치
        left = 0;
      } else if (divRect.right + toolbarRect.width > viewportWidth) {
        // 오른쪽 공간이 부족할 때 화면 끝에 맞추기
        left = viewportWidth - toolbarRect.width - minimalPadding;
      } else {
        left = 0;
      }

      setToolbarPosition({ top, left });
    }
  }, [isEditing]);

  const updateStyles = (newStyle: Partial<Istyles>) => {
    onChangeCss?.(className as string, { ...defaultCss, ...newStyle });
  };

  const [showFontFamilyOptions, setShowFontFamilyOptions] =
    useState<boolean>(false);
  const [showFontSizeOptions, setShowFontSizeOptions] =
    useState<boolean>(false);

  const fontFamilyDropDown: IdropDown = {
    show: showFontFamilyOptions,
    isFontFamily: true,
    size: "140px",
    selected: defaultCss.fontFamily as string,
    options: fontFamilyArr,
    onClick: () => {
      setShowFontFamilyOptions(!showFontFamilyOptions);
    },
    onSelect: (e: React.MouseEvent<HTMLLIElement>) => {
      setShowFontFamilyOptions(!showFontFamilyOptions);
      updateStyles({ fontFamily: e.currentTarget.innerText as TfontFamily });
    },
  };

  const fontSizeDropDown: IdropDown = {
    show: showFontSizeOptions,
    isFontFamily: false,
    size: "111px",
    selected: defaultCss.fontSize as string,
    options: selectableFontSizeArr,
    onClick: () => {
      setShowFontSizeOptions(!showFontSizeOptions);
    },
    onSelect: (e: React.MouseEvent<HTMLLIElement>) => {
      setShowFontSizeOptions(!showFontSizeOptions);
      updateStyles({
        fontSize: e.currentTarget.innerText as TselectableFontSize,
      });
    },
  };

  function handleChangeStyle(type: string, normal: string, change: string) {
    defaultCss[type as keyof Istyles] === change
      ? updateStyles({ [type as keyof Istyles]: normal })
      : updateStyles({ [type as keyof Istyles]: change });
  }

  const [showColorPickerOptions, setShowColorPickerOptions] =
    useState<boolean>(false);

  const colorPicker: IcolorPicker = {
    show: showColorPickerOptions,
    direction: colorPickerPosition,
    selected: defaultCss.color as string,
    options: selectableColorArr,
    onClick: () => {
      setShowColorPickerOptions(!showColorPickerOptions);
    },
    onSelect: (color: string) => {
      setShowColorPickerOptions(false);
      updateStyles({ color: color as TselectableColor });
    },
  };

  const Toolbar: React.FC = () => (
    <div
      css={toolbar}
      onMouseLeave={() => {
        // setIsEditing(false);
      }}
    >
      <div css={font_container}>
        <DropDown {...fontFamilyDropDown} />
        <DropDown {...fontSizeDropDown} />
      </div>
      <div css={deco_container}>
        <button
          onClick={() => {
            handleChangeStyle("fontWeight", "regular", "bold");
          }}
          css={button}
        >
          <Bold />
        </button>
        <button
          onClick={() => {
            handleChangeStyle("fontStyle", "normal", "italic");
          }}
          css={button}
        >
          <Italic />
        </button>
        <button
          onClick={() => {
            handleChangeStyle("textDecoration", "none", "line-through");
          }}
          css={button}
        >
          <CancleLine />
        </button>
        <button
          onClick={() => {
            handleChangeStyle("textDecoration", "none", "underline");
          }}
          css={button}
        >
          <UnderLine />
        </button>
        <ColorPicker {...colorPicker} />
      </div>
      <span css={divider}></span>
      <div css={align_container}>
        <button
          onClick={() => {
            handleChangeStyle("textAlign", "left", "left");
          }}
          css={button}
        >
          <TextAlignLeft />
        </button>
        <button
          onClick={() => {
            handleChangeStyle("textAlign", "left", "center");
          }}
          css={button}
        >
          <TextAlignCenter />
        </button>
        <button
          onClick={() => {
            handleChangeStyle("textAlign", "left", "right");
          }}
          css={button}
        >
          <TextAlignRight />
        </button>
      </div>
    </div>
  );

  if (!text) {
    return <></>;
  }

  return (
    <div
      style={{ position: "relative", width: "auto", zIndex: "10" }}
      ref={divRef}
    >
      {isEditing && (
        <div
          ref={toolbarRef}
          style={{
            position: "absolute",
            top: `${toolbarPosition.top}px`,
            left: `${toolbarPosition.left}px`,
            zIndex: 100,
          }}
        >
          <Toolbar />
        </div>
      )}
      {isTextArea ? (
        <textarea
          css={[defaultCss, input_style(isEditing)]}
          value={text}
          onClick={() => setIsEditing(!isEditing)}
          onChange={(e) => onChangeText?.(className as string, e.target.value)}
          className={className}
        />
      ) : hasBg ? (
        <div css={[defaultCss, width_fit_content]}>
          <input
            type="text"
            css={[defaultCss, input_style(isEditing), width_fit_auto]}
            value={text}
            onClick={() => setIsEditing(!isEditing)}
            onChange={(e) =>
              onChangeText?.(className as string, e.target.value)
            }
            className={className}
          />
        </div>
      ) : (
        <input
          type="text"
          css={[defaultCss, input_style(isEditing)]}
          value={text}
          onClick={() => setIsEditing(!isEditing)}
          onChange={(e) => onChangeText?.(className as string, e.target.value)}
          className={className}
        />
      )}
    </div>
  );
}

const width_fit_content = css`
  display: flex;
  justify-content: center;
  width: fit-content;
  // margin: 0 auto;
`;

const width_fit_auto = css`
  flex: 0 1 auto;
`;

const input_style = (isEditing: boolean) => css`
  cursor: ${isEditing ? "text" : "pointer"};
  border: none;
  box-shadow: ${isEditing ? "0 0 0 1px #000" : "none"};
  border-radius: 0;
  outline: none;
  width: 100%;
  background-color: transparent;
  padding: 0;
`;

const font_container = css`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const deco_container = css`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const align_container = css`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const divider = css`
  width: 1px;
  height: 20px;
  background: #dedede;
`;

const button = css`
  display: flex;
  justify-content: center;
  algin-align: center;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const toolbar = css`
  z-index: 10;
  gap: 14px;
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
