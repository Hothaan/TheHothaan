function mainValidator(response) {
  if (!response.content) return false;
  if (!response.content.mainBannerTitle) return false;
  if (!response.content.mainBannerDesc) return false;
  if (!response.content.mainBannerButton) return false;
  // if (!response.content.productListTitle) return false;
  // if (!response.content.productListDesc) return false;
  // if (!response.content.reviewInfo) return false;
  // if (!response.content.reviewTitle) return false;
  // if (!response.content.reviewDesc) return false;
  // if (!response.content.reviewName) return false;
  // if (!response.content.reviewRole) return false;
  // if (!response.content.productListItemTitle) return false;
  // if (!response.content.productListItemDesc) return false;
  // if (!response.content.serviceIntroductionTitle) return false;
  // if (!response.content.serviceIntroductionDesc) return false;
  // if (!response.content.serviceContactTitle) return false;
  // if (!response.content.serviceContactButton) return false;
  return true;
}

module.exports = mainValidator;
