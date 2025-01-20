const validateBrandIntroduce = require('./brandIntroduceValidator');
const validateCartText = require('./cartValidator');
const mainValidator = require('./mainValidator');
const validateNotice = require('./noticeValidator');
const validateProductDetail = require('./productDetailValidator');
const productListValidator = require('./productListValidator');

function validateForShoppingMall(response, depth2, cnt) {
  if (depth2 === '메인') return mainValidator(response);
  if (depth2 === '상품 목록') return productListValidator(response, cnt);
  if (depth2 === '상품 상세') return validateProductDetail(response);
  if (depth2 === '장바구니') return validateCartText(response);
  if (depth2 === '공지사항') return validateNotice(response);
  if (depth2 === '브랜드 소개') return validateBrandIntroduce(response);
  return false;
}
module.exports = validateForShoppingMall;
