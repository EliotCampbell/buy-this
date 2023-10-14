export const createProduct = async (formData) =>
  await fetch('http://localhost:3000/api/admin_routes/product', {
    method: 'POST',
    body: formData
  }).then((res) => res.json())

export const updateProduct = async (id, formData) =>
  await fetch('http://localhost:3000/api/admin_routes/product/' + id, {
    method: 'PATCH',
    body: formData
  }).then((res) => res.json())

export const deleteProduct = async (id) =>
  await fetch('http://localhost:3000/api/admin_routes/product/' + id, {
    method: 'DELETE'
  }).then((res) => res.json())
