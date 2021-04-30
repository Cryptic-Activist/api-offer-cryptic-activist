import { Request, Response } from 'express';
import CrypticBase from 'cryptic-base';

import { sanitizeInputGetOffer } from '@utils/sanitizer';

const crypticbase = new CrypticBase(false);

export async function index(req: Request, res: Response): Promise<Response> {
  try {
    const offers = await crypticbase.getOffers(null, [
      'vendor',
      'cryptocurrency',
      'fiat',
      'payment_method',
    ]);

    return res.status(200).send({
      status_code: 200,
      results: offers,
      errors: [],
    });
  } catch (err) {
    return res.status(500).send({
      status_code: 500,
      results: {},
      errors: [err.message],
    });
  }
}

export async function indexPagination(
  req: Request,
  res: Response,
): Promise<Response> {
  const { limit, skip, payment_method_type } = req.query;

  try {
    const offers = await crypticbase.getOffersPagination(
      Number(limit),
      Number(skip),
      ['vendor', 'cryptocurrency', 'fiat', 'payment_method'],
      { payment_method_type },
    );

    return res.status(200).send({
      status_code: 200,
      results: offers,
      errors: [],
    });
  } catch (err) {
    return res.status(500).send({
      status_code: 500,
      results: {},
      errors: [err.message],
    });
  }
}

export async function getOffers(
  req: Request,
  res: Response,
): Promise<Response> {
  const {
    id,
    vendor_id,
    cryptocurrency_id,
    payment_method_id,
    fiat_id,
    payment_method_type,
    trade_pricing_type,
    trade_pricing_list_at,
    trade_pricing_trade_limits_min,
    trade_pricing_trade_limits_max,
    trade_pricing_time_limit,
    trade_instructions_tags,
    trade_instructions_label,
    trade_instructions_terms,
    trade_instructions_instructions,
    is_deleted,
    when_deleted,
    created_at,
    updated_at,
  } = req.body;

  try {
    const cleanReqBody = sanitizeInputGetOffer({
      id,
      vendor_id,
      cryptocurrency_id,
      payment_method_id,
      fiat_id,
      payment_method_type,
      trade_pricing_type,
      trade_pricing_list_at,
      trade_pricing_trade_limits_min,
      trade_pricing_trade_limits_max,
      trade_pricing_time_limit,
      trade_instructions_tags,
      trade_instructions_label,
      trade_instructions_terms,
      trade_instructions_instructions,
      is_deleted,
      when_deleted,
      created_at,
      updated_at,
    });

    const offers = await crypticbase.getOffers(
      null,
      ['vendor', 'cryptocurrency', 'fiat', 'payment_method'],
      // @ts-ignore
      cleanReqBody,
    );

    if (!offers) {
      return res.status(204).send({
        status_code: 204,
        results: offers,
        errors: [],
      });
    }

    return res.status(200).send({
      status_code: 200,
      results: offers,
      errors: [],
    });
  } catch (err) {
    return res.status(500).send({
      status_code: 500,
      results: {},
      errors: [err.message],
    });
  }
}
