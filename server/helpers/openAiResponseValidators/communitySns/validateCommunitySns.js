const valiateBoard = require('./validateBoard');
const validateFeed = require('./validateFeed');
const validateMain = require('./validateMain');
const validateQnaBoard = require('./validateQnaBoard');

function validateValidateCommunitySns(response, depth2, cnt) {
  if (depth2 === '일반 게시판') return valiateBoard(response);
  if (depth2 === '피드') return validateFeed(response);
  if (depth2 === '메인') return validateMain(response);
  if (depth2 === 'Q&A 게시판') return validateQnaBoard(response);
  return false;
}
module.exports = validateValidateCommunitySns;
