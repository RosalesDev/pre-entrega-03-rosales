/* -------------------------------------------------------------------------- */
/*                                   CLASES                                   */
/* -------------------------------------------------------------------------- */

class Person {
  constructor(
    doc_number,
    gender,
    last_name,
    first_name,
    birthday,
    photo,
  ) {
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

  deleteUsedTime(id) {
    this.available_times_list.splice(id, 1);
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
const professional_person_1 = new Person(
  "35887554",
  "M",
  "Fleming",
  "Alexander",
  "21/12/1978",
  "./images/img-dr-men-01.png"
);

const professional_person_2 = new Person(
  "36051238",
  "M",
  "Blackwell",
  "Elizabeth ",
  "13/11/1980",
  "./images/img-dr-woman-01.png"
);

const professional_person_3 = new Person(
  "36051238",
  "M",
  "Sanger",
  "Margaret",
  "13/11/1980",
  "./images/img-dr-woman-02.png"
);
const professional_person_4 = new Person(
  "36051238",
  "M",
  "Curie",
  "Marie ",
  "13/11/1980",
  "./images/img-dr-woman-03.png"
);

const professional_1 = new Professional(1, "A-123", professional_person_1, "Medicina General");

const professional_2 = new Professional(2, "B-345", professional_person_2, "Cardiología");

const professional_3 = new Professional(3, "B-346", professional_person_3, "Pediatría");

const professional_4 = new Professional(4, "C-347", professional_person_4, "Nutrición");

const professionalList = [professional_1, professional_2,professional_3,professional_4];


const mainGrid = document.querySelector(".container .row");

for (let professional of professionalList) {

  let cardDiv = document.createElement("div")
  cardDiv.className = "col";

  cardDiv.innerHTML = `
      <a href="#">
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

