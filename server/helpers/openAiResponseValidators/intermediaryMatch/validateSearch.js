function validateSearch(response) {
  if (!response.content) return false;
  if (!response.content.searchTitle) return false;
  if (!response.content.searchDesc) return false;
  return true;
}
module.exports = validateSearch;
