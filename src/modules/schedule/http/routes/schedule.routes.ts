import { Router } from 'express';
import userAuth from '../../../../shared/http/middlewares/userAuth';
import { ScheduleController } from '../controller/ScheduleController';

const scheduleRoutes = Router();

const scheduleController = new ScheduleController();

scheduleRoutes.post('/', userAuth, scheduleController.create);
scheduleRoutes.get('/', userAuth, scheduleController.list);
scheduleRoutes.get('/user', userAuth, scheduleController.listByUser);

export { scheduleRoutes };
