/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import CommunitySnsMain from "@components/template/templateStructureForCapture/communitySns/CommunitySnsMain";
import CommunitySnsBoard from "@components/template/templateStructureForCapture/communitySns/CommunitySnsBoard";
import CommunitySnsFeed from "@components/template/templateStructureForCapture/communitySns/CommunitySnsFeed";
import CommunitySnsFaq from "@components/template/templateStructureForCapture/communitySns/CommunitySnsFaq";
import CommunitySnsMyProfile from "@components/template/templateStructureForCapture/communitySns/CommunitySnsMyProfile";
export default function TemplateFublishingPage() {
  return (
    <div css={container}>
      <p>CommunitySnsMain</p>
      <CommunitySnsMain />
      <p>CommunitySnsBoard</p>
      <CommunitySnsBoard />
      <p>CommunitySnsFeed</p>
      <CommunitySnsFeed />
      <p>CommunitySnsFaq</p>
      <CommunitySnsFaq />
      <p>CommunitySnsMyProfile</p>
      <CommunitySnsMyProfile />
    </div>
  );
}

const container = css`
  margin-top: 80px;
`;
