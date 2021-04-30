export interface ISanitizedInputCreateFeedback {
  vendor_id?: string;
  user_id?: string;
  offer_id?: string;
  message?: string;
  type?: string;
}

export interface ISanitizedInputCreateFeedbackReturn {
  vendor_id?: BigInt;
  user_id?: BigInt;
  offer_id?: BigInt;
  message?: string;
  type?: 'positive' | 'negative';
}
