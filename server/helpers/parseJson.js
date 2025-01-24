function parseJson(data) {
  try {
    console.log(data);
    if (!data) return null;
    return JSON.parse(data);
  } catch (e) {
    console.error(e);
    return null;
  }
}
module.exports = parseJson;
