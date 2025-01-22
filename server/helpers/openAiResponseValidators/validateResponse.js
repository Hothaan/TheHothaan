const validateValidateCommunitySns = require('./communitySns/validateCommunitySns');
const validateHomePageBoard = require('./homePageBoard/validateHomePageBoard');
const validateForIntermediaryMatch = require('./intermediaryMatch/validateForIntermediaryMatch');
const validateLandingIntroduce = require('./landingIntroduce/validateLandingIntroduce');
const validateForShoppingMall = require('./shoppingMall/validateForShoppipngMall');

function validateResponse(response, service, depth2, cnt) {
  if (!response.menu || !response.feature || !response.content) return false;
  if (service === '쇼핑몰') return validateForShoppingMall(response, depth2, cnt);
  if (service === '중개·매칭') return validateForIntermediaryMatch(response, depth2, cnt);
  if (service === '커뮤니티·sns') return validateValidateCommunitySns(response, depth2, cnt);
  if (service === '홈페이지·게시판') return validateHomePageBoard(response, depth2, cnt);
  if (service === '랜딩·소개') return validateLandingIntroduce(response, depth2, cnt);
  return false;
}
module.exports = validateResponse;
