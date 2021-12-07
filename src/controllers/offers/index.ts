import { Request, Response } from 'express';
import { getOffers, getOffersPagination } from 'cryptic-base';
import { sanitize } from 'cryptic-utils';

export async function index(req: Request, res: Response): Promise<Response> {
  try {
    const offers = await getOffers(null, [
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

  const cleanQuery = sanitize({ limit, skip, payment_method_type });

  try {
    const offers = await getOffersPagination(
      Number(cleanQuery.limit),
      Number(cleanQuery.skip),
      ['vendor', 'cryptocurrency', 'fiat', 'payment_method'],
      { payment_method_type: cleanQuery.payment_method_type },
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

export async function getOffersController(
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
    const cleanReqBody = sanitize({
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
      trade_instructions_label,
      trade_instructions_terms,
      trade_instructions_instructions,
      is_deleted,
      when_deleted,
      created_at,
      updated_at,
    });

    const tags = sanitize(trade_instructions_tags);

    const offers = await getOffers(
      null,
      ['vendor', 'cryptocurrency', 'fiat', 'payment_method'],
      {
        id: BigInt(cleanReqBody.id),
        vendor_id: BigInt(cleanReqBody.vendor_id),
        cryptocurrency_id: BigInt(cleanReqBody.cryptocurrency_id),
        payment_method_type: cleanReqBody.payment_method_type,
        payment_method_id: BigInt(cleanReqBody.payment_method_id),
        fiat_id: BigInt(cleanReqBody.fiat_id),
        trade_pricing_type: cleanReqBody.trade_pricing_type,
        trade_pricing_list_at: Number(cleanReqBody.trade_pricing_list_at),
        trade_pricing_trade_limits_min: Number(
          cleanReqBody.trade_pricing_trade_limits_min,
        ),
        trade_pricing_trade_limits_max: Number(
          cleanReqBody.trade_pricing_trade_limits_max,
        ),
        trade_pricing_time_limit: Number(cleanReqBody.trade_pricing_time_limit),
        trade_instructions_tags: tags,
        trade_instructions_label: cleanReqBody.trade_instructions_label,
        trade_instructions_terms: cleanReqBody.trade_instructions_terms,
        trade_instructions_instructions:
          cleanReqBody.trade_instructions_instructions,
      },
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
