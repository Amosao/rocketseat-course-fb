import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment.model';

interface CreateAppointmentDTO {
    provider: string;
    date: Date;
}

class AppointmentsRepo {
    private appointments: Appointment[];

    constructor() {
        this.appointments = [];
    }

    public getAll(): Appointment[] {
        return this.appointments;
    }

    public findByDate(date: Date): Appointment | null {
        const sameDataAppointment = this.appointments.find(appointment => isEqual(date, appointment.date));

        return sameDataAppointment || null;
    }

    public create({ provider, date }: CreateAppointmentDTO): Appointment {
        const appointment = new Appointment({provider, date});

        this.appointments.push(appointment);

        return appointment;
    }

}

export default AppointmentsRepo;
