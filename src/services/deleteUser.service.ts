import { getRepository } from "typeorm";
import { User } from "../entities/User.entity";
import { compare } from 'bcrypt';
import validator from "validator";

class deleteUserService {
    async execute ({id, password}): Promise<String | Error> {

        const repo = getRepository(User);
        
        if (validator.isUUID(id) === false || !(await repo.findOne(id))) {
            return new Error('Invalid id')
        }

        const hashedPassword = await repo.findOne(id, { select: ["password"] });

        const comparePassword = compare(password, hashedPassword.password);

        if (await comparePassword === false) {
            return new Error('Invalid password');
        };

        await repo.delete(id);

        return 'User deleted';
    }
}

export default deleteUserService;