import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header, { Iheader } from "@components/template/common/header/Header";
import Footer from "@components/template/common/footer/Footer";
import { IgeneratedText } from "@pages/user/ServicePage/ServiceStep3Page";
import FindPw from "@components/template/utility/FindPw";
import { IfetchedfeatureResponseData } from "@components/template/types";
import Loading from "@components/common/ui/Loading/loading";
import { getFeatureData } from "@api/project/getFeatureData";
import useIsProduction from "@hooks/useIsProduction";

export default function CommunitySnsFindPw() {
  const feature = "비밀번호 찾기";

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

  // if (!generatedText || !headerData) {
  //   return <Loading />;
  // }

  return (
    <div className="templateImage">
      <Header
        // categories={headerData.categories}
        // logo={headerData.logo}
        serviceType="커뮤니티·sns"
      />
      <FindPw />
      <Footer
        // logo={headerData.logo}
        serviceType="커뮤니티·sns"
      />
    </div>
  );
}
