const accordion = document.querySelector('.accordion');
const accordionContainer = document.querySelector('.container');
let appointmentList = JSON.parse(localStorage.getItem('appointment_list'));

if(appointmentList.length > 0) {
  
//TODO:BUSCAR LA FORMA DE CREAR LA LISTA DE PROFESIONALES SIN QUE SE REPITAN.
  let profesionalList = [];

  for(let appointment of appointmentList){

    profesionalList.push(appointment.professional_planning.professional);
  }
  profesionalList = [...new Set(profesionalList)];

  console.log(profesionalList);

  for(let professional of profesionalList) {
    let index = profesionalList.indexOf(professional);

    function buildTbody(currentProfessional){
      let tBody = '';
      let personIndex = 1;
      for(let appointment of appointmentList){
        if(appointment.professional_planning.professional === currentProfessional){
          tBody += `
          <tr>
            <th scope="row">${personIndex}</th>
            <td>${appointment.time}</td>
            <td>${appointment.person.doc_number}</td>
            <td>${appointment.person.last_name}</td>
            <td>${appointment.person.first_name}</td>
          </tr>`
          personIndex++;
        }
      }
      return tBody;
    }


    let profesionalLastName = professional.person.last_name;
    let profesionalFirstName = professional.person.first_name;
    let profesionalSpecialty = professional.specialty;

    let accordionItem = document.createElement("div");
    accordionItem.className = 'accordion-item';
    accordionItem.innerHTML = `
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button
          class="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapse${index}"
          aria-expanded="true"
          aria-controls="collapse${index}"
        >
          ${profesionalLastName} ${profesionalFirstName}
          (${profesionalSpecialty})
        </button>
      </h2>
      <div
        id="collapse${index}"
        class="accordion-collapse collapse"
        data-bs-parent="#accordionExample"
      >
        <div class="accordion-body">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Hora</th>
                <th scope="col">DNI</th>
                <th scope="col">Apellido</th>
                <th scope="col">Nombre</th>
              </tr>
            </thead>
            <tbody>
              ${buildTbody(professional)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

    accordion.append(accordionItem);
  }

}
else{
  accordion.remove();
  accordionContainer.innerHTML = `
  <div class="container text-center pt-5"><h5>No hay turnos registrados</h5></div>
  `;
}
