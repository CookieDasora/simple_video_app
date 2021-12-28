import IUserRequest from "../interfaces/userRequest.interface";
import { genSaltSync, hashSync } from 'bcrypt';
import { getRepository } from "typeorm";
import { User } from "../entities/User.entity";

class createUserSerivce {
    async execute({ username, email, password }: IUserRequest): Promise<User | Error> {
        
        if (username === undefined || email === undefined || password === undefined ) {
            return new Error("Empty field")
        }

        const salt = genSaltSync(15);
        const hashPassword = hashSync(password, salt);

        const repo = getRepository(User);
        
        if (await repo.findOne({username})) {
            return new Error("User already exists");
        };


        if (await repo.findOne({email})) {
            return new Error("Email already registered");
        };


        const user = repo.create({
            username,
            email,
            password: hashPassword
        });

        await repo.save(user);

        return user;
    }
}

export default createUserSerivce;