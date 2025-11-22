const formulario = document.forms["frmRegistro"];
const button = document.forms["frmRegistro"].elements["btnRegistro"];

const modal = new bootstrap.Modal(document.getElementById("idModal"), {});
const bodyModal = document.getElementById("idBodyModal");

const crearTablaResultados = function(datos) {
    while (bodyModal.firstChild) {
        bodyModal.removeChild(bodyModal.firstChild);
    }

    const tabla = document.createElement("table");
    tabla.className = "table table-striped";
    
    const thead = tabla.createTHead();
    const rowHead = thead.insertRow();
    const th1 = document.createElement("th"); th1.textContent = "Campo";
    const th2 = document.createElement("th"); th2.textContent = "Valor";
    rowHead.appendChild(th1);
    rowHead.appendChild(th2);

    const tbody = tabla.createTBody();

    for (let key in datos) {
        let row = tbody.insertRow();
        let cellKey = row.insertCell();
        let cellVal = row.insertCell();
        cellKey.textContent = key;
        cellVal.textContent = datos[key];
    }

    bodyModal.appendChild(tabla);
};

const validarFormulario = function () {
    let errores = [];
    let datos = {};

    const txtNombre = formulario.elements["txtNombre"];
    const txtApellido = formulario.elements["txtApellido"];
    const txtFecha = formulario.elements["txtFechaNacimiento"]; 
    const txtCorreo = formulario.elements["txtCorreo"];
    const txtPass = formulario.elements["txtPassword"];
    const txtPassRep = formulario.elements["txtPasswordRepetir"];
    const cmbPais = formulario.elements["cmbPais"];
    const radioCarrera = formulario.elements["rbtCarrera"];
    const chkIntereses = document.querySelectorAll('input[name="chkIntereses"]:checked');

    if (!txtNombre.value.trim() || !txtApellido.value.trim()) {
        errores.push("El nombre y apellido son obligatorios.");
    } else {
        datos["Nombre Completo"] = `${txtNombre.value} ${txtApellido.value}`;
    }

    if (txtFecha.value) {
        let fechaIngresada = new Date(txtFecha.value);
        let fechaActual = new Date();
        if (fechaIngresada > fechaActual) {
            errores.push("La fecha de nacimiento no puede ser futura.");
        } else {
            datos["Fecha Nacimiento"] = txtFecha.value;
        }
    } else {
        errores.push("Debe ingresar una fecha de nacimiento.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(txtCorreo.value)) {
        errores.push("El formato del correo electrónico no es válido.");
    } else {
        datos["Correo"] = txtCorreo.value;
    }

    if (txtPass.value !== txtPassRep.value) {
        errores.push("Las contraseñas no coinciden.");
    } else if (txtPass.value === "") {
        errores.push("La contraseña no puede estar vacía.");
    }

    if (chkIntereses.length === 0) {
        errores.push("Debe seleccionar al menos un interés.");
    } else {
        let interesesArr = [];
        chkIntereses.forEach(chk => interesesArr.push(chk.value));
        datos["Intereses"] = interesesArr.join(", ");
    }

    if (formulario.elements["rbtCarrera"].value === "") {
        errores.push("Debe seleccionar una carrera.");
    } else {
        datos["Carrera"] = formulario.elements["rbtCarrera"].value;
    }

    if (cmbPais.value === "" || cmbPais.value === "0") {
        errores.push("Debe seleccionar un país de origen.");
    } else {
        datos["País"] = cmbPais.options[cmbPais.selectedIndex].text;
    }

    if (errores.length > 0) {
        alert("Errores encontrados:\n" + errores.join("\n"));
    } else {
        crearTablaResultados(datos);
        modal.show();
    }
};

button.onclick = () => {
    validarFormulario();
};