import { Request, Response } from "express";
import getUserService from "../services/getUser.service";

class getUserController {
    async handle(req: Request, res: Response) {

        const id: string = req.params['id'];

        const serivce = new getUserService();

        const result = await serivce.execute(id);

        if (result instanceof Error) {
            return res.status(400).json({
                error: result.message
            })
        }

        return res.json(result);
    }
}

export default getUserController;