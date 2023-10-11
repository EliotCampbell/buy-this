export const createShippingCost = async (formData) => {
  try {
    await fetch('http://localhost:3000/api/admin_routes/shipping_costs', {
      method: 'POST',
      body: formData
    }).then((res) => res.json())
  } catch (error) {
    console.log(error.message)
  }
}

export const updateShippingCost = async (id, formData) => {
  try {
    await fetch('http://localhost:3000/api/admin_routes/shipping_costs/' + id, {
      method: 'PATCH',
      body: formData
    }).then((res) => res.json())
  } catch (error) {
    console.log(error.message)
  }
}

export const deleteShippingCost = async (id) => {
  try {
    await fetch('http://localhost:3000/api/admin_routes/shipping_costs/' + id, {
      method: 'DELETE'
    }).then((res) => res.json())
  } catch (error) {
    console.log(error.message)
  }
}
