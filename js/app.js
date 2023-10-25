// Form Fields
const petInput = document.querySelector('#pet');
const ownerInput = document.querySelector('#owner');
const phoneInput = document.querySelector('#phone');
const dateInput = document.querySelector('#date');
const timeInput = document.querySelector('#time');
const symptomsInput = document.querySelector('#symptoms');

// UI
const form = document.querySelector('#new-appointment');
const containerAppointment = document.querySelector('#appointments');

let edit;

class Appointment {
    constructor() {
        this.appointments = [];
    }

    newAppointment(appointment) {
        this.appointments.push(appointment);
    }

    deleteAppointment(id) {
        this.appointments = this.appointments.filter(appointment => appointment.id !== id);
    }

    editAppointment(updatedAppointment) {
        this.appointments = this.appointments.map(
            appointment => appointment.id === updatedAppointment.id ? updatedAppointment : appointment
        );
    }
}

class UI {
    // Print Alert
    printAlert(message, type) {
        // Create div
        const divMessage = document.createElement('div');
        divMessage.classList.add('text-center', 'alert', 'd-block', 'col-12');

        // Add class depending on type
        if (type === 'error') {
            divMessage.classList.add('alert-danger');
        } else {
            divMessage.classList.add('alert-success');
        }

        // Message
        divMessage.textContent = message;

        // Add to DOM
        document.querySelector('#content').insertBefore(divMessage, document.querySelector('.add-appointment'));

        // Remove after 3 seconds
        setTimeout(() => {
            divMessage.remove();
        }, 3000);
    }

    // Print appointments
    printAppointments({ appointments }) {
        this.cleanHTML();

        appointments.forEach(appointment => {
            const { pet, owner, phone, date, time, symptoms, id } = appointment;

            const divAppointment = document.createElement('div');
            divAppointment.classList.add('appointment', 'p-3');
            divAppointment.dataset.id = id;
            divAppointment.innerHTML = `
                <h2 class="card-title font-weight-bolder"><strong>Mascota:</strong> ${pet}</h2>
                <p><span class="font-weight-bolder">Propietario:</span> ${owner}</p>
                <p><span class="font-weight-bolder">Teléfono:</span> ${phone}</p>
                <p><span class="font-weight-bolder">Fecha:</span> ${date}</p>
                <p><span class="font-weight-bolder">Hora:</span> ${time}</p>
                <p><span class="font-weight-bolder">Síntomas:</span> ${symptoms}</p>
            `;

            // Delete button
            const btnDelete = document.createElement('button');
            btnDelete.classList.add('btn', 'btn-danger', 'mr-2');
            btnDelete.innerHTML = 'Eliminar <svg aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round"></path></svg>';

            btnDelete.onclick = () => deleteAppointment(id);

            // Edit button
            const btnEdit = document.createElement('button');
            btnEdit.classList.add('btn', 'btn-info');
            btnEdit.innerHTML = 'Editar <svg aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round"></path></svg>';

            btnEdit.onclick = () => editAppointment(appointment);

            // Add to HTML
            divAppointment.appendChild(btnDelete);
            divAppointment.appendChild(btnEdit);
            containerAppointment.appendChild(divAppointment);
        });
    }

    cleanHTML() {
        while (containerAppointment.firstChild) {
            containerAppointment.removeChild(containerAppointment.firstChild);
        }
    }
}

const ui = new UI();
const manageAppointments = new Appointment();

// Object with appointment information
const appointmentObj = {
    pet: '',
    owner: '',
    phone: '',
    date: '',
    time: '',
    symptoms: ''
};

const resetObject = () => {
    appointmentObj.pet = '';
    appointmentObj.owner = '';
    appointmentObj.phone = '';
    appointmentObj.date = '';
    appointmentObj.time = '';
    appointmentObj.symptoms = '';
};

// Add data to appointment object
function appointmentDetails(e) {
    appointmentObj[e.target.name] = e.target.value;
}

// Validate and add new appointment
const newAppointment = (e) => {
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

const deleteAppointment = (id) => {
    // Delete an appointment
    manageAppointments.deleteAppointment(id);

    // Show a message
    ui.printAlert('La cita se eliminó correctamente');

    // Refresh appointments
    ui.printAppointments(manageAppointments);
};

const editAppointment = (appointment) => {
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

// Register Events
function eventListeners() {
    petInput.addEventListener('input', appointmentDetails);
    ownerInput.addEventListener('input', appointmentDetails);
    phoneInput.addEventListener('input', appointmentDetails);
    dateInput.addEventListener('input', appointmentDetails);
    timeInput.addEventListener('input', appointmentDetails);
    symptomsInput.addEventListener('input', appointmentDetails);

    form.addEventListener('submit', newAppointment);
}

eventListeners();
