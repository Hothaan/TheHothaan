function validateHistory(response) {
  if (!response.content) return false;
  if (!response.content.historyDesc) return false;
  return true;
}
module.exports = validateHistory;
