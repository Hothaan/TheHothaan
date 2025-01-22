/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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

import { service_contact_title_css_ } from "@components/template/service/ServiceContact";

interface IcommunitySnsMainContent {
  mainBannerTitle?: string;
  mainBannerDesc?: string;
  mainBannerButton?: string;
  noticeTitle?: string;
  noticeDesc?: string;
  boardTitle?: string;
  imageBoardTitle?: string; //수정요청
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
  imageBoardTitle?: CSSObject; //수정요청
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

  const [pageContent, setPageContent] = useState<IcommunitySnsMainContent>(
    {} as IcommunitySnsMainContent
  );
  const [pageStyle, setPageStyle] = useState<IcommunitySnsMainStyle>(
    {} as IcommunitySnsMainStyle
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
      serviceContactButton: undefined,
    };
    setPageStyle({ ...initialStyle });
  }

  //featureData가 들어오면 초기 콘텐츠와 스타일 업데이트
  useEffect(() => {
    if (generatedText) {
      updateInitialContent();
      updateInitialStyle();
    }
  }, [generatedText]);

  //pageContent가 변경될 때마다 localStorage에 업데이트
  useEffect(() => {
    if (pageContent) {
      const localContent = localStorage.getItem("changedContent");

      if (localContent) {
        const parsed = JSON.parse(localContent);
        const updatedData = {
          ...parsed,
          [featureKey]: {
            featureId: generatedText?.feature_id,
            content: {
              ...pageContent,
            },
          },
        };
        localStorage.setItem("changedContent", JSON.stringify(updatedData));
      } else {
        const data = {
          [featureKey]: {
            featureId: generatedText?.feature_id,
            content: {
              ...pageContent,
            },
          },
        };
        localStorage.setItem("changedContent", JSON.stringify(data));
      }
    }
  }, [pageContent]);

  function handleChangeContent(key: string, value: string) {
    setPageContent({ ...pageContent, [key]: value });
  }

  function handleChangeStyle(key: string, value: CSSObject) {
    setPageStyle({ ...pageStyle, [key]: value });
  }

  useEffect(() => {
    if (pageStyle) {
      const localStyle = localStorage.getItem("changedStyle");

      if (localStyle) {
        const parsed = JSON.parse(localStyle);
        const updatedData = {
          ...parsed,
          [featureKey]: {
            featureId: generatedText?.feature_id,
            style: {
              ...pageStyle,
            },
          },
        };
        localStorage.setItem("changedStyle", JSON.stringify(updatedData));
      } else {
        const data = {
          [featureKey]: {
            featureId: generatedText?.feature_id,
            style: {
              ...pageContent,
            },
          },
        };
        localStorage.setItem("changedStyle", JSON.stringify(data));
      }
    }
  }, [pageStyle]);

  if (!generatedText || !headerData || Object.keys(pageContent).length === 0) {
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
