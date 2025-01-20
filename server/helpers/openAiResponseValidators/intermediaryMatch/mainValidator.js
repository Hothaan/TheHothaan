function mainValidator(response) {
  if (!response.content) return false;
  if (!response.content.mainBannerTitle) return false;
  if (!response.content.mainBannerDesc) return false;
  if (!response.content.mainBannerButton) return false;
  if (!response.content.MatchingServiceIntroduceMainBannerTitle) return false;
  if (!response.content.MatchingServiceIntroduceMainBannerDesc) return false;
  if (!response.content.MatchingServiceIntroduceMainItemTitle) return false;
  if (!response.content.MatchingServiceIntroduceMainItemDesc) return false;
  if (!response.content.productIntroduce) return false;
  if (!response.content.ReviewTitle) return false;
  if (!response.content.ReviewDesc) return false;
  if (!response.content.ReviewName) return false;
  if (!response.content.ReviewRole) return false;
  if (!response.content.PriceMainDesc) return false;
  if (!response.content.exploreServiceTitle) return false;
  if (!response.content.exploreServiceButton) return false;
  if (!response.content.exploreServiceExploreTitle) return false;
  if (!response.content.exploreServiceExploreButton) return false;
  return true;
}
module.exports = mainValidator;
