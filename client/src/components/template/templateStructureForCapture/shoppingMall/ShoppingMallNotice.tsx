/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

/* component */
import Header, { Iheader } from "@components/template/common/header/Header";
import Notice, { Tnotice } from "@components/template/customerService/Notice";
import Footer from "@components/template/common/footer/Footer";
import Loading from "@components/common/ui/Loading/loading";

/* data */
import { IgeneratedText } from "@pages/user/ServicePage/ServiceStep3Page";
import { IfetchedfeatureResponseData } from "@components/template/types";
import { getFeatureData } from "@api/project/getFeatureData";
import useIsProduction from "@hooks/useIsProduction";

/* text */
import { InoticeText } from "@components/template/customerService/Notice";

/* content */

interface IshoppingMallNoticeContent {
  noticeTitle: string;
}
interface IshoppingMallNoticeStyle {
  noticeTitle: CSSObject;
}

export default function ShoppingMallNotice() {
  const feature = "공지사항";

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
      <Notice
        option={
          generatedText.option ? (generatedText.option as Tnotice) : "텍스트형"
        }
      />
      <Footer logo={headerData.logo} serviceType="쇼핑몰" />
    </div>
  );
}
