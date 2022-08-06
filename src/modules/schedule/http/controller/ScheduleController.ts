import { NextFunction, Request, Response } from 'express';
import { ScheduleRepository } from '../../typeorm/repositories/ScheduleRepository';

export class ScheduleController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { type } = req.body;
      const { userId } = req;

      const obj = { type, userId };

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
}
