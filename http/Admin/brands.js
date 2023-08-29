export const createBrand = async (newBrand) =>
  await fetch('http://localhost:3000/api/brand', {
    method: 'POST',
    body: JSON.stringify(newBrand)
  }).then((res) => res.json())

export const updateBrand = async (id, name) =>
  await fetch('http://localhost:3000/api/brand/' + id, {
    method: 'PUT',
    body: JSON.stringify({ name })
  }).then((res) => res.json())

export const deleteBrand = async (id) =>
  await fetch('http://localhost:3000/api/brand/' + id, {
    method: 'DELETE'
  }).then((res) => res.json())
