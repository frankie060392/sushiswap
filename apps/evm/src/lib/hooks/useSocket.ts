
import { decodeMulti } from '@msgpack/msgpack'
import { useStreaming } from './useStreaming'
import { useMemo } from 'react'
// import { handleCandle, handleTransaction } from '../streaming'
// import { handleCandle, handleTransaction } from './streaming'
interface TOPIC_MESSAGE {
  topic?: string | null
  type?: string
  email?: string,
  symbol?: string
}
const SOCKET_TYPES = {
  CANDLE: 0,
  DEPTH: 1,
  MARKET_OVERVIEW: 4,
  ORDER_BOOK: 2,
  MARKET_TRADES: 3,
  TRANSACTION: 6,
}
let _socket: any
let intervalWs: any
let isConnected = false
let socketClosed = false
let isSwitchSocket = false
let currentCandleMessage: TOPIC_MESSAGE
let currentTransactionMessage: TOPIC_MESSAGE



export const useSocket = () => {
  const { handleCandle, handleTransaction } = useStreaming()

  return useMemo(() => {

  function ping() {
    clearInterval(intervalWs)
    intervalWs = setInterval(() => {
      if (_socket && _socket.readyState === WebSocket.OPEN) {
        _socket.send('pong')
      }
    }, 5000)
  }
  
  function createWebsocket() {
    clearInterval(intervalWs)
    if(!_socket) {
      return new Promise((resolve) => {
        _socket = new WebSocket('wss://ws.u2w.io/m')
        _socket.onopen = () => {
          isConnected = true
          socketClosed = false
          resolve(true)
          ping()
          setTimeout(() => {
            isSwitchSocket = false
          })
        }
    
        _socket.onclose = (code: any) => {
          if (isSwitchSocket) {
            return
          }
          console.log('Close server', code)
          _socket = null
          isConnected = false
          socketClosed = true
          resolve(false)
          clearInterval(intervalWs)
        }
    
        _socket.onmessage = (event: any) => {
          if (event.data instanceof Blob) {
            event.data?.arrayBuffer().then((e: any) => {
              const buffer = new Uint8Array(e)
              const unpacker = decodeMulti(buffer)
              const type = unpacker.next().value
              switch (type) {
                case SOCKET_TYPES.CANDLE:
                  handleCandle(unpacker)
                  break
                case SOCKET_TYPES.TRANSACTION:
                  handleTransaction(unpacker)
                  break
                default:
              }
            })
          }
          // store.dispatch('socket_b', event)
        }
      })
    }
  }
  
  function unsubcribe(message: TOPIC_MESSAGE) {
    if (!message) return
    if (_socket && _socket.readyState === WebSocket.OPEN) {
      _socket.send(
        JSON.stringify({
          ...message,
          cmd: 'unsubscribe'
        })
      )
    }
  }
  
  function subcribe(message: TOPIC_MESSAGE) {
    if (_socket && _socket.readyState === WebSocket.OPEN) {
      _socket.send(
        JSON.stringify({
          cmd: 'subscribe',
          ...message
        })
      )
    }
  }
  
  function unsubcribeCandle() {
    if (currentCandleMessage) {
      unsubcribe(currentCandleMessage)
    }
  }
  
  function getCandle(resolution: string, symbol: string) {
    // const topic = `cloud.candle.${resolution}.${symbol}`
    unsubcribeCandle()
    currentCandleMessage = {
      topic: resolution,
      type: 'candle',
      symbol,
    }
    subcribe(currentCandleMessage)
  }
  
  function subcribeTransaction(symbol: string) {
    unsubcribe(currentTransactionMessage)
    currentTransactionMessage = {
      type: 'transactions',
      symbol,
    }
    subcribe(currentTransactionMessage)
  }
  return {
    subcribeTransaction,
    getCandle,
    createWebsocket
  }
},[])

}