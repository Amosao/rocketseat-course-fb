import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../entities/Appointment.entity';
import AppointmentsRepo from '../repos/Appointments.repo';

interface Request {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
    public async execute({provider_id, date}: Request): Promise<Appointment> {
        const repo = getCustomRepository(AppointmentsRepo);

        const startHour = startOfHour(date);

        const findSameDateAppointment = await repo.findByDate(startHour);

        if (findSameDateAppointment) {
            throw Error('Appointment already booked!');
        }

        const appointment = repo.create({ provider_id, date: startHour });

        await repo.save(appointment);

        return appointment;

    }
}

export default CreateAppointmentService;
