/* -------------------------------------------------------------------------- */
/*                                   CLASES                                   */
/* -------------------------------------------------------------------------- */

class Person {
  constructor(doc_number, gender, last_name, first_name, birthday, photo) {
    this.id = Date.now();
    this.doc_number = doc_number;
    this.gender = gender;
    this.last_name = last_name;
    this.first_name = first_name;
    this.birthday = birthday;
    this.photo = photo;
  }
  getAge() {
    let birthday_arr = this.birthday.split("/");

    let birthday_date = new Date(
      birthday_arr[2],
      birthday_arr[1] - 1,
      birthday_arr[0]
    );
    let ageDifMs = Date.now() - birthday_date.getTime();
    let ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}

class Professional {
  constructor(id, license_code, person, specialty) {
    this.id = id;
    this.license_code = license_code;
    this.person = person;
    this.specialty = specialty;
  }
}

class ProfessionalPlanning {
  constructor(
    id,
    professional,
    date_from,
    date_to,
    max_appointmaint_duration_in_min
  ) {
    this.id = id;
    this.professional = professional;
    this.date_from = date_from;
    this.date_to = date_to;
    this.max_appointmaint_duration_in_min = max_appointmaint_duration_in_min;
    this.available_times_list = this.getPlanningDates();
  }
  getMaxAppointmentAmount() {
    let totalMin = (this.date_to - this.date_from) / 60000;
    return Math.floor(totalMin / this.max_appointmaint_duration_in_min);
  }
  getPlanningDates() {
    const maxAppointmentAmount = this.getMaxAppointmentAmount();
    let datesArr = [];
    let auxAppointmentDate = new Date(this.date_from);
    let currentMinutes = this.date_from.getMinutes();
    let minutesCounter = 0;

    datesArr.push(auxAppointmentDate.toLocaleTimeString());

    while (datesArr.length < maxAppointmentAmount) {
      minutesCounter = currentMinutes + this.max_appointmaint_duration_in_min;
      if (minutesCounter == 60) {
        auxAppointmentDate.setHours(auxAppointmentDate.getHours() + 1);
        currentMinutes = 0;
      } else {
        if (minutesCounter > 60) {
          auxAppointmentDate.setHours(
            auxAppointmentDate.getHours() + 1,
            minutesCounter - 60
          );
          currentMinutes = minutesCounter - 60;
        } else {
          currentMinutes += this.max_appointmaint_duration_in_min;
        }
      }
      auxAppointmentDate.setMinutes(currentMinutes);
      datesArr.push(auxAppointmentDate.toLocaleTimeString());
    }
    return datesArr;
  }

  deleteUsedTime(selectedTime) {
    this.available_times_list = this.available_times_list.filter(
      (time) => time != selectedTime
    );
  }
}

class Appointment {
  constructor(person, time, professional_planning) {
    this.id = Date.now();
    this.person = person;
    this.time = time;
    this.professional_planning = professional_planning;
  }
  showAppointmentData() {
    console.log("=======DATOS DEL TURNO ASIGNADO=======");
    console.log(`
    DNI: ${this.person.doc_number}
    Apellido: ${this.person.last_name}
    Nombre: ${this.person.first_name}
    Fecha de nacimiento: ${this.person.birthday}
    Edad: ${this.person.getAge()}
    Género: ${this.person.gender}
    Hora del turno: ${this.time}`);
  }
}
/* -------------------------------------------------------------------------- */
/*                                 FIN CLASES                                 */
/* -------------------------------------------------------------------------- */

function createNewAppointment(person, time, professional_planning) {
  let appointment = new Appointment(person, time, professional_planning);
  professional_planning.deleteUsedTime(time);
  return appointment;
}


const professional_person_1 = new Person(
  "35887554",
  "M",
  "Fleming",
  "Alexander",
  "21/12/1978",
  "./images/img-dr-men-01.png"
);

const professional_person_2 = new Person(
  "34050138",
  "M",
  "Blackwell",
  "Elizabeth ",
  "13/11/1980",
  "./images/img-dr-woman-01.png"
);

const professional_person_3 = new Person(
  "32558425",
  "M",
  "Sanger",
  "Margaret",
  "13/11/1980",
  "./images/img-dr-woman-02.png"
);
const professional_person_4 = new Person(
  "33448551",
  "M",
  "Curie",
  "Marie ",
  "13/11/1980",
  "./images/img-dr-woman-03.png"
);

const professional_1 = new Professional(
  1,
  "A-123",
  professional_person_1,
  "Medicina General"
);

const professional_2 = new Professional(
  2,
  "B-345",
  professional_person_2,
  "Cardiología"
);

const professional_3 = new Professional(
  3,
  "B-346",
  professional_person_3,
  "Pediatría"
);

const professional_4 = new Professional(
  4,
  "C-347",
  professional_person_4,
  "Nutrición"
);

const planning_1 = new ProfessionalPlanning(
  1,
  professional_1,
  new Date(2023, 7, 22, 8, 0, 0),
  new Date(2023, 7, 22, 12, 0, 0),
  30
);

const planning_2 = new ProfessionalPlanning(
  2,
  professional_2,
  new Date(2023, 7, 22, 15, 0, 0),
  new Date(2023, 7, 22, 16, 0, 0),
  60
);

const planning_3 = new ProfessionalPlanning(
  3,
  professional_3,
  new Date(2023, 7, 22, 8, 0, 0),
  new Date(2023, 7, 22, 14, 0, 0),
  30
);

const planning_4 = new ProfessionalPlanning(
  4,
  professional_4,
  new Date(2023, 7, 22, 19, 0, 0),
  new Date(2023, 7, 22, 22, 0, 0),
  60
);

const professionalList = [
  professional_1,
  professional_2,
  professional_3,
  professional_4,
];

const professionaPlanningList = [
  planning_1,
  planning_2,
  planning_3,
  planning_4,
];


let patientList = [];
let appointmentList = [];

if (!localStorage.getItem("professional_planning_list")) {

  localStorage.setItem(
    "professional_planning_list",
    JSON.stringify(professionaPlanningList)
  );
}


if (!localStorage.getItem("appointment_list")) {
  localStorage.setItem(
    "appointment_list",
    JSON.stringify(appointmentList)
  );
}

const mainTitle = document.querySelector("main h3");
const mainGrid = document.querySelector(".container .row");

function renderMainGrid() {
  mainGrid.innerHTML = "";
  mainTitle.innerHTML = "Selecciona el profesional para solicitar un turno.";

  for (let professional of professionalList) {
    let cardDiv = document.createElement("div");
    cardDiv.className = "col";

    cardDiv.innerHTML = `
        <a href="#" data-dni=${professional.person.doc_number}>
          <div class="col">
            <div class="card" style="width: 18rem;">
              <img class="p-2" src="${professional.person.photo}" class="card-img-top" alt="Professional picture">
              <div class="card-body">
                <h5 class="card-title">${professional.person.last_name} ${professional.person.first_name}</h5>
                <p class="card-text">${professional.specialty}</p>
              </div>
            </div>
          </div>
        </a>`;

    mainGrid.append(cardDiv);
  }
  const cards = document.querySelectorAll(".row a");
  for (let card of cards) {
    card.addEventListener("click", () => {
      const selectedProfessional = professionalList.find(
        (professional) => professional.person.doc_number == card.dataset.dni
      );
      goToForm(selectedProfessional);
    });
  }
}

renderMainGrid();

function goToForm(professional) {
  function deleteUsedTimeOnLS(professionalPlanning,selectedTime) {
    professionalPlanning.available_times_list = professionalPlanning.available_times_list.filter(
      (time) => time != selectedTime
    );
  }
  const professionalPlanningListFromLS = JSON.parse(
    localStorage.getItem("professional_planning_list")
  );
  const professionalPlanningFromLS = professionalPlanningListFromLS.find(
    (professionalPlanning) =>
      professionalPlanning.professional.id == professional.id);
  console.log(professionalPlanningFromLS);

  const professionalPlanning = professionaPlanningList.find(
    (planning) => planning.professional === professional
  );

  if (professionalPlanningFromLS.available_times_list.length == 0) {
    alert("El profesional no tiene horarios disponibles.");
    return 0;
  }
  if (localStorage.getItem("appointment_list")) {
    appointmentList = JSON.parse(localStorage.getItem("appointment_list"));
  }
  function fillDay() {
    let options = "";

    for (let i = 1; i <= 31; i++) {
      options += `<option value=${i}>${i}</option>`;
    }
    return options;
  }
  function fillMonth() {
    let options = "";

    for (let i = 1; i <= 12; i++) {
      options += `<option value=${i}>${i}</option>`;
    }
    return options;
  }
  function fillYear() {
    let options = "";
    const current_date = new Date();

    for (let i = 1920; i <= current_date.getFullYear(); i++) {
      options += `<option value=${i}>${i}</option>`;
    }
    return options;
  }

  function renderTimes(availableTimes) {
    let options = "";

    for (let time of availableTimes) {
      options += `<option value=${time}>${time}</option>`;
    }

    return options;
  }

  mainTitle.innerHTML = "Ingrese sus datos";

  mainGrid.innerHTML = `
  <div class="container">
  <div class="text-center p-4">
    <p>Turno con: ${professional.person.last_name} ${
    professional.person.first_name
  }</p>
  </div>
  <div class="row justify-content-center">
    <div class="form-container col-5 p-4">
      <form class="needs-validation" novalidate>
        <div class="mb-3">
          <div class="form-floating mb-3">
            <select id="timeSelect" class="form-select" aria-label="Gender select">
              <option selected>Horas disponibles</option>
              ${renderTimes(professionalPlanningFromLS.available_times_list)}
            </select>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="dniInput" placeholder="Ingrese su DNI" required>
            <label for="dniInput">DNI</label>
            <div class="invalid-feedback">
              Please choose a username.
            </div>
          </div>
          <div class="form-floating d-flex justify-content-between ps-3 pe-5">
            <p class="d-inline">Género</p>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="genderRadio" id="genderRadioM" value="M" checked>
              <label class="form-check-label" for="genderRadioM">M</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="genderRadio" id="genderRadioF" value="F">
              <label class="form-check-label" for="genderRadioF">F</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="genderRadio" id="genderRadioX" value="X">
              <label class="form-check-label" for="genderRadioX">X</label>
            </div>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="lastNameInput" placeholder="Ingrese su apellido">
            <label for="lastNameInput">Apellido</label>
          </div>
          <div class="form-floating">
            <input type="text" class="form-control" id="firstNameInput" placeholder="Ingrese su nombre">
            <label for="firstNameInput">Nombre</label>
          </div>
          <div class="form-floating mt-3 ps-3"><p>Fecha de nacimiento</p></div>
          <div class="row mb-5">
            <div class="col-4">
              <label for="inputDay" class="form-label">Día</label>
              <select id="inputDay" class="form-select" aria-label="Day select">
                ${fillDay()}
              </select>
            </div>
            <div class="col-4">
              <label for="inputMonth" class="form-label">Mes</label>
                <select id="inputMonth" class="form-select" aria-label="Month select">
                  ${fillMonth()}
                </select>
            </div>
            <div class="col-4">
              <label for="inputYear" class="form-label">Año</label>
                <select id="inputYear" class="form-select" aria-label="Year select">
                  ${fillYear()}
                </select>
            </div>
          </div>
        </div>
        <div class="col-12 d-flex  justify-content-between">
          <button class="btn btn-success w-50" type="button">VOLVER</button>
          <div class="container w-25"></div>
          <button class="btn btn-primary w-50" type="submit">SOLICITAR TURNO</button>
        </div>
      </form>
    </div>
  </div>
</div>`;
  const backButton = document.querySelector(".btn-success");
  const submitButton = document.querySelector(".btn-primary");

  backButton.addEventListener("click", () => {
    renderMainGrid();
  });

  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const selectedTime = document.getElementById("timeSelect").value;
    const docNumber = document.getElementById("dniInput").value;
    const gender = document.querySelector(
      'input[name="genderRadio"]:checked'
    ).value;
    const lastName = document.getElementById("lastNameInput").value;
    const firstName = document.getElementById("firstNameInput").value;
    const birthDay = document.getElementById("inputDay").value;
    const birthMonth = document.getElementById("inputMonth").value;
    const birthYear = document.getElementById("inputYear").value;

    if (selectedTime == "Horas disponibles") {
      alert("Debe seleccionar una hora para el turno.");
      return 0;
    }
    if (docNumber != undefined && (isNaN(docNumber) || docNumber.length < 8)) {
      alert("El DNI ingresado no es válido.");
      return 0;
    }
    if (lastName != undefined && lastName.length < 3) {
      alert("El apellido ingresado no es válido.");
      return 0;
    }
    if (firstName != undefined && firstName.length < 3) {
      alert("El nombre ingresado no es válido.");
      return 0;
    }

    const newPerson = new Person(
      docNumber,
      gender,
      lastName,
      firstName,
      birthDay + "/" + birthMonth + "/" + birthYear,
      "./images/person-silhouette.png"
    );

    patientList.push(newPerson);
    localStorage.setItem('patient_list',JSON.stringify(patientList));

    const newAppointment = createNewAppointment(
      newPerson,
      selectedTime,
      professionalPlanning
    );
    if (newAppointment != undefined) {
      appointmentList.push(newAppointment);
      localStorage.setItem('appointment_list', JSON.stringify(appointmentList));

      deleteUsedTimeOnLS(professionalPlanningFromLS,selectedTime);
      localStorage.setItem(
        "professional_planning_list",
        JSON.stringify(professionalPlanningListFromLS)
      );
      alert("Turno generado.");
      renderMainGrid();
    }

    console.log(newAppointment);
  });
}
