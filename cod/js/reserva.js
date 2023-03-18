document.addEventListener("DOMContentLoaded", function() {
    const select_tipo = document.getElementById("tipo_reserva");

    const salas_mesa = document.getElementById("pers_salas_mesa");
    const salas_celeb = document.getElementById("pers_salas_celeb");

    const select_salas_mesa = document.getElementById("salas_mesa");
    const select_salas_celeb = document.getElementById("salas_celeb");

    const fecha_hora_salas = document.getElementById("fecha_hora_salas");
    const fecha_hora_celeb = document.getElementById("fecha_hora_celeb");

    const boton = document.getElementById("boton_aceptar");
    const contenedor = document.getElementById("contenedorPrincipal");

    //Mostrar datos del formulario según la opción seleccionada (tipo de sala)  
    select_tipo.addEventListener("change", function() {
        const valor = select_tipo.value;
        if(valor === "-"){
            salas_mesa.style.display = "none";
            salas_celeb.style.display = "none";
            fecha_hora_salas.style.display = "none";
            fecha_hora_celeb.style.display = "none";
            boton.style.display = "none"; 
        }

        if(valor === "mesa") {
            salas_mesa.style.display = "block";
            salas_celeb.style.display = "none";
            fecha_hora_salas.style.display = "none";
            fecha_hora_celeb.style.display = "none";
            boton.style.display = "none"; 

        }
        else if(valor === "celebracion"){
            salas_mesa.style.display = "none";
            salas_celeb.style.display = "block";
            fecha_hora_salas.style.display ="none";
            fecha_hora_celeb.style.display = "none";
            boton.style.display = "none"; 
        }

        else {
            salas_mesa.style.display = "none";
            salas_celeb.style.display = "none";
            fecha_hora_salas.style.display = "none";
            fecha_hora_celeb.style.display = "none";
            boton.style.display = "none"; 
        }
    });

    //Mostrar datos del formulario según la sala seleccionada

    select_salas_mesa.addEventListener("change", function() {
        fecha_hora_salas.style.display = "block";
        fecha_hora_celeb.style.display = "none";
        boton.style.display = "block"; 
    });

    
    select_salas_celeb.addEventListener("change", function() {
        fecha_hora_celeb.style.display = "block";
        fecha_hora_salas.style.display = "none";
        boton.style.display = "block";
    });
});

//Validación del formulario
//Nombre y apellidos del titular (debe ser alfabético y tener, como mínimo, un espacio en blanco entre dos palabras), no puede estar vacio
function validar_nombre(){
    let elem = document.getElementById('nombre_titular');
    //Expresión que comprueba que el input contenga solo carácteres alfabéticos, contenga como mínimo un espacio, permita tildes y permita mayúsculas y minúsculas
    let expresion = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+(\s+[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+)+$/i;
    if(elem.value.match(expresion)){
        return true;
    }
    else{
        alert("Por favor, escriba su nombre y apellidos (con un espacio entre ellos y sin números)");
        elem.focus();
        return false;
    }
}

function validar_telefono(){
    let elem = document.getElementById('tlfno_titular');
    //Expresión que comprueba que el input contenga 9 números.
    let expresion = /^\d{9}$/;
    if(elem.value.match(expresion)){
        return true;
    }
    else{
        alert("Por favor, escriba su número de teléfono sin espacios");
        elem.focus();
        return false;
    }

}

//Campo de numero de personas solo debe permitir números, comprueba también si el campo está en blanco
function esNumerico(){
    const tipo = document.getElementById("tipo_reserva");;
    const expresionNumerica = /^[0-9]+$/;

    if(tipo.value === "mesa"){
        let elem = document.getElementById("num_personas_mesa");

        if(elem.value.match(expresionNumerica)){
            return true;
        }
        else{
            alert("Por favor, escriba un número para indicar el número de personas qué habrá en la reserva");
            elem.focus();
            return false;
        }
    }

    if(tipo.value === "celebracion"){
        let elem = document.getElementById("num_personas_salas");

        if(elem.value.match(expresionNumerica)){
            return true;
        }
        else{
            alert("Por favor, escriba un número para indicar el número de personas qué habrá en la reserva");
            elem.focus();
            return false;
        }
    } 
}

//Validar número de personas
//Si se selecciona reserva de mesa, el número mínimo de personas es 2 y el número máximo es 29
//Si se selecciona celebraciones, el mínimo de cada sala es 30 personas y el número máximo depende de la sala seleccionada
function validar_numero(){
    let tipo = document.getElementById("tipo_reserva");
    
    if(tipo.value === "mesa"){
        let cant = document.getElementById("num_personas_mesa");
        let sala = document.getElementById("salas_mesa");
    
        if(sala.value === "comedorInt"){
            if(cant.valueAsNumber >= 2 && cant.valueAsNumber <= 29){
                return true;
            }
            else if(cant.valueAsNumber < 2){
                alert("La cantidad mínima de personas para reservar mesa es de 2");
                cant.focus();
                return false;
            }
            else if(cant.valueAsNumber > 29){
                alert("La cantidad máxima de personas por mesa es de 29");
                cant.focus();
                return false;
            }
        }

        if(sala.value === "comedorExt"){
            if(cant.valueAsNumber >= 2 && cant.valueAsNumber <= 6){
                return true;
            }
            else if(cant.valueAsNumber < 2){
                alert("La cantidad mínima de personas para reservar mesa es de 2");
                cant.focus();
                return false;
            }
            else if(cant.valueAsNumber > 6){
                alert("La cantidad máxima de personas por mesa es de 6");
                cant.focus();
                return false;
            }
        }

        if(sala.value === "jardinInt"){
            if(cant.valueAsNumber >= 2 && cant.valueAsNumber <= 10){
                return true;
            }
            else if(cant.valueAsNumber < 2){
                alert("La cantidad mínima de personas para reservar mesa es de 2");
                cant.focus();
                return false;
            }
            else if(cant.valueAsNumber > 10){
                alert("La cantidad máxima de personas por mesa es de 10");
                cant.focus();
                return false;
            }
        }
    }

    if(tipo.value === "celebracion"){
        let cant = document.getElementById("num_personas_salas");
        let sala = document.getElementById("salas_celeb");

        if(sala.value === "celebraciones1"){
            if(cant.valueAsNumber >= 30 && cant.valueAsNumber <= 500){
                return true;
            }
            else if(cant.valueAsNumber < 30){
                alert("La cantidad mínima de personas para reservar una sala es de 30 personas");
                cant.focus();
                return false;
            }
            else if(cant.valueAsNumber > 500){
                alert("El aforo máximo de la sala es de 500 personas");
                cant.focus();
                return false;
            }

        }
        if(sala.value === "celebraciones2"){
            if(cant.valueAsNumber >= 30 && cant.valueAsNumber <= 300){
                return true;
            }
            else if(cant.valueAsNumber < 30){
                alert("La cantidad mínima de personas para reservar una sala es de 30 personas");
                cant.focus();
                return false;
            }
            else if(cant.valueAsNumber > 300){
                alert("El aforo máximo de la sala es de 300 personas");
                cant.focus();
                return false;
            }

        }
        if(sala.value === "jardinExt"){
            if(cant.valueAsNumber >= 30 && cant.valueAsNumber <= 600){
                return true;
            }
            else if(cant.valueAsNumber < 30){
                alert("La cantidad mínima de personas para reservar una sala es de 30 personas");
                cant.focus();
                return false;
            }
            else if(cant.valueAsNumber > 600){
                alert("El aforo máximo de la sala es de 600 personas");
                cant.focus();
                return false;
            }
        }
    }
}

//Validar el tipo de sala (solo se permite mesa o celebración)

function validar_salas(){
    const tipo = document.getElementById("tipo_reserva");
    
    if(tipo.value === "mesa"){
        const sala = document.getElementById("salas_mesa");

        if(sala.value === "comedorInt" || sala.value === "comedorExt" || sala.value ===  "jardinInt"){
            return true;
        }
        else{
            alert("Elija una sala correcta");
            sala.focus();
            return false;
        }
    }

    if(tipo.value === "celebracion"){
        const sala = document.getElementById("salas_celeb");

        if(sala.value === "celebraciones1" || sala.value === "celebraciones2" || sala.value ===  "jardinExt"){
            return true;
        }
        else{
            alert("Elija una sala correcta");
            sala.focus();
            return false;
        }
    }
    else {
        alert("Elija un tipo de sala correcta");
        tipo.focus();
        return false;
    }
}

//Validación de fecha, comprueba también si se ha dejado vacio
function validar_fecha(){
    let hoy = new Date();
    const tipo = document.getElementById("tipo_reserva");

    if(tipo.value === "mesa"){
        let fecha_mesa = document.getElementById('fecha_mesa');
        let fechaElegida = fecha_mesa.valueAsDate;
        
        if (fecha_mesa.value === "") {
            alert("Por favor, eliga una fecha para la reserva");
            fecha_mesa.focus();
            return false;
        }
        else{
            //Igualamos las horas para comparar la fecha de hoy
            fechaElegida.setHours(0,0,0,0);
            hoy.setHours(0,0,0,0);

            if(fechaElegida.getTime() >= hoy.getTime()){
                return true;
            }
            else{
                alert("Fecha elegida es anterior a la fecha de hoy");
                fecha_mesa.focus();
                return false;
            }
        } 
    }

    if(tipo.value === "celebracion"){
        let fecha_celeb = document.getElementById('fecha_celeb');
        let fechaElegida = fecha_celeb.valueAsDate;

        if (fecha_celeb.value === "") {
            alert("Por favor, eliga una fecha para la reserva");
            fecha_celeb.focus();
            return false;
        }
        else{
            //Igualamos las horas para comparar la fecha de hoy
            fechaElegida.setHours(0,0,0,0);
            hoy.setHours(0,0,0,0);

            if(fechaElegida.getTime() >= hoy.getTime()){
                return true;
            }
            else{
                alert("Fecha elegida es anterior a la fecha de hoy");
                fecha_celeb.focus();
                return false;
            }
        }
    }
}

//Agrupa todas las validaciones
function validacion(){
    return validar_nombre() && validar_telefono() && esNumerico() && validar_numero() && validar_salas() && validar_fecha();
}


