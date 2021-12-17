import { Request, Response } from 'express';
import { getOffers, getOffersPagination } from 'cryptic-base';
import { sanitize, convertWhere } from 'cryptic-utils';

export async function index(req: Request, res: Response): Promise<Response> {
  try {
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
      associations,
      limit,
    } = req.query;

    // @ts-ignore
    const offers = await getOffers(limit, associations, {
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

  const cleanQuery = sanitize({ limit, skip, payment_method_type }, []);

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
  const { trade_instructions_tags, associations } = req.query;

  try {
    const cleanReqQuery = sanitize(
      {
        ...req.query,
      },
      [],
    );

    if (trade_instructions_tags) {
      // @ts-ignore
      const tags = sanitize(trade_instructions_tags.split(','), []);
      cleanReqQuery.trade_instructions_tags = tags;
    }

    if (associations) {
      // @ts-ignore
      const associationsArr = sanitize(associations.split(','), []);
      cleanReqQuery.associations = associationsArr;
    } else {
      cleanReqQuery.associations = [];
    }

    const where = convertWhere({ ...cleanReqQuery }, ['limit', 'associations']);

    const offers = await getOffers(
      cleanReqQuery.limit,
      cleanReqQuery.associations,
      {
        ...where,
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
