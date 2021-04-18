import { Request, Response, NextFunction } from 'express';

export function validateInputCreatePaymentMethodCategory(
  req: Request,
  res: Response,
  next: NextFunction,
): NextFunction | Response {
  const { name } = req.body;

  const errors: string[] = [];

  if (!name) {
    errors.push('name is required.');
  } else if (name.length === 0) {
    errors.push('name must be valid.');
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
