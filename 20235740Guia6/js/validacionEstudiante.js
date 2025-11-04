// Validación de formulario de estudiante con expresiones regulares

// Expresiones regulares para validación
const regexCarnet = /^[A-Z]{2}\d{3}$/; // Formato: AB001
const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; // Solo letras y espacios
const regexDUI = /^\d{8}-\d$/; // Formato: 12345678-9
const regexNIT = /^\d{4}-\d{6}-\d{3}-\d$/; // Formato: 1234-567890-123-4
const regexFecha = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/; // Formato: DD/MM/YYYY
const regexCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // Formato correo electrónico
const regexEdad = /^\d+$/; // Solo números

// Obtener elementos del DOM
const formEstudiante = document.getElementById("formEstudiante");
const btnValidar = document.getElementById("btnValidar");
const btnLimpiar = document.getElementById("btnLimpiar");
const divResultado = document.getElementById("resultado");

// Función para validar cada campo
function validarCampo(valor, regex, nombreCampo) {
  if (valor.trim() === "") {
    return { valido: false, mensaje: `El campo ${nombreCampo} es obligatorio` };
  }
  if (!regex.test(valor)) {
    return { valido: false, mensaje: `El formato de ${nombreCampo} es incorrecto` };
  }
  return { valido: true, mensaje: `${nombreCampo} válido` };
}

// Función para validar edad (entre 15 y 100 años)
function validarEdad(edad) {
  if (!regexEdad.test(edad)) {
    return { valido: false, mensaje: "La edad debe contener solo números" };
  }
  const edadNum = parseInt(edad);
  if (edadNum < 15 || edadNum > 100) {
    return { valido: false, mensaje: "La edad debe estar entre 15 y 100 años" };
  }
  return { valido: true, mensaje: "Edad válida" };
}

// Función para validar fecha de nacimiento
function validarFechaNacimiento(fecha) {
  if (!regexFecha.test(fecha)) {
    return { valido: false, mensaje: "El formato de fecha debe ser DD/MM/YYYY" };
  }
  
  // Validar que la fecha sea válida
  const partes = fecha.split("/");
  const dia = parseInt(partes[0]);
  const mes = parseInt(partes[1]) - 1; // Los meses en JavaScript empiezan en 0
  const anio = parseInt(partes[2]);
  
  const fechaObj = new Date(anio, mes, dia);
  
  if (
    fechaObj.getDate() !== dia ||
    fechaObj.getMonth() !== mes ||
    fechaObj.getFullYear() !== anio
  ) {
    return { valido: false, mensaje: "La fecha ingresada no es válida" };
  }
  
  // Validar que no sea una fecha futura
  if (fechaObj > new Date()) {
    return { valido: false, mensaje: "La fecha de nacimiento no puede ser futura" };
  }
  
  return { valido: true, mensaje: "Fecha de nacimiento válida" };
}

// Función principal de validación
function validarFormulario(event) {
  event.preventDefault();
  
  // Obtener valores de los campos
  const carnet = document.getElementById("inputCarnet").value;
  const nombre = document.getElementById("inputNombre").value;
  const dui = document.getElementById("inputDUI").value;
  const nit = document.getElementById("inputNIT").value;
  const fechaNacimiento = document.getElementById("inputFechaNacimiento").value;
  const correo = document.getElementById("inputCorreo").value;
  const edad = document.getElementById("inputEdad").value;
  
  // Validar cada campo
  const validaciones = [
    validarCampo(carnet, regexCarnet, "Carnet (Formato: AB001)"),
    validarCampo(nombre, regexNombre, "Nombre completo"),
    validarCampo(dui, regexDUI, "DUI (Formato: 12345678-9)"),
    validarCampo(nit, regexNIT, "NIT (Formato: 1234-567890-123-4)"),
    validarFechaNacimiento(fechaNacimiento),
    validarCampo(correo, regexCorreo, "Correo electrónico"),
    validarEdad(edad)
  ];
  
  // Mostrar resultados
  let htmlResultado = "<h4>Resultados de Validación:</h4><ul class='list-group'>";
  let todosValidos = true;
  
  validaciones.forEach(resultado => {
    const clase = resultado.valido ? "list-group-item-success" : "list-group-item-danger";
    const icono = resultado.valido ? "✓" : "✗";
    htmlResultado += `<li class="list-group-item ${clase}">${icono} ${resultado.mensaje}</li>`;
    if (!resultado.valido) todosValidos = false;
  });
  
  htmlResultado += "</ul>";
  
  if (todosValidos) {
    htmlResultado += `
      <div class="alert alert-success mt-3" role="alert">
        <h5>¡Formulario válido!</h5>
        <p>Todos los datos han sido ingresados correctamente.</p>
      </div>
      <div class="card mt-3">
        <div class="card-header">
          <strong>Datos del Estudiante</strong>
        </div>
        <div class="card-body">
          <p><strong>Carnet:</strong> ${carnet}</p>
          <p><strong>Nombre:</strong> ${nombre}</p>
          <p><strong>DUI:</strong> ${dui}</p>
          <p><strong>NIT:</strong> ${nit}</p>
          <p><strong>Fecha de Nacimiento:</strong> ${fechaNacimiento}</p>
          <p><strong>Correo:</strong> ${correo}</p>
          <p><strong>Edad:</strong> ${edad} años</p>
        </div>
      </div>
    `;
  } else {
    htmlResultado += `
      <div class="alert alert-danger mt-3" role="alert">
        <h5>Formulario inválido</h5>
        <p>Por favor, corrija los errores indicados arriba.</p>
      </div>
    `;
  }
  
  divResultado.innerHTML = htmlResultado;
  divResultado.style.display = "block";
}

// Función para limpiar el formulario
function limpiarFormulario() {
  formEstudiante.reset();
  divResultado.innerHTML = "";
  divResultado.style.display = "none";
  document.getElementById("inputCarnet").focus();
}

// Eventos
if (btnValidar) {
  btnValidar.addEventListener("click", validarFormulario);
}

if (btnLimpiar) {
  btnLimpiar.addEventListener("click", limpiarFormulario);
}

// Ejemplos de formatos válidos para guía del usuario
const ejemplosFormato = {
  carnet: "AB001, XY999",
  nombre: "Juan Pérez García, María José López",
  dui: "12345678-9",
  nit: "1234-567890-123-4",
  fecha: "25/12/2005, 01/01/2000",
  correo: "estudiante@correo.com, usuario@dominio.edu",
  edad: "18, 25, 30"
};

// Mostrar ayuda contextual al hacer focus en cada campo
document.querySelectorAll("input").forEach(input => {
  input.addEventListener("focus", function() {
    const campo = this.id.replace("input", "").toLowerCase();
    if (ejemplosFormato[campo]) {
      this.placeholder = `Ejemplo: ${ejemplosFormato[campo]}`;
    }
  });
});
