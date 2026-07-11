export function initAudio() {
  const config = window.ANNIVERSARY_CONFIG;
  const bgm = document.getElementById('bgm');
  const sfxClick = document.getElementById('sfx-click');
  const sfxOpen = document.getElementById('sfx-open');
  const sfxPhoto = document.getElementById('sfx-photo');
  const musicWidget = document.getElementById('music-widget');
  const muteToggle = document.getElementById('mute-toggle');
  
  let audioContext;
  let gainNode;
  let isPlaying = false;
  let isMuted = false;
  let initialized = false;
  
  const audioUrls = config.music;
  
  bgm.src = audioUrls.src;
  bgm.volume = audioUrls.volume;
  bgm.loop = true;
  
  // Create Web Audio API context for advanced control
  function initAudioContext() {
    if (audioContext && initialized) return;
    
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaElementSource(bgm);
    gainNode = audioContext.createGain();
    gainNode.gain.value = bgm.volume;
    
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    initialized = true;
  }
  
  // Play background music
  function playBGM() {
    if (!initialized) initAudioContext();
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    bgm.play().then(() => {
        isPlaying = true;
        updateMusicWidget();
    }).catch(err => console.log('BGM play failed:', err));
  }
  
  // Pause background music
  function pauseBGM() {
    bgm.pause();
    isPlaying = false;
    updateMusicWidget();
  }
  
  // Fade out music (for letter reading)
  function fadeOutBGM(duration = 1) {
    if (!gainNode) initAudioContext();
    gsap.to(gainNode.gain, {
      value: 0.1,
      duration: duration,
      ease: 'power2.inOut'
    });
  }
  
  // Fade in music
  function fadeInBGM(duration = 1) {
    if (!gainNode) initAudioContext();
    gsap.to(gainNode.gain, {
      value: audioUrls.volume,
      duration: duration,
      ease: 'power2.inOut'
    });
  }
  
  // Play SFX
  function playSFX(sfxElement) {
    if (isMuted) return;
    sfxElement.currentTime = 0;
    sfxElement.play().catch(err => console.log('SFX play failed:', err));
  }
  
  // Update music widget UI
  function updateMusicWidget() {
    const status = document.getElementById('music-status');
    status.textContent = isPlaying ? 'Playing' : 'Paused';
  }
  
  // Toggle music
  musicWidget.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isPlaying) {
      pauseBGM();
    } else {
      playBGM();
    }
  });
  
  // Toggle mute
  muteToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    isMuted = !isMuted;
    muteToggle.textContent = isMuted ? 'Sound Off' : 'Sound On';
    muteToggle.style.opacity = isMuted ? '0.5' : '1';
  });
  
  // Listen for letter open/close to fade music
  document.addEventListener('letterOpened', () => {
    fadeOutBGM(0.8);
  });
  
  document.addEventListener('letterClosed', () => {
    fadeInBGM(0.8);
  });
  
  // Create dummy audio elements for SFX if urls exist
  if (config.music.sfx.click) {
    sfxClick.src = config.music.sfx.click;
  }
  if (config.music.sfx.open) {
    sfxOpen.src = config.music.sfx.open;
  }
  if (config.music.sfx.photo) {
    sfxPhoto.src = config.music.sfx.photo;
  }
  
  // Expose functions globally
    window.audioAPI = {
    syncState: (playing) => {
        isPlaying = playing;
        updateMusicWidget();
    },
    playSFX: (type) => {
      switch(type) {
        case 'click': playSFX(sfxClick); break;
        case 'open': playSFX(sfxOpen); break;
        case 'photo': playSFX(sfxPhoto); break;
      }
    },
    fadeOut: fadeOutBGM,
    fadeIn: fadeInBGM,
    play: playBGM,
    pause: pauseBGM
  };
}
