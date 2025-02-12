/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
/* store */
import { projectIdStore } from "@store/projectIdStore";
/* component */
import Header, { Iheader } from "@components/template/common/header/Header";
import ProductList from "@components/template/product/ProductList";
import Footer from "@components/template/common/footer/Footer";
import Loading from "@components/common/ui/Loading/loading";

/* data */
import { IgeneratedText } from "@pages/user/ServicePage/ServiceStep3Page";
import { IfetchedfeatureResponseData } from "@components/template/types";
import { getFeatureData } from "@api/project/getFeatureData";
import useIsProduction from "@hooks/useIsProduction";

/* css */
import {
  product_list_title_css_,
  product_list_desc_css_,
  product_list_nav_item_css_,
} from "@components/template/product/ProductList";

interface IshoppingMallProductListContent {
  productListCategories?: string; //수정요청
  productListProductTitle?: string;
  productListProductDesc?: string;
}

interface IshoppingMallProductListStyle {
  productListCategories?: CSSObject;
  productListProductTitle?: CSSObject;
  productListProductDesc?: CSSObject;
}

export default function ShoppingMallProductList() {
  const feature = "상품 목록";
  const featureKey = "shoppingMallProductList";

  /* only projectId */
  const { isProduction } = useIsProduction();
  const { projectId } = useParams();
  const { projectId: storedProjectId, setProjectId } = projectIdStore();
  const [projectIdValue, setProjectIdValue] = useState<string | null>(null);
  const [headerData, setHeaderData] = useState<Iheader | null>(null);
  const [generatedText, setGeneratedText] =
    useState<IfetchedfeatureResponseData | null>(null);

  async function fetchFeatureData(isProduction: boolean, projectId: string) {
    try {
      const response = await getFeatureData(isProduction, projectId);
      if (response.status === 200) {
        const categoryArr: string[] = response.data.featureResponseData
          .filter(
            (item: IfetchedfeatureResponseData) =>
              item.menu !== "메인" &&
              item.menu !== "유틸리티" &&
              item.menu !== "마이페이지"
          )
          .map((item: IfetchedfeatureResponseData) => item.menu);
        setHeaderData({
          logo: response.data.projectName,
          categories: [...new Set(categoryArr)],
        });
        setGeneratedText(
          response.data.featureResponseData.find(
            (item: IfetchedfeatureResponseData) => item.feature === feature
          )
        );
      } else {
        console.error("getFeatureData error", response.status);
      }
    } catch (error) {
      console.error(error);
      // window.location.href = "/error";
    }
  }

  useEffect(() => {
    if (projectId === undefined) {
      setProjectIdValue(storedProjectId); // Zustand에서 가져온 값 사용
    } else {
      setProjectIdValue(projectId);
    }
  }, [projectId, storedProjectId]);

  useEffect(() => {
    if (projectIdValue) {
      fetchFeatureData(isProduction, projectIdValue);
    }
  }, [projectIdValue]);

  function getLocalContent() {
    const localContent = localStorage.getItem("changedContent");
    if (localContent) {
      const parsed = JSON.parse(localContent);
      if (parsed[featureKey]?.content) {
        return parsed[featureKey].content;
      }
    }
    return null;
  }

  function getLocalStyle() {
    const localContent = localStorage.getItem("changedStyle");
    if (localContent) {
      const parsed = JSON.parse(localContent);
      if (parsed[featureKey]?.style) {
        return parsed[featureKey].style;
      }
    }
    return null;
  }

  const [pageContent, setPageContent] =
    useState<IshoppingMallProductListContent | null>(getLocalContent());
  const [pageStyle, setPageStyle] =
    useState<IshoppingMallProductListStyle | null>(getLocalStyle());

  function updateInitialContent() {
    if (generatedText && generatedText.content) {
      const initialContent = {
        productListCategories:
          generatedText.content.productListCategories || undefined,
        productListProductTitle:
          generatedText.content.productListProductTitle || undefined,
        productListProductDesc:
          generatedText.content.productListProductDesc || undefined,
      };
      setPageContent(initialContent);
    }
  }

  //페이지에 적용될 초기 스타일 저장
  function updateInitialStyle() {
    const initialStyle = {
      productListCategories: product_list_nav_item_css_ || undefined,
      productListProductTitle: product_list_title_css_ || undefined,
      productListProductDesc: product_list_desc_css_ || undefined,
    };
    setPageStyle({ ...initialStyle });
  }

  //featureData가 들어오면 초기 콘텐츠와 스타일 업데이트
  useEffect(() => {
    if (generatedText) {
      const localContent = localStorage.getItem("changedContent");
      const hasLocalContent = localContent
        ? JSON.parse(localContent)?.[featureKey]?.content
        : null;

      if (!hasLocalContent && !pageContent) {
        updateInitialContent();
      }
    }
  }, [generatedText]);

  useEffect(() => {
    if (generatedText) {
      const localStyle = localStorage.getItem("changedStyle");
      const hasLocalStyle = localStyle
        ? JSON.parse(localStyle)?.[featureKey]?.style
        : null;

      if (generatedText.style) {
        // DB에서 가져온 스타일이 있으면 그대로 적용
        setPageStyle(generatedText.style);
      } else if (!hasLocalStyle) {
        // 로컬 저장된 스타일도 없으면 초기 스타일 적용
        updateInitialStyle();
      }
    }
  }, [generatedText]);

  useEffect(() => {
    if (pageContent) {
      const localContent = localStorage.getItem("changedContent");
      const updatedContent = localContent
        ? {
            ...JSON.parse(localContent),
            [featureKey]: {
              featureId: generatedText?.feature_id,
              content: { ...pageContent },
            },
          }
        : {
            [featureKey]: {
              featureId: generatedText?.feature_id,
              content: { ...pageContent },
            },
          };
      localStorage.setItem("changedContent", JSON.stringify(updatedContent));
    }
  }, [pageContent]);

  useEffect(() => {
    if (pageStyle) {
      const localStyle = localStorage.getItem("changedStyle");
      const updatedStyle = localStyle
        ? {
            ...JSON.parse(localStyle),
            [featureKey]: {
              featureId: generatedText?.feature_id,
              style: { ...pageStyle },
            },
          }
        : {
            [featureKey]: {
              featureId: generatedText?.feature_id,
              style: { ...pageStyle },
            },
          };
      localStorage.setItem("changedStyle", JSON.stringify(updatedStyle));
    }
  }, [pageStyle]);

  function handleChangeContent(key: string, value: string) {
    setPageContent({ ...pageContent, [key]: value });
  }

  function handleChangeStyle(key: string, value: CSSObject) {
    setPageStyle({ ...pageStyle, [key]: value });
  }

  const [activeEditor, setActiveEditor] = useState<string | undefined>(
    undefined
  );

  if (!pageContent || !headerData || !pageStyle) {
    return <Loading />;
  }

  return (
    <div className="templateImage">
      <Header
        categories={headerData.categories || undefined}
        logo={headerData.logo || undefined}
        serviceType="쇼핑몰"
      />

      <ProductList
        content={{
          productListCategories: pageContent?.productListCategories,
          productListProductTitle: pageContent?.productListProductTitle,
          productListProductDesc: pageContent?.productListProductDesc,
        }}
        style={{
          productListCategories: pageStyle?.productListCategories,
          productListProductTitle: pageStyle?.productListProductTitle,
          productListProductDesc: pageStyle?.productListProductDesc,
        }}
        isEditable={true}
        onChangeContent={handleChangeContent}
        onChangeStyle={handleChangeStyle}
        activeEditor={activeEditor}
        setActiveEditor={setActiveEditor}
      />

      <Footer logo={headerData.logo} serviceType="쇼핑몰" />
    </div>
  );
}
