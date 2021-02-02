import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepo from '../repos/Appointments.repo';
import CreateAppointmentService from '../services/CreateAppointment.service';
import { getCustomRepository } from 'typeorm';

const appointmentsRouter = Router();

appointmentsRouter.get("/", async (req, res) => {
    const repo = getCustomRepository(AppointmentsRepo);

    return res.json(await repo.find());
});

appointmentsRouter.post('/', async (req, res) => {
    try {
        const { provider, date } = req.body;

        const parsedDate = parseISO(date);

        const createService = new CreateAppointmentService();

        const appointment = await createService.execute({ provider, date: parsedDate });

        return res.json(appointment);

    } catch (err) {

        return res.status(400).json({ error: err.message });

    }
})

export default appointmentsRouter;
