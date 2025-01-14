'use client'

import { Web3Input } from '@sushiswap/wagmi/components/web3-input'
import { useDerivedStateSimpleSwap } from './derivedstate-simple-swap-provider'

export const SimpleSwapToken0Input = () => {
  const {
    state: { swapAmountString, chainId, token0 },
    mutate: { setSwapAmount, setToken0 },
    isToken0Loading: isLoading,
  } = useDerivedStateSimpleSwap()

  return (
    <Web3Input.Currency
      id="swap-from"
      type="INPUT"
      className="border-neubrutal p-3 background-item rounded-lg"
      chainId={chainId}
      onSelect={setToken0}
      value={swapAmountString}
      onChange={setSwapAmount}
      currency={token0}
      loading={isLoading}
      currencyLoading={isLoading}
    />
  )
}
