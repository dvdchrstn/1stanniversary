export function populateAllData() {
  const config = window.ANNIVERSARY_CONFIG;
  
  // Update all text from config
  updateTextContent();
  
  // Populate timeline
  populateTimeline();
  
  // Populate reasons carousel
  populateReasons();
  
  // Populate future checklist
  populateFuture();
  
  // Initialize counters
  initCounters();
  initCountdown();
  
  // Update UI labels
  document.getElementById('music-title').textContent = config.music.title;
}

function updateTextContent() {
  const config = window.ANNIVERSARY_CONFIG;
  
  document.getElementById('preloader-text').textContent = config.texts.preloader;
  document.getElementById('opening-title').textContent = config.texts.openingTitle;
  document.getElementById('opening-subtitle').textContent = config.texts.openingSubtitle;
  document.getElementById('open-story').textContent = config.texts.openingButton;
  document.querySelector('.scene--opening .scroll-hint').textContent = config.texts.beginStory;
  document.getElementById('hero-title').textContent = config.texts.heroTitle;
  document.getElementById('hero-subtitle').textContent = config.texts.heroSubtitle;
  document.getElementById('ending-title').textContent = config.texts.endingTitle;

  const endingSubtitle = document.getElementById('ending-subtitle');
  const endingQuestion = document.getElementById('ending-question');
  const replayButton = document.getElementById('replay-button');

  if (endingSubtitle) endingSubtitle.textContent = config.texts.endingSubtitle;
  if (endingQuestion) endingQuestion.textContent = config.texts.endingQuestion;
  if (replayButton) replayButton.textContent = config.texts.replayButton;
}

function populateTimeline() {
  const config = window.ANNIVERSARY_CONFIG;
  const timelineList = document.getElementById('timeline-list');
  
  if (!timelineList) return;
  
  config.timeline.forEach((item, index) => {
    const timelineItem = document.createElement('div');
    timelineItem.className = 'timeline-item';
    
    const dateObj = new Date(item.date);
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = dateObj.getDate();
    const month = monthNames[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    
    timelineItem.innerHTML = `
      <div class="timeline-item__content glass-card">
        ${item.video ? 
          `<video class="timeline-img" autoplay loop muted playsinline>
             <source src="${item.video}" type="video/mp4">
           </video>` : 
          (item.image ? `<img src="${item.image}" alt="${item.title}" class="timeline-img">` : '')
        }
        <span class="timeline-item__label">${item.dateLabel || `${day} ${month} ${year}`}</span>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
      <div class="timeline-item__date">
        <span>${month}</span>
        <strong>${day}</strong>
        <span>${year}</span>
      </div>
    `;
    
    timelineList.appendChild(timelineItem);
  });
}

function populateReasons() {
  const config = window.ANNIVERSARY_CONFIG;
  const reasonsWrapper = document.getElementById('reasons-wrapper');
  
  if (!reasonsWrapper) return;
  
  config.reasons.forEach((reason, index) => {
    const reasonCard = document.createElement('div');
    reasonCard.className = 'swiper-slide reason-card glass-card';
    reasonCard.textContent = reason;
    
    if (index < config.reasons.length) {
      reasonCard.style.setProperty('--rotate-deg', `${(Math.random() - 0.5) * 5}deg`);
    }
    
    reasonsWrapper.appendChild(reasonCard);
  });
  
  // Initialize Swiper for reasons carousel on mobile
  if (window.matchMedia('(max-width: 768px)').matches) {
    const reasonsSwiper = new Swiper('.reasons-swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        480: {
          slidesPerView: 1.5,
        }
      }
    });
  }
}

function populateFuture() {
  const config = window.ANNIVERSARY_CONFIG;
  const futureList = document.getElementById('future-list');
  
  if (!futureList) return;
  
  config.future.forEach((dream, index) => {
    const futureItem = document.createElement('div');
    futureItem.className = 'future-item';
    futureItem.innerHTML = `
      <div class="checkbox">✓</div>
      <span>${dream}</span>
    `;
    
    futureList.appendChild(futureItem);
    
    // Animate checkboxes sequentially
    setTimeout(() => {
      futureItem.classList.add('checked');
    }, index * 300);
  });
}

function initCounters() {
  const config = window.ANNIVERSARY_CONFIG;
  const startDate = new Date(config.dates.startDate);
  const now = new Date();
  
  const daysEl = document.querySelector('[data-counter="days"]');
  const weeksEl = document.querySelector('[data-counter="weeks"]');
  const monthsEl = document.querySelector('[data-counter="months"]');
  const momentsEl = document.querySelector('[data-counter="moments"]');
  
  if (!daysEl || !weeksEl || !monthsEl || !momentsEl) return;
  
  // Calculate differences
  const diffTime = Math.abs(now - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30.44);
  const diffMoments = Math.floor(diffDays * 8); // Estimate 8 sweet moments per day
  
  // Animate counters
  animateCounter(daysEl, diffDays);
  animateCounter(weeksEl, diffWeeks);
  animateCounter(monthsEl, diffMonths);
  animateCounter(momentsEl, diffMoments);
}

function initCountdown() {
  const config = window.ANNIVERSARY_CONFIG;
  const nextAnniversary = new Date(config.dates.nextAnniversary);
  
  const daysEl = document.querySelector('[data-countdown="days"]');
  const hoursEl = document.querySelector('[data-countdown="hours"]');
  const minutesEl = document.querySelector('[data-countdown="minutes"]');
  const secondsEl = document.querySelector('[data-countdown="seconds"]');
  
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;
  
  function updateCountdown() {
    const now = new Date();
    const diffTime = nextAnniversary - now;
    
    if (diffTime <= 0) {
      daysEl.textContent = '0';
      hoursEl.textContent = '0';
      minutesEl.textContent = '0';
      secondsEl.textContent = '0';
      return;
    }
    
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    const diffSeconds = Math.floor((diffTime % (1000 * 60)) / 1000);
    
    daysEl.textContent = diffDays.toString();
    hoursEl.textContent = diffHours.toString().padStart(2, '0');
    minutesEl.textContent = diffMinutes.toString().padStart(2, '0');
    secondsEl.textContent = diffSeconds.toString().padStart(2, '0');
  }
  
  // Initialize and start interval
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

function animateCounter(element, finalValue) {
  let current = 0;
  const increment = finalValue / 60;
  
  const timer = setInterval(() => {
    current += increment;
    
    if (current >= finalValue) {
      element.textContent = finalValue.toLocaleString();
      clearInterval(timer);
      return;
    }
    
    element.textContent = Math.floor(current).toLocaleString();
  }, 20);
}
