import { Request, Response } from 'express';
import CrypticBase from 'cryptic-base';

const crypticbase = new CrypticBase(false);

export async function index(req: Request, res: Response): Promise<Response> {
  try {
    const paymentMethodCategories = await crypticbase.getPaymentMethodCategories(
      null,
    );

    return res.status(200).send({
      status_code: 200,
      results: paymentMethodCategories,
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

export async function createPaymentMethodCategory(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    const { name } = req.body;

    const newPaymentMethodCategory = await crypticbase.createPaymentMethodCategory(
      {
        name,
      },
    );

    return res.status(200).send({
      status_code: 200,
      results: newPaymentMethodCategory,
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

export async function getPaymentMethodCategory(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    // const { id } = req.params;

    // const paymentMethodCategories = await crypticbase.getPaymentMethodByCategory(
    //   { id },
    //   ['payment_method_category'],
    // );

    return res.status(200).send({
      status_code: 200,
      results: {},
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
