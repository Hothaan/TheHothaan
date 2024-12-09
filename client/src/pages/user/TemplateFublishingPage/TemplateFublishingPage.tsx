/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import CommunitySnsMain from "@components/template/templateStructureForCapture/communitySns/CommunitySnsMain";
import CommunitySnsBoard from "@components/template/templateStructureForCapture/communitySns/CommunitySnsBoard";
import CommunitySnsFeed from "@components/template/templateStructureForCapture/communitySns/CommunitySnsFeed";
import CommunitySnsFaq from "@components/template/templateStructureForCapture/communitySns/CommunitySnsQna";
import CommunitySnsMyProfile from "@components/template/templateStructureForCapture/communitySns/CommunitySnsMyProfile";
import HomePageBoardMain from "@components/template/templateStructureForCapture/homepageBoard/HomePageBoardMain";
import HomePageBoardGreetings from "@components/template/templateStructureForCapture/homepageBoard/HomePageBoardGreetings";
import HomePageBoardHistory from "@components/template/templateStructureForCapture/homepageBoard/HomePageBoardHistory";
import HomePageBoardSearch from "@components/template/templateStructureForCapture/homepageBoard/HomePageBoardSearch";
import HomePageBoardMedia from "@components/template/templateStructureForCapture/homepageBoard/HomePageBoardMedia";
import HomePageBoardNews from "@components/template/templateStructureForCapture/homepageBoard/HomePageBoardNews";
import LandingIntroduceMain from "@components/template/templateStructureForCapture/landingIntroduce/LandingIntroduceMain";
export default function TemplateFublishingPage() {
  return (
    <div css={container}>
      <p>HomePageBoardMain</p>
      <HomePageBoardMain />
      <p>HomePageBoardGreetings</p>
      <HomePageBoardGreetings />
      <p>HomePageBoardHistory</p>
      <HomePageBoardHistory />
      <p>HomePageBoardSearch</p>
      <HomePageBoardSearch />
      <p>HomePageBoardMedia</p>
      <HomePageBoardMedia />
      <p>HomePageBoardNews</p>
      <HomePageBoardNews />
      <p>LandingIntroduceMain</p>
      <LandingIntroduceMain />
    </div>
  );
}

const container = css`
  margin-top: 80px;
`;
