export const createSpecificationByProductId = async (formData) =>
  await fetch('http://localhost:3000/api/admin_routes/product_info', {
    method: 'POST',
    body: formData
  }).then((res) => res.json())

export const updateSpecificationById = async (id, formData) =>
  await fetch('http://localhost:3000/api/admin_routes/product_info/' + id, {
    method: 'PUT',
    body: formData
  }).then((res) => res.json())

export const deleteSpecificationById = async (id) =>
  await fetch('http://localhost:3000/api/admin_routes/product_info/' + id, {
    method: 'DELETE'
  }).then((res) => res.json())
