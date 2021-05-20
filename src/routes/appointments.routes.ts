import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositores/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService'
//Rota: Deve receber a requisição, chamar outro arquivo, devolver a resposta.

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();


appointmentsRouter.get('/', (request, response) => {
    const appointments = appointmentsRepository.all();

    return response.json(appointments);
})


appointmentsRouter.post('/', (request, response) => {
    try {
        const { provider, date } = request.body;

        const parsedDate = parseISO(date); //transforma data passada em string para o formato de data.

        const createAppointment = new CreateAppointmentService(appointmentsRepository);

        const appointment = createAppointment.execute({ date: parsedDate, provider })

        return response.json(appointment);
    } catch (err) {
        return response.status(400).json({error: err.message});
    }
});

export default appointmentsRouter;
