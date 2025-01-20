function validateServiceIntroduce(response) {
  if (!response.content) return false;
  if (!response.content.intermediaryMatchServiceIntroductionTitle) return false;
  if (!response.content.intermediaryMatchServiceIntroductionDesc) return false;
  return true;
}
module.exports = validateServiceIntroduce;
