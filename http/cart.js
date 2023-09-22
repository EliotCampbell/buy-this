export const addProductToCart = async (productId, quantity, price) =>
  await fetch('http://localhost:3000/api/cart', {
    method: 'POST',
    body: JSON.stringify({ productId, quantity, price })
  }).then((res) => res.json())
