import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface ITokenPayload {
  partialUser: {
    id: number;
    name: string;
    email: string;
  };
  iat: number;
  exp: number;
}
export default function userAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Login necessário' });
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

    const { partialUser } = data as ITokenPayload;

    req.user = partialUser;

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Login necessário' });
  }
}
