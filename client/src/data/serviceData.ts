const depth1KeyArr = [
  "main",
  "product",
  "customerService",
  "myPage",
  "utility",
  "board",
  "companyIntro",
] as const;

export type Tdepth1KeyTextArr = (typeof depth1KeyArr)[number];

type Tdepth1KeyText = {
  [K in Tdepth1KeyTextArr]: { eng: string; kor: string };
};

export const depth1KeyText: Tdepth1KeyText = {
  main: { eng: "main", kor: "메인" },
  product: { eng: "product", kor: "상품" },
  customerService: { eng: "customerService", kor: "고객센터" },
  myPage: { eng: "myPage", kor: "마이페이지" },
  utility: { eng: "utility", kor: "유틸리티" },
  board: { eng: "board", kor: "게시판" },
  companyIntro: { eng: "companyIntro", kor: "회사 소개" },
};

/* option */
const optionImage: T2depthOption = {
  eng: "image",
  kor: "이미지형",
  structure: "",
};
const optionText: T2depthOption = {
  eng: "text",
  kor: "텍스트형",
  structure: "",
};
const optionVideo: T2depthOption = {
  eng: "video",
  kor: "동영상형",
  structure: "",
};

/* 2depth */

interface I2depthText {
  eng: string;
  kor: string;
}

// export type T2depth =
//   | (I2depthText & {
//       isDefault: boolean;
//       options: T2depthOption[];
//     })
//   | (I2depthText & {
//       isDefault: boolean;
//       structure: string;
//     });

export interface T2depth extends I2depthText {
  isDefault: boolean;
  structure?: string;
  options?: T2depthOption[];
}
/* 메인 */
const main2depthKeyArr = ["main"] as const;
type Tmain2depthKey = (typeof main2depthKeyArr)[number];

type Tmain2depth = {
  [K in Tmain2depthKey]: T2depth;
};

export const main2depth: Tmain2depth = {
  main: { isDefault: true, eng: "main", kor: "메인", structure: "" },
};

/* 마이페이지 */
const profileText: I2depthText = { eng: "profile", kor: "내 프로필" };
const defaultProfile: T2depth = {
  isDefault: false,
  ...profileText,
  structure: "",
};

const orderListText: I2depthText = { eng: "order list", kor: "주문 목록" };
const defaultOrderList: T2depth = {
  isDefault: false,
  ...orderListText,
  structure: "",
};

const cartText: I2depthText = { eng: "cart", kor: "장바구니" };
const defaultCart: T2depth = { isDefault: false, ...cartText, structure: "" };

const membershipWithdrawalText: I2depthText = {
  eng: "membership withdrawal",
  kor: "회원 탈퇴",
};
const defaultMembershipWithdrawal: T2depth = {
  isDefault: false,
  ...membershipWithdrawalText,
  structure: "",
};

const couponText: I2depthText = { eng: "coupon", kor: "쿠폰" };
const couponOptions: T2depthOption[] = [
  {
    eng: "coupon download",
    kor: "쿠폰 다운로드",
    structure: "",
  },
  {
    eng: "coupon register",
    kor: "쿠폰 등록",
    structure: "",
  },
];
const defaultCoupon: T2depth = {
  isDefault: false,
  ...couponText,
  options: couponOptions,
};

const mileageText: I2depthText = { eng: "mileage", kor: "마일리지" };
const defaultMileage: T2depth = {
  isDefault: false,
  ...mileageText,
  structure: "",
};

const myPage2depthKeyArr = [
  "profile",
  "orderList",
  "cart",
  "membershipWithdrawal",
  "coupon",
  "mileage",
] as const;

type TmyPage2depthKey = (typeof myPage2depthKeyArr)[number];

type TmyPage2depth = {
  [K in TmyPage2depthKey]: T2depth;
};

const defaulTmyPage2depth: TmyPage2depth = {
  profile: defaultProfile,
  orderList: defaultOrderList,
  cart: defaultCart,
  membershipWithdrawal: defaultMembershipWithdrawal,
  coupon: defaultCoupon,
  mileage: defaultMileage,
};

export const myPage2depth = (service: Tservice): TmyPage2depth => {
  switch (service) {
    case "shoppingMall": {
      const update = {
        ...defaulTmyPage2depth,
        orderList: { ...defaulTmyPage2depth.orderList, isDefault: true },
        cart: { ...defaulTmyPage2depth.cart, isDefault: true },
      };
      return update;
    }
    case "communitySns": {
      const update = {
        ...defaulTmyPage2depth,
        profile: { ...defaulTmyPage2depth.profile, isDefault: true },
        orderList: { ...defaulTmyPage2depth.orderList, isDefault: true },
        cart: { ...defaulTmyPage2depth.cart, isDefault: true },
        membershipWithdrawal: {
          ...defaulTmyPage2depth.membershipWithdrawal,
          isDefault: true,
        },
      };
      return update;
    }
    case "intermediaryMatch": {
      const update = {
        ...defaulTmyPage2depth,
        profile: { ...defaulTmyPage2depth.profile, isDefault: true },
        membershipWithdrawal: {
          ...defaulTmyPage2depth.membershipWithdrawal,
          isDefault: true,
        },
      };
      return update;
    }
    default:
      return defaulTmyPage2depth;
  }
};

/* 유틸리티 */
const loginText: I2depthText = { eng: "login", kor: "로그인" };
const loginOptions: T2depthOption[] = [
  { eng: "social login", kor: "소셜 로그인", structure: "" },
];
const defaultLogin: T2depth = {
  isDefault: true,
  ...loginText,
  options: loginOptions,
};

const joinText: I2depthText = { eng: "join", kor: "회원가입" };
const defaultJoin: T2depth = { isDefault: true, ...joinText, structure: "" };

const findIdText: I2depthText = { eng: "find id", kor: "아이디 찾기" };
const defaultFindId: T2depth = {
  isDefault: true,
  ...findIdText,
  structure: "",
};

const findPwText: I2depthText = { eng: "find pw", kor: "비밀번호 찾기" };
const defaultFindPw: T2depth = {
  isDefault: true,
  ...findPwText,
  structure: "",
};

const searchText: I2depthText = { eng: "search", kor: "검색" };
const searchOptions: T2depthOption[] = [
  { eng: "normal search", kor: "일반 검색", structure: "" },
  { eng: "integration search", kor: "통합 검색", structure: "" },
];
const defaultSearch: T2depth = {
  isDefault: false,
  ...searchText,
  options: searchOptions,
};

const alarmText: I2depthText = { eng: "alarm", kor: "알림" };
const defaultAlarm: T2depth = { isDefault: false, ...alarmText, structure: "" };

const utility2depthKeyArr = [
  "login",
  "join",
  "findId",
  "findPw",
  "search",
  "alarm",
] as const;

type Tutility2depthKey = (typeof utility2depthKeyArr)[number];

type Tutility2depth = {
  [K in Tutility2depthKey]: T2depth;
};

export const defaultUtility2depth: Tutility2depth = {
  login: defaultLogin,
  join: defaultJoin,
  findId: defaultFindId,
  findPw: defaultFindPw,
  search: defaultSearch,
  alarm: defaultAlarm,
};

/* 상품 */
const productListText: I2depthText = { eng: "product list", kor: "상품 목록" };
const defaultProductList: T2depth = {
  isDefault: false,
  ...productListText,
  structure: "",
};

const productDetailText: I2depthText = {
  eng: "product detail",
  kor: "상품 상세",
};
const defaultProductDetail: T2depth = {
  isDefault: false,
  ...productDetailText,
  structure: "",
};

const productReviewText: I2depthText = { eng: "review", kor: "리뷰" };
const defaultReview: T2depth = {
  isDefault: false,
  ...productReviewText,
  structure: "",
};

const productIntroductionText: I2depthText = {
  eng: "product introduction",
  kor: "상품 소개",
};
const defaultProductIntroduction: T2depth = {
  isDefault: false,
  ...productIntroductionText,
  structure: "",
};

const product2depthKeyArr = [
  "productList",
  "productDetail",
  "review",
  "productIntroduction",
] as const;

type Tproduct2depthKey = (typeof product2depthKeyArr)[number];

type Tproduct2depth = {
  [K in Tproduct2depthKey]: T2depth;
};

const defaultProduct2depth: Tproduct2depth = {
  productList: defaultProductList,
  productDetail: defaultProductDetail,
  review: defaultReview,
  productIntroduction: defaultProductIntroduction,
};

export const product2depth = (service: Tservice): Tproduct2depth => {
  switch (service) {
    case "shoppingMall": {
      const update = {
        ...defaultProduct2depth,
        productList: { ...defaultProduct2depth.productList, isDefault: true },
        productDetail: {
          ...defaultProduct2depth.productDetail,
          isDefault: true,
        },
      };
      return update;
    }

    case "homepageBoard": {
      const update = {
        ...defaultProduct2depth,
        productIntroduction: {
          ...defaultProduct2depth.productIntroduction,
          isDefault: true,
        },
      };
      return update;
    }
    default:
      return defaultProduct2depth;
  }
};

/* 고객센터 */
const noticeText: I2depthText = { eng: "notice", kor: "공지사항" };
const noticeOptions: T2depthOption[] = [optionImage, optionText];
const defaultNotice: T2depth = {
  isDefault: false,
  ...noticeText,
  options: noticeOptions,
};

const faqText: I2depthText = { eng: "FAQ", kor: "FAQ" };
const defaultFaq: T2depth = { isDefault: false, ...faqText, structure: "" };

const personalInquiryText: I2depthText = {
  eng: "1:1 Inquiry",
  kor: "1:1 문의",
};
const defaultPersonalInquiry: T2depth = {
  isDefault: false,
  ...personalInquiryText,
  structure: "",
};

const userGuideText: I2depthText = { eng: "User Guide", kor: "사용자 가이드" };
const userGuideOptions: T2depthOption[] = [
  optionImage,
  optionText,
  optionVideo,
];
const defaultUserGuide: T2depth = {
  isDefault: false,
  ...userGuideText,
  options: userGuideOptions,
};

const termsAndConditionsOfUseText: I2depthText = {
  eng: "Terms and Conditions of Use",
  kor: "이용약관",
};
const defaultTermsAndConditionsOfUse: T2depth = {
  isDefault: false,
  ...termsAndConditionsOfUseText,
  structure: "",
};

const customerService2depthKeyArr = [
  "notice",
  "faq",
  "personalInquiry",
  "userGuide",
  "termsAndConditionsOfUse",
] as const;

type TcustomerService2depthKey = (typeof customerService2depthKeyArr)[number];

type TcustomerService2depth = {
  [K in TcustomerService2depthKey]: T2depth;
};

const defaultCustomerService2depth: TcustomerService2depth = {
  notice: defaultNotice,
  faq: defaultFaq,
  personalInquiry: defaultPersonalInquiry,
  userGuide: defaultUserGuide,
  termsAndConditionsOfUse: defaultTermsAndConditionsOfUse,
};

export const customerService2depth = (
  service: Tservice
): TcustomerService2depth => {
  switch (service) {
    case "shoppingMall": {
      const update = {
        ...defaultCustomerService2depth,
        notice: { ...defaultCustomerService2depth.notice, isDefault: true },
      };
      return update;
    }
    case "intermediaryMatch": {
      const update = {
        ...defaultCustomerService2depth,
        faq: { ...defaultCustomerService2depth.faq, isDefault: true },
        userGuide: {
          ...defaultCustomerService2depth.userGuide,
          isDefault: true,
        },
      };
      return update;
    }
    default:
      return defaultCustomerService2depth;
  }
};

/* 게시판 */
const normalBoardText: I2depthText = {
  eng: "normal board",
  kor: "일반 게시판",
};
const normalBoardOptions: T2depthOption[] = [
  optionImage,
  optionText,
  optionVideo,
];
const defaultNormalBoard: T2depth = {
  isDefault: false,
  ...normalBoardText,
  options: normalBoardOptions,
};

const mediaText: I2depthText = { eng: "media", kor: "미디어" };
const mediaOptions: T2depthOption[] = [optionImage, optionText, optionVideo];
const defaultMedia: T2depth = {
  isDefault: false,
  ...mediaText,
  options: mediaOptions,
};

const boardNewsText: I2depthText = { eng: "news", kor: "뉴스" };
const boardNewsOptions: T2depthOption[] = [
  optionImage,
  optionText,
  optionVideo,
];
const defaultBoardNews: T2depth = {
  isDefault: false,
  ...boardNewsText,
  options: boardNewsOptions,
};

const blogText: I2depthText = { eng: "blog", kor: "블로그" };
const blogOptions: T2depthOption[] = [optionImage, optionText];
const defaultBlog: T2depth = {
  isDefault: false,
  ...blogText,
  options: blogOptions,
};

const ceremonyText: I2depthText = { eng: "ceremony", kor: "행사" };
const ceremonyOptions: T2depthOption[] = [optionImage, optionText, optionVideo];
const defaultCeremony: T2depth = {
  isDefault: false,
  ...ceremonyText,
  options: ceremonyOptions,
};

const galleryText: I2depthText = { eng: "gallery", kor: "갤러리" };
const galleryOptions: T2depthOption[] = [optionImage, optionText, optionVideo];
const defaultGallery: T2depth = {
  isDefault: false,
  ...galleryText,
  options: galleryOptions,
};

const eventText: I2depthText = { eng: "event", kor: "이벤트" };
const eventOptions: T2depthOption[] = [optionImage, optionText];
const defaultEvent: T2depth = {
  isDefault: false,
  ...eventText,
  options: eventOptions,
};

const feedText: I2depthText = { eng: "feed", kor: "피드" };
const defaultFeed: T2depth = { isDefault: false, ...feedText, structure: "" };

const qnaBoardText: I2depthText = { eng: "Q&A board", kor: "Q&A 게시판" };
const defaultQnaBoard: T2depth = {
  isDefault: false,
  ...qnaBoardText,
  structure: "",
};

const reservationText: I2depthText = { eng: "reservation", kor: "예약" };
const defaultReservation: T2depth = {
  isDefault: false,
  ...reservationText,
  structure: "",
};

const calendarText: I2depthText = { eng: "calendar", kor: "캘린더" };
const defaultCalendar: T2depth = {
  isDefault: false,
  ...calendarText,
  structure: "",
};

const board2depthKeyArr = [
  "normalBoard",
  "media",
  "news",
  "blog",
  "ceremony",
  "gallery",
  "event",
  "feed",
  "qnaBoard",
  "reservation",
  "calendar",
] as const;

type Tboard2depthKey = (typeof board2depthKeyArr)[number];

type Tboard2depth = {
  [K in Tboard2depthKey]: T2depth;
};

const defaultBoard2depth: Tboard2depth = {
  normalBoard: defaultNormalBoard,
  media: defaultMedia,
  news: defaultBoardNews,
  blog: defaultBlog,
  ceremony: defaultCeremony,
  gallery: defaultGallery,
  event: defaultEvent,
  feed: defaultFeed,
  qnaBoard: defaultQnaBoard,
  reservation: defaultReservation,
  calendar: defaultCalendar,
};

export const board2depth = (service: Tservice): Tboard2depth => {
  switch (service) {
    case "communitySns": {
      const update = {
        ...defaultBoard2depth,
        normalBoard: { ...defaultBoard2depth.normalBoard, isDefault: true },
        feed: {
          ...defaultBoard2depth.feed,
          isDefault: false,
        },
        qnaBoard: {
          ...defaultBoard2depth.qnaBoard,
          isDefault: false,
        },
      };
      return update;
    }
    case "homepageBoard": {
      const update = {
        ...defaultBoard2depth,
        media: { ...defaultBoard2depth.media, isDefault: true },
        news: {
          ...defaultBoard2depth.news,
          isDefault: true,
        },
      };
      return update;
    }
    case "landingIntroduce":
      return defaultBoard2depth;
    default:
      return defaultBoard2depth;
  }
};

/* 서비스 */
const feeForUseText: I2depthText = { eng: "fee for use", kor: "요금안내" };
const defaultFeeForUse: T2depth = {
  isDefault: true,
  ...feeForUseText,
  structure: "",
};

const serviceListText: I2depthText = {
  eng: "service list",
  kor: "서비스 목록",
};
const defaultServiceList: T2depth = {
  isDefault: false,
  ...serviceListText,
  structure: "",
};

const serviceDetailText: I2depthText = {
  eng: "service detail",
  kor: "서비스 상세",
};
const defaultServiceDetail: T2depth = {
  isDefault: false,
  ...serviceDetailText,
  structure: "",
};

const serviceReviewText: I2depthText = { eng: "review", kor: "리뷰" };
const defaultServiceReview: T2depth = {
  isDefault: false,
  ...serviceReviewText,
  structure: "",
};

const serviceIntroduceText: I2depthText = {
  eng: "service introduce",
  kor: "서비스 소개",
};
const serviceIntroduceOptions: T2depthOption[] = [
  { eng: "one page", kor: "원페이지형", structure: "" },
  { eng: "text list", kor: "목록형(텍스트)", structure: "" },
  { eng: "image list", kor: "목록형(이미지)", structure: "" },
];
const defaultServiceIntroduce: T2depth = {
  isDefault: true,
  ...serviceIntroduceText,
  options: serviceIntroduceOptions,
};

const estimateInquiryText: I2depthText = {
  eng: "estimate inquiry",
  kor: "견적문의",
};
const defaultEstimateInquiry: T2depth = {
  isDefault: true,
  ...estimateInquiryText,
  structure: "",
};

const serviceInquiryText: I2depthText = {
  eng: "service inquiry",
  kor: "서비스 문의",
};
const defaultServiceInquiry: T2depth = {
  isDefault: true,
  ...serviceInquiryText,
  structure: "",
};

const service2depthKeyArr = [
  "feeForUse",
  "serviceList",
  "serviceDetail",
  "review",
  "serviceIntroduce",
  "estimateInquiry",
  "serviceInquiry",
] as const;

type Tservice2depthKey = (typeof service2depthKeyArr)[number];

type Tservice2depth = {
  [K in Tservice2depthKey]: T2depth;
};

export const defaultService2depth: Tservice2depth = {
  feeForUse: defaultFeeForUse,
  serviceList: defaultServiceList,
  serviceDetail: defaultServiceDetail,
  review: defaultServiceReview,
  serviceIntroduce: defaultServiceIntroduce,
  estimateInquiry: defaultEstimateInquiry,
  serviceInquiry: defaultServiceInquiry,
};

/* 회사 소개 */
const greetingText: I2depthText = { eng: "greetings", kor: "인사말" };
const defaultGreeting: T2depth = {
  isDefault: false,
  ...greetingText,
  structure: "",
};

const companyInfoText: I2depthText = { eng: "company info", kor: "회사소개" };
const defaultCompanyInfo: T2depth = {
  isDefault: false,
  ...companyInfoText,
  structure: "",
};

const historyText: I2depthText = { eng: "history", kor: "연혁" };
const defaultHistory: T2depth = {
  isDefault: false,
  ...historyText,
  structure: "",
};

const inquiryText: I2depthText = { eng: "inquiry", kor: "문의" };
const defaultInquiry: T2depth = {
  isDefault: false,
  ...inquiryText,
  structure: "",
};

const recruitText: I2depthText = { eng: "recruit", kor: "채용" };
const defaultRecruit: T2depth = {
  isDefault: false,
  ...recruitText,
  structure: "",
};

const directionText: I2depthText = { eng: "direction", kor: "오시는 길" };
const defaultDirection: T2depth = {
  isDefault: false,
  ...directionText,
  structure: "",
};

const companyNewsText: I2depthText = { eng: "news", kor: "뉴스" };
const companyNewsOptions: T2depthOption[] = [
  optionImage,
  optionText,
  optionVideo,
];
const defaultCompanyNews: T2depth = {
  isDefault: false,
  ...companyNewsText,
  options: companyNewsOptions,
};

const cibiText: I2depthText = { eng: "CI/BI", kor: "CI/BI" };
const defaultCibi: T2depth = { isDefault: false, ...cibiText, structure: "" };

const companyIntro2depthKeyArr = [
  "greeting",
  "companyInfo",
  "history",
  "inquiry",
  "recruit",
  "direction",
  "news",
  "ciBi",
] as const;

type TcompanyIntro2depthKey = (typeof companyIntro2depthKeyArr)[number];

type TcompanyIntro2depth = {
  [K in TcompanyIntro2depthKey]: T2depth;
};

const defaultCompanyIntro2depth: TcompanyIntro2depth = {
  greeting: defaultGreeting,
  companyInfo: defaultCompanyInfo,
  history: defaultHistory,
  inquiry: defaultInquiry,
  recruit: defaultRecruit,
  direction: defaultDirection,
  news: defaultCompanyNews,
  ciBi: defaultCibi,
};

export const companyIntro2depth = (service: Tservice): TcompanyIntro2depth => {
  switch (service) {
    case "homepageBoard": {
      const update = {
        ...defaultCompanyIntro2depth,
        greeting: { ...defaultCompanyIntro2depth.greeting, isDefault: true },
        companyInfo: {
          ...defaultCompanyIntro2depth.companyInfo,
          isDefault: true,
        },
        history: { ...defaultCompanyIntro2depth.history, isDefault: true },
        recruit: { ...defaultCompanyIntro2depth.recruit, isDefault: true },
        news: { ...defaultCompanyIntro2depth.news, isDefault: true },
      };
      return update;
    }
    case "landingIntroduce": {
      const update = {
        ...defaultCompanyIntro2depth,
        greeting: { ...defaultCompanyIntro2depth.greeting, isDefault: true },
        inquiry: { ...defaultCompanyIntro2depth.inquiry, isDefault: true },
        direction: {
          ...defaultCompanyIntro2depth.direction,
          isDefault: true,
        },
        news: { ...defaultCompanyIntro2depth.news, isDefault: true },
      };
      return update;
    }
    default:
      return defaultCompanyIntro2depth;
  }
};

/* all 2depth */

export type Tall2depth =
  | Tmain2depth
  | TmyPage2depth
  | Tutility2depth
  | Tproduct2depth
  | TcustomerService2depth
  | Tboard2depth
  | Tservice2depth
  | TcompanyIntro2depth;

export type Tall2depthKeys =
  | Tmain2depthKey
  | TmyPage2depthKey
  | Tutility2depthKey
  | Tproduct2depthKey
  | TcustomerService2depthKey
  | Tboard2depthKey
  | Tservice2depthKey
  | TcompanyIntro2depthKey;

/* 1depth */

const shoppingMall1depthKeyArr = [
  "main",
  "product",
  "customerService",
  "myPage",
  "utility",
] as const;

type TshoppingMall1depthKey = (typeof shoppingMall1depthKeyArr)[number];

type TshoppingMall1depth = {
  [K in TshoppingMall1depthKey]: Tall2depth;
};

export const shoppingMall1depth: TshoppingMall1depth = {
  main: main2depth,
  product: product2depth("shoppingMall"),
  customerService: customerService2depth("shoppingMall"),
  myPage: myPage2depth("shoppingMall"),
  utility: defaultUtility2depth,
};

const communitySns1depthKeyArr = [
  "main",
  "board",
  "myPage",
  "utility",
] as const;

type TcommunitySns1depthKey = (typeof communitySns1depthKeyArr)[number];

type TcommunitySns1depth = {
  [K in TcommunitySns1depthKey]: Tall2depth;
};

export const communitySns1depth: TcommunitySns1depth = {
  main: main2depth,
  board: board2depth("communitySns"),
  myPage: myPage2depth("communitySns"),
  utility: defaultUtility2depth,
};

const intermediaryMatch1depthKeyArr = [
  "main",
  "service",
  "customerService",
  "myPage",
  "utility",
] as const;

type TintermediaryMatch1depthKey =
  (typeof intermediaryMatch1depthKeyArr)[number];

type TintermediaryMatch1depth = {
  [K in TintermediaryMatch1depthKey]: Tall2depth;
};

export const intermediaryMatch1depth: TintermediaryMatch1depth = {
  main: main2depth,
  service: defaultService2depth,
  customerService: customerService2depth("intermediaryMatch"),
  myPage: myPage2depth("intermediaryMatch"),
  utility: defaultUtility2depth,
};

const homePageBoard1depthKeyArr = [
  "main",
  "companyIntro",
  "product",
  "board",
] as const;

type ThomePageBoard1depthKey = (typeof homePageBoard1depthKeyArr)[number];

type ThomePageBoard1depth = {
  [K in ThomePageBoard1depthKey]: Tall2depth;
};

export const homepageBoard1depth: ThomePageBoard1depth = {
  main: main2depth,
  companyIntro: companyIntro2depth("homepageBoard"),
  product: product2depth("homepageBoard"),
  board: board2depth("homepageBoard"),
};

const landingIntroduce1depthKeyArr = [
  "main",
  "companyIntro",
  "product",
  "board",
] as const;

type TlandingIntroduce1depthKey = (typeof landingIntroduce1depthKeyArr)[number];

type TlandingIntroduce1depth = {
  [K in TlandingIntroduce1depthKey]: Tall2depth;
};

export const landingIntroduce1depth: TlandingIntroduce1depth = {
  main: main2depth,
  companyIntro: companyIntro2depth("landingIntroduce"),
  product: product2depth("landingIntroduce"),
  board: board2depth("landingIntroduce"),
};

export type TallDepth1Keys =
  | TshoppingMall1depthKey
  | TcommunitySns1depthKey
  | TintermediaryMatch1depthKey
  | ThomePageBoard1depthKey
  | TlandingIntroduce1depthKey;

/* service data */

const serviceKeyArr = [
  "shoppingMall",
  "communitySns",
  "intermediaryMatch",
  "homepageBoard",
  "landingIntroduce",
] as const;

export type TserviceDataKey = (typeof serviceKeyArr)[number];

type ServiceTypeMapping = {
  shoppingMall: TshoppingMall1depth;
  communitySns: TcommunitySns1depth;
  intermediaryMatch: TintermediaryMatch1depth;
  homepageBoard: ThomePageBoard1depth;
  landingIntroduce: TlandingIntroduce1depth;
};

export type TserviceDataType<T extends TserviceDataKey> = ServiceTypeMapping[T];

export const serviceData: TserviceData = {
  shoppingMall: shoppingMall1depth,
  communitySns: communitySns1depth,
  intermediaryMatch: intermediaryMatch1depth,
  homepageBoard: homepageBoard1depth,
  landingIntroduce: landingIntroduce1depth,
};

export type TDepth1KeyForService<T extends TserviceDataKey> =
  keyof TserviceDataType<T>;

type TserviceData = {
  [T in TserviceDataKey]: TserviceDataType<T>;
};
