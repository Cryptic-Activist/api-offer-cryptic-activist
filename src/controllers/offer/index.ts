import { Request, Response } from 'express';
import { createOffer, getOffer, safeOfferValuesAssigner } from 'cryptic-base';
import { sanitize, convertWhere } from 'cryptic-utils';

import { ICreateOffer } from '../../interfaces/controllers/offer/index';

export async function createOfferController(
  req: Request,
  res: Response,
): Promise<Response> {
  const {
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
  }: ICreateOffer = req.body;

  try {
    const cleanReqBody = sanitize(
      {
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
      },
      [],
    );

    console.log(req.body);

    const tags = sanitize(trade_instructions_tags, []);

    const newOffer = await createOffer({
      vendor_id: BigInt(cleanReqBody.vendor_id),
      cryptocurrency_id: BigInt(cleanReqBody.cryptocurrency_id),
      // @ts-ignore
      payment_method_type: cleanReqBody.payment_method_type,
      payment_method_id: BigInt(cleanReqBody.payment_method_id),
      // @ts-ignore
      trade_pricing_type: cleanReqBody.trade_pricing_type,
      fiat_id: BigInt(cleanReqBody.fiat_id),
      trade_pricing_list_at: cleanReqBody.trade_pricing_list_at,
      trade_pricing_trade_limits_min:
        cleanReqBody.trade_pricing_trade_limits_min,
      trade_pricing_trade_limits_max:
        cleanReqBody.trade_pricing_trade_limits_max,
      trade_pricing_time_limit: cleanReqBody.trade_pricing_time_limit,
      trade_instructions_tags: tags,
      trade_instructions_label: cleanReqBody.trade_instructions_label,
      trade_instructions_terms: cleanReqBody.trade_instructions_terms,
      trade_instructions_instructions:
        cleanReqBody.trade_instructions_instructions,
    });

    return res.status(200).send({
      status_code: 200,
      results: newOffer,
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

export async function getOfferController(
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

    const offer = await getOffer(
      {
        ...where,
      },
      cleanReqQuery.associations,
    );

    if (!offer) {
      return res.status(204).send({
        status_code: 204,
        results: {},
        errors: [],
      });
    }

    const safeOffer = safeOfferValuesAssigner(offer);

    console.log('safeOffer:', safeOffer);

    return res.status(200).send({
      status_code: 200,
      results: safeOffer,
      errors: [],
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      status_code: 500,
      results: {},
      errors: [err.message],
    });
  }
}
