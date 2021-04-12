import { Request, Response } from 'express';
import CrypticBase from 'cryptic-base';

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

export async function createPaymentMethod(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    const { name, categoryId } = req.body;

    const newPaymentMethod = await crypticbase.createPaymentMethod({
      name,
      payment_method_category_id: categoryId,
    });

    return res.status(200).send({
      status_code: 200,
      results: newPaymentMethod,
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

export async function getPaymentMethodsByCategory(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    const { categoryId } = req.params;

    const paymentMethods = await crypticbase.getPaymentMethodsByCategory(
      null,
      { id: categoryId },
      [],
    );

    return res.status(200).send({
      status_code: 200,
      results: paymentMethods,
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
