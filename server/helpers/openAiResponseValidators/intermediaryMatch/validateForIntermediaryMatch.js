const mainValidator = require('./mainValidator');
const validatePrice = require('./validatePrice');
const validateSearch = require('./validateSearch');
const validateServiceIntroduce = require('./validateServiceIntroduce');

function validateForIntermediaryMatch(response, depth2, cnt) {
  if (depth2 === '메인') return mainValidator(response);
  if (depth2 === '이용 요금') return validatePrice(response);
  if (depth2 === '검색') return validateSearch(response);
  if (depth2 === '서비스 소개') return validateServiceIntroduce(response);
  return false;
}

module.exports = validateForIntermediaryMatch;
