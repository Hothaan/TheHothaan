const validateGreeting = require('./validateGreeting');
const validateMain = require('./validateMain');

function validateHomePageBoard(response, depth2, cnt) {
  if (depth2 === '메인') return validateMain(response);
  if (depth2 === '인사말') return validateGreeting(response);
}
module.exports = validateHomePageBoard;
