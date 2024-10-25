import { BigNumber } from "bignumber.js";
import {
  BrowserConnectClient,
  TokenBalance,
  TokenClass,
} from "@gala-chain/connect";

export interface IEthereumContext {
  address: string;
  browserConnectClient: BrowserConnectClient | null;
  isConnected: boolean;
  isPendingConnection: boolean;
  isPendingRegistration: boolean;
  isRegistered: boolean;
  connect: () => void;
  disconnect: () => void;
  registerUser: (address: string) => Promise<void>;
}

export interface IUserAliasObject {
  alias: string;
  ethAddress: string;
}

// define interfaces that match TokenBalance & TokenClass from @gala-chain/api
// to get shape of TokenBalanceWithMetadata as response data
export interface ITokenHold {
  createdBy: string;
  instanceId: BigNumber;
  quantity: BigNumber;
  created: number;
  expires: number;
  name?: string;
  lockAuthority?: string;
}

export interface ITokenBalance {
  owner: string;
  collection: string;
  category: string;
  type: string;
  additionalKey: string;
  instanceIds?: BigNumber[];
  lockedHolds?: ITokenHold[];
  inUseHolds?: ITokenHold[];
  quantity: BigNumber;
}

export interface ITokenClass {
  collection: string;
  category: string;
  type: string;
  additionalKey: string;
  network: string;
  decimals: number;
  maxSupply: BigNumber;
  isNonFungible: boolean;
  maxCapacity: BigNumber;
  authorities: Array<string>;
  name: string;
  symbol: string;
  description: string;
  contractAddress?: string;
  metadataAddress?: string;
  image: string;
  rarity?: string;
  totalBurned: BigNumber;
  totalMintAllowance: BigNumber;
  knownMintAllowanceSupply?: BigNumber;
  knownMintSupply?: BigNumber;
  // Deprecated property
  totalSupply: BigNumber;
}

export interface ITokenBalanceWithMetadata {
  balance: TokenBalance;
  token: TokenClass;
}
