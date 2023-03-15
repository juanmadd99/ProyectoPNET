document.addEventListener("DOMContentLoaded", function() {
    const select_tipo = document.getElementById("tipo_reserva");
    const salas_mesa = document.getElementById("pers_salas_mesa");
    const salas_celeb = document.getElementById("pers_salas_celeb");
    const select_salas = document.getElementById("salas");
    const fecha_hora = document.getElementById("fecha_hora");

    select_tipo.addEventListener("change", function() {
        const valor = select_tipo.value;
        if(valor === "-"){
            salas_mesa.style.display = "none";
            salas_celeb.style.display = "none";
        }

        if(valor === "mesa") {
            salas_mesa.style.display = "block";
            salas_celeb.style.display = "none";
        }
        else if(valor === "celebracion"){
            salas_mesa.style.display = "none";
            salas_celeb.style.display = "block";
        }

        else {
            salas_mesa.style.display = "none";
            salas_celeb.style.display = "none";
        }
    });

    select_salas.addEventListener("change", function() {
        fecha_hora.style.display ="block"
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
        let elem = document.getElementById('num_personas');
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

    function validacion(){
        if(validar_nombre() && esNumerico()) return true;
        else return false;
    }
});


