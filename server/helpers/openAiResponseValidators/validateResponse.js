const validateForShoppingMall = require('./shoppingMall/validateForShoppipngMall');

function validateResponse(response, service, depth2, cnt) {
  if (!response.menu || !response.feature || !response.content) return false;
  if (service === '쇼핑몰') return validateForShoppingMall(response, depth2, cnt);
  return false;
}
module.exports = validateResponse;
