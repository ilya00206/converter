import { ExchangeRate } from './exchange-rate';

export interface NBPTableResponse {
  table: string;
  no: string;
  effectiveDate: string;
  rates: ExchangeRate[];
}
