const contenedor = document.getElementById("contenedor");
const sonidos = ['Victoria', 'Booo', 'Aplausos'];

sonidos.forEach(sonido => {

  let boton = document.createElement('div');
  boton.classList.add('boton');

  let texto = document.createElement('h2');
  texto.innerText = sonido;

  boton.appendChild(texto);

  boton.addEventListener('click', () => {
    pararCanciones();
    document.getElementById(sonido).play();
  });

  contenedor.appendChild(boton);
});

function pararCanciones() {
  sonidos.forEach(sonido => {
    let cancion = document.getElementById(sonido);
    cancion.pause();
    cancion.currentTime = 0;
  })
}
