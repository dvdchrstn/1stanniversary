export function initGallery() {
  const config = window.ANNIVERSARY_CONFIG;
  const galleryGrid = document.getElementById('gallery-grid');
  const galleryModal = document.getElementById('gallery-modal');
  const galleryModalWrapper = document.getElementById('gallery-modal-wrapper');
  const galleryClose = document.getElementById('gallery-close');
  
  let gallerySwiper = null;
  
  // Populate gallery grid with polaroid-style images
  config.gallery.forEach((item, index) => {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    
    // Random slight rotation for polaroid effect
    const rotateDeg = (Math.random() - 0.5) * 6;
    const rotateDegHover = (Math.random() - 0.5) * 3;
    galleryItem.style.setProperty('--rotate-deg', `${rotateDeg}deg`);
    galleryItem.style.setProperty('--rotate-deg-hover', `${rotateDegHover}deg`);
    
    galleryItem.innerHTML = `
      <img src="${item.src}" alt="${item.caption}" loading="lazy">
      <div class="gallery-item__caption">
        <strong>${item.date}</strong>
        ${item.caption}
      </div>
    `;
    
    galleryItem.addEventListener('click', () => {
      openGalleryModal(index);
      if (window.audioAPI) {
        window.audioAPI.playSFX('photo');
      }
    });
    
    galleryGrid.appendChild(galleryItem);
  });
  
  // Populate modal swiper slides
  config.gallery.forEach((item) => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `
      <img src="${item.src}" alt="${item.caption}">
      <div class="modal-caption">
        <strong>${item.date}</strong>
        <p>${item.caption}</p>
      </div>
    `;
    galleryModalWrapper.appendChild(slide);
  });
  
  // Initialize Swiper for modal
  function initGallerySwiper(initialSlide = 0) {
    if (gallerySwiper) {
      gallerySwiper.destroy();
    }
    
    gallerySwiper = new Swiper('.gallery-swiper', {
      initialSlide: initialSlide,
      loop: false,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      keyboard: {
        enabled: true,
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      speed: 600
    });
  }
  
  function openGalleryModal(index) {
    galleryModal.classList.add('active');
    galleryModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    initGallerySwiper(index);
  }
  
  function closeGalleryModal() {
    galleryModal.classList.remove('active');
    galleryModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  }
  
  galleryClose.addEventListener('click', closeGalleryModal);
  
  galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) {
      closeGalleryModal();
    }
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && galleryModal.classList.contains('active')) {
      closeGalleryModal();
    }
  });
}
