import { Request, Response } from "express";
import deleteUserService from "../services/deleteUser.service";

class deleteUserController {
    async handle (req: Request, res: Response) {

        const { id, password } = await req.body;

        const service = new deleteUserService();
        const result = await service.execute({id, password});

        if (result instanceof Error) {
           return res.status(400).json({
                error: result.message
            });
        };

        return res.status(200).json({
            message: result
        });
    }
}

export default deleteUserController;