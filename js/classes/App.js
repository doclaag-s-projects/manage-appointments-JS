import { appointmentDetails, newAppointment } from '../functions.js';
import { petInput, ownerInput, phoneInput, dateInput, timeInput, symptomsInput, form } from '../selectors.js';



export default class App{
    constructor(){
        this.initApp();
    }

    initApp() {
        petInput.addEventListener('input', appointmentDetails);
        ownerInput.addEventListener('input', appointmentDetails);
        phoneInput.addEventListener('input', appointmentDetails);
        dateInput.addEventListener('input', appointmentDetails);
        timeInput.addEventListener('input', appointmentDetails);
        symptomsInput.addEventListener('input', appointmentDetails); 

        // Form events
        form.addEventListener('submit', newAppointment);
    }
}