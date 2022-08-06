import { Router } from 'express';
import { scheduleRoutes } from '../../../modules/schedule/http/routes/schedule.routes';

const routes = Router();

routes.use('/schedule', scheduleRoutes);

export { routes };
