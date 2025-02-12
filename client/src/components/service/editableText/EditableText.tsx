/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { createPortal } from "react-dom";
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
import { ReactComponent as Expand } from "@svgs/textEditor/expand.svg";

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
  isWidth100?: boolean;
  hasBg?: boolean;
  justifyContent?: string;
  activeEditor?: string | null;
  setActiveEditor?: React.Dispatch<React.SetStateAction<string | undefined>>;
  onChangeText?: (key: string, text: string) => void;
  onChangeCss?: (key: string, css: CSSObject) => void;
}

export default function EditableText(prop: IeditableText) {
  const {
    id,
    className,
    isWidth100,
    text,
    isTextArea,
    defaultCss,
    hasBg,
    activeEditor,
    justifyContent,
    setActiveEditor,
    onChangeText,
    onChangeCss,
  } = prop;

  const divRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [toolbarPosition, setToolbarPosition] = useState<{
    top: string | number;
    left: string | number;
  }>({ top: 0, left: 0 });
  const [toolbarTransform, setToolbarTransform] = useState(``);
  const [colorPickerPosition, setColorPickerPosition] = useState("top");
  const [isEditing, setIsEditing] = useState(false);
  // const [styles, setStyles] = useState<CSSObject>({
  //   ...defaultCss,
  // });

  useEffect(() => {
    // 다른 에디터가 클릭되면 현재 에디터의 isEditing을 false로 설정
    if (activeEditor !== id) {
      setIsEditing(false);
    }
  }, [activeEditor]);

  const handleEditorClick = () => {
    if (isEditing) {
      // 현재 편집 중인 상태에서 다시 클릭하면 false로 변경
      setIsEditing(false);
      setActiveEditor?.(undefined);
    } else {
      setIsEditing(true);
      setActiveEditor?.(id);
    }
  };

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

  // useLayoutEffect(() => {
  //   if (isEditing && divRef.current && toolbarRef.current && inputRef.current) {
  //     const divRect = divRef.current.getBoundingClientRect();
  //     const InputRect = inputRef.current.getBoundingClientRect();
  //     const toolbarRect = toolbarRef.current.getBoundingClientRect();

  //     const viewportWidth = window.innerWidth;
  //     const viewportHeight = window.innerHeight;

  //     const colorPickerWidth = 400;
  //     const colorPickerHeight = 350;

  //     const minimalPadding: number = 20;

  //     const needHeightSpace = toolbarRect.height + colorPickerHeight;
  //     const needWidthSpace = toolbarRect.width + colorPickerWidth;

  //     let top = 0;

  //     if (InputRect.top <= needHeightSpace) {
  //       // 위쪽 공간이 없을 때 아래 배치
  //       top = minimalPadding + InputRect.height;
  //       setColorPickerPosition("bottom");
  //     } else if (InputRect.bottom + toolbarRect.height > viewportHeight) {
  //       // 아래쪽 공간이 부족할 때 위에 배치
  //       top = -minimalPadding - toolbarRect.height;
  //       setColorPickerPosition("top");
  //     } else {
  //       // 기본적으로 위에 배치
  //       top = -minimalPadding - toolbarRect.height;
  //       setColorPickerPosition("top");
  //     }

  //     let left: string | number = InputRect.left;
  //     let transform: string = ``;

  //     if (InputRect.left < 0) {
  //       // 부모 요소가 화면 바깥(왼쪽)으로 나가 있으면 툴바를 화면 왼쪽 끝에 맞춤
  //       left = -InputRect.left + minimalPadding;
  //     } else if (InputRect.left <= needWidthSpace) {
  //       // 왼쪽 공간이 부족할 때 오른쪽에 배치
  //       left = 0;
  //     } else if (InputRect.left + toolbarRect.width > viewportWidth) {
  //       // 오른쪽 공간이 부족할 때 화면 끝에 맞추기
  //       // left = viewportWidth - toolbarRect.width - minimalPadding;
  //       // left = viewportWidth - toolbarRect.width - toolbarRect.width;
  //       left = `100%`;
  //       // transform = `translateX(-50%)`;
  //       // transform = `translateX(${minimalPadding}px)`;
  //     } else {
  //       left = 0;
  //     }

  //     setToolbarPosition({ top, left });
  //     setToolbarTransform(transform);
  //   }
  // }, [isEditing]);

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

  const Toolbar: React.FC = () => {
    return createPortal(
      <div
        ref={toolbarRef}
        style={{
          // position: "absolute",
          position: "fixed",
          bottom: "40px",
          left: "50%",
          transform: `translateX(-50%)`,
          zIndex: 100,
          // top: `${toolbarPosition.top}px`,
          // left: `${toolbarPosition.left}px`,
          // transform: toolbarTransform,
        }}
      >
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
      </div>,
      document.body
    );
  };

  if (!text) {
    return <></>;
  }

  return (
    <div
      style={{
        position: "relative",
        width: isWidth100 ? "100%" : "auto",
        display: isWidth100 ? "flex" : "block",
        justifyContent: justifyContent || "start",
        transform: "none",
        perspective: "none",
        filter: "none",
        contain: "none",
      }}
      ref={divRef}
    >
      {isEditing && <Toolbar />}
      {isTextArea ? (
        <>
          <textarea
            // id={id}
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            css={[defaultCss, input_style(isEditing), textarea(isEditing)]}
            value={text}
            onClick={handleEditorClick}
            onChange={(e) =>
              onChangeText?.(className as string, e.target.value)
            }
            className={className}
          />
          {/* <Expand css={expand_icon(isEditing)} /> */}
        </>
      ) : hasBg ? (
        <div css={[defaultCss, width_fit_content]}>
          <input
            // id={id}
            type="text"
            ref={inputRef as React.RefObject<HTMLInputElement>}
            css={[defaultCss, input_style(isEditing), width_fit_auto]}
            value={text}
            onClick={handleEditorClick}
            onChange={(e) =>
              onChangeText?.(className as string, e.target.value)
            }
            className={className}
          />
        </div>
      ) : (
        <input
          // id={id}
          type="text"
          ref={inputRef as React.RefObject<HTMLInputElement>}
          css={[defaultCss, input_style(isEditing)]}
          value={text}
          onClick={handleEditorClick}
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

const resizeIconUrl = "/assets/images/textEditor/resize.svg";

const textarea = (isEditing: boolean) => css`
  resize: ${isEditing ? "vertical" : "none"};
`;
const expand_icon = (isEditing: boolean) => css`
  position: absolute;
  width: 16px;
  height: 16px;
  bottom: 0;
  right: 0;
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
  background: #eff2f6;
  // border: 1px solid #486284;
  box-shadow: 0px 327px 91px 0px rgba(0, 0, 0, 0),
    0px 209px 84px 0px rgba(0, 0, 0, 0.01),
    0px 118px 71px 0px rgba(0, 0, 0, 0.05),
    0px 52px 52px 0px rgba(0, 0, 0, 0.09), 0px 13px 29px 0px rgba(0, 0, 0, 0.1);
`;
