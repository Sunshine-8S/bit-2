"use strict";

const $containerCards = document.getElementById("containerCards");
const $searchInput = document.getElementById("searchInput");
const $formSearch = document.getElementById("formSearch");

let allStudents = [];

function selectedCards(students) {
    let cards = `<div class="row row-cols-1 row-cols-md-3 g-4">`;
    for (let i = 0; i < students.length; i++) {
        let sumaProyectos = 0;
        let cantidadProyectos = 0;
        cards += 
        `
            <div class="col">
                <div class="card h-100">
                    <img src="https://github.com/${students[i].usernameGithub}.png" class="card-img-top" alt="Imagen de perfil de ${students[i].student}">
                    <div class="card-body">
                        <h5 class="card-title">${students[i].student}</h5>
                        <p class="card-text">Código del estudiante: ${students[i].code}</p>
                        <p class="card-text">Intensidad horaria: ${students[i].intensity}</p>
                        <h5 class="card-title">Proyectos</h5>
        `;
                        for (let iP = 0; iP < students[i].projects.length; iP++) {
                            let projectBit1 = students[i].projects[iP];
                            let puntaje = projectBit1.score;
                            let promedio = "";

                            if (puntaje.length === 1) {
                                promedio = puntaje[0];
                                sumaProyectos += promedio;
                                cantidadProyectos++;
                            } else {
                                let suma = 0;
                                for (let iS = 0; iS < puntaje.length; iS++) {
                                    suma += projectBit1.score[iS];
                                }
                                promedio = (suma * 5) / puntaje.length;
                                sumaProyectos += promedio;
                                cantidadProyectos++;
                            }
                            cards += 
                            `
                                <p class="card-text">${students[i].projects[iP].name}: ${promedio}</p>
                            `;
                        }
                        let githubLink = students[i].usernameGithub;
                        !githubLink 
                        ? cards += 
                            `
                            <p>No se encontró la cuenta de GitHub de éste estudiante</p>
                            `
                        : cards +=
                            `
                            <a href="https://github.com/${students[i].usernameGithub}" target="_blank" rel="noopener noreferrer" class="card-link"><img class="github-logo" src="../assets/github-logo.png" alt="Logo de GitHub"></a>
                        `;
                    let promedioFinal = sumaProyectos / cantidadProyectos;
                    cards +=
                    `
                    </div>
                    <div class="card-footer">
                        <small class="card-text">Promedio total: ${promedioFinal}</small>
                    </div>
                </div>
            </div>
        `;
    }
    cards += `</div>`
    $containerCards.innerHTML = cards;
    
}


fetch(`file.json`)
    .then((response)=>response.json())
    .then((info)=>{
        allStudents = info;
        selectedCards(allStudents);
    })
.catch((err)=>{
    alert("Error: " + err);
});

$formSearch.addEventListener("submit", function(event) {
    event.preventDefault();
    const searchValue = $searchInput.value.toLowerCase().trim(); // Convertir a minúsculas para la búsqueda. .trim() quita los espacios ingresados antes y despues de la palabra
    const filteredStudents = allStudents.filter((alumno) => // Recorre todos los estudiantes que hay en allStudents
        alumno.student.toLowerCase().includes(searchValue) // Verifica si el nombre del estudiante contiene el texto que el usuario escribió en el input
    );

    selectedCards(filteredStudents);
});