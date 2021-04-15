export interface Acquisition {
  id: number
  acquisition_id: number
  acquiring_object_id: string
  acquired_object_id: string
  term_code: TermCode
  price_amount: number
  price_currency_code: PriceCurrencyCode
  acquired_at: string
  source_url: string
  source_description: number | string
  created_at: Date
  updated_at: Date
}

export interface Acquisition2 {
  id: number
  parent_company: string
  acquired_object_id: string
  price_amount: number
  price_currency_code: PriceCurrencyCode
  acquired_at: string
  source_url: string
  source_description: number | string
}

export enum PriceCurrencyCode {
  Aud = 'AUD',
  CAD = 'CAD',
  Empty = '',
  Eur = 'EUR',
  Gbp = 'GBP',
  Jpy = 'JPY',
  Sek = 'SEK',
  Usd = 'USD',
}

export enum TermCode {
  Cash = 'cash',
  CashAndStock = 'cash_and_stock',
  Empty = '',
  Stock = 'stock',
}

export interface Object {
  id: string
  entity_type: string
  entity_id: number
  parent_id: string
  name: string
  normalized_name: string
  permalink: string
  category_code: string
  status: string
  founded_at: string
  closed_at: string
  domain: string
  homepage_url: string
  twitter_username: string
  logo_url: string
  logo_width: number
  logo_height: number
  short_description: string
  description: string
  overview: string
  tag_list: string
  country_code: string
  state_code: string
  city: string
  region: string
  first_investment_at: string
  last_investment_at: string
  investment_rounds: number
  invested_companies: number
  first_funding_at: string
  last_funding_at: string
  funding_rounds: number
  funding_total_usd: number
  first_milestone_at: string
  last_milestone_at: string
  milestones: number
  relationships: number
  created_by: string
  created_at: Date
  updated_at: Date
}
