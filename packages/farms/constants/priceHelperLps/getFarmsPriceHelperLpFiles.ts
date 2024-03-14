import { ChainId } from 'sushi/chain'
// import FarmsBscPriceHelper from './56'
// import FarmsBscTestnetPriceHelper from './97'
// import FarmsEthereumPriceHelper from './1'
// import FarmsGoerliPriceHelper from './5'
import FarmsU2UHelper from './2484'


export const getFarmsPriceHelperLpFiles = (chainId: ChainId) => {
  switch (chainId) {
    case ChainId.U2U_NEBULAS:
      return FarmsU2UHelper
    default:
      return []
  }
}
