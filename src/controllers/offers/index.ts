import { Request, Response } from 'express';
import {
  getOffers,
  getOffersPagination,
  safeOfferValuesAssigner,
} from 'base-ca';
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
  try {
    const { associations } = req.query;

    const cleanReqQuery = sanitize({ ...req.query }, []);

    if (associations) {
      // @ts-ignore
      const associationsArr = sanitize(associations.split(','), []);
      cleanReqQuery.associations = associationsArr;
    } else {
      cleanReqQuery.associations = [];
    }

    const where = convertWhere({ ...cleanReqQuery }, [
      'limit',
      'skip',
      'associations',
    ]);

    const offers = await getOffersPagination(
      Number(cleanReqQuery.limit),
      Number(cleanReqQuery.skip),
      ['vendor', 'cryptocurrency', 'fiat', 'payment_method'],
      { ...where },
    );

    if (!offers) {
      return res.status(204).send({
        status_code: 204,
        results: [],
        errors: [],
      });
    }

    const safeOffers = offers.map((offer) => safeOfferValuesAssigner(offer));

    return res.status(200).send({
      status_code: 200,
      results: safeOffers,
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

export const getOffersByUser = async (req: Request, res: Response) => {
  const { query, params } = req;
  const { vendorId } = params;
  const { associations } = query;

  try {
    const offers = await getOffers(
      {
        cryptocurrency: true,
        fiat: true,
        paymentMethod: true,
        vendor: true,
      },
      { vendorId },
    );

    return res.status(200).send({
      status_code: 200,
      results: offers,
      errors: [],
    });
  } catch (error) {
    return res.status(500).send({
      status_code: 500,
      results: {},
      errors: [error.message],
    });
  }
};
