import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

/* component */
import Header, { Iheader } from "@components/template/common/header/Header";
import Cart from "@components/template/mypage/Cart";
import Footer from "@components/template/common/footer/Footer";
import Loading from "@components/common/ui/Loading/loading";

/* data */
import { IgeneratedText } from "@pages/user/ServicePage/ServiceStep3Page";
import { IfetchedfeatureResponseData } from "@components/template/types";
import { getFeatureData } from "@api/project/getFeatureData";
import useIsProduction from "@hooks/useIsProduction";

/* text */
import { IcartText } from "@components/template/mypage/Cart";

/* content */
import { IcartContent } from "@components/template/mypage/Cart";

interface IshoppingMallCart {
  cart: IcartText;
}

interface IshoppingMallContent {
  cart: IcartContent;
}

export default function ShoppingMallCart() {
  const feature = "장바구니";

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
      if (!response.data || !response.data.featureResponseData) {
        console.error("Invalid API response structure", response);
        return;
      }
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

  console.log(generatedText);

  useEffect(() => {
    if (projectId === undefined) {
      setProjectIdValue(sessionStorage.getItem("projectId"));
    } else {
      setProjectIdValue(projectId);
    }
  }, [projectId]);

  useEffect(() => {
    if (projectIdValue && isProduction !== undefined) {
      fetchFeatureData(isProduction, projectIdValue);
    }
  }, [projectIdValue, isProduction]);

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
      <Cart
        content={{ title: { text: generatedText.content.title || undefined } }}
      />
      <Footer logo={headerData.logo || undefined} serviceType="쇼핑몰" />
    </div>
  );
}
