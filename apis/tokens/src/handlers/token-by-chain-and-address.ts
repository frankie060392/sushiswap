import type { TokenInfo } from 'sushi'

const handler = async (request: any, response: any) => {
  response.setHeader(
    'Cache-Control',
    's-maxage=1800, stale-while-revalidate=3600',
  )

  const { chainId, address } = request.params

  const result = await fetch(`https://tokens.u2dex.io/v1/${chainId}/`)
  const tokenList = (await result.json()) as TokenInfo[]
  const json = tokenList.find(
    (t) => t.address.toLowerCase() === address.toLowerCase(),
  )

  if (json !== undefined) {
    return response.status(200).json(json)
  } else {
    return response.status(404).json({ error: 'Token not found' })
  }
}

export default handler
