export function initEasterEggs() {
  const config = window.ANNIVERSARY_CONFIG;
  const secretMessage = document.getElementById('secret-message');
  const alwaysButton = document.getElementById('always-button');
  const replayButton = document.getElementById('replay-button');
  
  let keySequence = '';
  let longPressTimer = null;
  
  // Keyboard Easter Egg - Type "LOVE"
  document.addEventListener('keydown', (e) => {
    keySequence += e.key.toUpperCase();
    
    if (keySequence.length > 10) {
      keySequence = keySequence.slice(-10);
    }
    
    if (keySequence.includes(config.easterEggs.keyword)) {
      revealSecretMessage();
      keySequence = '';
    }
  });
  
  function revealSecretMessage() {
    if (!secretMessage) return;

    if (secretMessage.classList.contains('hidden')) {
      secretMessage.textContent = config.easterEggs.secretMessage;
      secretMessage.classList.remove('hidden');
      
      gsap.fromTo(secretMessage,
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out' }
      );
      
      if (window.audioAPI) {
        window.audioAPI.playSFX('open');
      }
      
      // Trigger confetti
      if (window.updateWeather) {
        window.updateWeather('confetti');
        setTimeout(() => {
          const currentChapter = document.querySelector('.chapter:last-of-type');
          if (currentChapter) {
            window.updateWeather(currentChapter.dataset.weather);
          }
        }, 5000);
      }
    }
  }
  
  // Long Press "Yes, Always" Button
  if (alwaysButton) {
    alwaysButton.addEventListener('mousedown', startLongPress);
    alwaysButton.addEventListener('mouseup', cancelLongPress);
    alwaysButton.addEventListener('mouseleave', cancelLongPress);
    alwaysButton.addEventListener('touchstart', startLongPress);
    alwaysButton.addEventListener('touchend', cancelLongPress);
  }
  
  function startLongPress() {
    longPressTimer = setTimeout(() => {
      triggerLongPressEasterEgg();
    }, 3000);
  }
  
  function cancelLongPress() {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      longPressTimer = null;
    }
  }
  
  function triggerLongPressEasterEgg() {
    document.body.style.filter = 'hue-rotate(180deg)';
    
    gsap.to('body', {
      filter: 'hue-rotate(0deg)',
      duration: 3,
      ease: 'power2.inOut'
    });
    
    if (window.audioAPI) {
      window.audioAPI.playSFX('open');
    }
  }
  
  // Replay Story Button
  if (replayButton) replayButton.addEventListener('click', () => {
    if (window.audioAPI) {
      window.audioAPI.playSFX('click');
    }
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    secretMessage.classList.add('hidden');
    keySequence = '';
  });
  
  // Always Button - Trigger confetti
  if (alwaysButton) alwaysButton.addEventListener('click', () => {
    if (window.audioAPI) {
      window.audioAPI.playSFX('click');
    }
    
    if (window.updateWeather) {
      window.updateWeather('confetti');
    }
    
    gsap.to(alwaysButton, {
      scale: 1.2,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    });
  });
}
