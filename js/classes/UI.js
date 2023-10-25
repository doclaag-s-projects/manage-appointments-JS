import { deleteAppointment, editAppointment } from '../functions.js';
import { containerAppointment, heading } from '../selectors.js';

export default class UI {
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

    textHeading(appointment){
        if(appointment.length > 0){
            heading.textContent = 'Administra tus Citas';
        }else{
            heading.textContent = 'No hay Citas, comienza creando una';
        }
    }

    cleanHTML() {
        while (containerAppointment.firstChild) {
            containerAppointment.removeChild(containerAppointment.firstChild);
        }
    }
}