import { Router } from 'express';

import authenticateUserController from './controllers/authenticateUser.controller';
import registerUserController from './controllers/registerUser.controller';
import getUsersController from './controllers/getUsers.controller';
import getUserController from './controllers/getUser.controller';
import ensureAuthenticated from './middlewares/ensureAuthenticated.middleware';
import uploadFileController from './controllers/uploadFile.controller';
import deleteVideoController from './controllers/deleteVideo.controller';
import uploadFile from './middlewares/uploadFile.middleware';
import getVideoController from './controllers/getVideo.controller';
import createCategoryController from './controllers/createCategory.controller';

const router = Router();

router.post('/users/register', new registerUserController().handle);
router.post('/users/login', new authenticateUserController().handle);

router.post('/upload', ensureAuthenticated, uploadFile, new uploadFileController().handle);
router.post('/video/delete', ensureAuthenticated, new deleteVideoController().handle);
router.get('/video', new getVideoController().handle);

router.post('/category/new', ensureAuthenticated, new createCategoryController().handle);

router.get('/users', ensureAuthenticated, new getUsersController().handle);
router.get('/users/:id', ensureAuthenticated, new getUserController().handle);

export { router };
