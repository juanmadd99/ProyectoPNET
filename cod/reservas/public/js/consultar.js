window.onload = function() {
    document.getElementById("getButton").addEventListener("click", function(){
        getReservasCliente();
        document.getElementById("borrarTodo").style.display="block";
    })
}

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

//Comprueba si se ha escrito un número de teléfono, comprueba tambien si se ha añadido un teléfono con 9 números
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

//Agrupa todas las validaciones
function validacion(){
    return validar_nombre() && validar_telefono();
}
