function validatePrice(response) {
  if (!response.content) return false;
  if (!response.content.priceMainDesc) return false;
  return true;
}
module.exports = validatePrice;
