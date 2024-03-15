import { Button, LinkExternal, SkeletonText } from "@sushiswap/ui";
import { shortenAddress, shortenHash } from "sushi/format";
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid'
import { formatDistance } from "date-fns";

const scanUrl = process.env.NEXT_PUBLIC_U2U_EXPLORER_URL

export const DATE_COLUMN = {
  id: 'date',
  header: 'DATE',
  cell: (props: any) => (
    <div className="whitespace-nowrap">
      {formatDistance(props.row.original.timestamp * 1000, new Date(), {
        addSuffix: true,
      })?.replaceAll('about', '')}
    </div>
  ),
  meta: {
    skeleton: <SkeletonText fontSize="lg" />
  },
}

export const TYPE_COLUMN = {
  id: 'type',
  header: 'TYPE',
  cell: (props: any) => (
    <div className={(props.row.original.type === 'Swap' ? 'color-yellow' : props.row.original.type === 'Add' ? 'color-green' : props.row.original.type === 'Remove' ? 'color-red' : '')}>
      {props.row.original.type?.toUpperCase()}
    </div>
  ),
  meta: {
    skeleton: <SkeletonText fontSize="lg" />
  }
}

export const AMOUNT_IN_COLUMN = {
  id: 'amountIn',
  header: 'Amount In',
  cell: (props: any) => (
    <div className="whitespace-nowrap">
      {props.row.original.amountIn}
    </div>
  ),
  meta: {
    skeleton: <SkeletonText fontSize="lg" />
  }
}

export const AMOUNT_OUT_COLUMN = {
  id: 'amountOut',
  header: 'Amount Out',
  cell: (props: any) => (
    <div className="whitespace-nowrap">
      {props.row.original.amountOut}
    </div>
  ),
  meta: {
    skeleton: <SkeletonText fontSize="lg" />
  }
}

export const PRICE_COLUMN = (pair: string) => ({
  id: 'price',
  header: `PRICE ${pair ? `(${pair})` : null}`,
  cell: (props: any) => props.row.original.price,
  meta: {
    skeleton: <SkeletonText fontSize="lg" align="center" />
  }
})

export const MAKER_COLUMN = {
  id: 'maker',
  header: 'MAKER',
  cell: (props: any) => (
    <LinkExternal
    target="_blank" href={`${scanUrl}/address/${props.row.original.maker}`}
  >
    <Button
      asChild
      variant="link"
      size="sm"
      className="!font-medium !text-secondary-foreground"
      title={`${props.row.original.maker}`}
    >
      {shortenAddress(props.row.original.maker, 10)}
      <ArrowTopRightOnSquareIcon className="w-4 h-4" />
    </Button>
  </LinkExternal>
  ),
  meta: {
    skeleton: <SkeletonText align="center" fontSize="lg" />
  },
}
export const TXN_COLUMN = {
  id: 'txn',
  header: 'TXN',
  cell: (props: any) => (
    <LinkExternal
    target="_blank" href={`${scanUrl}/tx/${props.row.original.hash}`}
  >
    <Button
      asChild
      variant="link"
      size="sm"
      className="!font-medium !text-secondary-foreground"
      title={`${props.row.original.hash}`}
    >
      {shortenHash(props.row.original.hash, 10)}
      <ArrowTopRightOnSquareIcon className="w-4 h-4" />
    </Button>
  </LinkExternal>
  ),
  meta: {
    skeleton: <SkeletonText align="center" fontSize="lg" />
  }
}

export const ADDRESS_COLUMN = {
  id: 'address',
  header: 'Address',
  cell: (props: any) => (
    <div title={`${props.row.original.maker}`}>{shortenAddress(props.row.original.maker)}</div>
  ),
  meta: {
    skeleton: <SkeletonText fontSize="lg" />
  }
}

export const PERCENT_COLUMN = {
  id: 'percent',
  header: '%',
  cell: (props: any) => `${props.row.original.percent}%`,
  meta: {
    skeleton: <SkeletonText fontSize="lg" />
  }
}

export const AMOUNT_COLUMN = {
  id: 'percent',
  header: 'AMOUNT',
  cell: (props: any) => (
    <div className="flex items-center gap-4">
      <span className="inline-block min-w-[60px]">{props.row.original.minAmount}M</span>
      <div className="relative h-4 w-[240px] bg-gray-500 rounded-2xl">
        <span className={`absolute left-0 top-0 h-full bg-green-400 rounded-2xl w-[${props.row.original.percent}%]`}></span>
      </div>
      <span className="inline-block min-w-[60px]">{props.row.original.maxAmount}M</span>
    </div>
  ),
  meta: {
    skeleton: <SkeletonText fontSize="lg" />
  }
}

export const TNXS_COLUMN = {
  id: 'txn',
  header: 'TNXS/EXP',
  cell: (props: any) => (
    <div className="inline-flex items-center gap-2">
      <LinkExternal
        href={'javscript:;'}
      >
        <Button
          asChild
          variant="link"
          size="sm"
          className="!font-medium !text-secondary-foreground"
        >
          Tnxs
        </Button>
      </LinkExternal>
      /
      <LinkExternal
        href={'javscript:;'}
      >
        <Button
          asChild
          variant="link"
          size="sm"
          className="!font-medium !text-secondary-foreground"
        >
          Exp
        </Button>
      </LinkExternal>
    </div>
  ),
  meta: {
    skeleton: <SkeletonText fontSize="lg" />
  },
  size: 300,
}