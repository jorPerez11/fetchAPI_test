//Creación de variable constante. tendrá la URL de la API
const API_URL = "https://retoolapi.dev/SjC1H1/data";


//Función que llama al JSON
//La palabra async indica que la función es asíncrona, es decir, puede contener operaciones que esperan resultados que tardan un poco
async function obtenerPersonas(){
    //Respuesta del servidor
    const res = await fetch(API_URL); //Se hace una llamada al endpoint

    //Convertimos a JSON la respuesta del servidor. La tabla (API) opera con JSON
    const data = await res.json(); //Esto es un JSON

    //Enviamos el JSON que nos manda la API a la función que crea la tabla en HTML
    mostrarDatos(data);
}
//La función contiene un parámetro "datos" que representa al archivo JSON
function mostrarDatos(datos){
    //Constante tabla. Se instancia la tabla en el index.html, con el contenido (tbody). Se debe de poner '#' antes del nombre
    //para denotar el tipo de dato (clase).
const tabla = document.querySelector('#tabla tbody')
    //Para inyectar código HTML se usa innerHTML
    tabla.innerHTML = ''; //Vaciamos el contenido de la tabla usando ''
        datos.forEach(persona => {
        tabla.innerHTML += `
            <tr> 
                <td>${persona.id}</td>
                <td>${persona.nombre}</td>
                <td>${persona.apellido}</td>
                <td>${persona.correo}</td>
                <td>${persona.edad}</td>
                <td>
                    <button onClick="abrirModalEditar('${persona.nombre}', '${persona.apellido}', '${persona.correo}', '${persona.edad}', ${persona.id})">Editar</button>
                    <button style="background-color: rgba(213, 87, 60)"; border-color: none;  onClick="eliminarPersonas(${persona.id})">Eliminar</button>
                </td>
            </tr>
            `


        });

}

//Llamada inicial para que se carguen los datos que vienen al servidor
obtenerPersonas();


//Agregar un nuevo registro
const modal = document.getElementById("modal-agregar"); // Cuadro de diálogo
const btnAbrirModal = document.getElementById("btn-abrirModal"); // + para abrir
const btnCerrarModal = document.getElementById("btn-cerrarModal"); // x para cerrar

btnAbrirModal.addEventListener("click", () => {
    modal.showModal();
});

btnCerrarModal.addEventListener("click", () => {
    modal.close();
});

//Agregar nuevo integrante desde formulario
document.getElementById("frm-agregar").addEventListener("submit", async e => {
    e.preventDefault(); // "e" representa el evento submit. Evita que el formulario se envíe de golpe
    // Capturar los valores del formulario
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const edad = document.getElementById("edad").value.trim();

    // Validación básica
    if (!nombre || !apellido || !correo || !edad) {
        alert("Por favor, rellene todos los campos");
        return; // Evita que el formulario se envíe
    }

    // Llamar a la API para enviar datos
    const respuesta = await fetch(API_URL, {
        method: "POST", // Método HTTP POST para enviar datos 
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({nombre, apellido, correo, edad})
    });
    
    if (respuesta.ok){
        alert("El registro fue agregado correctamente");
        document.getElementById("frm-agregar").reset(); // Se limpia el formulario
        modal.close(); // Se cierra el formulario
        obtenerPersonas(); // Se manda a llamar el método para cargar datos del servidor 
    } else {
        alert("Hubo un error al agregar");
    }    

});

// Método para eliminar personas

async function eliminarPersonas(id) {
    const confirmacion = confirm("¿Esta seguro de eliminar el registro?");

    if (confirmacion){
        await fetch(`${API_URL}/${id}`, {method: "DELETE"});
        
        obtenerPersonas();
    }
}

// Proceso para editar un registro --

// Proceso para agregar funcionalidad al botón editar
const modalEditar = document.getElementById("modal-editar");
const btnCerrarEditar = document.getElementById("btn-cerrarEditar");

btnCerrarEditar.addEventListener("click", () => {
    modalEditar.close();
});

// Se agregan los valores de registro en base a la persona (id) seleccionado
function abrirModalEditar(nombre, apellido, correo, edad, id){
    document.getElementById("idEditar").value = id;
    document.getElementById("nombre_editar").value = nombre;
    document.getElementById("apellido_editar").value = apellido;
    document.getElementById("correo_editar").value = correo;
    document.getElementById("edad_editar").value = edad;

    modalEditar.showModal();
}


//Editar integrante desde formulario
document.getElementById("frm-editar").addEventListener("submit", async e => {
    e.preventDefault(); // "e" representa el evento submit. Evita que el formulario se envíe de golpe
    // Capturar los valores del formulario
    const id = document.getElementById("idEditar").value;
    const nombre = document.getElementById("nombre_editar").value.trim();
    const apellido = document.getElementById("apellido_editar").value.trim();
    const correo = document.getElementById("correo_editar").value.trim();
    const edad = document.getElementById("edad_editar").value.trim();

    // Validación básica
    if (!id || !nombre || !apellido || !correo || !edad) {
        alert("Por favor, rellene todos los campos");
        return; // Evita que el formulario se envíe
    }

    // Llamar a la API para enviar datos
    const respuesta = await fetch(`${API_URL}/${id}`, { 
        method: "PUT", // Método HTTP PUT para enviar datos 
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({edad, correo, nombre, apellido}) //IMPORTANTE: los datos deben de ir en orden de datos según el JSON de la API (API_URL)
    });
    
    if (respuesta.ok){
        alert("El registro fue editado correctamente");
        document.getElementById("frm-editar").reset(); // Se limpia el formulario
        modalEditar.close(); // Se cierra el formulario
        obtenerPersonas(); // Se manda a llamar el método para cargar datos del servidor 
    } else {
        alert("Hubo un error al agregar");
    }    

});