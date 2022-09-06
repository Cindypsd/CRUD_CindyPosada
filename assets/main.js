console.log("JS esta funcionando");

const txtNotas = document.getElementById("txtNotas");
const postIts = document.getElementById("postIts");

postIts.classList.add("rowPostIt");

let notas = localStorage.getItem("notas")
  ? JSON.parse(localStorage.getItem("notas"))
  : [];

mostrarNotas();

function guardar() {
  // console.log("entro a guardar");
  const nota = txtNotas.value;
  notas.push(nota);
  // console.log(`Escribio ${nota}`);
  // console.log(notas);
  actualizarStorage();
}

function actualizarStorage() {
  localStorage.setItem("notas", JSON.stringify(notas));
  mostrarNotas();
}

function mostrarNotas() {
  if (notas.length === 0) {
    postIts.innerHTML = `<h3 class="text-center mt-4 mb-4">Aún no creas una nota :(</h3>`;
  } else {
    postIts.innerHTML = "";
    for (const nota of notas) {
      const divPosIts = document.createElement("div");
      const pNota = document.createElement("p");
      const divBotones = document.createElement("div");
      pNota.innerText = nota;
      divPosIts.appendChild(pNota);
      pNota.appendChild(divBotones);
      postIts.appendChild(divPosIts);
      divPosIts.classList.add("postit", "shadow-sm", "p-3", "mb-5", "rounded");
      pNota.classList.add("txtPostIt");

      const btnColor = document.createElement("button");
      btnColor.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-paint-bucket" viewBox="0 0 16 16">
      <path d="M6.192 2.78c-.458-.677-.927-1.248-1.35-1.643a2.972 2.972 0 0 0-.71-.515c-.217-.104-.56-.205-.882-.02-.367.213-.427.63-.43.896-.003.304.064.664.173 1.044.196.687.556 1.528 1.035 2.402L.752 8.22c-.277.277-.269.656-.218.918.055.283.187.593.36.903.348.627.92 1.361 1.626 2.068.707.707 1.441 1.278 2.068 1.626.31.173.62.305.903.36.262.05.64.059.918-.218l5.615-5.615c.118.257.092.512.05.939-.03.292-.068.665-.073 1.176v.123h.003a1 1 0 0 0 1.993 0H14v-.057a1.01 1.01 0 0 0-.004-.117c-.055-1.25-.7-2.738-1.86-3.494a4.322 4.322 0 0 0-.211-.434c-.349-.626-.92-1.36-1.627-2.067-.707-.707-1.441-1.279-2.068-1.627-.31-.172-.62-.304-.903-.36-.262-.05-.64-.058-.918.219l-.217.216zM4.16 1.867c.381.356.844.922 1.311 1.632l-.704.705c-.382-.727-.66-1.402-.813-1.938a3.283 3.283 0 0 1-.131-.673c.091.061.204.15.337.274zm.394 3.965c.54.852 1.107 1.567 1.607 2.033a.5.5 0 1 0 .682-.732c-.453-.422-1.017-1.136-1.564-2.027l1.088-1.088c.054.12.115.243.183.365.349.627.92 1.361 1.627 2.068.706.707 1.44 1.278 2.068 1.626.122.068.244.13.365.183l-4.861 4.862a.571.571 0 0 1-.068-.01c-.137-.027-.342-.104-.608-.252-.524-.292-1.186-.8-1.846-1.46-.66-.66-1.168-1.32-1.46-1.846-.147-.265-.225-.47-.251-.607a.573.573 0 0 1-.01-.068l3.048-3.047zm2.87-1.935a2.44 2.44 0 0 1-.241-.561c.135.033.324.11.562.241.524.292 1.186.8 1.846 1.46.45.45.83.901 1.118 1.31a3.497 3.497 0 0 0-1.066.091 11.27 11.27 0 0 1-.76-.694c-.66-.66-1.167-1.322-1.458-1.847z"/>
    </svg>`;
      btnColor.classList.add("btn", "botonNota");
      const colores = ["#FCDDFF ", "#F9F8C0 ", "#E3C0F9", "#C0F1F9 "];
      function cambiarColor() {
        const index = parseInt(Math.random() * colores.length);
        divPosIts.style.backgroundColor = colores[index];
      }
      btnColor.onclick = () => cambiarColor();
      pNota.appendChild(btnColor);

      const btnEditar = document.createElement("button");
      btnEditar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
    </svg>`;
      btnEditar.classList.add("btn", "botonNota");
      btnEditar.onclick = () => editar(nota);
      pNota.appendChild(btnEditar);

      const btnEliminar = document.createElement("button");
      btnEliminar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
      <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
    </svg>`;
      btnEliminar.onclick = () => eliminar(nota);
      pNota.appendChild(btnEliminar);
      btnEliminar.classList.add("btn");
    }
  }
}

function eliminar(nota) {
  const index = notas.indexOf(nota);
  notas.splice(index, 1);
  actualizarStorage();
}

function editar(nota) {
  const index = notas.indexOf(nota);
  const nuevaNota = prompt("Escribe tu nota de nuevo aqui:");
  notas[index] = nuevaNota;
  actualizarStorage();
}

//footer
(function () {
  let cpr = document.getElementById("copyright");
  cpr.innerHTML =
    "&copy; 2022 - " +
    new Date().getFullYear() +
    " Cindy Posada - All Rights Reserved.";
  cpr.innerHTML += "<br/>Last Updated : " + document.lastModified;
})();
