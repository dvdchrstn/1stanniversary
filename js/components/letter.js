export function initLetter() {
  const config = window.ANNIVERSARY_CONFIG;
  const envelope = document.getElementById('envelope');
  const letterContent = document.getElementById('letter-content');
  const letterTitle = document.getElementById('letter-title');
  const envelopeParent = envelope.parentNode;
  const envelopeNextSibling = envelope.nextSibling;
  
  let isOpen = false;
  let isReadMode = false;
  let isAnimating = false;
  
  // Populate letter content
  letterTitle.textContent = config.loveLetter.title;
  
  const letterText = config.loveLetter.body;
  const paragraphs = letterText.split('\n\n');
  
  paragraphs.forEach(para => {
    const p = document.createElement('p');
    p.textContent = para;
    letterContent.appendChild(p);
  });
  
  // Handle envelope click
  envelope.addEventListener('click', handleEnvelopeClick);
  envelope.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleEnvelopeClick(e);
    }
  });
  
  function handleEnvelopeClick(event) {
    if (isAnimating) return;

    if (isReadMode) {
      if (!event || event.target === envelope) closeReadMode();
      return;
    }
    
    if (!isOpen) openEnvelope();
  }
  
  function openEnvelope() {
    isAnimating = true;
    envelope.classList.add('open');
    isOpen = true;
    
    if (window.audioAPI) {
      window.audioAPI.playSFX('open');
    }
    
    setTimeout(() => {
      enterReadMode();
      isAnimating = false;
    }, 1200);
  }
  
  function enterReadMode() {
    document.body.appendChild(envelope);
    envelope.classList.add('read-mode');
    isReadMode = true;
    document.body.classList.add('no-scroll');
    
    // Dispatch event for audio fade
    document.dispatchEvent(new CustomEvent('letterOpened'));
    
    // Animate letter content
    gsap.fromTo('.letter-paper', 
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
    );
  }
  
  function closeReadMode() {
    envelope.classList.remove('read-mode');
    envelope.classList.remove('open');
    if (envelopeNextSibling) {
      envelopeParent.insertBefore(envelope, envelopeNextSibling);
    } else {
      envelopeParent.appendChild(envelope);
    }
    isOpen = false;
    isReadMode = false;
    document.body.classList.remove('no-scroll');
    
    // Dispatch event for audio fade back
    document.dispatchEvent(new CustomEvent('letterClosed'));
  }
  
  // ESC to close read mode
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isReadMode) {
      closeReadMode();
    }
  });
}
