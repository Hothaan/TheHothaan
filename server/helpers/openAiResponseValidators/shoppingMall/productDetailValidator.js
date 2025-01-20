function validateProductDetail(response) {
  if (!response.content) return false;
  if (!response.content.productDetailProductTitle) return false;
  if (!response.content.productDetailProductDesc) return false;
  if (!response.content.productDetailMoreProductTitle) return false;

  return true;
}
module.exports = validateProductDetail;
