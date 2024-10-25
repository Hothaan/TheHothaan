export const commonStructureData: IStructureData = {
  common: {
    header: `{ title: string; navigation: string[]; }`,
    footer: `{ copyright: string; links: string[]; }`,
    login: `{ username: string; password: string; }`,
    search: `{ query: string; results: string[]; }`,
  },
  shoppingMall: {
    review: `{ title: string; content: string; rating: number; }`,
    payment: `{ totalPrice: number; paymentMethods: string[]; }`,
    cart: `{ items: { id: string; name: string; price: number; quantity: number; }[]; }`,
    orderManagement: `{ orders: { id: string; status: string; items: { id: string; name: string; price: number; quantity: number }[]; }`,
  },
  communitySns: {
    post: `{ content: string; author: string; }`,
    comment: `{ commentText: string; author: string; }`,
    profile: `{ username: string; bio: string; }`,
  },
  dashboardStats: {},
  intermediaryMatch: {},
  homepageBoard: {},
  landingIntroduce: {},
};
