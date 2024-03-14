import BN from 'bignumber.js'
import { SerializedFarmConfig } from '@sushiswap/farms'
import { ChainId } from 'sushi/chain'
import { USDC, CAKE } from 'sushi/currency'
import { FarmKV } from './kv'
import { updateLPsAPR } from './lpApr'
import {  } from './provider'
import { SushiSwapV3Pool, FeeAmount } from '@sushiswap/v3-sdk'
import { Fraction } from 'sushi'
import { FarmSupportedChainId } from '@sushiswap/farms'

// copy from src/config, should merge them later
const BSC_BLOCK_TIME = 3
const BLOCKS_PER_YEAR = (60 / BSC_BLOCK_TIME) * 60 * 24 * 365 // 10512000

const FIXED_ZERO = new BN(0)
const FIXED_100 = new BN(100)

export const getFarmCakeRewardApr = (farm: any, cakePriceBusd: BN, regularCakePerBlock: number) => {
  let cakeRewardsAprAsString = '0'
  if (!cakePriceBusd) {
    return cakeRewardsAprAsString
  }
  const totalLiquidity = new BN(farm.lpTotalInQuoteToken).times(new BN(farm.quoteTokenPriceBusd))
  const poolWeight = new BN(farm.poolWeight)
  if (totalLiquidity.isZero() || poolWeight.isZero()) {
    return cakeRewardsAprAsString
  }
  const yearlyCakeRewardAllocation = poolWeight
    ? poolWeight.times(new BN(BLOCKS_PER_YEAR).times(new BN(String(regularCakePerBlock))))
    : FIXED_ZERO
  const cakeRewardsApr = yearlyCakeRewardAllocation.times(cakePriceBusd).div(totalLiquidity).times(FIXED_100)
  if (!cakeRewardsApr.isZero()) {
    cakeRewardsAprAsString = cakeRewardsApr.toFixed(2)
  }
  return cakeRewardsAprAsString
}

const pairAbi = [
  {
    inputs: [],
    name: 'getReserves',
    outputs: [
      {
        internalType: 'uint112',
        name: 'reserve0',
        type: 'uint112',
      },
      {
        internalType: 'uint112',
        name: 'reserve1',
        type: 'uint112',
      },
      {
        internalType: 'uint32',
        name: 'blockTimestampLast',
        type: 'uint32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const

const cakeBusdPairMap = {
  [ChainId.U2U_NEBULAS]: {
    address: SushiSwapV3Pool.getAddress(
      // CAKE[ChainId.U2U_NEBULAS],
      CAKE[ChainId.U2U_NEBULAS] as any,
      USDC[ChainId.U2U_NEBULAS],
      FeeAmount.LOW
    ),
    tokenA: CAKE[ChainId.U2U_NEBULAS],
    tokenB: USDC[ChainId.U2U_NEBULAS],
  },
}

const getCakePrice = async (isTestnet: boolean) => {
  // const pairConfig = cakeBusdPairMap[ChainId.U2U_NEBULAS]
  // const client = isTestnet ? bscTestnetClient : bscClient
  // const [reserve0, reserve1] = await client.readContract({
  //   abi: pairAbi,
  //   address: pairConfig.address,
  //   functionName: 'getReserves',
  // })

  // const { tokenA, tokenB } = pairConfig

  // const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]

  // const pair = new Pair(
  //   CurrencyAmount.fromRawAmount(token0, reserve0.toString()),
  //   CurrencyAmount.fromRawAmount(token1, reserve1.toString()),
  // )

  // return pair.priceOf(tokenA)
  return new Fraction(0, 0)
}

export async function handleLpAprs(chainId: FarmSupportedChainId, farmsConfig?: SerializedFarmConfig[]) {
  let lpAprs = await FarmKV.getApr(chainId)
  if (!lpAprs) {
    lpAprs = await saveLPsAPR(chainId, farmsConfig)
  }
  return lpAprs || {}
}

export async function saveLPsAPR(chainId: FarmSupportedChainId, farmsConfig?: SerializedFarmConfig[]) {
  // TODO: add other chains
  if (chainId === 2484) {
    let data = farmsConfig
    if (!data) {
      const value = await FarmKV.getFarms(chainId)
      if (value && value.data) {
        // eslint-disable-next-line prefer-destructuring
        data = value.data
      }
    }
    if (data) {
      const aprMap = (await updateLPsAPR(chainId, data)) || null
      FarmKV.saveApr(chainId, aprMap)
      return aprMap || null
    }
    return null
  }
  return null
}

const chainlinkAbi = [
  {
    inputs: [],
    name: 'latestAnswer',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

export async function fetchCakePrice() {
  // const address = '0xB6064eD41d4f67e353768aA239cA86f4F73665a1'
  // const latestAnswer = await bscClient.readContract({
  //   abi: chainlinkAbi,
  //   address,
  //   functionName: 'latestAnswer',
  // })

  // return formatUnits(latestAnswer, 8)
  return null
}
