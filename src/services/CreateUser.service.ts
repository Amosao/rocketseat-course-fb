import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../entities/User.entity';

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({name, email, password}: Request): Promise<User> {
        const repo = getRepository(User);

        const checkUserExists = await repo.findOne({ where: { email } });

        if( checkUserExists ) {
            throw new Error('Email already used!');
        }

        const hashPsw = await hash(password, 8)

        const newUser = repo.create({
            name,
            email,
            password: hashPsw
        });

        await repo.save(newUser);

        return newUser;
    }
}

export default CreateUserService;