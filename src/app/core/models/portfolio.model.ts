import { Line } from "./lines.model";

export interface Portfolio {
  id: number;
  name: string;
  lines: Line[];
}
