const validateGreeting = require('./validateGreeting');
const validateHistory = require('./validateHistory');
const validateMain = require('./validateMain');
const validateNews = require('./validateNews');

function validateHomePageBoard(response, depth2, cnt) {
  if (depth2 === '메인') return validateMain(response);
  if (depth2 === '인사말') return validateGreeting(response);
  if (depth2 === '연혁') return validateHistory(response);
  if (depth2 === '뉴스') return validateNews(response);
}
module.exports = validateHomePageBoard;
