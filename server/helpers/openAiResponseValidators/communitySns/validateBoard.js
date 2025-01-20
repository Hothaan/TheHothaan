function valiateBoard(response) {
  if (!response.content) return false;
  if (!response.content.boardTitle) return false;
  if (!response.content.boardDesc) return false;
  return true;
}
module.exports = valiateBoard;
