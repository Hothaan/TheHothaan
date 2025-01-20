function validateQnaBoard(response) {
  if (!response.content) return false;
  if (!response.content.qnaTitle) return false;
  return true;
}
module.exports = validateQnaBoard;
