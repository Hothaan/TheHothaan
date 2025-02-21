function productListValidator(response, contentLength) {
  if (response.menu && response.feature && response.content) {
    if (
      response.content?.productListCategory &&
      response.content?.productListProductTitle &&
      response.content?.productListProductDesc
    )
      return true;
  }
  return false;
}
module.exports = productListValidator;
