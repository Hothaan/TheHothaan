function validateMedia(response) {
  if (!response.content) return false;
  if (!response.content.mediaTitle) return false;
  if (!response.content.mediaDesc) return false;
  return true;
}
module.exports = validateMedia;
