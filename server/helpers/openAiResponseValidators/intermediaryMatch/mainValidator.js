function mainValidator(response) {
  if (!response.content) return false;
  if (!response.content.mainBannerTitle) return false;
  if (!response.content.mainBannerDesc) return false;
  if (!response.content.mainBannerButton) return false;
  if (!response.content.MatchingServiceIntroduceMainBannerTitle) return false;
  if (!response.content.MatchingServiceIntroduceMainBannerDesc) return false;
  if (!response.content.MatchingServiceIntroduceMainItemTitle) return false;
  if (!response.content.MatchingServiceIntroduceMainItemDesc) return false;
  if (!response.content.productIntroduceImageDesc) return false;
  if (!response.content.productIntroduceTitle) return false;
  if (!response.content.productIntroduceDesc) return false;
  if (!response.content.reviewTitle) return false;
  if (!response.content.reviewDesc) return false;
  if (!response.content.reviewName) return false;
  if (!response.content.reviewRole) return false;
  if (!response.content.priceMainDesc) return false;
  if (!response.content.exploreServiceTitle) return false;
  if (!response.content.exploreServiceButton) return false;
  if (!response.content.exploreServiceExploreTitle) return false;
  if (!response.content.exploreServiceExploreButton) return false;
  return true;
}
module.exports = mainValidator;
