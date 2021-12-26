import { getRepository } from "typeorm";
import { User } from "../entities/User.entity";

class getAllUsersService {
    async execute() {
        const repo = getRepository(User);

        const users = await repo.find({ select: ["id", "username", "created_at"] });

        return users;
    }
}

export default getAllUsersService;