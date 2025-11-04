// [cite: 1718, 1723-1917]
//Accediendo a los elementos html
const inputNombre = document.getElementById("idTxtNombre");
const inputApellido = document.getElementById("idTxtApellido");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputRdMasculino = document.getElementById("idRdMasculino");
const inputRdFemenino = document.getElementById("idRdFemenino");
const cmbPais = document.getElementById("idCmbPais");
const inputDireccion = document.getElementById("idTxtDireccion");
const inputNombrePais = document.getElementById("idNombrePais");

const buttonAgregarPaciente = document.getElementById("idBtnAgregar");
const buttonLimpiarPaciente = document.getElementById("idBtnLimpiar");
const buttonMostrarPaciente = document.getElementById("idBtnMostrar");
const buttonAgregarPais = document.getElementById("idBtnAddPais");

const notificacion = document.getElementById("idNotificacion");
// Componente de Bootstrap
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");

//Componente modal
const idModal = document.getElementById("idModal");

//Arreglo global de pacientes
let arrayPaciente = [];

/*
 * Creando una funcion para que limpie el formulario
 * siempre que se cargue la pagina o cuando se presione
 * el boton limpiar del formulario
 */
const limpiarForm = () => {
  inputNombre.value = "";
  inputApellido.value = "";
  inputFechaNacimiento.value = "";
  inputRdMasculino.checked = false;
  inputRdFemenino.checked = false;
  cmbPais.value = 0;
  inputDireccion.value = "";
  inputNombrePais.value = "";
  inputNombre.focus();
  
  // Resetear el botón si estaba en modo edición
  if (indiceEditando >= 0) {
    indiceEditando = -1;
    buttonAgregarPaciente.innerHTML = '<i class="bi bi-plus-circle-fill"></i> Agregar';
  }
};

//Funcion para validar el ingreso del paciente
const addPaciente = function () {
  let nombre = inputNombre.value;
  let apellido = inputApellido.value;
  let fechaNacimiento = inputFechaNacimiento.value;
  let sexo =
    inputRdMasculino.checked == true
      ? "Hombre"
      : inputRdFemenino.checked == true
      ? "Mujer"
      : "";
  let pais = cmbPais.value;
  let labelPais = cmbPais.options[cmbPais.selectedIndex].text;
  let direccion = inputDireccion.value;

  if (
    nombre != "" &&
    apellido != "" &&
    fechaNacimiento != "" &&
    sexo != "" &&
    pais != 0 &&
    direccion != ""
  ) {
    // Verificar si se está editando o agregando
    if (indiceEditando >= 0) {
      // Actualizar paciente existente
      arrayPaciente[indiceEditando] = new Array(
        nombre, apellido, fechaNacimiento, sexo, labelPais, direccion
      );
      mensaje.innerHTML = "Paciente actualizado correctamente";
      indiceEditando = -1;
      buttonAgregarPaciente.innerHTML = '<i class="bi bi-plus-circle-fill"></i> Agregar';
    } else {
      // Agregar nuevo paciente
      arrayPaciente.push(
        new Array(nombre, apellido, fechaNacimiento, sexo, labelPais, direccion)
      );
      mensaje.innerHTML = "Se ha registrado un nuevo paciente";
    }
    
    toast.show();
    limpiarForm();
    
    // Actualizar la tabla automáticamente si hay pacientes
    if (arrayPaciente.length > 0) {
      imprimirPacientes();
    }
  } else {
    mensaje.innerHTML = "Faltan campos por completar";
    toast.show();
  }
};

//Funcion que imprime la ficha de los pacientes registrados
function imprimirFilas() {
  let $fila = "";
  let contador = 1;

  arrayPaciente.forEach((element, index) => {
    $fila += `<tr>
      <td scope="row" class="text-center fw-bold">${contador}</td>
      <td>${element[0]}</td>
      <td>${element[1]}</td>
      <td>${element[2]}</td>
      <td>${element[3]}</td>
      <td>${element[4]}</td>
      <td>${element[5]}</td>
      <td>
        <button onclick="editarPaciente(${index})" type="button" class="btn btn-primary" alt="Editar">
          <i class="bi bi-pencil-square"></i>
        </button>
        <button onclick="eliminarPaciente(${index})" type="button" class="btn btn-danger" alt="Eliminar">
          <i class="bi bi-trash3-fill"></i>
        </button>
      </td>
    </tr>`;
    contador++;
  });
  return $fila;
}

const imprimirPacientes = () => {
  let $table = `<div class="table-responsive">
    <table class="table table-striped table-hover table-bordered">
      <tr>
        <th scope="col" class="text-center" style="width:5%">#</th>
        <th scope="col" class="text-center" style="width:15%">Nombre</th>
        <th scope="col" class="text-center" style="width:15%">Apellido</th>
        <th scope="col" class="text-center" style="width:10%">Fecha nacimiento</th>
        <th scope="col" class="text-center" style="width:10%">Sexo</th>
        <th scope="col" class="text-center" style="width:10%">Pais</th>
        <th scope="col" class="text-center" style="width: 25%">Dirección</th>
        <th scope="col" class="text-center" style="width:10%">Opciones</th>
      </tr>
      ${imprimirFilas()}
    </table>
  </div>`;
  document.getElementById("idTablaPacientes").innerHTML = $table;
};

// Función para editar un paciente
let indiceEditando = -1;

const editarPaciente = (index) => {
  // Cargar los datos del paciente en el formulario
  inputNombre.value = arrayPaciente[index][0];
  inputApellido.value = arrayPaciente[index][1];
  inputFechaNacimiento.value = arrayPaciente[index][2];
  
  // Seleccionar el sexo
  if (arrayPaciente[index][3] === "Hombre") {
    inputRdMasculino.checked = true;
  } else {
    inputRdFemenino.checked = true;
  }
  
  // Seleccionar el país
  let paisTexto = arrayPaciente[index][4];
  for (let i = 0; i < cmbPais.options.length; i++) {
    if (cmbPais.options[i].text === paisTexto) {
      cmbPais.value = cmbPais.options[i].value;
      break;
    }
  }
  
  inputDireccion.value = arrayPaciente[index][5];
  
  // Guardar el índice que se está editando
  indiceEditando = index;
  
  // Cambiar el texto del botón
  buttonAgregarPaciente.innerHTML = '<i class="bi bi-pencil-square"></i> Actualizar';
  
  // Enfocar el nombre
  inputNombre.focus();
  
  // Mostrar notificación
  mensaje.innerHTML = "Editando paciente. Modifique los datos y presione Actualizar";
  toast.show();
};

// Función para eliminar un paciente
const eliminarPaciente = (index) => {
  // Confirmar antes de eliminar
  if (confirm(`¿Está seguro de eliminar al paciente ${arrayPaciente[index][0]} ${arrayPaciente[index][1]}?`)) {
    // Eliminar del arreglo
    arrayPaciente.splice(index, 1);
    
    // Actualizar la tabla
    imprimirPacientes();
    
    // Mostrar notificación
    mensaje.innerHTML = "Paciente eliminado correctamente";
    toast.show();
  }
};

// Contador global de los option correspondiente
// al select (cmb) pais
let contadorGlobalOption = cmbPais.children.length;

const addPais = () => {
  let paisNew = inputNombrePais.value;
  if (paisNew != "") {
    // Creando nuevo option con la API DOM
    let option = document.createElement("option");
    option.textContent = paisNew;
    option.value = contadorGlobalOption + 1;
    //Agregando el nuevo option en el select
    cmbPais.appendChild(option);
    //Asignando un mensaje a nuestra notificacion
    mensaje.innerHTML = "Pais agregado correctamente";
    //Llamando al componente de Bootstrap
    toast.show();
  } else {
    //Asignando un mensaje a nuestra notificacion
    mensaje.innerHTML = "Faltan campos por completar";
    //Llamando al componente de Bootstrap
    toast.show();
  }
};

// Agregando eventos a los botones y utilizando funciones
// tipo flecha
buttonLimpiarPaciente.onclick = () => {
  limpiarForm();
};

buttonAgregarPaciente.onclick = () => {
  addPaciente();
};

buttonMostrarPaciente.onclick = () => {
  imprimirPacientes();
};

buttonAgregarPais.onclick = () => {
  addPais();
};

// Se agrega el focus en el campo nombre pais del modal
idModal.addEventListener("shown.bs.modal", () => {
  inputNombrePais.value = "";
  inputNombrePais.focus();
});

//Ejecutar funcion al momento de cargar la pagina HTML
limpiarForm();