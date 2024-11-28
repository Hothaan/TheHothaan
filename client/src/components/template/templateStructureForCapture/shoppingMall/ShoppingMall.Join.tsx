import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header, { Iheader } from "@components/template/common/header/Header";
import Footer from "@components/template/common/footer/Footer";
import { IgeneratedText } from "@pages/user/ServicePage/ServiceStep3Page";
import Join from "@components/template/utility/Join";
import {
  IfeatureResponseData,
  ItemplateMode,
} from "@components/template/types";
import Loading from "@components/common/ui/Loading/loading";
import { getFeatureData } from "@api/project/getFeatureData";
import useIsProduction from "@hooks/useIsProduction";

export default function ShoppingMallJoin(prop: ItemplateMode) {
  const { templateMode } = prop;
  const { isProduction } = useIsProduction();
  const { projectId } = useParams();
  const [headerData, setHeaderData] = useState<Iheader | null>(null);
  const [generatedText, setGeneratedText] = useState<IgeneratedText | null>(
    null
  );

  const feature = "회원가입";

  /* 추가 */

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

  // /* capture */
  // const { data, header } = useParams();
  // const decodedData = data ? JSON.parse(decodeURIComponent(data)) : null;
  // const decodedHeader = header ? JSON.parse(decodeURIComponent(header)) : null;

  // console.log(decodedData);

  // /* render */
  // const [generatedTextData, setGeneratedTextData] = useState<
  //   IgeneratedText[] | null
  // >(null);
  // const feature = "회원가입";
  // const [generatedText, setGeneratedText] = useState<IgeneratedText | null>(
  //   null
  // );

  // useEffect(() => {
  //   const localData = localStorage.getItem("generatedTextData");
  //   if (localData) {
  //     const parsedData = JSON.parse(localData);
  //     setGeneratedTextData(parsedData);
  //   }
  // }, []);

  // function getGeneratedText(
  //   generatedTextData: IgeneratedText[]
  // ): IgeneratedText | undefined {
  //   const data = generatedTextData.find((item) => item.feature === feature);
  //   return data;
  // }

  // useEffect(() => {
  //   if (generatedTextData && generatedTextData.length > 0 && !generatedText) {
  //     const data = getGeneratedText(generatedTextData);
  //     if (data) {
  //       setGeneratedText(data);
  //     }
  //   }
  // }, [generatedTextData]);

  // const [headerData, setHeaderData] = useState<Iheader | null>(null);

  // useEffect(() => {
  //   const localData = localStorage.getItem("headerData");
  //   if (localData) {
  //     const parsedData = JSON.parse(localData);
  //     setHeaderData(parsedData);
  //   }
  // }, []);

  /* capture */
  // if (templateMode === "capture") {
  //   // if (!decodedData || !decodedHeader) {
  //   if (!decodedHeader) {
  //     return <Loading />;
  //   }

  //   return (
  //     <div className="templateImage">
  //       <Header
  //         categories={decodedHeader.categories}
  //         logo={decodedHeader.logo}
  //       />
  //       <Join />
  //       <Footer logo={decodedHeader.logo} />
  //     </div>
  //   );
  // } else {
  //   /* render */
  //   if (!generatedText || !headerData) {
  //     return <Loading />;
  //   }

  //   return (
  //     <div className="templateImage">
  //       <Header categories={headerData.categories || undefined} logo={headerData.logo || undefined} />
  //       <Join />
  //       <Footer logo={headerData.logo} />
  //     </div>
  //   );
  // }

  if (!generatedText || !headerData) {
    return <Loading />;
  }

  return (
    <div className="templateImage">
      <Header categories={headerData.categories} logo={headerData.logo} />
      <Join />
      <Footer logo={headerData.logo} />
    </div>
  );
}
