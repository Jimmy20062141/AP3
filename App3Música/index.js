const image = document.querySelector('img');
const titulo = document.getElementById('titulo');
const artista = document.getElementById('artista');

const progressContainer = document.getElementById('progressBar');
const progress = document.getElementById('progress');
const tiempoActual = document.getElementById('tiempoActual');
const duracion = document.getElementById('tiempoDuracion');

const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');



const songs = [

    {
        
        name: 'song1',
        displayName: 'Leave The Door Open',
        artista: 'Bruno Mars'
    },
    {
        name: 'song2',
        displayName: 'Hymn for the Weekend',
        artista: 'Coldplay'
    },
    {
        name: 'song3',
        displayName: 'Overjoyed',
        artista: 'Stevie Wonder'
    },
    {
        name: 'song4',
        displayName: 'Part Time Lover',
        artista: 'Stevie Wonder'
    }
];



let isPlaying = false;

function playSong() {
    isPlaying = true;
    playBtn.setAttribute('name', 'pause');
    playBtn.setAttribute('titulo', 'pause');
    music.play();
}

function pauseSong() {
    isPlaying = false;
    playBtn.setAttribute('name', 'play');
    playBtn.setAttribute('titulo', 'play');
    music.pause();
}

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));



function loadSong(song) {
    titulo.textContent = song.displayName;
    artista.textContent = song.artista;
    music.src = `./music/${song.name}.mp3`;
    image.src = `./img/${song.name}.jpg`;
}


let songIndex = 0;


function prevSong() {
    songIndex--;
    if(songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}



function nextSong() {
    songIndex++;
    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}



loadSong(songs[songIndex]);



function updateProgressBar(e) {
    if(isPlaying) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = ( currentTime / duration ) * 100; //Actualiza la barra de progreso
        progress.style.width = `${progressPercent}%`; //cambia el css de progress
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);

        if(durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`
        }

        if(durationSeconds) {
            duracion.textContent = `${durationMinutes} : ${durationSeconds}`;
        }

        const currentMinutes = Math.floor(currentTime / 60); //calcula la duracion de la cancion
        let currentSeconds = Math.floor(currentTime % 60);

        if(currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`
        }

        if(currentSeconds) {
            tiempoActual.textContent = `${currentMinutes} : ${currentSeconds}`;
        }
    }
};



function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}
document.addEventListener("keyup", e=>{

    if (e.target.matches("#buscador")){
  
        if (e.key ==="Escape")e.target.value = ""
  
        document.querySelectorAll(".articulo").forEach(fruta =>{
  
            fruta.textContent.toLowerCase().includes(e.target.value.toLowerCase())
              ?fruta.classList.remove("filtro")
              :fruta.classList.add("filtro")
        })
  
    }
  
  
  })

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
