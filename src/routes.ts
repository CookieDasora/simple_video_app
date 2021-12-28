import { Router } from "express";

const router = Router();

import createUserController from "./controllers/createUser.controller";
import getAllUsersController from "./controllers/getAllUsers.controller";
import getUserController from "./controllers/getUser.controller";

router.post('/users', new createUserController().handle)
router.get('/users', new getAllUsersController().handle)
router.get('/users/:id', new getUserController().handle)
router.put('/')
router.delete('/')

export { router };
