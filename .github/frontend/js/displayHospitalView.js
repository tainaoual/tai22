import {
    deletePatient
} from "./deletePatient.js"
import {
    clearChildren,
    displaySinglePatient
} from "./displaySinglePatient.js"
import {
    createHeader
  } from "./header.js"
import{
    editPatientPriority
}from "./displaySinglePatient.js"



const displayHospitalView = function (patients) {
    const containerElement = document.createElement("div");
    containerElement.classList.add("container");
    const patientListElement = document.createElement("div");
    patientListElement.classList.add("patient-intake-list");
    containerElement.appendChild(patientListElement);


    patients.forEach(patient => {

        let patientCardElement = document.createElement("div");
        patientCardElement.classList.add("patient-card");

        let patientModal = displaySinglePatient(patient);
        patientListElement.appendChild(patientModal);
        patientCardElement.addEventListener('click', () => {
            patientModal.style.display = "block";
        });

        function closeModal() {
            clearChildren(containerElement)
            fetch("http://localhost:8080/api/patients")
                .then(response => response.json())
                .then(patients => displayHospitalView(patients))
                .then(patientsElement => containerElement.appendChild(patientsElement))
                .catch(error => console.log(error));
            location.reload(true);

            patientModal.style.display = "none";
        }
        patientModal.addEventListener('click', closeModal);

        
        

        let patientAgeSexElement = document.createElement("div");
        patientAgeSexElement.classList.add("patient-age-sex");
        patientAgeSexElement.innerText = patient.age + " y/o " + patient.sex

        let etaElement = document.createElement("div");
        etaElement.classList.add("eta");
        etaElement.innerText = "ETA:" + "filler"

        let chiefComplaintElement = document.createElement("div");
        chiefComplaintElement.classList.add("chief-complaint");
        chiefComplaintElement.innerText = patient.chiefComplaint

        let priorityElement = document.createElement("div");
        priorityElement.classList.add("priority");
        priorityElement.innerHTML = `<img src="./imgs/priority-icon-${patient.levelOfEmergency}.png" alt="unavailable" class="priority">`

        let clearPtButtonElement = document.createElement("div");
        clearPtButtonElement.classList.add("clear-pt-button");
        const ptButton = document.createElement("button");
        ptButton.innerText = "Clear PT";
        ptButton.addEventListener('click', () => deletePatient(patient));

        patientCardElement.appendChild(patientAgeSexElement);
        patientCardElement.appendChild(etaElement);
        patientCardElement.appendChild(chiefComplaintElement);
        patientCardElement.appendChild(priorityElement);
        clearPtButtonElement.appendChild(ptButton);
        patientCardElement.appendChild(clearPtButtonElement);
        patientListElement.appendChild(patientCardElement);

    });

    return patientListElement;
}
export {
    displayHospitalView
}