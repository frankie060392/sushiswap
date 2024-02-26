import { Card, Loader, DataTable } from "@sushiswap/ui";
import { FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  DATE_COLUMN,
  TYPE_COLUMN,
  AMOUNT_IN_COLUMN,
  AMOUNT_OUT_COLUMN,
  PRICE_COLUMN,
  MAKER_COLUMN,
  TXN_COLUMN
} from "./columns";

export const  SimpleSwapTransaction: FC = () => {
  const isValidating = false
  const data: any = [
    { date: 'Feb 21 12:49:32 PM', type: 'Swap', amountIn: 0.1, amountOut: 202.31, price: 2021.34, maker: '0xc7Ef468b19760F93EE38AbF50B05b4e6aB154f65', txn: '0xc7Ef468b19760F93EE38AbF50B05b4e6aB154f65' },
  ]
  const COLUMNS = [
    DATE_COLUMN,
    TYPE_COLUMN,
    AMOUNT_IN_COLUMN,
    AMOUNT_OUT_COLUMN,
    PRICE_COLUMN,
    MAKER_COLUMN,
    TXN_COLUMN
  ]
  return (
    <InfiniteScroll
      dataLength={data.length}
      next={() => 1}
      hasMore={data.length < 0}
      loader={
        <div className="flex justify-center w-full py-4">
          <Loader size={16} />
        </div>
      }
    >
      <Card>
        <DataTable
          loading={isValidating}
          columns={COLUMNS}
          data={data}
        />
      </Card>
    </InfiniteScroll>
  )
}