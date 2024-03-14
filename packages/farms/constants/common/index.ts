import { ChainId } from 'sushi/chain'
import { ERC20Token } from '@sushiswap/v3-sdk'

import type { FarmV3SupportedChainId } from '../../src'
import type { CommonPrice } from '../../src/fetchFarmsV3'

export const CAKE_BNB_LP_MAINNET = '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0'

export type PriceHelper = {
  chain: string
  list: ERC20Token[]
}

export const priceHelperTokens = {
  [ChainId.U2U_NEBULAS]: {
    chain: 'nebulas',
    list: [],
  },
  [ChainId.ETHEREUM]: {
    chain: 'ethereum',
    list: [],
  },
  [ChainId.BSC]: {
    chain: 'bsc',
    list: [],
  },
  
} satisfies Record<number, PriceHelper>

// for testing purposes
export const DEFAULT_COMMON_PRICE: Record<FarmV3SupportedChainId, CommonPrice> = {
  // [ChainId.ETHEREUM]: {},
  // [ChainId.GOERLI]: {
  //   [goerliTestnetTokens.mockA.address]: '10',
  // },
  // [ChainId.BSC]: {},
  // [ChainId.BSC_TESTNET]: {
  //   [bscTestnetTokens.mockA.address]: '10',
  //   [bscTestnetTokens.usdt.address]: '1',
  //   [bscTestnetTokens.busd.address]: '1',
  //   [bscTestnetTokens.usdc.address]: '1',
  // },
  // [ChainId.ZKSYNC_TESTNET]: {
  //   [zkSyncTestnetTokens.mock.address]: '10',
  // },
  // [ChainId.POLYGON_ZKEVM]: {},
  // [ChainId.ZKSYNC]: {},
  // [ChainId.POLYGON_ZKEVM_TESTNET]: {},
  // [ChainId.ARBITRUM_ONE]: {},
  // [ChainId.LINEA]: {},
  // [ChainId.BASE]: {},
  // [ChainId.OPBNB_TESTNET]: {},
  // [ChainId.OPBNB]: {},
}
