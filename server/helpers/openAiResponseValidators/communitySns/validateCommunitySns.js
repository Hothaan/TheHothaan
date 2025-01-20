const valiateBoard = require('./validateBoard');
const validateFeed = require('./validateFeed');

function validateValidateCommunitySns(response, depth2, cnt) {
  if (depth2 === '일반 게시판') return valiateBoard(response);
  if (depth2 === '피드') return validateFeed(response);
  return false;
}
module.exports = validateValidateCommunitySns;
