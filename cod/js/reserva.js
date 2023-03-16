document.addEventListener("DOMContentLoaded", function() {
    const select_tipo = document.getElementById("tipo_reserva");
    const salas_mesa = document.getElementById("pers_salas_mesa");
    const salas_celeb = document.getElementById("pers_salas_celeb");
    const select_salas_mesa = document.getElementById("salas_mesa");
    const select_salas_celeb = document.getElementById("salas_celeb")
    const fecha_hora_salas = document.getElementById("fecha_hora_salas");
    const fecha_hora_celeb = document.getElementById("fecha_hora_celeb");
    const boton = document.getElementById("boton_aceptar");
    
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

    function validar_nombre(){
        let elem = document.getElementById('nombre_titular');
		let expresion = /^\w+\s\w+$/i;
		if(elem.value.match(expresion)){
			return true;
		}
		else{
			alert("Por favor, escriba su nombre y apellido con un espacio entre ambos");
			elem.focus();
			return false;
		}
    }

    function esNumerico(){
        const tipo = select_tipo.value;
        if(tipo === "mesa"){
            let elem = document.getElementById("num_personas_mesa");
        }
        if(tipo === "celebracion"){
            let elem = document.getElementById("num_personas_celeb");
        }
        let expresionNumerica = /^[0-9]+$/;
        if(elem.value.match(expresionNumerica)){
            return true;
        }
        else{
            alert("Por favor, inserta solamente números");
            elem.focus();
            return false;
        }
    }

    function validar_numero(){
        const tipo = select_tipo.value;

        if(tipo === "mesa"){
            let cant = document.getElementById("num_personas_mesa");

            if(cant.value >= 2 && cant.value <= 29){
                return true;
            }
            else if(cant.value < 2){
                alert("La cantidad mínima de personas para reservar mesa es de 2");
                cant.focus();
                return false;
            }
            else if(cant.value > 29){
                alert("La cantidad máxima de personas por mesa es de 29");
                cant.focus();
                return false;
            }
        }
        if(tipo === "celebracion"){
            let cant = document.getElementById("num_personas_mesa");

            if(cant.value >= 29 && cant.value <= 500){
                return true;
            }
            else if(cant.value < 29){
                alert("La cantidad mínima de personas para reservar una sala es de 29");
                cant.focus();
                return false;
            }
            else if(cant.value > 500){
                alert("El aforo máximo de la sala es de 500");
                cant.focus();
                return false;
            }
        }
    }

    function validar_tipo(){
        const tipo = select_tipo.value;
        if(tipo === "mesa" || tipo === "celebracion"){
            return true;
        }
        else{
            alert("El tipo de sala es erróneo");
            tipo.focus();
            return false;
        }
    }

    function validar_fecha(){
       let hoy = new Date();

       if(select_tipo.value === "mesa"){
            let fecha_mesa = document.getElementById("fecha_mesa");
       }
       if(select_tipo.value === "celebracion"){
            let fecha_celeb = document.getElementById("fecha_celeb");

       }
       

    }


    function validacion(){
        return (validar_nombre() && esNumerico() && validar_numero() && validar_tipo());
    }
});


