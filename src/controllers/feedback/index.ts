import { Request, Response } from 'express';
import CrypticBase from 'cryptic-base';

import { sanitizeInputCreateFeedback } from '@utils/sanitizer/feedback';

const crypticbase = new CrypticBase(false);

export async function createFeedback(
  req: Request,
  res: Response,
): Promise<Response> {
  const { vendor_id, user_id, offer_id, message, type } = req.body;

  const cleanReqBody = sanitizeInputCreateFeedback({
    vendor_id,
    user_id,
    offer_id,
    message,
    type,
  });

  try {
    // @ts-ignore
    const feedback = await crypticbase.createFeedback({
      vendor_id: cleanReqBody.vendor_id,
      user_id: cleanReqBody.user_id,
      offer_id: cleanReqBody.offer_id,
      message: cleanReqBody.message,
      type: cleanReqBody.type,
    });

    return res.status(201).send({
      status_code: 201,
      results: feedback,
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