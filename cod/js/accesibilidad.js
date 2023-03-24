function sol() {
    let section = document.getElementsByTagName("section")
    let nav = document.getElementsByTagName("nav")
    let header = document.getElementsByTagName("header")
    let footer = document.getElementsByTagName("footer")
    let aside = document.getElementsByTagName("aside")
    let iconoSol = document.getElementById("sol")
    let iconoLuna = document.getElementById("luna")
    let fondo = document.getElementsByTagName("html")

    section[0].style.background = "#3B7520"
    nav[0].style.background = "#3B7520"
    header[0].style.background = "#3B7520"
    footer[0].style.background = "#3B7520"
    if (aside.length != 0) { aside[0].style.background = "#3B7520" }
    fondo[0].style.background = "white"


    iconoSol.style.display = "none";
    iconoLuna.style.display = "block";

}

function luna() {
    let section = document.getElementsByTagName("section")
    let nav = document.getElementsByTagName("nav")
    let header = document.getElementsByTagName("header")
    let footer = document.getElementsByTagName("footer")
    let aside = document.getElementsByTagName("aside")
    let iconoSol = document.getElementById("sol")
    let iconoLuna = document.getElementById("luna")
    let fondo = document.getElementsByTagName("html")

    section[0].style.background = "#3C4742"
    nav[0].style.background = "#3C4742"
    header[0].style.background = "#3C4742"
    footer[0].style.background = "#3C4742"
    fondo[0].style.background = "#000000"

    if (aside.length != 0) { aside[0].style.background = "#3C4742" }

    iconoLuna.style.display = "none";
    iconoSol.style.display = "block";

}
