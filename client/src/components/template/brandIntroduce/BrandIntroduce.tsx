/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { OuterWrap, ContentsWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import { useEffect, useState } from "react";
import EditableText from "@components/service/editableText/EditableText";

const banner_title_ = "headline h1";

const banner_desc_ =
  "lorem ipsum, quia dolor sit, amet,consectetur, adipisci velit, sed quia non";

const item_title_ = "headline h1";

const item_desc_ =
  "lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia nonlorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia nonlorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia nonlorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non";

export interface IbrandIntroduceContent {
  brandIntroduceBannerTitle?: string;
  brandIntroduceBannerDesc?: string;
  brandIntroduceItemTitle?: string;
  brandIntroduceItemDesc?: string;
}

export interface IbrandIntroduceStyle {
  brandIntroduceBannerTitle?: CSSObject;
  brandIntroduceBannerDesc?: CSSObject;
  brandIntroduceItemTitle?: CSSObject;
  brandIntroduceItemDesc?: CSSObject;
}

interface IbrandIntroduce {
  content?: IbrandIntroduceContent | null;
  style?: IbrandIntroduceStyle | null;
  isEditable?: boolean;
  onChangeContent: (key: string, value: string) => void;
  onChangeStyle: (key: string, value: CSSObject) => void;
}

export const brandIntroduce_item_title_css: CSSObject = {
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "96px",
  fontStyle: "normal",
  fontWeight: "900",
  lineHeight: "150%",
  textTransform: "capitalize",
};

export const brandIntroduce_item_desc_css: CSSObject = {
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",
};

export const brandIntroduce_banner_title_css: CSSObject = {
  marginBottom: "30px",
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "96px",
  fontStyle: "normal",
  fontWeight: "900",
  lineHeight: "150%",
  textTransform: "capitalize",
};

export const brandIntroduce_banner_desc_css: CSSObject = {
  textAlign: "center",
  wordBreak: "keep-all",
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",
  maxWidth: "676px",
};

function BrandIntroduceItem(prop: IbrandIntroduce) {
  const { content, style, isEditable, onChangeContent, onChangeStyle } = prop;

  if (
    content?.brandIntroduceItemTitle === undefined ||
    content?.brandIntroduceItemDesc === undefined ||
    style?.brandIntroduceItemTitle === undefined ||
    style?.brandIntroduceItemDesc === undefined
  ) {
    return <></>;
  }

  return (
    <div css={item_container}>
      <ImageBox
        container={{ width: "100%", height: "905px" }}
        icon={{ width: "100px", height: "100px" }}
        borderRadius="none"
        responsive={{
          maxWidth: 1000,
          container: "",
          icon: "width: 100px; height: 100px;",
        }}
      />
      {isEditable ? (
        <EditableText
          text={content.brandIntroduceItemTitle}
          className="reviewTitle"
          isTextArea={false}
          defaultCss={style.brandIntroduceItemTitle}
          onChangeText={(key, value) => onChangeContent(key, value)}
          onChangeCss={(key, value) => onChangeStyle(key, value)}
        />
      ) : (
        <p
          css={style?.brandIntroduceItemTitle || brandIntroduce_item_title_css}
        >
          {content?.brandIntroduceItemTitle || item_title_}
        </p>
      )}
      {isEditable ? (
        <EditableText
          text={content.brandIntroduceItemDesc}
          className="reviewTitle"
          isTextArea={false}
          defaultCss={style.brandIntroduceItemDesc}
          onChangeText={(key, value) => onChangeContent(key, value)}
          onChangeCss={(key, value) => onChangeStyle(key, value)}
        />
      ) : (
        <p css={style?.brandIntroduceItemDesc || brandIntroduce_item_desc_css}>
          {content?.brandIntroduceItemDesc || item_desc_}
        </p>
      )}
    </div>
  );
}

export default function BrandIntroduce(prop: IbrandIntroduce) {
  const { isEditable, content, style, onChangeContent, onChangeStyle } = prop;

  const count = 2;

  const initial = {
    brandIntroduceBannerTitle: {
      text: content?.brandIntroduceBannerTitle,
      css: style?.brandIntroduceBannerTitle,
    },
    brandIntroduceBannerDesc: {
      text: content?.brandIntroduceBannerDesc,
      css: style?.brandIntroduceBannerDesc,
    },
    brandIntroduceItemTitle: {
      text: content?.brandIntroduceItemTitle,
      css: style?.brandIntroduceItemTitle,
    },
    brandIntroduceItemDesc: {
      text: content?.brandIntroduceItemDesc,
      css: style?.brandIntroduceItemDesc,
    },
  };

  const initialContent = {
    brandIntroduceBannerTitle:
      content?.brandIntroduceBannerTitle || banner_title_,
    brandIntroduceBannerDesc: content?.brandIntroduceBannerDesc || banner_desc_,
    brandIntroduceItemTitle: content?.brandIntroduceItemTitle || item_title_,
    brandIntroduceItemDesc: content?.brandIntroduceItemDesc || item_desc_,
  };

  const initialStyle = {
    brandIntroduceBannerTitle:
      style?.brandIntroduceBannerTitle || brandIntroduce_banner_title_css,
    brandIntroduceBannerDesc:
      style?.brandIntroduceBannerDesc || brandIntroduce_banner_desc_css,
    brandIntroduceItemTitle:
      style?.brandIntroduceItemTitle || brandIntroduce_item_title_css,
    brandIntroduceItemDesc:
      style?.brandIntroduceItemDesc || brandIntroduce_item_desc_css,
  };

  const [editableContent, setEditableContent] = useState<any>(null);
  const [editableStyle, setEditableStyle] = useState<any>(null);

  useEffect(() => {
    if (content) {
      if (content?.brandIntroduceBannerTitle) {
        setEditableContent({
          ...initialContent,
          brandIntroduceBannerTitle: content.brandIntroduceBannerTitle,
        });
      } else {
        setEditableContent({
          ...initialContent,
          brandIntroduceBannerTitle: initialContent.brandIntroduceBannerTitle,
        });
      }

      if (content?.brandIntroduceBannerDesc) {
        setEditableContent({
          ...initialContent,
          brandIntroduceBannerDesc: content.brandIntroduceBannerDesc,
        });
      } else {
        setEditableContent({
          ...initialContent,
          brandIntroduceBannerDesc: initialContent.brandIntroduceBannerDesc,
        });
      }

      if (content?.brandIntroduceItemTitle) {
        setEditableContent({
          ...initialContent,
          brandIntroduceItemTitle: content.brandIntroduceItemTitle,
        });
      } else {
        setEditableContent({
          ...initialContent,
          brandIntroduceItemTitle: initialContent.brandIntroduceItemTitle,
        });
      }

      if (content?.brandIntroduceItemDesc) {
        setEditableContent({
          ...initialContent,
          brandIntroduceItemDesc: content.brandIntroduceItemDesc,
        });
      } else {
        setEditableContent({
          ...initialContent,
          brandIntroduceItemDesc: initialContent.brandIntroduceItemDesc,
        });
      }
      setEditableStyle(initialStyle);
    }
  }, [content]);

  function handleEditContent(key: string, value: string) {
    setEditableContent({
      ...editableContent,
      [key]: value,
    });
    onChangeContent?.(key, value);
  }

  function handleEditStyle(key: string, value: CSSObject) {
    setEditableStyle({
      ...editableStyle,
      [key]: value,
    });
    onChangeStyle?.(key, value);
  }

  if (!editableContent) {
    return <></>;
  }

  return (
    <OuterWrap padding="0">
      <div css={banner_container}>
        <ImageBox
          container={{ width: "100%", height: "850px" }}
          icon={{ width: "210px", height: "210px" }}
          borderRadius="none"
          responsive={{
            maxWidth: 1000,
            container: "",
            icon: "width: 110px; height: 108px;",
          }}
        />
        <div css={container}>
          <p
            css={
              editableStyle?.brandIntroduceBannerTitle ||
              brandIntroduce_banner_title_css
            }
          >
            {editableContent?.brandIntroduceBannerTitle || banner_title_}
          </p>
          <p
            css={
              editableStyle?.brandIntroduceBannerDesc ||
              brandIntroduce_banner_desc_css
            }
          >
            {editableContent?.brandIntroduceBannerDesc || banner_desc_}
          </p>
        </div>
      </div>
      <OuterWrap padding="290px">
        <ContentsWrap>
          <div css={item_wrap}>
            {Array.from({ length: count }, (_, index) => (
              <BrandIntroduceItem
                key={index}
                content={editableContent}
                style={editableStyle}
                isEditable={isEditable}
                onChangeContent={handleEditContent}
                onChangeStyle={handleEditStyle}
              />
            ))}
          </div>
        </ContentsWrap>
      </OuterWrap>
    </OuterWrap>
  );
}

const item_wrap = css`
  display: flex;
  flex-direction: column;
  gap: 100px;
`;

const banner_container = css`
  position: relative;
  width: 100%;
  height: 100%;
`;

const container = css`
  position: absolute;

  width: 100%;
  height: 100%;
  padding: 212px 132px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const item_container = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;
