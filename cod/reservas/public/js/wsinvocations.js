
function getHello(){
    $.ajax({
    type: "GET",
    url: "http://localhost:8080/",
    success: function(data){
    $("#resGetHello").html(data); },
    error: function(res){
    alert("ERROR: "+ res.statusText); }
    });
} 

function postReserva() {
    var npers;
    var hora;
    var fecha;
    var sala;
    var nombre = $('#nombre_titular').val();
    var tlfno = $('#tlfno_titular').val();
    var tipo = $('#tipo_reserva').val();
    
    if(tipo === "mesa"){
        npers = $('#num_personas_mesa').val();
        fecha = $('#fecha_mesa').val();
        sala = $('#salas_mesa').val();

        $('.hora_m').each(function() {
            if ($(this).is(':checked')) {
                hora = $(this).val();
                return false; // Sale del bucle cuando encuentra el valor seleccionado
            }
        });
    }
    else if(tipo === "celebracion"){
        npers = $('#num_personas_salas').val();
        fecha = $('#fecha_celeb').val();
        sala = $('#salas_celeb').val();

        $('.hora_c').each(function() {
            if ($(this).is(':checked')) {
                hora = $(this).val();
                return false; // Sale del bucle cuando encuentra el valor seleccionado
            }
        });
    }

    var idSala = comprobarSala(sala);

    //Comprobar aforo
    comprobarAforo(sala, npers, fecha, hora)
        .then(() => {
            $.ajax({
                type: "POST",
                url: "/reservas",
                contentType: "application/json",
                dataType: "text",
                data: JSON.stringify({
                    "nombreTitular": nombre,
                    "TlfnoTitular": tlfno, 
                    "NumPersonas": parseInt(npers), 
                    "HoraReserva": hora, 
                    "FechaReserva": {"$date": new Date(fecha)}, 
                    "_IDSala": {"$oid": idSala}
                }),
                success: function(data) {
                    alert("Reserva insertada");
                },
                error: function(res) {
                    alert("ERROR " + res.statusText);
                }
            });
        })
        .catch(() => {
            alert("El aforo máximo de la sala ha sido superado en la fecha y hora seleccionadas.");
        });
} 

//Funciones auxiliares
function comprobarSala(sala){
    var id;
    
    switch(sala){
        case "comedorInt":
            id = "642ef2b8eb7a9af707d36efd";
            break;
        case "comedorExt":
            id = "642ef3e0eb7a9af707d36f02";
            break;
        case "jardinInt":
            id = "642ef3fdeb7a9af707d36f03";
            break;
        case "celebraciones1":
            id = "642ef418eb7a9af707d36f04";
            break;
        case "celebraciones2":
            id = "642ef49aeb7a9af707d36f05";
            break;
        case "jardinExt":
            id = "642ef4c6eb7a9af707d36f06";
            break;
    }

    return id;
}

function comprobarAforo(sala, npers, FechaReserva, HoraReserva){
    var aforo = parseInt(npers);
    var aforoMax=0;

    var id;
    
    switch(sala){
        case "comedorInt":
            id = "642ef2b8eb7a9af707d36efd";
            aforoMax = 50;
            break;
        case "comedorExt":
            id = "642ef3e0eb7a9af707d36f02";
            aforoMax = 30;
            break;
        case "jardinInt":
            id = "642ef3fdeb7a9af707d36f03";
            aforoMax = 35;
            break;
        //En el caso de salas de celebraciones hay que comprobar si ya está reservada (solo puede haber 1 ese día)
    }
    aforoMax = parseInt(aforoMax);

    FechaReserva = new Date(FechaReserva);
    FechaReserva.setHours(0,0,0,0);

    //Hacer consulta (comprobando que las horas, fechas y sala sean la misma)
    //Recorremos el resultado sumando el npers de cada uno al aforo
    return new Promise((resolve,reject) => {
        getAllReservas(function(resultado) {
            for (let i = 0; i < resultado.length; i++) {
                var fechaAlmacenada = new Date(resultado[i].FechaReserva.$date);
                fechaAlmacenada.setHours(0,0,0,0);
                if(FechaReserva.getTime() === fechaAlmacenada.getTime() && resultado[i].HoraReserva === HoraReserva && resultado[i]._IDSala.$oid.equals(id)){
                    aforo = parseInt(aforo) + parseInt(resultado[i].NumPersonas);
                } 
            }
            if(parseInt(aforo) <= parseInt(aforoMax)){
                alert("Reserva realizada con éxito");
                resolve();
            }
            else{
                alert("El aforo máximo de la sala ha sido superado");
                reject();
            }
        });
    });
}

//Necesario para hacer post y comprobar el aforo
function getAllReservas(callback) {
    var myUrl = "/reservas";
    $.ajax({
        type: "GET",
        url: myUrl,
        async: false,
        dataType: "json",
        success: function(data) {
            callback(data);
        },
        error: function(res) {
            alert("ERROR " + res.statusText);
        }
    });
}

//Consultar todas las reservas y filtrar por el usuario que hace la consulta
function getReservasCliente() {
    var myUrl = "/reservas";
    $.ajax({
        type: "GET",
        dataType: "json",
        url: myUrl,
        success: function(data) {
            let htmlGenerado = "<ul>";

            for(let i=0;i<data.length;i++){
                if(data[i].nombreTitular === $('#nombre_titular').val() && data[i].TlfnoTitular === $('#tlfno_titular').val()){
                    htmlGenerado = htmlGenerado + "<li>" + "<span>" + "Nombre: "+ data[i].nombreTitular+ "," + 
                    " Teléfono: "+ data[i].TlfnoTitular + "," + " Fecha: " + data[i].FechaReserva.$date.toString().substring(0, 10) +" " +"</span>" + 
                    "<button type='button' onclick='getReserva(" + JSON.stringify(data[i]._id) + ")'>Ver detalles</button>" + 
                    "<button type='button' onclick='deleteReserva(" + JSON.stringify(data[i]._id) + ")'>Eliminar</button>" +
                    "<a href='modificar.html?id=" + data[i]._id + "'><button>Modificar</button></a>" + "<br>" +
                    "<h4 id='detallesReserva"+data[i]._id+"'>"+"</h4>"+"</li>"
                }
            }
            
            htmlGenerado = htmlGenerado + "</ul>";
            $("#resReserva").html(htmlGenerado);
        },
        error: function(res) {
            alert("ERROR " + res.statusText);
        }
    });
}

//Consultar todas las reservas, filtrar por el usuario que hace la consulta y enviarlas
function getSendReserva(callback) {
    var myUrl = "/reservas";
    $.ajax({
        type: "GET",
        dataType: "json",
        url: myUrl,
        success: function(data) {
            callback(data);
        },
        error: function(res) {
            alert("ERROR " + res.statusText);
        }
    });
}

//Get(id)
function getReserva(reservaId) {
    var myUrl = "/reservas/" + reservaId;
    $.ajax({
        type: "GET",
        dataType: "json",
        url: myUrl,
        success: function(data) {
            let htmlGenerado = "<ul>";
            let sala;
            let tipo;

            switch(data[0]._IDSala.$oid){
                case '642ef2b8eb7a9af707d36efd':
                    sala = "Comedor grande";
                    break;
                case '642ef3e0eb7a9af707d36f02':
                    sala = "Comedor pequeño";
                    break;
                case '642ef3fdeb7a9af707d36f03':
                    id = "Terraza";
                    break;
                case '642ef418eb7a9af707d36f04':
                    sala = "Salón para bodas";
                    break;
                case '642ef49aeb7a9af707d36f05':
                    sala = "Salón para bautizos";
                    break;
                case '642ef4c6eb7a9af707d36f06':
                    id = "Jardín";
                    break;
            }

            if(sala === "Comedor grande" || sala === "Comedor pequeño" || sala === "Terraza"){
                tipo = "reserva de mesa";
            }
            else if(sala === "Salón para bodas" || sala === "Salón para bautizos" || sala === "Jardín"){
                tipo = "celebración";
            }

            htmlGenerado = htmlGenerado + "<li>" + "<span>" + "Número de personas: "+ data[0].NumPersonas+ "," + 
            " Hora de reserva: "+ data[0].HoraReserva + "," + " Sala: " + sala + "," + " Tipo: "+ tipo + " " +"</span>"
            + "</li>"

            htmlGenerado = htmlGenerado + "</ul>";
            $("#detallesReserva"+data[0]._id).html(htmlGenerado);
        },
        error: function(res) {
            let mensaje = JSON.parse(res.responseText);
            alert("ERROR: " + mensaje.msg);
        }
    });
}

function deleteReserva(reservaId) {
    var myUrl = "/reservas/" + reservaId;
    $.ajax({
        type: "DELETE",
        dataType: "text",
        contentType: "application/json",
        url: myUrl,
        success: function(data) {
        $("#deleteReserva").html(JSON.parse(data).msg);
        },
        error: function(res) {
            let mensaje = JSON.parse(res.responseText);
            alert("ERROR: " + mensaje.msg);
        }
    });
}

function deleteAll(nombreTitular, TlfnoTitular) {
    var myUrl = "/reservas?nombreTitular=" + nombreTitular + "&TlfnoTitular=" + TlfnoTitular;
    $.ajax({
        type: "DELETE",
        dataType: "text",
        contentType: "application/json",
        url: myUrl,
        success: function(data) {
        $("#deleteReserva").html(JSON.parse(data).msg);
        },
        error: function(res) {
            let mensaje = JSON.parse(res.responseText);
            alert("ERROR: " + mensaje.msg);
        }
    });
}

/*
function putReserva(reservaId) {
    var npers;
    var hora;
    var fecha;
    var sala;
    var nombre = $('#nombre_titular').val();
    var tlfno = $('#tlfno_titular').val();
    var tipo = $('#tipo_reserva').val();
    
    if(tipo === "mesa"){
        npers = $('#num_personas_mesa').val();
        fecha = $('#fecha_mesa').val();
        sala = $('#salas_mesa').val();

        $('.hora_m').each(function() {
            if ($(this).is(':checked')) {
                hora = $(this).val();
                return false; // Sale del bucle cuando encuentra el valor seleccionado
            }
        });
    }
    else if(tipo === "celebracion"){
        npers = $('#num_personas_salas').val();
        fecha = $('#fecha_celeb').val();
        sala = $('#salas_celeb').val();

        $('.hora_c').each(function() {
            if ($(this).is(':checked')) {
                hora = $(this).val();
                return false; // Sale del bucle cuando encuentra el valor seleccionado
            }
        });
    }

    var idSala = comprobarSala(sala);

    var myUrl = "/reservas/" + reservaId;
    $.ajax({
        type: "PUT",
        url: myUrl,
        contentType: "application/json",
        dataType: "text",
        data: JSON.stringify({
            "nombreTitular": nombre,
            "TlfnoTitular": tlfno, 
            "NumPersonas": parseInt(npers), 
            "HoraReserva": hora, 
            "FechaReserva": {"$date": new Date(fecha)}, 
            "_IDSala": {"$oid": idSala}
        }),
        success: function(data) {
            alert("Su reserva ha sido modificada");
        },
        error: function(res) {
            let mensaje = JSON.parse(res.responseText);
            alert("ERROR: " + mensaje.msg);
        }
    });
}
*/

