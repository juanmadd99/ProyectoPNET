
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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////POST///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ReservaSend(){
    var myUrl = "/reservas";
    return $.ajax({
        type: "GET",
        async: false,
        dataType: "json",
        url: myUrl
    });
}

function comprobarAforo(){
    ReservaSend().done(function(data) {
        //Recogemos los datos
        var npers;
        var HoraReserva;
        var FechaReserva;
        var sala;
        var nombre = $('#nombre_titular').val();
        var tlfno = $('#tlfno_titular').val();
        var tipo = $('#tipo_reserva').val();
        
        if(tipo === "mesa"){
            npers = $('#num_personas_mesa').val();
            FechaReserva = $('#fecha_mesa').val();
            sala = $('#salas_mesa').val();

            $('.hora_m').each(function() {
                if ($(this).is(':checked')) {
                    HoraReserva = $(this).val();
                    return false; // Sale del bucle cuando encuentra el valor seleccionado
                }
            });
        }
        if(tipo === "celebracion"){
            npers = $('#num_personas_salas').val();
            FechaReserva = $('#fecha_celeb').val();
            sala = $('#salas_celeb').val();

            $('.hora_c').each(function() {
                if ($(this).is(':checked')) {
                    HoraReserva = $(this).val();
                    return false; // Sale del bucle cuando encuentra el valor seleccionado
                }
            });
        }

        var idSala = comprobarSala(sala);
    
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
            case "celebraciones1":
                id = "642ef418eb7a9af707d36f04";
                aforoMax = 500;
                break;
            case "celebraciones2":
                id = "642ef49aeb7a9af707d36f05";
                aforoMax = 300;
                break;
            case "jardinExt":
                id = "642ef4c6eb7a9af707d36f06";
                aforoMax = 600;
                break;
        }
        aforoMax = parseInt(aforoMax);
    
        FechaReserva = new Date(FechaReserva);
        FechaReserva.setHours(12,0,0,0);
            
        //Recorremos el resultado sumando el npers de cada uno al aforo
        var existe = false;
        for (let i = 0; i < data.length; i++) {
            var fechaAlmacenada = new Date(data[i].FechaReserva.$date);
            fechaAlmacenada.setHours(12,0,0,0);

            console.log("Fecha Reserva (formulario) en el bucle: "+FechaReserva);
            console.log("Fecha almacenada antes de comparación en el bucle: "+fechaAlmacenada);
            console.log("Existe: "+existe);
     
            if(sala === "celebraciones1"){
                if(FechaReserva.toString().substring(0, 10) === fechaAlmacenada.toString().substring(0, 10) && data[i]._IDSala.$oid === id){
                    existe = true;
                    break;
                }
            }
            else if(sala === "celebraciones2"){
                if(FechaReserva.toString().substring(0, 10) === fechaAlmacenada.toString().substring(0, 10) && data[i]._IDSala.$oid === id){
                    existe = true;
                    break;
                }
            }
            else if(sala === "jardinExt"){
                if(FechaReserva.toString().substring(0, 10) === fechaAlmacenada.toString().substring(0, 10) && data[i]._IDSala.$oid === id){
                    existe = true;
                    break;
                }
            }
            else{
                console.log("Entra en el else(comparación de salas)");
                if(FechaReserva.getTime() === fechaAlmacenada.getTime() && data[i].HoraReserva === HoraReserva && data[i]._IDSala.$oid === id){
                    aforo = parseInt(aforo) + parseInt(data[i].NumPersonas);
                } 
            }
        }

        if((parseInt(aforo) <= parseInt(aforoMax)) && (existe === false)){
            postReserva(nombre, tlfno, npers, HoraReserva, FechaReserva, idSala);
            alert("Reserva realizada con éxito");
        }
        else{
            if(existe === true){
                alert("La sala ya ha sido reservada para esa fecha");
            }
            else{
                alert("El aforo máximo de la sala ha sido superado");
            }
        }
    });
}

//Función auxiliar que devuelve el id específico de cada sala según la sala enviada
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

function postReserva(nombre, tlfno, npers, HoraReserva, FechaReserva, idSala) {

    $.ajax({
        type: "POST",
        url: "/reservas",
        contentType: "application/json",
        dataType: "text",
        data: JSON.stringify({
            "nombreTitular": nombre,
            "TlfnoTitular": tlfno, 
            "NumPersonas": parseInt(npers), 
            "HoraReserva": HoraReserva, 
            "FechaReserva": {"$date": new Date(FechaReserva)}, 
            "_IDSala": {"$oid": idSala}
        }),
        success: function(data) {
            alert("Gracias por confiar en nosotros");
        },
        error: function(res) {
            alert("ERROR: " + res.statusText);
        }
    });
}

/*function postReserva() {

    //Recogemos los datos
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
} */


/*function comprobarAforo(sala, npers, FechaReserva, HoraReserva){
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
        case "celebraciones1":
            id = "642ef418eb7a9af707d36f04";
            aforoMax = 500;
            break;
        case "celebraciones2":
            id = "642ef49aeb7a9af707d36f05";
            aforoMax = 300;
            break;
        case "jardinExt":
            id = "642ef4c6eb7a9af707d36f06";
            aforoMax = 600;
            break;
    }
    aforoMax = parseInt(aforoMax);

    FechaReserva = new Date(FechaReserva);
    FechaReserva.setHours(0,0,0,0);

    //Hacer consulta (comprobando que las horas, fechas y sala sean la misma)
    //Recorremos el resultado sumando el npers de cada uno al aforo
    return new Promise((resolve,reject) => {
        getAllReservas(function(resultado) {
            var existe=false;
            for (let i = 0; i < resultado.length; i++) {
                var fechaAlmacenada = new Date(resultado[i].FechaReserva.$date);
                fechaAlmacenada.setHours(0,0,0,0);
                if(sala === "celebraciones1"){
                    if(resultado[i]._IDSala.$oid.equals(id) && FechaReserva.getTime() === fechaAlmacenada.getTime()){
                        existe = true;
                    }
                }
                else if(sala === "celebraciones2"){
                    if(resultado[i]._IDSala.$oid.equals(id) && FechaReserva.getTime() === fechaAlmacenada.getTime()){
                        existe = true;
                    }
                }
                else if(sala === "jardinExt"){
                    if(resultado[i]._IDSala.$oid.equals(id) && FechaReserva.getTime() === fechaAlmacenada.getTime()){
                        existe = true;
                    }
                }
                else{
                    if(FechaReserva.getTime() === fechaAlmacenada.getTime() && resultado[i].HoraReserva === HoraReserva && resultado[i]._IDSala.$oid.equals(id)){
                        aforo = parseInt(aforo) + parseInt(resultado[i].NumPersonas);
                    } 
                }
            }
            if((parseInt(aforo) <= parseInt(aforoMax)) && (!existe)){
                alert("Reserva realizada con éxito");
                resolve();
            }
            else{
                if(existe){
                    alert("La sala ya ha sido reservada para esa fecha");
                    reject();
                }
                else{
                    alert("El aforo máximo de la sala ha sido superado");
                    reject();
                }
            }
        });
    });
}*/

//Necesario para hacer post y comprobar el aforo
/*function getAllReservas(callback) {
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
}*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////GET ALL//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
                    htmlGenerado = htmlGenerado + 
                    "<li>" + 
                    "<span>" + 
                    "Nombre: " + data[i].nombreTitular + "," + 
                    " Teléfono: " + data[i].TlfnoTitular + "," + 
                    " Fecha: " + data[i].FechaReserva.$date.toString().substring(0, 10) + " " + 
                    "</span>" + 
                    "<button type='button' onclick='getReserva(" + JSON.stringify(data[i]._id) + ")'>Ver detalles</button>" + 
                    "<button type='button' onclick='deleteReserva(" + JSON.stringify(data[i]._id) + ")'>Eliminar</button>" +
                    "<a href='modificar.html?id=" + data[i]._id + "' class='btn'><button>Modificar</button></a>" 
                    + "<br>" + "<h4 id='detallesReserva"+data[i]._id+"'>" + "</h4>" + 
                    "</li>"
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////GET(id)//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////DELETE(id)//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////DELETE//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////PUT//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Función auxiliar, la usamos para recoger los datos de la reserva que el usuario va a modificar la reserva
function getReservaSend(reservaId){
    var myUrl = "/reservas/" + reservaId;
    return $.ajax({
        type: "GET",
        dataType: "json",
        url: myUrl
    });
}

//Put(id)
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


