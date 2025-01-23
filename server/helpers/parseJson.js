function parseJson(data) {
  try {
    if (!data) return null;
    return JSON.parse(data);
  } catch (e) {
    return null;
  }
}
module.exports = parseJson;
