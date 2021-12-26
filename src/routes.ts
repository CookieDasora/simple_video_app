import { Router } from "express";

const router = Router();

import createUserController from "./controllers/createUser.controller";
import getAllUsersController from "./controllers/getAllUsers.controller";

router.post('/users', new createUserController().handle)
router.get('/users', new getAllUsersController().handle)
router.put('/')
router.delete('/')

export { router };