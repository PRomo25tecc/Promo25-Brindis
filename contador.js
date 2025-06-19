  // Define la fecha y hora objetivo de tu recepción
  const fechaObjetivo = new Date("2025-12-13T22:00:00").getTime(); 
  // Esto convierte esa fecha a milisegundos desde 1970 (formato UNIX)

  // Ejecuta la función cada 1 segundo (1000 milisegundos)
  setInterval(() => {
    const ahora = new Date().getTime(); // Obtiene la fecha actual en milisegundos
    const diferencia = fechaObjetivo - ahora; // Calcula cuántos milisegundos faltan

    // Si ya pasó la fecha, mostramos un mensaje y frenamos el contador
    if (diferencia <= 0) {
      document.querySelector(".reloj").innerHTML = "¡Llegó la noche mágica!";
      return; // Sale de la función para que no siga contando
    }

    // Cálculos de tiempo: convierte los milisegundos a días, horas, minutos y segundos
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24)); 
    // 1000 ms * 60 seg * 60 min * 24 horas = 1 día

    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    // Resto del día convertido a horas

    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    // Resto de la hora convertido a minutos

    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
    // Resto del minuto convertido a segundos

    // Actualiza los elementos HTML con los valores calculados
    document.getElementById("dias").innerText = dias;
    document.getElementById("horas").innerText = horas.toString().padStart(2, "0");
    // padStart(2, "0") agrega un 0 adelante si el número tiene un solo dígito

    document.getElementById("minutos").innerText = minutos.toString().padStart(2, "0");
    document.getElementById("segundos").innerText = segundos.toString().padStart(2, "0");
  }, 1000); // Cierra el setInterval (cada 1000 ms = 1 segundo)


  function mostrarInfo(elemento) {
  elemento.classList.toggle("mostrar");
}

document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("musica-fondo");
  const boton = document.getElementById("boton-musica");
  const icono = boton.querySelector("i");

  audio.volume = 0.5;

  // 🎬 Mostrar el botón con transición suave
  setTimeout(() => {
    boton.style.opacity = '1';
    boton.style.transform = 'translateY(0)';
  }, 500);

  // 🔥 SACUDIDA AL ENTRAR
  boton.classList.remove("shake");
  void boton.offsetWidth; // Reinicia animación
  boton.classList.add("shake");

  setTimeout(() => {
    boton.classList.remove("shake");
  }, 1600); // Dura un poco más por las 2 repeticiones

  let usuarioToco = false;

  // 🎵 Clic en el botón: reproducir o pausar música
  boton.addEventListener("click", () => {
    usuarioToco = true;

    if (audio.paused) {
      audio.play().then(() => {
        icono.classList.remove("fa-play");
        icono.classList.add("fa-pause");
      }).catch(() => {
        console.log("Reproducción bloqueada por el navegador");
      });
    } else {
      audio.pause();
      icono.classList.remove("fa-pause");
      icono.classList.add("fa-play");
    }
  });

  // 🔁 Sacudida cada 10 seg si no lo tocaron
  setInterval(() => {
    if (!usuarioToco) {
      boton.classList.remove("shake");
      void boton.offsetWidth;
      boton.classList.add("shake");

      setTimeout(() => {
        boton.classList.remove("shake");
      }, 1600);
    }
  }, 7000);
});
