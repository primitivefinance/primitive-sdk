import RegistryABI from '@primitivefi/contracts/artifacts/Registry.json'
import RegistryMainnet from '@primitivefi/contracts/deployments/live_1/Registry.json'
import RegistryTestnet from '@primitivefi/contracts/deployments/rinkeby/Registry.json'
import ethers, { BigNumberish, BigNumber } from 'ethers'
import { parseEther } from 'ethers/lib/utils'
import { STABLECOINS } from '../constants'
import * as UniswapSDK from '@uniswap/sdk'
import * as SushiSwapSDK from '@sushiswap/sdk'

export const REGISTRY_ADDRESS: { [key: number]: string } = {
  1: RegistryMainnet.address,
  4: RegistryTestnet.address,
}

interface OptionParameters {
  base: string
  quote: string
  baseValue: BigNumber
  quoteValue: BigNumber
  expiryValue: number
}

export interface TxPayload {
  method: string
  contract: ethers.Contract
  args: string[]
  value: string
  isView: boolean
}

export class Registry {
  public readonly chainId
  public readonly address
  public readonly contract
  public readonly provider
  public readonly dai

  public constructor(chainId: number, provider: ethers.providers.Provider) {
    this.chainId = chainId
    this.address = REGISTRY_ADDRESS[chainId]
    this.provider = provider
    this.contract = new ethers.Contract(this.address, RegistryABI.abi, provider)
    this.dai = STABLECOINS[chainId]
  }

  get baseValue(): BigNumber {
    return parseEther('1')
  }

  get stablecoin(): UniswapSDK.Token | SushiSwapSDK.Token {
    return this.dai
  }

  public getOptionAddressTx(optionParameters: FullOptionParameters): TxPayload {
    const method = 'getOptionAddress'
    const contract = this.contract
    const args = Registry.getArgs(optionParameters)
    const value = '0'
    const isView = true
    return { method, contract, args, value, isView }
  }

  public static getArgs(optionParameters: FullOptionParameters): string[] {
    const args = [
      optionParameters.base,
      optionParameters.quote,
      optionParameters.baseValue.toString(),
      optionParameters.quoteValue.toString(),
      optionParameters.expiryValue.toString(),
    ]
    return args
  }

  public deployTx(optionParameters: FullOptionParameters): TxPayload {
    const method = 'deployOption'
    const contract = this.contract
    const args = Registry.getArgs(optionParameters)
    const value = '0'
    const isView = false
    return { method, contract, args, value, isView }
  }

  public getOptionParameters(
    underlyingToken: string,
    strikePrice: BigNumber,
    strikeDate: number,
    isCall: boolean
  ): FullOptionParameters {
    const base = underlyingToken
    const quote = this.dai
    const baseValue = isCall ? this.baseValue : strikePrice
    const quoteValue = isCall ? strikePrice : this.baseValue
    const expiryValue = strikeDate
    const parameters = {
      base: base,
      quote: quote,
      baseValue: baseValue,
      quoteValue: quoteValue,
      expiryValue: expiryValue,
    }
    return parameters
  }
}
