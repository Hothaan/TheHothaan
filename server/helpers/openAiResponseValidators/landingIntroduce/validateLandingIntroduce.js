const validateMain = require('./validateMain');

function validateLandingIntroduce(response, depth2, cnt) {
  if (depth2 === '메인') return validateMain(response);
  return false;
}
module.exports = validateLandingIntroduce;
