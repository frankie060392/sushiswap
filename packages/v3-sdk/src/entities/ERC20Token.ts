import { Token } from "sushi/currency";
import { validateAndParseAddress } from "..";

export class ERC20Token extends Token {
  public constructor(
    chainId: number,
    address: string,
    decimals: number,
    symbol: string,
    name?: string,
  ) {
    super({chainId, address: validateAndParseAddress(address), decimals, symbol, name})
  }
}