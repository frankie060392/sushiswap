// import { WNATIVE } from '@pancakeswap/sdk'
// import { Token } from '@pancakeswap/swap-sdk-core'
// import { CAKE, unwrappedToken } from '@pancakeswap/tokens'
import { priceHelperTokens } from '../constants/common'
import { ComputedFarmConfigV3, FarmConfigV3 } from './types'
import { Token, WETH9, WNATIVE, unwrapToken } from 'sushi/currency'

function sortFarmLP(token0: Token, token1: Token) {
  const commonTokens = priceHelperTokens[token0.chainId as keyof typeof priceHelperTokens]
  if (commonTokens) {
    const commonTokensList = [
      WETH9[token0.chainId as keyof typeof WETH9],
      ...commonTokens.list,
      WNATIVE[token0.chainId as keyof typeof WNATIVE] ? WNATIVE[token0.chainId as keyof typeof WNATIVE] : undefined,
    ].filter(Boolean) as Token[]
    const someToken0 = commonTokensList.some((token) => token.equals(token0))
    const someToken1 = commonTokensList.some((token) => token.equals(token1))
    if (someToken0 && someToken1) {
      return commonTokensList.indexOf(token0) > commonTokensList.indexOf(token1) ? [token0, token1] : [token1, token0]
    }
    if (someToken0) {
      return [token1, token0]
    }
    if (someToken1) {
      return [token0, token1]
    }
  }

  return [token0, token1]
}

export function defineFarmV3Configs(farmConfig: FarmConfigV3[]): ComputedFarmConfigV3[] {
  return farmConfig.map((config) => {
    const [token, quoteToken] = sortFarmLP(config.token0, config.token1)
    const unwrappedToken0 = unwrapToken(token)
    const unwrappedToken1 = unwrapToken(quoteToken)

    if (!unwrappedToken0 || !unwrappedToken1) {
      throw new Error(`Invalid farm config token0: ${token.address} or token1: ${quoteToken.address}`)
    }

    return {
      ...config,
      token,
      quoteToken,
      lpSymbol: `${unwrappedToken0.symbol}-${unwrappedToken1.symbol} LP`,
    }
  })
}
