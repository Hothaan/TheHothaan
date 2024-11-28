import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header, { Iheader } from "@components/template/common/header/Header";
import Footer from "@components/template/common/footer/Footer";
import Mainbanner from "@components/template/main/Mainbanner";
import ProductListMain from "@components/template/main/ProductListMain";
import Review from "@components/template/product/Review";
import ServiceIntroduction from "@components/template/service/ServiceIntroduction";
import ServiceContact from "@components/template/service/ServiceContact";
import { IgeneratedText } from "@pages/user/ServicePage/ServiceStep3Page";
import {
  IfeatureResponseData,
  ItemplateMode,
} from "@components/template/types";
import Loading from "@components/common/ui/Loading/loading";
import { getFeatureData } from "@api/project/getFeatureData";
import useIsProduction from "@hooks/useIsProduction";

export default function ShoppingMallMain(prop: ItemplateMode) {
  const { templateMode } = prop;
  const feature = "메인";

  /* only projectId */
  const { isProduction } = useIsProduction();
  const { projectId } = useParams();
  const [headerData, setHeaderData] = useState<Iheader | null>(null);
  const [generatedText, setGeneratedText] = useState<IgeneratedText | null>(
    null
  );
  async function fetchFeatureData(isProduction: boolean, projectId: string) {
    try {
      const response = await getFeatureData(isProduction, projectId);
      if (response.status === 200) {
        const categoryArr: string[] = response.data.featureResponseData.map(
          (item: IfeatureResponseData) => item.menu
        );
        setHeaderData({
          logo: response.data.projectName,
          categories: [...new Set(categoryArr)],
        });
        setGeneratedText(
          response.data.featureResponseData.find(
            (item: IfeatureResponseData) => item.feature === feature
          )
        );
      } else {
        console.error("getFeatureData error", response.status);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (projectId) {
      fetchFeatureData(isProduction, projectId);
    }
  }, [projectId]);

  if (!generatedText || !headerData) {
    return <Loading />;
  }

  return (
    <div className="templateImage">
      <Header categories={headerData.categories} logo={headerData.logo} />
      <Mainbanner
        isEditable={true}
        title={generatedText?.content?.title}
        desc={generatedText?.content?.desc}
      />
      <ProductListMain option="main" />
      <Review />
      <ServiceIntroduction />
      <ProductListMain option="list" />
      <ServiceContact />
      <Footer logo={headerData.logo} />
    </div>
  );
}
