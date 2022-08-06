import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../../../../shared/errors/AppError';
import { User } from '../../typeorm/entities/User';
import { UserRepositories } from '../../typeorm/repositories/UserRepositories';

export class AuthController {
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      const user = await UserRepositories.findOneBy({
        email
      });

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

      const partialUser: Partial<User> = user;

      delete partialUser.password;

      const token = jwt.sign(
        {
          partialUser
        },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: '1d'
        }
      );

      res.json({ partialUser, token });
    } catch (err) {
      next(err);
    }
  }
}
