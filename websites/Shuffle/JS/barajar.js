var tables = document.querySelectorAll("table[id^='table']");
var tableBodies = document.querySelectorAll("tbody[id^='table']");
var deckContainer = document.getElementById("deck-container");
var cardBack = document.getElementById("card-back");

// FUNCIÓN PARA GENERAR Y MOSTRAR LAS CARTAS EN EL MAZO
function mostrarCartaEnMazo(numero) {
    var carta = document.createElement("div");
    carta.className = "card " + clase;
    deckContainer.appendChild(carta);
}

// GENERA Y MUESTRA LAS CARTAS EN EL MAZO
for (var i = 1; i <= 52; i++) {
    var clase = "card-" + i;
    mostrarCartaEnMazo(clase);
}

function generarSecuenciaAleatoria() {
    var secuencia = [];
    var numerosDisponibles = [];

    for (var i = 1; i <= 52; i++) {
        numerosDisponibles.push(i);
    }

    while (numerosDisponibles.length > 0) {
        var randomIndex = Math.floor(Math.random() * numerosDisponibles.length);
        var numero = numerosDisponibles.splice(randomIndex, 1)[0];
        secuencia.push(numero);
    }

    return secuencia;
}

function barajar() {
    var secuencia = generarSecuenciaAleatoria();
    var numerosParaHistorial = secuencia.slice();

    $('#deck-container').hide();

    for (var i = 0; i < tables.length; i++) {
        tables[i].style.display = "table";
    }

    // LIMPIAR EL CONTENIDO DE TODAS LAS TABLAS
    for (var i = 0; i < tableBodies.length; i++) {
        tableBodies[i].innerHTML = "";
    }

    // CREAR LAS CELDAS DE LA TABLA
    var rowCount = 0;
    var currentTableIndex = 0;

    for (var i = 0; i < secuencia.length; i++) {
        var numero = secuencia[i];
        var numeroCell = document.createElement("td");

        //ELIMINO EL NUMERO INTERNO DE CADA <td> (DEJO EL CODIGO POR SI ES NECESARIO)
        // numeroCell.textContent = numero;

        // ASIGNAR CLASE A LA CELDA BASADA EN EL NÚMERO
        numeroCell.className = "card-" + numero;

        tableBodies[currentTableIndex].appendChild(numeroCell);
        rowCount++;

        if (rowCount === 13) {
            rowCount = 0;
            currentTableIndex++;

            if (currentTableIndex < tables.length) {
                tables[currentTableIndex].style.display = "table";
            }
        }

    }

        // MOSTRAR LA ALERTA
        setTimeout(function () {
            var historial = localStorage.getItem("historial");
    
            if (historial) {
                historial = JSON.parse(historial);
                
                // VERIFICAR SI LA SECUENCIA YA EXISTE EN EL HISTORIAL
                var secuenciaStr = secuencia.join("-");
                var secuenciaEnHistorial = historial.some(function(item) {
                    return item.numeros.join("-") === secuenciaStr;
                });
    
                if (secuenciaEnHistorial) {                
                    Toastify({
                        text: "Ganaste! Felicidades!",
                        className: "info",
                        style: {
                          background: "linear-gradient(to right, #00b09b, #96c93d)",
                        }
                      }).showToast();
                } else {
                    Toastify({
                        text: "No ganaste. Vuelve a participar",
                        className: "info",
                        style: {
                          background: "linear-gradient(to right, #00b09b, #96c93d)",
                        }
                      }).showToast();
                }
            } else {
                Toastify({
                    text: "No hay historial. Vuelve a participar",
                    className: "info",
                    style: {
                      background: "linear-gradient(to right, #00b09b, #96c93d)",
                    }
                  }).showToast();
            }
    
            // ALMACENA LOS NÚMEROS EN EL HISTORIAL DESPUÉS DE MOSTRAR LA ALERTA
            guardarEnHistorial(numerosParaHistorial);
        }, 300); // 300 MILISEGUNDOS DE DELAY PARA LA ALERTA
    }
    





function limpiar() {
    $('#deck-container').show();

    for (var i = 0; i < tableBodies.length; i++) {
        tableBodies[i].innerHTML = "";
    }
    for (var i = 0; i < tables.length; i++) {
    tables[i].style.display = "none";
    }
}

function irAHistorico() {
    window.location.href = "historico.html";
}


//PAGINA HISTORICO


var historialList = document.getElementById("historialList");

// Obtener el historial almacenado en localStorage
var historial = localStorage.getItem("historial");
if (historial) {
    historial = JSON.parse(historial);
    historial.forEach(function(item, index) {
        var row = document.createElement("tr");
        var fechaHoraCell = document.createElement("td");
        fechaHoraCell.textContent = item.fechaHora;
        row.appendChild(fechaHoraCell);

        // Crear celdas para cada número en lugar de mostrar (1), (2), ..., (52)
        item.numeros.forEach(function(numero) {
            var numeroCell = document.createElement("td");
            numeroCell.textContent = numero;
            row.appendChild(numeroCell);
        });

        historialList.appendChild(row);
    });
} else {
    var noDataItem = document.createElement("tr");
    var noDataCell = document.createElement("td");
    noDataCell.colSpan = 2;
    noDataCell.textContent = "No hay datos en el historial.";
    noDataItem.appendChild(noDataCell);
    historialList.appendChild(noDataItem);
}

// Función para redirigir a la página "index.html"
function irAInicio() {
    window.location.href = "index.html";
}

// Función para borrar todo el historial
function borrarHistorico() {
    localStorage.removeItem("historial");
    historialList.innerHTML = ""; // Limpia la tabla
}

