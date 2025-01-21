const generateCommunitySnsPrompts = require('./communitySns');
const generateIntermediaryMatchPrompt = require('./IntermediaryMatch');
const generateShoppingMallPrompt = require('./shoppingMall');

exports.generatePrompt = function generatePrompt(serviceDetails) {
  const { service } = serviceDetails;
  if (service === '쇼핑몰') return generateShoppingMallPrompt(serviceDetails);
  if (service === '중개·매칭') return generateIntermediaryMatchPrompt(serviceDetails);
  if (service === '커뮤니티·sns') return generateCommunitySnsPrompts(serviceDetails);
};
