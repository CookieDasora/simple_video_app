import { Router } from 'express';

import updateUserInfoController from './controllers/UpdateUserInfo.controller';
import updateCategoryController from './controllers/UpdateCategory.controller';
import deleteCategoryController from './controllers/DeleteCategory.controller';
import deleteVideoController from './controllers/DeleteVideo.controller';
import authenticateUserController from './controllers/AuthenticateUser.controller';
import registerUserController from './controllers/RegisterUser.controller';
import getUsersController from './controllers/GetUsers.controller';
import getUserController from './controllers/GetUserInfo.controller';
import ensureAuthenticated from './middlewares/EnsureAuthenticated.middleware';
import uploadFileController from './controllers/UploadFile.controller';
import uploadFile from './middlewares/UploadFile.middleware';
import getVideoController from './controllers/GetVideoInfo.controller';
import createCategoryController from './controllers/CreateCategory.controller';

const router = Router();

router.post('/users/register', new registerUserController().handle);
router.post('/users/login', new authenticateUserController().handle);
router.post('/users/update', ensureAuthenticated, new updateUserInfoController().handle);

router.post('/video/upload', ensureAuthenticated, uploadFile, new uploadFileController().handle);
router.post('/video/delete', ensureAuthenticated, new deleteVideoController().handle);
router.get('/video', new getVideoController().handle);

router.post('/category/new', ensureAuthenticated, new createCategoryController().handle);
router.post('/category/update', ensureAuthenticated, new updateCategoryController().handle);
router.post('/category/delete', ensureAuthenticated, new deleteCategoryController().handle);

router.get('/users', new getUsersController().handle);
router.get('/user', new getUserController().handle);

export { router };
