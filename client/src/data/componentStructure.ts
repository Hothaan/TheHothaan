export const componentStructure: IcomponentStructure = {
  common: {
    header: ["title", "navigation"],
    login: ["title", "usernamePlaceholder"],
    search: ["title", "searchPlaceholder"],
    FAQ: ["title", "description", "faqList"],
    footer: ["title", "description", "links"],
    banner: ["title", "description", "imageUrl"],
    slider: ["title", "slidesCount"],
    card: ["title", "description", "imageUrl"],
  },
  shoppingMall: {
    review: ["title", "content"],
    payment: ["title", "amount", "method"],
    cart: ["title", "itemsCount"],
    orderManagement: ["title", "orders"],
  },
};
