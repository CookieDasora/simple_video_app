import { getRepository } from "typeorm";
import { User } from "../entities/User.entity";

class getUserService {
    async execute (id: string): Promise<User | Error> {

        if (id.length < 36 || id.length > 36) {
            return new Error('Invalid ID');
        }

        const repo = getRepository(User);

        const user = await repo.findOne(id, { select: ["id", "username", "created_at"] });

        return user;

    }
}

export default getUserService;