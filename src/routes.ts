import { Router } from 'express';

import createUserController from './controllers/createUser.controller';
import getAllUsersController from './controllers/getAllUsers.controller';
import getUserController from './controllers/getUser.controller';

const router = Router();

router.post('/users/create', new createUserController().handle);

router.get('/users', new getAllUsersController().handle);
router.get('/users/:id', new getUserController().handle);

router.put('/');

export { router };
