/* 쇼핑몰 */
import ShoppingMallMain from "./templateStructureForCapture/shoppingMall/ShoppingMallMain";
import ShoppingMallProductList from "./templateStructureForCapture/shoppingMall/ShoppingMallProductList";
import ShoppingMallProductDetail from "./templateStructureForCapture/shoppingMall/ShoppingMallProductDetail";
import ShoppingMallCart from "./templateStructureForCapture/shoppingMall/ShoppingMallCart";
import ShoppingMallOrderList from "./templateStructureForCapture/shoppingMall/ShoppingMallOrderList";
import ShoppingMallFindId from "./templateStructureForCapture/shoppingMall/ShoppingMallFindId";
import ShoppingMallFindPw from "./templateStructureForCapture/shoppingMall/ShoppingMallFindPw";
import ShoppingMallJoin from "./templateStructureForCapture/shoppingMall/ShoppingMall.Join";
import ShoppingMallLogin from "./templateStructureForCapture/shoppingMall/ShoppingMallLogin";
import ShoppingMallNotice from "./templateStructureForCapture/shoppingMall/ShoppingMallNotice";
import ShoppingMallWidthDrawer from "./templateStructureForCapture/shoppingMall/ShoppingMallWidthDrawer";
import ShoppingMallBrandIntroduce from "./templateStructureForCapture/shoppingMall/ShoppingMallBrandIntroduce";

/* 커뮤니티 SNS */
import CommunitySnsMain from "./templateStructureForCapture/communitySns/CommunitySnsMain";
import CommunitySnsBoard from "./templateStructureForCapture/communitySns/CommunitySnsBoard";
import CommunitySnsFeed from "./templateStructureForCapture/communitySns/CommunitySnsFeed";
import CommunitySnsQna from "./templateStructureForCapture/communitySns/CommunitySnsQna";
import CommunitySnsMyProfile from "./templateStructureForCapture/communitySns/CommunitySnsMyProfile";
import CommunitySnsWithDrawer from "./templateStructureForCapture/communitySns/CommunitySnsWithDrawer";
import CommunitySnsLogin from "./templateStructureForCapture/communitySns/CommunitySnsLogin";
import CommunitySnsJoin from "./templateStructureForCapture/communitySns/CommunitySnsJoin";
import CommunitySnsFindId from "./templateStructureForCapture/communitySns/CommunitySnsFindId";
import CommunitySnsFindPw from "./templateStructureForCapture/communitySns/CommunitySnsFindPw";

/* 중개 매칭 */
import IntermediaryMatchMain from "./templateStructureForCapture/intermediaryMatch/IntermediaryMatchMain";
import IntermediaryMatchPrice from "./templateStructureForCapture/intermediaryMatch/IntermediaryMatchPrice";
import IntermediaryMatchServiceIntroduce from "./templateStructureForCapture/intermediaryMatch/IntermediaryMatchServiceIntroduce";
import IntermediaryMatchEstimateInquiry from "./templateStructureForCapture/intermediaryMatch/IntermediaryMatchEstimateInquiry";
import IntermediaryMatchFAQ from "./templateStructureForCapture/intermediaryMatch/IntermediaryMatchFAQ";
import IntermediaryMatchFindId from "./templateStructureForCapture/intermediaryMatch/IntermediaryMatchFindId";
import IntermediaryMatchFindPw from "./templateStructureForCapture/intermediaryMatch/IntermediaryMatchFindPw";
import IntermediaryMatchMyProfile from "./templateStructureForCapture/intermediaryMatch/IntermediaryMatchMyProfile";
import IntermediaryMatchLogin from "./templateStructureForCapture/intermediaryMatch/IntermediaryMatchLogin";
import IntermediaryMatchJoin from "./templateStructureForCapture/intermediaryMatch/IntermediaryMatchJoin";
import IntermediaryMatchWithDrawer from "./templateStructureForCapture/intermediaryMatch/IntermediaryMatchWithDrawer";
import IntermediaryMatchSearch from "./templateStructureForCapture/intermediaryMatch/IntermediaryMatchSearch";

/* 홈페이지 게시판 */
import HomePageBoardMain from "./templateStructureForCapture/homepageBoard/HomePageBoardMain";
import HomePageBoardGreetings from "./templateStructureForCapture/homepageBoard/HomePageBoardGreetings";
import HomePageBoardHistory from "./templateStructureForCapture/homepageBoard/HomePageBoardHistory";
import HomePageBoardSearch from "./templateStructureForCapture/homepageBoard/HomePageBoardSearch";
import HomePageBoardMedia from "./templateStructureForCapture/homepageBoard/HomePageBoardMedia";
import HomePageBoardNews from "./templateStructureForCapture/homepageBoard/HomePageBoardNews";

/* 랜딩 소개 */
import LandingIntroduceMain from "./templateStructureForCapture/landingIntroduce/LandingIntroduceMain";

export const templateMapForCapture: {
  [key: string]: any;
} = {
  "쇼핑몰-메인": ShoppingMallMain,
  "쇼핑몰-상품목록": ShoppingMallProductList,
  "쇼핑몰-상품상세": ShoppingMallProductDetail,
  "쇼핑몰-주문목록": ShoppingMallOrderList,
  "쇼핑몰-장바구니": ShoppingMallCart,
  "쇼핑몰-공지사항": ShoppingMallNotice,
  "쇼핑몰-로그인": ShoppingMallLogin,
  "쇼핑몰-회원가입": ShoppingMallJoin,
  "쇼핑몰-회원탈퇴": ShoppingMallWidthDrawer,
  "쇼핑몰-아이디찾기": ShoppingMallFindId,
  "쇼핑몰-비밀번호찾기": ShoppingMallFindPw,
  "쇼핑몰-브랜드소개": ShoppingMallBrandIntroduce,

  "커뮤니티·sns-메인": CommunitySnsMain,
  "커뮤니티·sns-일반게시판": CommunitySnsBoard,
  "커뮤니티·sns-피드": CommunitySnsFeed,
  "커뮤니티·sns-Q&A게시판": CommunitySnsQna,
  "커뮤니티·sns-내프로필": CommunitySnsMyProfile,
  "커뮤니티·sns-회원탈퇴": CommunitySnsWithDrawer,
  "커뮤니티·sns-로그인": CommunitySnsLogin,
  "커뮤니티·sns-회원가입": CommunitySnsJoin,
  "커뮤니티·sns-아이디찾기": CommunitySnsFindId,
  "커뮤니티·sns-비밀번호찾기": CommunitySnsFindPw,

  "중개·매칭-메인": IntermediaryMatchMain,
  "중개·매칭-이용요금": IntermediaryMatchPrice,
  "중개·매칭-서비스소개": IntermediaryMatchServiceIntroduce,
  "중개·매칭-견적문의": IntermediaryMatchEstimateInquiry,
  "중개·매칭-FAQ": IntermediaryMatchFAQ,
  "중개·매칭-내프로필": IntermediaryMatchMyProfile,
  "중개·매칭-회원탈퇴": IntermediaryMatchWithDrawer,
  "중개·매칭-로그인": IntermediaryMatchLogin,
  "중개·매칭-회원가입": IntermediaryMatchJoin,
  "중개·매칭-아이디찾기": IntermediaryMatchFindId,
  "중개·매칭-비밀번호찾기": IntermediaryMatchFindPw,
  "중개·매칭-검색": IntermediaryMatchSearch,

  "홈페이지·게시판-메인": HomePageBoardMain,
  "홈페이지·게시판-인사말": HomePageBoardGreetings,
  "홈페이지·게시판-연혁": HomePageBoardHistory,
  "홈페이지·게시판-검색": HomePageBoardSearch,
  "홈페이지·게시판-미디어": HomePageBoardMedia,
  "홈페이지·게시판-뉴스": HomePageBoardNews,

  "랜딩·소개-메인": LandingIntroduceMain,
};
