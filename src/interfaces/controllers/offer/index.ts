export interface IUserResponse {
  id: number;
  names: {
    first_name: string;
    last_name: string;
  };
  username: string;
  is_verified: boolean;
  created_at: string;
  updated_at: null | string;
}

export interface ICreateOffer {
  vendor_id: string;
  cryptocurrency_id: string;
  payment_method_type: 'buy' | 'sell';
  payment_method_id: string;
  trade_pricing_type: 'market' | 'fixed';
  trade_pricing_list_at: number;
  trade_pricing_trade_limits_min: number;
  trade_pricing_trade_limits_max: number;
  trade_pricing_time_limit: number;
  trade_instructions_tags: string[];
  trade_instructions_label: string;
  trade_instructions_terms: string;
  trade_instructions_instructions: string;
}

export interface ISanitizedCreateOffer {
  vendor_id: string;
  cryptocurrency_id: string;
  payment_method_type: string;
  payment_method_id: string;
  trade_pricing_type: string;
  trade_pricing_list_at: number;
  trade_pricing_trade_limits_min: number;
  trade_pricing_trade_limits_max: number;
  trade_pricing_time_limit: number;
  trade_instructions_tags: string[];
  trade_instructions_label: string;
  trade_instructions_terms: string;
  trade_instructions_instructions: string;
}
