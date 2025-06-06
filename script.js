window.addEventListener("load", () => {
  const sections = document.querySelectorAll("section");
  const options = { threshold: 0.5 };

  let currentAudio = null;
  let musicaAtiva = false;

  const audios = {
    inicio: document.getElementById("audio-inicio"),
    ocarina: document.getElementById("audio-ocarina"),
    majoras: document.getElementById("audio-majoras"),
    windwaker: document.getElementById("audio-windwaker"),
    twilight: document.getElementById("audio-twilight"),
    skyward: document.getElementById("audio-skyward"),
    botw: document.getElementById("audio-botw"),
    tears: document.getElementById("audio-tears"),
  };

  const volumeControl = document.getElementById("volume-control");
  const volumeSlider = document.getElementById("volume");
  const toggleButton = document.getElementById("startMusic");
  const allAudios = Object.values(audios);


  const soundOn = new Audio("musicas/button/on.wav");
  const soundOff = new Audio("musicas/button/off.wav");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (currentAudio) currentAudio.pause();
        currentAudio = audios[entry.target.id];
        if (musicaAtiva && currentAudio) {
          currentAudio.currentTime = 0;
          currentAudio.play();
        }
      }
    });
  }, options);

  sections.forEach((section) => observer.observe(section));

  const visibleSection = Array.from(sections).find((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top >= 0 && rect.top < window.innerHeight;
  });

  if (visibleSection && musicaAtiva) {
    currentAudio = audios[visibleSection.id];
    if (currentAudio) {
      currentAudio.currentTime = 0;
      currentAudio.play();
    }
  }

  toggleButton.addEventListener("click", () => {
    musicaAtiva = !musicaAtiva;

    if (musicaAtiva) {
      soundOn.play(); 
      const section = document.getElementById("inicio");
      const rect = section.getBoundingClientRect();
      if (rect.top >= 0 && rect.top < window.innerHeight) {
        const audio = audios["inicio"];
        if (audio) {
          audio.currentTime = 0;
          audio.play();
          currentAudio = audio;
        }
      }
      toggleButton.textContent = "Desligar música";
      volumeControl.classList.add("show");
    } else {
      soundOff.play(); 
      Object.values(audios).forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
      currentAudio = null;
      toggleButton.textContent = "Ligar música";
      volumeControl.classList.remove("show");
    }
  });

  volumeSlider.addEventListener("input", (e) => {
    const volume = parseFloat(e.target.value);
    allAudios.forEach((audio) => {
      audio.volume = volume;
    });
  });
});

const links = document.querySelectorAll('.fade-link');
const overlay = document.getElementById('fadeOverlay');

function pararMusicaAtual() {
  const audios = document.querySelectorAll('audio');
  audios.forEach(audio => {
    if (!audio.paused) {
      audio.pause();
      audio.currentTime = 0;
    }
  });
}

links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = link.getAttribute('href');
    const soundSrc = link.getAttribute('data-sound');

    pararMusicaAtual();

    const audio = new Audio(soundSrc);
    audio.play();

    overlay.classList.remove('pointer-events-none');
    requestAnimationFrame(() => {
      overlay.classList.add('opacity-100');
    });

    setTimeout(() => {
      window.location.href = target;
    }, 2000);
  });
});
