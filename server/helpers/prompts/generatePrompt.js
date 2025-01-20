const generateShoppingMallPrompt = require('./shoppingMall');

function generatePrompt(serviceDetails) {
  const { service } = serviceDetails;
  if (service === '쇼핑몰') return generateShoppingMallPrompt(serviceDetails);
}
module.exports = generatePrompt;
