function parseJson(data) {
  try {
    console.log('data  ==>>', data);
    if (!data) return null;
    return JSON.parse(data);
  } catch (e) {
    return null;
  }
}
module.exports = parseJson;
