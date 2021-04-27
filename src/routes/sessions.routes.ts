import { Router } from 'express';

import AuthenticationService from '../services/Authentication.service';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
    try {
        const authService = new AuthenticationService();

        const { token } = await authService.execute(req.body);
        
        return res.json({ token });

    } catch (err) {

        return res.status(400).json({ error: err.message });

    }
})

export default sessionsRouter;
