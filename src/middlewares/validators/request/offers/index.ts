import { Request, Response, NextFunction } from 'express';

export function validateInputIndex(
  req: Request,
  res: Response,
  next: NextFunction,
): NextFunction | Response {
  const { limit, skip, payment_method_type } = req.query;

  const errors: string[] = [];

  if (!limit) {
    errors.push('limit is required.');
  } else if (limit.length === 0) {
    errors.push('limit must be valid.');
  }

  try {
    Number(limit);
  } catch (err) {
    errors.push('limit must be a number');
  }

  if (!skip) {
    errors.push('skip is required.');
  } else if (skip.length === 0) {
    errors.push('skip must be valid.');
  }

  try {
    Number(skip);
  } catch (err) {
    errors.push('skip must be a number');
  }

  if (!payment_method_type) {
    errors.push('payment_method_type is required.');
  } else if (payment_method_type.length === 0) {
    errors.push('payment_method_type must be valid.');
  } else if (payment_method_type !== 'buy' && payment_method_type !== 'sell') {
    errors.push('payment_method_type must be"buy" or "sell".');
  }

  if (errors.length > 0) {
    return res.status(400).send({
      status_code: 400,
      results: {},
      errors,
    });
  }

  next();
}

export function validateInputCreateOffer(
  req: Request,
  res: Response,
  next: NextFunction,
): NextFunction | Response {
  const {
    vendor_id,
    cryptocurrency_id,
    payment_method_type,
    payment_method_id,
    trade_pricing_type,
    trade_pricing_list_at,
    trade_pricing_trade_limits_min,
    trade_pricing_trade_limits_max,
    trade_pricing_time_limit,
    trade_instructions_tags,
    trade_instructions_label,
    trade_instructions_terms,
    trade_instructions_instructions,
  } = req.body;

  const errors: string[] = [];

  if (!vendor_id) {
    errors.push('vendor_id is required.');
  } else if (vendor_id.length === 0) {
    errors.push('vendor_id must be valid.');
  }

  if (!cryptocurrency_id) {
    errors.push('cryptocurrency_id is required.');
  } else if (cryptocurrency_id.length === 0) {
    errors.push('cryptocurrency_id must be valid.');
  }

  if (!payment_method_type) {
    errors.push('payment_method_type is required.');
  } else if (payment_method_type.length === 0) {
    errors.push('payment_method_type must be valid.');
  }

  if (!payment_method_id) {
    errors.push('payment_method_id is required.');
  } else if (payment_method_id.length === 0) {
    errors.push('payment_method_id must be valid.');
  }

  if (!trade_pricing_type) {
    errors.push('trade_pricing_type is required.');
  } else if (trade_pricing_type.length === 0) {
    errors.push('trade_pricing_type must be valid.');
  }

  if (trade_pricing_type !== 'market' && trade_pricing_type !== 'fixed') {
    errors.push('trade_pricing_type must be "market" or "fixed".');
  }

  if (!trade_pricing_list_at) {
    errors.push('trade_pricing_list_at is required.');
  } else if (typeof trade_pricing_list_at !== 'number') {
    errors.push('trade_pricing_list_at must be valid.');
  }

  if (trade_pricing_type === 'market') {
    if (trade_pricing_list_at < 0) {
      errors.push('trade_pricing_list_at must be 0 or a positive number.');
    }
  } else if (trade_pricing_type === 'fixed') {
    if (trade_pricing_list_at <= 0) {
      errors.push('trade_pricing_list_at must be a positive number.');
    }
  }

  if (!trade_pricing_trade_limits_min) {
    errors.push('trade_pricing_trade_limits_min is required.');
  } else if (typeof trade_pricing_trade_limits_min !== 'number') {
    errors.push('trade_pricing_trade_limits_min must be valid.');
  } else if (
    trade_pricing_trade_limits_min <= 0 &&
    trade_pricing_trade_limits_min >= trade_pricing_trade_limits_max
  ) {
    errors.push(
      'trade_pricing_trade_limits_min must be greater than 0 and lesser than trade_pricing_trade_limits_max.',
    );
  }

  if (!trade_pricing_trade_limits_max) {
    errors.push('trade_pricing_trade_limits_max is required.');
  } else if (typeof trade_pricing_trade_limits_max !== 'number') {
    errors.push('trade_pricing_trade_limits_max must be valid.');
  } else if (trade_pricing_trade_limits_max <= trade_pricing_trade_limits_min) {
    errors.push(
      'trade_pricing_trade_limits_max must be greater than trade_pricing_trade_limits_min.',
    );
  }

  console.log('trade_pricing_time_limit TEST:', trade_pricing_time_limit);

  if (!trade_pricing_time_limit) {
    errors.push('trade_pricing_time_limit is required.');
  } else if (typeof trade_pricing_time_limit !== 'number') {
    errors.push('trade_pricing_time_limit must be valid.');
  } else if (trade_pricing_time_limit < 10) {
    errors.push('trade_pricing_trade_time_limit must be greater than 10.');
  }

  if (!trade_instructions_tags) {
    errors.push('trade_instructions_tags is required.');
  } else if (trade_instructions_tags.length === 0) {
    errors.push('trade_instructions_tags must be valid.');
  }

  if (!trade_instructions_label) {
    errors.push('trade_instructions_label is required.');
  } else if (trade_instructions_label.length === 0) {
    errors.push('trade_instructions_label must be valid.');
  }

  if (!trade_instructions_terms) {
    errors.push('trade_instructions_terms is required.');
  } else if (trade_instructions_terms.length === 0) {
    errors.push('trade_instructions_terms must be valid.');
  }

  if (!trade_instructions_instructions) {
    errors.push('trade_instructions_instructions is required.');
  } else if (trade_instructions_instructions.length === 0) {
    errors.push('trade_instructions_instructions must be valid.');
  }

  if (errors.length > 0) {
    return res.status(400).send({
      status_code: 400,
      results: {},
      errors,
    });
  }

  next();
}

export function validateGetOfferByVendorRequest(
  req: Request,
  res: Response,
  next: NextFunction,
): NextFunction | Response {
  const { vendor_id } = req.params;
  const { payment_method_type } = req.query;

  const errors: string[] = [];

  if (!vendor_id) {
    errors.push('vendor_id is required.');
  } else if (vendor_id.length === 0) {
    errors.push('vendor_id must be valid.');
  }

  try {
    BigInt(vendor_id);
  } catch (err) {
    errors.push('vendor_id must be valid.');
  }

  if (!payment_method_type) {
    errors.push('payment_method_type is required.');
  } else if (payment_method_type.length === 0) {
    errors.push('payment_method_type must be valid.');
  }

  if (errors.length > 0) {
    return res.status(400).send({
      status_code: 400,
      results: {},
      errors,
    });
  }

  next();
}
