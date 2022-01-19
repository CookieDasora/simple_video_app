import { Router } from 'express';

import authenticateUserController from './controllers/authenticateUser.controller';
import registerUserController from './controllers/registerUser.controller';
import getAllUsersController from './controllers/getAllUsers.controller';
import getUserController from './controllers/getUser.controller';
import ensureAuthenticated from './middlewares/ensureAuthenticated.middleware';
import uploadFileController from './controllers/uploadFile.controller';

const router = Router();

router.post('/users/register', new registerUserController().handle);
router.post('/users/login', new authenticateUserController().handle);

router.post('/upload', ensureAuthenticated, new uploadFileController().handle);

router.get('/users', ensureAuthenticated, new getAllUsersController().handle);
router.get('/users/:id', ensureAuthenticated, new getUserController().handle);

export { router };
