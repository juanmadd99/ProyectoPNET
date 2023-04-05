//Cargar el estilo cuando se carga la página
window.addEventListener("load", function() {
    // aplicamos el estilo al cargar la página
    getTheme();
});

//Establecer el estilo
function setTheme(theme) {
    let section = document.getElementsByTagName("section")
    let nav = document.getElementsByTagName("nav")
    let header = document.getElementsByTagName("header")
    let footer = document.getElementsByTagName("footer")
    let aside = document.getElementsByTagName("aside")
    let iconoSol = document.getElementById("sol")
    let iconoLuna = document.getElementById("luna")
    let fondo = document.getElementsByTagName("html")

    if (theme === "light") {
        section[0].style.background = "#3B7520"
        nav[0].style.background = "#3B7520"
        header[0].style.background = "#3B7520"
        footer[0].style.background = "#3B7520"
        if (aside.length != 0) { aside[0].style.background = "#3B7520" }
        fondo[0].style.background = "white"

        iconoSol.style.display = "none";
        iconoLuna.style.display = "block";
    } 
    else if (theme === "dark") {
        section[0].style.background = "#3C4742"
        nav[0].style.background = "#3C4742"
        header[0].style.background = "#3C4742"
        footer[0].style.background = "#3C4742"
        fondo[0].style.background = "#000000"

        if (aside.length != 0) { aside[0].style.background = "#3C4742" }

        iconoLuna.style.display = "none";
        iconoSol.style.display = "block";
    }
    localStorage.setItem("theme", theme);
}

//Funcion para comprobar que estilo había almacenado
function getTheme() {
    let theme = localStorage.getItem("theme");
    if (theme) {
        setTheme(theme);
    }
    else {
        // por defecto, aplicamos el estilo claro
        setTheme("light");
    }
}

//Establece estilo claro
function sol() {
    setTheme("light");
}

//Establece estilo oscuro
function luna() {
  setTheme("dark");
}


