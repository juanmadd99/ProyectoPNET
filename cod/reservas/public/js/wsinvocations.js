
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

