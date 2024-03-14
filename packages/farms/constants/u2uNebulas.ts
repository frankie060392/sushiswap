// import { FeeAmount } from '@pancakeswap/v3-sdk'
// import { getAddress } from 'viem'
// import { SerializedFarmConfig } from '..'
import { defineFarmV3Configs } from '../src/defineFarmV3Configs'
import { Token, WNATIVE } from 'sushi/currency'
import { ChainId } from 'sushi/chain'
import { FeeAmount } from '@sushiswap/v3-sdk'
const CAKE = new Token({
  chainId: ChainId.U2U_NEBULAS,
  address: '0x6d7ce523d59C59De27BB755A1981f4043e79C70E',
  decimals: 18,
  symbol: 'CAKE',
  name: 'CAKE',
})
export const farmsV3 = defineFarmV3Configs([
  {
    pid: 1,
    lpAddress: '0x66a892B9de9e816AaE61075FF1C98606d3F8E5A4',
    token0: WNATIVE[ChainId.U2U_NEBULAS],
    token1: CAKE,
    feeAmount: FeeAmount.MEDIUM,
  },
  // {
  //   pid: 2,
  //   lpAddress: '0xe62C422c1E8083CE3b4526Ff0b16388354AB6E64',
  //   token0: bscTestnetTokens.cake2,
  //   token1: bscTestnetTokens.wbnb,
  //   feeAmount: FeeAmount.MEDIUM,
  // },
  // {
  //   pid: 3,
  //   lpAddress: '0xc0E0F94a79Aabc6c655f308Da21D6EbDE64b0995',
  //   token0: bscTestnetTokens.mockB,
  //   token1: bscTestnetTokens.mockA,
  //   feeAmount: FeeAmount.LOW,
  // },
  // {
  //   pid: 4,
  //   lpAddress: '0xf7f2894abd4beE559521D754c5D481730E1C7d8C',
  //   token0: bscTestnetTokens.mockB,
  //   token1: bscTestnetTokens.mockA,
  //   feeAmount: FeeAmount.LOWEST,
  // },
  // {
  //   pid: 5,
  //   lpAddress: '0x5d9550E870D42Ae03Fab91508cC5722A80CF0b5e',
  //   token0: bscTestnetTokens.mockB,
  //   token1: bscTestnetTokens.mockA,
  //   feeAmount: FeeAmount.HIGH,
  // },
  // {
  //   pid: 6,
  //   lpAddress: '0x427d29C609A85AA3aaF87Aff65C392D72588ceC2',
  //   token0: bscTestnetTokens.cake2,
  //   token1: bscTestnetTokens.busd,
  //   feeAmount: FeeAmount.MEDIUM,
  // },
])

