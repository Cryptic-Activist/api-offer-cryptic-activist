import { Request, Response, NextFunction } from 'express';

export function validateInputCreatePaymentMethod(
  req: Request,
  res: Response,
  next: NextFunction,
): NextFunction | Response {
  const { name, categoryId } = req.body;

  const errors: string[] = [];

  if (!name) {
    errors.push('name is required.');
  } else if (name.length === 0) {
    errors.push('name must be valid.');
  }

  if (!categoryId) {
    errors.push('categoryId is required.');
  } else if (categoryId.length === 0) {
    errors.push('categoryId must be valid.');
  }

  if (errors.length > 0) {
    return res.status(400).send({
      status_code: 400,
      results: {},
      errors,
    });
  }

  next();
}

export function validateInputGetPaymentMethodsByCategory(
  req: Request,
  res: Response,
  next: NextFunction,
): NextFunction | Response {
  const { categoryId } = req.params;

  const errors: string[] = [];

  if (!categoryId) {
    errors.push('categoryId is required.');
  } else if (categoryId.length === 0) {
    errors.push('categoryId must be valid.');
  }

  if (errors.length > 0) {
    return res.status(400).send({
      status_code: 400,
      results: {},
      errors,
    });
  }

  next();
}
