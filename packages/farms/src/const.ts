import { ChainId } from 'sushi/chain'
import uniq from 'lodash/uniq'

export const supportedChainIdV2 = [ChainId.ETHEREUM] as const
export const supportedChainIdV3 = [
  // ChainId.BSC,
  // ChainId.BSC_TESTNET,
  // ChainId.ETHEREUM,
  ChainId.U2U_NEBULAS
] as const
export const supportedChainId = uniq([...supportedChainIdV2, ...supportedChainIdV3])
export const bCakeSupportedChainId = [ChainId.BSC] as const

export const FARM_AUCTION_HOSTING_IN_SECONDS = 691200

export type FarmSupportedChainId = (typeof supportedChainId)[number]

export type FarmV2SupportedChainId = (typeof supportedChainIdV2)[number]

export type FarmV3SupportedChainId = (typeof supportedChainIdV3)[number]

export const masterChefAddresses = {
  [ChainId.BSC_TESTNET]: '0xB4A466911556e39210a6bB2FaECBB59E4eB7E43d',
  [ChainId.BSC]: '0xa5f8C5Dbd5F286960b9d90548680aE5ebFf07652',
} as const

export const masterChefV3Addresses = {
  // [ChainId.ETHEREUM]: '0x556B9306565093C855AEA9AE92A594704c2Cd59e',
  // [ChainId.BSC]: '0x556B9306565093C855AEA9AE92A594704c2Cd59e',
  // [ChainId.BSC_TESTNET]: '0x4c650FB471fe4e0f476fD3437C3411B1122c4e3B',
  [ChainId.U2U_NEBULAS]: '0x8fC9F43677e6EbFCaC798eede292073c3319D6D9',
} as const satisfies Record<FarmV3SupportedChainId, string>

export const nonBSCVaultAddresses = {
  [ChainId.ETHEREUM]: '0x2e71B2688019ebdFDdE5A45e6921aaebb15b25fb',
} as const
