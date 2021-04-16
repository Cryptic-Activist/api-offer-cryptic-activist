import { ISanitizedCreateOffer } from '@interfaces/controllers/offer';

export function validateInputCreateOffer(
  sanitizedOffer: ISanitizedCreateOffer,
): { errors: string[]; valid: boolean } {
  const errors: string[] = [];

  console.log(sanitizedOffer);

  console.log(typeof sanitizedOffer.trade_pricing_list_at);

  if (!sanitizedOffer.vendor_id) {
    errors.push('vendor_id is required.');
  } else if (sanitizedOffer.vendor_id.length === 0) {
    errors.push('vendor_id must be valid.');
  }

  if (!sanitizedOffer.cryptocurrency_id) {
    errors.push('cryptocurrency_id is required.');
  } else if (sanitizedOffer.cryptocurrency_id.length === 0) {
    errors.push('cryptocurrency_id must be valid.');
  }

  if (!sanitizedOffer.payment_method_type) {
    errors.push('payment_method_type is required.');
  } else if (sanitizedOffer.payment_method_type.length === 0) {
    errors.push('payment_method_type must be valid.');
  }

  if (!sanitizedOffer.payment_method_id) {
    errors.push('payment_method_id is required.');
  } else if (sanitizedOffer.payment_method_id.length === 0) {
    errors.push('payment_method_id must be valid.');
  }

  if (!sanitizedOffer.trade_pricing_type) {
    errors.push('trade_pricing_type is required.');
  } else if (sanitizedOffer.trade_pricing_type.length === 0) {
    errors.push('trade_pricing_type must be valid.');
  }

  if (
    sanitizedOffer.trade_pricing_type !== 'market' &&
    sanitizedOffer.trade_pricing_type !== 'fixed'
  ) {
    errors.push('trade_pricing_type must be "market" or "fixed".');
  }

  if (!sanitizedOffer.trade_pricing_list_at) {
    errors.push('trade_pricing_list_at is required.');
  } else if (typeof sanitizedOffer.trade_pricing_list_at !== 'number') {
    errors.push('trade_pricing_list_at must be valid.');
  }

  if (sanitizedOffer.trade_pricing_type === 'market') {
    if (sanitizedOffer.trade_pricing_list_at < 0) {
      errors.push('trade_pricing_list_at must be 0 or a positive number.');
    }
  } else if (sanitizedOffer.trade_pricing_type === 'fixed') {
    if (sanitizedOffer.trade_pricing_list_at <= 0) {
      errors.push('trade_pricing_list_at must be a positive number.');
    }
  }

  if (!sanitizedOffer.trade_pricing_trade_limits_min) {
    errors.push('trade_pricing_trade_limits_min is required.');
  } else if (
    typeof sanitizedOffer.trade_pricing_trade_limits_min !== 'number'
  ) {
    errors.push('trade_pricing_trade_limits_min must be valid.');
  } else if (
    sanitizedOffer.trade_pricing_trade_limits_min <= 0 &&
    sanitizedOffer.trade_pricing_trade_limits_min >=
      sanitizedOffer.trade_pricing_trade_limits_max
  ) {
    errors.push(
      'trade_pricing_trade_limits_min must be greater than 0 and lesser than trade_pricing_trade_limits_max.',
    );
  }

  if (!sanitizedOffer.trade_pricing_trade_limits_max) {
    errors.push('trade_pricing_trade_limits_max is required.');
  } else if (
    typeof sanitizedOffer.trade_pricing_trade_limits_max !== 'number'
  ) {
    errors.push('trade_pricing_trade_limits_max must be valid.');
  } else if (
    sanitizedOffer.trade_pricing_trade_limits_max <=
    sanitizedOffer.trade_pricing_trade_limits_min
  ) {
    errors.push(
      'trade_pricing_trade_limits_max must be greater than trade_pricing_trade_limits_min.',
    );
  }

  if (!sanitizedOffer.trade_pricing_time_limit) {
    errors.push('trade_pricing_time_limit is required.');
  } else if (typeof sanitizedOffer.trade_pricing_time_limit !== 'number') {
    errors.push('trade_pricing_time_limit must be valid.');
  } else if (sanitizedOffer.trade_pricing_time_limit > 10) {
    errors.push('trade_pricing_trade_time_limit must be greater than 10.');
  }

  if (!sanitizedOffer.trade_pricing_time_limit) {
    errors.push('trade_pricing_time_limit is required.');
  } else if (typeof sanitizedOffer.trade_pricing_time_limit !== 'number') {
    errors.push('trade_pricing_time_limit must be valid.');
  } else if (sanitizedOffer.trade_pricing_time_limit > 10) {
    errors.push('trade_pricing_trade_time_limit must be greater than 10.');
  }

  if (!sanitizedOffer.trade_instructions_tags) {
    errors.push('trade_instructions_tags is required.');
  } else if (sanitizedOffer.trade_instructions_tags.length === 0) {
    errors.push('trade_instructions_tags must be valid.');
  }

  if (!sanitizedOffer.trade_instructions_label) {
    errors.push('trade_instructions_label is required.');
  } else if (sanitizedOffer.trade_instructions_label.length === 0) {
    errors.push('trade_instructions_label must be valid.');
  }

  if (!sanitizedOffer.trade_instructions_terms) {
    errors.push('trade_instructions_terms is required.');
  } else if (sanitizedOffer.trade_instructions_terms.length === 0) {
    errors.push('trade_instructions_terms must be valid.');
  }

  if (!sanitizedOffer.trade_instructions_instructions) {
    errors.push('trade_instructions_instructions is required.');
  } else if (sanitizedOffer.trade_instructions_instructions.length === 0) {
    errors.push('trade_instructions_instructions must be valid.');
  }

  if (errors.length > 0) {
    return {
      errors,
      valid: false,
    };
  }
  return {
    errors: [],
    valid: true,
  };
}
