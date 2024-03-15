import {
  ArrowTopRightOnSquareIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/20/solid'
import {
  IconButton,
  SkeletonText,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  classNames,
} from '@sushiswap/ui'
import { Badge } from '@sushiswap/ui/components/badge'
import { Icon } from '@sushiswap/ui/components/currency/Icon'
import React, { CSSProperties, FC, memo, useCallback } from 'react'
import { Chain } from 'sushi/chain'
import { Amount, Type } from 'sushi/currency'
import { Fraction, ZERO } from 'sushi/math'
import { zeroAddress } from 'viem'

export interface TokenSelectorRow {
  id: string
  account?: `0x${string}`
  currency: Type
  style?: CSSProperties
  className?: string
  onSelect(currency: Type): void
  balance?: Amount<Type> | undefined
  showWarning: boolean
  price?: Fraction
  pin?: {
    isPinned: boolean
    onPin(): void
  }
  selected: boolean
  isBalanceLoading: boolean
}

export const TokenSelectorRow: FC<TokenSelectorRow> = memo(
  function TokenSelectorRow({
    id,
    price,
    balance,
    currency,
    style,
    className,
    onSelect,
    pin,
    selected,
    isBalanceLoading,
    showWarning,
  }) {
    const onClick = useCallback(() => {
      onSelect(currency)
    }, [currency, onSelect])

    const onPin = useCallback(
      (e: React.MouseEvent | React.KeyboardEvent) => {
        e.stopPropagation()
        pin?.onPin()
      },
      [pin],
    )

    return (
      <div className="relative py-0.5 h-[64px]" style={style}>
        <div
          testdata-id={`${id}-row-${
            currency.isNative
              ? zeroAddress
              : currency.wrapped.address.toLowerCase()
          }`}
          onClick={onClick}
          onKeyDown={onClick}
          className={classNames(
            className,
            selected ? 'background-item' : '',
            `group flex items-center w-full hover:bg-muted focus:bg-accent h-full rounded-md px-3 token-${currency?.symbol}`,
          )}
        >
          <div className="flex items-center justify-between flex-grow gap-2 rounded cursor-pointer">
            <div className="flex flex-row items-center flex-grow gap-4">
              {selected ? (
                <Badge
                  position="bottom-right"
                  badgeContent={
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 11 11" fill="none">
                        <g clip-path="url(#clip0_365_19769)">
                        <path d="M8.22735 0.960127L5.61694 0.0897097C5.53147 0.0612426 5.43907 0.0612426 5.3536 0.0897097L2.74319 0.960127C2.32815 1.09799 1.96711 1.36315 1.71137 1.71792C1.45563 2.07269 1.3182 2.49904 1.3186 2.93638V5.06846C1.3186 8.21971 5.15194 9.96013 5.3161 10.0326C5.36936 10.0563 5.42699 10.0685 5.48527 10.0685C5.54355 10.0685 5.60118 10.0563 5.65444 10.0326C5.8186 9.96013 9.65194 8.21971 9.65194 5.06846V2.93638C9.65234 2.49904 9.51491 2.07269 9.25917 1.71792C9.00343 1.36315 8.64239 1.09799 8.22735 0.960127ZM7.4511 4.11721L5.6711 5.89721C5.59826 5.97054 5.51158 6.02867 5.41609 6.06822C5.3206 6.10778 5.21821 6.12797 5.11485 6.12763H5.1011C4.99564 6.12601 4.8916 6.10302 4.79528 6.06005C4.69895 6.01708 4.61234 5.95502 4.54069 5.87763L3.57985 4.87763C3.53824 4.83902 3.50496 4.79232 3.48204 4.74039C3.45913 4.68845 3.44707 4.63239 3.4466 4.57562C3.44613 4.51886 3.45726 4.4626 3.47931 4.4103C3.50137 4.358 3.53387 4.31075 3.57484 4.27146C3.61581 4.23217 3.66437 4.20166 3.71755 4.18182C3.77073 4.16197 3.82741 4.15319 3.8841 4.15603C3.94079 4.15887 3.99631 4.17327 4.04723 4.19833C4.09816 4.2234 4.14344 4.25861 4.18027 4.30179L5.11527 5.27679L6.86027 3.52679C6.93885 3.45089 7.04411 3.4089 7.15335 3.40985C7.2626 3.4108 7.36711 3.45462 7.44436 3.53187C7.52162 3.60912 7.56544 3.71363 7.56638 3.82288C7.56733 3.93213 7.52534 4.03738 7.44944 4.11596L7.4511 4.11721Z" fill="#69CF00"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_365_19769">
                        <rect width="10" height="10" fill="white" transform="translate(0.485352 0.0683594)"/>
                        </clipPath>
                        </defs>
                      </svg>
                    </div>
                  }
                  className='bottom-[-5%] right-[-15%]'
                >
                  <div className="w-10 h-10">
                    <Icon
                      disableLink
                      currency={currency}
                      width={40}
                      height={40}
                    />
                  </div>
                </Badge>
              ) : (
                <div className="w-10 h-10">
                  <Icon
                    disableLink
                    currency={currency}
                    width={40}
                    height={40}
                  />
                </div>
              )}
              <div className="flex flex-col items-start">
                <div className="flex gap-1">
                  <span className="font-semibold">
                    {currency.symbol}
                  </span>
                  {showWarning ? (
                    <TooltipProvider>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <ExclamationCircleIcon
                            width={20}
                            height={20}
                            className="text-yellow"
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          Not on our default token list
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : null}
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-sm color-base hover:underline">
                        {currency.name ?? currency.symbol}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      className="flex items-center gap-1"
                    >
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={Chain.from(currency.chainId)?.getTokenUrl(
                          currency.wrapped.address,
                        )}
                        className="text-blue hover:underline flex gap-1"
                      >
                        Show on explorer{' '}
                        <ArrowTopRightOnSquareIcon width={16} height={16} />
                      </a>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {isBalanceLoading ? (
                <div className="flex flex-col min-w-[60px]">
                  <SkeletonText className="w-[60px]" align="right" />
                  <SkeletonText
                    fontSize="sm"
                    className="w-[20px]"
                    align="right"
                  />
                </div>
              ) : (
                balance?.greaterThan(ZERO) && (
                  <div className="flex flex-col max-w-[140px]">
                    <span
                      className={classNames(
                        selected ? 'font-semibold' : 'font-medium',
                        'text-right text-gray-900 dark:text-slate-50 truncate',
                      )}
                    >
                      {balance?.toSignificant(6)}
                    </span>
                    <span className="text-sm font-medium text-right text-gray-500 dark:text-slate-400">
                      {price ? `$${balance?.multiply(price).toFixed(2)}` : '-'}
                    </span>
                  </div>
                )
              )}
              {pin && (
                <IconButton
                  size="xs"
                  icon="⭐"
                  variant="ghost"
                  name="pin"
                  onClick={onPin}
                  className={classNames(
                    pin.isPinned ? '' : 'grayscale opacity-50',
                    'z-50',
                  )}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    )
  },
)
