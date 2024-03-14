import { FeeAmount } from '@sushiswap/v3-sdk'
import { getAddress } from 'viem'
import { FarmConfigV3, SerializedFarmConfig } from '..'
import { defineFarmV3Configs } from '../src/defineFarmV3Configs'
import { DAI, USDC, WETH9 } from 'sushi/currency'
import { ChainId } from 'sushi/chain'

const v3TopFixedLps: FarmConfigV3[] = [
  {
    pid: 1,
    lpAddress: '0x1ac1A8FEaAEa1900C4166dEeed0C11cC10669D36',
    token0: USDC[ChainId.U2U_NEBULAS],
    token1: WETH9[ChainId.U2U_NEBULAS],
    feeAmount: FeeAmount.LOW,
  }
]

export const farmsV3 = defineFarmV3Configs([
  // Keep those farms on top
  ...v3TopFixedLps,
])

const farms: any = [
  {
    pid: 154,
    vaultPid: 7,
    lpSymbol: 'CAPS-ETH LP',
    lpAddress: '0x829e9CC8D05d0D55B4494Ecb5a43D71546dd4DDb',
    quoteToken: WETH9[ChainId.U2U_NEBULAS],
    token: DAI[ChainId.U2U_NEBULAS],
  }
].map((p) => ({
  ...p,
  token: p.token.serialize,
  quoteToken: p.quoteToken.serialize,
  lpAddress: getAddress(p.lpAddress),
}))

export default farms
