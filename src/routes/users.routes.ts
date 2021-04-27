import { Router } from 'express';
import User from '../entities/User.entity';

import CreateUserService from '../services/CreateUser.service';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
    try {
        
        const create = new CreateUserService();

        const userEntity: User = await create.execute(req.body);

        return res.json({
            id: userEntity.id,
            name: userEntity.name,
            email: userEntity.email,
            created_at: userEntity.created_at,
            updated_at: userEntity.updated_at
        });

    } catch (err) {

        return res.status(400).json({ error: err.message });

    }
})

export default usersRouter;
