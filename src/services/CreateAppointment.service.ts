import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment.model';
import AppointmentsRepo from '../repos/Appointments.repo';

interface Request {
    provider: string;
    date: Date;
}

class CreateAppointmentService {
    private repo: AppointmentsRepo;
    constructor(appointmentRepo: AppointmentsRepo) {
        this.repo = appointmentRepo;
    }

    public execute(req: Request): Appointment {
        const startHour = startOfHour(req.date);

        const findSameDateAppointment = this.repo.findByDate(startHour);

        if (findSameDateAppointment) {
            throw Error('Appointment already booked!');
        }

        req.date = startHour;

        const appointment = this.repo.create(req);

        return appointment;

    }
}

export default CreateAppointmentService;
