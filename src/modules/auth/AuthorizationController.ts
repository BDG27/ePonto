import { Request, Response } from 'express';
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

export class AuthorizationController {
  async VerifyToken(req: Request, res: Response): Promise<void> {
    const { authorization } = req.headers;

    if (!authorization) {
      res.status(401).json({ message: 'Sua sessão expirou ou é inválida' });
    } else {
      const token = authorization.replace('Bearer', '').trim();

      try {
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

        res.status(200).json(data as ITokenPayload);
      } catch {
        res.status(401).json({ message: 'Sua sessão expirou ou é inválida' });
      }
    }
  }
}
