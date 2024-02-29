import useSWRInfinite from 'swr/infinite'

import { type InfiniteSWRHookConfig } from '../../types'
import { getTransactionsUrl, type GetTransactionsArgs } from '../../pure/swap-transactions'

export const useTransactionsInfinite = ({
  args,
}: InfiniteSWRHookConfig<GetTransactionsArgs>) => {
  return useSWRInfinite(
    (pageIndex) => {
      // add the cursor to the API endpoint
      return getTransactionsUrl({...args, page: pageIndex +  1})
    },
    (url) => fetch(url).then((data) => data.json()),
  )
}
