function mainValidator(response) {
  if (!response.content) return false;
  if (!response.content.mainBannerTitle) return false;
  if (!response.content.mainBannerDesc) return false;
  if (!response.content.mainBannerButton) return false;
  return true;
}

module.exports = mainValidator;
