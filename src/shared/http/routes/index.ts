import { Router } from 'express';
import { scheduleRoutes } from '../../../modules/schedule/http/routes/schedule.routes';
import { userRoutes } from '../../../modules/user/http/routes/user.routes';

const routes = Router();

routes.use('/schedule', scheduleRoutes);
routes.use('/user', userRoutes);

export { routes };
