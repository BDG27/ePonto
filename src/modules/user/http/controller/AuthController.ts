import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../../../../shared/errors/AppError';
import { UserRepositories } from '../../typeorm/repositories/UserRepositories';

export class AuthController {
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      const user = await UserRepositories.findOne(email);

      if (!user) {
        throw new AppError('Usuário e/ou senha incorretos', 401);
      }

      const isValidPassword = await bcrypt.compare(
        password + process.env.BCRYPT_SECRET_KEY,
        user.password
      );

      if (!isValidPassword) {
        throw new AppError('Usuário e/ou senha incorretos', 401);
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          name: user.name
        },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: '1d'
        }
      );

      res.json({ user, token });
    } catch (err) {
      next(err);
    }
  }
}
