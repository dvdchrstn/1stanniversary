export function initScrollStory() {
  const config = window.ANNIVERSARY_CONFIG;
  gsap.registerPlugin(ScrollTrigger);

  const chapters = document.querySelectorAll('.chapter');
  const progressTracker = document.getElementById('story-progress-track');
  const progressChapter = document.querySelector('.story-progress__chapter');

  let currentChapter = 0;

  chapters.forEach((chapter, index) => {
    const nextChapter = chapters[index + 1];
    
    ScrollTrigger.create({
      trigger: chapter,
      start: 'top center',
      end: 'bottom center',
      onUpdate: (self) => {
        currentChapter = index;
        updateProgress(index, progressTracker, progressChapter);
        updateWeather(chapter.dataset.weather);
      }
    });

    gsap.to(chapter, {
      scrollTrigger: {
        trigger: chapter,
        start: 'top center',
        end: 'center center',
        scrub: 1,
        markers: false
      },
      opacity: 1,
      duration: 1
    });

    if (nextChapter) {
      gsap.to(nextChapter, {
        scrollTrigger: {
          trigger: chapter,
          start: 'center center',
          end: 'bottom center',
          scrub: 1
        },
        opacity: 1,
        duration: 1,
        onStart: () => {
          applyTransition(chapter, nextChapter);
        }
      });
    }
  });

  function updateProgress(chapterIndex, tracker, label) {
    const progress = ((chapterIndex + 1) / chapters.length) * 100;
    tracker.style.setProperty('--progress', progress + '%');
    
    const chapterData = config.storyChapters[chapterIndex];
    if (chapterData) {
      label.textContent = `${chapterData.label}`;
    }
  }

  function applyTransition(fromChapter, toChapter) {
    const fromWeather = fromChapter.dataset.weather;
    const toWeather = toChapter.dataset.weather;

    if (fromWeather !== toWeather) {
      // Background transitions handled natively by CSS variables or specific scene background definitions
      // But we can trigger specific cinematic effects here if needed
      if (toWeather === 'stars') {
        gsap.to('body', { backgroundColor: '#06171b', duration: 1.5 });
        gsap.to('.app', { color: '#eefcfc', duration: 1.5 });
      } else if (toWeather === 'confetti') {
        gsap.to('body', { backgroundColor: '#f7fffe', duration: 1.5 });
        gsap.to('.app', { color: '#103b39', duration: 1.5 });
      } else {
        // Reset to default variable-based backgrounds
        gsap.to('body', { backgroundColor: '#f7fffe', duration: 1.5 });
        gsap.to('.app', { color: '#103b39', duration: 1.5 });
      }
    }
  }

  function updateWeather(weather) {
    window.currentWeather = weather;
  }

  // Animate opening screen
  const opening = document.getElementById('opening');
  if (opening) {
    gsap.fromTo(opening.querySelector('h1'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power2.out' }
    );
    
    gsap.fromTo(opening.querySelector('p'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.6, ease: 'power2.out' }
    );
    
    gsap.fromTo(opening.querySelector('button'),
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1, delay: 0.9, ease: 'back.out' }
    );

    gsap.to(opening.querySelector('.scroll-hint'),
      { opacity: 1, duration: 1, delay: 1.2, ease: 'power2.out' }
    );
  }

  // Animate hero section
  const hero = document.getElementById('hero');
  if (hero) {
    gsap.fromTo(hero.querySelector('.hero-copy'),
      { opacity: 0, x: -50 },
      {
        opacity: 1, x: 0, duration: 1.2,
        scrollTrigger: { trigger: hero, start: 'top center' },
        ease: 'power2.out'
      }
    );

    gsap.fromTo(hero.querySelector('.hero-card'),
      { opacity: 0, x: 50 },
      {
        opacity: 1, x: 0, duration: 1.2,
        scrollTrigger: { trigger: hero, start: 'top center' },
        ease: 'power2.out'
      }
    );
  }

  // Timeline animations
  const timelineItems = document.querySelectorAll('.timeline-item__content');
  timelineItems.forEach((item, index) => {
    gsap.fromTo(item,
      { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
      {
        opacity: 1, x: 0, duration: 1,
        scrollTrigger: {
          trigger: item,
          start: 'top center+=100',
          markers: false
        },
        ease: 'power2.out',
        delay: index * 0.2
      }
    );
  });

  // Gallery items stagger
  const galleryItems = document.querySelectorAll('.gallery-item');
  gsap.fromTo(galleryItems,
    { opacity: 0, y: 30 },
    {
      opacity: 1, y: 0, duration: 0.8,
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.chapter--gallery',
        start: 'top center'
      },
      ease: 'power2.out'
    }
  );

  // Counter animation
  const counterCards = document.querySelectorAll('.counter-card');
  gsap.fromTo(counterCards,
    { opacity: 0, scale: 0.8 },
    {
      opacity: 1, scale: 1, duration: 0.8,
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.chapter--memory',
        start: 'top center'
      },
      ease: 'back.out'
    }
  );

  // Future items stagger
  const futureItems = document.querySelectorAll('.future-item');
  gsap.fromTo(futureItems,
    { opacity: 0, x: -30 },
    {
      opacity: 1, x: 0, duration: 0.8,
      stagger: 0.15,
      scrollTrigger: {
        trigger: '.chapter--future',
        start: 'top center'
      },
      ease: 'power2.out'
    }
  );

  // Ending animation
  const endingLines = document.querySelectorAll('.ending-line');
  const endingQuestion = document.getElementById('ending-question');
  
  ScrollTrigger.create({
    trigger: '.scene--ending',
    start: 'top center',
    onEnter: () => {
      gsap.to(endingLines, {
        opacity: 1, y: 0, duration: 0.8,
        stagger: 0.3,
        ease: 'power2.out'
      });
      
      if (endingQuestion) {
        gsap.to(endingQuestion, {
          opacity: 1, delay: endingLines.length * 0.3 + 0.5,
          duration: 0.8,
          ease: 'power2.out'
        });
      }
    }
  });
}
