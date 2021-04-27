import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../entities/Appointment.entity';

@EntityRepository(Appointment)
class AppointmentsRepo extends Repository<Appointment> {

    public async findByDate(date: Date):Promise<Appointment | null> {
        const sameDataAppointment = await this.findOne({ where: { date } });

        return sameDataAppointment || null;
    }

}

export default AppointmentsRepo;
