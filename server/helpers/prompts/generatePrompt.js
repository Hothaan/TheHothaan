const generateIntermediaryMatchPrompt = require('./IntermediaryMatch');
const generateShoppingMallPrompt = require('./shoppingMall');

function generatePrompt(serviceDetails) {
  const { service } = serviceDetails;
  if (service === '쇼핑몰') return generateShoppingMallPrompt(serviceDetails);
  if (service === '중개·매칭') return generateIntermediaryMatchPrompt(serviceDetails);
}
module.exports = generatePrompt;
