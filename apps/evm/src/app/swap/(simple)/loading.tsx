import { Container, SkeletonBox } from '@sushiswap/ui'
import React from 'react'

export default function SimpleSwapLoading() {
  return (
    <Container maxWidth="screen-2xl" className="px-4">
      <div className='xl:grid xl:grid-cols-3 xl:grid-rows-1 xl:gap-10'>
      <div className="flex flex-col gap-4 mb-10 xl:mb-0 xl:order-2">
          <div className="flex flex-col gap-2 mb-4 sm:mt-10 mt-2">
            <SkeletonBox className="w-[140px] h-[53px]" />
            <SkeletonBox className="h-[20px] w-[280px]" />
          </div>
          <div className="flex gap-2">
            <SkeletonBox className="h-[36px] w-[125px]" />
            <SkeletonBox className="h-[36px] w-[125px]" />
          </div>
          <SkeletonBox className="w-full h-[92px]" />
          <SkeletonBox className="w-full h-[110px]" />
          <SkeletonBox className="w-full h-[110px]" />
          <SkeletonBox className="w-full h-[52px]" />
        </div>
        <div className='xl:col-span-2 xl:order-1'>
          <SkeletonBox className='w-full h-[420px] lg:h-[600px] xl:h-full' />
        </div>
      </div>
    </Container>
  )
}
