
// esta funcion comprueba si un elemento esta visible en pantalla
function isVisible(elm) {
	var rect = elm.getBoundingClientRect();
	var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
	return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}

// cuando se carga la página...
document.addEventListener('DOMContentLoaded', (ev0) => {
        // asignamos un evento scroll...
        window.addEventListener('scroll', (ev1) => {
                // y a todos los elementos con la clase paused...
		document.querySelectorAll(".paused").forEach(elm => {
			if (isVisible(elm)) // que sean visibles...
				elm.classList.remove("paused"); // les quitamos la clase paused
		})
	});
});
