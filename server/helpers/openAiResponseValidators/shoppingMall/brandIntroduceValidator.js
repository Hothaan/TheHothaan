function validateBrandIntroduce(response) {
  if (!response.content) return false;
  if (!response.content.brandIntroduceBannerTitle) return false;
  if (!response.content.brandIntroduceBannerDesc) return false;
  if (!response.content.brandIntroduceItemTitle) return false;
  if (!response.content.brandIntroduceItemDesc) return false;
  return true;
}
module.exports = validateBrandIntroduce;
