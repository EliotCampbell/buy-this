const { Brand } = require('../../../models/models')


export const GET = async (req) => {
    const brands = await Brand.findAll()
    return new Response (JSON.stringify(brands))
    }