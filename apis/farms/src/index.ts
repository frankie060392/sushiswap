/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { missing } from 'itty-router-extras'
import BigNumber from 'bignumber.js'
import { handler as v3Handler } from './v3'

import cors from 'cors'
import express, { type Express } from 'express'

const app: Express = express()

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 18,
})

app.set('json replacer', (_key: string, value: any) =>
  typeof value === 'bigint' ? value.toString() : value,
)

app.use(cors())

app.get('/v3/:chainId/liquidity/:address', v3Handler)

app.all('*', () => missing('Not found'))

const PORT = process.env.PORT || 3005
app.listen(PORT, () => {
  console.log(`Farms api listening on port ${PORT}`)
})

process.on('SIGTERM', (code) => {
  console.log(`About to exit with code: ${code}`)
})
