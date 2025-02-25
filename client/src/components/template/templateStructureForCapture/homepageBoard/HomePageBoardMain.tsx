/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
/* store */
import { projectIdStore } from "@store/projectIdStore";

/* component */
import Header, { Iheader } from "@components/template/common/header/Header";
import Footer from "@components/template/common/footer/Footer";
import Mainbanner from "@components/template/main/Mainbanner";
import ServiceIntroduce from "@components/template/main/ServiceIntroduceMain";
import ProductIntroduceMain from "@components/template/main/ProductIntroduceMain";
import NoticeMain from "@components/template/main/NoticeMain";
import RecruitMain from "@components/template/main/RecruitMain";
import NewsMain from "@components/template/main/NewsMain";
import Loading from "@components/common/ui/Loading/loading";

/* data */
import ExploreServiceMain from "@components/template/main/ExploreServiceMain";
import { IfetchedfeatureResponseData } from "@components/template/types";
import { getFeatureData } from "@api/project/getFeatureData";
import useIsProduction from "@hooks/useIsProduction";

/* css */
import {
  mainBanner_title_css_,
  mainBanner_desc_css_,
  mainBanner_button_css_,
} from "@components/template/main/Mainbanner";

import {
  service_introduce_title_css,
  service_introduce_desc_css,
} from "@components/template/main/ServiceIntroduceMain";

import {
  product_introduce_image_desc_css_,
  product_introduce_title_css_,
  product_introduce_desc_css_,
} from "@components/template/main/ProductIntroduceMain";

import {
  notice_main_title_css_,
  notice_main_desc_css_,
} from "@components/template/main/NoticeMain";

import {
  recruit_item_title_css_,
  recruit_item_desc_css_,
} from "@components/template/main/RecruitMain";

import { news_main_item_title_css_ } from "@components/template/main/NewsMain";

import {
  explore_service_title_css_,
  explore_service_button_css_,
  explore_service_explore_title_css_,
  explore_service_explore_button_css_,
} from "@components/template/main/ExploreServiceMain";

interface IhomePageBoardMainContent {
  mainBannerTitle?: string;
  mainBannerDesc?: string;
  mainBannerButton?: string;
  serviceIntroduceTitle?: string;
  serviceIntroduceDesc?: string;
  productIntroduceImageDesc1?: string; //수정
  productIntroduceTitle1?: string; // 수정
  productIntroduceDesc1?: string; // 수정
  productIntroduceImageDesc2?: string; //수정
  productIntroduceTitle2?: string; // 수정
  productIntroduceDesc2?: string; // 수정
  noticeTitle?: string;
  noticeDesc?: string;
  recruitTitle?: string;
  recruitDesc?: string;
  newsTitle?: string;
  exploreServiceTitle?: string;
  exploreServiceButton?: string;
  exploreServiceExploreTitle?: string;
  exploreServiceExploreButton?: string;
}
interface IhomePageBoardMainStyle {
  mainBannerTitle?: CSSObject;
  mainBannerDesc?: CSSObject;
  mainBannerButton?: CSSObject;
  serviceIntroduceTitle?: CSSObject;
  serviceIntroduceDesc?: CSSObject;
  productIntroduceImageDesc1?: CSSObject; //수정
  productIntroduceTitle1?: CSSObject; // 수정
  productIntroduceDesc1?: CSSObject; // 수정
  productIntroduceImageDesc2?: CSSObject; //수정
  productIntroduceTitle2?: CSSObject; // 수정
  productIntroduceDesc2?: CSSObject; // 수정
  noticeTitle?: CSSObject;
  noticeDesc?: CSSObject;
  recruitTitle?: CSSObject;
  recruitDesc?: CSSObject;
  newsTitle?: CSSObject;
  exploreServiceTitle?: CSSObject;
  exploreServiceButton?: CSSObject;
  exploreServiceExploreTitle?: CSSObject;
  exploreServiceExploreButton?: CSSObject;
}

export default function HomePageBoardMain() {
  const feature = "메인";
  const featureKey = "homepageBoardMain";

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
      window.location.href = "/error";
    }
  }

  function updateInitialContent() {
    if (generatedText && generatedText.content) {
      const initialContent = {
        mainBannerTitle: generatedText.content.mainBannerTitle || undefined,
        mainBannerDesc: generatedText.content.mainBannerDesc || undefined,
        mainBannerButton: generatedText.content.mainBannerButton || undefined,

        serviceIntroduceTitle:
          generatedText.content.serviceIntroduceTitle || undefined,
        serviceIntroduceDesc:
          generatedText.content.serviceIntroduceDesc || undefined,

        productIntroduceImageDesc1:
          generatedText.content.productIntroduceImageDesc1 || undefined,
        productIntroduceTitle1:
          generatedText.content.productIntroduceTitle1 || undefined,
        productIntroduceDesc1:
          generatedText.content.productIntroduceDesc1 || undefined,
        productIntroduceImageDesc2:
          generatedText.content.productIntroduceImageDesc2 || undefined,
        productIntroduceTitle2:
          generatedText.content.productIntroduceTitle2 || undefined,
        productIntroduceDesc2:
          generatedText.content.productIntroduceDesc2 || undefined,

        noticeTitle: generatedText.content.noticeTitle || undefined,
        noticeDesc: generatedText.content.noticeDesc || undefined,

        recruitTitle: generatedText.content.recruitTitle || undefined,
        recruitDesc: generatedText.content.recruitDesc || undefined,

        newsTitle: generatedText.content.newsTitle || undefined,

        exploreServiceTitle:
          generatedText.content.exploreServiceTitle || undefined,
        exploreServiceButton:
          generatedText.content.exploreServiceButton || undefined,
        exploreServiceExploreTitle:
          generatedText.content.exploreServiceExploreTitle || undefined,
        exploreServiceExploreButton:
          generatedText.content.exploreServiceExploreButton || undefined,
      };
      setPageContent({ ...initialContent });
    }
  }

  //페이지에 적용될 초기 스타일 저장
  function updateInitialStyle() {
    const initialStyle = {
      mainBannerTitle: mainBanner_title_css_ || undefined,
      mainBannerDesc: mainBanner_desc_css_ || undefined,
      mainBannerButton: mainBanner_button_css_ || undefined,

      serviceIntroduceTitle: service_introduce_title_css || undefined,
      serviceIntroduceDesc: service_introduce_desc_css || undefined,

      productIntroduceImageDesc1:
        product_introduce_image_desc_css_ || undefined,
      productIntroduceTitle1: product_introduce_title_css_ || undefined,
      productIntroduceDesc1: product_introduce_desc_css_ || undefined,
      productIntroduceImageDesc2:
        product_introduce_image_desc_css_ || undefined,
      productIntroduceTitle2: product_introduce_title_css_ || undefined,
      productIntroduceDesc2: product_introduce_desc_css_ || undefined,

      noticeTitle: notice_main_title_css_ || undefined,
      noticeDesc: notice_main_desc_css_ || undefined,

      recruitTitle: recruit_item_title_css_ || undefined,
      recruitDesc: recruit_item_desc_css_ || undefined,

      newsTitle: news_main_item_title_css_ || undefined,

      exploreServiceTitle: explore_service_title_css_ || undefined,
      exploreServiceButton: explore_service_button_css_ || undefined,
      exploreServiceExploreTitle:
        explore_service_explore_title_css_ || undefined,
      exploreServiceExploreButton:
        explore_service_explore_button_css_ || undefined,
    };
    setPageStyle({ ...initialStyle });
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
    if (typeof window === "undefined") {
      return generatedText?.style || null;
    }

    const localContent = localStorage.getItem("changedStyle");
    if (localContent) {
      const parsed = JSON.parse(localContent);
      if (parsed[featureKey]?.style) {
        return parsed[featureKey].style; // 항상 changedStyle을 우선 반환
      }
    }

    return generatedText?.style || null; // changedStyle이 없을 경우에만 generatedText.style 사용
  }

  const [pageContent, setPageContent] =
    useState<IhomePageBoardMainContent | null>(getLocalContent());
  const [pageStyle, setPageStyle] = useState<IhomePageBoardMainStyle | null>(
    getLocalStyle()
  );

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

      if (hasLocalStyle) {
        setPageStyle(hasLocalStyle); // 로컬 저장된 스타일이 있으면 항상 그것을 우선 적용
      } else if (generatedText.style) {
        setPageStyle(generatedText.style); // 없을 경우에만 DB 스타일 적용
      } else {
        updateInitialStyle(); // 둘 다 없으면 초기 스타일 적용
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

  if (!generatedText || !headerData) {
    return <Loading />;
  }

  return (
    <div className="templateImage">
      <Header
        categories={headerData.categories}
        logo={headerData.logo}
        serviceType="홈페이지·게시판"
      />
      <Mainbanner
        content={{
          mainBannerTitle: pageContent?.mainBannerTitle,
          mainBannerDesc: pageContent?.mainBannerDesc,
          mainBannerButton: pageContent?.mainBannerButton,
        }}
        style={{
          mainBannerTitle: pageStyle?.mainBannerTitle,
          mainBannerDesc: pageStyle?.mainBannerDesc,
          mainBannerButton: pageStyle?.mainBannerButton,
        }}
        isEditable={true}
        onChangeContent={handleChangeContent}
        onChangeStyle={handleChangeStyle}
        activeEditor={activeEditor}
        setActiveEditor={setActiveEditor}
      />
      <ServiceIntroduce
        content={{
          serviceIntroduceTitle: pageContent?.serviceIntroduceTitle,
          serviceIntroduceDesc: pageContent?.serviceIntroduceDesc,
        }}
        style={{
          serviceIntroduceTitle: pageStyle?.serviceIntroduceTitle,
          serviceIntroduceDesc: pageStyle?.serviceIntroduceDesc,
        }}
        isEditable={true}
        onChangeContent={handleChangeContent}
        onChangeStyle={handleChangeStyle}
        activeEditor={activeEditor}
        setActiveEditor={setActiveEditor}
      />
      <ProductIntroduceMain
        content={{
          productIntroduceImageDesc1: pageContent?.productIntroduceImageDesc1,
          productIntroduceTitle1: pageContent?.productIntroduceTitle1,
          productIntroduceDesc1: pageContent?.productIntroduceDesc1,
          productIntroduceImageDesc2: pageContent?.productIntroduceImageDesc2,
          productIntroduceTitle2: pageContent?.productIntroduceTitle2,
          productIntroduceDesc2: pageContent?.productIntroduceDesc2,
        }}
        style={{
          productIntroduceImageDesc1: pageStyle?.productIntroduceImageDesc1,
          productIntroduceTitle1: pageStyle?.productIntroduceTitle1,
          productIntroduceDesc1: pageStyle?.productIntroduceDesc1,
          productIntroduceImageDesc2: pageStyle?.productIntroduceImageDesc2,
          productIntroduceTitle2: pageStyle?.productIntroduceTitle2,
          productIntroduceDesc2: pageStyle?.productIntroduceDesc2,
        }}
        isEditable={true}
        onChangeContent={handleChangeContent}
        onChangeStyle={handleChangeStyle}
        activeEditor={activeEditor}
        setActiveEditor={setActiveEditor}
      />
      <NoticeMain
        content={{
          noticeTitle: pageContent?.noticeTitle,
          noticeDesc: pageContent?.noticeDesc,
        }}
        style={{
          noticeTitle: pageStyle?.noticeTitle,
          noticeDesc: pageStyle?.noticeDesc,
        }}
        isEditable={true}
        onChangeContent={handleChangeContent}
        onChangeStyle={handleChangeStyle}
        activeEditor={activeEditor}
        setActiveEditor={setActiveEditor}
      />
      <RecruitMain
        content={{
          recruitTitle: pageContent?.recruitTitle,
          recruitDesc: pageContent?.recruitDesc,
        }}
        style={{
          recruitTitle: pageStyle?.recruitTitle,
          recruitDesc: pageStyle?.recruitDesc,
        }}
        isEditable={true}
        onChangeContent={handleChangeContent}
        onChangeStyle={handleChangeStyle}
        activeEditor={activeEditor}
        setActiveEditor={setActiveEditor}
      />
      <NewsMain
        content={{
          newsTitle: pageContent?.newsTitle,
        }}
        style={{
          newsTitle: pageStyle?.newsTitle,
        }}
        isEditable={true}
        onChangeContent={handleChangeContent}
        onChangeStyle={handleChangeStyle}
        activeEditor={activeEditor}
        setActiveEditor={setActiveEditor}
      />
      <ExploreServiceMain
        content={{
          exploreServiceTitle: pageContent?.exploreServiceTitle,
          exploreServiceButton: pageContent?.exploreServiceButton,
          exploreServiceExploreTitle: pageContent?.exploreServiceExploreTitle,
          exploreServiceExploreButton: pageContent?.exploreServiceExploreButton,
        }}
        style={{
          exploreServiceTitle: pageStyle?.exploreServiceTitle,
          exploreServiceButton: pageStyle?.exploreServiceButton,
          exploreServiceExploreTitle: pageStyle?.exploreServiceExploreTitle,
          exploreServiceExploreButton: pageStyle?.exploreServiceExploreButton,
        }}
        isEditable={true}
        onChangeContent={handleChangeContent}
        onChangeStyle={handleChangeStyle}
        activeEditor={activeEditor}
        setActiveEditor={setActiveEditor}
      />
      <Footer serviceType="홈페이지·게시판" logo={headerData.logo} />
    </div>
  );
}
