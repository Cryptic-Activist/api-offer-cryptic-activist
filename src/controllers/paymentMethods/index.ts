import { Request, Response } from 'express';
import {
  createPaymentMethod,
  getPaymentMethods,
  getPaymentMethodsByCategory,
} from 'cryptic-base';
import { convertWhere, sanitize, sanitizeQueryArray } from 'cryptic-utils';

export async function index(req: Request, res: Response): Promise<Response> {
  try {
    const { associations } = req.query;

    const cleanReqQuery = sanitize({ ...req.query }, []);

    cleanReqQuery.associations = sanitizeQueryArray(associations);

    const where = convertWhere({ ...cleanReqQuery }, ['associations']);

    const paymentMethods = await getPaymentMethods(
      null,
      cleanReqQuery.associations,
      { ...where },
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

export async function createPaymentMethodController(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    const { name, categoryId } = req.body;

    const cleanBody = sanitize({ name, categoryId }, []);

    const newPaymentMethod = await createPaymentMethod({
      name: cleanBody.name,
      payment_method_category_id: BigInt(cleanBody.categoryId),
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

export async function getPaymentMethodsByCategoryController(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    const { categoryId } = req.params;

    const cleanCategoryId = sanitize(categoryId, []);

    const paymentMethods = await getPaymentMethodsByCategory(
      null,
      { id: BigInt(cleanCategoryId) },
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
