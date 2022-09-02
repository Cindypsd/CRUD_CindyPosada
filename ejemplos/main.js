const txtPelicula = document.getElementById("txtPelicula");
const tblPeliculas = document.getElementById("tblPeliculas");

let peliculas = localStorage.getItem("peliculas")
  ? JSON.parse(localStorage.getItem("peliculas"))
  : [];

mostrarPeliculas();

function guardar() {
  console.log("Boton guardar funciona");
  const pelicula = txtPelicula.value;
  peliculas.push(pelicula);
  console.log(`Escribio ${pelicula}`);
  console.log(peliculas);
  actualizarStorage();
}

function actualizarStorage() {
  localStorage.setItem("peliculas", JSON.stringify(peliculas));
  mostrarPeliculas();
}

function mostrarPeliculas() {
  if (peliculas.length === 0) {
    tblPeliculas.innerHTML = `<tr class="text-center font-weight-bold">
    <td colspan="2">NO HAY REGISTROS</td>
</tr> `;
  } else {
    tblPeliculas.innerHTML = "";
    for (const pelicula of peliculas) {
      const tr = document.createElement("tr"); // crea el reglon de la tabla

      const tdPelicula = document.createElement("td");
      tdPelicula.innerText = pelicula;
      tr.appendChild(tdPelicula); // agregamos peli al renglon
      tblPeliculas.appendChild(tr);

      const tdAcciones = document.createElement("td");

      const btnEliminar = document.createElement("button");
      btnEliminar.innerText = "Eliminar";
      btnEliminar.classList.add("btn", "btn-danger");
      btnEliminar.onclick = () => eliminar(pelicula);
      tdAcciones.appendChild(btnEliminar);
      tr.appendChild(tdAcciones);

      const btnEditar = document.createElement("button");
      btnEditar.innerText = "Editar";
      btnEditar.classList.add("btn", "btn-secondary ");

      btnEditar.onclick = () => editar(pelicula);

      tdAcciones.appendChild(btnEditar);
      tr.appendChild(tdAcciones);
    }
  }
}

function eliminar(pelicula) {
  const index = peliculas.indexOf(pelicula);
  peliculas.splice(index, 1);
  actualizarStorage();
}

function editar(pelicula) {
  const index = peliculas.indexOf(pelicula);
  const nuevoNombre = prompt(
    `Estas editando la pelicula ${pelicula} Ingresa tu nueva pelicula:`
  );
  peliculas[index] = nuevoNombre;
  actualizarStorage();
}
