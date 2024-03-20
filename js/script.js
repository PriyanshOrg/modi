const audioPlayer = document.getElementById('audioPlayer');
const audioSource = document.getElementById('audioSource');
const shuffleButton = document.getElementById('shuffleButton');
const previousButton = document.getElementById('previousButton');
const playPauseButton = document.getElementById('playPauseButton');
const nextButton = document.getElementById('nextButton');
const volumeButton = document.getElementById('volumeButton');
const playlist = document.getElementById('playlist');

let currentIndex = 0;
let isShuffled = false;
let isMuted = false;

window.onload = () => {
    renderPlaylist();
    playSong(currentIndex);
};

playPauseButton.addEventListener('click', togglePlayPause);
shuffleButton.addEventListener('click', toggleShuffle);
previousButton.addEventListener('click', playPrevious);
nextButton.addEventListener('click', playNext);
volumeButton.addEventListener('click', toggleVolume);

function renderPlaylist() {
    playlist.innerHTML = '';
    songs.forEach((song, index) => {
        const songItem = document.createElement('div');
        songItem.textContent = song.title;
        songItem.addEventListener('click', () => playSong(index));
        playlist.appendChild(songItem);
    });
}

function playSong(index) {
    currentIndex = index;
    const file = isShuffled ? getRandomSong() : songs[index].file;
    audioSource.src = file;
    audioPlayer.load();
    audioPlayer.play();
    updatePlayPauseButtonLabel();
}

function togglePlayPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
    updatePlayPauseButtonLabel();
}

function updatePlayPauseButtonLabel() {
    if (audioPlayer.paused) {
        playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
    }
}

function toggleShuffle() {
    isShuffled = !isShuffled;
    if (isShuffled) {
        shuffleButton.innerHTML = '<i class="fas fa-random"></i>'; 
        songs = shuffleArray(songs);
        currentIndex = 0;
        renderPlaylist();
    } else {
        shuffleButton.innerHTML = '<i class="fas fa-random"></i>'; 
    }
}

function playPrevious() {
    if (currentIndex > 0) {
        playSong(currentIndex - 1);
    }
}

function playNext() {
    if (currentIndex < songs.length - 1) {
        playSong(currentIndex + 1);
    }
}

function getRandomSong() {
    return songs[currentIndex].file;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function toggleVolume() {
    isMuted = !isMuted;
    audioPlayer.muted = isMuted;
    if (isMuted) {
        volumeButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else {
        volumeButton.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
}

