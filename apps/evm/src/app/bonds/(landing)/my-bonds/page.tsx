import { Container } from '@sushiswap/ui'
import React from 'react'
import {
  BondsPositionsTable,
  TableFiltersAuctionType,
  TableFiltersNetwork,
  TableFiltersPositiveDiscountOnly,
  TableFiltersResetButton,
} from '../../../../ui/bonds'

export default async function MyBondsPage() {
  return (
    <Container maxWidth="7xl" className="px-4">
      <div className="flex flex-wrap gap-3 mb-4">
        <TableFiltersNetwork />
        <TableFiltersAuctionType />
        <TableFiltersPositiveDiscountOnly />
        <TableFiltersResetButton />
      </div>
      <BondsPositionsTable />
    </Container>
  )
}
