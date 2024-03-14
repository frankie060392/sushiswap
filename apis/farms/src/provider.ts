import { ChainId } from 'sushi/chain'
import { createPublicClient, PublicClient } from 'viem'
import { config } from '@sushiswap/viem-config'

// const base = {
//   id: 8453,
//   network: 'base',
//   name: 'Base',
//   nativeCurrency: {
//     name: 'Base',
//     symbol: 'ETH',
//     decimals: 18,
//   },
//   rpcUrls: {
//     default: {
//       http: ['https://mainnet.base.org'],
//     },
//     public: {
//       http: ['https://mainnet.base.org'],
//     },
//   },
//   blockExplorers: {
//     blockscout: {
//       name: 'Basescout',
//       url: 'https://base.blockscout.com',
//     },
//     default: {
//       name: 'Basescan',
//       url: 'https://basescan.org',
//     },
//     etherscan: {
//       name: 'Basescan',
//       url: 'https://basescan.org',
//     },
//   },
//   contracts: {
//     multicall3: {
//       address: '0xcA11bde05977b3631167028862bE2a173976CA11',
//       blockCreated: 5022,
//     },
//   },
// } as const

// const linea = {
//   id: 59_144,
//   name: 'Linea Mainnet',
//   network: 'linea-mainnet',
//   nativeCurrency: { name: 'Linea Ether', symbol: 'ETH', decimals: 18 },
//   rpcUrls: {
//     infura: {
//       http: ['https://linea-mainnet.infura.io/v3'],
//       webSocket: ['wss://linea-mainnet.infura.io/ws/v3'],
//     },
//     default: {
//       http: ['https://rpc.linea.build'],
//       webSocket: ['wss://rpc.linea.build'],
//     },
//     public: {
//       http: ['https://rpc.linea.build'],
//       webSocket: ['wss://rpc.linea.build'],
//     },
//   },
//   blockExplorers: {
//     default: {
//       name: 'Etherscan',
//       url: 'https://lineascan.build',
//     },
//     etherscan: {
//       name: 'Etherscan',
//       url: 'https://lineascan.build',
//     },
//     blockscout: {
//       name: 'Blockscout',
//       url: 'https://explorer.linea.build',
//     },
//   },
//   contracts: {
//     multicall3: {
//       address: '0xcA11bde05977b3631167028862bE2a173976CA11',
//       blockCreated: 42,
//     },
//   },
//   testnet: false,
// } as const

// const nebulasChain = createPublicClient(config[ChainId.U2U_NEBULAS])

// const u2uNebulasClient = createPublicClient(...nebulasChain, {batch: {
//     multicall: {
//       batchSize: 1024 * 200,
//       wait: 16,
//     },
//   },
//   pollingInterval: 6_000,})

const u2uNebulasClient = createPublicClient(config[ChainId.U2U_NEBULAS])

export const viemProviders = ({ chainId }: { chainId?: ChainId }): PublicClient => {
  switch (chainId) {
    case ChainId.U2U_NEBULAS:
      return u2uNebulasClient
    default:
      return u2uNebulasClient
  }
}
