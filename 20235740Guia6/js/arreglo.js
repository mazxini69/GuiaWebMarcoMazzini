// [cite: 816-896]
//Accedemos al contenedor donde se mostrara los estudiantes
const containerArreglo = document.querySelector("#idContainerArreglo");
const containerArregloOrdenado = document.querySelector(
  "#idContainerArregloOrdenado"
);

//Accedemos a cada boton por medio de la API DOM
const btnAgregar = document.querySelector("#idBtnAgregar");
const btnOrdenar = document.querySelector("#idBtnOrdenar");

//Agregamos el evento click a los botones, adicionalmente
//se le asigna la funcion que realizará la operación
btnAgregar.addEventListener("click", agregarElemento);
btnOrdenar.addEventListener("click", ordenarElementos);

let arreglo = new Array();

function agregarElemento() {
  const numero = parseInt(document.querySelector("#inputNumero").value); // [cite: 845, 861]

  //verificando que sea un numero
  if (isNaN(numero)) { // [cite: 849]
    alert("Debe ingresar un numero válido"); // [cite: 862]
  } else {
    //Agregamos un nuevo alemento al arreglo
    arreglo.push(numero); // [cite: 863]

    //Utilizaremos la API DOM para crean un elemento html
    let caja = document.createElement("div"); // [cite: 865]
    caja.className = "col-md-1 colum"; // [cite: 865]
    let valor = document.createElement("h3"); // [cite: 866]
    valor.textContent = numero; // [cite: 867]
    caja.appendChild(valor); // [cite: 868]

    //Insertamos los nuevos elementos en el contenedor
    //se utiliza beforeend para Insertar el nuevo
    //elemento dentro del idcontainerArreglo y despues de su ultimo hijo
    containerArreglo.insertAdjacentElement("beforeend", caja); // [cite: 872]
  }
}

function ordenarElementos() {
  // *Nota: La guía [cite: 906, 925-931] muestra que el ordenamiento es incorrecto (Ej: -80, 199, 50, 80, 9).*
  // *Para ordenar números correctamente, .sort() necesita una función de comparación.*
  
  // Limpia el contenedor antes de volver a dibujar (mejora sobre la guía)
  containerArregloOrdenado.innerHTML = "<h3>Arreglo ordenado</h3>";

  // Función de comparación para ordenar números
  let arregloOrdenado = arreglo.sort((a, b) => a - b);
  
  //utilizaremos un for...of para recorrer el arreglo
  //a su vez se utilizara .sort() para ordenarlo
  for (let i of arregloOrdenado) { // 
    let caja = document.createElement("div"); // [cite: 900]
    caja.className = "col-md-1 colum-green"; // [cite: 901]
    let valor = document.createElement("h3"); // [cite: 901]
    valor.textContent = i; // [cite: 902]
    caja.appendChild(valor); // [cite: 903]
    containerArregloOrdenado.insertAdjacentElement("beforeend", caja); // [cite: 904]
  }
}