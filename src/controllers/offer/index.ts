import { Request, Response } from 'express';

// import CrypticBase from 'cryptic-base';

// const crypticbase = new CrypticBase(false);

export async function index(req: Request, res: Response): Promise<Response> {
  try {
    console.log(req);
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
  try {
    const { cryptocurrency } = req.body;

    // const newOffer = crypticbase.createOffer();

    console.log(cryptocurrency);
  } catch (err) {
    return res.status(500).send({
      status_code: 500,
      results: {},
      errors: [err.message],
    });
  }
}
