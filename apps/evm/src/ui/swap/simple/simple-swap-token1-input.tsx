'use client'

import { Web3Input } from '@sushiswap/wagmi/components/web3-input'
import {
  useDerivedStateSimpleSwap,
  useSimpleSwapTrade,
} from './derivedstate-simple-swap-provider'

export const SimpleSwapToken1Input = () => {
  const {
    state: { chainId, token1 },
    mutate: { setToken1 },
    isToken1Loading: tokenLoading,
  } = useDerivedStateSimpleSwap()

  const {
    isInitialLoading: isLoading,
    isFetching,
    data: trade,
  } = useSimpleSwapTrade()

  return (
    <Web3Input.Currency
      id="swap-to"
      type="OUTPUT"
      disabled
      className="border-neubrutal p-3 background-item rounded-lg"
      value={trade?.amountOut?.toSignificant() ?? ''}
      chainId={chainId}
      onSelect={setToken1}
      currency={token1}
      loading={isLoading}
      fetching={isFetching}
      disableMaxButton
      currencyLoading={tokenLoading}
    />
  )
}
