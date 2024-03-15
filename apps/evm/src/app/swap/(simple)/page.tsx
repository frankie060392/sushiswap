import { Container } from '@sushiswap/ui'
import { SimpleSwapWidget } from 'src/ui/swap/simple/simple-swap-widget'
import { SimpleSwapChartContainer } from 'src/ui/swap/simple/simple-swap-chart-container'
import { Providers } from './providers'
import { SimpleSwapInfomation } from 'src/ui/swap/simple/simple-swap-infomation'

export const metadata = {
  title: 'U2DEX',
}

export default function SwapSimplePage() {
  return (
    <Providers>
      <Container maxWidth="screen-3xl" className='px-4'>
        <div className='xl:grid xl:grid-cols-3 xl:grid-rows-1 xl:gap-10'>
          <div className='xl:order-2 mb-10 xl:mb-0'>
            <SimpleSwapWidget/>
          </div>
          <div className="xl:col-span-2 xl:order-1">
            <div className='h-[500px] lg:h-[660px] xl:h-[720px]'>
              <SimpleSwapChartContainer/>
            </div>
            <div className='pt-10 xl:pt-14'>
              <SimpleSwapInfomation/>
            </div>
          </div>
        </div>
      </Container>
    </Providers>
  )
}
