// productsHelper.js

function calculateNewPrice(product) {
  // Kiểm tra xem product có phải là object và có thuộc tính price và discountPercentage hay không
  if (
    typeof product !== 'object' ||
    !product.hasOwnProperty('price') ||
    !product.hasOwnProperty('discountPercentage')
  ) {
    console.error('Invalid product data:', product);
    return null; // Hoặc bạn có thể throw một exception
  }

  const { price, discountPercentage } = product;

  // Kiểm tra xem price và discountPercentage có phải là số hợp lệ hay không
  if (
    typeof price !== 'number' ||
    typeof discountPercentage !== 'number' ||
    price <= 0 ||
    discountPercentage < 0 ||
    discountPercentage >= 100
  ) {
    console.error(
      'Invalid price or discountPercentage value:',
      price,
      discountPercentage,
    );
    return null; // Hoặc bạn có thể throw một exception
  }

  const discountAmount = price * (discountPercentage / 100);
  const newPrice = price - discountAmount;

  return newPrice;
}

module.exports = {
  calculateNewPrice,
  // Thêm các hàm khác vào đây nếu cần
};