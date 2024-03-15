'use client'

import { Navigation } from '@sushiswap/ui/components/navigation'
import { WagmiHeaderComponents } from '@sushiswap/wagmi/components'
import React, { FC } from 'react'
import { SUPPORTED_CHAIN_IDS } from 'src/config'
import {
  Container
} from '@sushiswap/ui'

export const Header: FC = () => {
  return (
    <Container maxWidth="screen-3xl" className="mx-auto">
      <Navigation
        rightElement={<WagmiHeaderComponents chainIds={SUPPORTED_CHAIN_IDS} />}
      />
    </Container>
  )
}
