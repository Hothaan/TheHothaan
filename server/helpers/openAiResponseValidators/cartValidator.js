function validateCartText(response) {
  if (!response.content) return false;
  if (!response.content.cartTitle) return false;
  return true;
}
module.exports = validateCartText;
