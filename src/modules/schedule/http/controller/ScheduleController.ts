import { NextFunction, Request, Response } from 'express';
import { ScheduleRepository } from '../../typeorm/repositories/ScheduleRepository';

export class ScheduleController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { type } = req.body;
      const { user } = req;

      const obj = { type, user };

      res.json(await ScheduleRepository.save(obj));
    } catch (err) {
      next(err);
    }
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.json(await ScheduleRepository.find());
    } catch (err) {
      next(err);
    }
  }

  async listByUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { user } = req;

      res.json(
        await ScheduleRepository.find({ where: { user: { id: user.id } } })
      );
    } catch (err) {
      next(err);
    }
  }
}
