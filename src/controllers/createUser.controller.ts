import { Request, Response } from "express";
import createUserSerivce from "../services/createUser.service";

class createUserController {
    async handle(req: Request, res: Response) {
        const { username, email, password } = req.body;

        const service = new createUserSerivce();
        const result = await service.execute({username, email, password});

        if (result instanceof Error) {
            return res.status(400).json({
                error: result.message
            })
        }

        return res.json(result);
    }
}

export default createUserController;