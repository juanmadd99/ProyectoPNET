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
    var fecha = $('#fecha_mesa').val();

    $.ajax({
        type: "POST",
        url: "/reservas",
        contentType: "application/json",
        dataType: "text",
        data: JSON.stringify({
            "nombreTitular": "Juanma Diaz",
            "TlfnoTitular": "660999444", 
            "NumPersonas": 4, 
            "HoraReserva": "12:30-14:30", 
            "FechaReserva": fecha, 
            "_IDSala": "642ef2b8eb7a9af707d36efd"
        }),
        success: function(data) {
            alert("Reserva insertada");
        },
        error: function(res) {
            alert("ERROR " + res.statusText);
        }
    });
} 
