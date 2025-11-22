// ACCEDIENDO A LA REFERENCIA DEL FORMULARIO
const newForm = document.getElementById("idNewForm");

// ACCEDIENDO A LA REFERENCIA DE BOTONES
const buttonCrear = document.getElementById("idBtnCrear");
const buttonAddElemento = document.getElementById("idBtnAddElement");

// ACCEDIENDO A VALORES DEL MODAL
const cmbElemento = document.getElementById("idCmbElemento");
const tituloElemento = document.getElementById("idTituloElemento");
const nombreElemento = document.getElementById("idNombreElemento");

// CREANDO MODAL CON BOOTSTRAP
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// FUNCION PARA VERIFICAR TIPO DE ELEMENTO
const vericarTipoElemento = function () {
    let elemento = cmbElemento.value;
    if (elemento != "") {
        modal.show();
    } else {
        alert("Debe seleccionar el elemento que se creara");
    }
};

const newSelect = function () {
    let addElemento = document.createElement("select");
    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("class", "form-select");
    
    for (let i = 1; i <= 10; i++) {
        let addOption = document.createElement("option");
        addOption.value = i;
        addOption.innerHTML = `Opcion ${i}`;
        addElemento.appendChild(addOption);
    }
    
    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);
    labelElemento.textContent = tituloElemento.value;
    
    let labelId = document.createElement("span");
    labelId.textContent = `ID de control: ${nombreElemento.value}`;
    
    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-floating");
    
    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);
    
    newForm.appendChild(labelId);
    newForm.appendChild(divElemento);
};

const newRadioCheckbox = function (newElemento) {
    let addElemento = document.createElement("input");
    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-check-input");
    
    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("class", "form-check-label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);
    labelElemento.textContent = tituloElemento.value;
    
    let labelId = document.createElement("span");
    labelId.textContent = `ID de control: ${nombreElemento.value}`;
    
    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-check");
    
    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);
    
    newForm.appendChild(labelId);
    newForm.appendChild(divElemento);
};

const newInput = function (newElemento) {
    let addElemento = newElemento == "textarea" 
        ? document.createElement("textarea") 
        : document.createElement("input");
    
    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-control");
    addElemento.setAttribute("placeholder", tituloElemento.value);
    
    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);
    
    let iconLabel = document.createElement("i");
    iconLabel.setAttribute("class", "bi bi-tag");
    
    labelElemento.textContent = tituloElemento.value;
    labelElemento.insertAdjacentElement("afterbegin", iconLabel);
    
    let labelId = document.createElement("span");
    labelId.textContent = `ID de control: ${nombreElemento.value}`;
    
    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-floating mb-3");
    
    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);
    
    newForm.appendChild(labelId);
    newForm.appendChild(divElemento);
};

// EJERCICIO 1.b: Función para validar controles nuevos
const validarControlesNuevos = function() {
    let elementos = newForm.querySelectorAll("input, select, textarea");
    let validado = true;

    if (elementos.length === 0) {
        alert("No hay controles creados para validar.");
        return;
    }

    for (let el of elementos) {
        // Validar Checkbox y Radio (debe estar chequeado para contar como válido en este contexto simple, 
        // o simplemente que existan. La guía pide validar 'opciones seleccionadas'.
        // Asumiremos que para checkbox/radio validamos que si es requerido, esté check. 
        // Pero como son dinámicos, validaremos simplemente que no estén vacíos los inputs de texto.
        
        if ((el.type === 'text' || el.type === 'email' || el.type === 'number' || el.tagName === 'TEXTAREA') && el.value.trim() === "") {
            alert(`El campo con ID ${el.id} está vacío.`);
            el.focus();
            validado = false;
            break;
        }
    }

    if (validado) {
        alert("Todos los campos dinámicos han sido validados correctamente.");
    }
};

// AGREGANDO EVENTO CLIC A LOS BOTONES
buttonCrear.onclick = () => {
    vericarTipoElemento();
};

buttonAddElemento.onclick = () => {
    if (nombreElemento.value != "" && tituloElemento.value != "") {
        let elemento = cmbElemento.value;
        
        // EJERCICIO 1.a: Valide que el ID de los controles nuevos no se repita
        let idProbar = `id${nombreElemento.value}`;
        if (document.getElementById(idProbar)) {
            alert("Error: Ya existe un control con este ID. Por favor elija otro nombre.");
            return; // Detiene la ejecución
        }

        if (elemento == "select") {
            newSelect();
        } else if (elemento == "radio" || elemento == "checkbox") {
            newRadioCheckbox(elemento);
        } else {
            // EJERCICIO 1.c: Adicione la creación de tipos color y email
            // (Se asume que newInput maneja el tipo pasado por parámetro)
            newInput(elemento);
        }
    } else {
        alert("Faltan campos por completar");
    }
};

// EJERCICIO 1.b: Crear botón de validar (Necesitas agregar este botón en tu HTML con id="idBtnValidar")
const buttonValidar = document.getElementById("idBtnValidar");
if(buttonValidar){
    buttonValidar.onclick = () => {
        validarControlesNuevos();
    };
}

// Limpiar modal
document.getElementById("idModal").addEventListener("shown.bs.modal", () => {
    tituloElemento.value = "";
    nombreElemento.value = "";
    tituloElemento.focus();
});