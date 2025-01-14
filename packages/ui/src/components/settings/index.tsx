'use client'

import { Cog6ToothIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useSlippageTolerance } from '@sushiswap/hooks'
import React, { FC, ReactNode, useState } from 'react'
import classNames from 'classnames'

import { Button } from '../button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../dialog'
import { List } from '../list'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../tooltip'
import { CarbonOffset } from './CarbonOffset'
import { ExpertMode } from './ExpertMode'
import { SlippageTolerance } from './SlippageTolerance'
import { SwapApi } from './SwapApi'

export enum SettingsModule {
  CarbonOffset = 'CarbonOffset',
  CustomTokens = 'CustomTokens',
  SlippageTolerance = 'SlippageTolerance',
  ExpertMode = 'ExpertMode',
  SwapApi = 'SwapApi',
}

interface SettingsOverlayProps {
  children?: ReactNode
  modules: SettingsModule[]
  options?: {
    slippageTolerance?: {
      storageKey?: string
      defaultValue?: string
      title?: string
    }
  }
}

export const SettingsOverlay: FC<SettingsOverlayProps> = ({
  modules,
  children,
  options,
}) => {
  const [_open, setOpen] = useState(false)
  const [slippageTolerance, setSlippageTolerance] = useSlippageTolerance(
    options?.slippageTolerance?.storageKey,
  )

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button
            size="sm"
            className="!rounded-full hover:!text-hover focus:!text-hover hover:border-hover hover:!bg-transparent focus:!bg-transparent focus:border-hover color-base dark:bg-transparent bg-transparent border-color-base border-2 w-9 h-9 px-[0px]"
            variant="secondary"
            onClick={() => setOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <g clip-path="url(#clip0_70_5265)">
              <path d="M10.0001 6.59912C9.36715 6.59912 8.74846 6.7868 8.22223 7.13842C7.69599 7.49004 7.28584 7.98981 7.04364 8.57453C6.80144 9.15926 6.73806 9.80267 6.86154 10.4234C6.98501 11.0441 7.28978 11.6143 7.73731 12.0619C8.18484 12.5094 8.75502 12.8142 9.37576 12.9376C9.9965 13.0611 10.6399 12.9977 11.2246 12.7555C11.8094 12.5133 12.3091 12.1032 12.6608 11.5769C13.0124 11.0507 13.2001 10.432 13.2001 9.79912C13.2001 8.95043 12.8629 8.1365 12.2628 7.53638C11.6627 6.93626 10.8487 6.59912 10.0001 6.59912ZM10.0001 11.3991C9.6836 11.3991 9.37426 11.3053 9.11114 11.1295C8.84802 10.9537 8.64294 10.7038 8.52184 10.4114C8.40074 10.1191 8.36906 9.79735 8.43079 9.48698C8.49253 9.17661 8.64492 8.89151 8.86868 8.66775C9.09244 8.44399 9.37754 8.2916 9.68791 8.22986C9.99828 8.16813 10.32 8.19981 10.6123 8.32091C10.9047 8.44201 11.1546 8.64709 11.3304 8.91021C11.5062 9.17333 11.6001 9.48267 11.6001 9.79912C11.6001 10.2235 11.4315 10.6304 11.1314 10.9305C10.8314 11.2306 10.4244 11.3991 10.0001 11.3991Z" fill="currentColor"/>
              <path d="M17.4352 11.3186L17.08 11.1138C17.2399 10.2438 17.2399 9.35186 17.08 8.48181L17.4352 8.27701C17.7084 8.11942 17.9478 7.90958 18.1399 7.65946C18.3319 7.40934 18.4728 7.12384 18.5545 6.81926C18.6362 6.51469 18.6572 6.197 18.6161 5.88433C18.575 5.57167 18.4728 5.27016 18.3152 4.99701C18.1576 4.72386 17.9478 4.48442 17.6977 4.29237C17.4475 4.10032 17.162 3.95941 16.8575 3.8777C16.5529 3.79598 16.2352 3.77506 15.9225 3.81612C15.6099 3.85718 15.3084 3.95942 15.0352 4.11701L14.6792 4.32261C14.0068 3.74814 13.2341 3.30281 12.4 3.00901V2.59861C12.4 1.96209 12.1472 1.35164 11.6971 0.901552C11.247 0.451465 10.6365 0.198608 10 0.198608C9.36349 0.198608 8.75304 0.451465 8.30295 0.901552C7.85287 1.35164 7.60001 1.96209 7.60001 2.59861V3.00901C6.76592 3.30386 5.99349 3.75029 5.32161 4.32581L4.96401 4.11861C4.41236 3.80035 3.75688 3.71427 3.14176 3.8793C2.52664 4.04433 2.00227 4.44696 1.68401 4.99861C1.36575 5.55026 1.27967 6.20574 1.4447 6.82086C1.60973 7.43598 2.01236 7.96035 2.56401 8.27861L2.91921 8.48341C2.7593 9.35345 2.7593 10.2454 2.91921 11.1154L2.56401 11.3202C2.01236 11.6385 1.60973 12.1628 1.4447 12.778C1.27967 13.3931 1.36575 14.0486 1.68401 14.6002C2.00227 15.1519 2.52664 15.5545 3.14176 15.7195C3.75688 15.8846 4.41236 15.7985 4.96401 15.4802L5.32001 15.2746C5.99262 15.8492 6.76559 16.2945 7.60001 16.5882V16.9986C7.60001 17.6351 7.85287 18.2456 8.30295 18.6957C8.75304 19.1458 9.36349 19.3986 10 19.3986C10.6365 19.3986 11.247 19.1458 11.6971 18.6957C12.1472 18.2456 12.4 17.6351 12.4 16.9986V16.5882C13.2341 16.2934 14.0065 15.8469 14.6784 15.2714L15.036 15.4778C15.5877 15.7961 16.2431 15.8822 16.8583 15.7171C17.4734 15.5521 17.9978 15.1495 18.316 14.5978C18.6343 14.0462 18.7204 13.3907 18.5553 12.7756C18.3903 12.1604 17.9877 11.6361 17.436 11.3178L17.4352 11.3186ZM15.3968 8.29781C15.6677 9.27946 15.6677 10.3162 15.3968 11.2978C15.3495 11.4687 15.3603 11.6504 15.4275 11.8145C15.4947 11.9785 15.6145 12.1156 15.768 12.2042L16.6352 12.705C16.8191 12.8111 16.9532 12.9859 17.0082 13.1909C17.0632 13.3959 17.0345 13.6144 16.9284 13.7982C16.8223 13.9821 16.6475 14.1162 16.4425 14.1712C16.2375 14.2262 16.0191 14.1975 15.8352 14.0914L14.9664 13.589C14.8127 13.5 14.6338 13.4647 14.4578 13.4886C14.2818 13.5125 14.1188 13.5942 13.9944 13.721C13.2823 14.4479 12.3853 14.9666 11.4 15.221C11.228 15.2652 11.0757 15.3654 10.9669 15.5057C10.8581 15.6461 10.7991 15.8186 10.7992 15.9962V16.9986C10.7992 17.2108 10.7149 17.4143 10.5649 17.5643C10.4149 17.7143 10.2114 17.7986 9.99921 17.7986C9.78704 17.7986 9.58355 17.7143 9.43353 17.5643C9.2835 17.4143 9.19921 17.2108 9.19921 16.9986V15.997C9.1993 15.8194 9.14031 15.6469 9.03153 15.5065C8.92276 15.3662 8.77038 15.266 8.59841 15.2218C7.61309 14.9664 6.71627 14.4466 6.00481 13.7186C5.88043 13.5918 5.7174 13.5101 5.54142 13.4862C5.36543 13.4623 5.18649 13.4976 5.03281 13.5866L4.16561 14.0882C4.07459 14.1416 3.97392 14.1764 3.86939 14.1907C3.76486 14.205 3.65853 14.1985 3.55653 14.1715C3.45453 14.1445 3.35888 14.0976 3.27507 14.0336C3.19126 13.9695 3.12095 13.8894 3.0682 13.7981C3.01545 13.7067 2.98129 13.6058 2.96769 13.5012C2.95409 13.3966 2.96132 13.2903 2.98896 13.1885C3.01661 13.0866 3.06411 12.9913 3.12876 12.9079C3.1934 12.8245 3.27389 12.7548 3.36561 12.7026L4.23281 12.2018C4.38637 12.1132 4.50615 11.9761 4.57334 11.8121C4.64053 11.648 4.65131 11.4663 4.60401 11.2954C4.3331 10.3138 4.3331 9.27706 4.60401 8.29541C4.65046 8.12491 4.63916 7.94384 4.57186 7.78044C4.50457 7.61705 4.38506 7.48053 4.23201 7.39221L3.36481 6.89141C3.18096 6.78532 3.04679 6.61055 2.9918 6.40553C2.93682 6.20052 2.96552 5.98206 3.07161 5.79821C3.1777 5.61436 3.35247 5.48019 3.55749 5.4252C3.7625 5.37021 3.98096 5.39892 4.16481 5.50501L5.03361 6.00741C5.18687 6.09662 5.36543 6.13238 5.54123 6.10906C5.71703 6.08575 5.8801 6.00468 6.00481 5.87861C6.71688 5.15168 7.61395 4.63302 8.59921 4.37861C8.77172 4.33426 8.92449 4.23361 9.03332 4.09261C9.14215 3.95161 9.20081 3.77832 9.20001 3.60021V2.59861C9.20001 2.38644 9.2843 2.18295 9.43433 2.03292C9.58435 1.88289 9.78784 1.79861 10 1.79861C10.2122 1.79861 10.4157 1.88289 10.5657 2.03292C10.7157 2.18295 10.8 2.38644 10.8 2.59861V3.60021C10.7999 3.77777 10.8589 3.95032 10.9677 4.09067C11.0765 4.23102 11.2288 4.33119 11.4008 4.37541C12.3864 4.63073 13.2835 5.15052 13.9952 5.87861C14.1196 6.00538 14.2826 6.08716 14.4586 6.11106C14.6346 6.13496 14.8135 6.09962 14.9672 6.01061L15.8344 5.50901C15.9254 5.45565 16.0261 5.42082 16.1306 5.40653C16.2352 5.39224 16.3415 5.39876 16.4435 5.42573C16.5455 5.4527 16.6411 5.49957 16.725 5.56366C16.8088 5.62775 16.8791 5.70778 16.9318 5.79915C16.9846 5.89051 17.0187 5.99142 17.0323 6.09604C17.0459 6.20066 17.0387 6.30694 17.0111 6.40876C16.9834 6.51058 16.9359 6.60593 16.8713 6.68931C16.8066 6.77269 16.7261 6.84246 16.6344 6.89461L15.7672 7.39541C15.6144 7.48397 15.4953 7.62059 15.4283 7.78396C15.3613 7.94734 15.3502 8.12829 15.3968 8.29861V8.29781Z" fill="currentColor"/>
              </g>
              <defs>
              <clipPath id="clip0_70_5265">
              <rect width="19.2" height="19.2" fill="white" transform="translate(0.400024 0.198608)"/>
              </clipPath>
              </defs>
            </svg>
            {Number(slippageTolerance) > 0.5 &&
            modules.includes(SettingsModule.SlippageTolerance) ? (
              <TooltipProvider>
                <Tooltip delayDuration={150}>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        setSlippageTolerance('0.5')
                      }}
                      className="!rounded-full -mr-1.5 !bg-opacity-50"
                      iconPosition="end"
                      variant={
                        Number(slippageTolerance) > 2 ? 'warning' : 'secondary'
                      }
                      size="xs"
                      asChild
                      icon={XMarkIcon}
                    >
                      {slippageTolerance}%
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Reset slippage tolerance</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : null}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Adjust to your personal preferences.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          {modules.includes(SettingsModule.SlippageTolerance) && (
            <List className="!pt-0">
              <List.Control className='border-neubrutal'>
                <SlippageTolerance options={options?.slippageTolerance} />
              </List.Control>
            </List>
          )}
          {modules.length > 1 && (
            <List className="!pt-0">
              <List.Control className={classNames(
                modules.includes(SettingsModule.CarbonOffset) || modules.includes(SettingsModule.ExpertMode) ? '' : '!border-none'
              )}>
                {modules.includes(SettingsModule.ExpertMode) && <ExpertMode />}
                {modules.includes(SettingsModule.CarbonOffset) && (
                  <CarbonOffset />
                )}
              </List.Control>
            </List>
          )}
          {/* {modules.includes(SettingsModule.SwapApi) && (
            <List className="!pt-0">
              <List.Control>
                <SwapApi />
              </List.Control>
            </List>
          )} */}
        </div>
      </DialogContent>
    </Dialog>
  )
}
