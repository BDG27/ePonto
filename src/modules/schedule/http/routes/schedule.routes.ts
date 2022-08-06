import { Router } from 'express';
import { ScheduleController } from '../controller/ScheduleController';

const scheduleRoutes = Router();

const scheduleController = new ScheduleController();

scheduleRoutes.post('/', scheduleController.create);
scheduleRoutes.get('/', scheduleController.list);

export { scheduleRoutes };
