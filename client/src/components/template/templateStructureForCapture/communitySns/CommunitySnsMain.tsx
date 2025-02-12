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
import NoticeMain from "@components/template/main/NoticeMain";
import NormalBoardMain from "@components/template/main/NormalBoardMain";
import FeedMain from "@components/template/main/FeedMain";
import ImageBoardMain from "@components/template/main/ImageBoardMain";
import NewsMain from "@components/template/main/NewsMain";
import FaqMain from "@components/template/main/FaqMain";
import ServiceContact from "@components/template/service/ServiceContact";
import Loading from "@components/common/ui/Loading/loading";

/* data */
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
  notice_main_title_css_,
  notice_main_desc_css_,
} from "@components/template/main/NoticeMain";

import { normal_board_main_title_css_ } from "@components/template/main/NormalBoardMain";

import { image_board_title_css_ } from "@components/template/main/ImageBoardMain";

import { news_main_item_title_css_ } from "@components/template/main/NewsMain";

import {
  faq_main_item_desc_css_,
  faq_main_item_title_css_,
} from "@components/template/main/FaqMain";

import {
  service_contact_title_css_,
  service_contact_button_css_,
} from "@components/template/service/ServiceContact";

interface IcommunitySnsMainContent {
  mainBannerTitle?: string;
  mainBannerDesc?: string;
  mainBannerButton?: string;
  noticeTitle?: string;
  noticeDesc?: string;
  boardTitle?: string;
  imageBoardTitle?: string;
  newsTitle?: string;
  faqTitle?: string;
  faqDesc?: string;
  serviceContactTitle?: string;
  serviceContactButton?: string;
}

interface IcommunitySnsMainStyle {
  mainBannerTitle?: CSSObject;
  mainBannerDesc?: CSSObject;
  mainBannerButton?: CSSObject;
  noticeTitle?: CSSObject;
  noticeDesc?: CSSObject;
  boardTitle?: CSSObject;
  imageBoardTitle?: CSSObject;
  newsTitle?: CSSObject;
  faqTitle?: CSSObject;
  faqDesc?: CSSObject;
  serviceContactTitle?: CSSObject;
  serviceContactButton?: CSSObject;
}

export default function CommunitySnsMain() {
  const feature = "메인";
  const featureKey = "communitySnsMain";

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
    useState<IcommunitySnsMainContent | null>(getLocalContent());
  const [pageStyle, setPageStyle] = useState<IcommunitySnsMainStyle | null>(
    getLocalStyle()
  );

  function updateInitialContent() {
    if (generatedText && generatedText.content) {
      const initialContent = {
        mainBannerTitle: generatedText.content.mainBannerTitle || undefined,
        mainBannerDesc: generatedText.content.mainBannerDesc || undefined,
        mainBannerButton: generatedText.content.mainBannerButton || undefined,

        noticeTitle: generatedText.content.noticeTitle || undefined,
        noticeDesc: generatedText.content.noticeDesc || undefined,

        boardTitle: generatedText.content.boardTitle || undefined,

        imageBoardTitle: generatedText.content.imageBoardTitle || undefined,

        newsTitle: generatedText.content.newsTitle || undefined,

        faqTitle: generatedText.content.faqTitle || undefined,
        faqDesc: generatedText.content.faqDesc || undefined,

        serviceContactTitle:
          generatedText.content.serviceContactTitle || undefined,
        serviceContactButton:
          generatedText.content.serviceContactButton || undefined,
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

      noticeTitle: notice_main_title_css_ || undefined,
      noticeDesc: notice_main_desc_css_ || undefined,

      boardTitle: normal_board_main_title_css_ || undefined,

      imageBoardTitle: image_board_title_css_ || undefined,

      newsTitle: news_main_item_title_css_ || undefined,

      faqTitle: faq_main_item_title_css_ || undefined,
      faqDesc: faq_main_item_desc_css_ || undefined,

      serviceContactTitle: service_contact_title_css_ || undefined,
      serviceContactButton: service_contact_button_css_ || undefined,
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

  if (!pageContent || !headerData || !pageStyle) {
    return <Loading />;
  }
  return (
    <div className="templateImage">
      <Header serviceType="커뮤니티·sns" />
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
      />
      <NormalBoardMain
        content={{
          boardTitle: pageContent?.boardTitle,
        }}
        style={{
          boardTitle: pageStyle?.boardTitle,
        }}
        isEditable={true}
        onChangeContent={handleChangeContent}
        onChangeStyle={handleChangeStyle}
      />
      <FeedMain />
      <ImageBoardMain
        content={{
          imageBoardTitle: pageContent?.imageBoardTitle,
        }}
        style={{
          imageBoardTitle: pageStyle?.imageBoardTitle,
        }}
        isEditable={true}
        onChangeContent={handleChangeContent}
        onChangeStyle={handleChangeStyle}
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
      />
      <FaqMain
        content={{
          faqTitle: pageContent?.faqTitle,
          faqDesc: pageContent?.faqDesc,
        }}
        style={{
          faqTitle: pageStyle?.faqTitle,
          faqDesc: pageStyle?.faqDesc,
        }}
        isEditable={true}
        onChangeContent={handleChangeContent}
        onChangeStyle={handleChangeStyle}
      />
      <ServiceContact
        content={{
          serviceContactTitle: pageContent?.serviceContactButton,
          serviceContactButton: pageContent?.serviceContactButton,
        }}
        style={{
          serviceContactTitle: pageStyle?.serviceContactButton,
          serviceContactButton: pageStyle?.serviceContactButton,
        }}
        isEditable={true}
        onChangeContent={handleChangeContent}
        onChangeStyle={handleChangeStyle}
      />
      <Footer serviceType="커뮤니티·sns" />
    </div>
  );
}
