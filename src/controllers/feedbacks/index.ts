import { Request, Response } from 'express';
import CrypticBase from 'cryptic-base';

import { sanitizeInputCountFeedbacks } from '@utils/sanitizer';

const crypticbase = new CrypticBase(false);

export async function countFeedbacks(
  req: Request,
  res: Response,
): Promise<Response> {
  const { id, vendor_id, user_id, offer_id, message, type } = req.body;

  try {
    const cleanReqBody = sanitizeInputCountFeedbacks({
      id,
      vendor_id,
      user_id,
      offer_id,
      message,
      type,
    });

    // @ts-ignore
    const counts = await crypticbase.countFeedbacks(cleanReqBody);

    return res.status(200).send({
      status_code: 200,
      results: counts,
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

export async function indexFeedbacks(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    // @ts-ignore
    const feedbacks = await crypticbase.getFeedbacks(null, []);

    return res.status(200).send({
      status_code: 200,
      results: feedbacks,
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
