import { compare } from "bcryptjs";
import { getRepository } from "typeorm";
import { sign } from 'jsonwebtoken';

import User from "../entities/User.entity";

interface Request {
    email: string;
    psw: string;
}

interface Response {
    token: string;
}

class AuthenticationService {
    public async execute({email, psw}: Request): Promise<Response> {
        const usersRepo = getRepository(User);

        const user = await usersRepo.findOne({where: { email }});

        if(!user) {
            throw Error("Incorrect email or password.");
        }

        const pswMatch = await compare(psw, user.password);

        if(!pswMatch) {
            throw Error("Incorrect email or password.");
        }

        const token = sign({ 
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                created_at: user.created_at,
                updated_at: user.updated_at
            }, 
        }, 
        'a93061249b97b046064991903fa58d6f',
        {
            subject: user.id,
            expiresIn: '1d'
        });

        const response: Response = {token};
        return response;

    }
}

export default AuthenticationService;