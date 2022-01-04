import { Router } from 'express';

import createUserController from './controllers/createUser.controller';
import getAllUsersController from './controllers/getAllUsers.controller';
import getUserController from './controllers/getUser.controller';

const router = Router();

router.post('/users/register', new createUserController().handle);

router.get('/users', new getAllUsersController().handle);
router.get('/users/:id', new getUserController().handle);

export { router };
