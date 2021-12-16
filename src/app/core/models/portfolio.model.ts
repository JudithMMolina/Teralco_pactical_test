import { PortfolioLine } from "./portfolio-line.model";

export interface Portfolio {
  id: number;
  name: string;
  lines: PortfolioLine[];
}
