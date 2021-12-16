export interface PortfolioLineData {
  id: number;
  portfolioId: number;
  coinId: number;
  amount: number;
  coin: CoinWithValue;
  totalValue: number | undefined;
}

export interface CoinWithValue {
  id: number;
  acronym: string;
  name: string;
  value: number | undefined;
}