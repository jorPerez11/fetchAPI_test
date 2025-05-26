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
                <td>${persona.email}</td>
                <td>${persona.edad}</td>
                <td>
                    <button>Editar</button>
                    <button>Eliminar</button>
                </td>
            </tr>
            `


        });

}

//Llamada inicial para que se carguen los datos que vienen al servidor
obtenerPersonas();