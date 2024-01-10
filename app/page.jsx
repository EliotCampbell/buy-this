import Main from '../components/Main/Main'
import { authentication } from '@commercelayer/js-auth'
import { CommerceLayer } from '@commercelayer/sdk'

export default async function Home() {
  const auth = await authentication('client_credentials', {
    slug: process.env.CL_SLUG,
    clientId: process.env.CL_CLIENT_ID,
    clientSecret: process.env.CL_CLIENT_SECRET
  })

  const cl = CommerceLayer({
    organization: process.env.CL_SLUG,
    accessToken: auth.accessToken
  })

  const highlights = (
    await cl.skus.list({ include: ['prices', 'stock_items'] })
  ).map((item) => ({
    ...item,
    inStock: item.stock_items[0]?.quantity,
    price: item.prices[0]?.formatted_amount,
    img: item.image_url
  }))

  console.log(highlights[0])

  return (
    <>
      <Main highlights={highlights} />
    </>
  )
}
export const dynamic = 'force-dynamic'
