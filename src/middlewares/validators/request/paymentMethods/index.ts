import { Request, Response, NextFunction } from 'express';
import { validate } from 'cryptic-utils';

export function validateInputCreatePaymentMethod(
  req: Request,
  res: Response,
  next: NextFunction,
): NextFunction | Response {
  const { name, categoryId } = req.body;

  const errors: string[] = validate(
    {
      name,
      categoryId,
    },
    {
      name: 'string',
      categoryId: 'string',
    },
  );

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

  const errors: string[] = validate({ categoryId }, { categoryId: 'string' });

  if (errors.length > 0) {
    return res.status(400).send({
      status_code: 400,
      results: {},
      errors,
    });
  }

  next();
}
