import { Request, Response } from 'express';
import CrypticBase from 'cryptic-base';

import {
  sanitizeInputCreateOffer,
  sanitizeInputGetOffer,
} from '@utils/sanitizer';

import { ICreateOffer, IOffer } from '../../interfaces/controllers/offer/index';

const crypticbase = new CrypticBase(false);

export async function createOffer(
  req: Request,
  res: Response,
): Promise<Response> {
  const offer: ICreateOffer = req.body;

  try {
    const cleanReqBody = sanitizeInputCreateOffer(offer);

    const newOffer = await crypticbase.createOffer({
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
      trade_instructions_tags: cleanReqBody.trade_instructions_tags,
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

export async function getOffer(req: Request, res: Response): Promise<Response> {
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

    // @ts-ignore
    const offer = await crypticbase.getOffer(cleanReqBody, [
      'vendor',
      'cryptocurrency',
      'fiat',
      'payment_method',
    ]);

    const offerResponse: IOffer = {
      id: offer.id,
      payment_method_type: offer.payment_method_type,
      trade_instructions_instructions: offer.trade_instructions_instructions,
      trade_instructions_label: offer.trade_instructions_label,
      trade_instructions_tags: offer.trade_instructions_tags,
      trade_instructions_terms: offer.trade_instructions_terms,
      trade_pricing_list_at: offer.trade_pricing_list_at,
      trade_pricing_time_limit: offer.trade_pricing_time_limit,
      trade_pricing_trade_limits_max: offer.trade_pricing_trade_limits_max,
      trade_pricing_trade_limits_min: offer.trade_pricing_trade_limits_min,
      trade_pricing_type: offer.trade_pricing_type,
      cryptocurrency: {
        id: offer.cryptocurrency.id,
        icon: offer.cryptocurrency.icon,
        name: offer.cryptocurrency.name,
        symbol: offer.cryptocurrency.symbol,
      },
      fiat: {
        id: offer.fiat.id,
        name: offer.fiat.name,
        symbol: offer.fiat.symbol,
      },
      vendor: {
        id: offer.vendor.id,
        username: offer.vendor.username,
        names: {
          first_name: offer.vendor.first_name,
          last_name: offer.vendor.last_name,
        },
      },
    };

    if (!offer) {
      return res.status(204).send({
        status_code: 204,
        results: {},
        errors: [],
      });
    }

    return res.status(200).send({
      status_code: 200,
      results: offerResponse,
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
