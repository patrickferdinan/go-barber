import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointment';

// Data Transform Object
// interface CreateAppointmentDTO {
//   provider: string;
//   date: Date;
// }

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    // const findAppointment = this.appointments.find(appointment =>
    //   isEqual(date, appointment.date),
    // );

    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || null;
  }
}

// const response = await findByDate(date); ou findByDate.then(response => {});

export default AppointmentsRepository;
