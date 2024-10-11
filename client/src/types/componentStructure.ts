export interface IHeader {
  title?: string;
  navigation?: string[];
}

export interface IFooter {
  copyright: string;
  links: string[];
}

export interface ILogin {
  username: string;
  password: string;
}

export interface ISearch {
  query: string;
  results: string[];
}

export interface IReview {
  title: string;
  content: string;
  rating: number;
}

export interface IPayment {
  totalPrice: number;
  paymentMethods: string[];
}

export interface ICartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface ICart {
  items: ICartItem[];
}

export interface IOrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface IOrderManagement {
  orders: {
    id: string;
    status: string;
    items: IOrderItem[];
  }[];
}

export interface IPost {
  content: string;
  author: string;
}

export interface IComment {
  commentText: string;
  author: string;
}

export interface IProfile {
  username: string;
  bio: string;
}

export interface IcomponentStructure {
  common: {
    header: IHeader;
    footer: IFooter;
    login: ILogin;
    search: ISearch;
  };
  shoppingMall: {
    review: IReview;
    payment: IPayment;
    cart: ICart;
    orderManagement: IOrderManagement;
  };
  communitySns: {
    post: IPost;
    comment: IComment;
    profile: IProfile;
  };
  dashboardStats: {};
  intermediaryMatch: {};
  homepageBoard: {};
  landingIntroduce: {};
}
