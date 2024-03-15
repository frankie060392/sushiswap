import { Card, Loader, DataTable } from "@sushiswap/ui";
import { FC, useEffect, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { GetTransactionsArgs } from '@sushiswap/client'
import {
  DATE_COLUMN,
  TYPE_COLUMN,
  AMOUNT_IN_COLUMN,
  AMOUNT_OUT_COLUMN,
  PRICE_COLUMN,
  MAKER_COLUMN,
  TXN_COLUMN
} from "./columns";
import { useDerivedStateSimpleSwap } from "./derivedstate-simple-swap-provider";
import { useTransactionsInfinite } from "@sushiswap/client/hooks";
import { useSWRConfig } from "swr";
import { TableState } from "@tanstack/react-table";
import keyBy from 'lodash.keyby'
import { config } from "src/config";

export const  SimpleSwapTransaction: FC = () => {
  const {
    state: { token0, token1, transactions: newTransactions },
    mutate: { addNewTransaction },
  } = useDerivedStateSimpleSwap()

  const args = useMemo<GetTransactionsArgs>(() => {
    return {
      token0: token0?.wrapped.address || '',
      token1: token1?.wrapped.address || '',
      page: 1,
      size: 30
    }
  }, [token0, token1])


  const {
    data: transactions,
    isValidating,
    error,
    size,
    setSize,
  } = useTransactionsInfinite({ args, shouldFetch: args.token0 && args.token1 ? true : false, swrConfig: useSWRConfig() })
  


  const data = useMemo(() => {
    let _newTransaction = newTransactions
    if(transactions && _newTransaction.length > 0 && transactions[0].data.length > 0) {
      const keyOfTransaction = keyBy(transactions?.[0].data, 'hash')
      _newTransaction = newTransactions.filter((item) => {
        return !keyOfTransaction[item.hash]
      })

    }
    return transactions ?  _newTransaction.concat(...transactions.map(page => page?.data)) : []
  }
  , [transactions, newTransactions])

  useEffect(() => {
    if(token0?.wrapped.address && token1?.wrapped.address) {
      addNewTransaction()
    }
  }, [token0?.wrapped.address, token1?.wrapped.address])


  const state: Partial<TableState> = useMemo(() => {
    return {
      pagination: {
        pageIndex: 0,
        pageSize: data.length,
      },
    }
  }, [data])
  
  const isLoadmore = useMemo(() => {
    if(args.size && data.length < size  * args.size) {
      return false
    }
    return true
  }, [data.length, size, args.size])


  const COLUMNS = [
    TYPE_COLUMN,
    AMOUNT_IN_COLUMN,
    AMOUNT_OUT_COLUMN,
    PRICE_COLUMN(`${token0?.symbol} / ${token1?.symbol}`),
    MAKER_COLUMN,
    TXN_COLUMN,
    DATE_COLUMN,
  ]
  return (
    <div id="scrollableTransaction" className="h-[600px] overflow-auto border-neubrutal rounded-lg">
      <InfiniteScroll
        dataLength={data.length}
        next={() => setSize((prev) => prev + 1)}
        hasMore={isLoadmore}
        loader={
          <div className="flex justify-center w-full py-4">
            <Loader size={16} />
          </div>
        }
        scrollableTarget="scrollableTransaction"
      >
        <Card className="!border-none">
          {
            data && <DataTable
              state={state}
              loading={!data && isValidating}
              columns={COLUMNS}
              data={data}
            />
          }
        </Card>
      </InfiniteScroll>
    </div>
  )
}