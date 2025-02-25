function validateBrandIntroduce(response) {
  if (!response.content) return false;
  if (!response.content.brandIntroduceBannerTitle) return false;
  if (!response.content.brandIntroduceBannerDesc) return false;
  if (!response.content.brandIntroduceItemTitle1) return false;
  if (!response.content.brandIntroduceItemDesc1) return false;
  if (!response.content.brandIntroduceItemTitle2) return false;
  if (!response.content.brandIntroduceItemDesc2) return false;

  return true;
}
module.exports = validateBrandIntroduce;
