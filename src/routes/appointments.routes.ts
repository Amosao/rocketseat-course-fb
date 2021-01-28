import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepo from '../repos/Appointments.repo';
import CreateAppointmentService from '../services/CreateAppointment.service';

const appointmentsRouter = Router();
const repo: AppointmentsRepo = new AppointmentsRepo();

appointmentsRouter.get("/", (req, res) => {
    const appointmnets = repo.getAll();

    return res.json(appointmnets);
});

appointmentsRouter.post('/', (req, res) => {
    try {
        const { provider, date } = req.body;

        const parsedDate = parseISO(date);

        const createService = new CreateAppointmentService(repo);

        const appointment = createService.execute({ provider, date: parsedDate });

        return res.json(appointment);

    } catch (err) {

        return res.status(400).json({ error: err.message });

    }
})

export default appointmentsRouter;
