import { Toggle } from '@sushiswap/ui/components/toggle'
import React from 'react'

export enum PoolChartType {
  Volume = 'Volume',
  TVL = 'TVL',
  Fees = 'Fees',
  APR = 'APR',
  Depth = 'Depth',
}

interface PoolChartTypesProps<C> {
  charts: Readonly<C[]>
  selectedChart: C
  setChart: (chart: C) => void
}

function PoolChartTypes<C extends string>({
  charts,
  selectedChart,
  setChart,
}: PoolChartTypesProps<C>) {
  return (
    <div className="flex items-center gap-1">
      {charts.map((chart) => (
        <Toggle
          size="xs"
          pressed={chart === selectedChart}
          onClick={() => setChart(chart)}
          key={chart}
          className='!text-sm font-bold color-base border-2 border-transparent data-[state=on]:border-black data-[state=on]:bg-primary data-[state=on]:text-black'
        >
          {chart}
        </Toggle>
      ))}
    </div>
  )
}

export { PoolChartTypes }
