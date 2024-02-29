
  import { SWAP_TRANSACTION_API } from '@sushiswap/client'
import { RESOLUTION } from '../constants'
  import { useStreaming } from './useStreaming'

  const BASE_URL = SWAP_TRANSACTION_API
  async function makeApiRequest(path: string) {
    try {
      const response = await fetch(`${BASE_URL}/${path}`)
      return response.json()
    } catch (error: any) {
      throw new Error(`CryptoCompare request error: ${error.status}`)
    }
  }
  
  const lastBarsCache = new Map()
  // DatafeedConfiguration implementation
  const configurationData = {
    // Represents the resolutions for bars supported by your datafeed
    supported_resolutions: [1, 5, 15, 30, 60, '240', '1D', '5D', '1W', '1M'],
    // The `symbols_types` arguments are used for the `searchSymbols` method if a user selects this symbol type
    symbols_types: [{ name: 'crypto', value: 'crypto' }]
  }

  
export const useDataFeed = () => {
  const {subscribeOnStream, unsubscribeFromStream} = useStreaming()
  const datafeed = {
    onReady: (callback: any) => {
      setTimeout(() => callback(configurationData))
    },
    resolveSymbol: async (symbolFull: any, onSymbolResolvedCallback: any, onResolveErrorCallback: any) => {
      if (!symbolFull) {
        onResolveErrorCallback('Cannot resolve symbol')
        return ''
      }
      // Symbol information object
      const splitSymbol = symbolFull.split('-')
      const symbolName = splitSymbol[0]
      const symbolInfo = {
        name: symbolFull,
        // full_name: splitSymbol[1],
        key: splitSymbol[1],
        ticker: splitSymbol[1],
        tokens: splitSymbol[1]?.split('_'),
        description: symbolName.toUpperCase(),
        // type: symbolItem.type,
        session: '24x7',
        // eslint-disable-next-line new-cap
        // exchange: symbolItem.exchange,
        // timezone: moment.tz.guess() || 'Asia/Singapore',
        minmov: 1,
        pricescale: '1e8',
        has_intraday: true,
        has_no_volume: false,
        has_weekly_and_monthly: true,
        supported_resolutions: configurationData.supported_resolutions,
        volume_precision: 3,
        data_status: 'streaming'
      }
      onSymbolResolvedCallback(symbolInfo)
    },

    getBars: async (
      symbolInfo: any,
      resolution: string,
      rangeStartDate: number,
      rangeEndDate: number,
      onResult: any,
      onError: any,
      isFirstCall: boolean
    ) => {
      const resolutions: any = RESOLUTION
      const from = rangeStartDate * 1000
      const to = rangeEndDate * 1000

      const urlParameters: any = {
        // pair: symbolInfo.full_name?.toLowerCase(),
        token0: symbolInfo.tokens[0].trim(),
        token1: symbolInfo.tokens[1].trim(),
        from: from,
        to: to,
        type: resolutions[resolution] || 'H1'
      }
      const query = Object.keys(urlParameters)
        .map((name) => `${name}=${encodeURIComponent(urlParameters[name])}`)
        .join('&')
      try {
        let url = `market/history-candle?${query}`
        const res = await makeApiRequest(url)
        if ((res.data.length === 0 && res.status === 'error') || res.data.length === 0) {
          // "noData" should be set if there is no data in the requested period
          onResult([], { noData: true })
          if(isFirstCall) return
        }
        let bars: any = []
        res.data.forEach((bar: any) => {
          if (bar.time >= from && bar.time < to) {
            bars = [
              ...bars,
              {
                time: bar.time,
                low: bar.low,
                high: bar.high,
                open: bar.open,
                close: bar.close,
                volume: bar.volume
              }
            ]
          }
        })
        if (isFirstCall) {
          lastBarsCache.set(symbolInfo.key, {
            ...bars[bars.length - 1]
          })
        }
        onResult(bars, { noData: false })
      } catch (error) {
        onError(error)
      }
    },

    subscribeBars: (symbolInfo: any, resolution: any, onRealtimeCallback: any, subscriberUID: any, onResetCacheNeededCallback: any) => {
      subscribeOnStream(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback, lastBarsCache.get(symbolInfo.key))
    },
    unsubscribeBars: (subscriberUID: any) => {
      unsubscribeFromStream(subscriberUID)
    }
  }
  return {
    datafeed
  }

}