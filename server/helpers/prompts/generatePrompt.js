const generateCommunitySnsPrompts = require('./communitySns');
const generateHomepageBoardPrompts = require('./homepageBoard');
const generateIntermediaryMatchPrompt = require('./IntermediaryMatch');
const generateLandingIntoducesPrompts = require('./landingIntoducesPrompts');
const generateShoppingMallPrompt = require('./shoppingMall');

function generatePrompt(serviceDetails) {
  const { service } = serviceDetails;
  if (service === '쇼핑몰') return generateShoppingMallPrompt(serviceDetails);
  if (service === '중개·매칭') return generateIntermediaryMatchPrompt(serviceDetails);
  if (service === '커뮤니티·sns') return generateCommunitySnsPrompts(serviceDetails);
  if (service === '홈페이지·게시판') return generateHomepageBoardPrompts(serviceDetails);
  if (service === '랜딩·소개') return generateLandingIntoducesPrompts(serviceDetails);
}
module.exports = generatePrompt;
