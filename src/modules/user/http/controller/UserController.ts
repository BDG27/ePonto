import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../../../shared/errors/AppError';
import { User } from '../../typeorm/entities/User';
import { UserRepositories } from '../../typeorm/repositories/UserRepositories';

export class UserController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, password } = req.body;

      const emailExist = await UserRepositories.findOneBy({ email });
      if (emailExist) {
        throw new AppError('E-mail já está em uso', 400);
      }

      const passwordSalt = password + process.env.BCRYPT_SECRET_KEY;
      const passwordHash = await bcrypt.hash(passwordSalt, 10);

      const newUser: Partial<User> = await UserRepositories.save({
        name,
        email,
        password: passwordHash
      });

      delete newUser.password;

      res.json(newUser);
    } catch (err) {
      next(err);
    }
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.json(await UserRepositories.find());
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      // eslint-disable-next-line no-restricted-globals
      if (isNaN(+id)) {
        throw new AppError('Informe um ID válido', 400);
      }

      res.json(await UserRepositories.softDelete(id));
    } catch (err) {
      next(err);
    }
  }
}
