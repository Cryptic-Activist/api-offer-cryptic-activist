import { NextFunction, Request, Response } from 'express';
import { getAuth } from '../../services/auth';
import { AuthenticateUser } from './zod';

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { headers } = req;
    const { authorization } = headers;

    const authorized = AuthenticateUser.safeParse(authorization);

    if (!authorized.success) {
      return res.status(401).send({
        status_code: 401,
        // @ts-ignore
        errors: authorized.error,
      });
    }
    // @ts-ignore
    const auth = await getAuth(authorization);

    if (!auth) {
      return res.status(401).send({
        status_code: 401,
      });
    }

    next();
  } catch (err) {
    console.log({ err });
    return res.status(401).send({
      status_code: 401,
      errors: [err.message],
    });
  }
};
