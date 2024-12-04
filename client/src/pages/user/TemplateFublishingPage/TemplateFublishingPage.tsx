/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import CommunitySnsMain from "@components/template/templateStructureForCapture/communitySns/CommunitySnsMain";
import CommunitySnsBoard from "@components/template/templateStructureForCapture/communitySns/CommunitySnsBoard";
import CommunitySnsFeed from "@components/template/templateStructureForCapture/communitySns/CommunitySnsFeed";
import CommunitySnsFaq from "@components/template/templateStructureForCapture/communitySns/CommunitySnsQna";
import CommunitySnsMyProfile from "@components/template/templateStructureForCapture/communitySns/CommunitySnsMyProfile";
import HomePageBoardMain from "@components/template/templateStructureForCapture/homepageBoard/HomePageBoardMain";
export default function TemplateFublishingPage() {
  return (
    <div css={container}>
      <p>HomePageBoardMain</p>
      <HomePageBoardMain />
    </div>
  );
}

const container = css`
  margin-top: 80px;
`;
