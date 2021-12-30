import { Router } from "express";

const router = Router();

import createUserController from "./controllers/createUser.controller";
import getAllUsersController from "./controllers/getAllUsers.controller";
import getUserController from "./controllers/getUser.controller";
import deleteUserController from "./controllers/deleteUser.controller";


router.post('/users/create', new createUserController().handle)


router.get('/users', new getAllUsersController().handle)
router.get('/users/:id', new getUserController().handle)


router.post('/users/delete', new deleteUserController().handle)

router.put('/')

export { router };
