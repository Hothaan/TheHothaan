function validateFeed(response) {
  if (!response.content) return false;
  if (!response.content.feedTitle) return false;
  return true;
}
module.exports = validateFeed;
