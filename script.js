const tituloCancion = document.getElementById("titulo-cancion");
const imagenCancion = document.getElementById("imagen-cancion");
const progreso = document.getElementById("progreso");
const playButton = document.getElementById("play");
const anteriorButton = document.getElementById("anterior");
const siguienteButton = document.getElementById("siguiente");
const aleatorioButton = document.getElementById("aleatorio");
const bucleButton = document.getElementById("bucle");
const listaCanciones = document.getElementById("lista-canciones");
const contenedor = document.getElementById("contenedor");
const sonidos = [
    {
        id: 'El Farsante Mambo Remix',
        title: 'El Farsante Mambo Remix',
        src: 'sonidos/Ozuna - El Farsante [Mambo Remix] (128 kbps).mp3',
        imageSrc: 'img/mambo-remix.jpg',
    },
    {
        id: 'Tacata Mashup La-Rubia',
        title: 'Tacata Mashup La-Rubia',
        src: 'sonidos/Tacata-LaRubia-Abdon-Mashup.mp3',
        imageSrc: 'img/tacata.png',
    },
    {
        id: 'Coco Chanel Alvama Ice',
        title: 'Coco Chanel Alvama Ice',
        src: 'sonidos/SCOCO CHANEL (Alvama Ice Mix) - Eladio Carrión, Bad Bunny (128 kbps).mp3',
        imageSrc: 'img/coco-chanel alvama.jpg',
    },
];

let cancionActual = null;
let cancionIndex = 0;

sonidos.forEach((sonido, index) => {
    const boton = document.createElement('div');
    boton.classList.add('boton');

    const texto = document.createElement('h2');
    texto.innerText = sonido.title;

    boton.appendChild(texto);

    boton.addEventListener('click', () => {
        cargarCancion(index);
        document.getElementById(cancionActual.id).play();
    });

    listaCanciones.appendChild(boton);
});

cargarCancion(0);

function cargarCancion(index) {
    cancionIndex = index;
    if (cancionActual) {
        const cancionPrev = document.getElementById(cancionActual.id);
        cancionPrev.pause();
        cancionPrev.currentTime = 0;
    }
    cancionActual = sonidos[index];
    const cancion = document.getElementById(cancionActual.id);
    tituloCancion.innerText = cancionActual.title;
    imagenCancion.src = cancionActual.imageSrc;
    cancion.src = cancionActual.src;
    cancion.load();
}

playButton.addEventListener('click', () => {
    const cancion = document.getElementById(cancionActual.id);
    if (cancion.paused) {
        cancion.play();
        playButton.innerText = "⏸";
    } else {
        cancion.pause();
        playButton.innerText = "▶";
    }
});

anteriorButton.addEventListener('click', () => {
    if (cancionIndex > 0) {
        cargarCancion(cancionIndex - 1);
        document.getElementById(cancionActual.id).play();
    }
});

siguienteButton.addEventListener('click', () => {
    if (cancionIndex < sonidos.length - 1) {
        cargarCancion(cancionIndex + 1);
        document.getElementById(cancionActual.id).play();
    }
});

aleatorioButton.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * sonidos.length);
    cargarCancion(randomIndex);
    document.getElementById(cancionActual.id).play();
});

bucleButton.addEventListener('click', () => {
    const cancion = document.getElementById(cancionActual.id);
    cancion.loop = !cancion.loop;
    if (cancion.loop) {
        bucleButton.style.boxShadow = "2px 2px 2px black";
        bucleButton.style.border = "1px solid gray";
    } else {
        bucleButton.style.backgroundColor = "rgb(233, 233, 233)";
        bucleButton.style.boxShadow = "none";
    }
});

document.getElementById(cancionActual.id).addEventListener('timeupdate', () => {
    const cancion = document.getElementById(cancionActual.id);
    const progress = (cancion.currentTime / cancion.duration) * 100;
    progreso.style.width = progress + '%';
});

document.getElementById(cancionActual.id).addEventListener('ended', () => {
    if (!document.getElementById(cancionActual.id).loop) {
        siguienteButton.click();
    }
});
