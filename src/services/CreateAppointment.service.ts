import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment.model';
import AppointmentsRepo from '../repos/Appointments.repo';

interface Request {
    provider: string;
    date: Date;
}

class CreateAppointmentService {
    public async execute(req: Request): Promise<Appointment> {
        const repo = getCustomRepository(AppointmentsRepo);

        const startHour = startOfHour(req.date);

        const findSameDateAppointment = await repo.findByDate(startHour);

        if (findSameDateAppointment) {
            throw Error('Appointment already booked!');
        }

        req.date = startHour;

        const appointment = repo.create(req);

        await repo.save(appointment);

        return appointment;

    }
}

export default CreateAppointmentService;
