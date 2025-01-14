import { BondsApiSchema, getBondsFromSubgraph } from '@sushiswap/client/api'
import { NextResponse } from 'next/server.js'
import { CORS } from '../../cors'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const result = BondsApiSchema.safeParse(Object.fromEntries(searchParams))

  if (!result.success) {
    return NextResponse.json(result.error.format(), { status: 400 })
  }

  const bonds = await getBondsFromSubgraph(result.data)
  return NextResponse.json(bonds, { headers: CORS })
}
