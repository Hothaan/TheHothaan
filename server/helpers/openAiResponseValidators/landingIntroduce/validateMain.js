function validateMain(response) {
  if (!response.content) return false;
  if (!response.content.mainBannerTitle) return false;
  if (!response.content.mainBannerDesc) return false;
  if (!response.content.mainBannerButton) return false;
  if (!response.content.serviceIntroduceTitle) return false;
  if (!response.content.serviceIntroduceDesc) return false;
  if (!response.content.productIntroduceImageDesc1) return false;
  if (!response.content.productIntroduceTitle1) return false;
  if (!response.content.productIntroduceDesc1) return false;
  if (!response.content.productIntroduceImageDesc2) return false;
  if (!response.content.productIntroduceTitle2) return false;
  if (!response.content.productIntroduceDesc2) return false;
  if (!response.content.noticeTitle) return false;
  if (!response.content.noticeDesc) return false;
  if (!response.content.recruitTitle) return false;
  if (!response.content.recruitDesc) return false;
  if (!response.content.newsTitle) return false;
  if (!response.content.exploreServiceTitle) return false;
  if (!response.content.exploreServiceButton) return false;
  if (!response.content.exploreServiceExploreTitle) return false;
  if (!response.content.exploreServiceExploreButton) return false;
  return true;
}
module.exports = validateMain;
