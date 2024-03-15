import { FC, useCallback, useEffect, useMemo, useState } from "react"
import ReactECharts from 'echarts-for-react'
import { EChartsOption } from 'echarts-for-react/lib/types'
import { CardDescription, CardHeader, CardTitle, SkeletonBox, SkeletonText, classNames } from "@sushiswap/ui"
import { format } from 'date-fns'
import { formatUSD } from 'sushi/format'
import { graphic } from 'echarts'
import tailwindConfig from 'tailwind.config.js'
import resolveConfig from 'tailwindcss/resolveConfig'
import { SWAP_TRANSACTION_API } from "@sushiswap/client"
import { useDerivedStateSimpleSwap } from "./derivedstate-simple-swap-provider"
const tailwind = resolveConfig(tailwindConfig)

interface ISimpleSwapLineChart {
  resolution: string
}

export const SimpleSwapLineChart: FC<ISimpleSwapLineChart> = ({
  resolution
}) => {
  const [xData, setXData] = useState<Array<number>>([])
  const [yData, setYData] = useState<Array<number>>([])
  const {
    state: { token0, token1 },
  } = useDerivedStateSimpleSwap()
  // Transient update for performance
  const onMouseOver = useCallback(
    ({ name, value }: { name: number; value: number }) => {
      const valueNodes = document.getElementsByClassName('hoveredItemValue')
      const nameNodes = document.getElementsByClassName('hoveredItemName')

      valueNodes[0].innerHTML = formatUSD(value)
      nameNodes[0].innerHTML = format(
        new Date(Number(name)),
        'dd MMM yyyy HH:mm',
      )
    },
    [],
  )

  const fetchHistoryLine = async (token0: string, token1: string, type: string) => {
    const res = await fetch(`${SWAP_TRANSACTION_API}/market/history-line?token0=${token0}&token1=${token1}&type=${type}`)
    const dataChart = await res.json()
    if(dataChart.data?.length > 0) {
      let xData: Array<number> = []
      let yData: Array<number> = []
      dataChart.data.forEach((item: any) => {
        xData.push(item.xData)
        yData.push(item.yData)
      });
      setXData(xData)
      setYData(yData)

    }
  }

  useEffect(() => {
    if(token0?.wrapped.address && token1?.wrapped.address) {
      const _resolution = ['D1', 'D7', 'D30'].indexOf(resolution) === -1 ? 'D7' : resolution
      fetchHistoryLine(token0?.wrapped.address, token1.wrapped.address, _resolution)
    }
  }, [token0, token1, resolution])



  const DEFAULT_OPTION: EChartsOption = useMemo(
    () => ({
      tooltip: {
        trigger: 'axis',
        extraCssText: 'z-index: 1000',
        responsive: true,
        // @ts-ignore
        backgroundColor: tailwind.theme?.colors.primary,
        textStyle: {
          // @ts-ignore
          color: tailwind.theme.colors.slate['50'],
          fontSize: 12,
          fontWeight: 600,
        },
        formatter: (params: any) => {
          onMouseOver({ name: params[0].name, value: params[0].value })

          const date = new Date(Number(params[0].name))
          return `<div class="flex flex-col gap-0.5">
            <span class="text-sm text-black font-bold">${params[0].value}</span>
            <span class="text-xs text-black font-medium">${
              date instanceof Date && !Number.isNaN(date?.getTime())
                ? format(date, 'dd MMM yyyy HH:mm')
                : ''
            }</span>
          </div>`
        },
        borderWidth: 0,
      },
      toolbox: {
        show: true,
      },
      grid: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
      dataZoom: {
        show: false,
        start: 0,
        end: 100,
      },
      visualMap: {
        show: false,
        // @ts-ignore
        color: [tailwind.theme.colors.primary],
      },
      xAxis: [
        {
          show: false,
          type: 'category',
          boundaryGap: true,
          data: xData,
        },
      ],
      yAxis: [
        {
          show: false,
          type: 'value',
          scale: true,
          name: 'Volume',
          max: 'dataMax',
          min: 'dataMin',
        },
      ],
      series: [
        {
          name: 'Volume',
          type: 'line',
          xAxisIndex: 0,
          yAxisIndex: 0,
          itemStyle: {
            color: 'blue',
            normal: {
              barBorderRadius: 2,
            },
          },
          areaStyle: {
            // @ts-ignore
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(142, 241, 2, 1)'
              },
              {
                offset: 1,
                color: 'rgba(142, 241, 2, 0)'
              }])
  ,
          },
          animationEasing: 'elasticOut',
          animationDelayUpdate: function (idx: number) {
            return idx * 2
          },
          data: yData,
        },
      ],
    }),
    [onMouseOver, xData, yData],
  )
  return (
    <div className="flex flex-col	h-full">
      <CardHeader className="border-t border-accent">
        <CardTitle>
          {yData?.length ? (
            <span className="hoveredItemValue">
              {yData[yData.length - 1]}
            </span>
          ) : (
            <SkeletonText fontSize="sm" />
          )}
        </CardTitle>
        <CardDescription>
          {xData?.length ? (
            <div className="text-sm text-gray-500 dark:text-slate-500 hoveredItemName">
              {format(
                new Date(xData[xData.length - 1]),
                'dd MMM yyyy HH:mm',
              )}
            </div>
          ) : (
            <SkeletonText fontSize="sm" />
          )}
        </CardDescription>
      </CardHeader>
      <div className="h-[100%] pb-2">
        {xData ? (
          <ReactECharts option={DEFAULT_OPTION} style={{ height: '100%' }} />
        ) : (
          <SkeletonBox
            className={classNames(
              'h-full w-full dark:via-slate-800 dark:to-slate-900',
            )}
          />
        )}
      </div>
    </div>
  )
}