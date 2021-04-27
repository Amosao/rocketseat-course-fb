import UserModel from './User.model';

class AppointmentModel {
    id: string;
    provider_id: string;
    provider: UserModel;
    date: Date;
    created_at: Date;
    updated_at: Date;
}

export default AppointmentModel;
