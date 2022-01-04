import { Router } from 'express';

import authenticateUserController from './controllers/authenticateUser.controller';
import createUserController from './controllers/createUser.controller';
import getAllUsersController from './controllers/getAllUsers.controller';
import getUserController from './controllers/getUser.controller';
import ensureAuthenticated from './middlewares/ensureAuthenticated.middleware';

const router = Router();

router.post('/users/register', new createUserController().handle);
router.post('/users/login', new authenticateUserController().handle);

router.get('/users', ensureAuthenticated, new getAllUsersController().handle);
router.get('/users/:id', ensureAuthenticated, new getUserController().handle);

export { router };
