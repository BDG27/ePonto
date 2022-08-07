import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import { AuthorizationController } from '../../../auth/AuthorizationController';
import createUserSchema from '../../schemas/createUser.schema';
import { AuthController } from '../controller/AuthController';
import { UserController } from '../controller/UserController';

const userRoutes = Router();

const userController = new UserController();
const authController = new AuthController();
const authorizationController = new AuthorizationController();

userRoutes.post(
  '/',
  [celebrate({ [Segments.BODY]: createUserSchema })],
  userController.create
);
userRoutes.get('/', userController.list);
userRoutes.delete('/:id', userController.delete);
userRoutes.post('/login', authController.login);
userRoutes.post('/authenticate', authorizationController.VerifyToken);

export { userRoutes };
