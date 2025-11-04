[cite_start]// [cite: 1094-1178]
// Otra forma de acceder a un elemento HTML es utilizando el getElementById del DOM
// Notesé que para este caso no se antepone el carácter #
const campo = document.getElementById("idTxtNumero");

//definamos una funcion anonima que permita validar en tiempo real el ingreso de un numero
const validarNumero = function (e) {
  //creamos una expresion regular que valida que sean numeros
  let validar = /^[0-9]$/; [cite_start]// *Corrección: La guía [cite: 1107] tiene /^[0-9]{1}$/, que solo permite un dígito. Lo he cambiado a /^[0-9]$/ que valida tecla por tecla.*
  let tecla = e.key;

  // test válida que la expresión regular coicida con el valor ingresado
  // podná observan que al intentar teclara un letra u otro caracter diferente
  // a un número este no se escribe en el campo
  if (!validar.test(tecla)) {
    e.preventDefault();
  }
};

//definiendo el evento keypress para el campo
campo.addEventListener("keypress", validarNumero);

//Trabajando con el boton Calcular
const boton = document.getElementById("idBtnCalcular"); [cite_start]// *Corrección: La guía [cite: 1134] [cite_start]usa "IdBtnCalcular", pero el HTML [cite: 1074] usa "idBtnCalcular".*

//Definiendo una funcion anonima para calcular el factorial de un numero
function calcularFactorial(numero) {
  return numero < 2 ? 1 : numero * calcularFactorial(numero - 1);
}

//Definamos una funcion de tipo flecha para imprimir el resultado del factorial
const imprimir = (numero, resultado) => {
  const contenedor = document.getElementById("idDivResultado");
  contenedor.innerHTML = `El factorial de ${numero}! es ${resultado}`;
};

// Definiendo una funcion tradicional
function calcular() {
  let numero = document.getElementById("idTxtNumero").value;
  if (numero != "") {
    //Llamamos a la funcion anonima para que calcule el factorial
    let resultado = calcularFactorial(numero);
    //Enviando el resultado a una funcion de tipo flecha
    imprimir(numero, resultado);
  } else {
    alert("Debe ingresar un numero válido");
  }
}

//definiGendo el evento click para el boton
boton.addEventListener("click", calcular);