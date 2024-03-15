export const BA_LIST =
  'https://raw.githubusercontent.com/The-Blockchain-Association/sec-notice-list/master/ba-sec-list.json'

export const UNSUPPORTED_TOKEN_LIST_URLS: string[] = [BA_LIST]
export const U2U_DEFAULT_TOKEN_LIST = 'https://token-list.u2dex.io'
export const SUSHI_DEFAULT_TOKEN_LIST = 'https://token-list.sushi.com'
export const SUSHI_CHAINLINK_TOKEN_LIST =
  'https://token-list.sushi.com/chainlink'

export const UNI_LIST = 'https://gateway.ipfs.io/ipns/tokens.uniswap.org'
export const UNI_EXTENDED_LIST =
  'https://gateway.ipfs.io/ipns/extendedtokens.uniswap.org'

export const OPTIMISM_LIST =
  'https://static.optimism.io/optimism.tokenlist.json'
export const ARBITRUM_LIST =
  'https://tokenlist.arbitrum.io/ArbTokenLists/arbed_arb_whitelist_era.json'
export const CELO_LIST =
  'https://celo-org.github.io/celo-token-list/celo.tokenlist.json'
export const PLASMA_BNB_LIST =
  'https://raw.githubusercontent.com/plasmadlt/plasma-finance-token-list/master/bnb.json'

export const LINEA_LIST =
  'https://raw.githubusercontent.com/Consensys/linea-token-list/main/json/linea-mainnet-token-fulllist.json'

// this is the default list of lists that are exposed to users
// lower index == higher priority for token import
export const DEFAULT_TOKEN_LIST_OF_TOKEN_LISTS_TO_DISPLAY: string[] = [
  U2U_DEFAULT_TOKEN_LIST,
]

export const DEFAULT_LIST_OF_LISTS: string[] = [
  ...DEFAULT_TOKEN_LIST_OF_TOKEN_LISTS_TO_DISPLAY,
]

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = [
  SUSHI_DEFAULT_TOKEN_LIST,
  SUSHI_CHAINLINK_TOKEN_LIST,
  OPTIMISM_LIST,
]

export const BLACKLIST_TOKEN_IDS: string[] = [
  // Fake Aptos token
  '0x8CDf7AF57E4c8B930e1B23c477c22f076530585e',
]
