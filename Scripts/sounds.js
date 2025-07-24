document.addEventListener("DOMContentLoaded", () => {
    const sounds = document.querySelectorAll("audio");
    let currentSoundIndex = 0;

    // Función para reproducir automáticamente los sonidos en secuencia
    function playNextSound() {
        if (currentSoundIndex < sounds.length) {
            const currentSound = sounds[currentSoundIndex];
            currentSound.play();

            // Escuchar el evento 'ended' para reproducir el siguiente audio
            currentSound.addEventListener("ended", () => {
                currentSoundIndex++;
                playNextSound(); // Reproduce el siguiente sonido
            });
        }
    }

    // Asegurarse de que los audios estén listos antes de reproducir
    sounds.forEach((sound) => {
        sound.oncanplay = () => {
            console.log(`El audio ${sound.src} está listo para reproducirse.`);
        };
    });

    // Esperar 10 segundos antes de comenzar la reproducción
    setTimeout(() => {
        playNextSound();
    }, 10000);
});