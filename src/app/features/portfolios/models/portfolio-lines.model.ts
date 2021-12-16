import { Currency } from "src/app/core/models/currency.model";

export interface PortfolioLine {
  id: number;
  portfolioId: number;
  coinId: number;
  amount: number;
  coin: Currency;
}
