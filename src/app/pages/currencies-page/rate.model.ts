export interface NBPTableResponse {
  table: string;
  no: string;
  effectiveDate: string;
  rates: ExchangeRate[];
}

export interface ExchangeRate {
  currency: string;
  code: string;
  mid: number;
}
