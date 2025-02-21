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
          response.content.productListCategories.length === 6 &&
          response.content.productListProductTitle.length === 15 &&
          response.content.productListProductDesc.length === 15
        ) {
          return true;
        }
      }
    }
  }
  return false;
}
module.exports = productListValidator;
