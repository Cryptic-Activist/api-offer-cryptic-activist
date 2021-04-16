import { Request, Response } from 'express';
import CrypticBase from 'cryptic-base';

import { sanitizeInputCreateOffer } from '@utils/sanitizer';
import { validateInputCreateOffer } from '@utils/validators';

import { ICreateOffer } from '../../interfaces/controllers/offer/index';

const crypticbase = new CrypticBase(false);

export async function index(req: Request, res: Response): Promise<Response> {
  try {
    // console.log(req);
  } catch (err) {
    return res.status(500).send({
      status_code: 500,
      results: {},
      errors: [err.message],
    });
  }
}

export async function createOffer(
  req: Request,
  res: Response,
): Promise<Response> {
  const offer: ICreateOffer = req.body;

  try {
    const errors: string[] = [];

    const cleanReqBody = sanitizeInputCreateOffer(offer);

    const validation = validateInputCreateOffer(cleanReqBody);

    if (!validation.valid) {
      validation.errors.forEach((errorMsg: string) => {
        errors.push(errorMsg);
      });
    }

    if (errors.length > 0) {
      return res.status(400).send({
        status_code: 400,
        results: {},
        errors,
      });
    }

    const newOffer = await crypticbase.createOffer({
      vendor_id: BigInt(cleanReqBody.vendor_id),
      cryptocurrency_id: BigInt(cleanReqBody.cryptocurrency_id),
      // @ts-ignore
      payment_method_type: cleanReqBody.payment_method_type,
      payment_method_id: BigInt(cleanReqBody.payment_method_id),
      // @ts-ignore
      trade_pricing_type: cleanReqBody.trade_pricing_type,
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
