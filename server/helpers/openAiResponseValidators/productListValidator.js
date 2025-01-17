function productListValidator(response, contentLength) {
  if (response.menu && response.feature && response.content) {
    if (
      response.content?.productListCategories &&
      response.content?.productListProductTitle &&
      response.content?.productListProductDesc
    ) {
      if (
        Array.isArray(response.content.productListCategories) &&
        Array.isArray(response.content.productListProductTitle) &&
        Array.isArray(response.content.productListProductDesc)
      ) {
        if (
          response.content.productListCategories.length === contentLength &&
          response.content.productListProductTitle.length === contentLength &&
          response.content.productListProductDesc.length === contentLength
        ) {
          return true;
        }
      }
    }
  }
  return false;
}
module.exports = productListValidator;
