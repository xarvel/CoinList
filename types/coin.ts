export interface Coin {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string | null;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
}

export interface CoinCapResponse {
  data: Coin[];
  timestamp: number;
}

export interface CoinListItem {
  id: string;
  symbol: string;
  price: string;
  backgroundColor: string;
} 