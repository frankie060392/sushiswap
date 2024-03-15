'use client'

import React, { FC, useState } from 'react'
import { SimpleSwapTransaction } from './simple-swap-transaction'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Switch, Tabs, TabsContent, TabsList, TabsTrigger } from '@sushiswap/ui';
import { InformationCircleIcon } from '@heroicons/react/20/solid';
// import { SimpleSwapLiquidity } from './simple-swap-liquidity';

export const SimpleSwapInfomation = () => {
  const FILTERS: { id: string; value: string; children: React.ReactNode }[] = [
    {
      id: 'transactions',
      value: 'transactions',
      children: (
        <div className='flex items-center gap-2'>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <g clip-path="url(#clip0_70_5308)">
              <path d="M19 22.0006H5C3.67441 21.999 2.40356 21.4717 1.46622 20.5344C0.528882 19.5971 0.00158786 18.3262 0 17.0006L0 7.00061C0.00158786 5.67502 0.528882 4.40417 1.46622 3.46683C2.40356 2.52949 3.67441 2.0022 5 2.00061H19C20.3256 2.0022 21.5964 2.52949 22.5338 3.46683C23.4711 4.40417 23.9984 5.67502 24 7.00061V17.0006C23.9984 18.3262 23.4711 19.5971 22.5338 20.5344C21.5964 21.4717 20.3256 21.999 19 22.0006ZM5 4.00061C4.20435 4.00061 3.44129 4.31668 2.87868 4.87929C2.31607 5.4419 2 6.20496 2 7.00061V17.0006C2 17.7963 2.31607 18.5593 2.87868 19.1219C3.44129 19.6845 4.20435 20.0006 5 20.0006H19C19.7956 20.0006 20.5587 19.6845 21.1213 19.1219C21.6839 18.5593 22 17.7963 22 17.0006V7.00061C22 6.20496 21.6839 5.4419 21.1213 4.87929C20.5587 4.31668 19.7956 4.00061 19 4.00061H5Z" fill="currentColor"/>
              <path d="M18.9998 13.0006H10.9998C10.7345 13.0006 10.4802 12.8953 10.2926 12.7077C10.1051 12.5202 9.99976 12.2658 9.99976 12.0006C9.99976 11.7354 10.1051 11.481 10.2926 11.2935C10.4802 11.106 10.7345 11.0006 10.9998 11.0006H18.9998C19.265 11.0006 19.5193 11.106 19.7069 11.2935C19.8944 11.481 19.9998 11.7354 19.9998 12.0006C19.9998 12.2658 19.8944 12.5202 19.7069 12.7077C19.5193 12.8953 19.265 13.0006 18.9998 13.0006Z" fill="currentColor"/>
              <path d="M6.99999 13.0006H5C4.73478 13.0006 4.48043 12.8953 4.29289 12.7077C4.10536 12.5202 4 12.2658 4 12.0006C4 11.7354 4.10536 11.481 4.29289 11.2935C4.48043 11.106 4.73478 11.0006 5 11.0006H6.99999C7.26521 11.0006 7.51956 11.106 7.7071 11.2935C7.89464 11.481 7.99999 11.7354 7.99999 12.0006C7.99999 12.2658 7.89464 12.5202 7.7071 12.7077C7.51956 12.8953 7.26521 13.0006 6.99999 13.0006Z" fill="currentColor"/>
              <path d="M13 17.9994H5C4.73478 17.9994 4.48043 17.894 4.29289 17.7065C4.10536 17.519 4 17.2646 4 16.9994C4 16.7342 4.10536 16.4798 4.29289 16.2923C4.48043 16.1047 4.73478 15.9994 5 15.9994H13C13.2652 15.9994 13.5196 16.1047 13.7071 16.2923C13.8946 16.4798 14 16.7342 14 16.9994C14 17.2646 13.8946 17.519 13.7071 17.7065C13.5196 17.894 13.2652 17.9994 13 17.9994Z" fill="currentColor"/>
              <path d="M18.9998 17.9994H16.9998C16.7345 17.9994 16.4802 17.894 16.2926 17.7065C16.1051 17.519 15.9998 17.2646 15.9998 16.9994C15.9998 16.7342 16.1051 16.4798 16.2926 16.2923C16.4802 16.1047 16.7345 15.9994 16.9998 15.9994H18.9998C19.265 15.9994 19.5193 16.1047 19.7069 16.2923C19.8944 16.4798 19.9997 16.7342 19.9997 16.9994C19.9997 17.2646 19.8944 17.519 19.7069 17.7065C19.5193 17.894 19.265 17.9994 18.9998 17.9994Z" fill="currentColor"/>
              </g>
              <defs>
              <clipPath id="clip0_70_5308">
              <rect width="24" height="24" fill="white"/>
              </clipPath>
              </defs>
            </svg>  
          </span>{' '}
          <span className='flex items-center gap-1.5 font-display font-bold text-xl'>
            Transactions
            <sup>
              <InformationCircleIcon className="w-4 h-4"/>
            </sup>
          </span>
        </div>
      ),
    },
    // {
    //   id: 'liquidity-providers',
    //   value: 'liquidity',
    //   children: (
    //     <div className='flex items-center gap-2'>
    //       <span>
    //         <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
    //           <mask id="path-1-inside-1_70_5394" fill="white">
    //           <path d="M24.1634 8.7957C23.1287 7.76101 21.9004 6.94024 20.5485 6.38026C19.1966 5.82029 17.7476 5.53207 16.2843 5.53207C14.821 5.53207 13.3721 5.82029 12.0202 6.38026C10.6683 6.94024 9.43992 7.76101 8.40522 8.7957C7.37053 9.8304 6.54976 11.0588 5.98978 12.4107C5.42981 13.7626 5.14159 15.2115 5.14159 16.6748C5.14159 18.1381 5.42981 19.587 5.98978 20.9389C6.54976 22.2908 7.37053 23.5192 8.40522 24.5539L9.78781 23.1713C8.93467 22.3182 8.25793 21.3054 7.79621 20.1907C7.3345 19.076 7.09686 17.8813 7.09686 16.6748C7.09686 15.4683 7.3345 14.2736 7.79621 13.1589C8.25793 12.0442 8.93467 11.0314 9.78781 10.1783C10.6409 9.32515 11.6538 8.64841 12.7684 8.18669C13.8831 7.72498 15.0778 7.48734 16.2843 7.48734C17.4908 7.48734 18.6855 7.72498 19.8002 8.18669C20.9149 8.64841 21.9277 9.32515 22.7808 10.1783L24.1634 8.7957Z"/>
    //           </mask>
    //           <path d="M24.1634 8.7957C23.1287 7.76101 21.9004 6.94024 20.5485 6.38026C19.1966 5.82029 17.7476 5.53207 16.2843 5.53207C14.821 5.53207 13.3721 5.82029 12.0202 6.38026C10.6683 6.94024 9.43992 7.76101 8.40522 8.7957C7.37053 9.8304 6.54976 11.0588 5.98978 12.4107C5.42981 13.7626 5.14159 15.2115 5.14159 16.6748C5.14159 18.1381 5.42981 19.587 5.98978 20.9389C6.54976 22.2908 7.37053 23.5192 8.40522 24.5539L9.78781 23.1713C8.93467 22.3182 8.25793 21.3054 7.79621 20.1907C7.3345 19.076 7.09686 17.8813 7.09686 16.6748C7.09686 15.4683 7.3345 14.2736 7.79621 13.1589C8.25793 12.0442 8.93467 11.0314 9.78781 10.1783C10.6409 9.32515 11.6538 8.64841 12.7684 8.18669C13.8831 7.72498 15.0778 7.48734 16.2843 7.48734C17.4908 7.48734 18.6855 7.72498 19.8002 8.18669C20.9149 8.64841 21.9277 9.32515 22.7808 10.1783L24.1634 8.7957Z" stroke="url(#paint0_linear_70_5394)" stroke-width="4" mask="url(#path-1-inside-1_70_5394)"/>
    //           <mask id="path-2-inside-2_70_5394" fill="white">
    //           <path d="M24.6472 9.27945C25.6819 10.3141 26.5026 11.5425 27.0626 12.8944C27.6226 14.2463 27.9108 15.6953 27.9108 17.1585C27.9108 18.6218 27.6226 20.0708 27.0626 21.4227C26.5026 22.7746 25.6819 24.0029 24.6472 25.0376C23.6125 26.0723 22.3841 26.8931 21.0322 27.4531C19.6803 28.0131 18.2314 28.3013 16.7681 28.3013C15.3048 28.3013 13.8558 28.0131 12.5039 27.4531C11.152 26.8931 9.92366 26.0723 8.88896 25.0376L10.2715 23.6551C11.1247 24.5082 12.1375 25.1849 13.2522 25.6467C14.3668 26.1084 15.5616 26.346 16.7681 26.346C17.9746 26.346 19.1693 26.1084 20.284 25.6467C21.3986 25.1849 22.4115 24.5082 23.2646 23.6551C24.1177 22.8019 24.7945 21.7891 25.2562 20.6744C25.7179 19.5598 25.9555 18.3651 25.9555 17.1585C25.9555 15.952 25.7179 14.7573 25.2562 13.6427C24.7945 12.528 24.1177 11.5152 23.2646 10.662L24.6472 9.27945Z"/>
    //           </mask>
    //           <path d="M24.6472 9.27945C25.6819 10.3141 26.5026 11.5425 27.0626 12.8944C27.6226 14.2463 27.9108 15.6953 27.9108 17.1585C27.9108 18.6218 27.6226 20.0708 27.0626 21.4227C26.5026 22.7746 25.6819 24.0029 24.6472 25.0376C23.6125 26.0723 22.3841 26.8931 21.0322 27.4531C19.6803 28.0131 18.2314 28.3013 16.7681 28.3013C15.3048 28.3013 13.8558 28.0131 12.5039 27.4531C11.152 26.8931 9.92366 26.0723 8.88896 25.0376L10.2715 23.6551C11.1247 24.5082 12.1375 25.1849 13.2522 25.6467C14.3668 26.1084 15.5616 26.346 16.7681 26.346C17.9746 26.346 19.1693 26.1084 20.284 25.6467C21.3986 25.1849 22.4115 24.5082 23.2646 23.6551C24.1177 22.8019 24.7945 21.7891 25.2562 20.6744C25.7179 19.5598 25.9555 18.3651 25.9555 17.1585C25.9555 15.952 25.7179 14.7573 25.2562 13.6427C24.7945 12.528 24.1177 11.5152 23.2646 10.662L24.6472 9.27945Z" stroke="url(#paint1_linear_70_5394)" stroke-width="4" mask="url(#path-2-inside-2_70_5394)"/>
    //           <ellipse cx="21.3442" cy="7.33721" rx="2.31179" ry="2.31179" transform="rotate(15 21.3442 7.33721)" fill="#667085"/>
    //           <ellipse cx="11.4174" cy="26.6236" rx="2.31179" ry="2.31179" transform="rotate(15 11.4174 26.6236)" fill="#667085"/>
    //           <ellipse cx="16.7679" cy="17.1587" rx="6.04817" ry="6.04817" transform="rotate(15 16.7679 17.1587)" fill="#667085"/>
    //           <path fill-rule="evenodd" clip-rule="evenodd" d="M16.768 22.2498C19.5798 22.2498 21.8593 19.9703 21.8593 17.1585C21.8593 14.3467 19.5798 12.0673 16.768 12.0673C13.9562 12.0673 11.6768 14.3467 11.6768 17.1585C11.6768 19.9703 13.9562 22.2498 16.768 22.2498ZM19.2873 17.1585L16.768 14.6393L14.2488 17.1585L16.768 19.6778L19.2873 17.1585Z" fill="currentColor"/>
    //           <path fill-rule="evenodd" clip-rule="evenodd" d="M21.344 9.28329C22.4187 9.28329 23.29 8.41203 23.29 7.33727C23.29 6.2625 22.4187 5.39124 21.344 5.39124C20.2692 5.39124 19.3979 6.2625 19.3979 7.33727C19.3979 8.41203 20.2692 9.28329 21.344 9.28329ZM22.307 7.33702L21.3441 6.37408L20.3811 7.33702L21.3441 8.29995L22.307 7.33702Z" fill="currentColor"/>
    //           <path fill-rule="evenodd" clip-rule="evenodd" d="M11.4175 28.5699C12.4922 28.5699 13.3635 27.6986 13.3635 26.6239C13.3635 25.5491 12.4922 24.6779 11.4175 24.6779C10.3427 24.6779 9.47144 25.5491 9.47144 26.6239C9.47144 27.6986 10.3427 28.5699 11.4175 28.5699ZM12.3804 26.6237L11.4175 25.6607L10.4545 26.6237L11.4175 27.5866L12.3804 26.6237Z" fill="currentColor"/>
    //           <defs>
    //           <linearGradient id="paint0_linear_70_5394" x1="7.02659" y1="22.259" x2="23.9392" y2="9.05892" gradientUnits="userSpaceOnUse">
    //           <stop stop-color="currentColor"/>
    //           <stop offset="1" stop-color="currentColor" stop-opacity="0"/>
    //           </linearGradient>
    //           <linearGradient id="paint1_linear_70_5394" x1="26.7237" y1="11.8434" x2="10.9454" y2="25.3529" gradientUnits="userSpaceOnUse">
    //           <stop stop-color="currentColor"/>
    //           <stop offset="1" stop-color="currentColor" stop-opacity="0"/>
    //           </linearGradient>
    //           </defs>
    //         </svg>  
    //       </span>{' '}
    //       <span className='flex items-center gap-1.5 font-display font-bold text-xl'>
    //         Liquidity Providers
    //         <sup>
    //           <InformationCircleIcon className="w-4 h-4"/>
    //         </sup>
    //       </span>
    //     </div>
    //   ),
    // },
  ]
  const [tab, setTab] = useState('transactions')
  return (
    <div>
      <Tabs value={tab} onValueChange={setTab} defaultValue='transactions'>
        <div className="flex justify-between mb-4">
          <div className="block sm:hidden">
            <Select value={tab} onValueChange={setTab}>
              <SelectTrigger>
                <SelectValue placeholder="Pool type" />
              </SelectTrigger>
              <SelectContent>
                {FILTERS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.children}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <TabsList className='hidden sm:inline-flex border-0'>
            {FILTERS.map((item) => (
              <TabsTrigger
                className='border-0 border-b rounded-none color-base data-[state=active]:shadow-none data-[state=active]:border-primary data-[state=active]:!bg-transparent data-[state=active]:!text-primary hover:text-hover'
                key={item.value}
                value={item.value}
                testdata-id={item.id}
              >
                {item.children}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <TabsContent value='transactions'>
          {/* <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center'>
              <div className='rounded-lg border-2 border-transparent color-base filter-chart-active text-sm px-6 py-1 cursor-pointer hover:text-hover transaction-colors'>All</div>
              <div className='rounded-lg border-2 border-transparent color-base text-sm px-6 py-1 cursor-pointer hover:text-hover transaction-colors'>Swap</div>
              <div className='rounded-lg border-2 border-transparent color-base text-sm px-6 py-1 cursor-pointer hover:text-hover transaction-colors'>Add</div>
              <div className='rounded-lg border-2 border-transparent color-base text-sm px-6 py-1 cursor-pointer hover:text-hover transaction-colors'>Remote</div>
            </div>
            <div className='flex items-center'>
            <Switch
                checked={true}
                // onCheckedChange={(checked) =>
                //   setSlippageTolerance(checked ? 'AUTO' : '0.5')
                // }
              />
              <span className='color-base ml-4'>Only my transactions</span>
            </div>
          </div> */}
          <SimpleSwapTransaction/>
        </TabsContent>
        <TabsContent value='liquidity'>
          {/* <SimpleSwapLiquidity/> */}
        </TabsContent>
      </Tabs>
    </div>
  )
}