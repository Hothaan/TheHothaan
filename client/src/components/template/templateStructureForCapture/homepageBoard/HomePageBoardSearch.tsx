import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
/* store */
import { projectIdStore } from "@store/projectIdStore";

/* component */
import Header, { Iheader } from "@components/template/common/header/Header";
import Search from "@components/template/utility/Search";
import Footer from "@components/template/common/footer/Footer";
import Loading from "@components/common/ui/Loading/loading";

/* data */
import { IfetchedfeatureResponseData } from "@components/template/types";
import { getFeatureData } from "@api/project/getFeatureData";
import useIsProduction from "@hooks/useIsProduction";

/* text 가 없는 페이지 */

export default function HomePageBoardSearch() {
  const feature = "검색";

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

  if (!headerData) {
    return <Loading />;
  }

  return (
    <div className="templateImage">
      <Header
        categories={headerData.categories}
        logo={headerData.logo}
        serviceType="홈페이지·게시판"
      />
      <Search />
      <Footer serviceType="홈페이지·게시판" logo={headerData.logo} />
    </div>
  );
}
