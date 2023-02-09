import { createOffer, getOffer, safeOfferValuesAssigner } from 'base-ca';
import { convertWhere, sanitize } from 'cryptic-utils';
import { Request, Response } from 'express';

export async function createOfferController(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    const { body } = req;
    const { cryptocurrency, fiat, ...rest } = body;

    const create = {
      cryptocurrencyId: cryptocurrency.id,
      fiatId: fiat.id,
      ...rest,
    };

    const newOffer = await createOffer(create);

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
