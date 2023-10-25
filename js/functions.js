import Appointment from './classes/Appointment.js';
import UI from './classes/UI.js';

import { petInput, ownerInput, phoneInput, dateInput, timeInput, symptomsInput, form } from './selectors.js';

const ui = new UI();
const manageAppointments = new Appointment();


let edit = false;


// Object with appointment information
const appointmentObj = {
    pet: '',
    owner: '',
    phone: '',
    date: '',
    time: '',
    symptoms: ''
};

// Add data to appointment object
export const appointmentDetails = (e) => {
    appointmentObj[e.target.name] = e.target.value;
}

export const resetObject = () => {
    appointmentObj.pet = '';
    appointmentObj.owner = '';
    appointmentObj.phone = '';
    appointmentObj.date = '';
    appointmentObj.time = '';
    appointmentObj.symptoms = '';
};



// Validate and add new appointment
export const newAppointment = (e) => {
    e.preventDefault();

    // Extract info from appointmentObj
    const { pet, owner, phone, date, time, symptoms } = appointmentObj;

    // Validate
    if (pet === '' || owner === '' || phone === '' || date === '' || time === '' || symptoms === '') {
        ui.printAlert('Todos los campos son obligatorios', 'error');
        return;
    }

    if (edit) {
        // Message
        ui.printAlert('La cita se editó correctamente');

        // Pass the object to edit
        manageAppointments.editAppointment({ ...appointmentObj });

        // Change text of button
        form.querySelector('button[type="submit"]').textContent = 'Crear Cita';

        // Return to default
        edit = false;
    } else {
        // Generate unique ID
        appointmentObj.id = Date.now();

        // Creating a new appointment
        manageAppointments.newAppointment({ ...appointmentObj });

        // Message
        ui.printAlert('La cita se agregó correctamente');
    }

    // Reset Object for validation
    resetObject();

    // Restart the form
    form.reset();

    // Show appointments HTML
    ui.printAppointments(manageAppointments);
};

export const deleteAppointment = (id) => {
    // Delete an appointment
    manageAppointments.deleteAppointment(id);

    // Show a message
    ui.printAlert('La cita se eliminó correctamente');

    // Refresh appointments
    ui.printAppointments(manageAppointments);
};

export const editAppointment = (appointment) => {
    const { pet, owner, phone, date, time, symptoms, id } = appointment;

    // Fill inputs
    petInput.value = pet;
    ownerInput.value = owner;
    phoneInput.value = phone;
    dateInput.value = date;
    timeInput.value = time;
    symptomsInput.value = symptoms;

    // Fill appointment object
    appointmentObj.pet = pet;
    appointmentObj.owner = owner;
    appointmentObj.phone = phone;
    appointmentObj.date = date;
    appointmentObj.time = time;
    appointmentObj.symptoms = symptoms;
    appointmentObj.id = id;

    // Change text of button
    form.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    edit = true;
};