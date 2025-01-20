const valiateBoard = require('./validateBoard');

function validateValidateCommunitySns(response, depth2, cnt) {
  if (depth2 === '일반 게시판') return valiateBoard(response);
  return false;
}
module.exports = validateValidateCommunitySns;
