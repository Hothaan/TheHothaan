function validateGreeting(response) {
  if (!response.content) return false;
  if (!response.content.greetingsHalfTitle) return false;
  if (!response.content.greetingsHalfDesc) return false;
  if (!response.content.greetingsFullTitle) return false;
  if (!response.content.greetingsFullDesc) return false;
  return true;
}
module.exports = validateGreeting;
