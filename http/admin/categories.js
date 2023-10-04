export const createCategory = async (newCategory) =>
  await fetch('http://localhost:3000/api/admin_routes/category', {
    method: 'POST',
    body: JSON.stringify(newCategory)
  }).then((res) => res.json())

export const updateCategory = async (id, name) =>
  await fetch('http://localhost:3000/api/admin_routes/category/' + id, {
    method: 'PUT',
    body: JSON.stringify({ name })
  }).then((res) => res.json())

export const deleteCategory = async (id) =>
  await fetch('http://localhost:3000/api/admin_routes/category/' + id, {
    method: 'DELETE'
  }).then((res) => res.json())
