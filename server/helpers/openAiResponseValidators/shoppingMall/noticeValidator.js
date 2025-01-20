function validateNotice(response) {
  if (!response.content) return false;
  if (!response.content.noticeTitle) return false;
  return true;
}
module.exports = validateNotice;
