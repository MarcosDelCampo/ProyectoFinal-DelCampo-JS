let opcionesLugar = document.getElementById("lugar")
const lugares = ["anthropos", "amalgama", "musical moments", "mahas", "percipere", "kairos", "revelio", "teatrap", "90-91", "odisea", "moscu"]

for (const lugar of lugares){
    let btn = document.createElement("button");
    btn.innerHTML = lugar.toUpperCase();
    btn.className = "btnLugar";
    opcionesLugar.appendChild(btn);
}

let opcionesZona = document.getElementById("zona")
const zonas = ["caba", "norte", "oeste", "sur"]

for (const zona of zonas){
    let btn = document.createElement("button");
    btn.innerHTML = zona.toUpperCase();
    btn.className = "btnZona";
    opcionesZona.appendChild(btn);
}

let opcionesCategoria = document.getElementById("categoria")
const categorias = ["teatro", "comedia musical", "improvisacion"]

for (const categoria of categorias){
    let btn = document.createElement("button");
    btn.innerHTML = categoria.toUpperCase();
    btn.className = "btnCategoria";
    opcionesCategoria.appendChild(btn);
}

let opcionesEdad = document.getElementById("edad")
const edades = ["niños", "adolescentes", "jovenes", "adultos"]

for (const edad of edades){
    let btn = document.createElement("button");
    btn.innerHTML = edad.toUpperCase();
    btn.className = "btnEdad";
    opcionesEdad.appendChild(btn);
}

let opcionesFormato = document.getElementById("formato")
const formatos = ["puesta", "clases"]

for (const formato of formatos){
    let btn = document.createElement("button");
    btn.innerHTML = formato.toUpperCase();
    btn.className = "btnFormato";
    opcionesFormato.appendChild(btn);
}

let opcionesTurno = document.getElementById("turno")
const turnos = ["mañana", "tarde", "noche"]

for (const turno of turnos){
    let btn = document.createElement("button");
    btn.innerHTML = turno.toUpperCase();
    btn.className = "btnTurno";
    opcionesTurno.appendChild(btn);
}

let opcionesDia = document.getElementById("dia")
const dias = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"]

for (const dia of dias){
    let btn = document.createElement("button");
    btn.innerHTML = dia.toUpperCase();
    btn.className = "btnDia";
    opcionesDia.appendChild(btn);
}

let opcionesValor = document.getElementById("valor")
const valores = [5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500, 9000]

for (const valor of valores){
    let btn = document.createElement("button");
    btn.innerHTML = valor;
    btn.className = "btnValor";
    opcionesValor.appendChild(btn);
}

let opcionesNivel = document.getElementById("nivel")
const niveles = ["principiante", "intermedio", "avanzado", "todos"]

for (const nivel of niveles){
    let btn = document.createElement("button");
    btn.innerHTML = nivel.toUpperCase();
    btn.className = "btnNivel";
    opcionesNivel.appendChild(btn);
}

function resetearResultados() {
    let resultados = document.querySelector("#contenedorResultados")
    while (resultados.firstChild) {
        resultados.removeChild(resultados.firstChild)
    }
}

function renderizarResultados(cursos) {
    resetearResultados()

    for (const curso of cursos) {

        let contenedor = document.createElement("div");
        contenedor.innerHTML = `<h3> ${curso.nombre}</h3>
                                <p> Zona: ${curso.zona}</p>
                                <p> Categoría: ${curso.categoria}</p>
                                <p> Edad: ${curso.edad}</p>
                                <p> Formato: ${curso.formato}</p>
                                <p> Turno: ${curso.turno}</p>
                                <p> Día: ${curso.dia}</p>
                                <p> Valor: ${curso.valor}</p>
                                <p> Nivel: ${curso.nivel}</p>
                                `;
        contenedor.className = "cards";
        document.querySelector("#contenedorResultados").appendChild(contenedor);
    }
    
}

function resetearFiltros() {
    const filtroVacio = new Map()

        filtroVacio.set("nombre", "")
        filtroVacio.set("zona", "")
        filtroVacio.set("categoria", "")
        filtroVacio.set("edad", "")
        filtroVacio.set("formato", "")
        filtroVacio.set("turno", "")
        filtroVacio.set("dia", "")
        filtroVacio.set("valor", "")
        filtroVacio.set("nivel", "")

        localStorage.setItem("criterioFiltros", stringifyMapa(filtroVacio))
}

function obtenerFiltroActual() {
    return jsonMapa(localStorage.getItem("criterioFiltros"))
    }

function stringifyMapa(map) {
    return JSON.stringify(Array.from(map))
    }
    
function jsonMapa(json) {
    return new Map(JSON.parse(json))
    }

function crearFiltroEnLocalStorage() {
    if (!localStorage.getItem("criterioFiltros")) {
        resetearFiltros()
    }
}

function resetearFiltrosVisibles() {
    let resultados = document.querySelector("#filtroVisible")
        while (resultados.firstChild) {
            resultados.removeChild(resultados.firstChild)
        }
}      

function resetearTodo() {
    resetearFiltros();
    resetearResultados();
    resetearFiltrosVisibles();
    ocultarFiltrosActuales();
}

function noHayCursos(){
    resetearResultados()
    let resultados = document.querySelector("#contenedorResultados")
    resultados.innerText = "No hay resultados"
    Swal.fire({
        title: 'LO SENTIMOS!',
        text: 'No hay resultados para su búsqueda',
        icon: 'error',
        confirmButtonText: 'Resetear filtros',
        showCancelButton: true,
        cancelButtonText:'Volver'
      }).then((rta)=>{

        if (rta.isConfirmed){ 
                    resetearTodo()}
      })
}

function filtrarNombre(curso, filtroActual) {
   return curso.nombre == filtroActual.get("nombre") || filtroActual.get("nombre") == ""
}

function filtrarZona(curso, filtroActual) {
   return curso.zona == filtroActual.get("zona") || filtroActual.get("zona") == ""
}

function filtrarCategoria(curso, filtroActual) {
  return curso.categoria == filtroActual.get("categoria") || filtroActual.get("categoria") == ""
}

function filtrarEdad(curso, filtroActual) {
   return curso.edad == filtroActual.get("edad") || filtroActual.get("edad") == ""
}

function filtrarFormato(curso, filtroActual) {
    return curso.formato == filtroActual.get("formato") || filtroActual.get("formato") == ""
}

function filtrarTurno(curso, filtroActual) {
    return curso.turno == filtroActual.get("turno") || filtroActual.get("turno") == ""
}

function filtrarDia(curso, filtroActual) {
    return curso.dia  == filtroActual.get("dia") || filtroActual.get("dia") == ""
}

function filtrarValor(curso, filtroActual) {
    return curso.valor == filtroActual.get("valor") || filtroActual.get("valor") == ""
}

function filtrarNivel(curso, filtroActual) {
    return curso.nivel == filtroActual.get("nivel") || filtroActual.get("nivel") == ""
}    

function filtrarCurso() {
    let filtroActual = obtenerFiltroActual()
    
    let resultado = cursos
        .filter(curso => filtrarNombre(curso, filtroActual))
        .filter(curso => filtrarZona(curso, filtroActual))
        .filter(curso => filtrarCategoria(curso, filtroActual))
        .filter(curso => filtrarEdad(curso, filtroActual))
        .filter(curso => filtrarFormato(curso, filtroActual))
        .filter(curso => filtrarTurno(curso, filtroActual))
        .filter(curso => filtrarDia(curso, filtroActual))
        .filter(curso => filtrarValor(curso, filtroActual))
        .filter(curso => filtrarNivel(curso, filtroActual));
    
    resultado.length ? renderizarResultados(resultado) : noHayCursos()
}

function mostrarFiltrosActuales() {
    let section = document.querySelector("#tagFiltros")
    section.className = "contenedorFiltrosActuales"
}

function ocultarFiltrosActuales() {
    let section = document.querySelector("#tagFiltros")
    section.className = "contenedorFiltrosActuales hidden"
}

function renderizarFiltrosActuales(filtrosActuales) {
    resetearFiltrosVisibles();

    let filtrosNoVacios =
        Array.from(filtrosActuales)
        .filter(([_key, value]) => value != "")

    if (filtrosNoVacios.length) {
        filtrosNoVacios.forEach(([clave, valor]) => {
            let valorFiltrado = document.createElement("li");

            valorFiltrado.innerHTML = clave.toUpperCase() + ": " + valor;
            document.querySelector("#filtroVisible").appendChild(valorFiltrado);
        })
        mostrarFiltrosActuales()
    } else {
        ocultarFiltrosActuales() 
    }
}

let botones = document.querySelectorAll(".opcion button");
botones.forEach((item) => {
    let clickBoton = (evt) => {
        let criterioDeFiltrosActuales = obtenerFiltroActual()

        if (item.className == "btnLugar"){
            criterioDeFiltrosActuales.set("nombre", item.innerText);
        }
        else if(item.className == "btnZona"){
            criterioDeFiltrosActuales.set("zona", item.innerText)
        }
        else if(item.className == "btnCategoria"){
            criterioDeFiltrosActuales.set("categoria", item.innerText)
        }    
        else if(item.className == "btnEdad"){
            criterioDeFiltrosActuales.set("edad", item.innerText)
        } 
        else if(item.className == "btnFormato"){
            criterioDeFiltrosActuales.set("formato", item.innerText)
        } 
        else if(item.className == "btnTurno"){
            criterioDeFiltrosActuales.set("turno", item.innerText)
        } 
        else if(item.className == "btnDia"){
            criterioDeFiltrosActuales.set("dia", item.innerText)
        } 
        else if(item.className == "btnValor"){
            criterioDeFiltrosActuales.set("valor", item.innerText)
        } 
        else if(item.className == "btnNivel"){
            criterioDeFiltrosActuales.set("nivel", item.innerText)
        } 

        localStorage.setItem("criterioFiltros", stringifyMapa(criterioDeFiltrosActuales))

        renderizarFiltrosActuales(criterioDeFiltrosActuales)
        Toastify({
            text: "FILTRO AGREGADO. Resultados al final de la página",
            duration: 1500,
            close: false,
            gravity: "bottom",
            position: "right",
            stopOnFocus: true,
            style: {
              background: "rgb(180, 130, 30)",
            },
          }).showToast();
    };
    item.addEventListener('click', clickBoton);
    item.addEventListener('click', filtrarCurso);

})

let cursos = [];

function esconderOpciones() {
    let opcionesHidden = document.querySelector(".opciones");
    opcionesHidden.className = "hidden";
    let respuestasHidden = document.querySelector(".respuestas");
    respuestasHidden.className = "hidden";

}

function iniciarApp() {
    crearFiltroEnLocalStorage()
    renderizarFiltrosActuales(obtenerFiltroActual())
    

    fetch("./assets/js/cursos.json")
        .then(rta => rta.json())
        .then(datos => (
            cursos = datos
        ))
        .then(_ => filtrarCurso())
        .catch(rta => Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se han podido cargar los cursos. Inténtelo más tarde.',
          }) && esconderOpciones()
          )
}

iniciarApp()