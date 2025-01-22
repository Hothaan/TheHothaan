function validateNews(response) {
  if (!response.content) return false;
  if (!response.content.newsTitle) return false;
  if (!response.content.newsDesc) return false;
  return true;
}
module.exports = validateNews;
