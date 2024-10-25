import { T2depth } from "./types";
import { I2depthText } from "./types";
import { optionImage, optionText, optionVideo } from "../option/option";

/* 게시판 */
export const normalBoardText: I2depthText = {
  eng: "normal board",
  kor: "일반 게시판",
};
export const normalBoardOptions: T2depthOption[] = [
  optionImage,
  optionText,
  optionVideo,
];
export const defaultNormalBoard: T2depth = {
  isDefault: false,
  isSelected: false,
  ...normalBoardText,
  options: normalBoardOptions,
};

export const mediaText: I2depthText = { eng: "media", kor: "미디어" };
export const mediaOptions: T2depthOption[] = [
  optionImage,
  optionText,
  optionVideo,
];
export const defaultMedia: T2depth = {
  isDefault: false,
  isSelected: false,
  ...mediaText,
  options: mediaOptions,
};

export const boardNewsText: I2depthText = { eng: "news", kor: "뉴스" };
export const boardNewsOptions: T2depthOption[] = [
  optionImage,
  optionText,
  optionVideo,
];
export const defaultBoardNews: T2depth = {
  isDefault: false,
  isSelected: false,
  ...boardNewsText,
  options: boardNewsOptions,
};

export const blogText: I2depthText = { eng: "blog", kor: "블로그" };
export const blogOptions: T2depthOption[] = [optionImage, optionText];
export const defaultBlog: T2depth = {
  isDefault: false,
  isSelected: false,
  ...blogText,
  options: blogOptions,
};

export const ceremonyText: I2depthText = { eng: "ceremony", kor: "행사" };
export const ceremonyOptions: T2depthOption[] = [
  optionImage,
  optionText,
  optionVideo,
];
export const defaultCeremony: T2depth = {
  isDefault: false,
  isSelected: false,
  ...ceremonyText,
  options: ceremonyOptions,
};

export const galleryText: I2depthText = { eng: "gallery", kor: "갤러리" };
export const galleryOptions: T2depthOption[] = [
  optionImage,
  optionText,
  optionVideo,
];
export const defaultGallery: T2depth = {
  isDefault: false,
  isSelected: false,
  ...galleryText,
  options: galleryOptions,
};

export const eventText: I2depthText = { eng: "event", kor: "이벤트" };
export const eventOptions: T2depthOption[] = [optionImage, optionText];
export const defaultEvent: T2depth = {
  isDefault: false,
  isSelected: false,
  ...eventText,
  options: eventOptions,
};

export const feedText: I2depthText = { eng: "feed", kor: "피드" };
export const defaultFeed: T2depth = {
  isDefault: false,
  isSelected: false,
  ...feedText,
  structure: "",
};

export const qnaBoardText: I2depthText = {
  eng: "Q&A board",
  kor: "Q&A 게시판",
};
export const defaultQnaBoard: T2depth = {
  isDefault: false,
  isSelected: false,
  ...qnaBoardText,
  structure: "",
};

export const reservationText: I2depthText = { eng: "reservation", kor: "예약" };
export const defaultReservation: T2depth = {
  isDefault: false,
  isSelected: false,
  ...reservationText,
  structure: "",
};

export const calendarText: I2depthText = { eng: "calendar", kor: "캘린더" };
export const defaultCalendar: T2depth = {
  isDefault: false,
  isSelected: false,
  ...calendarText,
  structure: "",
};

export const board2depthKeyArr = [
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

export type Tboard2depthKey = (typeof board2depthKeyArr)[number];

export type Tboard2depth = {
  [K in Tboard2depthKey]: T2depth;
};

export const defaultBoard2depth: Tboard2depth = {
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
          isSelected: true,
        },
        qnaBoard: {
          ...defaultBoard2depth.qnaBoard,
          isDefault: false,
          isSelected: true,
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
          isSelected: true,
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
