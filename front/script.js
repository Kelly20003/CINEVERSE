document.getElementById('open_btn').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open-sidebar');
});


const videoElement = document.querySelector('video');

async function loadMovie(movieId) {
    const response = await fetch(`http://localhost:3000/filmes/${movieId}`);
    if (response.ok) {
        const movie = await response.json();
        videoElement.src = movie.videoPath;  // Caminho do vídeo retornado pelo back-end
        videoElement.load();
    } else {
        console.error('Erro ao carregar o filme');
    }
}

