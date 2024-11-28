import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header, { Iheader } from "@components/template/common/header/Header";
import Footer from "@components/template/common/footer/Footer";
import { IgeneratedText } from "@pages/user/ServicePage/ServiceStep3Page";
import ProductList from "@components/template/product/ProductList";
import {
  IfetchedfeatureResponseData,
  ItemplateMode,
} from "@components/template/types";
import Loading from "@components/common/ui/Loading/loading";
import { getFeatureData } from "@api/project/getFeatureData";
import useIsProduction from "@hooks/useIsProduction";

export default function ShoppingMallProductList(prop: ItemplateMode) {
  const { templateMode } = prop;
  const feature = "상품 목록";

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
        const categoryArr: string[] = response.data.featureResponseData.map(
          (item: IfetchedfeatureResponseData) => item.menu
        );
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
      />
      {generatedText?.content?.categories &&
      generatedText.content.categories.length > 0 ? (
        <ProductList categories={generatedText.content.categories} />
      ) : (
        <ProductList />
      )}
      <Footer logo={headerData.logo} />
    </div>
  );

  // /* capture */
  // const { data, header } = useParams();
  // const decodedData = data ? JSON.parse(decodeURIComponent(data)) : null;
  // const decodedHeader = header ? JSON.parse(decodeURIComponent(header)) : null;

  // /* render */
  // const [generatedTextData, setGeneratedTextData] = useState<
  //   IgeneratedText[] | null
  // >(null);
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

  // /* capture */
  // if (templateMode === "capture") {
  //   if (!decodedData || !decodedHeader) {
  //     return <Loading />;
  //   }

  //   return (
  //     <div className="templateImage">
  //       <Header
  //         categories={decodedHeader.categories}
  //         logo={decodedHeader.logo}
  //       />
  //       {decodedData.categories && decodedData.categories.length > 0 ? (
  //         <ProductList categories={decodedData.categories} />
  //       ) : (
  //         <ProductList />
  //       )}
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
  //       <Header
  //         categories={headerData.categories || undefined}
  //         logo={headerData.logo || undefined}
  //       />
  //       {generatedText?.content?.categories &&
  //       generatedText.content.categories.length > 0 ? (
  //         <ProductList categories={generatedText.content.categories} />
  //       ) : (
  //         <ProductList />
  //       )}
  //       <Footer logo={headerData.logo} />
  //     </div>
  //   );
  // }
}
