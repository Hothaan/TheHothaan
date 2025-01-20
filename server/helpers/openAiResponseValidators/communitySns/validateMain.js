function validateMain(response) {
  if (!response.content) return false;
  if (!response.content.mainBannerTitle) return false;
  if (!response.content.mainBannerDesc) return false;
  if (!response.content.mainBannerButton) return false;
  if (!response.content.noticeTitle) return false;
  if (!response.content.noticeDesc) return false;
  if (!response.content.boardTitle) return false;
  if (!response.content.newsTitle) return false;
  if (!response.content.faqTitle) return false;
  if (!response.content.faqDesc) return false;
  if (!response.content.serviceContactTitle) return false;
  if (!response.content.serviceContactButton) return false;
  return true;
}
module.exports = validateMain;
