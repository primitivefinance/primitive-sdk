import { ChainId, JSBI, Percent, Token, WETH } from '@uniswap/sdk'
import { parseEther } from 'ethers/lib/utils'
import UniswapConnectorTestnet from '@primitivefi/v1-connectors/deployments/rinkeby/UniswapConnector03.json'
import UniswapConnector from '@primitivefi/v1-connectors/deployments/live/UniswapConnector03.json'
import Trader from '@primitivefi/contracts/deployments/live_1/Trader.json'
import TraderTestnet from '@primitivefi/contracts/deployments/rinkeby/Trader.json'

export interface MarketMetadata {
  name: string
  icon: string
  id: string
  sort: number
  address: string
  active?: boolean
}

export const NAME_FOR_MARKET: { [key: string]: string } = {
  yfi: 'Yearn',
  weth: 'Wrapped ETH',
  sushi: 'Sushi',
  uni: 'Uniswap',
  comp: 'Compound',
  link: 'Link',
  aave: 'Aave',
  snx: 'Synthetix',
  mkr: 'Maker',
}

export const SORT_FOR_MARKET: { [key: string]: number } = {
  yfi: 0,
  weth: 1,
  sushi: 2,
  comp: 3,
  uni: 4,
  link: 5,
  aave: 6,
  snx: 7,
  mkr: 8,
}

export const COINGECKO_ID_FOR_MARKET: { [key: string]: string } = {
  yfi: 'yearn-finance',
  weth: 'weth',
  sushi: 'sushi',
  comp: 'compound-governance-token',
  uni: 'uniswap',
  link: 'chainlink',
  aave: 'aave',
  snx: 'havven',
  mkr: 'maker',
}

export const ADDRESS_FOR_MARKET: { [key: string]: string } = {
  yfi: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
  weth: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  sushi: '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2',
  comp: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
  uni: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
  link: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
  aave: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
  snx: '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F',
  mkr: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2',
}

export const ACTIVE_FOR_MARKET: { [key: string]: boolean } = {
  yfi: true,
  weth: true,
  sushi: false,
  comp: false,
  uni: false,
  link: false,
  aave: false,
  snx: false,
  mkr: false,
}

export const MARKETS: MarketMetadata[] = Object.keys(SORT_FOR_MARKET).map(
  (key): MarketMetadata => {
    return {
      name: NAME_FOR_MARKET[key],
      icon: `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${ADDRESS_FOR_MARKET[key]}/logo.png`,
      id: key,
      sort: SORT_FOR_MARKET[key],
      address: ADDRESS_FOR_MARKET[key],
      active: ACTIVE_FOR_MARKET[key],
    }
  }
)

export const getIconForMarket = (key) => {
  return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${ADDRESS_FOR_MARKET[key]}/logo.png`
}

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'
export const UNI_ROUTER_ADDRESS = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
export const SUSHI_ROUTER_ADDRESS = '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F'
export const SUSHI_FACTORY_ADDRESS =
  '0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac'

export const STABLECOINS: { [key: number]: Token } = {
  1: new Token(
    ChainId.MAINNET,
    '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    18,
    'DAI',
    'Dai Stablecoin'
  ),
  4: new Token(
    ChainId.RINKEBY,
    '0x49ac2A6588864375F0D194F5DA1BC87B9436E175',
    18,
    'DAI',
    'Dai Stablecoin'
  ),
}

export const UNISWAP_CONNECTOR: { [key: number]: string } = {
  1: UniswapConnector.address, // FIX
  4: UniswapConnectorTestnet.address,
}
export const SUSHISWAP_CONNECTOR: { [key: number]: string } = {
  1: '0x9Daec8D56CDCBDE72abe65F4a5daF8cc0A5bF2f9', // FIX
  4: UniswapConnectorTestnet.address,
}

export const TRADER: { [key: number]: string } = {
  1: Trader.address, // FIX
  4: TraderTestnet.address,
}

export const DEFAULT_STRIKE_LOW = 0.9
export const DEFAULT_STRIKE_MID = 1.0
export const DEFAULT_STRIKE_HIGH = 1.1

export const CURRENT_VERSION = 1.0
export const NO_VERSION = -1
export const DEFAULT_DEADLINE = 120 * 20 // UNISWAP_V2: EXPIRED revert protection (usually 60*20)
export const DEFAULT_SLIPPAGE = '0.01'
export const DEFAULT_TIMELIMIT = 60 * 20
export const ETHERSCAN_MAINNET = 'https://etherscan.io/address'
export const ETHERSCAN_RINKEBY = 'https://rinkeby.etherscan.io/address'

export const DEFAULT_ALLOWANCE = parseEther('10000000')

export const WEI_ADJ = 1000000000000000000

export enum Operation {
  MINT,
  EXERCISE,
  REDEEM,
  CLOSE,
  UNWIND,
  LONG,
  SHORT,
  WRITE,
  CLOSE_LONG,
  CLOSE_SHORT,
  NEUTRAL,
  ADD_LIQUIDITY,
  ADD_LIQUIDITY_CUSTOM,
  REMOVE_LIQUIDITY,
  REMOVE_LIQUIDITY_CLOSE,
  NEW_MARKET,
  NONE,
  APPROVE,
}

export enum Venue {
  UNISWAP,
  SUSHISWAP,
  BALANCER,
  SHELL,
  CURVE,
}
