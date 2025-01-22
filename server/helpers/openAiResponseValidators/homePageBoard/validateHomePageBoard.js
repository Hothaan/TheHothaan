const validateMain = require('./validateMain');

function validateHomePageBoard(response, depth2, cnt) {
  if (depth2 === '메인') return validateMain(response);
}
module.exports = validateHomePageBoard;
