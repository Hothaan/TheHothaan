import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

/* component */
import Header, { Iheader } from "@components/template/common/header/Header";
import ProductDetail from "@components/template/product/ProductDetail";
import Footer from "@components/template/common/footer/Footer";
import Loading from "@components/common/ui/Loading/loading";

/* data */
import { IgeneratedText } from "@pages/user/ServicePage/ServiceStep3Page";
import { IfetchedfeatureResponseData } from "@components/template/types";
import { getFeatureData } from "@api/project/getFeatureData";
import useIsProduction from "@hooks/useIsProduction";

/* css */
import {
  product_detail_product_title_css_,
  product_detail_product_desc_css_,
  product_detail_more_product__option_main_title_css,
  product_detail_more_product__option_main_desc_css,
} from "@components/template/product/ProductDetail";

/* text */
import { IproductDetailText } from "@components/template/product/ProductDetail";

/* content */
import { IproductDetailContent } from "@components/template/product/ProductDetail";

interface IShoppingMallProductDetailText {
  productDetail: IproductDetailText;
}

interface IShoppingMallProductDetailContent {
  productDetail: IproductDetailContent;
}

export default function ShoppingMallProductDetail() {
  const feature = "상품 상세";

  /* only projectId */
  const { isProduction } = useIsProduction();
  const { projectId } = useParams();
  const [projectIdValue, setProjectIdValue] = useState<string | null>(null);
  const [headerData, setHeaderData] = useState<Iheader | null>(null);
  const [generatedText, setGeneratedText] = useState<IgeneratedText | null>(
    null
  );

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
      window.location.href = "/error";
    }
  }

  useEffect(() => {
    if (projectId === undefined) {
      setProjectIdValue(sessionStorage.getItem("projectId"));
    } else {
      setProjectIdValue(projectId);
    }
  }, [projectId]);

  useEffect(() => {
    if (projectIdValue) {
      fetchFeatureData(isProduction, projectIdValue);
    }
  }, [projectIdValue]);

  const [changedContent, setChangedContent] = useState(null);
  const [pageContent, setPageContent] =
    useState<IShoppingMallProductDetailContent>(
      {} as IShoppingMallProductDetailContent
    );

  console.log(pageContent);

  const isKeyExist = (
    data: any,
    validKeys: string[]
  ): data is IShoppingMallProductDetailContent => {
    return validKeys.every((key) => key in data);
  };

  function updateSectionContent<
    T extends keyof IShoppingMallProductDetailContent
  >(section: T, updatedContent: Partial<IShoppingMallProductDetailContent[T]>) {
    setPageContent((prev) => ({
      ...prev,
      [section]: {
        ...prev?.[section],
        ...updatedContent,
      },
    }));
  }

  useEffect(() => {
    if (
      generatedText &&
      generatedText.content?.title &&
      generatedText.content?.desc
    ) {
      updateSectionContent("productDetail", {
        productTitle: {
          text: generatedText.content?.title,
          css: product_detail_product_title_css_,
        },
        productDesc: {
          text: generatedText.content?.desc,
          css: product_detail_product_desc_css_,
        },
      });
    }
  }, [generatedText]);

  if (!generatedText || !headerData) {
    return <Loading />;
  }

  return (
    <div className="templateImage">
      <Header
        categories={headerData.categories || undefined}
        logo={headerData.logo || undefined}
        serviceType="쇼핑몰"
      />
      <ProductDetail content={pageContent?.productDetail} />
      <Footer logo={headerData.logo} serviceType="쇼핑몰" />
    </div>
  );
}
